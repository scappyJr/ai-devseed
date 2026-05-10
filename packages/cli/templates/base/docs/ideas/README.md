# 💡 Idea Management Guide

How to manage new ideas without losing them or getting overwhelmed.

---

## 🎯 Core Principle

> **"Capture easily, organize regularly, execute carefully"**

1. **Capture in 30 seconds** when an idea strikes
2. **Sort later** (don't classify on the spot)
3. **Process weekly** (10 min on Sundays)
4. **Don't execute immediately** (let ideas mature)

---

## 📋 4 Idea Types

### 🔥 Quick Improvement
- 1 hour or less
- Clear and immediate
- → **GitHub Issue** with `type/enhancement` label

### 🌱 Next Version Feature
- One screen / one feature
- Days to a week of work
- → **GitHub Issue** with `type/feature` + phase label

### 🌳 Big Vision
- Changes app identity / business model
- Needs to mature for weeks
- → **`docs/ideas/big/{name}.md`** (own file)

### 💭 Fleeting Thought
- Raw, unprocessed
- 5-second idea
- → **`docs/ideas/inbox.md`** (one liner)

---

## 🔄 Flow

```
[Idea strikes]
       ↓
   ┌───┴───┐
   ↓       ↓
Clear?     Vague?
   ↓       ↓
GitHub     inbox.md
 Issue     (one liner)
   ↓
[Work]      [Weekly review]
              ↓
         Categorize
         ↙  ↓  ↘
      Issue  big/  Discard
              ↓
         [Monthly review]
              ↓
         Mature → ADR
```

---

## 📂 File Usage

### `inbox.md`
**Lightest weight. Like a journal.**

```markdown
- 2026-05-01: Color-coded mask recommendation by air quality
- 2026-05-02: Music recommendation integration during commute
- 2026-05-05: Send yesterday's outfit photo with morning alert
```

### `big/{name}.md`
**One big idea = one file. Only worth-pondering ideas.**

Use [`big/_template.md`](big/_template.md) to start.

---

## 🗓 Review Routine

### Weekly (Sunday, 10 min)
- Process `inbox.md`
- Sort fleeting ideas → Issue / big / discard
- Move sorted to "Sorted" section

### Monthly (last day of month, 30 min)
- Re-read `big/` folder ideas
- Update statuses (🌱 → 🌿 → 🌳)
- Promote mature ones to ADR
- Discard stale ones (1+ year unchanged)

### End of phase
- Review entire backlog
- Pick top items for next phase
- Adjust priorities

---

## ⚠️ Common Mistakes

| Mistake | Result | Fix |
|---------|--------|-----|
| Implement immediately | Disrupts current work | Just write to inbox |
| Try to write detailed notes | Stop writing them | One liners only |
| Everything → Issue | 200+ issues, useless | Inbox first, promote selectively |
| No weekly review | Inbox chaos | 10 min every Sunday |
| Idea → ADR immediately | Not validated | Let it sit in `big/` first |
| Save every idea | App identity drift | Discard out-of-scope ones |

---

## 💎 Good Idea vs Bad Idea

### Good idea signs
- Better solves your core value prop
- Explainable in one sentence
- Concrete user benefit
- Measurable outcome

### Bad idea signs
- "Just nice to have"
- Unrelated to core value
- Other apps do it better
- "Sounds fun"

Bad ideas can still go to inbox. Writing them out helps clarify thinking.

---

## 🤖 Using Claude

### Discuss new ideas
```
"I had this idea: [description]
- How does it connect to our core value?
- What value does it give users?
- What concerns do you see?
- How have similar apps approached this?"
```

### Sort the inbox
```
"Help me sort docs/ideas/inbox.md.
For each idea, suggest:
1. Issue / big/ / discard
2. Why
3. If Issue, recommend labels"
```

### Develop a big idea
```
"Look at docs/ideas/big/{name}.md and:
1. Strengths/weaknesses
2. Additional concerns
3. Suggested next step"
```
