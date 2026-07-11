# CLAUDE.md

Guidance for AI coding agents in this repository. Bias toward caution over speed; on trivial tasks, use judgment.

> **Sync note**: `CLAUDE.md` and `AGENTS.md` must stay identical (except for their titles). When you update one, apply the same change to the other.

## Project

Event signup and post-event survey forms, deployed as a static Astro site on Cloudflare Pages. All server-side logic lives in Google Apps Script (GAS) + Google Spreadsheet; small scale, no DB or queue.

Stack: Astro 7 (Vite 8 / Rolldown) + SolidJS, LightningCSS + CSS Modules, Biome 2, Vitest 4, pnpm. Run `pnpm` to list all scripts.

## Approach

- **Think before coding.** State assumptions; if uncertain, ask. When multiple interpretations exist, surface them rather than silently picking one. If a simpler path exists, say so and push back when warranted.
- **Simplest thing that works.** Write the minimum code that solves the stated problem — nothing speculative. No unasked-for abstractions, flexibility, or error handling for impossible cases. If 200 lines could be 50, rewrite it.
- **Surgical changes.** Every changed line should trace to the request. Don't refactor, reformat, or "improve" adjacent code that isn't broken; match the surrounding style. Remove only the imports and symbols your change orphaned; leave unrelated dead code alone and mention it.
- **Goal-driven.** Turn each task into a verifiable outcome ("fix the bug" → "write a failing test that reproduces it, then make it pass"). For multi-step work, state a brief plan with a verification check per step, then loop until it passes.

## Language

English only in code and AI-readable files: comments, console output, error/log messages, CLAUDE.md. User-facing UI text and README are Japanese.

## Invariants (do not break)

- **Independent pages** — each event page (`src/pages/YYYY/MM/`) is a standalone site. UI components and styles are never shared across pages; duplication between pages is accepted. Shared code is technical infrastructure only. See README →「設計方針」.
- **Keep past pages** — never delete past event pages (participants may have bookmarked them). Expired pages keep only `ExpiredMessage`, with all form parts removed. A hook asks for user confirmation before edits to past pages; use the `past-page-guardian` agent for expired-page conversion.
- **GAS type mapping** — form type IDs (e.g. `202509a`, `202509s`) map 1-to-1 to GAS spreadsheet targets and must match the page directory (`gas-type-id-auditor` agent verifies this).
- **No production index** — `/` returns 404 in production. The dev-only page list comes from the `devPagesIndex` integration (`src/dev/index.astro`, kept outside `src/pages/`).

## Architecture

- URL pattern: `/YYYY/MM/(apply|survey|apply-confirm)`. Page-private code is colocated in underscore-prefixed directories excluded from routing: `_components/` (UI, styles, `calc-*.ts` logic) and `_assets/` (images, created only when needed). Legacy pages instead use flat `_`-prefixed files (`_apply-form.tsx`, `_calc-*.ts`); keep each page internally consistent.
- Shared layer (no visual opinions):
  - `src/components/forms/` — form orchestration. `FormContainer` checks expiry and renders loading → connection error → expired → form → success/failure.
  - `src/hooks/` — `useForm`, `useExpirationStatus`, `useDataFetch`, `useScrollLock`.
  - `src/services/api.ts` — all GAS calls; every response is `{ result: "done" | "error", ...data }`, dispatched by a `type` parameter over a small set of shared endpoints.
  - `src/styles/themes/` — design tokens, one CSS file per page theme, imported in each page's frontmatter. Token contract: shared form components rely on `--color-*` / `--space-*` / `--text-*` / `--radius-*` / `--shadow-*`; a new theme must define the full token set of `indigo.css` (`global.css` is reset-only; `src/styles/refs/` is reference-only, do not import).
  - `src/layouts/FormLayout.astro` — HTML shell with noindex; in dev it mounts `DevApiToggle` to switch between mock and real GAS.

## Conventions

- Naming communicates intent. Components PascalCase; utilities/services kebab-case; page-private code under `_components/` (no extra `_` prefix on files inside; legacy pages use `_`-prefixed flat files); tests colocated as `*.test.ts` next to the subject.
- One concern per file; keep components under ~100 lines. Extract a helper only when used in 3+ places; otherwise inline it.
- Delete dead code you create; never comment it out.
- Prefer `type` over `interface`. Comments explain **why**, not what.
- One `.module.css` per `.tsx` (variants via `composes`, merged with `cn()` from `src/utils/cn.ts`); Astro pages use scoped `<style>`. No inline styles (dynamic CSS variable values are the only exception).
- Use the `@/` path alias.

## Testing

- Write tests before or alongside implementation — they are your success criteria. Test observable outcomes and edge cases, not implementation details. Each test is self-contained; no shared mutable state.
- In scope: `src/services/`, `src/hooks/`, `src/utils/`, and `calc-*.ts` (legacy `_calc-*.ts`). Out of scope: display-only stubs, `.astro` pages, CSS Modules.
- Extract any `if` / `switch` / `reduce` logic from JSX into a `_components/calc-<feature>.ts` export so it can be unit-tested.
- Shared-layer coverage: lines/functions/statements ≥ 80%, branches ≥ 70% (`pnpm test --coverage`).

## Commits

```
<one-line summary>

<Why: one sentence — motivation or problem>

- <change 1>
- <change 2>
```

- Summary: imperative mood, ≤70 chars, no trailing period, no prefix tags (`feat:`, `fix:`, etc.).
- Why line: only when the motivation is not evident from the diff alone. Bullets: only for 2+ distinct changes.
- Never commit secrets (`*.key`, `*.pem`, `credentials*`).
- Never use `--no-verify` or `--amend`; always create a new commit.

## Scaffolding

New form pages are generated by skills (each auto-creates a `page/YYYY-MM-<type>` branch); see `.claude/skills/` for details:

```bash
/create-apply YYYY/MM [event-name] [event-date]   # signup form
/create-survey YYYY/MM                            # post-event survey (create apply first)
/create-apply-confirm YYYY/MM                     # participant confirmation list
```

Environment variables: see README →「環境変数の設定」.
