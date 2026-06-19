---
description: Stage a refactor — current state, target state, and the safe intermediate steps that connect them
---

Big refactors fail in the middle. The cure is to never be in the middle — every intermediate state should be deployable, testable, and safe to abandon. This command writes that plan down so the refactor can be paused and resumed without losing the thread.

## When to use

- Renaming or restructuring more than one file at a time
- Replacing a library, framework piece, or pattern across the codebase
- Splitting one module into many (or merging many into one)
- Anything where the diff would be hard to review in one PR

**Not** for: in-place cleanups under ~50 lines, single-file rewrites, performance fixes that don't change interfaces.

## How it works

1. Ask: "What are you refactoring? (one sentence — what's the current shape and what's the target shape?)"
2. Ask follow-ups *only if* the answers aren't obvious from the codebase:
   - "What's wrong with the current shape?" (motivation)
   - "Is the target shape known, or do we need a `/spike` first?" (if unknown — stop and run `/spike`)
3. Pick a slug from the description.
4. Create `docs/refactors/{YYYY-MM-DD}-{slug}.md` (create folder if missing) using the template below.
5. Pre-scan the codebase: grep for the affected pattern, count call sites, identify boundaries. Pre-fill the Scope section with concrete numbers.
6. Print the file path and prompt: "Fill in the Stages section — that's where the value is. Everything else is supporting context."

## Template

```markdown
# Refactor: {Title}

**Date drafted**: {YYYY-MM-DD} · **Status**: Draft

## Motivation

{Why the current shape hurts. Be concrete — "X is duplicated in 12 places", "every new feature requires touching 4 files", "the type hierarchy doesn't model the domain". Avoid "code smell" without evidence.}

## Current state

{What exists today, in 3–8 lines.}

- Key files: `path/...`, `path/...`
- Call sites: {count, identified by `grep -rn "pattern"`}
- Hidden coupling: {non-obvious dependencies — env vars, shared state, build order}

## Target state

{What the code should look like after, in 3–8 lines.}

- Shape: {one paragraph or a tree sketch}
- Public interface: {what callers see — must be drop-in compatible unless explicitly breaking}
- What it un-couples: {previous coupling that the new shape removes}

## Why the target is correct

{1–2 sentences. The simplest defense against "we refactored from one bad shape to a different bad shape" is articulating *why this shape* and not the next one.}

## Out of scope

- {Adjacent improvement deliberately deferred — name it so it doesn't sneak in}
- {Performance work, type system tightening, etc. — only include if it would change the staging plan}

## Stages

Each stage must be: (a) independently mergeable, (b) reverts cleanly, (c) leaves the codebase in a working state. If a stage doesn't satisfy these, split it.

### Stage 1: {Name — e.g., "Introduce the new interface alongside the old"}

- **Diff shape**: {add new module/file, no callers yet | wrap existing function | add type without changing runtime}
- **Risk**: {low/medium/high — why}
- **Verification**: {tests pass | smoke test {flow} | no behavior change observable}
- **Revert**: {one-line — what removing this PR looks like}

### Stage 2: {Name — e.g., "Migrate call sites in batch A (utility code)"}

- **Diff shape**: {batch of N call-site rewrites; behavior unchanged}
- **Risk**:
- **Verification**:
- **Revert**:

### Stage 3: {Name — e.g., "Migrate call sites in batch B (user-facing flows)"}

(add more stages as needed — aim for 3–6; fewer means stages are too big, more means the refactor is too big)

### Final stage: {Name — e.g., "Remove the old interface"}

- **Diff shape**: deletion only
- **Risk**: low (all callers migrated; CI passes)
- **Verification**: dead-code scan shows no references to old names
- **Revert**: revert previous merge; old code reappears

## Abandonment plan

If this refactor needs to be paused mid-flight:

- **Acceptable stopping points**: end of any stage above
- **Unacceptable stopping points**: mid-stage (don't merge half a stage; finish or revert)
- **If paused for > 2 weeks**: re-read this doc, decide: resume / abandon / replan. Refactors that pause indefinitely become tech debt of a worse kind — half-done.

## Open questions

- {Question whose answer changes the staging plan — answer before starting Stage 2 or beyond}
```

## Rules

- **Every stage must be revertable on its own.** A stage that can't be reverted without reverting subsequent ones isn't a stage; it's a step in the middle. Re-split.
- **No "and then the rest is mechanical".** Mechanical work is where bugs hide. Each batch of mechanical changes is its own stage, with its own verification.
- **The plan is not the refactor.** Writing this file doesn't change the codebase. Stages do. Stay in plan-mode only as long as it's adding clarity.
- **Stop and re-plan if Stage N invalidates Stage N+1.** New information is the rule, not the exception. The cost of editing this file is low; the cost of executing an obsolete plan is high.
