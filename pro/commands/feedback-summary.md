---
description: Aggregate user feedback (GitHub Issues + Discussions + journal mentions) into themes and priorities
---

Pull scattered feedback into one screen so patterns become visible. Three Issues saying "X is confusing" is a different signal than three Issues saying three different things — but you can only see that if they're in one place.

## When to use

- Monthly hygiene pass on a public project
- Before planning the next minor release
- After a launch push (Reddit/HN/Product Hunt) — the influx is most useful when summarized, not consumed one-by-one

**Not** for: every Issue triage (Issues should be handled individually); zero-feedback projects (no value yet).

## How it works

1. Detect available sources:
   - GitHub Issues: `gh issue list --state all --limit 200 --json number,title,labels,state,createdAt,body` if `gh` is authenticated; otherwise note "GitHub CLI not available — Issues skipped"
   - GitHub Discussions: `gh api repos/{OWNER}/{REPO}/discussions` (same caveat)
   - Local journal mentions: grep `docs/journal/` for `feedback:` / `user said:` / similar markers (project convention)
2. Read the available sources. Skip closed-and-resolved Issues unless the user asks for retrospective view.
3. Cluster by theme — not by date, not by label. A cluster is a thing real users repeated. **Drop singletons** unless the singleton is severe (data loss, security).
4. Prioritize each cluster:
   - **P0** — blocks core use; users abandon
   - **P1** — friction on common path
   - **P2** — papercut; nice-to-fix
   - **P3** — wishful; defer
5. Create `docs/feedback/{YYYY-MM-DD}.md` (create folder if missing) using the template below.
6. Print the file path. Stop. Acting on the summary is a separate decision (typically: `/scope` a P0/P1 item next session).

## Template

```markdown
# Feedback summary — {YYYY-MM-DD}

**Sources scanned**: {GitHub Issues (N total, M closed) | Discussions (K) | Journal mentions (J)}
**Window**: {date range scanned}
**Note**: Singletons dropped unless severe. See raw sources for individual items.

## Themes (clustered)

### 🔴 P0 — blocking
*Users hit this and stop. Address before adding features.*

| # | Theme | Voices | Representative quote | Action |
|---|---|---|---|---|
| 1 | {theme — e.g., "Install fails on Windows"} | {N} | "{exact short quote}" | {scope next session / acknowledge in README / etc.} |

### 🟠 P1 — friction
*Users get through but with effort. Address within the next minor.*

| # | Theme | Voices | Notes |
|---|---|---|---|
| 1 | {theme} | {N} | {1-line context} |

### 🟡 P2 — papercuts
*Small annoyances. Batch into a polish PR.*

- {theme} ({N}) — {1 line}
- {theme} ({N}) — {1 line}

### ⚪ P3 — backlog
*Defer. Re-evaluate next summary; the same item appearing twice promotes it.*

- {theme} ({N}) — {1 line}

## Singletons noted (not clustered)

Items with only one voice. Listed for reference — not acted on unless severe.

- #{Issue or source} — {1 line}

## Cross-cluster observations

{Patterns that span themes. Examples:}
- "Most P0/P1 come from {area} — that area may need a focused refactor (run `/refactor-plan`)"
- "Many P2s are doc gaps — consider an onboarding doc pass"

## What stayed silent

{Mandatory section. Things you expected to hear feedback on but didn't. Either users don't care, or the surface isn't visible enough to generate signal. Useful for next launch decisions.}

## Next actions

- [ ] `/scope` for P0 #{N}: {theme}
- [ ] Documentation update for P2 #{N}: {theme}
- [ ] Defer P3 list to next summary
```

## Rules

- **Themes, not labels.** GitHub labels are author-assigned and inconsistent. The clustering is the value-add of this command; don't replicate the label set.
- **Singletons get dropped.** One person saying something is a data point; three people saying it is signal. Severe exception: P0 hazards (data loss, security) — surface even at N=1.
- **The "What stayed silent" section is the most useful one.** Lack of feedback on an area you launched a month ago is information. Don't skip it.
- **Don't act inside this command.** It produces a summary file; acting on items happens through `/scope`, `/release`, or normal Issue triage. Mixing summarization with action turns the summary into a TODO list and dilutes its analytic value.
