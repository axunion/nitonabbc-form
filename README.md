# nitonabbc-form

A simple form application built with Astro, SolidJS, and TailwindCSS for creating event registration and survey forms.

## Tech Stack

- **Framework**: Astro v5.9.3
- **UI Library**: SolidJS v5.1.0
- **Styling**: TailwindCSS v4.1.10
- **Code Quality**: Biome v1.9.4
- **Runtime**: Node.js v22.16.0 (Volta managed)

## Project Structure

```text
src/
├── assets/             # Static files (images, SVGs, etc.)
├── components/
│   ├── forms/          # Form-related components
│   └── ui/             # Reusable UI components
├── layouts/            # Page layouts
├── lib/                # External API integration (Google Apps Script, etc.)
├── pages/              # Page files following /YYYY/MM/(apply|survey) pattern
└── styles/             # Global styles
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format and lint code
npm run check:write
```

## Form Pages

Form pages follow the URL pattern `/YYYY/MM/(apply|survey)`:

- `apply`: Event registration forms
- `survey`: Post-event survey forms

Example: `/2025/06/apply` for June 2025 event registration

## Features

- Islands Architecture with minimal client-side JavaScript
- Responsive design with mobile-first approach
- Form validation with real-time feedback
- Google Apps Script integration for data management
- reCAPTCHA v3 spam protection
- Accessibility compliance (WCAG 2.1 A/AA)
- Browser-dependent translation support

For detailed development guidelines, see [Copilot Instructions](.github/copilot-instructions.md).
