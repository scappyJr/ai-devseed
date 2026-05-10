# 🚀 Getting Started with AI DevSeed

5-minute guide to your first AI-collaborative project.

---

## Prerequisites

- **Node.js 18+** ([download](https://nodejs.org))
- **Git** ([download](https://git-scm.com))
- **Claude Code** ([install](https://www.anthropic.com/claude-code)) - Optional but recommended

---

## Create Your First Project

```bash
npx ai-devseed init my-app
```

You'll be asked:
1. **Project name** - the folder name (lowercase, hyphens OK)
2. **Description** - brief one-liner about your project
3. **Author name** - optional
4. **Project type** - generic / mobile / web
5. **Initialize Git?** - Yes recommended

That's it! Your project is created in `./my-app/`.

---

## Explore the Structure

```bash
cd my-app
ls -la
```

You'll see:
```
my-app/
├── 📌 CLAUDE.md            ← AI reads this automatically
├── 📌 README.md
├── 📌 CHANGELOG.md
├── .claude/                ← Claude Code config
│   ├── settings.json
│   └── commands/           ← Custom slash commands
├── docs/
│   ├── architecture.md
│   ├── workflow-guide.md   ← Read this first!
│   ├── decisions/          ← ADRs go here
│   ├── ideas/              ← Idea management
│   └── journal/            ← Daily logs
├── wbs/
│   └── checklist.md        ← Task tracking
└── .gitignore, .env.example
```

---

## Read These First

In order:

1. **`CLAUDE.md`** - Customize for your project (tech stack, conventions)
2. **`docs/workflow-guide.md`** - Understand the workflow
3. **`docs/ideas/README.md`** - Idea management system

---

## Customize for Your Project

### 1. Update CLAUDE.md
Edit the placeholders:
- Tech stack
- Coding conventions
- Folder structure (if different)

### 2. Update README.md
Replace the template content with your project's actual description.

### 3. Write Your First ADR
Document your first major decision:
```bash
# Or use Claude Code:
# /add-decision
```

Edit `docs/decisions/001-project-bootstrap.md` or create new ones.

---

## Start Working

### With Claude Code
```bash
claude
```

Then try:
```
/daily start    # Start your day
/add-decision   # Document a decision
/review         # Self code review
```

### Without Claude Code
You can still use the templates and structure. Just edit files manually.

---

## Day 1 Checklist

```
[ ] Read CLAUDE.md and customize
[ ] Read docs/workflow-guide.md
[ ] Update README.md with real description
[ ] Edit/replace 001-project-bootstrap.md ADR
[ ] Add tasks to wbs/checklist.md
[ ] Make your first commit
[ ] (Optional) Create GitHub repo and push
[ ] (Optional) Set up GitHub labels with the script
```

---

## Common Questions

### Q. Can I delete files I don't need?
Yes! Templates are starting points. Customize freely.

### Q. Where do new ideas go?
- Quick → `docs/ideas/inbox.md` (one liner)
- Big → `docs/ideas/big/{name}.md` (own file)
- Discuss with team → GitHub Issue

### Q. How do I update the templates later?
You don't! Once generated, your project is yours. Run AI DevSeed again for new projects.

### Q. What if Claude Code isn't installed?
The structure still works. The `.claude/` files won't be used, but everything else is plain markdown/JSON.

### Q. Can I publish my project as open source?
Absolutely. The Free tier templates are MIT licensed and yours to use.

---

## Next Steps

- 📖 [Workflow Guide](workflow.md) - Daily development rhythm
- 🎨 [Customization](customization.md) - Adapt to your style
- 💎 [Get Pro](#) - Unlock more templates and features

---

## Need Help?

- 🐛 [Report a bug](https://github.com/example/ai-devseed/issues)
- 💬 [Ask a question](https://github.com/example/ai-devseed/discussions)
- 🐦 [Follow on Twitter](https://twitter.com/example)

---

🌱 **Happy coding!** Plant your seed and watch it grow.
