# Copilot Instructions for nitonabbc-form

## Project Overview

Form creation project for event registration and post-event surveys, managed through Google Apps Script and Google Spreadsheet.

## Technology Stack

- Framework: Astro v5.9.3
- UI Library: SolidJS v5.1.0
- Styling: TailwindCSS v4.1.10
- Code Quality: Biome v1.9.4
- Runtime: Node.js v22.16.0 (Volta)

## Development Philosophy

### Astro

- Leverage Islands Architecture for minimal client-side JavaScript
- Follow Zero-JavaScript by default principle
- Build each form page as independent MPA

### SolidJS

- Use Signals and createStore for state management
- Apply fine-grained reactivity
- Choose appropriate client directives (load/idle/visible)

### TailwindCSS

- Adopt utility-first approach
- Implement responsive, mobile-first design
- Minimize custom CSS

## Component Guidelines

### Directory Structure

```
src/
├── assets/             # Static files
├── components/
│   ├── forms/          # Form components
│   ├── layout/         # Layout components
│   └── ui/             # Reusable UI components
├── layouts/            # Page layouts
├── lib/                # External API integration
├── pages/              # Page files
└── styles/             # Global styles
```

### Design Principles

- Single responsibility per component
- Reusable and composable design
- Minimal props interface

### Naming & Imports

- Components: PascalCase (`FormInput.astro`)
- Files: kebab-case (`form-validation.ts`)
- Use `@/` path aliases for imports

## Form Development

### URL Pattern

- Format: `/YYYY/MM/(apply|survey)`
- apply: Event registration forms
- survey: Post-event surveys

### Form Architecture

```astro
<!-- ✅ Recommended -->
<FormContainer>
  <FormField label="Email Address" required>
    <EmailInput name="email" validation={emailValidation} />
  </FormField>
  <SubmitButton>Submit</SubmitButton>
</FormContainer>
```

### Key Requirements

- Client & server-side validation
- Google Apps Script integration with reCAPTCHA v3
- WCAG 2.1 A/AA accessibility compliance
- Progressive enhancement support

## Code Quality

### Biome & TypeScript

- Run `npm run check:write` before commits
- Use strict mode and prioritize `type` over `interface`
- Minimize `as` casting

### Comments Policy

- No change history or obvious comments
- Focus on "why", not "what"
- Use JSDoc for public APIs

### Avoid

- Unnecessary client-side JavaScript
- Inline styles (use Tailwind)
- Large components (split if >100 lines)
- Global state

## New Form Creation Checklist

### Structure & Components

- [ ] Create `.astro` file following `/YYYY/MM/(apply|survey)` pattern
- [ ] Use FormLayout.astro and reuse existing components
- [ ] Implement responsive design

### Security & Validation

- [ ] Configure reCAPTCHA v3 integration
- [ ] Add client & server-side validation
- [ ] Test CORS configuration

### Quality Assurance

- [ ] Ensure WCAG 2.1 A/AA compliance
- [ ] Run Biome checks (`npm run check:write`)
- [ ] Test progressive enhancement
- [ ] Optimize performance

## References

- [Astro](https://docs.astro.build/) | [SolidJS](https://www.solidjs.com/docs/latest) | [TailwindCSS](https://tailwindcss.com/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) | [Biome](https://biomejs.dev/)
- [Google reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3)

## AI Work Process

### Before Making Changes

1. **Analyze Requirements** - Understand the user's request completely
2. **Plan Implementation** - Break down the task into clear steps
3. **Review Context** - Check existing code structure and patterns
4. **Confirm Approach** - Present the plan to user before execution
5. **Execute Incrementally** - Make changes step by step with validation

### Change Management

- Always read existing files before editing
- Use appropriate tools (read_file, grep_search, semantic_search)
- Validate changes after each modification
- Follow established patterns and conventions
- Test functionality when possible

Follow these guidelines to develop maintainable, performant, and accessible form applications with high code quality.
