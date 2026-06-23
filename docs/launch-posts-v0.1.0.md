# 📣 Launch Posts — v0.1.0 (Free + Pro)

Final draft of launch posts for the **simultaneous Free (`npx ai-devseed init`) + Pro (Gumroad)** launch of `v0.1.0`.

> Earlier beta-era templates are preserved in [`reddit-launch-templates.md`](./reddit-launch-templates.md). This file is the v0.1.0 evolution — updated for the real package state (3 templates · 8 slash commands · Pro tier live) and the actual URLs / discount code.

> **Use your own voice.** Don't copy-paste verbatim. Authenticity > polish on these platforms. Each post below is a starting structure, not a script.

> ⚠️ **Reddit-specific gotchas (learned the hard way on r/SideProject)**:
>
> 1. **Switch to Markdown Mode** before pasting. New Reddit's default editor is Rich Text — pasted markdown becomes plain text and headings/lists/bold all flatten into one paragraph. Look for the "Switch to Markdown" toggle (usually bottom-left of the editor) before you paste.
> 2. **Avoid fenced code blocks** (` ``` `). Reddit's markdown parser does **not** reliably handle them — the closing fence often gets missed and everything below it renders as one giant monospace block. Use **inline backticks** (`` ` ``) for short commands, or **4-space indentation** for multi-line code. The post bodies below already follow this rule.
> 3. **Edit "Markdown Mode" is sticky** per post — once you switch on a post, stays on for that post's future edits. Set it on first paste.

---

## ✅ Pre-flight (before posting anywhere)

```
[ ] GitHub repo flipped to Public
[ ] Branch Protection on main applied (linear history, PR required)
[ ] npm publish --tag beta done → npx ai-devseed init test-pkg actually works
[ ] Gumroad page reviewed in incognito (logged-out view)
[ ] LAUNCH50 link tested: …/ai-devseed-pro/LAUNCH50 auto-applies $9
[ ] Draft GitHub Release pro-v0.1.0 published (not draft anymore)
[ ] At least 3-5 stars on the repo (friends ok — social proof matters)
[ ] 2-4 hours of comment-reply availability lined up after posting
```

---

## 🎯 r/SideProject — most welcoming, post here first

**Subreddit rules**: weekly self-promo OK, must be your own project, link in body fine.

### Title

> `🌱 AI DevSeed v0.1.0 — a CLI that bootstraps Claude-Code-friendly projects in 30 seconds`

Alt: `Show r/SideProject — workflow templates I extracted from 60 days of building solo with Claude Code`

### Body

```markdown
Hey r/SideProject 👋

I've been building solo with Claude Code for the past few months, and I kept
noticing the same pattern: every new project ate 1-2 hours on the same scaffolding —
CLAUDE.md, ADR templates, daily journal folder, GitHub labels, slash commands.

So I extracted it into a CLI:

`npx ai-devseed init my-app`

In ~30 seconds you get:
- CLAUDE.md (auto-loaded by Claude Code)
- ADR system + journal + idea inbox
- 8 slash commands (/daily, /handoff, /retro, /review, /explore, /test-plan, /idea, /add-decision)
- 17-label GitHub setup script
- 3 template overlays: base · mobile-rn · web-react

**Honest limitations:**
- This is beta v0.1.0, expect rough edges
- No automated tests (manual coverage only)
- Project names starting with `-` confuse the CLI (known issue, on the patch list)

**Pro tier (optional)**: I packaged 12 additional slash commands + 10 ADR
scenario starter templates (state mgmt, auth, DB, CSS, deploy, etc.) as a
$19 bundle on Gumroad — the same files are also visible in the `pro/` folder
of the repo. First 50 buyers get $9 with code LAUNCH50.

That's "open-source pricing", same model as shadcn/ui or Tailwind UI —
not gating, just curation + sponsorship.

GitHub: https://github.com/scappyJr/ai-devseed
npm: https://www.npmjs.com/package/ai-devseed
Pro: https://haemcheephox.gumroad.com/l/ai-devseed-pro

Would love feedback — especially on whether the slash-command set
matches gaps you've felt.
```

### Likely comments & how to reply

- *"How is this different from create-react-app / yo / plop?"* → focus on **documentation + AI collaboration**, not code scaffolding. Mention shadcn/ui as a closer analogy.
- *"Why pay for markdown that's on GitHub?"* → "Same answer as Tailwind UI / Obsidian plugins — curation, lifetime updates, sponsorship. Manual copy path is in the README."
- *"Does this work without Claude?"* → "The slash commands assume Claude Code reads `.claude/commands/`. Other AI tools that respect that convention should also work."

---

## 🎯 r/ClaudeAI — Claude-Code-native audience

**Tone**: peer-to-peer. Lead with the workflow, not the product.

### Title

> `Open-sourcing the .claude/ folder structure I evolved over 60 days of solo building`

Alt: `8 slash commands + CLAUDE.md template that survived a real 60-day project (CLI installer)`

### Body

