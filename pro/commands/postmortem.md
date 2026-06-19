---
description: Incident postmortem template — timeline, root cause, actions, lessons
---

Write down what broke, when, why, and what changes so it doesn't break the same way. The goal is *learning*, not assigning fault — even (especially) in a solo project where the only person to blame is past-you.

## When to use

- Production incident: data loss, outage, user-visible bug that survived to release
- A near-miss caught only because someone (or CI) checked at the last moment
- A non-incident that *felt* like an incident — repeated firefighting on the same area

**Not** for: bugs caught during normal development. A postmortem is for things that escaped the development boundary.

## How it works

1. Ask: "Short title for the incident? (1 sentence, e.g., 'OAuth callback returned 500 for new signups')"
2. Pick a slug from the title (kebab-case, ~3–5 words).
3. Create `docs/postmortems/{YYYY-MM-DD}-{slug}.md` (create folder if missing) using the template below.
4. Pre-fill timeline anchors from `git log --oneline --since={incident-date-minus-1-day}` and any session journal entries if asked. Leave most of the template empty — postmortems need to be written by the human who lived through them, not auto-generated.
5. Print the file path and prompt: "Fill in Timeline and Root cause first; the rest follows."

## Template

```markdown
# Postmortem: {Title}

**Date**: {YYYY-MM-DD incident date} · **Author**: {name} · **Status**: Draft

## Summary

{2–3 sentences. What broke, who was affected, when it was fixed. A reader should be able to skim this and understand the shape of the incident.}

## Impact

- **Users affected**: {count, scope — e.g., "all new signups", "users on iOS only"}
- **Duration**: {start time} → {end time} ({total})
- **Data loss / corruption**: {none | scope}
- **Workaround used**: {what you told users to do, if anything}

## Timeline

All times {timezone}.

| Time | Event |
|---|---|
| {HH:MM} | {What happened — symptom first, e.g., "Sentry alert fires: 500s on /auth/callback"} |
| {HH:MM} | {Who noticed, how} |
| {HH:MM} | {First hypothesis} |
| {HH:MM} | {Action taken} |
| {HH:MM} | {Outcome} |
| {HH:MM} | **Resolved**: {what fixed it} |

## Root cause

{The actual cause, not the proximate trigger. Use "5 whys" if helpful. Be specific — a path, a missing check, a contract assumption that didn't hold.}

## Contributing factors

{Things that made the incident bigger or longer than it had to be. Examples: no alert on this path, similar code elsewhere assumed to be safe, weekend deploy.}

## What went well

{Mandatory section. Even bad incidents have something — the alert fired, the rollback worked, the runbook existed. Naming these reinforces them.}

## What went wrong

{Beyond the bug itself. Detection delay, communication, debugging dead ends, missing instrumentation.}

## Action items

| # | Action | Type | Owner | When |
|---|---|---|---|---|
| 1 | {Specific change to code, monitoring, process, or docs} | {prevent / detect / mitigate / document} | {who} | {date or "next session"} |
| 2 | ... | | | |

**Prevent** > **Detect** > **Mitigate** > **Document**, in that order. Aim for at least one of each tier if applicable.

## Lessons

{1–3 sentences. Generalizable insights for future-you. Not "be more careful" — concrete things like "any callback handler from a third party needs a null check at the boundary, even if their docs say it's never null".}
```

## Rules

- **Blameless.** Even in a solo project. The framing is "what about the system let this happen" — including the system's only human. Past-you had reasons; future-you needs the lesson, not the shame.
- **Write the timeline first.** Memory degrades within hours. If the incident is still fresh, fill in timestamps before anything else.
- **Action items must be specific and assignable.** "Add more tests" is not an action item. "Add a test that asserts /auth/callback returns 200 when the provider returns a user with no email" is.
- **Status: Draft → Final.** A postmortem stays Draft until action items are at least scheduled. Final means the loop is closed.
