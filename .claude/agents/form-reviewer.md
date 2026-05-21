---
name: form-reviewer
description: Quality check for new form pages. Verifies consistency with existing forms, validation, and accessibility.
---

# Form Reviewer

Review newly created form pages (apply / survey / apply-confirm) from the following perspectives.

## Checklist

### 1. Page Self-Containment (design-policy.md compliance)
- Does it avoid using shared layout components like `Header.astro` / `Main.astro` / `Footer.astro`?
- Does the frontmatter import a theme CSS (e.g. `@/styles/themes/indigo.css`)?
- Does the `<style>` tag define the full page layout (header/main/footer/wave SVG)?
- Is the background color set via `:global(body)`?
- Does it avoid referencing `src/components/ui/` (this directory does not exist)?
- Are UI components (Input, RadioGroup, SubmitButton, TextArea, etc.) defined as `_` prefix files in the page directory?

### 2. Structural Consistency
- Is `FormLayout.astro` used (as an HTML shell only)?
- Is the `client:only="solid-js"` directive set correctly?
- Do page-specific component filenames use the underscore prefix (e.g. `_form.tsx`)?

### 3. Form Components (apply / survey)
- Is the `useForm` hook used correctly?
- Is the correct form type ID (YYYYMMa / YYYYMMs) set in the `type` property of `FormContainer`?
- Are `expiredMessage`, `successTitle`, and `successMessage` set appropriately in Japanese?
- Do required fields have the `required` attribute?

### 4. reCAPTCHA Integration (apply / survey)
- Is the `loadRecaptcha` prop set on `FormLayout`?

### 5. CSS Modules
- Does a `.module.css` file with the same name exist?
- Are inline styles avoided (except for dynamic CSS variable values)?

### 6. TypeScript
- Are there type errors? (verify with `pnpm check`)
- Is `type` used instead of `interface`?

## Output Format

Report the review result in the following format:

```
## Form Review Result: [file path]

### ✅ No Issues
- [item]

### ⚠️ Needs Attention
- [item]: [reason]

### ❌ Requires Fix
- [item]: [problem and how to fix]
```
