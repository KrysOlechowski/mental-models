# ROADMAP (MVP)

## Milestone A: Core loop (guest)

- Domain: mental models, question contract, evaluateAnswer, quizEngine
- Seed: 8–10 questions
- UI: /play (select + why + reveal)
- Guest progress via Zustand persist

Definition of done:

- Can answer multiple questions locally
- Reveal teaches mental model
- No login required

## Milestone B: Dashboard

- Aggregate answered reveals into "mental profile"
- /dashboard shows strengths & blind spots (no score)

Definition of done:

- Dashboard updates after answering questions
- Shows distribution per mental model + recent mistakes

## Milestone C: Auth + Supabase

- Login/logout
- Supabase progress repo + RLS
- After login: reset guest progress

Definition of done:

- Logged user progress persists across devices
- Guest data cleared on login
