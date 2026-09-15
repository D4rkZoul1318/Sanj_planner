// Plain Node serverless function — no npm packages. Proxies Transitland's v2
// REST API (https://api.transit.land/api/v2/rest/stops/{stop_key}/departures)
// to return the FULL DAY's scheduled Route 31 (PVTA) departures for one of
// our two known stops, filtered down to just what the client needs.
//
// GET /api/schedule?stop=home|campus&date=YYYY-MM-DD (date optional, defaults to today)
// -> { departures: [ { time: "07:20:00", direction_id: 0, headsign: "Sunderland" }, ... ] }

const STOP_KEYS = {
  home: 's-drs2vt6j4q-thebouldersapts',   // The Boulders Apts
  campus: 's-drs3jsmwvy-fineartscenter'   // Fine Arts Center
};

const ROUTE_ONESTOP_ID = 'r-drs3-31'; // Route 31, Sunderland / South Amherst

module.exports = async function handler(req, res) {
  const apiKey = process.env.TRANSITLAND_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Transitland API is not configured for this project.' });
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const rawStop = Array.isArray(req.query.stop) ? req.query.stop[0] : req.query.stop;
  const stopKey = STOP_KEYS[rawStop];
  if (!stopKey) {
    res.status(400).json({ error: 'Invalid or missing "stop" query parameter. Use "home" or "campus".' });
    return;
  }

  const rawDate = Array.isArray(req.query.date) ? req.query.date[0] : req.query.date;
  const date = (rawDate && /^\d{4}-\d{2}-\d{2}$/.test(rawDate)) ? rawDate : new Date().toISOString().slice(0, 10);

  const params = new URLSearchParams();
  params.set('date', date);
  params.set('start_time', '00:00:00');
  params.set('end_time', '23:59:59');
  params.set('limit', '300');

  try {
    const upstream = await fetch(
      'https://api.transit.land/api/v2/rest/stops/' + encodeURIComponent(stopKey) + '/departures?' + params.toString(),
      { headers: { apikey: apiKey } }
    );
    if (!upstream.ok) {
      res.status(upstream.status).json({ error: 'Transitland API returned an error.' });
      return;
    }
    const data = await upstream.json();
    const rawDepartures = (data.stops && data.stops[0] && data.stops[0].departures) || [];
    const departures = rawDepartures
      .filter(function (d) { return d.trip && d.trip.route && d.trip.route.onestop_id === ROUTE_ONESTOP_ID; })
      .map(function (d) {
        return {
          time: d.departure_time,
          direction_id: d.trip.direction_id,
          headsign: d.trip.trip_headsign
        };
      })
      .sort(function (a, b) { return a.time < b.time ? -1 : a.time > b.time ? 1 : 0; });

    res.status(200).json({ date: date, departures: departures });
  } catch (e) {
    res.status(502).json({ error: 'Transitland API request failed.', message: String((e && e.message) || e) });
  }
};
