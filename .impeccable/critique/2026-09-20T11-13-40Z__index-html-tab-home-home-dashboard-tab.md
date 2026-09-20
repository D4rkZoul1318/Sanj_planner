---
target: the dashboard page (Home tab) - re-run after Today-at-a-glance fix
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:/home/user/sanj_planner/index.html#tab-home (Home/Dashboard tab)"
timestamp: 2026-09-20T11-13-40Z
slug: index-html-tab-home-home-dashboard-tab
---
Method: dual-agent (A: design-review sub-agent · B: detector + browser-evidence sub-agent) — re-run after the "Today at a glance" fix

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | New heading is a verified real improvement, but the mini-calendar gives zero feedback when a day is picked via the week-strip. |
| 2 | Match Between System / Real World | 3/4 | Natural language; minor friction where "Today" sits above a section that relabels to "Tuesday." |
| 3 | User Control and Freedom | 2/4 | Mobile FAB still always opens "Add time block" regardless of tab; no quick "back to today." |
| 4 | Consistency and Standards | 2/4 | Confirmed AA contrast failures; two day-pickers that don't stay in sync. |
| 5 | Error Prevention | 2/4 | Same FAB issue risks wrong-tab mis-adds. |
| 6 | Recognition Rather Than Recall | 3/4 | Mini-cal not reflecting a week-strip pick forces recall. |
| 7 | Flexibility and Efficiency | 3/4 | Stat cards, quick-add row, FAB genuinely speed up frequent glances. |
| 8 | Aesthetic and Minimalist Design | 3/4 | Calm identity holds; marred by confirmed mobile overflow and FAB/card collision. |
| 9 | Error Recovery | 3/4 | Good, day-aware empty-state copy throughout. |
| 10 | Help and Documentation | 3/4 | New heading functions as inline documentation. |
| Total | | 27/40 | Acceptable — up from 25/40 |

## Design Specificity Verdict

Specific and evaluable: DESIGN.md's tokens are followed precisely in the live code, confirmed by independent read and live computed-style sampling. Deterministic scan corroboration: CLI finding count unchanged at 37 (heading was markup-only, introduced zero new findings). Both assessments independently computed identical contrast ratios (4.373/4.408/4.374/4.626/4.554) and identical 106px mobile overflow — reproducible evidence.

## Overall Impression

The fix worked, precisely as scoped: clicking a different day now leaves the stat-card row unchanged under an explicit label while "Up next today" correctly relabels. Score moved 25 to 27. But the exact same pattern (two on-screen representations of "which day" disagreeing) reappears one component over: the mini-calendar still only ever rings "today," never the week-strip's picked day. The fix solved its literal target without touching the underlying pattern that produced it.

## What's Working

1. The fix does what it claims — verified live via a real click: stat-card row stays put under the unchanged label while "Up next today" correctly shows the picked day's events.
2. Empty and populated states are well-written and day-aware ("Nothing scheduled for Wednesday," "No applications yet — tap + to log one").
3. Visual restraint matches DESIGN.md's own North Star exactly — tertiary tints, near-flat shadows, single-use Ephesis wordmark.

## Priority Issues

[P1] Mobile calendar popover still causes ~106px horizontal overflow — unresolved, reconfirmed byte-for-byte
- Why it matters: scrollWidth 496px vs clientWidth 390px on load, identical in both runs. #calendarPanel stays display:block while closed (only opacity:0; pointer-events:none).
- Fix: give the fully-closed state display:none, or constrain+clip via an overflow:hidden ancestor.
- Suggested command: /impeccable harden

[P1] Mobile FAB is single-purpose and now confirmed to visually collide with the Applications stat card
- Why it matters: #fab always calls openModal(0,null) regardless of active tab; new measurement shows it overlaps #statCardApps's corner on Home at 390px.
- Fix: make the FAB context-aware per active tab; adjust Home's stat-card grid or FAB position so they stop sharing a corner.
- Suggested command: /impeccable clarify

[P1] "Up next today" still renders at/below the mobile fold
- Why it matters: reconfirmed at y~813 on 390x844, only 31px visible, entirely off-screen list — for the exact "checked between classes on a phone" use case PRODUCT.md names.
- Fix: collapse header chrome on mobile so up-next's first item is visible without scrolling.
- Suggested command: /impeccable layout

[P2] Color-only day/date selection state, plus confirmed AA contrast failures — reconfirmed with matching numbers
- Why it matters: no aria-pressed/aria-current/aria-selected anywhere on week-strip or mini-cal buttons; Warm Taupe on Warm Ivory and two of four stat-card tints computes to 4.37-4.41:1, below 4.5:1 AA.
- Fix: add missing ARIA state attributes; darken Warm Taupe slightly or reserve it for pairings that already clear AA.
- Suggested command: /impeccable harden

[P3 - new] The week-strip and mini-calendar don't share selection state
- Why it matters: selectDay() sets selectedCalDate = null, so picking "Wed" leaves the mini-cal still ringing only today — the same "two representations disagree" pattern that caused the original P0, now one component over.
- Fix: when selectDay() fires, also indicate the corresponding date in the mini-cal's visible month, or explicitly label the mismatch.
- Suggested command: /impeccable harden

## Persona Red Flags

Casey (occasional glancer): taps "Wed" on the week-strip — heading correctly signals stat cards won't follow, but the mini-calendar still only rings "20" (today), no confirmation her pick "took" anywhere else.

Alex (commuter, phone between classes): "Up next today" sits at the fold; on Budget, tapping the FAB silently opens "Add time block" instead of an expense.

Sam (screen-reader / low-vision): can't tell via assistive tech which day is selected (no ARIA state); reads header subtitle/date and two of four stat-card labels below the AA contrast floor.

## Minor Observations

- The "today" outline style is only visible once a different day is selected — someone who never strays from today never learns what it means.
- Day-name formatting is inconsistent: Schedule card abbreviates ("Mon"), Up-next spells it out ("Tuesday").
- "at a glance" appears three times on one screen — harmless but repetitive.
- renderStatCards() never references selectedDayIndex at all — "always today" is a hard architectural fact, not a stray bug.

## Questions to Consider

- If Budget/Applications are deliberately not day-scoped, would moving them into a physically separate "Overview" block remove this ambiguity at its root instead of requiring a label?
- Does a first-time user actually parse the stacked "Today"/"Tuesday" headings as two different scopes, or does the fix just relocate the original confusion one row down?
