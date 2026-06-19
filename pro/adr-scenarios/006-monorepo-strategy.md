# ADR NNN — Monorepo Strategy

> **Scenario starter.** Renumber `NNN`, set the date, and fill in Decision + Consequences. Context, Options, and the Tradeoff matrix are pre-filled — tailor as needed.

## Status
Proposed (YYYY-MM-DD)

## Context

A monorepo decision affects build orchestration, CI duration, dependency hoisting behavior, and how shared code between packages flows. The cost of switching grows with package count and CI complexity — the early choice mostly sticks.

Typical drivers for this decision:

1. **How many packages, really?** — 1 package + 1 published lib is not a monorepo; 4+ apps sharing 6+ libs is. Match the tool to the actual shape, not the imagined future shape.
2. **Build orchestration and caching** — Turborepo and Nx cache task outputs so unchanged packages skip work. Saves CI minutes; matters more as the repo grows.
3. **Polyglot needs** — Nx supports JS, Python, Go, Rust, .NET. Turborepo is JS-first (everything else works but feels grafted on).
4. **CI integration** — selective builds (changed packages only) require dependency graph awareness. All major orchestrators offer this; the question is setup complexity.
5. **Learning curve** — Turborepo is 1 day; Nx is a week to be fluent; raw workspaces are an afternoon but plateau quickly.
6. **Migration cost** — going from polyrepo to monorepo is a discrete event (combine repos, rewrite CI); going from monorepo to polyrepo is a slow split.

## Options

### A. Turborepo
- ✅ Minimal config (`turbo.json`), great defaults, excellent caching (local + Vercel Remote Cache)
- ✅ JS-first ergonomics; works with npm/pnpm/yarn workspaces underneath
- ❌ JS-centric — running Python/Go tasks works but is plain shell-out
- ❌ Plugin ecosystem smaller than Nx

### B. Nx
- ✅ Most feature-complete: project graph, code generators, dep-graph visualizer, polyglot support
- ✅ Excellent for large teams or multi-language repos
- ❌ Heavier learning curve; configuration sprawl across `project.json` files
- ❌ Easy to over-invest in Nx-specific patterns that lock you in

### C. pnpm / npm / yarn workspaces (no orchestrator)
- ✅ Zero new tooling — uses the package manager you already have
- ✅ Sufficient for 2–5 packages with simple build dependencies
- ❌ No build caching; CI re-runs everything
- ❌ Task dependencies between packages must be expressed in scripts manually

### D. Lerna
- ✅ Once standard, has tagged-release and version-bump tooling
- ❌ Largely superseded by Turborepo/Nx; some features now under Nx maintenance
- ❌ Avoid for new projects unless you're entering an existing Lerna repo

### E. Polyrepo (no monorepo)
- ✅ Simplest mental model: one repo per deployable; standard CI per repo
- ✅ Independent versioning, no cross-package coupling
- ❌ Shared code requires publishing internal packages (npm registry or git refs)
- ❌ Cross-package refactors span multiple PRs across multiple repos

### F. Moon, Rush, Bazel (specialized)
- ✅ Bazel: rigorous reproducibility, polyglot, used at scale (Google, Uber)
- ✅ Moon: newer, ergonomic alternative to Nx with polyglot focus
- ❌ Bazel's learning curve is steep; rarely justified outside very large teams
- ❌ Smaller communities than Nx/Turborepo

## Tradeoffs (matrix)

| | Build orchestration / caching | Learning curve | Polyglot support | CI selective builds | Tooling maturity | Migration cost away |
|---|---|---|---|---|---|---|
| Turborepo | Excellent (local + remote) | Low | JS-first | Yes | High | Low (mostly removing turbo.json) |
| Nx | Excellent | High | Excellent | Yes | Highest | Medium (Nx-specific configs) |
| Workspaces only | None | Lowest | Manual | Manual | Native to PM | None |
| Lerna | Limited | Medium | JS | Limited | Declining | Medium |
| Polyrepo | N/A | Lowest | N/A (per repo) | Per-repo CI | High (standard) | High (need to combine) |
| Moon / Rush / Bazel | Excellent | High (Bazel highest) | Excellent | Yes | Varies | High (tool-specific) |

## Decision

{Chosen approach in one sentence. If hybrid (e.g., "Turborepo + pnpm workspaces"), state both.}

## Reasoning

- {Driver 1 — e.g., team size, polyglot need, CI minute budget}
- {Driver 2 — e.g., existing ecosystem familiarity}
- {Driver 3}

## Consequences

### Positive
- {Concrete benefit — e.g., "CI dropped from 12min to 4min after Turborepo cache hits"}
-

### Negative / trade-offs
- {Cost accepted — e.g., "Cache-key debugging adds a class of CI flakes we didn't have before"}
-

### Future implications
- {Lock-in or escape route — e.g., "Migrating away from Turborepo means writing CI orchestration ourselves; ~1 week of work"}
-

## Alternatives considered

- **Turborepo** — {reason rejected if applicable}
- **Nx** — {…}
- **Workspaces only** — {…}
- **Lerna** — {…}
- **Polyrepo** — {…}
- **Moon / Rush / Bazel** — {…}

## References

- Turborepo: https://turbo.build/repo
- Nx: https://nx.dev/
- pnpm workspaces: https://pnpm.io/workspaces
- Moon: https://moonrepo.dev/
- Bazel: https://bazel.build/
- "Monorepos: Please don't!" (Matt Klein): https://medium.com/@mattklein123/monorepos-please-dont-e9a279be011b
- {Project-specific — package inventory, CI duration metrics}
