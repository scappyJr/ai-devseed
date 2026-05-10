# 📣 Reddit 출시 글 템플릿

서브레딧별로 톤을 살짝 다르게 한 출시 글 모음.

> 영어가 부담스러우면 Claude에게 "이 글 영어 더 자연스럽게 다듬어줘" 부탁하세요.
> 본인 색깔이 묻어나야 진정성이 느껴져요. 그대로 복붙하지 마시고 본인 스타일로 변형!

---

## 🎯 r/SideProject (가장 환영적)

**제목 후보:**
- `🌱 AI DevSeed - I built a CLI tool to bootstrap AI-collaborative projects [Beta]`
- `Show /r/SideProject: A starter kit for projects you build WITH AI (not just AI-generated)`

**본문:**

```markdown
Hey r/SideProject! 👋

I've been building side projects with Claude Code for a while, and noticed I 
was spending hours setting up the same files for every new project:
- CLAUDE.md (context for AI)
- ADR templates (decision records)
- Workflow guides
- Issue templates
- Folder structures

So I extracted everything into a CLI tool: **AI DevSeed**

```bash
npx ai-devseed init my-app
```

It generates a complete project structure optimized for AI collaboration in 
~30 seconds.

**What's included:**
- 📌 CLAUDE.md template (auto-loaded by Claude Code)
- 📂 ADR (Architecture Decision Records) folder
- 📓 Daily journal templates
- 💡 Idea management system (inbox + big ideas)
- 🎯 GitHub issue templates
- 📋 Workflow guides
- 🛠 Smart .gitignore and .env.example

**Currently in beta with 2 templates:**
- `base` - works for any project
- `mobile-rn` - React Native + Expo + TypeScript

**Honest about limitations:**
- Documentation could be better
- Web template is still placeholder
- No automated tests yet
- This is my first public CLI tool, expect rough edges

GitHub: https://github.com/{username}/ai-devseed
npm: https://npmjs.com/package/ai-devseed

Would love any feedback - especially on the philosophy ("Single Source of 
Truth" approach) and what templates would be most useful next.

I'm planning to use it to build a real project (a weather-based outfit app) 
and document the journey. Will share updates here!
```

**예상 댓글 응답:**
- "How is this different from `create-react-app`?" → "Focus on documentation/workflow, not just code structure. Designed specifically for AI collaboration."
- "Why do I need this?" → "If you don't use Claude Code or AI assistants, you don't! This is for that specific workflow."

---

## 🎯 r/ClaudeAI (Claude 사용자 모임)

**제목:**
- `Built a CLI tool that creates Claude-optimized project structures`

**본문:**

```markdown
Hi everyone! Long-time Claude Code user here.

You know how Claude works much better when CLAUDE.md is well-structured? 
I made a tool that generates that (and more) automatically.

```bash
npx ai-devseed init my-app
```

**What it sets up for Claude Code:**
- CLAUDE.md with proper context structure
- .claude/settings.json with safe permissions
- 3 useful slash commands out of the box:
  - `/daily start` and `/daily end` for context restoration
  - `/add-decision` for ADR creation
  - `/review` for self code review
- Single Source of Truth file structure (Claude won't get confused)

**Beyond Claude:**
- ADR system for documenting decisions
- Idea management (inbox + big ideas)
- WBS templates
- GitHub issue templates

It's the result of building several side projects with Claude Code and 
recognizing patterns.

GitHub: https://github.com/{username}/ai-devseed

Open to feedback! Particularly curious:
- What slash commands have been most useful in your projects?
- What context do you wish was always pre-loaded for Claude?
```

---

## 🎯 r/learnprogramming (초보 친화적)

**제목:**
- `For solo learners using AI: I made a CLI tool that sets up "good practices" automatically`

**본문:**

```markdown
Hi r/learnprogramming!

When you're learning to build projects, especially with AI helping, it's 
hard to know what "professional" project structure looks like. I made a 
tool that does that setup for you.

```bash
npx ai-devseed init my-learning-project
```

**It sets up things you might not have thought of yet:**
- 📓 A daily journal habit (huge for learning!)
- 📝 Documentation templates (forces you to think about decisions)
- 💡 An idea management system
- 🎯 GitHub workflow with proper labels

**Why I think this helps learners:**
- You don't have to invent structure - just focus on coding
- The journal practice helps you remember what you've learned
- Documenting decisions makes you understand them better
- It's all transparent - you can see and modify everything

It's open source and free.

GitHub: https://github.com/{username}/ai-devseed

I'm not selling anything - just sharing what I wish I had when I started 
working with AI assistants.

Happy to answer questions!
```

---

## 🎯 r/programming (깐깐한 청중)

⚠️ **이 서브레딧은 자기 홍보에 매우 엄격해요. 글 올리기 전에 다른 글들 톤을 먼저 보세요. 또는 출시 1-2주 후 조금 다듬은 후 올리는 게 좋아요.**

**제목:**
- `Show: A philosophy-driven project starter for AI-collaborative development`

**본문:**

