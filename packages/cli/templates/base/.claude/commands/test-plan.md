---
description: Plan tests for a feature before writing them — what to cover, in what order
---

Decide *what* to test before opening the test file. The goal is a short, prioritized checklist that maps risk to effort, so you don't waste time on trivial cases while shipping the risky ones untested.

## When to use

- Before writing tests for a new feature
- When a bug ships to prod and you want to lock in regression coverage
- When test coverage is uneven and you're deciding where to invest

**Not** for writing the actual test code — this is the design step *before* that.

## How it works

1. If the user provided a target inline (e.g., `/test-plan login flow`, `/test-plan src/payment/`), use it. Otherwise ask: "What feature or file do you want to plan tests for?"
2. Gather context (cap at ~5 reads):
   - The target file(s) and any closely related modules
   - Existing tests for the area (find with grep on filename or function names)
   - Recent bugs touching this code: `git log --oneline --grep="fix" -- {target}`
3. Produce the plan in this format:

```markdown
## 🧪 {Target} — Test Plan

### Acceptance criteria
{1–3 bullets stating what "working" means for this feature}

### Test cases (priority order)

**P0 — must have (ship-blocking risk)**
- [ ] {case} — *why:* {risk if untested}

**P1 — should have**
- [ ] {case}

**P2 — nice to have**
- [ ] {case}

### Edge cases to consider
- {boundary condition, empty input, race, etc.}

### Out of scope
- {explicit non-goals — what this plan deliberately ignores}

### Suggested test type
- Unit / integration / e2e for each P0 case, with one-line reasoning
```

4. Print the plan and stop. Don't write the tests — the user reviews the plan first, then asks you to implement specific cases.

## Rules

- **Prioritize by risk × likelihood**, not by what's easy. The hard-to-test path is often the one that breaks in prod.
- **Each case should be one assertion's worth of intent.** "Login works" is too broad; "rejects expired session token with 401" is right-sized.
- **Cap P0 at 5 items.** If you have more, the feature is probably too big — recommend splitting it.
- **Be explicit about Out of scope.** Future-you will thank present-you for ruling out the rabbit holes.
- **Flag missing acceptance criteria.** If you can't state what "working" means in 3 bullets, that's the actual problem — stop and ask before planning tests.
