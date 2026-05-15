# 📝 Changelog

All notable changes to AI DevSeed.

---

## [Unreleased]

---

## [0.1.0-beta.2] · 2026-05-15

### Added
- **5 new slash commands** in the base template free tier (8 total):
  - `/idea` — zero-friction idea capture to `docs/ideas/inbox.md`
  - `/handoff` — generate or update `HANDOFF.md` for next-session pickup
  - `/retro` — weekly retrospective in `docs/retrospective/`
  - `/explore` — map an unfamiliar area of the codebase before editing (read-only context scan)
  - `/test-plan` — design test coverage in a prioritized checklist before writing tests
- `docs/retrospective/_template.md` and the matching folder, so the retro workflow has a concrete starting point.
- **`web-react` template** is no longer a placeholder. It now overlays a React 18 + Vite + TypeScript flavored `CLAUDE.md` plus a `/new-page` slash command for scaffolding pages under `src/pages/`, matching the `mobile-rn` template's depth.
- **Branch Protection guide** in `packages/cli/templates/base/docs/workflow-guide.md` — solo-friendly GitHub branch protection recommendations (require PR, linear history, block force pushes, restrict deletions).
- **README hero demo screenshot** (`docs/images/demo.png`) showing real CLI output end-to-end.

### Changed
- Root README and template README list the expanded command set; CLI success message (`init`) prints all 8 base commands after bootstrap.
- Free pricing-table tier now shows Mobile (RN+Expo) and Web (React+Vite) templates as ✅/✅ — previously listed under Pro-only, contradicting actual CLI behavior.
- Idea-management description: "Inbox / Big Ideas / Backlog" → "Inbox / Big Ideas / GitHub Issues". The Backlog file never existed; GitHub Issues IS the backlog stage per the documented idea-flow design.
- Sharing CTA: Twitter/X → Reddit / Dev.to, matching the project's actual launch channel mix.
- README "Interactive Setup" code mockup replaced with an accurate textual bullet list — the hero screenshot already shows real output, and the mockup had drifted from CLI reality (fictional output lines, missing Author prompt, wrong final message).
- README label count corrected: "25 labels" → "20 labels" (matches what `.github/setup-labels.sh` actually creates).
- "Branch protection guides" → "Branch protection guide (in `workflow-guide.md`)" — singular, verifiable, no broken link implication.

### Fixed
- Placeholder URL `github.com/example/ai-devseed` replaced with `scappyJr/ai-devseed` in 6 places (CLI banner output, base template README / CHANGELOG / ADR-001). Before this fix, every bootstrapped project linked back to a non-existent example repo.
- Phantom `? Create GitHub repo? (y/N)` prompt removed from README mockup — the feature was never implemented in `init.js`.
- 4 broken `docs/` links removed from README: `docs/workflow.md`, `docs/customization.md`, and two occurrences of `docs/philosophy.md`. Workflow Guide link repointed to the live template file.
- Otori example link disabled (`github.com/scappyJr/otori-app` returned 404 — Otori is still in private development; the credibility-hook text was kept with a "(public release pending)" qualifier).
- Dead external footer links removed: `ai-devseed.dev` (DNS does not resolve) and the Twitter handle link (project does not use Twitter per its own launch strategy).
- Pro Gumroad link consistently qualified with "*(Coming soon)*" across all 3 occurrences — the page doesn't exist yet, and previously two of three links 404-ed silently on click.

---

## [0.1.0-beta.1] · 2026-04-29 (Beta Release) 🌱

### Initial Release
- 🎉 First beta release of AI DevSeed
- Project name and concept finalized: "AI DevSeed - Plant the seed for AI-collaborative solo development"

### ✨ CLI Tool
- `npx ai-devseed init <project-name>` command
- Interactive prompts for project setup
- `--yes` flag for non-interactive mode
- `--template` option for selecting template type
- `--no-git` option to skip Git initialization
- `list` command to see available templates

### 📦 Templates Included
- **base**: Generic template (any language/framework)
- **mobile-rn**: React Native + Expo + TypeScript
- **web-react**: (placeholder - coming soon)

### 📚 Templates Provide
- `CLAUDE.md` - AI context file template
- `.claude/` - Claude Code configuration
  - `settings.json` with safe permissions
  - 3 essential slash commands (`/daily`, `/add-decision`, `/review`)
- `docs/` - Documentation structure
  - `workflow-guide.md` - Daily routine
  - `architecture.md` - Architecture template
  - `decisions/` - ADR folder with first ADR
  - `ideas/` - Idea management system
  - `journal/` - Daily journal template
- `.github/ISSUE_TEMPLATE/` - 3 issue templates
- `wbs/checklist.md` - Work breakdown template
- `CHANGELOG.md` - Standard changelog template
- Smart `.gitignore` and `.env.example`

### 🎨 Features
- Single Source of Truth philosophy baked in
- Placeholder system (`{{PROJECT_NAME}}`, `{{AUTHOR}}`, etc.)
- Auto Git initialization with first commit
- Beautiful CLI UX with colors and spinners

### 🚧 Known Limitations
- web-react template is placeholder only
- No automated tests yet
- Limited template customization
- Pro tier features not yet implemented

### 🛣 Roadmap (See README.md)
- v0.2: More templates, better tests
- v1.0: Stable API, community contributions

---

*This is a beta release. Feedback welcomed!*
