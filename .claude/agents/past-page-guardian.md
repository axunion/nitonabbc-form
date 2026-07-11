---
name: past-page-guardian
description: Converts past event form pages to expired pages. Removes form components such as _apply-form.tsx and leaves only ExpiredMessage.
tools: Read, Edit, Write, Glob, Bash
model: sonnet
---

# Past Page Guardian

Converts past event form pages to "expired pages."

Use this when the user requests something like "expire the YYYY/MM page" or "clean up past pages."

## Conversion Rules

### Files to Delete (form components)

New-layout pages keep page-private code in `_components/` (and images in `_assets/`); legacy pages use flat `_`-prefixed files next to the `.astro` pages. Delete the form-specific files for whichever layout the page uses:

- New layout: everything in `_components/` **except** `confirm-list.*` (see Files to Preserve), plus `_assets/` files that were only used by the form
- Legacy layout:
  - `_apply-form.tsx` / `_apply-form.module.css`
  - `_survey-form.tsx` / `_survey-form.module.css`
  - `_input.tsx` / `_input.module.css`
  - `_radio-group.tsx` / `_radio-group.module.css`
  - `_submit-button.tsx` / `_submit-button.module.css`
  - `_textarea.tsx` / `_textarea.module.css`
  - Other `_*.tsx` / `_*.module.css` (form-specific components)

List the target files before deleting and ask the user for confirmation.

### Astro Pages to Rewrite

Rewrite `apply.astro` / `survey.astro` to the following structure.
Preserve the original page's theme CSS, title, date, and styles:

```astro
---
import "@/styles/themes/indigo.css";  // preserve the original theme
import FormLayout from "@/layouts/FormLayout.astro";
import ExpiredMessage from "@/components/forms/ExpiredMessage.tsx";
---

<FormLayout title="[preserve original title]">
  <div class="page">
    <header class="page-header">
      <!-- preserve original header HTML -->
    </header>
    <main class="page-main">
      <div class="page-main-inner">
        <ExpiredMessage>
          <p class="notice">この申し込みは終了しています。</p>
        </ExpiredMessage>
      </div>
    </main>
  </div>
</FormLayout>

<style>
  /* preserve original styles (background color, layout, etc.) */
</style>
```

### Files to Preserve

- `apply-confirm.astro` — the applicant confirmation list should remain viewable after the event ends; do not convert
- The confirm-list component it imports (`_components/confirm-list.*` or legacy `_confirm-list.*`) — deleting it breaks `apply-confirm.astro`
- `*.test.ts(x)` — keep test files as references

## Steps

1. Inspect all files in the target directory (e.g. `src/pages/2025/09/`)
2. Read `apply.astro` to capture the title, date, theme, and styles
3. List the files to delete (per the layout-specific rules above) and ask the user for confirmation
4. After confirmation, delete each file with `rm <file>` (recursive `rm -r` is disallowed, but single-file `rm` is permitted); remove an emptied `_components/` / `_assets/` directory with `rmdir`
5. Rewrite `apply.astro` to show only `ExpiredMessage`
6. If `survey.astro` exists, rewrite it in the same way
7. Run `pnpm build` to verify there are no type errors

## Notes

- The `guard-past-page.sh` PreToolUse hook asks the user to confirm each Write/Edit to a past page — this is expected during conversion; the user approves the prompts
- Import `ExpiredMessage` from `@/components/forms/ExpiredMessage.tsx`
- Remove `client:only` directives and reCAPTCHA-related settings (not needed for expired pages)
- Delete files with `rm <file>` directly (recursive `rm -r` is disallowed)
