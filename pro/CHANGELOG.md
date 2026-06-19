# Changelog — AI DevSeed Pro

All notable changes to the Pro tier will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

This changelog is **separate** from the Free tier changelog (`../CHANGELOG.md`).
The Pro tier ships on its own cadence as a Gumroad zip release tagged
`pro-vX.Y.Z`.

---

## [Unreleased]

### Added (toward `pro-v0.1.0`)

- Skeleton folder layout (`README.md`, `LICENSE`, `CHANGELOG.md`, `commands/`, `adr-scenarios/`)
- **Slash command set 1/3** — `/scope`, `/timebox`, `/release`, `/changelog-entry` (4 of 12)
- **Slash command set 2/3** — `/spike`, `/postmortem`, `/migration`, `/refactor-plan` (8 of 12)
- **Slash command set 3/3** — `/dependency-audit`, `/onboarding`, `/diagram`, `/feedback-summary` (**12 of 12 ✓**)
- **ADR scenario set 1/2** — state management, auth provider, database, CSS strategy, API style (5 of 10)
- **ADR scenario set 2/2** — monorepo, deployment, testing, error handling, observability (**10 of 10 ✓**)
- Pro README finalized — real install instructions (two paths: Gumroad zip vs. manual copy), adoption notes, quick-start commands, reference framing
- `scripts/build-pro-zip.sh` — tag-driven (`pro-vX.Y.Z`) builder that emits `dist/ai-devseed-pro-vX.Y.Z.zip` with the 25 files (README + LICENSE + CHANGELOG + 12 commands + 10 scenarios). Falls back to Python's zipfile if system `zip` is unavailable.
- Root `.gitattributes` — forces LF on `*.sh` / `*.bash` so the build script survives Windows checkout

**Content + packaging are complete.** Cutting `pro-v0.1.0` and uploading to Gumroad is the only remaining step before the tier is purchasable.

See [`../docs/pro-tier-mvp-plan.md`](../docs/pro-tier-mvp-plan.md) for the full build sequence.

---

## Update policy

Buyers of any `pro-v0.X.Y` receive all subsequent `pro-v0.X.Y` updates within
the v0.x line at no additional cost. A new major release (e.g. `pro-v1.0`)
is a separate purchase.
