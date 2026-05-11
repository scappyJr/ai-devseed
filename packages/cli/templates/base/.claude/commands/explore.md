---
description: Map an unfamiliar area of the codebase before working on it
---

Build a quick mental map of a topic, feature, or folder so the next session (or future-you) can start work without spelunking from scratch. Think of this as a "before-you-edit" scan, not exhaustive documentation.

## When to use

- Starting work on an area you haven't touched in a while
- Picking up a bug report and wanting context before patching
- Onboarding a new contributor (you can share the output)

**Not** for post-change review — use `/review` for that.

## How it works

1. If the user provided a target inline (e.g., `/explore auth`, `/explore src/api/`), use it.
2. Otherwise ask: "What area do you want explored? (a folder, feature name, file, or topic)".
3. Run focused searches against the target — do **not** read the whole repo. Cap at ~5 file reads:
   - `git log --oneline -10 -- {target}` to see recent activity
   - Grep for the topic in code + docs
   - Read 2–3 most-relevant files (entry points, public interfaces)
   - Check `docs/decisions/` for related ADRs
4. Produce the map in this format:

```markdown
## 🗺 {Target} — Map

### Entry points
- `path/to/file.ts:42` — {what it does in one line}

### Key files (read these first)
- `path/...` — {role}

### Data flow
{1–3 lines: input → transformation → output}

### Related decisions
- ADR-NNN: {title} ({why it matters here})

### Recent changes (last 10 commits)
- {sha} {short message}

### Open questions
- {anything ambiguous you noticed but didn't resolve}
```

5. Print the map and stop. Don't propose edits or fixes — exploration is a read-only step.

## Rules

- **Stay scoped.** If the target is "auth", don't drift into unrelated database code.
- **Cite paths with line numbers** so the user can click through.
- **Flag, don't fix.** If you spot a bug while exploring, add it under Open questions, not a code change.
- **Max 1 screen of output.** Detail belongs in the linked files, not the map.
