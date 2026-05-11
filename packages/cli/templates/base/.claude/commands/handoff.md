---
description: Generate or update HANDOFF.md so the next Claude Code session can pick up cold
---

Create or update `HANDOFF.md` at the project root. The goal: a future session (or future-you on another machine) can read this one file and know exactly what's in flight without backstory.

This is the same pattern AI DevSeed itself uses for its own development.

## Steps

1. **Gather state**:
   - `git status` — working tree
   - `git log --oneline -10` — recent commits
   - Active branch name
   - The most recent file in `docs/journal/` if present
   - Conversation context — what was the user just working on

2. **Write `HANDOFF.md`** at project root with these sections, using the user's preferred language per `CLAUDE.md`:

```markdown
# 🤝 Project Handoff

> Quick context for resuming this project in a new session.

---

## 🔄 Last sync: YYYY-MM-DD

### Resume in a different environment

```bash
# clone, install, checkout the working branch, start Claude
```

### What's done / What's next

**Done in last session:**
- (specific items, with file paths or commit SHAs where useful)

**Next actions (priority order):**
1. ...
2. ...
3. ...

### Gotchas

- (environment quirks, things that broke last time, manual steps that aren't yet scripted)
```

3. **If `HANDOFF.md` already exists**: update the "Last sync" date, "Done", and "Next actions". Preserve `### Gotchas` and any other custom sections unless clearly outdated.

4. **Keep it under 100 lines.** This is a pickup doc, not exhaustive documentation. Anything longer belongs in `docs/`.

5. After writing, print a 3-line summary: last-sync date, what got done, and the top next action — so the user can verify quickly.

## Tips

- **Be specific in Next actions.** "fix the auth bug" is useless. "fix the 401 race in `src/auth/login.ts:42` when token expires mid-request" is good.
- **Done is for this session only.** Don't accumulate full project history — that's what git is for.
- **Don't duplicate CLAUDE.md.** HANDOFF is dynamic state; CLAUDE.md is project constants.
