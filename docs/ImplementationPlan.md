## ReMind Implementation Plan

### Source
- Based on `README.md` and `Development.md`.

## Goals
- Deliver a playful, customizable quiz app that reinforces memory through repetition.
- Implement balanced practice flow with New/Wandering/Confident categories, cooldown, and weighted selection.
- Provide import, practice, review, and settings UX.

## Scope
- Single-user local app (no authentication) for now.

## Tech Stack
- Runtime/Build: Node 20+, pnpm
- Framework: Next.js (App Router) for full-stack UI + API routes
- DB/ORM: SQLite via Prisma
- Validation: Zod
- CSV: Papa Parse
- Styling: CSS variables defined centrally; utility classes (Tailwind optional)
- Testing: Vitest (unit), Playwright (E2E)

## Domain Model
- Target
  - id, name, createdAt, configJson (Zod-validated)
- Quiz
  - id, targetId, question, answer, createdAt
- Trial
  - id, quizId, createdAt, success (boolean)
- Derived (computed): numTrials, numSuccess, successRate, statusCategory

Notes:
- No persistent cooldown fields; cooldown is enforced per session only.

## Configuration (per Target)
- N: min trials threshold for status, default 5
- M: queue size, default 6
- C: cooldown turns, default 10
- Success rate threshold: threshold for Confident status, default 0.8 (80%)
- Weights: p_n=0.4, p_w=0.5, p_c=0.1
- Store in Target.configJson with Zod schema; editable via Settings UI.

## Status Logic
- If numTrials < N → "New"
- Else successRate = numSuccess / numTrials
  - If successRate < successRateThreshold (default 0.8) → "Wandering"
  - Else → "Confident"

## Cooldown & Activeness (Session-scoped)
- Cooldown applies only within a practice session. When the user leaves and returns, the cooldown resets.
- The client maintains a small exclusion list `recentAnsweredIds` (size ≤ C). A quiz is considered active if its id is not in this list.
- Selection queries exclude only this tiny set, avoiding scans.

## Quiz Engine (server-side)
- Maintains a queue of M quizzes and a choice set (answers from queued quizzes).
- Handles:
  - getQuizStatus(numTrials, numSuccess, N)
  - getActiveQuizzes(targetId, recentAnsweredIds, C)
  - pickCategory(availability, weights) with fallbacks when a category is empty
  - fillQueue(targetId, queue, M, C, N, recentAnsweredIds) ensuring quizzes are active and balanced (initialization does not apply cooldown)
  - nextPrompt(queue) → { quizId, question, choices[] }
  - evaluateAnswer(quizId, userAnswer): correct if matches any answer for the same question in the same target
  - recordTrial(quizId, correct)
  - advanceQueue(queue, C, recentAnsweredIds): replace used quiz and return updated recentAnsweredIds (append answered id, trim to C)

## API Endpoints
- GET /api/targets
- POST /api/targets (create with name, optional config)
- POST /api/targets/:id/import (CSV upload, validate ≥ M+C rows on first import)
- GET /api/targets/:id/stats (counts + category sizes)
- POST /api/targets/:id/session/init (returns initial queue + choices, and an empty recentAnsweredIds array)
- POST /api/targets/:id/session/answer (body: quizId, answer, recentAnsweredIds; returns result + updated snapshot including new recentAnsweredIds)
- PATCH /api/targets/:id/config (update N/M/C/p_*)
- GET /api/targets/:id/review (totals, category sizes, 7-day completion)

Notes: Server remains stateless (no in-memory sessions). All state is persisted in the DB via currentTurn/lastShownTurn and trials.

## UI Pages (App Router)
- app/page.tsx (Top)
  - List Target cards with name + stats
  - Create Target form + CSV import