```markdown
I've been thinking about how solo developers work with AI assistants like 
Claude Code. The conventional project setups don't account for this 
collaboration. I built AI DevSeed to address this.

**Core philosophy: Single Source of Truth**

Every piece of information lives in exactly one place:
- Code → Git
- Decisions → ADR (`docs/decisions/`)
- Daily progress → Journal (`docs/journal/`)
- Ideas → Inbox/Big-ideas folders
- Tasks → GitHub Issues
- Context for AI → CLAUDE.md

When info is scattered, AI gets confused. When centralized, AI works much 
better.

**The tool:**
```bash
npx ai-devseed init my-project
```

Generates this structure with templates and workflow guides.

**Technical stack:**
- Node.js 18+ ESM
- Commander.js for CLI
- @inquirer/prompts for interactive
- fs-extra for file operations
- ~250 LOC core (intentionally simple)

**What's not included (intentionally):**
- No code scaffolding (no React boilerplate, etc)
- No build tools opinions
- No deployment configs

This is purely about project organization and AI collaboration patterns.

**Open to critique:** What patterns am I missing? What's controversial 
about this approach?

GitHub: https://github.com/{username}/ai-devseed
```

---

## 🎯 r/opensource

**제목:**
- `Released first beta: AI DevSeed - CLI for AI-collaborative project setup [MIT]`

**본문:**

```markdown
Just released beta v0.1.0 of an open source project I've been working on.

**What it is:**
AI DevSeed - a CLI that bootstraps projects optimized for AI-assisted 
development.

```bash
npx ai-devseed init my-app
```

**License:** MIT (always free, all templates open source)

**Tech:**
- Pure Node.js ESM
- No external runtime dependencies (besides CLI deps)
- ~250 LOC core code
- Templates are markdown/JSON only

**Why open source:**
- I want this to be a community resource
- Patterns work better when validated by many people
- Good for portfolio + open source contributions

**Looking for:**
- Maintainers / collaborators
- Template contributors (Python, Go, Rust, etc.)
- Documentation improvements
- Translation help (currently English only)

Code: https://github.com/{username}/ai-devseed

Happy to discuss licensing, governance, or anything else about open 
sourcing this.
```

---

## 🇰🇷 한국 채널: Disquiet

[Disquiet](https://disquiet.io) - 한국 인디 메이커 커뮤니티

**제목:**
- `🌱 AI DevSeed 베타 출시 - AI와 함께하는 1인 개발 시작 키트`

**본문:**

```markdown
안녕하세요! 1인 개발자입니다.

Claude Code로 사이드 프로젝트를 만들면서 매번 같은 셋업을 반복하고 있다는 걸 
깨닫고 CLI 도구로 만들었어요.

**핵심**: 명령어 한 줄로 AI 협업에 최적화된 프로젝트 구조 생성

```bash
npx ai-devseed init my-app
```

**자동으로 만들어주는 것:**
- 📌 CLAUDE.md 템플릿 (Claude Code가 자동으로 읽음)
- 📂 ADR (의사결정 기록) 폴더
- 📓 일일 작업 일지 템플릿
- 💡 아이디어 관리 시스템 (인박스/큰 비전)
- 🎯 GitHub 이슈 템플릿
- 📋 워크플로우 가이드

**핵심 철학**: Single Source of Truth - 정보는 딱 한 군데에만

**솔직한 한계:**
- 베타라 거친 부분 있어요
- 영어 문서 위주 (한국어 추가 예정)
- 템플릿이 아직 2개뿐 (generic, mobile-RN)

**계획:**
같은 도구로 직접 옷차림 추천 앱 (Otori)을 만들고 있어요. 
60일 후 출시 + 후기 가이드북 작성 예정.

GitHub: https://github.com/{username}/ai-devseed

피드백, 별, PR 다 환영해요! 🌱
```

---

## 📝 글 올리기 전 최종 체크리스트

```
[ ] GitHub 저장소 Public으로 공개됨
[ ] README가 매력적으로 작성됨 (배지, 설명, 데모)
[ ] About 섹션 (Topics) 잘 채워짐
[ ] npm publish 완료, npx 동작 확인
[ ] 최소 3-5명 친구/지인이 Star (사회적 증명)
[ ] 본인 GitHub 계정에 다른 활동 흔적 (신뢰도)
[ ] 글 본문에서 본인 username 정확히 표기
[ ] 서브레딧 룰 한 번 더 확인
[ ] 댓글 응답할 시간 2-4시간 확보
```

---

## 🎯 첫 글 올린 후 행동 가이드

### 0-2시간 (골든타임)
- 댓글에 즉시 응답 (정성껏)
- 비판도 정중하게 받음
- 구체적인 답변 ("Thanks!" 만 X)

### 2-24시간
- 좋은 피드백 → GitHub Issue로 등록
- 댓글에서 "Tracking this here: #X" 링크
- 지인들에게 글 공유 부탁 (Reddit 친구 X, Twitter나 카톡으로)

### 1주일 후
- 통계 확인:
  - GitHub Star
  - npm 다운로드 (https://npm-stat.com)
  - Reddit 업보트
- 가장 반응 좋은 채널 파악
- 다음 글 주제 결정

---

## 💡 부담스러우면?

### 부담 줄이는 팁
1. **Disquiet부터 한국어로** 시작 (가장 친숙)
2. **r/ClaudeAI** 두 번째 (작은 커뮤니티, 친화적)
3. 반응 보면서 확장

### 영어 부담?
- Claude에게 글 검토 부탁
- "Is this email natural? Suggest improvements"
- 본인의 어색한 영어가 더 진정성 있을 수도
- 완벽하지 않아도 OK

### "내가 자격이 있나?" 의심
- 누구나 처음에는 그래요
- 출시는 자격이 아니라 **공유**
- 도움 받은 사람이 단 1명이라도 있으면 의미 있음
