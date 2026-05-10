---
description: Self code review based on CLAUDE.md conventions
---

Review recent changes (`git diff HEAD~1` or unstaged changes).

## Checklist

### 1. Coding Conventions (per CLAUDE.md)
- [ ] Follows defined coding style
- [ ] File naming convention
- [ ] Comments in correct language
- [ ] No magic numbers

### 2. Type Safety (if applicable)
- [ ] No `any` types (TypeScript)
- [ ] Props/State types defined
- [ ] API response types defined

### 3. Design System Compliance
- [ ] No hardcoded colors (use theme)
- [ ] No hardcoded spacing
- [ ] Consistent typography

### 4. Tests
- [ ] New components have tests
- [ ] New utility functions have tests

### 5. Security
- [ ] No hardcoded API keys
- [ ] No `.env` modifications
- [ ] No secrets in commits

### 6. Performance
- [ ] No unnecessary re-renders
- [ ] Proper memoization

## Output Format
For each item: ✅ / ⚠️ / ❌
For issues: specific file:line + improvement suggestion.
