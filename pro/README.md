# 🌱 AI DevSeed — Pro

> Curated extensions for the AI-collaborative solo workflow.

**Status**: `v0.1.0` in progress — commands and ADR scenarios are landing incrementally. See [CHANGELOG.md](./CHANGELOG.md).

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

> **Pro v0.1.0 is not yet released.** When it ships, install will be one of:
>
> 1. **Recommended**: Buy on Gumroad → download zip → unzip into your project root. Commands merge into `.claude/commands/`, ADR scenarios into `docs/decisions/`.
> 2. **Manual**: clone this repo, copy `pro/commands/*.md` and `pro/adr-scenarios/*.md` into the corresponding folders of your project. Follows the spirit of the license — honor system.

---

## What's coming (v0.1.0 target)

### Extended slash commands

12 markdown commands targeting gaps the Free 8 don't cover — scoping, shipping, post-incident, audits.

| Status | Command | One-liner |
|---|---|---|
| ✅ | [`/scope`](./commands/scope.md) | Bound a task before starting — timebox + DoD + out-of-scope |
| ✅ | [`/timebox`](./commands/timebox.md) | Set/check a timebox on current focused work |
| ✅ | [`/release`](./commands/release.md) | Pre-publish checklist (version bump, CHANGELOG cut, tag, smoke test) |
| ✅ | [`/changelog-entry`](./commands/changelog-entry.md) | Generate a CHANGELOG section from `git log` since last tag |
| ⏳ | `/spike` | Open a research spike (question + timebox + findings skeleton) |
| ⏳ | `/postmortem` | Incident postmortem template (timeline, root cause, actions, lessons) |
| ⏳ | `/migration` | DB/data migration plan with explicit rollback |
| ⏳ | `/refactor-plan` | Staged refactor: current → target with safe intermediate states |
| ⏳ | `/dependency-audit` | Outdated + vulnerable + unused deps with action items |
| ⏳ | `/onboarding` | Onboarding doc for new contributor (or future-you on a stale codebase) |
| ⏳ | `/diagram` | Mermaid diagram for the current folder / feature / data flow |
| ⏳ | `/feedback-summary` | Aggregate user feedback (Issues + Discussions + journal) into themes |

Detailed spec: [`../docs/pro-tier-mvp-plan.md`](../docs/pro-tier-mvp-plan.md#the-12-pro-slash-commands)

### ADR scenario starters

10 pre-filled templates for the architectural decisions that lock in pain if chosen wrong:

| Status | Scenario |
|---|---|
| ⏳ | State management library |
| ⏳ | Auth provider |
| ⏳ | Database choice |
| ⏳ | CSS strategy |
| ⏳ | API style |
| ⏳ | Monorepo strategy |
| ⏳ | Deployment platform |
| ⏳ | Testing strategy |
| ⏳ | Error handling pattern |
| ⏳ | Observability stack |

Each ships with: context (3+ tradeoffs pre-listed), options (3+ contenders with one-line cons), tradeoff matrix (4+ evaluation axes), empty decision section for you to fill.

---

## License

[`LICENSE`](./LICENSE) — short, human-readable. Personal/team use; no resale of the bundle. Looking at the source is fine; redistributing the curated set is not.

---

## Feedback while we build

This is a build-in-public skeleton. If you have requests or "I'd pay for X but not Y" reactions, open an issue or discussion on the main repo. The Pro scope is still negotiable until v0.1.0 ships.

- 🐛 [Issues](https://github.com/scappyJr/ai-devseed/issues)
- 💬 [Discussions](https://github.com/scappyJr/ai-devseed/discussions)
