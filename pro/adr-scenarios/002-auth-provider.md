# ADR NNN — Auth Provider

> **Scenario starter.** Renumber `NNN`, set the date, and fill in Decision + Consequences. Context, Options, and the Tradeoff matrix are pre-filled with the typical considerations — tailor as needed.

## Status
Proposed (YYYY-MM-DD)

## Context

Auth touches every protected route, the signup funnel, password reset flows, session storage, and (eventually) compliance audits. Picking wrong locks in pain: migrating auth providers is one of the highest-cost refactors in any app because user credentials and sessions are involved.

Typical drivers for this decision:

1. **Pricing model** — most managed providers charge per monthly active user (MAU); free tiers vary wildly. A growth-stage app can hit a $0 → $300/mo cliff overnight.
2. **Vendor lock-in** — exporting users + hashed passwords is sometimes blocked or requires a contract. Migration cost grows with users.
3. **Self-host option** — required for regulated industries, internal-only apps, or "no third-party in the auth path" policies.
4. **Built-in providers** — social login (Google/Apple/GitHub/etc.), enterprise SSO (SAML, OIDC), passkeys, magic links. Cost in dev-days if missing.
5. **Multi-factor support** — TOTP, SMS, WebAuthn/passkeys. Increasingly table-stakes; SMS is the most expensive at scale.
6. **Session model** — JWT (stateless, hard to revoke) vs server-stored sessions (revocable, requires storage). Affects logout-everywhere UX and security incident response.

## Options

### A. Auth0
- ✅ Enterprise-grade, every social/SAML/OIDC provider supported, audit logs
- ❌ Free tier 25,000 MAU then steep pricing
- ❌ Heaviest vendor lock-in of the options; export is supported but messy

### B. Clerk
- ✅ Best-in-class DX for React/Next.js, pre-built UI components, passkeys default
- ❌ React-centric (workable elsewhere but second-class)
- ❌ Free tier 10,000 MAU; pricing scales per MAU + features

### C. Supabase Auth
- ✅ Open source, self-host option, ships with Postgres + Row Level Security
- ✅ Free tier generous (50,000 MAU)
- ❌ Smaller social-provider list than Auth0/Clerk
- ❌ Best fit if you're also using Supabase for the database

### D. Firebase Auth
- ✅ Excellent mobile SDKs (RN, native iOS/Android), wide social provider support
- ✅ Free tier generous for most projects
- ❌ Tied to Google Cloud ecosystem
- ❌ JWT-based; logout-everywhere requires custom claims revocation logic

### E. NextAuth.js (now Auth.js)
- ✅ Self-hosted, code lives in your repo, no vendor
- ✅ Free, MIT licensed
- ❌ You're responsible for security patches, breach response, MFA implementation
- ❌ Documentation has lagged the API surface in past releases

### F. Roll-your-own
- ✅ Total control, zero vendor cost
- ❌ You will get breach response, password hashing migrations, MFA, and session handling wrong at least once
- ❌ Reserved for teams with security expertise or projects where the auth surface is trivial (single-user, internal-only)

## Tradeoffs (matrix)

| | Pricing model | Self-host | Social providers | MFA support | Migration cost away | DX |
|---|---|---|---|---|---|---|
| Auth0 | Per-MAU, steep | No | Excellent (50+) | TOTP / SMS / WebAuthn | High | Good |
| Clerk | Per-MAU + features | No | Good (15+) | Passkeys default | Medium-High | Excellent (React) |
| Supabase Auth | Generous free; per-MAU paid | Yes | Good (10+) | TOTP / passkeys | Medium | Good |
| Firebase Auth | Generous free; per-call paid | No | Excellent (20+) | TOTP / SMS / app verify | High (export is awkward) | Excellent (mobile) |
| NextAuth / Auth.js | Free (self-host) | Yes (self) | Many adapters | DIY / library plugins | Low | OK |
| Roll-your-own | Free | Yes | DIY | DIY | None (it's already yours) | DIY |

## Decision

{Chosen provider, one sentence. If different parts of the system use different providers (e.g., Auth0 for web, Firebase for mobile), state explicitly.}

## Reasoning

- {Driver 1 — e.g., pricing fit, self-host requirement}
- {Driver 2 — e.g., social provider need}
- {Driver 3 — e.g., team's mobile-first focus}

## Consequences

### Positive
- {Concrete benefit — e.g., "Sign-in UI is one component import; saves ~3 days of work"}
-

### Negative / trade-offs
- {Cost accepted — e.g., "Per-MAU pricing means we'll need to forecast cost at 10k users"}
-

### Future implications
- {Migration path if we outgrow this — e.g., "We have an exit plan documented to Supabase if Auth0 cost becomes prohibitive"}
-

## Alternatives considered

- **Auth0** — {reason rejected}
- **Clerk** — {…}
- **Supabase Auth** — {…}
- **Firebase Auth** — {…}
- **NextAuth / Auth.js** — {…}
- **Roll-your-own** — {…}

## References

- Auth0: https://auth0.com/pricing
- Clerk: https://clerk.com/pricing
- Supabase Auth: https://supabase.com/auth
- Firebase Auth: https://firebase.google.com/products/auth
- Auth.js: https://authjs.dev/
- OWASP Authentication Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- {Project-specific — pricing forecast spreadsheet, compliance requirement doc}
