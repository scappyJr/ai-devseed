---
description: Bound a task before starting — timebox, definition of done, explicit out-of-scope
---

Pin down the shape of a task before any code or research begins. The goal is to surface scope ambiguity at the cheapest moment — *before* sunk-cost bias kicks in.

## When to use

- Picking up a fresh task, issue, or feature request
- Restarting after a multi-day gap (last session's "obvious next step" is no longer obvious)
- Before any commit touching more than ~3 files
- After a `/spike` finishes and you move to implementation

**Not** for: bug fixes under ~30 min (use `/timebox` directly), pure refactors with no behavioral change.

## How it works

1. If the user provided a task inline (e.g., `/scope add OAuth login`), use it. Otherwise ask: "What's the task?"
2. Gather light context — open files, `git log --oneline -5`, `docs/journal/YYYY-MM-DD.md` if it exists. Cap at ~3 file reads.
3. Draft the scope block using the template below.
4. Print the block. Ask: "Append to today's journal, or to a draft ADR?"
5. On confirmation, append to the chosen target. Don't write without confirmation — bad scope blocks are worse than no scope block.

## Template

```markdown
## 🎯 Scope — {Task in one line} ({YYYY-MM-DD HH:MM})

**Timebox**: {30m | 2h | half-day | 2 days}. Reassess at {clock time or trigger}.

**Definition of done**
- [ ] {Observable outcome — something a user or future-you can verify}
- [ ] {Observable outcome}
- [ ] {Observable outcome — keep total to 3–5}

**Out of scope** (deliberately deferred)
- {Adjacent thing that tempts inclusion} — defer because {reason}
- {Another}

**Open assumptions**
- {Assumption that, if wrong, changes the plan} → check first
```

## Rules

- **Out of scope is not optional.** Empty out-of-scope is a smell — there's almost always one adjacent improvement worth naming so it doesn't sneak in.
- **DoD must be observable.** "Refactor cleanly" is not observable. "Tests pass + no new lint warnings + public API unchanged" is.
- **Timebox first, plan second.** If you can't put a time on it, you don't understand the task yet — run `/spike` instead.
- **One scope block per task.** If scope drifts mid-task, write a new block rather than editing the old one. The drift itself is information worth preserving.
