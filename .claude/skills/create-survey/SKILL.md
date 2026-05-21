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

1. Create a branch with `git switch -c page/{{YEAR}}-{{MONTH}}-survey`.
   If the branch already exists, switch to it with `git switch page/{{YEAR}}-{{MONTH}}-survey`.
   (`{{YEAR}}` / `{{MONTH}}` are expanded from the arguments)
2. Read the following from `src/pages/$ARGUMENTS/apply.astro`:
   - Event name (from `<h1>` tag etc.)
   - Event date
   - Theme CSS import line (extract the `import "@/styles/themes/...css"` line as-is)
   - The entire `<style>...</style>` block as-is
3. Generate the following files from templates:
   - `survey.astro` — survey page
   - `_survey-form.tsx` — survey form component
   - `_survey-form.module.css` — form styles
   - `_radio-group.tsx` — radio group component (**skip if already exists**)
   - `_radio-group.module.css` — radio group styles (**skip if already exists**)
   - `_submit-button.tsx` — submit button component (**skip if already exists**)
   - `_submit-button.module.css` — submit button styles (**skip if already exists**)
   - `_textarea.tsx` — textarea component (**skip if already exists**)
   - `_textarea.module.css` — textarea styles (**skip if already exists**)
4. Replace placeholders with the retrieved information

## Templates

Use the following files from the `templates/` directory:

- `templates/survey.astro.template`
- `templates/_survey-form.tsx.template`
- `templates/_survey-form.module.css.template`
- `templates/_radio-group.tsx.template`
- `templates/_radio-group.module.css.template`
- `templates/_submit-button.tsx.template`
- `templates/_submit-button.module.css.template`
- `templates/_textarea.tsx.template`
- `templates/_textarea.module.css.template`

Template placeholders:
- `{{YEAR}}` — year (4 digits)
- `{{MONTH}}` — month (2 digits, zero-padded)
- `{{EVENT_NAME}}` — event name (retrieved from apply.astro)
- `{{EVENT_DATE}}` — event date (retrieved from apply.astro)
- `{{FORM_TYPE}}` — form type ID (YYYYMMs format)
- `{{THEME_IMPORT}}` — theme CSS import line (extracted from apply.astro as-is)
- `{{PAGE_STYLES}}` — the entire `<style>...</style>` block (extracted from apply.astro and inserted as-is)

## Notes

- Error if the application form (apply) does not exist
- The `<style>` in `survey.astro` is inherited as-is via `{{PAGE_STYLES}}` from apply.astro. Make minimal adjustments only where HTML structure differs (e.g. added/removed class names) (see `docs/design-policy.md`)
- UI components such as `_radio-group.tsx` / `_submit-button.tsx` are page-specific. Do not share them across pages.
- If `create-apply` was run first, `_radio-group`, `_submit-button`, and `_textarea` files may already exist. In that case, skip them — do not overwrite.
- Customize survey questions as needed after generation.
- Any logic containing `if` / `switch` / `reduce` should be exported to `_calc-<feature>.ts` and called from JSX as a function (this makes it a target for test generation by `form-test-writer`).

## Next Steps After Generation

If the form includes aggregation or conditional logic, run the following after generation:

```
/form-test-writer
```
