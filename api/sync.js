// Plain Node serverless function — no npm packages. Talks to the Upstash
// Redis REST API directly with fetch, using KV_REST_API_URL and
// KV_REST_API_TOKEN as the base URL and Bearer token — the env var names
// this project's Upstash Marketplace integration actually created.
//
// GET  /api/sync?code=XXXX        -> { updatedAt, data } for that passcode, or {} if unset
// POST /api/sync?code=XXXX  {..}  -> stores the posted JSON body under that passcode

module.exports = async function handler(req, res) {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (!kvUrl || !kvToken) {
    res.status(500).json({ error: 'KV is not configured for this project.' });
    return;
  }

  const rawCode = Array.isArray(req.query.code) ? req.query.code[0] : req.query.code;
  const code = (rawCode || '').toString().trim().toLowerCase();
  if (!code) {
    res.status(400).json({ error: 'Missing "code" query parameter.' });
    return;
  }
  const key = 'sync:' + code;

  try {
    if (req.method === 'GET') {
      const kvRes = await fetch(kvUrl + '/get/' + encodeURIComponent(key), {
        headers: { Authorization: 'Bearer ' + kvToken }
      });
      const kvData = await kvRes.json();
      if (!kvData || kvData.result == null) {
        res.status(200).json({});
        return;
      }
      let parsed;
      try {
        parsed = JSON.parse(kvData.result);
      } catch (e) {
        parsed = {};
      }
      res.status(200).json(parsed);
      return;
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { body = {}; }
      }
      if (!body || typeof body !== 'object') body = {};

      const kvRes = await fetch(kvUrl + '/set/' + encodeURIComponent(key), {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + kvToken },
        body: JSON.stringify(body)
      });
      if (!kvRes.ok) {
        res.status(502).json({ error: 'KV write failed.' });
        return;
      }
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: 'Method not allowed.' });
  } catch (e) {
    res.status(500).json({ error: 'Sync request failed.', message: String(e && e.message || e) });
  }
};