- app/targets/[id]/practice/page.tsx
  - Header: nav/back, mode switch, center title with live stats
  - Body: today trial count, quiz card (status, success rate, #trials), choices grid (always M choices)
  - Effects: success and failure animations
- app/targets/[id]/review/page.tsx
  - Cumulative trials, category sizes, weekly chart
  - Import additional CSV (no M+C restriction)
- app/targets/[id]/settings/page.tsx
  - Edit N/M/C and weights (validated)

## Styling & Theme
- Define CSS variables in a single stylesheet (e.g., app/globals.css):
  - --cyber-dark: #0A0A07
  - --cyber-teal: #92E4DD
  - --cyber-gold: #C4B643
  - --card-red: #F9386D
  - --card-green: #39FF14
  - --card-gray: #E0E0E0
  - --card-orange: #FF6B00
- Fonts:
  - --font-sans: Monaco, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
  - --font-serif: Georgia, serif
  - --font-mono: Monaco, 'SF Mono', Menlo, 'Consolas', 'Liberation Mono', monospace

## CSV Import Rules
- Accept header or headerless (user toggle)
- Columns: col1 question, col2 answer
- Validate non-empty strings; normalize (trim, case-fold, Unicode normalize); dedupe identical (question, answer) pairs
- First import must have ≥ M+C rows; subsequent imports have no minimum
- Ingest creates Quiz rows; Trials are created only by answering

## Directory Structure (initial)
- prisma/schema.prisma
- app/
- app/api/targets/*
- lib/db.ts
- lib/engine/*
- lib/csv/parse.ts
- lib/validation/*
- components/*
- tests/unit/*, tests/e2e/*

## Key Function Signatures (TypeScript sketch)
```ts
export type StatusCategory = 'New' | 'Wandering' | 'Confident';

export interface TargetConfig {
  minTrialsForStatus: number; // N
  queueSize: number;          // M
  cooldownTurns: number;      // C
  successRateThreshold: number; // Threshold for Confident status (0-1)
  weightNew: number;          // p_n
  weightWandering: number;    // p_w
  weightConfident: number;    // p_c
}

export function getQuizStatus(
  numTrials: number,
  numSuccess: number,
  config: TargetConfig
): StatusCategory;

export function getActiveQuizzes(
  targetId: string,
  recentAnsweredIds: string[],
  cooldownTurns: number
): Promise<Array<{ id: string; question: string; answer: string }>>;

export function pickCategory(
  available: Record<StatusCategory, number>,
  weights: { New: number; Wandering: number; Confident: number }
): StatusCategory;

export function fillQueue(args: {
  targetId: string;
  queue: string[]; // quizIds
  config: TargetConfig;
  recentAnsweredIds: string[];
}): Promise<{ queue: string[]; choices: Array<{ quizId: string; answer: string }> }>;

export function evaluateAnswer(args: {
  targetId: string;
  quizId: string;
  userAnswer: string;
}): Promise<{ correct: boolean; acceptedAnswers: string[] }>;

export function recordTrial(quizId: string, correct: boolean): Promise<void>;

export function updateRecentAnsweredIds(args: {
  recentAnsweredIds: string[];
  answeredQuizId: string;
  cooldownTurns: number;
}): string[]; // returns new recentAnsweredIds trimmed to C
```

## Milestones & Acceptance Criteria
1) Project scaffold
   - Next.js app, Prisma + SQLite, Zod, Papa Parse
   - Health check route; seed script
   - AC: repo boots, DB migrates, lint/test pass
2) Data model + derived status
   - Prisma schema and queries that compute per-quiz status
   - AC: unit tests for status categories and success-rate edges
3) CSV import flow
   - Create target + CSV upload with server validation; initial M+C requirement
   - AC: invalid CSV blocked; valid CSV creates Quiz rows
4) Quiz engine core
   - Queue management, category selection with fallbacks, cooldown via lastShownTurn/currentTurn
   - AC: deterministic unit tests with mocked RNG
5) Practice screen
   - Prompt render, answer selection, feedback effects, live stats
   - AC: Trial recorded; UI updates; queue replenished; choices consistent
6) Review screen
   - Aggregates + weekly chart; import more quizzes
   - AC: counts accurate; import appends
7) Settings
   - Edit N/M/C/p_* per target (validated, persisted)
   - AC: config changes affect engine behavior
8) Polish
   - Animations, a11y, empty/error/loading states
   - AC: baseline Lighthouse; keyboard navigation

## Testing Strategy
- Unit: status computation, category picking with fallbacks, queue fill/advance, CSV validation, local-time "today" bucketing
- E2E: create target → import → practice 10 trials → review updates; settings modify behavior

## Risks / Decisions
- Cooldown scope: session-only; we do not persist cooldown across sessions. On a new session, the same quiz may reappear (probability remains low with large decks).
- Multiple correct answers: accept any answer among quizzes sharing the same question within target
- Randomness: inject RNG interface for deterministic tests
- Scale: typical ≤10k quizzes/target; upper bound 1M. Plan indexes on (targetId, question), (targetId, lastShownTurn), and (quizId) on trials; use streaming CSV parse and batched inserts.

## Performance Notes
- Active selection uses an index on (targetId, category) and excludes ≤ C ids via a NOT IN clause bound with parameters.
- Optional: implement a small server-side exclusion store per session if desired; for single-user local, client-supplied recentAnsweredIds is simplest and stateless.

## Time & Locale
- "Today" is determined by local device time for counts and charts.

## Next Steps
- Start Milestone 1: scaffold Next.js + Prisma + base routes and tests.


