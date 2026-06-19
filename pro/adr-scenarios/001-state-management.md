# ADR NNN — State Management Library

> **Scenario starter.** When you adopt this ADR, renumber `NNN` (highest existing + 1), set the date, and fill in the Decision and Consequences sections. Context, Options, and the Tradeoff matrix are pre-filled with the typical considerations — tailor them to your case rather than copying verbatim.

## Status
Proposed (YYYY-MM-DD)

## Context

State in a frontend app falls into roughly three categories: **local UI state** (component-scoped), **shared client state** (cross-component, derived from user actions), and **server state** (cached remote data). A library that conflates these causes pain; using different libraries for each is normal and often correct.

Typical drivers for this decision:

1. **Boilerplate per feature** — every new screen multiplies the cost of a verbose state layer. Solo devs feel this fastest.
2. **Server vs client state separation** — a library that handles server data poorly forces the app to invent its own cache and invalidation logic, which always grows bugs.
3. **DevTools and debuggability** — time-travel debugging and inspector tools disproportionately help solo devs who don't have a teammate to pair-debug with.
4. **Bundle size** — affects time-to-interactive on mobile networks. Matters more for consumer apps than internal tools.
5. **Migration cost away** — state is woven through every component; switching libraries later is expensive. Pick once.
6. **Concurrent rendering compatibility** (React-specific) — older libraries may interact poorly with Suspense, transitions, and React 18+ features.

## Options

### A. Redux Toolkit (RTK + RTK Query)
- ✅ Mature ecosystem, broadly known, excellent DevTools, RTK Query handles server state in-house
- ❌ Highest boilerplate of the popular options even after RTK's reductions
- ❌ Largest bundle (~12kb gz with RTK Query)
- ❌ Learning curve includes the Redux mental model (reducers, slices, middleware)

### B. Zustand
- ✅ Minimal API (`create(set => ({}))`), tiny bundle (~3kb), no provider boilerplate
- ✅ Excellent TypeScript inference
- ❌ Server state is your problem — pair with React Query / SWR
- ❌ DevTools require explicit setup; less polished than Redux's

### C. Jotai
- ✅ Atomic model — fine-grained reactivity, plays well with Suspense
- ✅ Tiny bundle, excellent TS support
- ❌ Atom-everywhere can fragment app state; harder to `grep` for who changes what
- ❌ Smaller community than Redux/Zustand; fewer Stack Overflow answers

### D. Context + useReducer (no library)
- ✅ Zero dependencies, in-the-box with React, predictable
- ❌ Re-render performance footguns on large component trees
- ❌ Server state requires hand-rolled cache and invalidation
- ❌ No DevTools beyond browser print statements

### E. React Query / TanStack Query (server state only)
- ✅ Best-in-class server-state caching, retries, optimistic updates
- ✅ Drop-in next to any client-state choice above
- ❌ Not a general state manager — pair with A–D for client state

## Tradeoffs (matrix)

| | Boilerplate | Bundle | Server-state | DevTools | TS ergonomics | Migration cost away |
|---|---|---|---|---|---|---|
| Redux Toolkit | High | ~12kb | Built-in (RTK Query) | Excellent | Good | High (woven in) |
| Zustand | Low | ~3kb | None (pair) | Manual setup | Excellent | Medium |
| Jotai | Low | ~3kb | Limited | OK | Excellent | Medium-High (atomic refactor) |
| Context + useReducer | Medium | 0 | None | None | Manual | Low |
| React Query (+ X) | Low (server only) | ~12kb | Best-in-class | Excellent | Excellent | Low (isolated to data fetching) |

## Decision

{Chosen option(s) in one sentence. Multiple libraries are valid — e.g., "Zustand for client state + React Query for server state". State explicitly which categories of state each library owns.}

## Reasoning

- {The driver that mattered most for this project — e.g., bundle budget, team size, ecosystem familiarity}
- {Driver 2}
- {Driver 3}

## Consequences

### Positive
- {Concrete benefit — e.g., "Adding a new feature requires only one Zustand slice + React Query hooks"}
-

### Negative / trade-offs
- {Cost accepted — e.g., "Two libraries means two mental models for new contributors"}
-

### Future implications
- {What this locks in or rules out for the next 12 months}
-

## Alternatives considered

- **Redux Toolkit** — {reason rejected if applicable}
- **Zustand** — {…}
- **Jotai** — {…}
- **Context + useReducer** — {…}
- **React Query alone** — {…}

## References

- Redux Toolkit: https://redux-toolkit.js.org/
- Zustand: https://github.com/pmndrs/zustand
- Jotai: https://jotai.org/
- TanStack Query: https://tanstack.com/query/
- {Project-specific link — bundle report, perf benchmark, internal RFC}
