# Pro Tier — Test Guide

> Verify Pro tier (12 slash commands + 10 ADR scenarios + zip builder) before tagging `pro-v0.1.0` and uploading to Gumroad.

**Last reviewed**: 2026-06-19 against the cut at commit `4d28346`.

**Audience**: maintainer running pre-release verification; first buyers smoke-testing post-purchase.

**Role split**:
- **Claude** handles file-integrity, zip-builder, and structure checks.
- **You** handle Claude Code slash-command behavior tests (require interactive session) and human-judgment review of ADR scenario content.

---

## 1. Build script (`scripts/build-pro-zip.sh`)

| # | Test | Command | Pass criteria |
|---|---|---|---|
| 1.1 | Build with explicit version | `bash scripts/build-pro-zip.sh 0.1.0-test` | Exit 0; output reports `commands: 12 files`, `adr-scenarios: 10 files`; creates `dist/ai-devseed-pro-v0.1.0-test.zip` |
| 1.2 | Build with no args (tag-driven) | `git tag pro-v0.1.0-rc -m "rc" && bash scripts/build-pro-zip.sh && git tag -d pro-v0.1.0-rc` | Picks up tag, same output |
| 1.3 | Refuses without version | `bash scripts/build-pro-zip.sh` (no tag, no arg) | Exit ≠ 0 with helpful "no version / no tag" message |
| 1.4 | Validates version format | `bash scripts/build-pro-zip.sh foo` | Exit ≠ 0 with version-format error |
| 1.5 | Reports SHA256 | After build, output includes `sha256: <64 hex chars>` |
| 1.6 | Zip integrity | `python -m zipfile --test dist/ai-devseed-pro-v0.1.0-test.zip` | Prints "Done testing" |
| 1.7 | Cleanup `dist/` is gitignored | After build, `git status` does NOT show `dist/` as untracked |
| 1.8 | Cross-platform (Windows) | Runs without external `zip` (uses Python fallback) | No "zip: command not found" error blocking build |

## 2. Zip contents

Inspect with `python -m zipfile --list dist/ai-devseed-pro-v0.1.0-test.zip` (or `unzip -l`):

| # | Test | Pass criteria |
|---|---|---|
| 2.1 | Single top-level folder | All entries under `ai-devseed-pro-v0.1.0-test/` (not loose files) |
| 2.2 | 25 file entries | 3 root files (README.md, LICENSE, CHANGELOG.md) + 12 commands + 10 scenarios |
| 2.3 | Bundled CHANGELOG reflects cut | Inside the zip, `CHANGELOG.md` starts with `[Unreleased]` empty and has `[0.1.0] · 2026-06-19` section below (not "toward pro-v0.1.0" build narrative) |
| 2.4 | Bundled LICENSE is Pro license | Header is "AI DevSeed Pro — License", explicitly NOT MIT |
| 2.5 | Bundled README has finalized install | Contains "Path A — Gumroad zip" + "Path B — Manual copy"; does NOT contain the "Pro v0.1.0 is not yet released" placeholder text |

## 3. Pro command files — structure

| # | Test | Pass criteria |
|---|---|---|
| 3.1 | Exactly 12 commands | `ls pro/commands/*.md \| wc -l` returns 12 |
| 3.2 | Filenames match spec | Names: `scope.md`, `timebox.md`, `release.md`, `changelog-entry.md`, `spike.md`, `postmortem.md`, `migration.md`, `refactor-plan.md`, `dependency-audit.md`, `onboarding.md`, `diagram.md`, `feedback-summary.md` |
| 3.3 | Each has frontmatter | Every file starts with `---\ndescription: ...\n---` |
| 3.4 | Each has substantial body | Each ≥ 30 lines |
| 3.5 | No Pro-only tooling assumed | Grep each for hard external-tool deps; only mentions are recommendations, not requirements |

## 4. ADR scenario files — structure

| # | Test | Pass criteria |
|---|---|---|
| 4.1 | Exactly 10 scenarios | `ls pro/adr-scenarios/*.md \| wc -l` returns 10 |
| 4.2 | Numbered 001–010 | Filenames follow `NNN-<slug>.md` |
| 4.3 | Each has Status section | Grep each → has `## Status` line |
| 4.4 | Each has empty Decision | Grep each → has `## Decision` line (intentionally empty body) |
| 4.5 | Each has tradeoff matrix | Each contains a markdown table with at least 6 columns (excluding the row-label column) |
| 4.6 | Each has 5+ options | Each contains at least 5 `### A. ...` through `### E. ...` (or similar) blocks |
| 4.7 | Each has body ≥ 80 lines | All scenarios are substantive |

## 5. Pro slash command behavior — Claude Code session (human-only)

**Setup** (one-time):

```bash
# 1. Start from a fresh Free-tier project (run Free guide test 2.1)
cd /path/to/scratch-base

# 2. Copy Pro commands into it
cp /path/to/ai-devseed/pro/commands/*.md .claude/commands/

# Sanity check: should now have 8 Free + 12 Pro = 20 commands
ls .claude/commands/ | wc -l
```

Open Claude Code in that project. Run each test below. **Acceptance bar per command**: produces the documented artifact (file or structured inline reply), with structure matching the template defined inside the source `.md`.

