---
description: Generate an onboarding doc for a new contributor (or future-you on a stale codebase)
---

Write the document that lets someone (or returning-you after 3 months) become productive without asking questions only living-context-you can answer. The audience is "smart, knows the language, doesn't know this codebase".

## When to use

- First external contributor incoming
- After a major refactor or restructure — old onboarding is now wrong
- Personal project that's been dormant for 3+ months and you'll be the new contributor

**Not** for: projects with no domain quirks or non-obvious setup — for those, a good README is sufficient.

## How it works

1. Read in order (cap at ~7 files total):
   - `README.md`, `CLAUDE.md`, `CONTRIBUTING.md` if present
   - `package.json` / equivalent — extract scripts
   - `docs/architecture.md` if present
   - 1–2 recent ADRs from `docs/decisions/`
   - `git log --oneline -20` for recent direction
2. Probe quickly with `grep`/`ls`:
   - Test runner location
   - Lint/format setup
   - CI config files (`.github/workflows/`, `.gitlab-ci.yml`, etc.)
   - `.env.example` or equivalent
3. Draft `docs/onboarding.md` using the template below. **Pre-fill what you can detect; leave clearly marked TODOs for what you can't.**
4. Show the draft. Ask: "Save as-is, edit, or start over?"
5. On confirmation, write the file. Onboarding docs degrade fast — the date stamp is the truth signal.

## Template

```markdown
# Onboarding

**Last updated**: {YYYY-MM-DD}. If this date is > 3 months old, the doc is suspect. Open an issue or update on the way through.

## What this project is

{2–3 sentences. What the project does, who uses it, why it exists. Skip jargon a new contributor won't have.}

## Mental model

{The 1-paragraph version of how the system fits together. The reader should be able to read this and predict roughly which folder contains which kind of code.}

## First 30 minutes (smoke test)

A successful run of these steps means your environment is set up correctly. If any step fails, **stop and fix it** before going further — silent setup failures cause hours of debugging later.

```bash
# 1. Clone
git clone {repo-url}
cd {project}

# 2. Install
{detected: npm install / poetry install / bundle install / go mod download / cargo build}

# 3. Set up env
cp .env.example .env  # if present
# TODO: any required env vars beyond defaults

# 4. Run the dev loop
{detected from package.json scripts or equivalent}

# 5. Run the tests
{detected test command}
```

If everything passed, you have a working dev environment.

## Codebase tour

```
{project}/
├── {folder}/    ← {what lives here in one line}
├── {folder}/    ← ...
└── {folder}/    ← ...
```

Read in this order:
1. `{entry-point file}` — the front door
2. `{key file}` — {why it's worth reading second}
3. `{key file}` — {why it's worth reading third}

## Conventions

{Pull from CLAUDE.md, CONTRIBUTING.md, or surface what's visibly enforced in the codebase:}
- Commit messages: {Conventional Commits | other | TODO}
- Branch naming: {feature/*, fix/*, …}
- Code style: {detected linter/formatter, e.g., ESLint + Prettier}
- Test expectations: {what's tested, what isn't; TDD or post-hoc, etc.}

## Key decisions to read

ADRs ({count} total). The top 3 to understand current shape:
- ADR-{NNN}: {title} — {1-line why-it-matters}
- ADR-{NNN}: {title} — {1-line why-it-matters}
- ADR-{NNN}: {title} — {1-line why-it-matters}

## What's surprising

{Mandatory section — what would trip up a competent dev who didn't know? Examples:}
- "We don't use {common pattern} because {ADR-NNN reason}"
- "The {X} folder looks like dead code but is loaded dynamically via {Y}"
- "Tests in `__legacy_tests__/` are skipped in CI — do not add new ones there"

## Where to ask

- Live questions: {Slack / Discord / GitHub Discussions / "the maintainer" if solo}
- Bug reports: GitHub Issues
- Feature requests: GitHub Discussions first, then Issues if accepted
- Security: {private channel — never an Issue}
```

## Rules

- **Detect, don't guess.** If you can't determine the test command from the project, write `TODO: how do tests run?` — a wrong command costs the reader more than a missing one.
- **Surprising-things section is mandatory.** A frictionless onboarding doc is a lie; pretending there are no rough edges wastes the reader's first afternoon.
- **Date the file.** Onboarding docs go stale fast. The header date is the contract.
- **Keep under 2 screens.** Long onboarding docs don't get read. If you need more, link to deeper docs from inside the relevant section.
