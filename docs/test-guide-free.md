# Free Tier — Test Guide

> Verify the AI DevSeed Free tier (CLI + base/mobile-rn/web-react templates + 8 base slash commands + 2 overlay commands) works end-to-end before each release.

**Last reviewed**: 2026-06-19 against `0.1.0-beta.3` (commit `4d28346`).

**Audience**: maintainer running pre-publish verification; new contributors smoke-testing on first checkout.

**Role split**:
- **Claude** (or any non-interactive runner) handles file-structure, CLI-exit-code, and content-pattern tests.
- **You** (human) handle Claude Code slash-command behavior tests — those require an interactive Claude Code session inside the test project.

---

## Pre-test setup

The CLI isn't on npm yet, so use one of these to invoke `ai-devseed`:

### A. Direct node (simplest, no install)

```bash
node /absolute/path/to/ai-devseed/packages/cli/bin/ai-devseed.js init test-app
```

### B. `npm link` (mirrors the global install experience)

```bash
cd /path/to/ai-devseed/packages/cli
npm install     # one-time
npm link        # exposes `ai-devseed` globally
# Test in a scratch directory:
mkdir /tmp/scratch && cd /tmp/scratch
ai-devseed init test-app
# Cleanup after testing:
npm unlink -g ai-devseed
```

### C. After npm publish: `npx ai-devseed init test-app`

Pick one path; all tests below assume `ai-devseed` resolves to the local build.

---

## 1. Smoke tests (CLI invocation)

| # | Test | Command | Pass criteria |
|---|---|---|---|
| 1.1 | Version flag | `ai-devseed --version` | Prints `0.1.0-beta.3` (or current `package.json` version) |
| 1.2 | Help | `ai-devseed --help` | Lists `init`, `list` commands + global flags |
| 1.3 | List templates | `ai-devseed list` | Shows `base`, `mobile-rn`, `web-react` |
| 1.4 | Unknown command | `ai-devseed nope` | Exits non-zero with usage message |

## 2. Init flow — happy paths

Run each from an empty parent directory. Verify the resulting tree against expectations. After each test, `rm -rf` the directory before the next one.

| # | Test | Command | Pass criteria |
|---|---|---|---|
| 2.1 | base template, --yes | `ai-devseed init scratch-base --yes --no-git` | Target dir created with: `CLAUDE.md`, `README.md`, `CHANGELOG.md`, `.claude/{settings.json, commands/}`, `.github/{ISSUE_TEMPLATE/, setup-labels.sh}`, `docs/{architecture.md, decisions/, ideas/, journal/, retrospective/, workflow-guide.md}`, `wbs/checklist.md` |
| 2.2 | mobile-rn overlay | `ai-devseed init scratch-mobile -t mobile-rn --yes --no-git` | Same as 2.1 + `.claude/commands/new-screen.md`. `CLAUDE.md` mentions React Native / Expo. |
| 2.3 | web-react overlay | `ai-devseed init scratch-web -t web-react --yes --no-git` | Same as 2.1 + `.claude/commands/new-page.md`. `CLAUDE.md` mentions React / Vite. |
| 2.4 | -t flag explicit | `ai-devseed init flag-base --yes -t base --no-git` | Same shape as 2.1 |
| 2.5 | Interactive prompts | `ai-devseed init interactive-app` (answer each prompt) | Prompts in order: project name (skipped, taken from arg), description, author, template, git init. Result reflects answers. |

## 3. Placeholder substitution

After running test 2.1, scan the result for unreplaced placeholders:

| # | Test | How | Pass criteria |
|---|---|---|---|
| 3.1 | `{{PROJECT_NAME}}` filled in | `grep -r "{{PROJECT_NAME}}" scratch-base/` | Zero matches |
| 3.2 | `{{AUTHOR}}` filled (or empty) | `grep -r "{{AUTHOR}}" scratch-base/` | Zero matches |
| 3.3 | `{{YEAR}}` filled with current year | `grep -r "{{YEAR}}" scratch-base/` | Zero matches |
| 3.4 | `{{DATE}}` filled with today's date | `grep -r "{{DATE}}" scratch-base/` | Zero matches |
| 3.5 | Project name appears in files | `grep "scratch-base" scratch-base/README.md scratch-base/CLAUDE.md scratch-base/package.json` (where applicable) | At least one hit per file |

## 4. Git initialization (when `--git` is enabled / no `--no-git`)

Run `ai-devseed init scratch-git --yes` (omit `--no-git`):

| # | Test | Pass criteria |
|---|---|---|
| 4.1 | `.git/` exists | `test -d scratch-git/.git` |
| 4.2 | First commit present | `cd scratch-git && git log --oneline` shows exactly 1 commit |
| 4.3 | Commit author is the configured git user | `cd scratch-git && git log -1 --pretty=%an,%ae` matches global git config |
| 4.4 | Clean tree after init | `cd scratch-git && git status` reports nothing to commit |

## 5. Error paths

