# AI DevSeed

> CLI tool for bootstrapping AI-collaborative solo development projects.
> `npx ai-devseed init my-app`

## For Claude Code

For full project context, current launch status, and next-session pickup
instructions (including how to pull on a new machine), read:

  @HANDOFF-aidevseed.md

## Key facts

- **Owner**: scappyJr (hwkim@mammothsoft.co.kr)
- **Repo**: https://github.com/scappyJr/ai-devseed (currently **Private** — flip to Public before npm publish / Reddit launch)
- **Stage**: v0.1.0-beta.1 — pre-launch
- **Branches**: `main` (stable), `develop` (integration), `feature/*` (work)
- **License**: MIT

## Working notes

- Conversation language: Korean. Project artifacts (commits, README, issues, docs intended for users): English (global market).
- The CLI itself is in `packages/cli/`. Templates live in `packages/cli/templates/{base,mobile-rn}/`.
- Placeholder syntax `{{PROJECT_NAME}}`, `{{AUTHOR}}`, `{{YEAR}}`, `{{DATE}}` is filled in by the CLI for end users — leave it untouched in `packages/cli/templates/`.
- Single Source of Truth: each piece of info lives in one place. If something is in HANDOFF, don't duplicate it here.
