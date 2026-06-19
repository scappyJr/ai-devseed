---
description: Plan a DB or data migration with explicit rollback steps
---

Lay out a migration as a numbered plan with an inverse path. The rule: **if you cannot describe how to undo the migration, you do not have a plan — you have a hope.**

## When to use

- Schema changes: add/drop columns, change types, add constraints
- Data backfills that touch existing rows
- Index changes on tables large enough to matter (locking risk)
- Multi-step migrations where one step depends on a previous deploy

**Not** for: trivial dev-only schema changes early in a project where dropping and re-seeding is fine. Use migrations only when there's data to preserve.

## How it works

1. Ask: "What's the migration? (one sentence — what state are you moving from and to?)"
2. Detect the migration system if possible (e.g., `prisma/migrations/`, `db/migrate/`, `alembic/`, `goose/`, raw `.sql/`). Default to "generic SQL" if none found.
3. Pick the next migration number by scanning the existing folder. Default to `001` if first.
4. Pick a slug from the description.
5. Create `docs/migrations/{NNN}-{slug}.md` using the template below.
6. Pre-fill the manifest section with detected tooling and target environments. Leave the rollback SQL/code blocks empty — those require thought, not generation.

## Template

```markdown
# Migration {NNN}: {Title}

**Date drafted**: {YYYY-MM-DD} · **Status**: Draft · **Author**: {name}

## What's changing

**From**: {current schema/data state — be specific, list affected tables/columns}

**To**: {target state}

**Reason**: {1–2 lines. Why this migration is worth its cost.}

## Compatibility

- [ ] **Backwards-compatible**: old code reads new schema correctly (additive only)
- [ ] **Requires app-side change**: app must deploy {before | after | atomic with} the migration
- [ ] **Breaking**: app cannot tolerate either schema for any period — requires downtime or coordinated deploy

If "Breaking", redesign the migration into two backwards-compatible steps if at all possible.

## Steps

| # | Action | Reversible? | Notes |
|---|---|---|---|
| 1 | {SQL or operation, e.g., `ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT false`} | Yes / No | {locking, duration estimate, online-DDL caveats} |
| 2 | {Backfill, e.g., `UPDATE users SET email_verified = true WHERE created_at < '2024-01-01'`} | No (destructive) | {batch size, retry behavior} |
| 3 | {Constraint, e.g., `ALTER TABLE users ALTER COLUMN email_verified SET NOT NULL`} | Yes (drop NOT NULL) | {requires step 2 to be complete} |

**Estimated total runtime**: {seconds | minutes | hours}. If hours, plan for online execution and document the locking behavior.

## Rollback

For each step above, the inverse:

| # | Inverse action | Notes |
|---|---|---|
| 1 | {`ALTER TABLE users DROP COLUMN email_verified`} | Safe; column was nullable until step 3 |
| 2 | (no inverse for backfill, data lost) | Snapshot before step 2 — see Backup |
| 3 | {`ALTER TABLE users ALTER COLUMN email_verified DROP NOT NULL`} | Restores tolerance for nulls |

If any step has "no inverse", the **Backup** section below must cover it.

## Backup

Before running any non-reversible step:

- [ ] {Concrete snapshot command — `pg_dump`, `mysqldump`, S3 export, file-system snapshot, …}
- [ ] {Verification — restored copy on a scratch DB returns expected rows}
- [ ] {Retention — keep snapshot for at least {N} days post-migration in case rollback is needed late}

## Dry run

- [ ] Apply migration on a copy of production-shaped data (staging or local restore)
- [ ] Verify row counts, sample queries, app smoke test against migrated DB
- [ ] Time the slowest step against realistic row counts — does it fit the maintenance window?

## Execution plan

- **Environment order**: {dev → staging → prod | dev → prod for solo project}
- **Window**: {time, expected duration, who is awake}
- **Rollback decision point**: by {time}, if {condition}, run rollback steps {1, 2, 3}
- **Communication**: {users notified at {when}; status page; nothing if user-invisible}

## Post-migration verification

- [ ] Row counts match expectations
- [ ] App functionality smoke-tested
- [ ] Old code path (if not yet removed) still works on new schema
- [ ] Monitoring shows no error spike
- [ ] Backup retained per Backup section
```

## Rules

- **No rollback = no migration.** If you cannot describe the inverse of every step (or how the Backup covers what's irreversible), do not run the migration.
- **Backfills are not reversible.** Treat them as one-way and rely on backups, not "undo" SQL.
- **Document the runtime estimate.** A 6-hour `ALTER TABLE` on a live system is a different operation than a 6-second one — the rollback decision changes accordingly.
- **One migration per file.** Don't bundle. If two changes are coupled in time but independent in failure mode, write two migration plans.
