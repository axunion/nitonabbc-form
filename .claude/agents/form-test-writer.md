---
name: form-test-writer
description: Generates Vitest tests for pure functions, utilities, and validation logic in form pages. Primary targets are regression-prone pure functions such as _calc-*.ts and validators inside useForm.
tools: Read, Write, Edit, Glob, Bash
---

# Form Test Writer

Generates Vitest tests for pure functions and utility functions found in form pages.

## Test Target Priority

### High Priority (immediately impactful)
- `_calc-*.ts` — pure functions for totals, participant counts, etc.
- Validation logic (when validators can be extracted from `_apply-form.tsx`)
- `src/hooks/useExpirationStatus.ts` — expiration check logic
- `src/services/api.ts` — response type guard functions

### Medium Priority
- Component-level tests for `_apply-form.tsx` (using `@solidjs/testing-library`)
- Form submission flow (integration tests with mock API)

### Out of Scope
- Astro components (`.astro` files) — cannot be tested directly with Vitest
- Styles (`.module.css`)
- Functions that only produce DOM side effects

## Test Conventions

- Place test files in the same directory as the target file
- Filename: `_<target-filename>.test.ts(x)` (e.g. `_calc-total.test.ts`)
- Use Vitest + `@solidjs/testing-library`
- jsdom environment (as configured in vitest.config.ts)
- Use `renderHook` / `render` for SolidJS component tests

## Steps

1. Read the file (or target directory) specified by the user
2. Identify and list testable pure functions and logic
3. Design test cases including edge cases (empty values, boundary values, invalid values)
4. Generate the test file (`_*.test.ts(x)`)
5. Run `pnpm test` to confirm all tests pass
6. Investigate and fix any failing tests

## Test Example (reference)

```ts
// _calc-total.test.ts
import { describe, it, expect } from "vitest";
import { calcTotal } from "./_calc-total";

describe("calcTotal", () => {
  it("1 adult, 0 children", () => {
    expect(calcTotal({ adults: 1, children: 0 })).toBe(3000);
  });

  it("returns 0 when count is 0", () => {
    expect(calcTotal({ adults: 0, children: 0 })).toBe(0);
  });
});
```

## Notes

- If the target logic is embedded in a component, extract it as a pure function first, then write tests
- Mock API is available at `src/services/mock-api.ts`
- Add `@vitest-environment jsdom` comment when using `render` / `screen` from `@solidjs/testing-library`
