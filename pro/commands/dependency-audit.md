---
description: Identify outdated, vulnerable, and unused dependencies with concrete action items
---

Pull the three pieces of dep-health information that rot quietly between releases — what's old, what's vulnerable, what's not even used — and produce a single short report with decisions to make.

## When to use

- Pre-release (before `/release`, alongside the CHANGELOG cut)
- Quarterly hygiene pass on a long-running project
- Before adding *another* dependency — the existing ones might already solve it

**Not** for: every commit. Audits produce noise if run too often; the value is in the gap since the last one.

## How it works

1. Detect package manager(s) from project root:
   - `package.json` → npm/yarn/pnpm
   - `pyproject.toml` / `requirements.txt` → pip/poetry
   - `Gemfile` → bundler
   - `go.mod` → go modules
   - `Cargo.toml` → cargo
   - If multiple, run sections per manager.
2. Run the three checks (let the user execute; don't auto-run anything that hits the network):
   - **Outdated**: print the command for the manager — e.g., `npm outdated`, `poetry show --outdated`, `bundle outdated`, `go list -m -u all`, `cargo outdated`
   - **Vulnerabilities**: `npm audit`, `pip-audit`, `bundle audit`, `govulncheck ./...`, `cargo audit`
   - **Unused**: this one usually needs a tool not bundled with the manager. Suggest `depcheck` / `knip` for npm, `deptry` / `pip-autoremove` for Python, `bundle clean --dry-run` for Ruby. **Do not** require installation — suggest the command and ask the user to install if they want this section filled.
3. Once the user pastes the raw output back (or runs the commands and shares results), bucket findings into the report below. If output is unavailable, leave that section as a TODO with the command to run.
4. Print the report inline by default. Ask: "Save to `docs/audits/deps-{YYYY-MM-DD}.md`?" — save on confirmation.

## Output

```markdown
# Dependency audit — {YYYY-MM-DD}

**Manager**: {npm | poetry | bundler | go | cargo | mixed}
**Total dependencies**: {direct: N, transitive: M (if known)}

## 🔴 Vulnerabilities (act on these first)

| Package | Installed | Fixed in | Severity | Path | Decision |
|---|---|---|---|---|---|
| {name} | {ver} | {ver} | critical/high/med/low | direct / transitive via {pkg} | {patch | wait | accept risk because {...}} |

If empty: "No advisories matched as of {tool} run." (Not the same as "no vulnerabilities".)

## 🟡 Outdated (review)

Bucket by update type. Patch is usually safe-to-take; major needs intent.

### Major (read changelog before bumping)
- `{pkg}` {current} → {latest} — breaking-change summary: {1 line}

### Minor
- `{pkg}` {current} → {latest}

### Patch (safe-bulk)
- {N} packages — run `{manager}` upgrade command and verify CI

## ⚪ Unused (consider removing)

Each entry: confidence + how detected.

- `{pkg}` — high confidence, no `import`/`require` matches anywhere
- `{pkg}` — medium, only matched in dead code at `path/...:N`
- `{pkg}` — low, matched dynamically; verify manually

If section unavailable: "Run `{tool}` to populate. Not run because tool not installed."

## Action items

| # | Action | Effort | When |
|---|---|---|---|
| 1 | Bump `{pkg}` to patch latest (safe-bulk) | 5m | this week |
| 2 | Read changelog for `{pkg}` major, decide bump | 30m | this sprint |
| 3 | Remove `{pkg}` (unused) | 10m | next refactor |
| 4 | Accept-risk note for `{pkg}` low-sev advisory | 5m | now (add to this doc) |

## Notes

{Anything that doesn't fit a row: license changes, deprecation announcements, "ecosystem moving from X to Y".}
```

## Rules

- **Don't auto-run network commands.** Audits hit registries. The user runs them; this command structures the answer.
- **Unused-deps detection is fuzzy.** Always include a confidence level. A false-positive removal is more painful than a missed dead dep.
- **Every advisory needs a decision.** Don't leave a vulnerability listed without one of {patch / wait / accept-risk with reason}. The audit document is the record.
- **Date the report.** Dependency state changes daily. `docs/audits/deps-2026-06-19.md` is meaningful; `docs/audits/deps.md` is not.
