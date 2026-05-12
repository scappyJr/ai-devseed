# Contributing to AI DevSeed

Thanks for thinking about contributing! AI DevSeed is a solo-built beta project, so feedback is genuinely valuable.

## 🐛 Reporting Bugs / Suggesting Features

Use [GitHub Issues](https://github.com/scappyJr/ai-devseed/issues). Three templates are provided: bug report, feature request, task. Add labels where useful (`type/*`, `priority/*`, `template/*`) — see `.github/setup-labels.sh` for the full list.

For broader discussions, use [GitHub Discussions](https://github.com/scappyJr/ai-devseed/discussions).

## 🌳 Branch Flow

```
main          ← stable, what users install via npm
  ↑
develop       ← integration branch (default base for PRs)
  ↑
feature/* | fix/* | docs/* | chore/*
```

**Important**: When opening a PR, set the base to `develop` (not `main`). GitHub defaults to `main`; accidentally merging to `main` has been a recurring issue. The `develop → main` sync happens at release time only.

## ✍️ Commit Messages

[Conventional Commits](https://www.conventionalcommits.org/) — `<type>(<scope>): <subject>`.

Common types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`.

Example: `feat(templates): add /idea slash command to base template`

## 🔄 PR Checklist

Before submitting:

- [ ] Branched from `develop`, base set to `develop`
- [ ] Conventional Commits in the title
- [ ] If CLI or templates changed: smoke-tested with `node packages/cli/bin/ai-devseed.js init test-app --yes`
- [ ] `CHANGELOG.md` `[Unreleased]` updated for user-facing changes

## 🛠 Local Setup

```bash
git clone https://github.com/scappyJr/ai-devseed.git
cd ai-devseed/packages/cli
npm install

# Run locally
node bin/ai-devseed.js --help
node bin/ai-devseed.js init test-app --yes
```

## 🎨 Adding a Template

Templates are **overlays** on `packages/cli/templates/base/`. Provide only the files that differ for that platform — typically a tailored `CLAUDE.md` plus one or two platform-specific slash commands. See `templates/mobile-rn/` and `templates/web-react/` as references.

Then register the template in `packages/cli/src/commands/init.js` (the `select` choices in `gatherProjectInfo`) and in `packages/cli/bin/ai-devseed.js` (the `list` command output).

## 🤝 Tone

Be kind, focus on the work, assume good faith.
