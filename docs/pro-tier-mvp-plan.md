# Pro Tier MVP Plan

> Status: **DRAFT — pending owner approval**
> Owner: scappyJr · Drafted: 2026-06-12

## Why this exists

The current README markets a Pro tier with 7 attributes (15+ commands, Excel WBS, Gantt SVG, 10 ADR scenarios, auto-setup scripts, wireframe templates, email support). That spec was written aspirationally before any user demand was validated. This doc narrows Pro to a defensible MVP that can ship within a week and stay maintainable solo while Otori is the primary project.

**MVP scope decision** (2026-06-12): ship Pro as **12 extended slash commands + 10 ADR scenario templates**. Defer Excel WBS, Gantt SVG, wireframe templates, premium-coded templates, and email support until Free has produced enough signal to justify the build cost.

**Price**: $29 → **$19**. Lower because the scope shrank and we want lower friction on first conversion data.

## Distribution

**Channel**: Gumroad zip download.

- Buyer receives `ai-devseed-pro-vX.Y.Z.zip` after purchase.
- Zip contents:
  ```
  ai-devseed-pro/
  ├── README.md            # install + usage
  ├── LICENSE              # commercial, not MIT
  ├── commands/            # 12 .md files — copy into .claude/commands/
  └── adr-scenarios/       # 10 .md files — copy into docs/decisions/ as starting points
  ```
- Install = manual copy. No CLI integration in MVP; a future `ai-devseed install-pro <zip>` is post-MVP.

**Why not a Private GitHub repo with npm install?** Adds account/permission management overhead that doesn't pay off until volume justifies it. Zip + honor-system is fine for beta-stage solo.

**Why not a license-key check inside the CLI?** Needs a server. Overengineering. Honor-system + a "support the project" framing is enough at this stage; revisit if piracy becomes visible.

## Repo layout

Pro assets live in a **separate Private repo** `scappyJr/ai-devseed-pro` (not in this Public repo). Two reasons: (1) zip is easier to build from a dedicated repo, (2) keeps any half-finished Pro work out of public view.

This repo (`ai-devseed`) stays Free-only; the Pro README link in marketing copy points to Gumroad, not to a code path.

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

After this doc is approved, a follow-up PR updates the marketing surfaces:

- **README (root + `packages/cli/README.md`) "Free vs Pro" table**:
  - Pro row "15+ extended slash commands" → "12 extended slash commands"
  - Pro row "Auto-setup scripts (labels, etc) ❌/✅" → **delete** (labels script moved to Free in PR #22)
  - Pro row "Excel WBS with formulas" → **delete** (deferred)
  - Pro row "Gantt chart SVG generator" → **delete** (deferred)
  - Pro row "Wireframe templates" → **delete** (deferred)
  - Pro row "Email support (3 months)" → **delete** (deferred, no support infra)
  - Pro price `$29` → `$19`
  - Pro Gumroad link stays "Coming soon" until Gumroad page is live
- **HANDOFF Pro section**:
  - "추가 슬래시 명령 12+" → "추가 슬래시 명령 12 (정수)"
  - "모바일/웹 프리미엄 템플릿", "Excel WBS, 간트차트 생성기", "자동화 스크립트", "이메일 지원" → 모두 제거 또는 "v0.2 후보로 강등"

## Build sequence (when MVP is approved)

Each step lands as its own PR for review-ability.

1. Private repo `scappyJr/ai-devseed-pro` 생성 + initial README/LICENSE + folder skeleton
2. Slash command set 1/3 (commands 1-4: scope, timebox, release, changelog-entry)
3. Slash command set 2/3 (commands 5-8: spike, postmortem, migration, refactor-plan)
4. Slash command set 3/3 (commands 9-12: dependency-audit, onboarding, diagram, feedback-summary)
5. ADR scenario set 1/2 (5 scenarios)
6. ADR scenario set 2/2 (5 scenarios)
7. Pro README (install instructions, command index, ADR scenario index)
8. zip build script (`scripts/build-zip.sh`) + first release tag `v0.1.0`
9. Gumroad page copy + screenshots
10. README sync PR (Free repo): update Free vs Pro table per "Marketing copy updates" above
11. Public-facing announcement linking to Gumroad

Estimate: ~3-5 evening sessions for commands + scenarios. Gumroad page setup is a separate day.

## Open questions before kick-off

1. **Pro LICENSE wording** — what's the actual commercial-license text? "Personal use only, no redistribution, no warranty." Or stricter? (Worth asking a lawyer if revenue scales; for MVP, a short bespoke license is fine.)
2. **Refund policy** — Gumroad default is 30-day. Keep or shorten?
3. **Update policy** — buyer of v0.1.0 gets v0.2.0 free? Or per-version pricing? (MVP default: free updates for life within major version.)
4. **Bundle pricing with the guidebook?** HANDOFF mentions "60 Days Building Otori" guidebook at $39 (post-Otori-launch). Worth a "Pro + Guidebook" bundle at $49?
5. **First-50-buyer discount?** $19 → $9 for the first 50 to seed reviews + bug reports. Lower risk on first conversions.

These are non-blocking; the MVP build can start without resolving them.