```markdown
Long-time Claude Code user here. Sharing the project-level conventions
I converged on after a ~60-day solo build, packaged so you can install
them in 30 seconds.

`npx ai-devseed init my-app`

**What it sets up for Claude Code specifically:**

- `CLAUDE.md` with the Single-Source-of-Truth pattern (so Claude doesn't get
  confused by duplicated info)
- `.claude/settings.json` with safe baseline permissions
- 8 slash commands in `.claude/commands/` — earned their keep on a real
  project:
  - `/daily` — start-of-day / end-of-day session bookends
  - `/handoff` — Claude-readable session handoff doc
  - `/retro` — weekly retrospective with concrete action items
  - `/review` — self-review of staged changes against a checklist
  - `/explore` — open-ended codebase exploration with structured output
  - `/test-plan` — derive a test plan from a feature description
  - `/idea` — capture into the inbox without breaking flow
  - `/add-decision` — write an ADR with full context

There's also a Pro tier with 12 more commands (scoping, releases,
postmortems, audits, refactor plans, etc.) and 10 ADR scenario starters
covering the architectural decisions that lock in pain if chosen wrong
(state mgmt, auth, DB, deployment platform, etc.) — $19 on Gumroad,
first 50 at $9 with LAUNCH50. Source visible in `pro/`; pay if you want
the curated bundle.

Genuinely curious:

- Which slash commands have you written that earned their keep?
- What context do you wish was always pre-loaded in CLAUDE.md?

GitHub: https://github.com/scappyJr/ai-devseed
```

---

## 🎯 r/opensource — license-aware audience

**Tone**: matter-of-fact. Lead with the open-source-pricing rationale, since this audience will ask.

### Title

> `Released v0.1.0 — AI DevSeed [MIT for Free tier, personal-use license for Pro]`

### Body

```markdown
v0.1.0 release of a CLI tool I've been working on solo.

**What it is**: a project bootstrapper for AI-collaborative development.
Generates CLAUDE.md, ADR system, journal, slash commands, GitHub labels —
the workflow scaffolding, not the code.

`npx ai-devseed init my-app`

**License model** (might be of interest here):

- **Free tier** — MIT. CLI + 3 templates + 8 slash commands + label setup
  script. `npx ai-devseed init`.
- **Pro tier** — personal/team-use license, source-visible at `pro/` in
  the same repo, $19 on Gumroad. 12 more slash commands + 10 ADR scenario
  templates. First 50 buyers get $9 with LAUNCH50.

I chose **open-source pricing** for the Pro tier (visible source, paid
bundle) over a separate private repo. Same model as shadcn/ui themes,
Tailwind UI, Obsidian plugins. The honest pitch: you're paying for
curation + lifetime updates + sponsorship, not access. Manual copy
path is in `pro/README.md`.

**Tech:**
- Pure Node.js ESM, Commander + @inquirer/prompts + fs-extra
- ~250 LOC core
- Templates are markdown + JSON only (no executable scaffolding)
- npm tarball structurally excludes the Pro folder (sits outside packages/cli/)

**Looking for**:
- Template contributors (Python, Go, Rust)
- Documentation improvements
- Feedback on the open-source-pricing framing

GitHub: https://github.com/scappyJr/ai-devseed
```

---

## 🇰🇷 Disquiet — 한국 인디 메이커

### 제목

> `🌱 AI DevSeed v0.1.0 — Claude Code 1인 개발 워크플로우 키트 출시`

대안: `60일 솔로 개발 끝에 정리한 Claude Code 워크플로우 — CLI 한 줄로 셋업`

### 본문

```markdown
안녕하세요. 1인 개발자입니다.

Claude Code로 사이드 프로젝트들을 만들면서 매번 같은 셋업(CLAUDE.md,
ADR 폴더, 슬래시 명령, GitHub 라벨...)을 반복하고 있다는 걸 깨닫고
CLI 도구로 추출했어요. 베타 끝나고 v0.1.0 정식 출시했습니다.

`npx ai-devseed init my-app`

**30초 안에 셋업되는 것:**

- CLAUDE.md (Claude Code가 자동으로 컨텍스트로 읽음)
- ADR 시스템 + 일일 저널 + 아이디어 인박스
- 슬래시 명령 8개 (`/daily`, `/handoff`, `/retro`, `/review`, `/explore`,
  `/test-plan`, `/idea`, `/add-decision`)
- GitHub 라벨 17개 setup 스크립트
- 템플릿 3종 — base / mobile-rn / web-react

**핵심 철학**: Single Source of Truth — 정보는 정확히 한 군데에만.
이게 흩어져 있으면 AI도 사람도 둘 다 헷갈려요.

**Pro tier (선택)**: 슬래시 명령 12개 + ADR 시나리오 시작 템플릿 10개
(state 관리, auth, DB, CSS, 배포, 테스트, 에러 처리 등 잘못 고르면
오래 고생하는 결정들)를 Gumroad에서 $19로 판매 중. 같은 파일이 repo의
`pro/` 폴더에도 공개돼 있어요. **첫 50명은 LAUNCH50 코드로 $9**.

shadcn/ui나 Tailwind UI 같은 "오픈소스 가격" 모델 — 콘텐츠는 공개,
번들 + 업데이트 + 후원만 유료.

**솔직한 한계:**
- v0.1.0 베타, 거친 부분 있어요
- 영어 문서 위주 (한국어 추가는 v0.x에서 검토)
- 프로젝트 이름이 `-`로 시작하면 Commander.js가 flag로 오인 (알려진
  버그, 패치 예정)

**다음 단계:**
같은 도구로 직접 사이드 프로젝트(Otori — 옷차림 추천 앱) 만들고 있어요.
60일 후 출시 + 후기 가이드북 ($39) 예정.

GitHub: https://github.com/scappyJr/ai-devseed
npm: https://www.npmjs.com/package/ai-devseed
Pro: https://haemcheephox.gumroad.com/l/ai-devseed-pro

피드백, 별, PR, 사용 후기 — 다 환영합니다 🌱
```

