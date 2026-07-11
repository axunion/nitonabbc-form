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

### 1. Read the existing apply page

Error if `src/pages/$ARGUMENTS/apply.astro` does not exist. Read from it:

- Event name
- Form type ID
- Theme CSS import line (extract the `import "@/styles/themes/...css"` line as-is)
- The entire `<style>...</style>` block as-is

Also detect the page layout: new pages keep components in `_components/`; older pages use flat `_`-prefixed files next to `apply.astro`.

### 2. Confirm the plan with the user (required, before creating anything)

Present the following and get explicit approval **before** creating the branch or any file:

- Extracted event name
- Form type ID (`YYYYMMa`, taken from the apply page — this page reads the same GAS spreadsheet target that apply submissions are written to)
- Branch name: `page/YYYY-MM-apply-confirm`

The type ID is sent to GAS as the `type` parameter to fetch the applicant list; if it does not match the apply page's ID, the list shows nothing in production.

### 3. Create the branch

`git switch -c page/{{YEAR}}-{{MONTH}}-apply-confirm`. If the branch already exists, switch to it with `git switch page/{{YEAR}}-{{MONTH}}-apply-confirm`. (`{{YEAR}}` / `{{MONTH}}` are expanded from the arguments)

### 4. Generate files

Place components in `_components/` inside the page directory (the leading underscore excludes it from Astro routing). If the existing apply page uses the legacy flat layout (`_apply-form.tsx` etc. next to `apply.astro`), follow that flat layout instead — with `_`-prefixed filenames and matching imports — so the page stays internally consistent.

| Template | Destination in `src/pages/YYYY/MM/` |
|---|---|
| `templates/apply-confirm.astro.template` | `apply-confirm.astro` |
| `templates/confirm-list.tsx.template` | `_components/confirm-list.tsx` |
| `templates/confirm-list.module.css.template` | `_components/confirm-list.module.css` |

### 5. Replace placeholders

Replace placeholders with the information confirmed in Step 2.

## Template placeholders

(`{{YEAR}}` / `{{MONTH}}` are used only for the branch name in Steps, not in templates)

- `{{EVENT_NAME}}` — event name (retrieved from apply.astro)
- `{{FORM_TYPE}}` — form type ID (YYYYMMa format)
- `{{THEME_IMPORT}}` — theme CSS import line (extracted from apply.astro as-is)
- `{{PAGE_STYLES}}` — the entire `<style>...</style>` block (extracted from apply.astro and inserted as-is)

## Notes

- The `<style>` in `apply-confirm.astro` is inherited as-is via `{{PAGE_STYLES}}` from apply.astro — it belongs to the same event, so it intentionally keeps the apply page's design. Make minimal adjustments only where HTML structure differs.
- The column definitions (`ConfirmListItem` type and `I` object) in `confirm-list.tsx` must be customized to match each event's application fields.
- After the event ends, it is recommended to replace `<ConfirmList>` in `apply-confirm.astro` with `<ExpiredMessage>` (pages are retained, not deleted).
- Any logic containing `if` / `switch` / `reduce` should be exported to `_components/calc-<feature>.ts` and called from JSX as a function (this makes it a target for test generation by the `form-test-writer` agent).

## Next Steps After Generation

- If the page includes aggregation or conditional logic, generate tests with the `form-test-writer` agent.
- Review the finished page with the `form-reviewer` agent.
