# {{PROJECT_NAME}}

## Project Purpose
{{PROJECT_DESCRIPTION}}

## Current Phase
Phase 0 (Setup) - Environment setup in progress.

## Tech Stack
<!-- Update this section as decisions are made -->
- Language: 
- Framework: 
- Tools: 

## Coding Conventions
<!-- Customize for your project -->
- Use functional/declarative style where possible
- Prefer named exports
- Add comments in your preferred language
- No magic numbers - define constants
- Test new features

## Folder Structure
```
src/
├── (define your structure here)
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

## Security
- All API keys go in `.env` (never committed)
- `.env.example` only in git
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
