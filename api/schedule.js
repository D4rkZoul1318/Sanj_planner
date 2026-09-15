// TEMPORARY discovery proxy for Transitland's v2 REST API, used only while
// building the full-day bus schedule feature. Generic passthrough so we can
// try different endpoints/params without redeploying each time — NOT the
// final shape, will be replaced with a fixed single-purpose proxy before
// this ships to users (mirrors the pattern in api/bus.js).
//
// GET /api/schedule?path=/stops&feed_onestop_id=f-drk-pvta&stop_id=157

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

  const rawPath = Array.isArray(req.query.path) ? req.query.path[0] : req.query.path;
  if (!rawPath || !rawPath.startsWith('/')) {
    res.status(400).json({ error: 'Missing or invalid "path" query parameter (must start with /).' });
    return;
  }

  const params = new URLSearchParams();
  Object.keys(req.query).forEach(function (key) {
    if (key === 'path') return;
    const val = req.query[key];
    if (Array.isArray(val)) {
      val.forEach(function (v) { params.append(key, v); });
    } else {
      params.set(key, val);
    }
  });

  try {
    const upstream = await fetch('https://api.transit.land/api/v2/rest' + rawPath + '?' + params.toString(), {
      headers: { apikey: apiKey }
    });
    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', 'application/json');
    res.send(text);
  } catch (e) {
    res.status(502).json({ error: 'Transitland API request failed.', message: String((e && e.message) || e) });
  }
};
