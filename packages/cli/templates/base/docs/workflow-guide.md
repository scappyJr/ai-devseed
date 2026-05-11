# 🛠 Workflow Guide

How to manage your project so information doesn't get scattered.

---

## 📌 Core Principle

> **Single Source of Truth (SSOT)**
> Each piece of information lives in exactly one place.

| Info Type | Location | Don't write elsewhere |
|-----------|----------|-----------------------|
| Code | Git | ❌ Backup folders |
| Progress | `wbs/` | ❌ README too |
| Decisions | `docs/decisions/` (ADR) | ❌ Long code comments |
| Daily logs | `docs/journal/YYYY-MM-DD.md` | ❌ Notes app |
| Tasks/Issues | GitHub Issues | ❌ Notion/Jira |
| Change log | `CHANGELOG.md` | ❌ Commit messages only |
| Context | `CLAUDE.md` | ❌ Multiple places |

---

## 🌊 Information Flow

```
[Idea/Discussion]
       ↓
   ┌───┴───┐
   ↓       ↓
Clear?     Vague?
   ↓       ↓
ADR/Issue  inbox.md
            (one liner)
   ↓
[Work/Implementation]   [Weekend Review]
                         ↓
                     Categorize
                     ↙  ↓  ↘
                  Issue  big/  Discard
```

---

## 🔄 Daily Routine

### Morning (5 min)
1. `git pull` (sync with yesterday's work)
2. Open Claude Code → `/daily start`
3. Pick today's WBS items, mark "in progress"

### During work
1. **Small units** - one feature/file at a time
2. Cycle: Design → Agree → Code → Test → Commit
3. Stuck? Capture as Issue, work around

### Evening (10 min)
1. `/daily end` to generate journal
2. Update WBS (mark completed items)
3. `git add . && git commit && git push`
4. Capture blockers as Issues

### Weekend (30 min)
1. Review WBS progress (planned vs actual)
2. Process `docs/ideas/inbox.md` (captured via `/idea` during the week)
3. `/retro` to generate a weekly retro in `docs/retrospective/`
4. Plan top 3 priorities for next week

---

## 🌳 Git Strategy

### Branch Structure
```
main          ← stable, deployable
  ↑
develop       ← integration
  ↑
feature/*     ← work units
fix/*         ← bug fixes
```

### Branch Naming
| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/{description}` | `feature/login-screen` |
| Bug fix | `fix/{description}` | `fix/api-timeout` |
| Docs | `docs/{description}` | `docs/update-readme` |
| Refactor | `refactor/{description}` | `refactor/utils` |

### Conventional Commits

Format:
```
<type>(<scope>): <subject>

<body - optional>

<footer - optional>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(auth): add password reset flow

- Email-based reset link
- 24h token expiration
- Rate limiting on requests

WBS: #2.3
Closes #45
```

### Commit Frequency
**Small and often.** Multiple commits per day is fine.

Good commit units:
- New component skeleton
- One function + its tests
- Style polish
- Single bug fix

---

## 📅 Daily Journal

Quick template (5-10 min to write):

```markdown
# YYYY-MM-DD (Day) · Day N

## 🎯 Today's goals
- [x] Done task
- [ ] Pending task

## 💻 Work log
- HH:MM - What I did

## 🚧 Blockers / decisions needed
- ...

## 💡 Notes
- ...

## 🔗 References
- Commits: 
- WBS items:
- Issues: 
```

Tips:
- Don't write in too much detail (5-10 min max)
- Use Claude's `/daily end` to auto-generate
- Always note blockers (future-you will thank you)

---

## 🎯 GitHub Issues

### When to file an issue
- Reproducible bug found
- Feature suggestion (not doing now)
- Decisions needing discussion
- External blockers

### When NOT to file
- Already in WBS (duplicate)
- 5-min fixes (just fix)
- Pure memos (use journal)

### Label System
```
priority/high|medium|low
type/bug|feature|enhancement|docs|refactor|question
status/in-progress|blocked|needs-review
phase/0-setup|1-mvp|2-personalization|...
effort/small|medium|large
```

### Linking commits to issues
```
fix: resolve home screen refresh bug

Closes #12
```

---

## 🤖 Working with Claude Code

### Effective requests

**❌ Bad**: "Make the home screen"

**✅ Good**: "Implement HomeScreen.tsx based on `wireframes/v1/home.svg`. Use design tokens from `constants/theme.ts`. Empty cards for now to establish layout."

### Phased approach
```
Design → Agree → Code → Test → Commit
```
Pause at each step to verify. Don't make everything at once.

### When stuck
Share full context:
- Full error message
- Related code
- What you tried

```
This error occurs:
[full error]

In HomeScreen.tsx:
[code]

Tried:
- npm install reset
- Cache clear
- Simulator restart
```

### Context management
- Long conversations → start new ones (Claude forgets early parts)
- New conversation: CLAUDE.md auto-loads
- Reference files explicitly: `src/screens/HomeScreen.tsx`

---

## 📝 Documentation Principles

### What to document
✅ Decisions (why we chose this) → ADR
✅ Structure (architecture) → architecture.md
✅ External dependencies → api-spec.md
✅ Types/models → data-model.md

### What NOT to document
❌ Things obvious from code (use better names)
❌ Frequently-changing details (code is truth)
❌ Detailed how-to (brief in README/comments)

### Update triggers
| Change | Update |
|--------|--------|
| New screen | `architecture.md` |
| New decision | `docs/decisions/NNN.md` |
| API change | `api-spec.md` |
| New data type | `data-model.md` |
| New version | `CHANGELOG.md` |

---

## 💎 The Secret

**"When new info appears, decide where it lives BEFORE writing."**

Don't improvise locations. New info? Pause:
1. Which existing category?
2. If none fits, update this guide first
3. Then write

This prevents the "where is that note?" problem 6 months later.
