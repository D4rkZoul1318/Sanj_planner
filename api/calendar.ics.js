// Plain Node serverless function — no npm packages. Reads the same
// Upstash-backed blob /api/sync.js writes (one JSON object per passcode,
// keyed by each localStorage key name, each value itself a JSON string)
// and renders the Schedule tab's events plus the Shifts data as a single
// iCalendar (.ics) feed that Google Calendar / Apple Calendar can
// subscribe to by URL.
//
// GET /api/calendar.ics?code=XXXX -> text/calendar

const EVENTS_KEY = 'weekly-schedule-events-v1';
const SHIFTS_KEY = 'weekly-schedule-shifts-v1';
const BYDAY = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

// A fixed reference week (2026-01-05 is a Monday) used only as an anchor
// date for each weekday's RRULE — the actual recurrence is indefinite,
// so which specific week we anchor to doesn't matter.
const ANCHOR_DATES = ['20260105', '20260106', '20260107', '20260108', '20260109', '20260110', '20260111'];

function pad2(n) { return String(n).padStart(2, '0'); }

function timeToCompact(hhmm) {
  const parts = (hhmm || '00:00').split(':');
  return pad2(Number(parts[0]) || 0) + pad2(Number(parts[1]) || 0) + '00';
}

function escapeText(str) {
  return String(str == null ? '' : str)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

// RFC 5545 line folding: continuation lines start with a single space.
function foldLine(line) {
  const max = 75;
  if (line.length <= max) return line;
  let out = line.slice(0, max);
  let rest = line.slice(max);
  while (rest.length > 0) {
    out += '\r\n ' + rest.slice(0, max - 1);
    rest = rest.slice(max - 1);
  }
  return out;
}

function dtstampUtc() {
  const d = new Date();
  return d.getUTCFullYear() + pad2(d.getUTCMonth() + 1) + pad2(d.getUTCDate())
    + 'T' + pad2(d.getUTCHours()) + pad2(d.getUTCMinutes()) + pad2(d.getUTCSeconds()) + 'Z';
}

// Small deterministic (non-cryptographic) hash — used only for shift
// entries, which (unlike Schedule events) have no stable `id` field of
// their own in the data model. Hashing the entry's own content means the
// UID stays stable across fetches without needing to change how Shifts
// are stored or edited.
function stableHash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h * 33) ^ str.charCodeAt(i)) >>> 0;
  }
  return h.toString(16);
}

function buildVEvent(uid, dtstamp, day, startTime, endTime, summary, location) {
  const anchor = ANCHOR_DATES[day];
  const lines = [
    'BEGIN:VEVENT',
    'UID:' + uid,
    'DTSTAMP:' + dtstamp,
    'DTSTART;TZID=America/New_York:' + anchor + 'T' + timeToCompact(startTime),
    'DTEND;TZID=America/New_York:' + anchor + 'T' + timeToCompact(endTime),
    'RRULE:FREQ=WEEKLY;BYDAY=' + BYDAY[day],
    'SUMMARY:' + escapeText(summary)
  ];
  if (location) lines.push('LOCATION:' + escapeText(location));
  lines.push('END:VEVENT');
  return lines;
}

function buildCalendar(events, shifts) {
  const dtstamp = dtstampUtc();
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sanj\'s Planner//Calendar Feed//EN',
    'CALSCALE:GREGORIAN'
  ];

  events.forEach(function (ev) {
    if (!ev || typeof ev.day !== 'number' || ev.day < 0 || ev.day > 6) return;
    const uid = ev.id + '@sanjsplanner.vercel.app';
    lines.push.apply(lines, buildVEvent(uid, dtstamp, ev.day, ev.start, ev.end, ev.title, ev.loc));
  });

  shifts.forEach(function (dayEntry) {
    if (!dayEntry || typeof dayEntry.day !== 'number' || !Array.isArray(dayEntry.entries)) return;
    dayEntry.entries.forEach(function (entry) {
      if (!entry) return;
      const hash = stableHash(dayEntry.day + '|' + entry.location + '|' + entry.start + '|' + entry.end);
      const uid = 'shift-' + hash + '@sanjsplanner.vercel.app';
      const summary = 'Shift: ' + (entry.location || 'Work');
      lines.push.apply(lines, buildVEvent(uid, dtstamp, dayEntry.day, entry.start, entry.end, summary, entry.location));
    });
  });

  lines.push('END:VCALENDAR');
  return lines.map(foldLine).join('\r\n') + '\r\n';
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');

  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;
  const rawCode = Array.isArray(req.query.code) ? req.query.code[0] : req.query.code;
  const code = (rawCode || '').toString().trim().toLowerCase();

  if (!kvUrl || !kvToken || !code) {
    res.status(200).send(buildCalendar([], []));
    return;
  }

  try {
    const kvRes = await fetch(kvUrl + '/get/' + encodeURIComponent('sync:' + code), {
      headers: { Authorization: 'Bearer ' + kvToken }
    });
    const kvData = await kvRes.json();
    if (!kvData || kvData.result == null) {
      res.status(200).send(buildCalendar([], []));
      return;
    }

    // The stored value is { updatedAt, data: { <localStorage key>: <json string>, ... } }
    // — the same shape pushSyncNow() in index.html posts to /api/sync.
    let blob;
    try {
      blob = JSON.parse(kvData.result);
    } catch (e) {
      blob = {};
    }
    blob = (blob && typeof blob === 'object' && blob.data && typeof blob.data === 'object') ? blob.data : {};

    let events = [];
    let shifts = [];
    try {
      if (blob[EVENTS_KEY]) events = JSON.parse(blob[EVENTS_KEY]);
    } catch (e) { events = []; }
    try {
      if (blob[SHIFTS_KEY]) shifts = JSON.parse(blob[SHIFTS_KEY]);
    } catch (e) { shifts = []; }
    if (!Array.isArray(events)) events = [];
    if (!Array.isArray(shifts)) shifts = [];

    res.status(200).send(buildCalendar(events, shifts));
  } catch (e) {
    // A bad/unknown link should look empty, not broken, in someone's
    // calendar app — never surface a 500 here.
    res.status(200).send(buildCalendar([], []));
  }
};
