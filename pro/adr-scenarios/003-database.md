# ADR NNN — Database Choice

> **Scenario starter.** Renumber `NNN`, set the date, and fill in Decision + Consequences. Context, Options, and the Tradeoff matrix are pre-filled — tailor as needed.

## Status
Proposed (YYYY-MM-DD)

## Context

The database is the highest-migration-cost choice in the stack. Every feature reads or writes through it; switching means rewriting data-access code, migrating data, and accepting downtime or a coordinated cutover. Solo and small teams rarely re-decide this within a project's first 2 years — pick deliberately.

Typical drivers for this decision:

1. **Data shape** — relational with strong joins (orders/users/items) vs document with nested mostly-unrelated records vs key-value lookup.
2. **Hosting model** — managed (RDS/Neon/Supabase/Atlas/PlanetScale) vs self-hosted vs serverless (Firestore/DynamoDB).
3. **Consistency model** — strong (ACID) vs eventual. Affects user-facing UX around writes; many apps need ACID and don't realize it until conflicts appear.
4. **Cost at small scale** — free tiers and small-instance pricing vary by 100×. Matters before product-market fit.
5. **Cost at scale** — DynamoDB/Firestore can become expensive at high read volume; Postgres on a bigger instance is often cheaper per-row.
6. **Ecosystem and tooling** — ORMs, migration tools, GUIs, backup tooling. A familiar ecosystem saves real dev-days.
7. **Migration burden away** — exporting data is always possible, but query rewrites and downtime cost differ wildly.

## Options

### A. PostgreSQL (managed: Neon / Supabase / RDS / Railway)
- ✅ Most ecosystem support, JSONB for hybrid relational/document, strong ACID
- ✅ Cheap at small scale; predictable pricing
- ❌ You're managing schemas and migrations (not free — but consistent across providers)
- ❌ Hosted free tiers throttle or sleep on inactivity (Neon, Supabase)

### B. SQLite (file-based, possibly via LiteFS/Turso/D1)
- ✅ Zero ops at small scale; the database is a file
- ✅ Excellent for local-first or single-user apps; testing is trivial
- ❌ Concurrent writes serialize through one writer
- ❌ Scaling to "multiple writes from multiple servers" requires a replication layer (LiteFS, Turso) and changes the operational model

### C. DynamoDB
- ✅ Fully managed, horizontally scalable, single-digit-ms reads at any scale
- ✅ Free tier covers many small apps indefinitely
- ❌ Query model is restrictive (must design access patterns up front)
- ❌ Joins are application-side; complex queries are awkward
- ❌ Pricing surprises common at scale if access patterns weren't planned

### D. Firestore (Firebase)
- ✅ Real-time listeners built-in (great for chat, presence, collaborative editing)
- ✅ Generous free tier
- ❌ Query model limited (no joins, no aggregates without extensions)
- ❌ Per-document-read pricing can balloon with naive client patterns

### E. MongoDB (Atlas managed)
- ✅ Flexible document schema, good ecosystem, mature drivers
- ✅ Strong consistency available within a replica set
- ❌ Schema flexibility tempts under-modeling; bites later
- ❌ Pricing comparable to Postgres with less rigorous relational guarantees

### F. SQLite + sync engine (Turso, PowerSync, Replicache)
- ✅ Local-first: the app works offline by default; sync resolves conflicts
- ✅ Compelling for mobile, desktop, or offline-tolerant web apps
- ❌ Newer ecosystem; fewer reference designs for conflict resolution
- ❌ More moving parts than a traditional client/server setup

## Tradeoffs (matrix)

| | Schema flexibility | Query familiarity (SQL) | Hosting cost (small) | Migration burden away | ACID guarantees | Tooling / ecosystem |
|---|---|---|---|---|---|---|
| PostgreSQL | Medium (JSONB hybrid) | High (SQL) | Low | Medium | Strong | Excellent |
| SQLite (file) | Medium | High (SQL) | Free | Low (it's a file) | Strong (single writer) | Excellent |
| DynamoDB | High (schemaless-ish) | Low (proprietary) | Free → expensive | High | Tunable (transactions limited) | AWS-specific |
| Firestore | High | Low (proprietary) | Free → can balloon | High | Per-document | Google-specific |
| MongoDB | High | Medium (Mongo query) | Medium | Medium | Replica-set scoped | Good |
| SQLite + sync | Medium | High (SQL) | Free → small | High (sync engine specific) | Strong locally, eventual on sync | Newer |

## Decision

{Chosen database, one sentence. If using more than one (e.g., Postgres + Redis cache + S3 for blobs), state explicitly which is "the database" and which are auxiliary.}

## Reasoning

- {Driver 1 — e.g., team's SQL familiarity, real-time requirement, offline-first need}
- {Driver 2}
- {Driver 3}

## Consequences

### Positive
- {Concrete benefit — e.g., "Joins are first-class; no application-side join code"}
-

### Negative / trade-offs
- {Cost accepted — e.g., "We're managing migrations ourselves; chose Prisma to mitigate"}
-

### Future implications
- {Scale ceiling, exit cost, ecosystem dependence}
-

## Alternatives considered

- **PostgreSQL** — {reason rejected}
- **SQLite** — {…}
- **DynamoDB** — {…}
- **Firestore** — {…}
- **MongoDB** — {…}
- **SQLite + sync engine** — {…}

## References

- Postgres: https://www.postgresql.org/
- SQLite: https://www.sqlite.org/
- DynamoDB: https://aws.amazon.com/dynamodb/
- Firestore: https://firebase.google.com/docs/firestore
- MongoDB Atlas: https://www.mongodb.com/atlas
- Turso (libSQL): https://turso.tech/
- "Use the index, Luke" (SQL perf): https://use-the-index-luke.com/
- {Project-specific — schema sketch, query-pattern doc, cost forecast}
