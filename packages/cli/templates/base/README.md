# {{PROJECT_NAME}}

> {{PROJECT_DESCRIPTION}}

![Status](https://img.shields.io/badge/status-planning-yellow)
![Phase](https://img.shields.io/badge/phase-0%20setup-purple)

---

## ✨ Overview

(Describe what your project does and why it matters)

## 🛠️ Tech Stack

(Update as decisions are made)

- **Language**: 
- **Framework**: 
- **Tools**: 

## 📋 Status

- [x] Project setup with [AI DevSeed](https://github.com/scappyJr/ai-devseed)
- [ ] Phase 0: Environment setup
- [ ] Phase 1: MVP
- [ ] Phase 2: Enhancement
- [ ] Phase 3: Polish

## 📂 Folder Structure

```
{{PROJECT_NAME}}/
├── 📌 CLAUDE.md              AI context file
├── 📌 README.md              This file
├── 📌 CHANGELOG.md           Version history
│
├── .claude/                  Claude Code settings
├── .github/                  GitHub config
│
├── docs/                     📚 All documentation
│   ├── architecture.md
│   ├── workflow-guide.md
│   ├── decisions/            ADR
│   ├── ideas/                Idea management
│   ├── journal/              Daily logs
│   └── retrospective/        Retros
│
├── wbs/                      📊 Work breakdown
└── src/                      💻 Source code
```

## 🚀 Getting Started

```bash
# Clone (if applicable)
git clone <your-repo-url>
cd {{PROJECT_NAME}}

# Setup environment
cp .env.example .env
# Edit .env with your keys

# Start with Claude Code
claude
```

## 🤖 Working with Claude Code

This project uses [Claude Code](https://www.anthropic.com/claude-code) for AI-assisted development.

```bash
# Useful commands
/daily start           # Start your day
/daily end             # Wrap up
/idea                  # Capture a fleeting idea to inbox
/add-decision          # Document an ADR (decision)
/handoff               # Generate session-pickup doc
/retro                 # Weekly retrospective
/review                # Self code review
/explore               # Map an unfamiliar area before editing
/test-plan             # Plan test coverage before writing tests
```

See [`docs/workflow-guide.md`](docs/workflow-guide.md) for the daily workflow.

## 📝 License

(Add your license)

---

*Bootstrapped with [🌱 AI DevSeed](https://github.com/scappyJr/ai-devseed)*
