---
description: Open a research spike — bounded investigation with question, timebox, and findings skeleton
---

A spike is a *time-boxed* investigation, not a feature. The output is a written answer to a specific question, plus a recommendation. Code may or may not be written; if it is, it's throwaway.

## When to use

- Before `/scope` when the task's shape is unclear ("can we even do X?")
- When the team (you + future-you) disagrees on the approach and a small prototype would settle it
- After a `/timebox check` flagged "Replan — task is bigger than thought"

**Not** for: production code, refactors of existing working code, exploration without a question (use `/explore` for that).

## How it works

1. If the user provided a topic inline (e.g., `/spike can we use SQLite for the offline cache`), use it. Otherwise ask: "What question are you trying to answer? (one sentence)"
2. Push back if the question is too broad — a spike with the question "should we rewrite this in Rust" produces noise. Force a narrower framing: "What can SQLite do under {specific workload}?"
3. Confirm a timebox (default 2–4 hours; reject anything > 1 day — that's a project, not a spike).
4. Pick a slug: kebab-case, ~3–5 words from the question.
5. Create `docs/spikes/{YYYY-MM-DD}-{slug}.md` (create `docs/spikes/` if missing) using the template below.
6. Print the file path and stop. Investigation happens in the user's hands; this command just sets the container.

## Template

```markdown
# Spike: {Question in one sentence}

**Date**: {YYYY-MM-DD} · **Timebox**: {2h | half-day} · **Status**: Open

## Question

{The single specific question this spike is answering. If you can't write one sentence, the spike is too vague — narrow it.}

## Why this is a spike (not a task)

{1–2 lines: what's unknown that keeps us from going straight to /scope.}

## What I'll do

- {Concrete investigation step — read X, prototype Y, benchmark Z}
- {Step}
- {Step — keep total to 3–5; if more, the spike is too big}

## Stop conditions

Whichever comes first:
- Timebox expires
- The question gets a confident answer
- New information shows the question was wrong — rewrite it and stop

## Findings

{Filled in as you go. Be specific — paths, numbers, error messages, not vibes.}

-

## Recommendation

{Filled in at the end. Must be one of:}
- **Go** — proceed to `/scope`, with these constraints: {...}
- **No-go** — don't pursue, because {...}
- **Defer** — answer is "it depends on {X}"; revisit when {X} is decided
- **Pivot** — the original question was wrong; the real question is {...}

## What this spike did NOT answer

{Adjacent questions that came up but were out of scope. Useful for the next spike or the future-you who asks the same thing.}
```

## Rules

- **One question per spike.** If two questions appear, write two spikes.
- **The recommendation is mandatory.** A spike without a Go/No-go/Defer/Pivot at the end is unfinished — even "I ran out of time and have no answer" is an answer (it's Defer with reason).
- **Throw away the code.** Prototype code written during a spike does not become production code. If it should, that's a `/scope`'d task, with the spike as input.
- **The file is the deliverable.** If the spike answer never gets written down, the next time the same question comes up you'll redo the work.
