# Pro Tier MVP Plan

> Status: **DRAFT — pending owner approval**
> Owner: scappyJr · Drafted: 2026-06-12

## Why this exists

The current README markets a Pro tier with 7 attributes (15+ commands, Excel WBS, Gantt SVG, 10 ADR scenarios, auto-setup scripts, wireframe templates, email support). That spec was written aspirationally before any user demand was validated. This doc narrows Pro to a defensible MVP that can ship within a week and stay maintainable solo while Otori is the primary project.

**MVP scope decision** (2026-06-12): ship Pro as **12 extended slash commands + 10 ADR scenario templates**. Defer Excel WBS, Gantt SVG, wireframe templates, premium-coded templates, and email support until Free has produced enough signal to justify the build cost.

**Repo decision** (2026-06-12): single Public repo, Pro content at `pro/` (root), npm tarball excludes Pro by structural layout. Pro is "open source pricing" — markdown is visible on GitHub; buyers pay for curation, updates, and sponsorship convenience, not for access. Rationale in the "Distribution & value proposition" section below.

**Price**: $29 → **$19**. Lower because the scope shrank and we want lower friction on first conversion data.

## Distribution & value proposition

**Channel**: Gumroad zip download. But framed as **convenience + supporting the maintainer**, not as content gating.

### Why open-source pricing (not hidden Pro)

