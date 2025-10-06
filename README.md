# nitonabbc-form

A modern web application for creating event registration and survey forms, built with Astro, SolidJS, and TailwindCSS.

## Features

- **Modern Stack**: Built with Astro, SolidJS, and TailwindCSS
- **Islands Architecture**: Minimal client-side JavaScript for optimal performance
- **Responsive Design**: Mobile-first approach with accessible UI components
- **Form Validation**: Client and server-side validation with real-time feedback
- **Google Integration**: Seamless data management via Google Apps Script
- **Security**: reCAPTCHA v3 protection against spam
- **Accessibility**: WCAG 2.1 A/AA compliance

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or your preferred package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/nitonabbc-form.git
cd nitonabbc-form

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run check        # Check code quality
npm run check:write  # Fix code quality issues
npm run format       # Format code
npm run lint         # Lint code
```

## Usage

### Form Pages

Forms are organized by date and type following the pattern `/YYYY/MM/(apply|survey)`:

- **Registration Forms**: `/YYYY/MM/apply` - For event sign-ups
- **Survey Forms**: `/YYYY/MM/survey` - For post-event feedback

### Configuration

Set up your environment variables:

```bash
# .env
PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
PUBLIC_POST_TO_SHEET_URL=your_google_apps_script_url
PUBLIC_FETCH_FROM_SHEET_URL=your_fetch_endpoint
```
