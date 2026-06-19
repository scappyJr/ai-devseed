# ADR NNN — CSS Strategy

> **Scenario starter.** Renumber `NNN`, set the date, and fill in Decision + Consequences. Context, Options, and the Tradeoff matrix are pre-filled — tailor as needed.

## Status
Proposed (YYYY-MM-DD)

## Context

CSS strategy decides what every component file looks like, how theming works, how dark mode is implemented, and how much CSS ships to users. The cost of changing direction later scales with component count — picking once is normal.

Typical drivers for this decision:

1. **Bundle size** — runtime CSS-in-JS adds JS that must be parsed and executed; atomic CSS (Tailwind/UnoCSS) generates only the classes used.
2. **Build-time vs runtime** — build-time strategies fail loudly when wrong; runtime strategies allow dynamic theming but cost JS execution.
3. **Theming and dark mode** — CSS variables and Tailwind's `dark:` variants handle this cleanly; some CSS-in-JS libraries make it harder than expected.
4. **Component-library ecosystem** — shadcn/ui (Tailwind), Mantine (CSS Modules + variables), MUI (Emotion). The strategy locks the library set.
5. **Refactor safety** — atomic CSS makes "delete this component" automatically delete its styles; CSS Modules and SSS files leave orphans.
6. **Developer experience** — autocomplete, linting, type-safety for theme tokens. Affects daily friction.
7. **Customization depth** — when you outgrow a default token, how invasive is it? Tailwind extends in `tailwind.config`; component libs vary.

## Options

### A. Tailwind CSS
- ✅ Atomic, tree-shaken — only classes you use ship
- ✅ Excellent ecosystem (shadcn/ui, Tailwind UI, hundreds of component starters)
- ✅ Dark mode + theming via variables and `dark:` variants
- ❌ "Long classNames" aesthetic complaint (subjective)
- ❌ Customization beyond defaults goes through `tailwind.config` — extra mental layer

### B. CSS Modules
- ✅ Standard CSS, scoped per component, no runtime
- ✅ Works with any framework, no library lock-in
- ❌ More files per component (`.module.css` alongside `.tsx`)
- ❌ Theming requires manually wiring CSS variables; less polished

### C. CSS-in-JS (styled-components / Emotion)
- ✅ Component + styles in one file, dynamic styles via props
- ✅ Rich theming API
- ❌ Runtime cost (per render, per styled component) — Emotion mitigates with `css` API
- ❌ Server-rendering setup is more complex; SSR + CSS-in-JS has been a perennial pain point
- ❌ Some libraries in this category are now feature-frozen (styled-components)

### D. Vanilla CSS + CSS variables (no library)
- ✅ Zero deps, zero build tooling beyond what the framework needs
- ✅ Modern CSS (custom properties, `@layer`, nesting in modern browsers) is genuinely capable
- ❌ Manual scoping discipline required (BEM, naming conventions)
- ❌ No autocomplete for design tokens unless you build it

### E. UnoCSS / Panda CSS / Vanilla-Extract (build-time atomic / typed)
- ✅ Atomic with type-safe tokens (Panda, Vanilla-Extract)
- ✅ Tailwind-like compile-time generation with more configuration flexibility
- ❌ Smaller community than Tailwind; fewer starter components
- ❌ Newer ecosystem; expect to file more bugs

## Tradeoffs (matrix)

| | Build-time vs runtime | Bundle size impact | Theming / dark mode | Customization depth | DX (autocomplete, refactor safety) | Component-lib ecosystem |
|---|---|---|---|---|---|---|
| Tailwind | Build-time | Minimal (atomic) | Excellent (`dark:` + vars) | Via config | Excellent (IntelliSense, dead-class detection) | Largest |
| CSS Modules | Build-time | Per-class | Manual | Direct CSS | Good (with TS module declarations) | Medium |
| CSS-in-JS | Runtime | Per styled component | Excellent (theme provider) | Direct JS | Excellent (props-driven) | Medium |
| Vanilla CSS + vars | Build-time | Manual | Excellent (vars) | Direct CSS | Manual | Small |
| UnoCSS / Panda / VE | Build-time | Minimal | Typed tokens | High | Excellent (typed) | Growing |

## Decision

{Chosen strategy, one sentence. If using more than one (rare, but possible — e.g., Tailwind for the app + CSS Modules for one design-system package), state explicitly.}

## Reasoning

- {Driver 1 — e.g., need to ship under bundle budget, design-token discipline}
- {Driver 2 — e.g., shadcn/ui adoption, team familiarity}
- {Driver 3}

## Consequences

### Positive
- {Concrete benefit — e.g., "Adding a new color token is one line in `tailwind.config`"}
-

### Negative / trade-offs
- {Cost accepted — e.g., "Long classNames in JSX; team agrees to live with them"}
-

### Future implications
- {Locks in or rules out — e.g., "Tailwind locks us into the utility-class workflow; switching costs scale with component count"}
-

## Alternatives considered

- **Tailwind** — {reason rejected if applicable}
- **CSS Modules** — {…}
- **CSS-in-JS** — {…}
- **Vanilla CSS** — {…}
- **UnoCSS / Panda / Vanilla-Extract** — {…}

## References

- Tailwind: https://tailwindcss.com/
- shadcn/ui (Tailwind-based component library): https://ui.shadcn.com/
- CSS Modules: https://github.com/css-modules/css-modules
- Emotion: https://emotion.sh/
- Vanilla-Extract: https://vanilla-extract.style/
- Panda CSS: https://panda-css.com/
- UnoCSS: https://unocss.dev/
- {Project-specific — design tokens doc, component inventory}