| # | Test | Command | Pass criteria |
|---|---|---|---|
| 5.1 | Non-empty target | `mkdir scratch-fail && touch scratch-fail/x && ai-devseed init scratch-fail --yes --no-git` | Exit ≠ 0 with "already exists and is not empty" |
| 5.2 | Uppercase name | `ai-devseed init MyApp --yes --no-git` | Exit ≠ 0 with validation message |
| 5.3 | Name 51 chars | `ai-devseed init $(printf 'a%.0s' {1..51}) --yes --no-git` | Exit ≠ 0 with "50 characters or less" |
| 5.4 | Name starts with hyphen | `ai-devseed init -my-app --yes --no-git` | **Known minor defect** (HANDOFF 주의사항): Commander treats `-my-app` as a flag → "unknown option" generic error. Do not fix until v0.2. Test passes if the error appears (even though the message is generic). |

## 6. Slash command files (post-init)

After test 2.1, `2.2`, `2.3`:

| # | Test | Pass criteria |
|---|---|---|
| 6.1 | base template ships 8 commands | `ls scratch-base/.claude/commands/*.md \| wc -l` returns 8 |
| 6.2 | Base command names | Files: `add-decision.md`, `daily.md`, `explore.md`, `handoff.md`, `idea.md`, `retro.md`, `review.md`, `test-plan.md` |
| 6.3 | mobile-rn adds `/new-screen` | After 2.2, `.claude/commands/` has 9 files including `new-screen.md` |
| 6.4 | web-react adds `/new-page` | After 2.3, `.claude/commands/` has 9 files including `new-page.md` |

## 7. Slash command behavior — Claude Code session

For each command below, open Claude Code in `scratch-base/` (or `scratch-mobile/` / `scratch-web/` for overlays) and invoke. Verify the documented artifact is created.

**Important**: these need a real Claude Code session because the commands are interpreted by the assistant — you can't `bash` them.

| # | Command | How to invoke | Expected artifact |
|---|---|---|---|
| 7.1 | `/daily start` | In chat | 4-section summary (yesterday / in-progress / today / blockers) printed inline |
| 7.2 | `/idea` | `/idea improve onboarding doc clarity` | New entry appended to `docs/ideas/inbox.md` |
| 7.3 | `/add-decision` | `/add-decision use Tailwind for CSS` | New file `docs/decisions/002-use-tailwind.md` (001 already shipped) |
| 7.4 | `/handoff` | `/handoff` (after some work) | Session summary appended/updated in HANDOFF doc (project's own, not AI DevSeed's) |
| 7.5 | `/retro` | `/retro week of 2026-06-19` | New file under `docs/retrospective/` |
| 7.6 | `/review` | `/review` (after editing a file) | Self-review summary printed inline; flags issues |
| 7.7 | `/explore` | `/explore src/` | Map: entry points / key files / recent commits / open questions |
| 7.8 | `/test-plan` | `/test-plan login flow` | Test plan grouped by type with priorities |
| 7.9 | `/new-screen` (mobile) | `/new-screen Profile` in `scratch-mobile/` | RN screen scaffold (file or instructions to create one) |
| 7.10 | `/new-page` (web) | `/new-page Profile` in `scratch-web/` | React page scaffold |

## 8. GitHub Integration files

After test 2.1:

| # | Test | Pass criteria |
|---|---|---|
| 8.1 | Issue templates present | `scratch-base/.github/ISSUE_TEMPLATE/` has `bug_report.md`, `feature_request.md`, `task.md`, `config.yml` |
| 8.2 | `setup-labels.sh` shipped | File exists at `scratch-base/.github/setup-labels.sh` |
| 8.3 | 17 labels defined | `grep -c "^gh label create" scratch-base/.github/setup-labels.sh` returns 17 |
| 8.4 | Header has project name | Header has `scratch-base` (not `{{PROJECT_NAME}}`) |
| 8.5 | LF line endings | File doesn't have CRLF (`.gitattributes` enforces); `file scratch-base/.github/setup-labels.sh` reports LF |

## 9. Documentation files

| # | Test | Pass criteria |
|---|---|---|
| 9.1 | `workflow-guide.md` mentions Branch Protection | `grep -c "Branch Protection" scratch-base/docs/workflow-guide.md` ≥ 1 |
| 9.2 | `workflow-guide.md` mentions Conventional Commits | grep ≥ 1 |
| 9.3 | `CLAUDE.md` references key paths | Contains `docs/architecture.md`, `docs/decisions/`, `wbs/` |

---

## Results template

Copy this section into your notes when running:

```
Free tier test run — YYYY-MM-DD
Commit tested: <sha>
Tester: <name>

Section 1 (smoke):       ✅ / ❌  (notes)
Section 2 (init happy):  ✅ / ❌
Section 3 (placeholders):✅ / ❌
Section 4 (git):         ✅ / ❌
Section 5 (errors):      ✅ / ❌  (5.4 known defect; passes if any non-zero exit)
Section 6 (cmd files):   ✅ / ❌
Section 7 (cmd behavior):✅ / ❌  (human-only)
Section 8 (.github):     ✅ / ❌
Section 9 (docs):        ✅ / ❌

Blockers / regressions:
-
```

If every section passes (or 5.4 fails as documented), the Free tier is ready for the targeted release.
