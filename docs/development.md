# 🛠 Development Guide

How to develop and test AI DevSeed locally.

---

## 📁 Repository Structure

```
ai-devseed/
├── packages/
│   └── cli/                    # The CLI tool
│       ├── bin/
│       │   └── ai-devseed.js   # Entry point
│       ├── src/
│       │   ├── commands/       # Command implementations
│       │   └── utils/          # Utilities
│       ├── templates/          # Project templates
│       │   ├── base/           # Generic (always copied)
│       │   ├── mobile-rn/      # React Native + Expo
│       │   └── web-react/      # React + Vite
│       └── package.json
│
├── docs/                       # Documentation
├── examples/                   # Real-world examples
└── README.md
```

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+
- npm (or pnpm/yarn)
- Git

### Setup
```bash
# Clone
git clone https://github.com/example/ai-devseed.git
cd ai-devseed

# Install CLI dependencies
cd packages/cli
npm install

# Link for local testing
npm link

# Now you can use it anywhere
ai-devseed --help
```

### Test the CLI
```bash
# Create test project
cd /tmp
ai-devseed init test-project

# Verify
cd test-project
ls -la
cat CLAUDE.md
```

### Unlink when done
```bash
cd packages/cli
npm unlink
```

---

## 🧪 Testing

### Manual testing
```bash
# Test default flow
ai-devseed init my-test

# Test with options
ai-devseed init my-test --template mobile-rn --no-git

# Test --yes mode
ai-devseed init my-test --yes

# Test list
ai-devseed list
```

### Automated tests (planned)
```bash
npm test
```

---

## 🏗 Adding a New Template

1. Create folder: `packages/cli/templates/{name}/`
2. Add files specific to that template (will be merged with `base/`)
3. Update `src/commands/init.js` choices array
4. Update `bin/ai-devseed.js` `list` command
5. Test thoroughly

### Template structure
- `base/` is always applied first
- Specific template overlays on top
- Use `{{PLACEHOLDER}}` for variables

### Available placeholders
- `{{PROJECT_NAME}}` - Project name
- `{{PROJECT_DESCRIPTION}}` - Description
- `{{AUTHOR}}` - Author name
- `{{YEAR}}` - Current year
- `{{DATE}}` - Current date (YYYY-MM-DD)

---

## 🚢 Publishing

### Beta release
```bash
cd packages/cli

# Bump version
npm version 0.1.0-beta.2

# Publish with tag
npm publish --tag beta

# Users install with
npm install -g ai-devseed@beta
```

### Stable release
```bash
npm version 1.0.0
npm publish
```

---

## 📝 Code Style

- ES Modules (not CommonJS)
- 2-space indentation
- Single quotes for strings
- No semicolons? Use semicolons. (consistency)
- Use Prettier

---

## 🐛 Debugging

```bash
# Run with debug logs
DEBUG=1 ai-devseed init test-project

# See errors
node bin/ai-devseed.js init test 2>&1
```

---

## 🤝 Contributing

This is a beta project. Feedback and PRs welcome.

### Areas needing help
- More templates (CLI tool, library, fullstack)
- Better tests
- Localization (Korean, Japanese, etc)
- Documentation site
