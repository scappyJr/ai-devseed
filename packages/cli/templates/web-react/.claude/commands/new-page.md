---
description: Create a new page with standard structure (React + Vite + TypeScript)
---

Create a new page following project conventions. Ask the user for the page name (PascalCase), then create the standard set of files.

## Files to Create

In `src/pages/{PageName}/`:

1. **`{PageName}.tsx`** — Main component
   - Functional component
   - Explicit `Props` type (even if empty)
   - Import styles from the CSS Module (or the project's chosen styling — check `CLAUDE.md`)
   - Comments in user's preferred language

2. **`{PageName}.module.css`** — Styles
   - CSS Module (default)
   - If the project uses Tailwind / styled-components / vanilla-extract, follow that instead — check `CLAUDE.md` first

3. **`{PageName}.test.tsx`** — Tests
   - Render test (uses `@testing-library/react`)
   - Key interaction tests

4. **`index.ts`** — Export
   - `export { default } from './{PageName}'`

## Additional Updates

- Add to `src/pages/index.ts` if a barrel file exists.
- **Wire up routing**: if React Router is used, add a `<Route>` entry. If file-based routing is used (e.g., TanStack Router, Next-style), follow that convention instead. If unsure, ask the user.

## Checklist
- [ ] Coding conventions per `CLAUDE.md`
- [ ] Props type defined
- [ ] Styles isolated to the page (no global CSS leakage)
- [ ] At least one test
- [ ] Comments in correct language
- [ ] Route registered (if applicable)
