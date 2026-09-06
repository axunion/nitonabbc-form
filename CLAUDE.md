# CLAUDE.md

Guidance for AI coding agents in this repository. Bias toward caution over speed; on trivial tasks, use judgment.

## Project

Event signup and post-event survey forms, deployed as a static Astro site on Cloudflare Pages. All server-side logic lives in Google Apps Script (GAS) + Google Spreadsheet; small scale, no DB or queue.

Stack: Astro 7 (Vite 8 / Rolldown) + SolidJS, LightningCSS + CSS Modules, Biome 2, Vitest 4, pnpm. Run `pnpm` to list all scripts.

## Approach

- **Think before coding.** State assumptions. Make routine judgment calls yourself and note them; ask only when different interpretations would lead to materially different work. If a simpler path exists, say so and push back when warranted.
- **Simplest thing that works.** If 200 lines could be 50, rewrite it.
- **Surgical changes.** Every changed line should trace to the request. Don't refactor, reformat, or "improve" adjacent code that isn't broken; match the surrounding style. Remove only the imports and symbols your change orphaned; leave unrelated dead code alone and mention it.
- **Goal-driven.** Turn each task into a verifiable outcome ("fix the bug" → "write a failing test that reproduces it, then make it pass"). For multi-step work, state a brief plan before starting.

## Language

Default to the user's language for everything interactive — chat replies, plan proposals, clarifying questions. Switch to English for durable artifacts other people or tools will read afterward: in-code comments, console/log/error output, and AI-readable instruction files like this one. Exception: user-facing UI text and README stay Japanese — the product's audience is Japanese event participants, so those two are carved out of the durable-artifact default.

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
  - `src/layouts/FormLayout.astro` — HTML shell with noindex; in dev it mounts `DevApiToggle` to switch between mock and real GAS.

Design tokens are page-private, not shared: each page defines its own
`_components/theme.css` (`global.css` is reset-only). Shared form components have no
visual opinions of their own — they read `--color-*` / `--space-*` / `--text-*` /
`--radius-*` / `--shadow-*` from whatever the page provides, so every page's
`theme.css` must define the full canonical token set (see the contract in
`create-apply/SKILL.md`).

## Conventions

- Naming communicates intent. Components PascalCase; utilities/services kebab-case; page-private code under `_components/` (no extra `_` prefix on files inside; legacy pages use `_`-prefixed flat files); tests colocated as `*.test.ts` next to the subject.
- One concern per file. Keep components under ~100 lines; split other new code once it passes ~300 lines. Don't split existing files unless asked. Extract a helper only when used in 3+ places; otherwise inline it.
- Delete dead code you create; never comment it out.
- Prefer `type` over `interface`. Comments explain **why**, not what.
- One `.module.css` per `.tsx` (variants via `composes`, merged with `cn()` from `src/utils/cn.ts`); Astro pages use scoped `<style>`. No inline styles (dynamic CSS variable values are the only exception).
- Use the `@/` path alias.

## Testing

- Write tests before or alongside implementation — they are your success criteria. Test observable outcomes and edge cases, not implementation details. Each test is self-contained; no shared mutable state.
- In scope: `src/services/`, `src/hooks/`, `src/utils/`, and `calc-*.ts` (legacy `_calc-*.ts`). Out of scope: display-only stubs, `.astro` pages, CSS Modules.
- Extract any `if` / `switch` / `reduce` logic from JSX into a `_components/calc-<feature>.ts` export so it can be unit-tested.
- Shared-layer coverage: lines/functions/statements ≥ 80%, branches ≥ 70% (`pnpm test --coverage`).
- Structural correctness (state/output, `pnpm test` + `pnpm check`) is scripted and objective. Visual/UX judgment ("does this look right") is not — no assertion can reliably check it; verify it by looking at the running app, or via the `inspector` agent for layout/viewport-sensitive changes (see Subagents below). Don't try to automate this away.

## Subagents

Three tiers govern how much agent scaffolding a change gets. The main conversation
writes the code at every tier — only the scaffolding around it changes.

- **Trivial** (typos, config tweaks, copy edits): implement directly, no agents.
- **Non-trivial but contained** (a self-contained change in one area): implement
  directly. Optionally run the built-in `Explore` agent first to confirm an existing
  convention. Afterward, run `reviewer` and `tester` in parallel automatically,
  without asking first — both are read-only/test-only, so the cost of running them is
  low, and they exist specifically to catch the blind spot of reviewing your own work.
- **Large, ambiguous, or high-risk** (spans many pages, touches an Invariant above
  substantially, or the task itself is genuinely ambiguous): propose driving it with
  the built-in `/goal` command, with a completion condition that explicitly requires
  `reviewer` and `tester` passing (and `inspector`, see below, when the change is
  UI-affecting) — e.g. "implement X; done when reviewer reports no findings and
  tester passes," not just "implement X."

Visual verification is a separate axis, not a fourth tier: no rendered surface
touched → skip; a small, isolated, single-property tweak → a quick manual glance at
the running app is enough; layout that can vary by viewport, a change spanning
multiple components sharing styles, or chasing a reported visual bug → run
`inspector`. This needs no confirmation to run, but also isn't automatic for every UI
change — it costs real time (dev server + browser), so invoking it is a judgment call
against these cases. It stays out of a `/goal` completion condition — "does this
render correctly" is a human/live-check judgment, not something a scripted evaluator
should gate on.

`gas-type-id-auditor` and `past-page-guardian` are separate, task-specific agents
tied to the Invariants above — run them directly when their situation applies (a
pre-release cross-page GAS ID audit, or converting a page to expired), not as part of
the tier policy.

No agent writes implementation code, at any tier — that stays in the main
conversation, since fixing review/test findings needs the context of the code just
written, and each subagent invocation starts fresh with no memory of it.

## Commits

Format — plain prose, no prefixes or labels (`feat:`, `fix:`, etc.):

```
<one-line summary>

<Why: one sentence — motivation or problem>

- <change 1>
- <change 2>
```

- Summary: imperative mood, ≤70 chars, no trailing period.
- Why line: only when the motivation is not evident from the diff alone. Bullets: only for 2+ distinct changes.
- Never commit secrets (`*.key`, `*.pem`, `credentials*`).
- Never use `--no-verify`. Use `--amend` only when explicitly asked; default to a new commit.

## Scaffolding

New form pages are generated by skills (each auto-creates a `page/YYYY-MM-<type>` branch); see `.claude/skills/` for details:

```bash
/create-apply YYYY/MM [event-name] [event-date]   # signup form
/create-survey YYYY/MM                            # post-event survey (create apply first)
/create-apply-confirm YYYY/MM                     # participant confirmation list
```

Environment variables: see README →「環境変数の設定」.
