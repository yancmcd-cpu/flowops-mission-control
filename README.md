# Mission Control

FlowOps Mission Control is the Phase 6 operational dashboard interface for the Markdown-defined FlowOps OS.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Scope

- Next.js App Router
- React + TypeScript
- TailwindCSS
- mock data aligned to Phase 5 Mission Control contracts
- UI only, no backend APIs or persistence

## Current Surface Model

Mission Control currently presents five primary operator-facing sections:

- Dashboard
- Tasks
- Projects
- Pipeline
- Workflows

Secondary system views remain available for:

- Activity
- Metrics
- Knowledge Review
- Skill Factory