---

## ✍️ Dev.to — long-form, indexable

**Format**: blog post (~800-1200 words). Title + cover image + 4-5 sections + code blocks + canonical-URL self-reference (your GitHub).

### Title

> `I spent 60 days building solo with Claude Code. Here's the project setup that finally stuck.`

Alt: `Why every solo-AI project I start now begins with one CLI command`

### Outline

1. **The 1-hour scaffolding tax** — what eats time at the start of every new project (concrete list, no abstraction yet)
2. **Single Source of Truth** — the one rule that made Claude actually useful instead of confused. Examples of duplicated info that backfires.
3. **What I converged on** — bullet tour of the files / folders / slash commands the CLI installs
4. **The slash command set that earned its keep** — one paragraph per command, with the specific situation it solves (`/handoff` for context switches, `/retro` for weekly reset, etc.). 8 Free + brief mention of 12 Pro
5. **Why the Pro tier is source-visible** — open-source-pricing rationale, shadcn/ui analogy, manual-copy path stays open
6. **How to try it** — `npx` command, GitHub link, Pro link with LAUNCH50

### Tags

`#claudecode #ai #productivity #opensource #indiedev`

### Canonical URL

Set canonical to GitHub or your blog if you have one — keeps SEO clean.

---

## 🎯 Posting order recommendation

| Day | Channel | Why |
|---|---|---|
| **D-day morning** | r/SideProject | most welcoming, earliest peak engagement |
| **D-day afternoon** | r/ClaudeAI | smaller community, Claude-native crowd amplifies word-of-mouth |
| **D+1** | Disquiet (한국어) | parallel Korean track, doesn't compete with English subs |
| **D+2 / D+3** | r/opensource | license + tech-detail conversations land better after initial reception is in |
| **D+5 / D+7** | Dev.to blog post | reflects on initial reception, includes what people asked about |

**Don't post r/programming on day 1.** Their self-promo policy is strict and the audience is hostile to anything that smells like a launch. Save for ~2 weeks later if at all, framed as a technical writeup.

---

## 📊 What to track in week 1

- npm install count → https://npm-stat.com/charts.html?package=ai-devseed
- GitHub stars + traffic (Insights tab)
- Gumroad page views + LAUNCH50 redemptions (Analytics tab)
- Reddit upvote / comment ratios per subreddit
- Top question types in comments → patch / FAQ candidates

**Realistic first-week numbers** (per HANDOFF KPI section):
- GitHub stars: 20-50
- npm downloads: 100-300
- First Pro buyers: 0-5 (be ready for 0 — the discount link buys you data)
- External feedback: 1-3 substantive comments

Zero is a possible outcome, not a failure mode. The launch is data collection, not validation.

---

## 🪞 Reply principles

- **Golden hour (0-2h)**: reply to every comment, even the dismissive ones. Engagement amplifies post visibility.
- **Be specific**: "thanks!" alone is empty. Reference what they said.
- **Convert good feedback into issues**: "Tracking this here: #N" — turns a thread into a paper trail.
- **Hostile critique**: assume they want the project to be better, even if the tone says otherwise. Respond to the strongest version of their point.
- **Don't argue about pricing**: if someone says "you can just copy it from GitHub", agree. The README literally says that. The pitch is curation, not gating.

---

## 📝 Comment-thread templates (paste-ready)

**For "How is this different from X?"**
> Good question — the closest analogy is shadcn/ui rather than `create-react-app`. It's about documentation/workflow conventions, not code scaffolding. The CLI doesn't generate any React/Vue/etc code at all.

**For "Why pay if it's open?"**
> The markdown's in the `pro/` folder if you want to copy 22 files manually — totally fine. The $19 is for the maintained bundle + lifetime updates within v0.x + sponsorship. Same model as Tailwind UI or Obsidian plugins.

**For "Looks neat, will try it"**
> Thank you! If anything trips up the init flow or you want a slash command that isn't there, please drop an issue — that's exactly the signal the v0.x roadmap needs. (And `LAUNCH50` is good for the first 50 if Pro looks useful.)

**For "Found a bug"**
> Thank you for catching this — opening as issue #N now. Want me to credit you in the fix CHANGELOG entry?
