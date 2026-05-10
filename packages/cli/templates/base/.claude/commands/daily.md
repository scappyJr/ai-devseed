---
description: Help with daily start/end routine — context restoration
---

Depending on user's intent:

## 1. Day Start
If user says "start" or similar:

1. Check `CHANGELOG.md` recent entries
2. Check `docs/journal/` latest file (if exists)
3. Check `git log --oneline -5`
4. Summarize in this format:

```
## 📅 What was done yesterday
- ...

## ⏳ In progress
- ...

## 🎯 Suggestions for today (priority)
1. High: ...
2. Medium: ...
3. Low: ...

## ⚠️ Blockers / decisions needed
- ...
```

## 2. Day End
If user says "end" or "wrap up" or similar:

1. Summarize today's main changes (from conversation + git diff)
2. Add today's date entry to `CHANGELOG.md` (after user confirmation)
3. Save unfinished work to `docs/todo.md`
4. Generate daily journal at `docs/journal/{YYYY-MM-DD}.md`:

```markdown
# YYYY-MM-DD · Day N

## ✅ Completed today
- ...

## 🔄 In progress (continue tomorrow)
- ...

## 🚧 Blockers found
- ...

## 💡 Notes
- ...

## 🔗 Related
- Commits: 
- WBS items:
- Issues: 
```
