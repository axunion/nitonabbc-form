---
name: create-apply
description: Creates a new event application form with SolidJS components, CSS modules, and a git branch. Use when the user invokes /create-apply with a YYYY/MM argument to scaffold a new event registration page.
disable-model-invocation: true
---

# Create Apply Skill

Creates a participation application form for an event.

## Usage

```
/create-apply YYYY/MM [event-name] [event-date]
```

### Arguments

- `YYYY/MM`: Required. Year and month of the event (e.g. 2026/03)
- `event-name`: Optional. Default: 京葉地区合同青年会
- `event-date`: Optional. Default: YYYY年M月（日付未定）

### Examples

```
/create-apply 2026/03
/create-apply 2026/03 京葉地区青年キャンプ 2026年3月15日〜16日
```

## Steps

### 1. Confirm the plan with the user (required, before creating anything)

Derive the following from the arguments and present them to the user for explicit approval **before** creating the branch or any file:

- Target directory: `src/pages/YYYY/MM/`
- Form type ID: `YYYYMMa` (e.g. `202603a`)
- Event name and event date — state explicitly when a default is being used
- Branch name: `page/YYYY-MM-apply`

Why this matters: the form type ID is sent to GAS as the `type` parameter and maps 1-to-1 to a Google Spreadsheet target. GAS uses it both to decide whether the form is still open (expiry check in `FormContainer`) and to route submissions. A wrong ID means the production form silently fails, so never skip this confirmation. Also remind the user that the corresponding GAS/spreadsheet entry must exist before the form goes live (the dev mock works without it).

### 2. Generate a design brief (required, before generating files)

Each page is an independent site (see README →「設計方針」) and must look and feel
distinct from recent event pages — not just a different accent color on the same
layout. This step is never skipped and never defaults silently to a previous page's
look.

1. Look up the last 1–2 event pages under `src/pages/`: read their
   `_components/theme.css` (the brand color values) and their `apply.astro`
   `<style>` block (the layout/decoration). This is context for the next step, not
   something to copy — there's no shared theme file to grep for anymore, every page
   already has its own.
2. Invoke the `frontend-design` skill (an installed plugin skill, not part of this
   repo — if it's unavailable in the current environment, tell the user before
   falling back to writing the brief yourself) to produce a design brief for this event —
   color/token direction, mood, and a layout concept (its own process already screens
   out generic "AI template" defaults). Give it the event name, event date/month, and
   the note from step 1 with an explicit instruction: reusing the same brand palette
   or the same decorative layout pattern as the last 1–2 events is not allowed unless
   there's a concrete reason (e.g. a themed series), and that reason must be stated.
3. Summarize the resulting brief (palette, mood, layout concept) and confirm it with
   the user via `AskUserQuestion` — combine with Step 1's confirmation in a single
   call when possible.

The brief drives Step 5. Nothing in Step 4's file generation depends on it yet.

### 3. Create the branch

`git switch -c page/{{YEAR}}-{{MONTH}}-apply`. If the branch already exists, switch to it with `git switch page/{{YEAR}}-{{MONTH}}-apply`. (`{{YEAR}}` / `{{MONTH}}` are expanded from the arguments)

### 4. Generate files

Page-private code is colocated in the `_components/` directory inside the page directory. The leading underscore excludes it from Astro routing, so only `apply.astro` becomes a route.

These templates are structural — logic and markup that must exist for the form to
work, independent of visual design — and are copied as-is (placeholders replaced):

| Template | Destination in `src/pages/YYYY/MM/` |
|---|---|
| `templates/apply.astro.template` | `apply.astro` |
| `templates/apply-form.tsx.template` | `_components/apply-form.tsx` |
| `templates/church-names.ts.template` | `_components/church-names.ts` |
| `templates/input.tsx.template` | `_components/input.tsx` |
| `templates/radio-group.tsx.template` | `_components/radio-group.tsx` |
| `templates/submit-button.tsx.template` | `_components/submit-button.tsx` |
| `templates/textarea.tsx.template` | `_components/textarea.tsx` |

There are deliberately no `.module.css` templates, no `theme.css` template, and
`apply.astro.template` has no `<style>` block — the visual layer (including
`_components/theme.css`) is authored fresh in Step 5 from the design brief, not
copied from boilerplate or from any other page. See "CSS Modules contract" below for
what that fresh CSS must satisfy structurally.

Images and other static assets go in `_assets/` inside the page directory, imported from `.astro` / `.tsx` files. Create `_assets/` only when an asset actually exists — never preemptively.

#### CSS Modules contract

Each `_components/*.tsx` file above imports a `styles` object from a same-named
`.module.css` file and references specific properties on it. Those property names are
a hard contract — `.tsx` code breaks silently (an `undefined` class, not a crash) if
the CSS module doesn't define them. Values, layout, colors, and any state styling
beyond what's listed are entirely free.

| CSS Module | Required class names | Must visually distinguish |
|---|---|---|
| `apply-form.module.css` | `.form` | — |
| `input.module.css` | `.wrapper`, `.input` | `:focus` (visible), `:disabled` |
| `textarea.module.css` | `.textarea` | `:focus` (visible), `:disabled` |
| `radio-group.module.css` | `.horizontal`, `.vertical`, `.label`, `.radio` | disabled option (e.g. via `:has(:disabled)` on `.label`) |
| `submit-button.module.css` | `.button` | `:disabled` (and typically `:hover`) |

