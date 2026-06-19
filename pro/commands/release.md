---
description: Generate a pre-publish release checklist (version bump, CHANGELOG, tag, smoke test, sensitive-info sweep)
---

Build a single file you can tick through before tagging a release. The checklist is generated per-release so you can carry it in git history as evidence that the steps actually ran.

## When to use

- Before any version bump that ships to users (`npm publish`, GitHub Release, deploy)
- Before a milestone tag (even private repos benefit from the discipline)

**Not** for every commit. This is heavyweight on purpose.

## How it works

1. Ask: "Target version? (e.g., `0.2.0`, `1.0.0-rc.1`)"
2. Detect package type from project root (Node `package.json`, Python `pyproject.toml`, Go `go.mod`, …). Default to "generic" if none.
3. Detect previous tag: `git tag --sort=-v:refname | head -1`. If none, note "(no previous tag)".
4. Write file `docs/release/v{VERSION}.md` (create `docs/release/` if missing) using the template below, pre-filled with version, previous tag, and package-type-specific commands.
5. Print the file path and stop. Do **not** auto-run any step — this command produces a plan; the user executes it.

## Template

```markdown
# Release v{VERSION} — {YYYY-MM-DD}

Previous tag: `{previous-tag}` · Commits since: run `git log {previous-tag}..HEAD --oneline | wc -l`

## 1. Code state
- [ ] Working tree clean (`git status` shows no uncommitted changes)
- [ ] On the right branch (typically `main` or `release/*`)
- [ ] All intended commits merged
- [ ] CI green (or manual test run is green if no CI)

## 2. Version bump
- [ ] Version updated in {detected manifest, e.g. `package.json`}
- [ ] Lockfile regenerated if applicable (`npm install`, `poetry lock --no-update`, …)
- [ ] Version bump commit landed

## 3. CHANGELOG
- [ ] `[Unreleased]` content reviewed (if empty: run `/changelog-entry` first)
- [ ] `[Unreleased]` cut to `[{VERSION}] · {YYYY-MM-DD}`
- [ ] New empty `[Unreleased]` header re-added at the top
- [ ] Link references at bottom updated (if using Keep-a-Changelog with refs)

## 4. Sensitive-info sweep
- [ ] No `.env`, credentials, API keys, or internal hostnames in the diff vs previous tag
- [ ] `git diff {previous-tag}..HEAD | grep -iE 'TODO|FIXME|XXX|secret|password|api[_-]?key'` — review any hits
- [ ] Author/committer emails are the intended ones (e.g., noreply if open source)

## 5. Smoke test
- [ ] Install from pristine state mirrors the user path
  - **npm**: `npm pack` → install in scratch dir → run the documented entry command
  - **PyPI**: fresh venv → `pip install dist/*.whl` → run entry
  - **Generic**: walk through `README.md` quickstart in a clean directory
- [ ] Basic command runs end-to-end without errors

## 6. Tag and push
- [ ] `git tag v{VERSION} -m "Release v{VERSION}"`
- [ ] `git push origin v{VERSION}`
- [ ] GitHub Release drafted from tag (if applicable)

## 7. Publish (per-target)
- [ ] **npm**: `npm publish --tag {beta|latest}` from package dir, 2FA confirmed
- [ ] **PyPI**: `twine upload dist/*` with API token
- [ ] **Other channels**: ...

## 8. Post-publish verify
- [ ] Package page renders (README, license, repo link)
- [ ] Installed-version smoke test from a clean directory (`npx pkg@{VERSION}` etc.)
- [ ] Announcement post links the right version

## Aborted release log

If a step fails and the release aborts, note here:
- What failed:
- Decision: roll forward / roll back / fix and retry
```

## Rules

- **One file per release.** Don't reuse `docs/release/vX.Y.Z.md`. Each release is a separate auditable artifact — the checked file becomes evidence in your history.
- **Don't pre-tick.** Generate with all boxes empty. Tick as you actually do each step. A pre-ticked checklist is theater.
- **Don't auto-run.** This command writes a plan; the user runs each step. The friction is the point.
