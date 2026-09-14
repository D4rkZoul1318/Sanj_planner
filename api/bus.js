// Plain Node serverless function — no npm packages. Proxies GET requests to
// Transit App's public v4 API (https://external.transitapp.com/v4/public/stop_departures),
// attaching the secret apiKey header server-side so it's never exposed to the client.
//
// GET /api/bus?global_stop_id=XXXX -> forwards to stop_departures, returns the raw
// upstream JSON and status code.

module.exports = async function handler(req, res) {
  const apiKey = process.env.TRANSIT_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Transit API is not configured for this project.' });
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const rawStopId = Array.isArray(req.query.global_stop_id) ? req.query.global_stop_id[0] : req.query.global_stop_id;
  if (!rawStopId) {
    res.status(400).json({ error: 'Missing required "global_stop_id" query parameter.' });
    return;
  }

  const params = new URLSearchParams();
  params.set('global_stop_id', rawStopId);

  try {
    const upstream = await fetch('https://external.transitapp.com/v4/public/stop_departures?' + params.toString(), {
      headers: { apiKey: apiKey }
    });
    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', 'application/json');
    res.send(text);
  } catch (e) {
    res.status(502).json({ error: 'Transit API request failed.', message: String((e && e.message) || e) });
  }
};
