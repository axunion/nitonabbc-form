# Copilot Instructions for nitonabbc-form

## Project Overview

This project is a simple form creation project where pages are added several times a year.
It primarily creates **event registration forms** and **post-event survey forms**, managing data through Google Apps Script and Google Spreadsheet.

## Technology Stack

- **Framework**: Astro v5.9.3
- **UI Library**: SolidJS v5.1.0
- **Styling**: TailwindCSS v4.1.10
- **Code Quality**: Biome v1.9.4
- **Runtime**: Node.js v22.16.0 (Volta managed)

## Development Philosophy & Priorities

### 1. Astro Philosophy First

- Leverage **Islands Architecture** to make only necessary parts interactive
- Follow **Zero-JavaScript by default** principle, minimizing client-side JavaScript
- Maximize **Build-time optimizations**
- Adopt **Multi-page Application (MPA)** architecture, building each form page as an independent page

### 2. SolidJS Best Practices

- Leverage **Fine-grained reactivity** for performance optimization
- Use **Signals** appropriately for state management
- Use **createStore** for managing complex form state
- Use **Suspense** and **ErrorBoundary** appropriately
- Choose **client:load**, **client:idle**, **client:visible** directives appropriately

### 3. TailwindCSS Best Practices

- Thoroughly adopt **Utility-first** approach
- Use **Component variants** for consistent styling
- Implement **Responsive design** with mobile-first approach
- Utilize **Design tokens** to unify brand colors and spacing
- Minimize custom CSS and prioritize Tailwind Utility classes

## Component Design Principles

### Directory Structure

```
src/
├── assets/             # Static files (images, SVGs, etc.)
├── components/
│   ├── forms/          # Form-related components
│   └── ui/             # Reusable UI components
├── layouts/            # Page layouts
├── lib/                # External API integration (Google Apps Script, etc.)
├── pages/              # Page files
└── styles/             # Global styles
```

### Component Design Guidelines

1. **Single Responsibility Principle**: Each component has one clear responsibility
2. **Reusability**: Components that may be used in multiple places should be made common
3. **Composability**: Build complex UI by combining small components
4. **Minimal Props**: Design to work with the minimum necessary props

### Naming Conventions

- **Components**: PascalCase (`FormInput.astro`, `SubmitButton.astro`)
- **Files**: kebab-case (`form-validation.ts`, `api-client.ts`)
- **CSS classes**: Use Tailwind Utility classes, custom classes in kebab-case

### Import Paths

- **Path Alias**: Use `@/` for absolute paths from src directory
- **Example**: `import Layout from "@/layouts/FormLayout.astro"`
- **Example**: `import TextInput from "@/components/ui/TextInput.astro"`
- Prioritize path aliases over relative paths (`../`)

## Form Development Guidelines

### 1. Page Structure and URL Design

- **URL Pattern**: Adopt `/YYYY/MM/(apply|survey)` format
- **apply**: For event registration forms
- **survey**: For post-event survey forms
- **Example**: `/2025/06/apply` (June 2025 event registration)
- **Example**: `/2025/06/survey` (June 2025 survey)

#### Directory Structure Example

```
src/pages/
├── 2025/
│   ├── 06/
│   │   ├── apply.astro           # 2025 June registration form
│   │   └── survey.astro          # 2025 June survey form
│   └── 07/
│       ├── apply.astro           # 2025 July registration form
│       └── survey.astro          # 2025 July survey form
└── [...etc]
```

### 2. Form Structure

```astro
<!-- ❌ Avoid -->
<form>
  <input type="email" />
  <button>Submit</button>
</form>

<!-- ✅ Recommended -->
<FormContainer>
  <FormField label="Email Address" required>
    <EmailInput name="email" validation={emailValidation} />
  </FormField>
  <SubmitButton>Submit</SubmitButton>
</FormContainer>
```

### 3. Validation

- **Client-side**: For real-time feedback
- **Server-side**: Data validation in Google Apps Script (required)
- **Progressive Enhancement**: Basic functionality works even when JavaScript is disabled

### 4. Google Apps Script Integration

