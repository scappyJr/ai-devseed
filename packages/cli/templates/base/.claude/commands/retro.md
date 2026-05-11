---
description: Generate a weekly retrospective in docs/retrospective/
---

Create a retro doc based on the past 7 days of work. Use the canonical template at `docs/retrospective/_template.md`.

## Filename

`{YYYY-MM-DD}-week-{NN}.md` where:
- `YYYY-MM-DD` is the Monday of the target week
- `NN` is the week-number-into-the-project (count from the first commit)

For sprint retros instead of weekly, use `{YYYY-MM-DD}-sprint-{N}.md`.

## Steps

1. **Gather inputs**:
   - `git log --since="7 days ago" --oneline`
   - All `docs/journal/*.md` entries from the past 7 days
   - `wbs/` checklist — planned vs done
   - Any new entries in `docs/decisions/` (ADRs) since last retro

2. **Start from `docs/retrospective/_template.md`.** Fill in each section based on real evidence from the inputs above. No aspirational fluff.

3. **Flag recurring patterns.** If a Friction item shows up 2+ weeks in a row, suggest promoting it to an ADR.

4. After writing, print a 3-line summary (period covered, top win, top friction) so the user can verify.

## Guidelines

- **Honest, not aspirational.** "Skipped journaling 4 days" beats "tried to journal".
- **Specific, not generic.** "Shipped login screen Tue, broke auth tests Thu" beats "made auth progress".
- **Max 1 page.** Long retros don't get re-read.
- The point is **next week's behavior change**, not a written record. Optimize for actionability.
