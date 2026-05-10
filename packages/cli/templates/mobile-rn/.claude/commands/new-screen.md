---
description: Create a new screen with standard structure (RN + TypeScript)
---

Create a new screen following project conventions. Ask user for screen name, then:

## Files to Create

In `src/screens/{ScreenName}/`:

1. **`{ScreenName}.tsx`** - Main component
   - Functional component
   - TypeScript Props type explicit
   - React Navigation prop types
   - Uses design tokens from `constants/theme`
   - Comments in user's preferred language

2. **`{ScreenName}.styles.ts`** - Styles
   - Use `StyleSheet.create()`
   - Import colors/spacing from theme

3. **`{ScreenName}.test.tsx`** - Tests
   - Render test
   - Key interaction tests

4. **`index.ts`** - Export
   - Default export of component

## Additional Updates
- Add to `src/screens/index.ts`
- Update navigation types (`types/navigation.ts`)

## Checklist
- [ ] Coding conventions per CLAUDE.md
- [ ] Design tokens only (no hardcoded colors)
- [ ] Props types defined
- [ ] At least one test
- [ ] Comments in correct language
