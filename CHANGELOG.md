# 📝 Changelog

All notable changes to AI DevSeed.

---

## [Unreleased]

---

## [0.1.0-beta.2] · 2026-05-15

### Added
- **3 new slash commands** in the base template free tier:
  - `/idea` — zero-friction idea capture to `docs/ideas/inbox.md`
  - `/handoff` — generate or update `HANDOFF.md` for next-session pickup
  - `/retro` — weekly retrospective in `docs/retrospective/`
- `docs/retrospective/_template.md` and the matching folder, so the retro workflow has a concrete starting point.
- **`web-react` template** is no longer a placeholder. It now overlays a React 18 + Vite + TypeScript flavored `CLAUDE.md` plus a `/new-page` slash command for scaffolding pages under `src/pages/`, matching the `mobile-rn` template's depth.
- **2 more slash commands** in the base template:
  - `/explore` — map an unfamiliar area of the codebase before editing (read-only context scan)
  - `/test-plan` — design test coverage in a prioritized checklist before writing tests
- **Branch Protection setup guide** added to `templates/base/docs/workflow-guide.md` — step-by-step GitHub UI instructions so users can act on the README's "protect `main`" recommendation without guessing.
- `CONTRIBUTING.md` at the repo root, linked from the README's Contributing section, to onboard first-time contributors.

### Changed
- Root README and template README updated to list the expanded command set (free tier now advertises 8 base commands).
- CLI success message (`init`) prints all eight commands so users discover them right after bootstrap.

### Fixed
- README pricing table no longer self-contradicts: Mobile / Web templates are listed under Free (matches what ships), and Pro features are consistently labeled "Coming soon".
- Replaced the fake CLI mockup (showed a non-existent "Create GitHub repo?" prompt) with an accurate bullet list of what `init` actually outputs.
- Corrected the label-count claim from 25 to 20 to match the actual `setup-labels.sh`.
- Removed dead external links — defunct project domain, unused Twitter handle, broken `docs/` paths, and a leftover `philosophy.md` reference — so README links no longer 404.
- Marked the Otori showcase link as pending public release instead of pointing at a 404.
- Sharing CTAs now point at Reddit / Dev.to instead of Twitter, matching the actual launch plan.

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
