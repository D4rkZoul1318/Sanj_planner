# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Sanj, personally — a UMass Amherst student who is also working, applying to jobs, and commuting via the PVTA Route 31 bus. Single-user tool: no accounts, no login. The passcode-based sync feature exists only to keep Sanj's own data in step across his own devices (e.g. phone + laptop), not to support multiple separate users.

## Product Purpose

A personal weekly planner that puts classes, work shifts, personal routine, meals, a budget, job applications, and a live bus schedule on one page, "one week at a glance." Success means Sanj can see and update everything about his week without switching between separate apps.

## Positioning

A single always-available page (bookmarked or added to the home screen) that unifies several small day-to-day logistics tools — weekly class/shift schedule, budget tracker, meal plan, job-application tracker, and a live PVTA Route 31 departure board — that a neighboring single-purpose app (a calendar app, a budgeting app, a job tracker) could not truthfully claim to combine in one glance.

## Operating Context

- Deployed on Vercel (`sanjsplanner.vercel.app`), connected to GitHub (`D4rkZoul1318/Sanj_planner`). Pushes to `main` deploy to production; other branches (`dev`, `preprod`) get their own preview URLs. Production merges only happen on Sanj's explicit request.
- Data is stored per-device in `localStorage`; an optional passcode enables cross-device sync via a Vercel serverless function (`/api/sync`) backed by Upstash Redis.
- A `.ics` calendar feed (`/api/calendar.ics`) lets Schedule + Shifts data be subscribed to from Google/Apple Calendar.
- Live PVTA Route 31 bus departures are fetched via `/api/bus`; a related `/api/schedule` endpoint exists for date-based schedule data.
- Typical usage: checked throughout the day on both a phone and a laptop, on a UMass Amherst student's daily commute/class/work routine.

## Capabilities and Constraints

- No build step, no framework, no npm dependencies — a single static `index.html` (vanilla JS, inline CSS) plus a few Vercel serverless functions under `/api/`. This is a deliberate, standing constraint: future work should not introduce a bundler, framework, or dependency without Sanj explicitly asking for it.
- Six tabs: Home (daily glance/dashboard), Schedule (weekly class/shift/personal calendar grid), Meals, Budget (supports multiple named budgets), Applications (job-application tracker with status pipeline), Bus (live PVTA Route 31 departures).
- Sync is opt-in via a user-chosen passcode; without one, the app works entirely offline/local.
- Terminology: "shifts" = work shifts; "flex items" = routine tasks without a fixed time yet (e.g. gym, studying); a "budget" is a named collection of categories, each holding line-item expenses.

## Brand Commitments

- Name: "Sanj's Planner." Wordmark set in the Google Font "Ephesis" (script), body text in "Quicksand."
- Current visual direction: warm ivory background (`#f7f4ef`), white surfaces, indigo accent (`#4f46e5`), warm/stone-toned neutrals and borders — chosen after Sanj rejected an earlier ambient sky-gradient/dark-mode concept as not working ("lets drop this, use references from the net").

## Evidence on Hand

No user-facing marketing copy, testimonials, or case studies apply — this is a personal tool, not a product with an external audience. Real data shown in the app (classes, shifts, budget line items, meals) is Sanj's own and lives only in his browser/sync store, not in this repo.

## Product Principles

1. One page beats several separate apps — every addition should reduce how many other tools Sanj needs to check.
2. Stay static and dependency-free; the simplicity of "no build step" is itself a feature, not a temporary shortcut.
3. Local-first, sync-optional — the app must be fully usable offline with only `localStorage`; sync is a convenience layer on top, never a requirement.
4. Ship to `dev`/`preprod` for iteration; `main`/production only changes on Sanj's explicit "push to main."
5. Don't guess at visual direction — when a design isn't working, prefer reverting cleanly over patching a rejected approach.