CSS Modules scope `@keyframes` names locally, so an animation referenced here can't
resolve to one defined in `global.css` — redefine any keyframe you use inside the
same module.

`apply.astro`'s own class names (`.page`, `.page-header`, etc.) are **not** a
contract — nothing outside that file references them, so they can be renamed or
restructured freely along with the `<style>` block itself.

### 5. Author the visual design from the brief

Using the brief confirmed in Step 2, write the visual layer fresh — do not reuse a
previous event's CSS values as a starting point beyond what the brief calls for:

1. **Theme file** (`_components/theme.css`): there is no shared theme directory to
   pick from — always author this fresh for the event (pages never share a theme file;
   see README →「設計方針」). It must define exactly these custom-property names
   (values are yours to choose for the brand group; see the split below):
   - **Brand — reinterpret freely per event, this is where the event's identity
     lives**: `--color-brand-200/300/400/500/600/700`, `--color-brand-deep-700/800`,
     `--color-accent-100/400/600`
   - **Status/neutral — keep these exact literal values on every page** (shared
     components read them for a fixed meaning, e.g. `ErrorMessage`/`ExpiredMessage`,
     and recoloring them — an error message in gold — breaks that meaning site-wide,
     not just for this page):
     ```
     --color-green-100: #dcfce7;   --color-green-600: #16a34a;
     --color-green-700: #15803d;   --color-green-800: #166534;
     --color-red-100: #fee2e2;     --color-red-400: #f87171;
     --color-red-500: #ef4444;     --color-red-600: #dc2626;
     --color-red-700: #b91c1c;     --color-red-800: #991b1b;
     --color-orange-500: #f97316;
     --color-gray-50: #f9fafb;     --color-gray-300: #d1d5db;
     --color-gray-400: #9ca3af;    --color-gray-700: #374151;
     --color-slate-100: #f1f5f9;   --color-white: #ffffff;
     --color-emerald-500: #10b981;
     ```
   - **Scale — names required, values normally reused as-is** so shared components
     render at a predictable size (deviate only if the brief specifically calls for a
     different rhythm):
     ```
     --space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
     --space-4: 1rem;     --space-6: 1.5rem;   --space-8: 2rem;
     --space-10: 2.5rem;  --space-12: 3rem;    --space-20: 5rem;
     --text-xs: 0.75rem;  --text-sm: 0.875rem; --text-base: 1rem;
     --text-lg: 1.125rem; --text-xl: 1.25rem;  --text-2xl: 1.5rem;
     --text-3xl: 1.875rem; --text-8xl: 6rem;   --text-9xl: 8rem;
     --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
     --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
     --radius-sm: 0.125rem; --radius-md: 0.375rem;
     --radius-lg: 0.5rem;   --radius-full: 9999px;
     ```

   Missing a required name is a real bug, not a style nit — `.tsx`/`.module.css` code
   elsewhere references these directly and silently loses its styling if one is absent.
2. **Component CSS**: write `_components/*.module.css` for each file listed in the
   contract table above, satisfying the required class names, reflecting the chosen
   direction (not the shape of any previous event's CSS).
3. **Page shell**: write `apply.astro`'s `<style>` block and any decorative markup
   (a header treatment, a background motif, etc.) from scratch per the brief. A wave
   divider and gradient header are one option, not the default — the brief may call
   for something else entirely.
4. **Quality floor** (self-check before calling this done): responsive down to
   mobile width, visible keyboard focus on all interactive elements, `prefers-reduced-motion`
   respected for any animation, and readable color contrast. No current agent checks
   these, so verify them yourself.

### 6. Replace placeholders

Based on the confirmed values from Step 1:

- Event name
- Event date
- Form type ID (e.g. `202603a`)
- Copyright year

## Template placeholders

(`{{MONTH}}` is used only for the branch name in Steps, not in templates)

- `{{YEAR}}` — year (4 digits, copyright year)
- `{{EVENT_NAME}}` — event name
- `{{EVENT_DATE}}` — event date
- `{{FORM_TYPE}}` — form type ID (YYYYMMa format)

## Notes

- UI components such as `input.tsx` / `submit-button.tsx` are page-specific. Do not share them across pages.
- The `.tsx` templates for `radio-group`, `submit-button`, and `textarea` are also used by the `create-survey` skill (referenced from this skill's `templates/` directory) — keep them generic enough for both apply and survey pages. Their `.module.css` is authored per-page, not templated (see Step 5), so `create-survey` reuses whichever one already exists for that event rather than a shared boilerplate file.
- Survey forms should be created separately with `/create-survey` after the application period ends.
- Customize the form fields as needed after generation.
- Any logic containing `if` / `switch` / `reduce` should be exported to `_components/calc-<feature>.ts` and called from JSX as a function (this makes it a target for test generation by the `tester` agent).

## Next Steps After Generation

- If the form includes calculation logic (fee calculation, participant count conditions, etc.), generate tests with the `tester` agent.
- Review the finished page with the `reviewer` agent.
- Run the `inspector` agent. Per CLAUDE.md's visual-verification criteria, a freshly
  authored theme plus several component stylesheets is exactly the "change spanning
  multiple components sharing styles" case that calls for it, not a quick glance.
