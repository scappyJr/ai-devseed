---
description: Document a major decision as ADR (Architecture Decision Record)
---

Create a new ADR in `docs/decisions/` folder.

## Naming Convention
`{NNN}-{slug}.md` (3-digit number + kebab-case)

Number = highest existing + 1. If first one, use `001`.

## Template

```markdown
# {NNN} - {Title}

## Status
{Proposed | Accepted | Deprecated | Superseded} ({YYYY-MM-DD})

## Context
Why is this decision needed? What problem does it solve?
Background information, constraints.

## Decision
What did we decide to do? Be specific.

## Reasoning
Why this choice? Advantages over alternatives.

## Consequences
What are the impacts of this decision?
- Positive impacts
- Negative impacts / trade-offs
- Future implications

## Alternatives
Options considered but not chosen, and why.

## References
Related docs, issues, discussions.
```

## Writing Guidelines
- Make it understandable to future-you (or new contributors)
- State decision clearly, reasoning objectively
- Be honest about trade-offs
- Write in your preferred language consistently
