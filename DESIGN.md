---
name: Sanj's Planner
description: A single-page personal planner for classes, work shifts, budget, meals, applications, and bus times.
colors:
  confident-indigo: "#4f46e5"
  confident-indigo-hover: "#4338ca"
  warm-ivory: "#f7f4ef"
  paper-white: "#ffffff"
  soft-stone: "#e7e5e4"
  ink: "#18181b"
  warm-taupe: "#716b66"
  soft-blue-bg: "#dbeafe"
  soft-blue-fg: "#1d4ed8"
  soft-green-bg: "#d1fae5"
  soft-green-fg: "#047857"
  soft-violet-bg: "#ede9fe"
  soft-violet-fg: "#6d28d9"
  soft-amber-bg: "#fef3c7"
  soft-amber-fg: "#b45309"
  soft-red-bg: "#fee2e2"
  soft-red-fg: "#b91c1c"
  soft-gray-bg: "#f4f4f5"
  soft-gray-fg: "#52525b"
  peach-bg: "#ffedd5"
  peach-fg: "#c2410c"
  periwinkle-bg: "#e0e7ff"
  periwinkle-fg: "#4338ca"
  accent-shift-bg: "#eff6ff"
  accent-shift-fg: "#2563eb"
  accent-schedule-bg: "#f5f3ff"
  accent-schedule-fg: "#7c3aed"
  accent-budget-bg: "#fffbeb"
  accent-budget-fg: "#d97706"
  accent-apps-bg: "#ecfdf5"
  accent-apps-fg: "#059669"
  accent-meals-bg: "#ffedd5"
  accent-meals-fg: "#c2410c"
  accent-bus-bg: "#ecfeff"
  accent-bus-fg: "#0e7490"
typography:
  display:
    fontFamily: "Ephesis, cursive"
    fontSize: "44px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Quicksand, -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Quicksand, -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: "Quicksand, -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.3
rounded:
  xs: "6px"
  sm: "8px"
  md: "10px"
  lg: "16px"
  full: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "18px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.confident-indigo}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "9px 18px"
  button-primary-hover:
    backgroundColor: "{colors.confident-indigo-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.warm-taupe}"
    rounded: "{rounded.full}"
    padding: "9px 18px"
  button-ghost-hover:
    textColor: "{colors.ink}"
  tab-active:
    backgroundColor: "{colors.confident-indigo}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "9px 16px"
  card:
    backgroundColor: "{colors.paper-white}"
    rounded: "{rounded.md}"
---

# Design System: Sanj's Planner

## Overview

**Creative North Star: "The Warm Notebook"**

Sanj's Planner reads like a well-kept paper planner, not a corporate dashboard: an ivory page, soft pastel tab colors for each life category, and one confident indigo used sparingly for anything actionable. It is a personal, single-user tool built to be glanced at dozens of times a day — on a phone between classes, on a laptop before a shift — so it stays calm, legible, and fast rather than expressive or decorative. There is no dark mode and no ambient/animated background: an earlier ambient sky-gradient and dark-mode concept was built and explicitly rejected as "not working," and the system settled on a single flat, warm, light theme instead. Every interactive element gives the same small, quiet confirmation on press — a slight scale-down — rather than a color flash or ripple.

**Key Characteristics:**
- Flat, warm-neutral canvas (ivory page, white cards) with one saturated accent color used deliberately
- A distinct soft-pastel color per life category (classes, shifts, meals, budget, applications) for at-a-glance scanning
- Fully rounded pill shapes for anything tappable; softly rounded corners everywhere else
- Near-flat elevation at rest; a real shadow appears only when something floats above the page
- A single script wordmark ("Ephesis") reserved for the "Sanj's Planner" title only — everything else is Quicksand

## Colors

Warm and restrained: a neutral ivory-and-white base carries the page, one indigo accent marks anything actionable, and a family of soft pastel tag colors — never more than one or two per screen — separates categories of information.

