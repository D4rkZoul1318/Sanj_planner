// Plain Node serverless function — no npm packages. Proxies GET requests to
// Transit App's public v4 API (https://external.transitapp.com/v4/public/nearby_stops),
// attaching the secret apiKey header server-side so it's never exposed to the client.
//
// GET /api/bus?lat=XX&lon=YY[&anything_else=...] -> forwards lat/lon (and any other
// query params) to nearby_stops, returns the raw upstream JSON and status code.

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

  const query = req.query || {};
  if (!query.lat || !query.lon) {
    res.status(400).json({ error: 'Missing required "lat"/"lon" query parameters.' });
    return;
  }

  const params = new URLSearchParams();
  Object.keys(query).forEach(function (key) {
    var value = query[key];
    if (Array.isArray(value)) value = value[0];
    params.set(key, value);
  });

  try {
    const upstream = await fetch('https://external.transitapp.com/v4/public/nearby_stops?' + params.toString(), {
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
