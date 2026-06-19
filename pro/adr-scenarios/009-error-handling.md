# ADR NNN — Error Handling Pattern

> **Scenario starter.** Renumber `NNN`, set the date, and fill in Decision + Consequences. Context, Options, and the Tradeoff matrix are pre-filled — tailor as needed.

## Status
Proposed (YYYY-MM-DD)

## Context

Error-handling style propagates through every async boundary in the codebase. The pattern decides whether errors are visible in function signatures, how the UI surfaces them to users, and how observable they are at runtime. The cost of switching is high — error paths exist in every meaningful function — so the early choice mostly stays.

Typical drivers for this decision:

1. **Type-system support** — Result types are first-class in Rust and OCaml; in TypeScript they're a library convention with no compiler enforcement.
2. **Propagation cost** — throws bubble for free; Result types require explicit handling at every boundary (verbose but checked).
3. **Distinguishing expected vs unexpected** — "user not found" is expected; "DB connection lost" is not. Conflating these in a single throw mechanism makes error-class routing harder.
4. **API consumer friendliness** — public HTTP APIs benefit from structured error codes regardless of internal style; this is a separate decision from internal error handling.
5. **Async / Promise handling** — `await` propagates throws naturally; Result types in async code require unwrapping every step or using helper monads.
6. **Debuggability** — stack traces from throws are first-class; Result errors need explicit `cause` chaining to preserve context.
7. **Migration from existing pattern** — codebases already using one pattern pay a high price to switch midstream.

## Options

### A. Throws (idiomatic JS / Python / Java / Ruby)
- ✅ Free propagation through `await` / call stack
- ✅ Excellent stack traces (most languages auto-capture)
- ✅ No ceremony for unexpected errors (the common case)
- ❌ No type-level visibility — caller can't tell from signature what may throw
- ❌ Easy to forget to handle, especially across async boundaries

### B. Result types (`Result<T, E>` / `Either<L, R>` libraries)
- ✅ Errors are visible in the type signature; compiler enforces handling
- ✅ Distinguishes expected failure (return) from unexpected (throw)
- ✅ Composes well with functional pipelines
- ❌ Verbose at every boundary — `.unwrap()`, `.map()`, `.match()`
- ❌ Stack traces require explicit `cause` chaining
- ❌ In TypeScript: library convention (neverthrow, ts-results, effect-ts), not language-native

### C. Structured errors with codes (HTTP-style)
- ✅ Machine-readable; clients can route on error codes ("EMAIL_TAKEN", "RATE_LIMITED")
- ✅ Stable contract across API boundaries (frontend ↔ backend, public APIs)
- ✅ Pairs naturally with throws *or* Results — orthogonal axis
- ❌ Requires discipline to maintain the error-code catalog
- ❌ Codes can accumulate cruft (typos, "ERR_GENERIC")

### D. Hybrid: throws for unexpected + Result for expected
- ✅ Best of both — `getUserById` returns `Result<User, NotFoundError>` (expected miss); `await db.query()` throws on connection loss (unexpected)
- ✅ Type-checked where it matters; doesn't force ceremony for the truly exceptional
- ❌ Discipline required to maintain the line between "expected" and "unexpected"
- ❌ Two patterns to onboard new contributors to

### E. Tagged unions / discriminated unions (TS-specific, no library)
- ✅ Idiomatic TypeScript; no library dep
- ✅ Pattern-matches naturally with `switch`
- ✅ Same compiler-checked benefits as Result types
- ❌ No standard helpers (`map`, `flatMap`, `unwrap`) — write them or pick a library
- ❌ Ad-hoc shape across the codebase if not codified

## Tradeoffs (matrix)

| | Type-system support | Propagation cost | Debuggability (stack traces) | API consumer friendliness | Async-friendliness | Migration cost from "all throws" |
|---|---|---|---|---|---|---|
| Throws | None (TS) / Some (Java's checked) | Free | Excellent | Independent (use codes) | Natural with `await` | None (already there) |
| Result types | First-class | High (every boundary) | Manual (need `cause`) | Independent | Verbose in async | High (rewrite call sites) |
| Structured codes | Independent | Independent | Same as underlying | Best | Same | Medium (add codes, keep mechanism) |
| Hybrid throws + Result | Mixed | Medium | Good (throws) / Manual (Result) | Good | OK | Medium |
| Tagged unions (TS) | First-class | High | Manual | Independent | OK | High |

## Decision

{Chosen pattern, one sentence. For most projects this is a *layered* decision — e.g., "Throws as the default for unexpected; tagged unions for domain-modeled expected failures; structured error codes at the HTTP API boundary".}

## Reasoning

- {Driver 1 — e.g., language (TS vs Rust), team's compile-time-error appetite}
- {Driver 2 — e.g., public API surface need}
- {Driver 3 — e.g., debuggability vs verbosity preference}

## Consequences

### Positive
- {Concrete benefit — e.g., "Compiler catches unhandled `getUserById` misses; we deleted runtime 'user not found' bugs"}
-

### Negative / trade-offs
- {Cost accepted — e.g., "Every domain function has 5 lines of Result ceremony; we trade verbosity for type safety"}
-

### Future implications
- {What this rules in or out — e.g., "If we add a CLI later, the same error-code catalog applies; we don't need a parallel scheme"}
-

## Alternatives considered

- **Throws** — {reason rejected if applicable}
- **Result types (library)** — {…}
- **Structured error codes** — {…}
- **Hybrid throws + Result** — {…}
- **Tagged unions (TS-native)** — {…}

## References

- neverthrow (Result for TS): https://github.com/supermacro/neverthrow
- effect-ts (full FP error model): https://effect.website/
- ts-results: https://github.com/vultix/ts-results
- "Parse, don't validate" (Alexis King): https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/
- "Errors are values" (Go blog): https://go.dev/blog/errors-are-values
- {Project-specific — domain error catalog, public API error code reference}
