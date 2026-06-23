# 📝 Changelog

All notable changes to AI DevSeed.

---

## [Unreleased]

### Changed
- **Pro tier scope narrowed to MVP** per `docs/pro-tier-mvp-plan.md`. README "Free vs Pro" table (root + `packages/cli/README.md`) drops 5 aspirational rows (Excel WBS, Gantt SVG, wireframe templates, auto-setup scripts, email support) — those are deferred until Free produces enough signal to justify the build cost. Pro now lists exactly **12 extended slash commands + 10 ADR scenario templates**. Pro price $29 → $19. HANDOFF Pro section reflects the same scope cut.
- Free tier row added to the pricing table: **Label setup script (17 labels)** — was promised in "GitHub Integration" section but missing from the Free/Pro matrix.

---

## [0.1.0-beta.4] · 2026-06-23

### Fixed
- `init` with a leading-hyphen project name (e.g. `npx ai-devseed init -my-app`) now produces a clear, validator-shaped error instead of Commander's generic "unknown option" message. Commander parses `-foo` as an unknown flag before the action runs, so a pre-parse argv check in `bin/ai-devseed.js` intercepts this specific case and emits the same "use lowercase letters, numbers, hyphens, or underscores; must start with a letter or number" guidance the regular validator uses. Known `init` flags (`-t`/`--template`, `-y`/`--yes`, `--no-git`, `-h`/`--help`) still parse normally. Caught during pre-launch testing; surfaced on launch day in the r/SideProject post's "rough edges" list.

---

## [0.1.0-beta.3] · 2026-06-11

### Added
- `packages/cli/templates/base/.github/setup-labels.sh` — the GitHub labels setup script is now actually shipped to bootstrapped projects. README has been advertising this since beta.1, but the file lived only at the AI DevSeed repo root and never made it into the template. Generic version (17 labels: type / priority / status / community / effort), with `{{PROJECT_NAME}}` placeholders in headers; the maintainer-specific `template/*` labels were dropped.
- `packages/cli/templates/base/.gitattributes` forcing LF on `*.sh` / `*.bash`. Without this, `setup-labels.sh` shipped via npm with CRLF on Windows contributor checkouts, which would break `bash setup-labels.sh` on macOS/Linux users.
- Template-specific slash command in the post-init success message (`/new-screen` for mobile-rn, `/new-page` for web-react). Both commands existed in the templates but were not surfaced anywhere users would actually notice.
- `packages/cli/LICENSE` and `packages/cli/README.md` — both were listed in `files` but didn't exist, so the npm tarball shipped without them and the npm page wouldn't have rendered a README. README is a CLI-local copy with relative links rewritten to absolute GitHub URLs.
- `repository` field in `packages/cli/package.json` (with `directory: packages/cli`) so the npm page links back to the GitHub repo.

### Changed
- README and `packages/cli/README.md`: "20 labels" → "17 labels" to match the new template script.
- Sponsor link in both READMEs: `buymeacoffee.com/scappyJr` → `ko-fi.com/scappyjr`.
- `src/utils/git.js` now captures git stderr and includes it in the thrown error. Previously the init flow surfaced "Git initialization skipped: Command failed" with no clue why; common failure (no `user.email` set on a fresh dev machine) is now legible.

### Fixed
- `bin` field in `packages/cli/package.json`: `"./bin/ai-devseed.js"` → `"bin/ai-devseed.js"`. npm 11 strips the leading `./` and emits a `bin path` warning, which would have broken `npx ai-devseed` on first publish.

### Removed
- `--no-install` flag from the `init` command. Declared in the Commander setup but never read anywhere — there is no dependency installation step in `init.js`. Dead option that suggested a non-existent feature.
- `main` field from `packages/cli/package.json`. Pointed at `src/index.js` which doesn't exist; the package is a CLI, not an importable library, so the field had no purpose.

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