- **Form Submission**: Use `fetch` API to send to Google Apps Script
- **reCAPTCHA Token**: Include reCAPTCHA token when submitting forms
- **Server-side Verification**: Verify reCAPTCHA token on Google Apps Script side
- **CORS Support**: Proper Google Apps Script configuration
- **Error Handling**: Appropriate feedback for submission failures
- **Response Processing**: UI updates based on success/failure status

### 5. reCAPTCHA Security Measures

- **Google reCAPTCHA v3** for spam protection implementation
- **Site Key** and **Secret Key** management
- **Score Evaluation**: Set 0.5 or higher as threshold for human determination
- **Async Loading**: Lazy loading of reCAPTCHA scripts
- **Fallback**: Alternative measures when reCAPTCHA loading fails

### 6. Accessibility

- **WCAG 2.1 A/AA** basic requirements compliance
- **Form Labels** and **Input Fields** proper association
- **Error Messages** clear display
- **Keyboard Navigation** basic support

### 7. Performance

- **Critical CSS** inline optimization
- **Async loading** for JavaScript optimization
- **Image optimization** for improved page load speed
- **Bundle size** minimization

## Multilingual Support Approach

### Browser Translation Dependent Approach

- Leverage **simple form** characteristics and rely on browser auto-translation
- Use **semantic HTML** correctly to improve browser translation accuracy
- Set **`lang` attribute** appropriately (e.g., `lang="ja"` for Japanese sites)
- Control **`translate` attribute** for tags and IDs that don't need translation

### HTML Design Considerations

- Use **clear and translatable text**
- Avoid context-dependent expressions
- Use **`<abbr>` tags** for abbreviations and technical terms when necessary
- Make **placeholders** and **error messages** easy to translate

## Code Quality Standards

### Biome Configuration Usage

- Use **format**, **lint**, and **check** commands
- Run `npm run check:write` before committing
- Leverage automatic formatting and linting

### TypeScript

- Enable **strict mode** for type safety
- Prioritize **type** over **interface** (for performance reasons)
- Minimize **as** casting

## Prohibited Patterns & Things to Avoid

### ❌ Avoid

- Unnecessary client-side JavaScript
- Inline styles (use Tailwind Utility classes)
- Duplicate components
- Global state (prioritize form-level state management)
- Large components (consider splitting if over 100 lines)

### ❌ Avoid These Libraries

- Large UI libraries (implement only necessary features)
- Unnecessary polyfills
- Libraries with overlapping functionality

## New Form Page Creation Checklist

### 1. Page Structure

- [ ] Create new `.astro` file in `src/pages/` following URL pattern
- [ ] Set appropriate metadata (title, description)
- [ ] Implement responsive design with mobile-first approach
- [ ] Use FormLayout.astro as base layout

### 2. Form Components

- [ ] Reuse existing components from `src/components/forms/` and `src/components/ui/`
- [ ] Split into smaller components if new complex functionality is needed
- [ ] Implement client-side validation with real-time feedback
- [ ] Configure reCAPTCHA v3 integration properly

### 3. Security Implementation

- [ ] Implement reCAPTCHA token submission to Google Apps Script
- [ ] Configure server-side verification in Google Apps Script
- [ ] Test spam protection mechanisms
- [ ] Verify CORS configuration for API endpoints

### 4. Accessibility Compliance

- [ ] Implement proper focus management and keyboard navigation
- [ ] Display error messages clearly with ARIA attributes
- [ ] Test keyboard-only navigation flow
- [ ] Ensure form labels are properly associated with inputs

### 5. Performance Optimization

- [ ] Remove unnecessary client-side JavaScript
- [ ] Optimize images and static assets
- [ ] Verify bundle size and page load performance
- [ ] Test with JavaScript disabled (progressive enhancement)

### 6. Code Quality Assurance

- [ ] Run `npm run check:write` for Biome formatting and linting
- [ ] Resolve all TypeScript errors
- [ ] Remove unused code and imports
- [ ] Verify all @/ path aliases work correctly

## Recommended Resources

- [Astro Documentation](https://docs.astro.build/)
- [SolidJS Documentation](https://www.solidjs.com/docs/latest)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Biome Documentation](https://biomejs.dev/)
- [Google reCAPTCHA v3 Documentation](https://developers.google.com/recaptcha/docs/v3)

---

Follow these guidelines to develop maintainable, performant, and accessible form applications with high code quality standards.