Pro is 22 markdown files (12 slash commands + 10 ADR scenarios). The cost of hiding markdown is high (separate repo, manual sync, awkward issue/PR flow); the value of hiding is low (anyone can copy-paste a buyer's leaked zip in seconds, and the content is reproducible by anyone willing to put hours in).

The honest version of the Pro proposition is:

1. **Curation** — the maintainer used these exact templates building Otori. Buying gets you the version that survived a real 60-day project, not a generic AI-generated list.
2. **Updates** — when a new Pro command earns its keep on a future project, it lands in the same `pro/` folder. Lifetime updates within a major version.
3. **Convenience** — one Gumroad transaction → zip → unzip into your project. No copy-paste of 22 files from GitHub.
4. **Sponsorship** — Otori is the maintainer's main project; Pro purchases keep AI DevSeed maintained alongside it. Same model as shadcn/ui, Excalidraw, Obsidian plugins.

This is closer to a software sponsorship model than a software-license model. Pricing reflects that.

### Zip contents

```
ai-devseed-pro/
├── README.md            # install + usage (curl/zip → folder structure → next steps)
├── LICENSE              # "personal/team use, no resale" — not MIT, but permissive
├── CHANGELOG.md         # Pro-tier changelog (independent of Free CHANGELOG)
├── commands/            # 12 .md files — copy into your-project/.claude/commands/
└── adr-scenarios/       # 10 .md files — copy into your-project/docs/decisions/ as starting points
```

Install = manual copy. No CLI integration in MVP; a future `ai-devseed install-pro <zip>` is post-MVP.

**No license-key check inside the CLI** — would need a server, doesn't pay back. The license is honor-system, the same as buying a Tailwind UI license. Revisit if piracy becomes visible.

## Repo layout

**Single repo, single Public repo.** Pro content lives in this repo at `pro/` (root) — exposed to anyone reading the GitHub source.

```
ai-devseed/                          ← Public (this repo)
├── packages/cli/                    ← Free CLI, shipped to npm
│   └── templates/{base,mobile-rn,web-react}/
├── pro/                             ← Pro content, NOT shipped to npm
│   ├── README.md
│   ├── LICENSE
│   ├── CHANGELOG.md
│   ├── commands/                    ← 12 .md files
│   └── adr-scenarios/               ← 10 .md files
└── scripts/
    └── build-pro-zip.sh             ← builds ai-devseed-pro-vX.Y.Z.zip from pro/
```

Critical: `pro/` is at repo root, **outside** `packages/cli/`, so the npm `files` array (`bin/`, `src/`, `templates/`, `README.md`, `LICENSE`) does NOT bundle Pro content into the tarball. npm users get Free only.

**Why root `pro/` and not `packages/cli/templates/pro/`**: keeping Pro outside the CLI tree makes the "npm tarball excludes Pro" guarantee structural (it's outside everything `files` glob can match), rather than relying on `.npmignore` discipline. One less invariant to maintain.

**Why not a separate Private repo**: rejected after weighing tradeoffs. The hiding doesn't actually prevent piracy (zip leaks day one), adds operational overhead (sync between two repos, doubled CI, harder issue/PR flow), and breaks the "Free user found a bug in Pro" feedback loop. Sponsorship-model OSS works for content products; this is one.

## The 12 Pro slash commands

Each is a Free-style markdown command in `.claude/commands/<name>.md`. They cover gaps the Free 8 don't address: scoping, shipping, retros on incidents, and quality audits.

| # | Command | One-liner | Output |
|---|---------|-----------|--------|
| 1 | `/scope` | Bound a task before starting — timebox + definition of done + out-of-scope | A scope block appended to `docs/journal/YYYY-MM-DD.md` or current ADR |
| 2 | `/timebox` | Set/check a timebox on current focused work; nudge to reassess at expiry | Inline reply with reassessment questions |
| 3 | `/release` | Pre-publish checklist (version bump, CHANGELOG cut, tag, smoke test, sensitive-info sweep) | A checklist file at `docs/release/vX.Y.Z.md` |
| 4 | `/changelog-entry` | Generate a CHANGELOG section from `git log` since last tag | Appends to `CHANGELOG.md` `[Unreleased]` |
| 5 | `/spike` | Open a research spike (question + timebox + findings skeleton) | New file `docs/spikes/YYYY-MM-DD-<slug>.md` |
| 6 | `/postmortem` | Incident postmortem template (timeline, root cause, actions, lessons) | New file `docs/postmortems/YYYY-MM-DD-<slug>.md` |
| 7 | `/migration` | DB/data migration plan with explicit rollback | New file `docs/migrations/NNN-<slug>.md` |
| 8 | `/refactor-plan` | Staged refactor plan: current state → target state, intermediate safe states | New ADR-shaped file under `docs/refactors/` |
| 9 | `/dependency-audit` | Identify outdated, vulnerable, and unused deps with action items | Inline report; optional save to `docs/audits/deps-YYYY-MM-DD.md` |
| 10 | `/onboarding` | Generate an onboarding doc for a new contributor (or future-you on a stale codebase) | New file `docs/onboarding.md` |
| 11 | `/diagram` | Produce a Mermaid diagram for the current area (folder, feature, data flow) | Mermaid block, optionally saved to `docs/diagrams/<slug>.md` |
| 12 | `/feedback-summary` | Aggregate user feedback (GitHub Issues + Discussions + journal mentions) into themes + priorities | New file `docs/feedback/YYYY-MM-DD.md` |

Acceptance bar for each: must produce a concrete artifact (file or structured inline reply), must work without web access, must not depend on Pro-only tooling beyond what the user already has installed.

## The 10 Pro ADR scenarios

Each is a `00X-<name>.md` template under `adr-scenarios/`. They are **scenario starters** — context section pre-filled with the typical considerations, options section listing the common contenders, a tradeoff matrix, and an empty decision section. The user fills in their specific case.

| # | Scenario | Why it matters for solo devs |
|---|----------|------------------------------|
| 1 | State management library | Redux/Zustand/Jotai/Context/server-state — picking wrong locks in pain for the life of the app |
| 2 | Auth provider | Auth0/Clerk/Supabase Auth/Firebase/roll-own — affects every protected route + signup funnel |
| 3 | Database choice | Postgres/SQLite/DynamoDB/Firebase Firestore — migration cost is enormous |
| 4 | CSS strategy | Tailwind/CSS-in-JS/CSS modules/vanilla — affects every component file |
| 5 | API style | REST/GraphQL/tRPC/RPC — couples frontend ↔ backend tightly |
| 6 | Monorepo strategy | Turborepo/Nx/npm workspaces/polyrepo — affects build, CI, deployment shape |
| 7 | Deployment platform | Vercel/Netlify/Cloudflare/Fly.io/Railway/AWS — hidden in pricing, lock-in, cold starts |
| 8 | Testing strategy | Unit-heavy/E2E-heavy/Testing Trophy — drives confidence vs. maintenance ratio |
| 9 | Error handling pattern | Throws/Result types/structured errors with codes — propagates through every async boundary |
| 10 | Observability stack | Sentry+platform logs/DataDog/OpenTelemetry/print-and-pray — debuggable vs. flying blind |

Acceptance bar for each template: the Context section must list at least 3 real-world tradeoffs, Options must list at least 3 contenders with one-line cons, and the tradeoff matrix must have at least 4 evaluation axes pre-set.

## Marketing copy updates (after spec approval)

A follow-up PR (`docs/pro-tier-marketing-sync`) updates the marketing surfaces in this repo:

- **README (root + `packages/cli/README.md`) "Free vs Pro" table**:
  - Pro row "15+ extended slash commands" → "12 extended slash commands"
  - Pro row "Auto-setup scripts (labels, etc) ❌/✅" → **delete** (labels script moved to Free in PR #22)
  - Pro row "Excel WBS with formulas" → **delete** (deferred)
  - Pro row "Gantt chart SVG generator" → **delete** (deferred)
  - Pro row "Wireframe templates" → **delete** (deferred)
  - Pro row "Email support (3 months)" → **delete** (deferred, no support infra)
  - Pro price `$29` → `$19`
  - Free row added: "Label setup script (17 labels)" — was promised in GitHub Integration but missing from the matrix
  - Pro Gumroad link stays "Coming soon" until Gumroad page is live
- **HANDOFF Pro section**:
  - "추가 슬래시 명령 12+" → "추가 슬래시 명령 12 (정수)"
  - "모바일/웹 프리미엄 템플릿", "Excel WBS, 간트차트 생성기", "자동화 스크립트", "이메일 지원" → 모두 "v0.2+ 후보"로 강등 (제거하지 않고 rationale 보존)
  - Repo layout line: 별도 Private repo → "이 repo의 `pro/` 디렉토리, npm tarball에서 제외"

A future PR (post-Pro-launch) will add a **"Why Pro is open source"** section to the root README, citing the sponsorship-model framing from this doc. That avoids the FAQ "I can see the source — why pay?" eating maintainer time.

## Build sequence (when MVP is approved)

Each step lands as its own PR into this repo's `develop`, like Free PRs.

1. `pro/` skeleton — `pro/{README.md, LICENSE, CHANGELOG.md, commands/, adr-scenarios/}`, `.gitkeep` placeholders. Add `pro/` documentation about the open-source-pricing rationale so OSS readers understand "why pay for visible content".
2. Slash command set 1/3 (commands 1-4: scope, timebox, release, changelog-entry)
3. Slash command set 2/3 (commands 5-8: spike, postmortem, migration, refactor-plan)
4. Slash command set 3/3 (commands 9-12: dependency-audit, onboarding, diagram, feedback-summary)
5. ADR scenario set 1/2 (5 scenarios)
6. ADR scenario set 2/2 (5 scenarios)
7. Pro README finalize (install instructions, command index, ADR scenario index, sponsor framing)
8. `scripts/build-pro-zip.sh` — builds `ai-devseed-pro-vX.Y.Z.zip` from `pro/`. Tag-driven (`pro-v0.1.0`).
9. Gumroad page copy + screenshots (uses repo Pro README as source of truth)
10. README sync PR (this repo): live Gumroad link, update "Get Pro" CTAs from "Coming soon"
11. Public-facing announcement linking to Gumroad (timed with Free Reddit/Disquiet launch or after, depending on Pro's readiness)

Estimate: ~3-5 evening sessions for commands + scenarios. Gumroad page setup is a separate day. No Private-repo creation cost; everything happens in this repo.

## Open questions before kick-off

1. **Pro LICENSE wording** — drafting target: "Personal/team use, no resale, no redistribution of the bundle. The content remains visible in the source repo under the same restriction (looking is fine, redistributing the curated set is not)." Keep it short and human-readable; lawyer review only if revenue justifies it.
2. **Refund policy** — Gumroad default 30-day. Recommended: keep default for MVP, revisit if abuse appears.
3. **Update policy** — buyer of `pro-v0.1.0` gets `pro-v0.X.Y` free within the v0.x line. New major (`pro-v1.0`) is a separate purchase. MVP default; communicate clearly on Gumroad page.
4. **Bundle pricing with the guidebook?** HANDOFF mentions "60 Days Building Otori" guidebook at $39 (post-Otori-launch). Worth a "Pro + Guidebook" bundle at $49 once both exist.
5. **First-50-buyer discount?** $19 → $9 for the first 50 to seed reviews + bug reports. Low cost on first conversions.
6. **FAQ for the "why pay if it's public?" question** — needs a 2-3 line answer ready when this comes up on Reddit/HN. Draft: "Same reason people pay for shadcn/ui themes, Tailwind UI components, Obsidian plugins — curation + maintenance + sponsorship. The markdown is here if you want to copy 22 files by hand; the $19 is for getting the maintained bundle and supporting the project."

These are non-blocking; the MVP build can start without resolving them.
