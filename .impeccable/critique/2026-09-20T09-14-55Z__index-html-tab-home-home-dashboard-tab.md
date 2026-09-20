---
target: the dashboard page (Home tab)
total_score: 25
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 3
target_identity: "file:/home/user/sanj_planner/index.html#tab-home (Home/Dashboard tab)"
timestamp: 2026-09-20T09-14-55Z
slug: index-html-tab-home-home-dashboard-tab
---
Method: dual-agent (A: design-review sub-agent · B: detector + browser-evidence sub-agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | Stat cards silently keep showing today's data when you pick a different day via the week-strip/mini-cal — no stale-data indicator. |
| 2 | Match Between System / Real World | 3/4 | Strong student vocabulary (Route 31, "Wake up"), but "Applications" is a bare number vs. the human copy on the other three cards. |
| 3 | User Control and Freedom | 3/4 | Easy to browse any day/date; no "jump to today" once the mini-cal is paged to another month. |
| 4 | Consistency and Standards | 2/4 | Mobile FAB always opens "Add time block" regardless of active tab; header shift-pill and the Shift stat card are two differently-styled controls for the identical action. |
| 5 | Error Prevention | 3/4 | Nothing destructive lives on Home itself, but the mis-targeted FAB invites an unintended action from any other tab. |
| 6 | Recognition Rather Than Recall | 3/4 | Mini-calendar card has no heading at all; one "Up next" row type renders with no icon (a missing key in UPNEXT_ICONS). |
| 7 | Flexibility and Efficiency | 2/4 | Home's own 3 quick-add buttons are a good efficiency win, undercut by the FAB's single hardcoded action. |
| 8 | Aesthetic and Minimalist Design | 3/4 | The "Warm Notebook" palette is genuinely, disciplined honored — but header chrome crowds a screen meant for dozens of daily glances. |
| 9 | Error Recognition/Diagnose/Recover | 2/4 | If the live bus fetch fails or is empty, the Route 31 row just silently doesn't render — no way to tell "nothing soon" from "data unavailable." |
| 10 | Help and Documentation | 2/4 | Schedule/Budget/Meals each carry an inline .hint line; Home — the busiest tab — has none. |
| Total | | 25/40 | Acceptable — significant improvements needed |

## Design Specificity Verdict

Design review (Assessment A): Specific in its data (Route 31/PVTA, "Wake up" flex block, dollar budget, Sanj's name) but generic in its structure — greeting + 4 equal-weight KPI cards + two-column list + quick-add row + mini-cal is a stock SaaS-dashboard skeleton any to-do or finance app could ship. The live bus feed — PRODUCT.md's own stated differentiator — doesn't even earn a stat card; it's demoted to one line in "Up next" while the more generic "Applications" count gets full billing.

Deterministic scan (Assessment B): 37 total findings on the whole file (17 warning, 20 advisory) via impeccable detect; filtered to what's actually in-scope for #tab-home: 9 low-contrast instances, 11px "tiny-text" in two list rows, 2 thin-border-wide-shadow panels, 2 off-scale border-radii (9px, 7px), several off-scale font-sizes, and the cream-palette pattern match. Accuracy note: the detector's own side-tab rule missed .upnext-item's left-border accent (border-left, not top/bottom) — the inverse of a false positive.

Corroboration: A's contrast concern for .sub/.home-date and B's independently-computed 4.37:1 measurement match almost exactly — two separate methods landing on the same real WCAG AA failure.

## Overall Impression

The palette and copy voice are genuinely disciplined — DESIGN.md's own rules are being followed, not just declared. But the dashboard has one real data-correctness bug (stale stat cards), one real rendering bug on the exact device this app is built for (mobile), and a generic-dashboard skeleton doing more of the visual work than the app's actual differentiator (live bus data). The biggest opportunity: make the thing PRODUCT.md says makes this app worth having — combining five life-logistics tools in one glance — visibly true in the dashboard's own hierarchy, not just in its footer text.

## What's Working

1. Real edge-case craft: stat-card-value uses a 2-line clamp and stat-card-sub truncates with ellipsis (index.html:378-379) — a long class or company name won't blow out the card grid.
2. Warm, human empty states: "Nothing left on today's schedule — enjoy the rest of your day," "No applications yet — tap + to log one." Turns blank states into small wins on a screen opened dozens of times a day.
3. The One Accent Rule is actually followed: each stat card gets its own dedicated pastel pair from DESIGN.md's Tertiary set; Confident Indigo stays reserved for actionable elements only, exactly as documented.

## Priority Issues

[P0] Stat cards silently go stale when you change the selected day
- Why it matters: selectDay() and selectCalendarDate() (index.html:2559-2576) update the greeting, up-next list, and mini-cal, but never call renderStatCards() (line 2721) — so Shift/Schedule/Budget/Applications keep showing today's numbers no matter what day is picked. On the one tab whose entire job is "glance and trust the numbers," this is silent wrong data, not a taste issue.
- Fix: call a day-aware renderStatCards() from both selection handlers, or explicitly relabel the row "Today" so users know it never follows the picker.
- Suggested command: /impeccable harden

[P1] The header's closed Calendar popover causes real horizontal overflow on mobile
- Why it matters: mechanically confirmed — document.body.scrollWidth is 496px against a 390px viewport, a 106px overflow. Root cause: #calendarPanel is opacity:0; pointer-events:none (visually closed) but still display:block, width:320px, anchored left:0 inside a widget already ~183px from the left edge — its max-width:calc(100vw - 32px) never engages because the fixed width wins. This sits in the shared header, so it silently widens every tab's page, not just Home's.
- Fix: give the closed popover display:none (or visibility:hidden) instead of relying on opacity/pointer-events alone, so it stops participating in layout while closed.
- Suggested command: /impeccable harden

[P1] Mobile "+" FAB always opens the wrong action off Home/Schedule
- Why it matters: .fab is fixed on every tab under 641px and its click handler always calls openModal(0,null) (add a schedule block) — regardless of tab. Home already teaches a tab-specific "+" pattern via its own three quick-add buttons, so tapping "+" on Applications opens a Schedule modal instead of "add application."
- Fix: make the FAB dispatch to the active tab's own add-action (Budget/Applications/Meals already have one), or drop the global FAB in favor of each tab's native control.
- Suggested command: /impeccable clarify

[P1] Above-the-fold chrome buries the dashboard on mobile
- Why it matters: at 390x844, before any dashboard content renders, the user sees the wordmark+tagline, a shift pill, a Calendar/ICS pill, export/import icons, sync-status text, and a 6-icon tab bar. "Up next today" — the single most time-critical content for a between-classes glance — is cut off at the bottom of the first screen, sitting directly behind the fixed FAB.
- Fix: fold the calendar-feed/export/import/sync-status controls behind the existing settings gear instead of surfacing them inline on every tab.
- Suggested command: /impeccable layout

[P2] Color-only selection state, plus two confirmed WCAG AA contrast failures
- Why it matters: week-strip and mini-cal days signal "selected"/"today" via background/border color alone — no aria-pressed/aria-selected/aria-current anywhere in the render functions, so a screen reader announces 7+30 identical unlabeled buttons. Separately, mechanically measured: Warm Taupe on Warm Ivory computes to 4.37:1 (fails 4.5:1 AA) on the header subtitle/date, and the Shift/Schedule stat-card label pairings fail at 4.41:1 / 4.37:1 (Budget/Apps cards pass at 4.63/4.55). .btn-danger:hover also fails at 4.41:1.
- Fix: add the missing ARIA state attributes to week-strip and mini-cal day buttons; darken Warm Taupe slightly (or reserve it for >=14pt-bold contexts) wherever it sits directly on bare ivory.
- Suggested command: /impeccable harden

## Persona Red Flags

Alex (Power User): Taps "Wed" expecting the dashboard to follow — the 4 stat cards silently stay on today's data (P0), so Alex could act on stale budget/shift info with zero signal it's wrong. On Applications, taps "+" expecting "add application" (Home just taught this pattern) and gets the Schedule modal instead (P1).

Sam (Accessibility-Dependent): Week-strip and mini-cal communicate state through color alone with no ARIA attributes — a screen-reader pass hears 37 identical unlabeled buttons. The header tagline/date sits at 4.37:1 contrast, below AA for normal text, on every single screen of the app.

Casey (Distracted Mobile User): On first load, "Up next today" is cut off at the viewport edge, sitting under the fixed FAB — a hurried one-handed reach for it risks tapping "+" instead and opening an unrelated Schedule modal. The header's own overflow bug means the page quietly scrolls sideways on the exact device this app is designed to be checked on all day.

## Minor Observations

- Header's shift pill and the Home Shift stat card are two differently-styled controls that open the identical #shiftPanel — pick one canonical entry point.
- The mini-calendar card has no heading; every other Home section has one.
- Applications card shows a bare "0" with no zero-state copy, while Shift/Schedule/Budget all use friendly zero-state text — inconsistent voice within the same row.
- No "jump to today" once the mini-cal has been paged to another month.
- The header tagline ("classes, work shifts, and personal routine") omits Budget/Applications/Bus even though Home's own stat row foregrounds two of them.
- em-dash-overuse (8 instances) flagged by the detector is a legitimate advisory but reads as a deliberate "label — instruction" microcopy convention here, not AI-prose smell — not worth changing.

## Questions to Consider

- If the live bus feed is one of PRODUCT.md's five core "at a glance" pillars, why doesn't it get a stat card alongside Shift/Schedule/Budget/Applications?
- Given Home already has three tab-scoped quick-add buttons, what job is the global FAB doing that those don't?
- Since this dashboard is reopened dozens of times a day, should stat cards ever follow the day picker at all — or is the real fix just to make "always today" explicit and permanent?
