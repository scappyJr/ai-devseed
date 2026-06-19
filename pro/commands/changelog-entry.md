---
description: Generate a CHANGELOG section from git log since the last tag
---

Pre-fill the `[Unreleased]` section of `CHANGELOG.md` from git history so the user only has to edit and confirm, not start from scratch.

## When to use

- Mid-development, when the unreleased section has gone stale
- Right before `/release`, to make sure `[Unreleased]` reflects reality

**Not** a substitute for thoughtful changelog writing — categorize by user-facing impact, not just by commit type.

## How it works

1. Find previous tag: `git tag --sort=-v:refname | head -1`. If none, fall back to the repo's first commit (`git rev-list --max-parents=0 HEAD`).
2. Get commits in range: `git log {previous-tag}..HEAD --pretty=format:"%h %s"`.
3. Bucket each commit by Conventional Commit prefix:
   - `feat:` → **Added**
   - `fix:` → **Fixed**
   - `perf:` → **Changed** (call out performance gain)
   - `revert:` → **Fixed** (note the revert)
   - `BREAKING CHANGE:` footer or `feat!:` / `fix!:` → **⚠️ Breaking** with migration note
   - `docs:` → include only if user-facing (README, public guides). Skip internal-doc edits.
   - `refactor:` / `chore:` / `style:` / `test:` / `build:` / `ci:` → **omit** unless they have user-visible effects (then promote to the right bucket).
4. Rewrite each kept commit as a user-facing bullet, not a copy of the commit subject. Strip ticket numbers unless the project tracks them in the CHANGELOG by convention.
5. Show the user the draft. Ask: "Edit before appending, or append as-is?"
6. On confirmation, **merge** into the existing `[Unreleased]` section of `CHANGELOG.md`. If the user already wrote items there, keep them — add new ones under the correct buckets, don't overwrite.

## Output format (Keep a Changelog)

```markdown
## [Unreleased]

### Added
- {User-facing description} ({SHA})

### Changed
- {User-facing description} ({SHA})

### Fixed
- {User-facing description} ({SHA})

### ⚠️ Breaking
- {Description} — migration: {one-line note} ({SHA})
```

Omit empty buckets. If everything in the range is `chore:` / `refactor:` and there's nothing user-facing to say, print: "No user-facing changes detected since `{previous-tag}`. Skipping append; bump `CHANGELOG.md` manually if you disagree."

## Rules

- **Translate, don't copy.** "fix: handle null in getUser" → "Fixed crash when user record was missing on profile load". Commit messages are written for developers; CHANGELOG entries are written for users.
- **Preserve existing `[Unreleased]` content.** If the user already added a hand-written entry, merge it under the right bucket. Overwriting is destructive.
- **Ask before writing.** Show the draft first; append only on explicit confirmation. CHANGELOG edits often span dozens of commits — easier to revise once than to revert a bad write.
- **No tag bump here.** Cutting `[Unreleased]` into a versioned section is `/release`'s job, not this command's.
