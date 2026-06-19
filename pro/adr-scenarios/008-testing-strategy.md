# ADR NNN — Testing Strategy

> **Scenario starter.** Renumber `NNN`, set the date, and fill in Decision + Consequences. Context, Options, and the Tradeoff matrix are pre-filled — tailor as needed.

## Status
Proposed (YYYY-MM-DD)

## Context

Testing strategy is a ratio decision, not a tool decision. The tools (Jest, Vitest, Playwright, Cypress) are interchangeable inside a strategy; the strategy decides what ratio of unit / integration / E2E tests to write, and what "tested" means for a PR to merge. The cost of changing direction is mostly the cost of writing or removing tests retroactively — moderate, not catastrophic, but real.

Typical drivers for this decision:

1. **Confidence vs maintenance ratio** — E2E tests catch the most user-visible bugs but cost the most to maintain (slow, flaky, brittle to UI changes). Unit tests are fast and stable but catch fewer real bugs.
2. **Speed of feedback** — unit tests in 5s vs E2E in 5min. Affects how often tests get run during development (and whether they get skipped on commits).
3. **Refactor friction** — heavy unit-test coverage tied to implementation details means refactors are slow. Tests at API boundaries survive refactors.
4. **What kind of bugs are common?** — UX regressions, data corruption, performance? Different test types catch different bugs.
5. **Team size + experience** — TDD culture takes shared discipline; solo or new contributors often benefit from a baseline of "smoke tests pass" first.
6. **Time budget for writing tests** — solo projects with no test-time budget end up with no tests; honest planning beats aspirational "we'll TDD".

## Options

### A. Testing Pyramid (unit-heavy)
- ✅ Fast feedback; tests run in seconds; CI is cheap
- ✅ Long-lived test suites; rarely need rewriting on refactors *if* tests target behavior, not implementation
- ❌ Many real bugs (integration, UI, browser quirks) escape unit tests
- ❌ Easy to get high coverage on the wrong things and feel safer than you are

### B. Testing Trophy (integration-heavy; Kent C. Dodds)
- ✅ Integration tests at component or API boundaries catch the bugs users actually see
- ✅ Survive refactors better than fine-grained unit tests
- ❌ Slower than pure unit tests; harder to write than they look
- ❌ "Integration" definition drifts in practice; teams disagree on where the boundary is

### C. E2E-heavy (Playwright / Cypress as the safety net)
- ✅ Catches the highest-confidence bugs (real browser, real flows)
- ✅ Doubles as living documentation of user journeys
- ❌ Slow (minutes per run); flaky (network, timing, browser quirks)
- ❌ Brittle to UI changes; selectors break on copy edits
- ❌ Expensive to maintain at high count

### D. Manual + smoke + types (minimal automated)
- ✅ Lowest upfront cost; appropriate for prototypes and pre-PMF projects
- ✅ TypeScript + lint + a 3-test smoke suite catches a surprising amount
- ❌ Doesn't scale; bugs that "we tested manually" creep back
- ❌ Refactor confidence is low

### E. TDD baseline (process choice, layered on any of A–C)
- ✅ Forces small, testable units; tends to produce cleaner APIs
- ✅ Strong confidence per change; tests-as-spec
- ❌ Slow start; team must share the discipline or it degrades
- ❌ Not all code is suited (UI, integration glue, exploratory code) — strict TDD here causes friction

### F. Property / fuzz testing (complement to any of A–E)
- ✅ Catches edge cases hand-written tests miss (hypothesis-style)
- ✅ Especially good for parsers, serializers, math-heavy code
- ❌ Higher learning curve; not all code shapes are amenable
- ❌ Slow to converge for full app-level testing

## Tradeoffs (matrix)

| | Speed of feedback | Maintenance cost | Confidence on UX bugs | Refactor friction | Onboarding cost | Best for |
|---|---|---|---|---|---|---|
| Pyramid (unit-heavy) | Fast | Low–Medium | Low | Low if behavioral, High if implementation-coupled | Low | Pure logic, libraries, utilities |
| Trophy (integration-heavy) | Medium | Medium | Medium–High | Low | Medium | Apps with rich UI + API boundary |
| E2E-heavy | Slow | High | High | High (selectors break) | Medium | Critical user flows; legacy systems |
| Manual + smoke + types | Fastest | Lowest | Variable (depends on dev) | Lowest | Lowest | Prototypes, solo MVPs, internal tools |
| TDD baseline | Same as chosen layer | Same | Same | Same | High (discipline) | Stable logic-heavy code |
| Property / fuzz | Medium | Medium | Catches edge cases | Low | High | Parsers, math, serializers |

## Decision

{Chosen strategy, one sentence — typically a mix, e.g., "Testing Trophy as primary + 3–5 critical E2E flows in Playwright + types & lint as the baseline floor". Be explicit about the ratio target ("70% integration, 20% unit, 10% E2E") or principle ("E2E only for revenue-touching flows").}

## Reasoning

- {Driver 1 — e.g., bug class observed in past project (UX regression, data corruption)}
- {Driver 2 — e.g., team size and shared discipline available}
- {Driver 3 — e.g., refactor frequency expected}

## Consequences

### Positive
- {Concrete benefit — e.g., "PR reviews focus on logic, not 'did you write tests' — the integration suite enforces a baseline"}
-

### Negative / trade-offs
- {Cost accepted — e.g., "Integration tests take 90s; we accept slower CI for higher confidence"}
-

### Future implications
- {What this rules out — e.g., "Strict TDD is off the table for the UI layer; we accept that the UI is verified by E2E and manual"}
-

## Alternatives considered

- **Pyramid (unit-heavy)** — {reason rejected if applicable}
- **Trophy (integration-heavy)** — {…}
- **E2E-heavy** — {…}
- **Manual + smoke + types** — {…}
- **TDD baseline** — {…}
- **Property / fuzz** — {…}

## References

- "Write tests. Not too many. Mostly integration." (Kent C. Dodds Testing Trophy): https://kentcdodds.com/blog/write-tests
- Martin Fowler — Test Pyramid: https://martinfowler.com/articles/practical-test-pyramid.html
- Vitest: https://vitest.dev/
- Playwright: https://playwright.dev/
- Cypress: https://www.cypress.io/
- fast-check (property testing for JS): https://github.com/dubzzz/fast-check
- {Project-specific — past incident postmortems, bug-class analysis}
