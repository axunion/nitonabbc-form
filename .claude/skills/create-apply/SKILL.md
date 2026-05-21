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

1. Create a branch with `git switch -c page/{{YEAR}}-{{MONTH}}-apply`.
   If the branch already exists, switch to it with `git switch page/{{YEAR}}-{{MONTH}}-apply`.
   (`{{YEAR}}` / `{{MONTH}}` are expanded from the arguments)
2. Create directory `src/pages/$ARGUMENTS/`
3. Generate the following files from templates:
   - `apply.astro` — application page
   - `_apply-form.tsx` — application form component
   - `_apply-form.module.css` — form styles
   - `_input.tsx` — input component
   - `_input.module.css` — input styles
   - `_radio-group.tsx` — radio group component
   - `_radio-group.module.css` — radio group styles
   - `_submit-button.tsx` — submit button component
   - `_submit-button.module.css` — submit button styles
   - `_textarea.tsx` — textarea component
   - `_textarea.module.css` — textarea styles
4. Replace placeholders based on arguments:
   - Event name
   - Event date
   - Form type ID (e.g. `202603a`)
   - Copyright year

## Templates

Use the following files from the `templates/` directory:

- `templates/apply.astro.template`
- `templates/_apply-form.tsx.template`
- `templates/_apply-form.module.css.template`
- `templates/_input.tsx.template`
- `templates/_input.module.css.template`
- `templates/_radio-group.tsx.template`
- `templates/_radio-group.module.css.template`
- `templates/_submit-button.tsx.template`
- `templates/_submit-button.module.css.template`
- `templates/_textarea.tsx.template`
- `templates/_textarea.module.css.template`

Template placeholders:
- `{{YEAR}}` — year (4 digits)
- `{{MONTH}}` — month (2 digits, zero-padded)
- `{{EVENT_NAME}}` — event name
- `{{EVENT_DATE}}` — event date
- `{{FORM_TYPE}}` — form type ID (YYYYMMa format)

## Notes

- **Theme and design**: `apply.astro.template` defaults to `indigo.css`, but do not use it as-is. Check `src/styles/themes/` for available themes and choose one that fits the event's atmosphere, or create a new theme. Also redesign the `<style>` block from scratch — do not copy the template as-is. Design something unique for this event (see `docs/design-policy.md`).
- UI components such as `_input.tsx` / `_submit-button.tsx` are page-specific. Do not share them across pages.
- The templates for `_radio-group`, `_submit-button`, and `_textarea` also exist in the `create-survey` skill. Since `create-survey` skips existing files, no synchronization is needed.
- Survey forms should be created separately with `/create-survey` after the application period ends.
- Customize the form fields as needed after generation.
- Any logic containing `if` / `switch` / `reduce` should be exported to `_calc-<feature>.ts` and called from JSX as a function (this makes it a target for test generation by `form-test-writer`).

## Next Steps After Generation

If the form includes calculation logic (fee calculation, participant count conditions, etc.), run the following after generation:

```
/form-test-writer
```
