---
name: create-apply-confirm
description: Creates an applicant confirmation list page from an existing apply page. Use when the user invokes /create-apply-confirm with a YYYY/MM argument after an apply form exists for that date.
disable-model-invocation: true
---

# Create Apply Confirm Skill

Creates an applicant confirmation list page for an event.

## Prerequisites

- An `apply.astro` must already exist in the target `YYYY/MM` directory
- Event name, form type ID, theme CSS, and page styles are automatically retrieved from the application form

## Usage

```
/create-apply-confirm YYYY/MM
```

### Arguments

- `YYYY/MM`: Required. Year and month of the existing event (e.g. 2026/03)

### Examples

```
/create-apply-confirm 2026/03
```

## Steps

1. Create a branch with `git switch -c page/{{YEAR}}-{{MONTH}}-apply-confirm`.
   If the branch already exists, switch to it with `git switch page/{{YEAR}}-{{MONTH}}-apply-confirm`.
   (`{{YEAR}}` / `{{MONTH}}` are expanded from the arguments)
2. Read the following from `src/pages/$ARGUMENTS/apply.astro`:
   - Event name
   - Form type ID
   - Theme CSS import line (extract the `import "@/styles/themes/...css"` line as-is)
   - The entire `<style>...</style>` block as-is
3. Generate the following files from templates:
   - `apply-confirm.astro` — confirmation list page
   - `_confirm-list.tsx` — confirmation list component
   - `_confirm-list.module.css` — styles
4. Replace placeholders with the retrieved information

## Templates

Use the following files from the `templates/` directory:

- `templates/apply-confirm.astro.template`
- `templates/_confirm-list.tsx.template`
- `templates/_confirm-list.module.css.template`

Template placeholders:
- `{{YEAR}}` — year (4 digits)
- `{{MONTH}}` — month (2 digits, zero-padded)
- `{{EVENT_NAME}}` — event name (retrieved from apply.astro)
- `{{FORM_TYPE}}` — form type ID (YYYYMMa format)
- `{{THEME_IMPORT}}` — theme CSS import line (extracted from apply.astro as-is)
- `{{PAGE_STYLES}}` — the entire `<style>...</style>` block (extracted from apply.astro and inserted as-is)

## Notes

- Error if the application form (apply) does not exist
- The `<style>` in `apply-confirm.astro` is inherited as-is via `{{PAGE_STYLES}}` from apply.astro. Make minimal adjustments only where HTML structure differs (see `docs/design-policy.md`)
- The column definitions (`ConfirmListItem` type and `I` object) in `_confirm-list.tsx` must be customized to match each event's application fields
- After the event ends, it is recommended to replace `<ConfirmList>` in `apply-confirm.astro` with `<ExpiredMessage>` (pages are retained, not deleted)
- Any logic containing `if` / `switch` / `reduce` should be exported to `_calc-<feature>.ts` and called from JSX as a function (this makes it a target for test generation by `form-test-writer`)

## Next Steps After Generation

If the form includes aggregation or conditional logic, run the following after generation:

```
/form-test-writer
```
