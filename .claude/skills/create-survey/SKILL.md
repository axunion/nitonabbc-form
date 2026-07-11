---
name: create-survey
description: Creates a post-event survey form from an existing apply page. Use when the user invokes /create-survey with a YYYY/MM argument after an apply form exists for that date.
disable-model-invocation: true
---

# Create Survey Skill

Creates a post-event survey form.

## Prerequisites

- An `apply.astro` must already exist in the target `YYYY/MM` directory
- Event name, event date, theme CSS, and page styles are automatically retrieved from the application form

## Usage

```
/create-survey YYYY/MM
```

### Arguments

- `YYYY/MM`: Required. Year and month of the existing event (e.g. 2026/03)

### Examples

```
/create-survey 2026/03
```

## Steps

### 1. Read the existing apply page

Error if `src/pages/$ARGUMENTS/apply.astro` does not exist. Read from it:

- Event name (from `<h1>` tag etc.)
- Event date
- Theme CSS import line (extract the `import "@/styles/themes/...css"` line as-is)
- The entire `<style>...</style>` block as-is

Also detect the page layout: new pages keep components in `_components/`; older pages use flat `_`-prefixed files (`_apply-form.tsx`) next to `apply.astro`.

### 2. Confirm the plan with the user (required, before creating anything)

Present the following and get explicit approval **before** creating the branch or any file:

- Extracted event name and event date
- Form type ID: `YYYYMMs` (e.g. `202603s`)
- Branch name: `page/YYYY-MM-survey`

Why this matters: the form type ID is sent to GAS as the `type` parameter and maps 1-to-1 to a Google Spreadsheet target — GAS uses it for the expiry check and to route submissions. The survey type (`...s`) is a separate GAS target from the apply type (`...a`); remind the user that the corresponding GAS/spreadsheet entry must exist before the survey goes live (the dev mock works without it).

### 3. Create the branch

`git switch -c page/{{YEAR}}-{{MONTH}}-survey`. If the branch already exists, switch to it with `git switch page/{{YEAR}}-{{MONTH}}-survey`. (`{{YEAR}}` / `{{MONTH}}` are expanded from the arguments)

### 4. Generate files

Place components in `_components/` inside the page directory (the leading underscore excludes it from Astro routing). If the existing apply page uses the legacy flat layout (`_apply-form.tsx` etc. next to `apply.astro`), follow that flat layout instead — with `_`-prefixed filenames and matching imports — so the page stays internally consistent.

| Template | Destination in `src/pages/YYYY/MM/` |
|---|---|
| `templates/survey.astro.template` | `survey.astro` |
| `templates/survey-form.tsx.template` | `_components/survey-form.tsx` |
| `templates/survey-form.module.css.template` | `_components/survey-form.module.css` |
| `../create-apply/templates/radio-group.tsx.template` | `_components/radio-group.tsx` (**skip if already exists**) |
| `../create-apply/templates/radio-group.module.css.template` | `_components/radio-group.module.css` (**skip if already exists**) |
| `../create-apply/templates/submit-button.tsx.template` | `_components/submit-button.tsx` (**skip if already exists**) |
| `../create-apply/templates/submit-button.module.css.template` | `_components/submit-button.module.css` (**skip if already exists**) |
| `../create-apply/templates/textarea.tsx.template` | `_components/textarea.tsx` (**skip if already exists**) |
| `../create-apply/templates/textarea.module.css.template` | `_components/textarea.module.css` (**skip if already exists**) |

For the skip check on a legacy-layout page, look for the `_`-prefixed equivalents (`_radio-group.tsx` etc.) instead.

### 5. Replace placeholders

Replace placeholders with the information confirmed in Step 2.

## Template placeholders

(`{{MONTH}}` is used only for the branch name in Steps, not in templates)

- `{{YEAR}}` — year (4 digits, copyright year)
- `{{EVENT_NAME}}` — event name (retrieved from apply.astro)
- `{{EVENT_DATE}}` — event date (retrieved from apply.astro)
- `{{FORM_TYPE}}` — form type ID (YYYYMMs format)
- `{{THEME_IMPORT}}` — theme CSS import line (extracted from apply.astro as-is)
- `{{PAGE_STYLES}}` — the entire `<style>...</style>` block (extracted from apply.astro and inserted as-is)

## Notes

- The `<style>` in `survey.astro` is inherited as-is via `{{PAGE_STYLES}}` from apply.astro — the survey belongs to the same event, so it intentionally keeps the apply page's design. Make minimal adjustments only where HTML structure differs (e.g. added/removed class names).
- UI components such as `radio-group.tsx` / `submit-button.tsx` are page-specific. Do not share them across pages.
- If `create-apply` was run first, `radio-group`, `submit-button`, and `textarea` files may already exist. In that case, skip them — do not overwrite.
- Customize survey questions as needed after generation.
- Any logic containing `if` / `switch` / `reduce` should be exported to `_components/calc-<feature>.ts` and called from JSX as a function (this makes it a target for test generation by the `form-test-writer` agent).

## Next Steps After Generation

- If the form includes aggregation or conditional logic, generate tests with the `form-test-writer` agent.
- Review the finished page with the `form-reviewer` agent.