### Primary
- **Confident Indigo** (#4f46e5): The one saturated color in the system. Used only for the active tab pill, primary buttons, the floating add button, links, and focus rings — never for decoration or backgrounds.
- **Confident Indigo, Hover** (#4338ca): The pressed/hover state of Confident Indigo.

### Secondary
Soft pastel bg/fg pairs used for category tags, application-status badges, and meal chips. Each pair is a background tint plus a saturated foreground for text/icons on that tint.
- **Soft Blue** (#dbeafe / #1d4ed8): College classes; "Applied" application status.
- **Soft Green** (#d1fae5 / #047857): Personal events; "Offer" application status.
- **Soft Violet** (#ede9fe / #6d28d9): Work/other events; "OA / Assessment" application status.
- **Soft Amber** (#fef3c7 / #b45309): "Interviewing" application status.
- **Soft Red** (#fee2e2 / #b91c1c): "Rejected" application status.
- **Soft Gray** (#f4f4f5 / #52525b): "Ghosted" application status.
- **Peach** (#ffedd5 / #c2410c): Lunch meal chips.
- **Periwinkle** (#e0e7ff / #4338ca): Dinner meal chips.

### Tertiary
One feature-accent per tab — the app's six-color wayfinding system. Each tab's accent now colors that tab's own containers and pills (not just an icon), and the same six hexes are the only tab identities that exist; distinct from the Secondary set above even where a hue rhymes:
- **Accent Shift** (#eff6ff / #2563eb): Home's Shift stat card and icon.
- **Accent Schedule** (#f5f3ff / #7c3aed): Home's Schedule stat card, Schedule tab's toolbar top-border, inactive Schedule tab icon.
- **Accent Budget** (#fffbeb / #d97706): Home's Budget stat card, the Budget tab's heading underline, the active budget-switcher pill, the category-header row wash, inactive Budget tab icon.
- **Accent Apps** (#ecfdf5 / #059669): Home's Applications stat card, the Applications tab's heading underline, inactive Applications tab icon.
- **Accent Meals** (#ffedd5 / #c2410c): the Meals tab's heading underline, inactive Meals tab icon. Deliberately the same hex as Secondary's Peach (lunch chips) — Meals' whole tab identity is that color family.
- **Accent Bus** (#ecfeff / #0e7490): the Bus tab's heading underline, inactive Bus tab icon. The one tertiary hue with no Secondary-palette relative — introduced for Bus since transit had no existing color to inherit.

### Neutral
- **Warm Ivory** (#f7f4ef): Page background.
- **Paper White** (#ffffff): Card, table, panel, and input surfaces.
- **Soft Stone** (#e7e5e4): Borders and dividers, everywhere.
- **Ink** (#18181b): Primary text.
- **Warm Taupe** (#716b66): Secondary/muted text — labels, captions, placeholders, helper copy. Darkened slightly from an earlier #78716c after a critique found it failing WCAG AA (4.5:1) against the page background and two of the four stat-card tints; this value clears AA against all of them.

### Named Rules
**The One Accent Rule.** Confident Indigo appears only on things you can act on (buttons, the active tab, links, the FAB, focus rings). It never appears as a background tint or decoration — that restraint is what keeps it meaningful. This governs Indigo specifically; it does not restrict the Secondary/Tertiary category colors below, which are meant to be used generously.

**The Category Owns Its Color Rule.** Once a UI element is *about* a specific category or status (a tab, a stat card, a status filter, a budget), it wears that category's own accent — never generic Indigo, never plain gray. A stat card's border tints to its own accent (not `--color-border`); a status filter's active state fills with that exact status's color (Interviewing = amber, Rejected = red — not one indigo for all six); the active budget-switcher pill is Accent Budget, not Confident Indigo. Only truly generic, non-categorized actions (a primary "Save" button, the active tab pill itself, the FAB) get Confident Indigo. When adding a new category or status anywhere, give it a real accent from this page and apply it to both its small chip *and* whatever container/pill represents it at rest — a color that only shows up in one place isn't finished.

## Typography

**Display Font:** Ephesis (cursive/script), with a `cursive` fallback
**Body Font:** Quicksand, with `-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif` fallbacks

**Character:** A single ornamental script wordmark against an otherwise entirely geometric-sans interface — Ephesis is reserved for one moment (the page title) so it reads as a signature, not a typeface choice repeated until it loses meaning.

### Hierarchy
- **Display** (400, 44px / 34px on narrow screens, 1.1 line-height, -0.02em tracking): the "Sanj's Planner" wordmark only. Never used for anything else.
- **Headline** (800, 16-18px, -0.01em tracking): section titles ("Good morning, Sanj", modal titles, "Budgets", "Applications").
- **Body** (500, 14px): default running text, subtitles, form values.
- **Label** (600-700, 11-13px): stat card labels, table headers, badges, meta text, timestamps. Often paired with Warm Taupe for de-emphasis.

### Named Rules
**The One-Wordmark Rule.** Ephesis renders exactly once per screen — the page title. Every other heading, however large, stays in Quicksand at a heavier weight instead of switching typeface.

## Layout

Single-column, content-first layout capped at a comfortable reading width, with a persistent header (title + sync/utility controls) and a pill-shaped tab bar directly below it. Each tab is a self-contained view — a dashboard, a 7-day grid, a table, or a list — with no shared sidebar or persistent chrome beyond the header and tab bar. Density is comfortable rather than dense: generous internal padding (14-24px) on cards and rows, with a de-facto spacing rhythm of 4 / 8 / 14 / 18 / 24px. On narrow screens the tab bar collapses to icon-only pills (labels visually hidden, not removed) and the header's utility controls move from an absolute top-right corner into the normal document flow.

## Elevation & Depth

Mostly flat: cards, rows, and tables at rest carry only a barely-visible ambient shadow (`0 1px 3px rgba(24,24,27,0.05)`) that reads more as a soft edge than a lift. A real, visible shadow is reserved for things that float above the page's own stacking order — popovers, the shift/calendar panels, modal sheets, and the floating add button — signaling "this is temporarily on top," not "this is important."

### Shadow Vocabulary
- **Resting** (`0 1px 3px rgba(24,24,27,0.05)`): default state for cards, tables, list containers.
- **Hover lift** (`0 4-6px 10-16px rgba(24,24,27,0.12-0.14)`): cards and time-blocks on hover, paired with a small `translateY(-1px to -2px)`.
- **Floating** (`0 8-24px 20-24px rgba(24,24,27,0.14-0.2)`): popovers, panels, modals, the FAB — content that overlays the page.

### Named Rules
**The Float-Only Shadow Rule.** A visible shadow is a signal that something is temporarily above the page (a panel, a modal, a hovered card) — never a permanent decoration on static content.

## Shapes

Two corner languages, chosen by purpose: fully rounded pills (`border-radius: 999px`) for anything tappable — buttons, tabs, chips, badges, search-adjacent controls — and a softer rounded-rectangle (`8-10px`, `var(--radius)` = 10px as the default card radius) for containers: cards, tables, panels, inputs. Small circular icon buttons use `border-radius: 50%`. Bottom-sheet modals round only their top corners on narrow screens (`16px 16px 0 0`) and become a fully-rounded centered sheet at ≥640px. Borders are a consistent 1px Soft Stone hairline; dashed 1px borders mark an explicit empty "add" affordance (empty meal slots, empty budget categories).

## Components

### Buttons
- **Shape:** fully rounded pill (`border-radius: 999px`), 9px/18px padding.
- **Primary:** Confident Indigo background, white text; hover darkens to Confident Indigo Hover.
- **Ghost:** transparent background, Warm Taupe text; hover darkens to Ink. Used for secondary actions ("Clear schedule", "+ Add item").
- **Press feedback:** every button scales down on `:active` (0.93-0.98 depending on size) over a ~150ms ease-out transition — the system's one universal tactile cue, applied identically to buttons, tabs, chips, and icon buttons alike.

### Chips / Badges
- **Style:** Secondary-palette bg/fg pair, fully rounded, small (11-13px) bold text, 3-12px horizontal padding depending on context (badge vs. chip).
- **State:** category tags and status badges are read-only color; meal/budget chips include an inline "×" remove affordance.

### Cards / Containers
- **Corner style:** 10px (`var(--radius)`) standard; small nested elements (inputs, mini time-blocks) drop to 6-8px.
- **Background:** Paper White on Warm Ivory.
- **Shadow strategy:** Resting shadow only (see Elevation & Depth); no border in addition to the shadow on primary cards, but list/table containers add a 1px Soft Stone border too.
- **Internal padding:** 14-16px typical, up to 20-24px for modal sheets.

### Inputs / Fields
- **Style:** 1px Soft Stone border, Paper White background, 8px radius, 9-10px padding, inherits body font.
- **Focus:** border/outline shifts to Soft Stone at 1px inset outline (form fields) or to Confident Indigo (the mini-calendar's "today" ring uses an inset Confident Indigo ring).
- **Empty/dashed affordance:** a 1px dashed Soft Stone border marks an explicit "nothing here yet, tap to add" state, distinct from a normal solid-border input.

### Navigation (Tab Bar)
- **Style:** a single Paper White pill container (`border-radius: 999px`) holding icon+label tab buttons; the active tab is a smaller Confident Indigo pill nested inside, everything else transparent with Warm Taupe text/icon.
- **States:** inactive tabs darken text to Ink on hover; active tab is solid Confident Indigo with white text/icon.
- **Mobile:** labels visually hidden (kept for screen readers), tabs become equal-width icon-only pills that fill the bar.

### Time Blocks (signature component)
The Schedule tab's positioned event blocks are the app's most distinctive custom component: an absolutely-positioned card with a 3px solid left border in the category's saturated color, that category's soft tint as background, a bold title line and a smaller muted time-range line beneath it, 6px corner radius, and the same hover-lift / active-press behavior as every other interactive element. Three color families only (College/blue, Personal/green, Work-Other/violet) keep a dense week grid scannable at a glance.

## Do's and Don'ts

### Do:
- **Do** reserve Confident Indigo for actionable elements only (buttons, active tab, links, FAB, focus rings) — never as a decorative fill or background tint.
- **Do** apply the universal press-down scale (`transform: scale(0.93-0.98)`, ~150ms ease-out) to every new tappable element.
- **Do** use the existing Secondary/Tertiary pastel pairs for any new category or status, rather than introducing a new hue.
- **Do** keep shadows near-invisible on static content and reserve a visible shadow for anything that floats above the page.

### Don't:
- **Don't** reintroduce an ambient gradient background, animated sky, or dark mode — both were built and explicitly rejected; the system is a single flat, warm, light theme by deliberate decision, not by omission.
- **Don't** use the Ephesis script font anywhere except the single "Sanj's Planner" wordmark.
- **Don't** add a border-and-shadow combination to a resting card — pick one (border for list/table containers, shadow-only for freestanding cards) rather than stacking both as a default.
- **Don't** introduce a new framework, build step, or npm dependency to achieve a visual effect this system doesn't already support with plain CSS.
