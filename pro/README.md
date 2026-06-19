# 🌱 AI DevSeed — Pro

> Curated extensions for the AI-collaborative solo workflow.

**Status**: `v0.1.0` — content + packaging complete. Awaiting Gumroad listing. See [CHANGELOG.md](./CHANGELOG.md).

[← Back to Free tier](../README.md)

---

## What's in this folder

`pro/` is the build surface for the AI DevSeed Pro tier. The packaged Pro is a zip distributed on Gumroad; the markdown source lives here, in this public repo.

```
pro/
├── README.md          ← you are here
├── LICENSE            ← Pro tier license (personal/team use, no resale)
├── CHANGELOG.md       ← Pro tier release notes
├── commands/          ← 12 extended slash commands
└── adr-scenarios/     ← 10 ADR scenario starter templates
```

---

## Why is Pro source-visible? (Open-source pricing)

AI DevSeed Pro is 22 markdown files. The honest value proposition:

1. **Curation** — these templates survived a real 60-day project (Otori). Not generic AI-generated lists.
2. **Updates** — new Pro commands earn their way in through the same `pro/` folder. Lifetime updates within the v0.x line.
3. **Convenience** — one Gumroad transaction → zip → unzip into your project. No copy-pasting 22 files by hand.
4. **Sponsorship** — your purchase funds maintenance alongside Otori, the maintainer's main project.

The markdown is here if you want to copy 22 files manually. The **$19 is for the curated bundle, future updates, and supporting the project** — same model as shadcn/ui, Tailwind UI, Obsidian plugins, Excalidraw.

See [LICENSE](./LICENSE) for permitted use.

---

## Install

Two paths give you the exact same 22 files. Pick by preference.

### Path A — Gumroad zip (recommended, supports the project)

> The Gumroad listing for `pro-v0.1.0` is being set up. Link will replace this note once live.

1. Buy on Gumroad → download `ai-devseed-pro-v0.1.0.zip`
2. Unzip — you'll get a single folder `ai-devseed-pro-v0.1.0/` with `commands/`, `adr-scenarios/`, README, LICENSE, CHANGELOG
3. Copy into your project:
   - `commands/*.md` → your project's `.claude/commands/`
   - `adr-scenarios/*.md` → your project's `docs/decisions/` (renumber as needed — see "Adoption notes" below)

### Path B — Manual copy from this repo

Same files, just copied directly. Honor-system equivalent.

```bash
# In your project root
mkdir -p .claude/commands docs/decisions

# Clone or sparse-checkout this repo into a temp dir, then:
cp /path/to/ai-devseed/pro/commands/*.md .claude/commands/
cp /path/to/ai-devseed/pro/adr-scenarios/*.md docs/decisions/
```

### Adoption notes

- **ADR scenario renumbering** — the scenarios ship as `001-` through `010-`. If your project already has ADRs at those numbers, renumber the scenarios as you adopt them (highest existing + 1). The starter content is in the file body, not the filename.
- **No CLI integration in MVP** — install is manual copy. A future `ai-devseed install-pro <zip>` may automate this; not in v0.1.0.

### Quick start

After install, three commands that pay back quickly:

- **`/scope`** — bound your next task in 30 seconds before opening the editor
- **`/release`** — generate a pre-publish checklist for your next version bump
- **`/onboarding`** — produce `docs/onboarding.md` from your existing repo state; useful even on day one

---

## Reference

All 12 commands and 10 ADR scenarios. Click through for the full text of each.

### Extended slash commands

12 markdown commands targeting gaps the Free 8 don't cover — scoping, shipping, post-incident, audits.

| Status | Command | One-liner |
|---|---|---|
| ✅ | [`/scope`](./commands/scope.md) | Bound a task before starting — timebox + DoD + out-of-scope |
| ✅ | [`/timebox`](./commands/timebox.md) | Set/check a timebox on current focused work |
| ✅ | [`/release`](./commands/release.md) | Pre-publish checklist (version bump, CHANGELOG cut, tag, smoke test) |
| ✅ | [`/changelog-entry`](./commands/changelog-entry.md) | Generate a CHANGELOG section from `git log` since last tag |
| ✅ | [`/spike`](./commands/spike.md) | Open a research spike (question + timebox + findings skeleton) |
| ✅ | [`/postmortem`](./commands/postmortem.md) | Incident postmortem template (timeline, root cause, actions, lessons) |
| ✅ | [`/migration`](./commands/migration.md) | DB/data migration plan with explicit rollback |
| ✅ | [`/refactor-plan`](./commands/refactor-plan.md) | Staged refactor: current → target with safe intermediate states |
| ✅ | [`/dependency-audit`](./commands/dependency-audit.md) | Outdated + vulnerable + unused deps with action items |
| ✅ | [`/onboarding`](./commands/onboarding.md) | Onboarding doc for new contributor (or future-you on a stale codebase) |
| ✅ | [`/diagram`](./commands/diagram.md) | Mermaid diagram for the current folder / feature / data flow |
| ✅ | [`/feedback-summary`](./commands/feedback-summary.md) | Aggregate user feedback (Issues + Discussions + journal) into themes |

Detailed spec: [`../docs/pro-tier-mvp-plan.md`](../docs/pro-tier-mvp-plan.md#the-12-pro-slash-commands)

### ADR scenario starters

10 pre-filled templates for the architectural decisions that lock in pain if chosen wrong:

| Status | Scenario |
|---|---|
| ✅ | [State management library](./adr-scenarios/001-state-management.md) |
| ✅ | [Auth provider](./adr-scenarios/002-auth-provider.md) |
| ✅ | [Database choice](./adr-scenarios/003-database.md) |
| ✅ | [CSS strategy](./adr-scenarios/004-css-strategy.md) |
| ✅ | [API style](./adr-scenarios/005-api-style.md) |
| ✅ | [Monorepo strategy](./adr-scenarios/006-monorepo-strategy.md) |
| ✅ | [Deployment platform](./adr-scenarios/007-deployment-platform.md) |
| ✅ | [Testing strategy](./adr-scenarios/008-testing-strategy.md) |
| ✅ | [Error handling pattern](./adr-scenarios/009-error-handling.md) |
| ✅ | [Observability stack](./adr-scenarios/010-observability.md) |

Each ships with: context (3+ tradeoffs pre-listed), options (3+ contenders with one-line cons), tradeoff matrix (4+ evaluation axes), empty decision section for you to fill.

---

## License

[`LICENSE`](./LICENSE) — short, human-readable. Personal/team use; no resale of the bundle. Looking at the source is fine; redistributing the curated set is not.

---

## Feedback

Suggestions, gaps, "I'd pay for X but not Y" reactions — open an issue or discussion on the main repo. The Pro scope is expected to grow within the v0.x line based on actual signal.

- 🐛 [Issues](https://github.com/scappyJr/ai-devseed/issues)
- 💬 [Discussions](https://github.com/scappyJr/ai-devseed/discussions)
