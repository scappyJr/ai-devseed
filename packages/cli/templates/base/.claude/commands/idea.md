---
description: Capture a one-line idea to docs/ideas/inbox.md (30 seconds, no pressure)
---

Quick capture for fleeting ideas. The goal is **zero friction** — don't sort, don't elaborate, just write it down.

## How it works

1. If the user provided the idea inline (e.g., `/idea color-coded mask by air quality`), use that text directly.
2. Otherwise ask: "What's the idea? (one line is fine)" and use the reply.
3. Append to `docs/ideas/inbox.md` under the `## 📥 Unsorted` section in this exact format:

```
- YYYY-MM-DD: {idea text}
```

Use today's date in local time. If the section only contains `(empty)`, replace that line; otherwise append at the end of the list.

## Rules

- **Capture as-is.** Don't rewrite, polish, or improve the idea text.
- **No follow-up questions** like "what's the use case?" — that defeats the purpose.
- Multiple ideas in one invocation: split by newline or `;` and add each as its own line.
- If `docs/ideas/inbox.md` doesn't exist, create it from the standard structure first (`# 💭 Idea Inbox` heading + `## 📥 Unsorted` section).

## After capture

Print one short line: `✅ Captured: {idea}` — then stop. Don't suggest next steps; weekly review handles sorting (see `docs/ideas/README.md`).
