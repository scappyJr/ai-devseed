# {{PROJECT_NAME}}

## Project Purpose
{{PROJECT_DESCRIPTION}}

## Current Phase
Phase 0 (Setup) - Environment setup in progress.

## Tech Stack
- **Framework**: React Native (Expo) + TypeScript
- **State**: Zustand
- **Navigation**: React Navigation
- **Testing**: Jest + React Native Testing Library
- **Linting**: ESLint + Prettier

## Coding Conventions
- Functional components only (no class components)
- File naming: PascalCase for components (`HomeScreen.tsx`), camelCase otherwise (`useWeather.ts`)
- Each folder has `index.ts` for clean exports
- Comments in your preferred language
- No magic numbers - put constants in `src/constants/`
- New features must include tests

## Folder Structure
```
src/
├── screens/      Screen components (HomeScreen, etc.)
├── components/   Reusable components
├── services/     External API calls
├── hooks/        Custom hooks
├── stores/       Zustand stores
├── utils/        Pure functions
├── constants/    Theme, strings, config
└── types/        TypeScript type definitions
```

## Single Source of Truth
| Information | Location |
|------|-----|
| Code | `src/` (Git) |
| Progress | `wbs/` |
| Decisions | `docs/decisions/NNN-title.md` (ADR) |
| Daily logs | `docs/journal/YYYY-MM-DD.md` |
| Tasks/Issues | GitHub Issues |
| Change history | `CHANGELOG.md` |
| Architecture | `docs/architecture.md` |
| Quick ideas | `docs/ideas/inbox.md` |
| Big visions | `docs/ideas/big/{name}.md` |

## Git Strategy
- `main` ← stable version
- `develop` ← integration branch
- `feature/*` ← work branches
- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, etc.)
- Reference WBS or Issue number in commits

## Common Commands
- `npm start` - Start Expo dev server
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run typecheck` - TypeScript check

## Security
- All API keys go in `.env` (with `EXPO_PUBLIC_` prefix for client-side)
- `.env.example` shows what's needed
- Claude must not modify `.env`

## Work Guidelines
- Big changes (architecture/stack) → write ADR in `docs/decisions/`
- Ask before coding when uncertain
- Work in small units (one file/feature at a time)
- Update WBS when starting/finishing tasks

## Key References
- [`docs/workflow-guide.md`](docs/workflow-guide.md) - Daily workflow
- [`docs/architecture.md`](docs/architecture.md) - Architecture
- [`wbs/checklist.md`](wbs/checklist.md) - Detailed task checklist
