---
description: Set or check a timebox on current focused work; nudge to reassess at expiry
---

A small ritual to prevent the silent slide from "should be done in an hour" to "lost a day". Pairs with `/scope` for larger tasks; works standalone for smaller ones.

## When to use

- Starting a task without `/scope` (lightweight cases)
- Mid-task, when the work feels like it's growing — pause and re-anchor
- After blowing past an earlier timebox — decide: continue, abort, or replan

## How it works

The command runs in one of two modes, depending on argument shape.

### Mode A — Set a timebox

Trigger: `/timebox 90m fix login redirect bug` or `/timebox 2h refactor token cache`.

1. Parse the duration (m / h / d) and the task description.
2. Reply: "Timebox set: **{duration}** for **{task}**. Expires around **{HH:MM clock time}**."
3. Add a one-line reminder: "Run `/timebox check` when you hit a wall or at expiry — whichever comes first."

### Mode B — Reassess

Trigger: `/timebox check`, `/timebox`, or any phrasing implying "how am I doing".

Print the block below for the user to fill in (inline; this mode produces no file):

```markdown
## ⏱ Timebox check ({HH:MM})

- **Original budget**: {duration} — set at {HH:MM}
- **Elapsed**: {minutes/hours}
- **Done so far**: {1–2 lines on actual progress}
- **Still needed**: {1–2 lines on remaining work}
- **Honest estimate to finish**: {duration}

**Decision** (pick one):
- [ ] **Continue** — within original ballpark, push through
- [ ] **Extend once** — new timebox of {duration}, reassess at expiry
- [ ] **Abort** — stop now, write a journal note, pick a smaller next step
- [ ] **Replan** — task is bigger than thought, switch to `/scope` or `/spike`
```

## Rules

- **Extensions cost a check-in.** Don't silently extend. Every extension is one explicit decision point. Three extensions in a row means the task needs `/scope` or splitting.
- **Aborting is a valid outcome.** Sunk-cost is the default failure mode for solo devs without an outside observer; this command *is* the outside observer. Aborting a 2-hour task at hour 3 saves the next 5 hours.
- **No file output.** Mode A and Mode B both reply inline. Journal-worthy outcomes belong in `/daily end`, not here.
