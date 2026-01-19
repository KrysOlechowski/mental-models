# AGENTS.md

Purpose: Give AI coding agents stable context so they don't reinvent architecture or scope.

## Project Summary

Mental Models Quiz is a small educational app (Next.js 16 App Router).
Goal: correct mental models, not scoring or gamification.
Questions are intentionally tricky and playful. Output is a "mental profile", not points.

## Non-goals (MVP)

- No gamification (no points, streaks, leaderboards)
- No guest → user migration (guest progress is reset on login)
- No AI grading of free-text "why"
- No heavy content pipelines (no MDX/contentlayer needed in MVP)

## Mental Models (MVP)

- Time & Ordering
- Identity & Reference
- State & Snapshot
- Mutation & Immutability

## Architecture: Hexagonal (Ports & Adapters)

- Domain is framework-agnostic: no React, no Next, no storage, no network.
- UI and infrastructure adapt around the domain.

### Folder boundaries (expected)

- src/core/domain: pure domain types + pure functions (no I/O)
- src/core/ports: interfaces for repositories/services
- src/adapters: implementations (Zustand/localStorage, Supabase)
- src/app + src/features: Next.js pages/components (UI)
- src/lib: framework/tooling glue (Supabase clients, env)

### Hard rules

- Domain MUST NOT import React, Next.js, Supabase, Zustand, localStorage, fetch, cookies, Date.now.
- UI MUST NOT implement domain rules (no evaluation logic inside components).
- Adapters are the only place allowed to talk to storage/network.

## Data & Persistence

- Guest: Zustand + persist to localStorage.
- Logged user: Supabase (Postgres + RLS).
- After login: reset guest data (no migration).

## Core UX

- Hybrid answer: user selects option(s) + writes a short "why" explanation.
- "why" is stored but not semantically graded in MVP.
- Reveal panel teaches the corrected model and common trap.
- Dashboard shows mental profile, not score.

## Rendering code snippets

- Use Shiki server-side (Node runtime), not Edge runtime.
- Avoid client-side syntax highlighting bundles unless necessary.
- Always include a copy-to-clipboard UX.

## Testing Strategy (MVP)

- Use Vitest.
- Test domain only (unit tests for pure functions + engine behavior).
- Skip UI/E2E tests in MVP unless a single happy-path becomes necessary later.

## Git & PR Workflow

- 1 PR = 1 focused change.
- Use conventional commit types:
  - feat: user-facing capability or domain feature
  - fix: bug fix
  - refactor: behavior-preserving structure change
  - test: add/adjust tests
  - docs: documentation only
  - chore: tooling/config/infra
- Every PR should include:
  - What / Why / How to test

## Definition of Done (for any change)

- Domain changes include tests (Vitest) when logic changes.
- No cross-layer leakage (domain remains pure).
- Builds on Render preview.
- Lint + typecheck pass.

## Current MVP roadmap (high level)

1. Domain types + evaluateAnswer + QuizEngine (pure)
2. In-memory seed questions (8–10)
3. Play page (thin UI) using the engine
4. Dashboard mental profile (basic aggregation)
5. Auth + Supabase adapter + RLS, guest reset on login
