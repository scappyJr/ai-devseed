# Changelog — AI DevSeed Pro

All notable changes to the Pro tier will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

This changelog is **separate** from the Free tier changelog (`../CHANGELOG.md`).
The Pro tier ships on its own cadence as a Gumroad zip release tagged
`pro-vX.Y.Z`.

---

## [Unreleased]

_(No changes yet — next bullets go here.)_

---

## [0.1.0] · 2026-06-19

**Initial release.** 22 markdown files packaged as `ai-devseed-pro-v0.1.0.zip` (60K, 25 files including README/LICENSE/CHANGELOG). SHA256 published on the GitHub Release for `pro-v0.1.0` and on the Gumroad product page.

### Added

- **12 extended slash commands**, in three thematic groups:
  - **Scoping & shipping** — `/scope`, `/timebox`, `/release`, `/changelog-entry`
  - **Investigation & post-incident** — `/spike`, `/postmortem`, `/migration`, `/refactor-plan`
  - **Audit & communication** — `/dependency-audit`, `/onboarding`, `/diagram`, `/feedback-summary`

  Each command follows the same format as the Free tier (`packages/cli/templates/base/.claude/commands/`): YAML frontmatter, structured body, inline markdown template, hard rules. Zero Pro-only tooling dependencies — every command works on any project that has git + a CHANGELOG.

- **10 ADR scenario starter templates**, each pre-filled with Context (6+ tradeoffs), Options (5+ contenders with explicit pros/cons), and a 6-axis tradeoff matrix. Decision / Reasoning / Consequences sections intentionally empty — the adopting project fills them in:
  - `001-state-management.md` — Redux Toolkit / Zustand / Jotai / Context / React Query
  - `002-auth-provider.md` — Auth0 / Clerk / Supabase / Firebase / Auth.js / roll-your-own
  - `003-database.md` — Postgres / SQLite / DynamoDB / Firestore / MongoDB / SQLite+sync
  - `004-css-strategy.md` — Tailwind / CSS Modules / CSS-in-JS / vanilla CSS / UnoCSS-family
  - `005-api-style.md` — REST+OpenAPI / GraphQL / tRPC / JSON-RPC / gRPC
  - `006-monorepo-strategy.md` — Turborepo / Nx / workspaces / Lerna / polyrepo / Moon-Rush-Bazel
  - `007-deployment-platform.md` — Vercel / Netlify / Cloudflare / Fly / Railway / AWS / self-host
  - `008-testing-strategy.md` — Pyramid / Trophy / E2E-heavy / Manual+types / TDD / property-fuzz
  - `009-error-handling.md` — Throws / Result types / structured codes / hybrid / tagged unions
  - `010-observability.md` — Print+platform / Sentry / DataDog / Grafana / OpenTelemetry / Honeycomb / Axiom

- **Pro tier README, LICENSE, CHANGELOG** — open-source-pricing rationale, personal/team-use license (not MIT), Keep-a-Changelog format.

### Build tooling (in the main repo)

- **`scripts/build-pro-zip.sh`** — tag-driven (`pro-v*`) or explicit-version builder. Bundles `pro/` into `dist/ai-devseed-pro-vX.Y.Z.zip`. Validates structure (12 commands + 10 scenarios), reports size + SHA256. `zip` → Python `shutil.make_archive` fallback (works on default Windows without external `zip`).
- **Root `.gitattributes`** — forces LF on `*.sh` / `*.bash` so the build script survives Windows checkout.

### Distribution

- Single Public repo at root `pro/` (visible to GitHub readers).
- $19 on Gumroad — the sponsorship channel. Same files, plus the convenience of one transaction and lifetime updates within the v0.x line.
- npm tarball structurally excludes `pro/` (sits outside `packages/cli/`).

---

## Update policy

Buyers of any `pro-v0.X.Y` receive all subsequent `pro-v0.X.Y` updates within
the v0.x line at no additional cost. A new major release (e.g. `pro-v1.0`)
is a separate purchase.
