# 📝 Changelog

All notable changes to AI DevSeed.

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