| # | Command | How to invoke | Expected artifact |
|---|---|---|---|
| 5.1 | `/scope` | `/scope add OAuth login flow` | Scope block (Timebox / DoD / Out-of-scope / Open assumptions) appended to `docs/journal/YYYY-MM-DD.md` after confirmation |
| 5.2 | `/timebox` set mode | `/timebox 90m fix login bug` | Inline reply with expiry clock + reminder to run `/timebox check` |
| 5.3 | `/timebox check` | `/timebox check` (after 5.2) | Inline reassessment block to fill in |
| 5.4 | `/release` | `/release` (answer `0.1.0`) | New file `docs/release/v0.1.0.md` with 8-section checklist, all boxes empty |
| 5.5 | `/changelog-entry` | After making some `feat:`/`fix:` commits, `/changelog-entry` | Bucketed draft shown; on confirm, merged into `CHANGELOG.md [Unreleased]` |
| 5.6 | `/spike` | `/spike can we use SQLite for offline cache` | New file `docs/spikes/YYYY-MM-DD-sqlite-offline-cache.md` |
| 5.7 | `/postmortem` | `/postmortem OAuth callback returns 500` | New file `docs/postmortems/YYYY-MM-DD-oauth-callback-500.md` |
| 5.8 | `/migration` | `/migration add email_verified column` | New file `docs/migrations/001-add-email-verified.md` with mandatory rollback section |
| 5.9 | `/refactor-plan` | `/refactor-plan split user-service into auth + profile` | New file `docs/refactors/YYYY-MM-DD-split-user-service.md` with stages, each independently revertable |
| 5.10 | `/dependency-audit` | `/dependency-audit` | Detects package manager; prints commands user should run; on output paste, produces bucketed report (red/yellow/white) |
| 5.11 | `/onboarding` | `/onboarding` | New file `docs/onboarding.md` with 30-min smoke test + tour + mandatory "what's surprising" section |
| 5.12 | `/diagram` | `/diagram sequence the login flow` | Mermaid `sequenceDiagram` block; on save, written to `docs/diagrams/<slug>.md` |
| 5.13 | `/feedback-summary` | `/feedback-summary` (preferably in a repo with some GitHub Issues/Discussions) | New file `docs/feedback/YYYY-MM-DD.md` with themes (not labels) + P0–P3 priorities + "what stayed silent" section |

## 6. ADR scenario adoption (human judgment review)

Pick 2–3 scenarios; copy each into a test project's `docs/decisions/` as a new ADR (renumber); evaluate the pre-filled content.

| # | Scenario | Review questions |
|---|---|---|
| 6.1 | `001-state-management.md` | Are listed options + tradeoffs accurate as of today (Redux Toolkit, Zustand, Jotai, etc.)? Would you hand this to a teammate? |
| 6.2 | `002-auth-provider.md` | Pricing model column reflects current providers? Free-tier numbers still right? |
| 6.3 | Any one of 003–010 | Read end-to-end. Does the Context section list real tradeoffs you've actually faced? Tradeoff matrix axes useful? |

Pass criteria: the user can fill in the Decision section without first having to gut the pre-filled content.

## 7. Cross-checks

| # | Test | Pass criteria |
|---|---|---|
| 7.1 | `pro/README.md` command index matches files | 12 ✅ markers in command index ↔ 12 files in `pro/commands/` |
| 7.2 | `pro/README.md` scenario index matches files | 10 ✅ markers in scenario index ↔ 10 files in `pro/adr-scenarios/` |
| 7.3 | npm tarball excludes `pro/` (structural invariant) | `cd packages/cli && npm pack --dry-run` shows 40 files, no `pro/` match. |
| 7.4 | Root `.gitattributes` enforces LF on `*.sh` | `git check-attr eol scripts/build-pro-zip.sh` reports `eol: lf` |
| 7.5 | `pro/CHANGELOG.md` `[0.1.0]` entry mentions all 12 + 10 by name | Grep each command name and scenario name in the `[0.1.0]` section |
| 7.6 | Pro README "Reference" section all-✅ | No ⏳ markers remain |

## 8. Install path simulation (manual copy, post-purchase UX)

This simulates what a buyer experiences with the manual-copy install. Run from the test project directory:

```bash
# After unzipping ai-devseed-pro-v0.1.0.zip somewhere:
mkdir -p .claude/commands docs/decisions

cp /path/to/ai-devseed-pro-v0.1.0/commands/*.md .claude/commands/
cp /path/to/ai-devseed-pro-v0.1.0/adr-scenarios/*.md docs/decisions/

ls .claude/commands/ | wc -l    # expect: 20 (8 Free + 12 Pro)
ls docs/decisions/ | wc -l       # expect: 11 (1 Free baseline + 10 Pro scenarios)
```

| # | Test | Pass criteria |
|---|---|---|
| 8.1 | Commands merge cleanly into existing `.claude/commands/` | No filename collisions with Free 8 |
| 8.2 | Scenarios land in `docs/decisions/` | All 10 files appear |
| 8.3 | (Renumbering) Scenario `001` doesn't collide with Free's `001-project-bootstrap.md` | If collision, buyer is expected to renumber as documented in adoption notes |

---

## Results template

Copy into your notes when running:

```
Pro tier test run — YYYY-MM-DD
Commit tested: <sha>
Tested zip SHA256: <copy from build output>
Tester: <name>

Section 1 (build script):    ✅ / ❌
Section 2 (zip contents):    ✅ / ❌
Section 3 (cmd files):       ✅ / ❌
Section 4 (ADR files):       ✅ / ❌
Section 5 (cmd behavior):    ✅ / ❌  (human-only)
Section 6 (ADR adoption):    ✅ / ❌  (human-only)
Section 7 (cross-checks):    ✅ / ❌
Section 8 (install path):    ✅ / ❌

Blockers / regressions:
-
```

If every section passes, push `pro-v0.1.0` and proceed to Gumroad upload.
