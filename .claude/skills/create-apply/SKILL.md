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

Ask with `AskUserQuestion`; combine with the design questions from Step 2 in a single call when possible.

### 2. Decide the design direction (required, before generating files)

Each page is an independent site and should look intentionally different from previous events (see README →「設計方針」). Decide the following **before** writing any file:

- **Color / theme**: check `src/styles/themes/` for existing themes; creating a new theme file is equally valid. Token contract: shared form components rely on `--color-*` / `--space-*` / `--text-*` / `--radius-*` / `--shadow-*`, so a new theme must define the full token set of an existing theme (`indigo.css`).
- **Mood**: seasonal, festive, formal, calm, etc. — draw on the event name and the event month.
- **Differentiation**: at least one visual/layout element that distinguishes this page from the last 1–2 event pages (compare recent directories under `src/pages/`).

If the event context does not clearly imply a direction, ask the user with `AskUserQuestion` (offer concrete color/mood options). Never fall back silently to the template's default look.

### 3. Create the branch

`git switch -c page/{{YEAR}}-{{MONTH}}-apply`. If the branch already exists, switch to it with `git switch page/{{YEAR}}-{{MONTH}}-apply`. (`{{YEAR}}` / `{{MONTH}}` are expanded from the arguments)

### 4. Generate files

Page-private code is colocated in the `_components/` directory inside the page directory. The leading underscore excludes it from Astro routing, so only `apply.astro` becomes a route.

| Template | Destination in `src/pages/YYYY/MM/` |
|---|---|
| `templates/apply.astro.template` | `apply.astro` |
| `templates/apply-form.tsx.template` | `_components/apply-form.tsx` |
| `templates/apply-form.module.css.template` | `_components/apply-form.module.css` |
| `templates/church-names.ts.template` | `_components/church-names.ts` |
| `templates/input.tsx.template` | `_components/input.tsx` |
| `templates/input.module.css.template` | `_components/input.module.css` |
| `templates/radio-group.tsx.template` | `_components/radio-group.tsx` |
| `templates/radio-group.module.css.template` | `_components/radio-group.module.css` |
| `templates/submit-button.tsx.template` | `_components/submit-button.tsx` |
| `templates/submit-button.module.css.template` | `_components/submit-button.module.css` |
| `templates/textarea.tsx.template` | `_components/textarea.tsx` |
| `templates/textarea.module.css.template` | `_components/textarea.module.css` |

Images and other static assets go in `_assets/` inside the page directory, imported from `.astro` / `.tsx` files. Create `_assets/` only when an asset actually exists — never preemptively.

### 5. Replace placeholders

Based on the confirmed values from Step 1:

- Event name
- Event date
- Form type ID (e.g. `202603a`)
- Copyright year

### 6. Apply the decided design

The templates are a functional wireframe, not a finished design. Using the direction decided in Step 2:

- Replace the theme import (`apply.astro.template` defaults to `indigo.css` — do not keep it unless Step 2 chose it).
- Redesign the `<style>` block in `apply.astro` from scratch — do not ship the template styles as-is.
- Adjust `_components/*.module.css` so form parts (inputs, buttons, radio groups) reflect the chosen direction instead of the template defaults.

## Template placeholders

(`{{MONTH}}` is used only for the branch name in Steps, not in templates)

- `{{YEAR}}` — year (4 digits, copyright year)
- `{{EVENT_NAME}}` — event name
- `{{EVENT_DATE}}` — event date
- `{{FORM_TYPE}}` — form type ID (YYYYMMa format)

## Notes

- UI components such as `input.tsx` / `submit-button.tsx` are page-specific. Do not share them across pages.
- The templates for `radio-group`, `submit-button`, and `textarea` are also used by the `create-survey` skill (referenced from this skill's `templates/` directory) — keep them generic enough for both apply and survey pages.
- Survey forms should be created separately with `/create-survey` after the application period ends.
- Customize the form fields as needed after generation.
- Any logic containing `if` / `switch` / `reduce` should be exported to `_components/calc-<feature>.ts` and called from JSX as a function (this makes it a target for test generation by the `form-test-writer` agent).

## Next Steps After Generation

- If the form includes calculation logic (fee calculation, participant count conditions, etc.), generate tests with the `form-test-writer` agent.
- Review the finished page with the `form-reviewer` agent.
