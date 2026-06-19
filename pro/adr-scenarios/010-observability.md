# ADR NNN — Observability Stack

> **Scenario starter.** Renumber `NNN`, set the date, and fill in Decision + Consequences. Context, Options, and the Tradeoff matrix are pre-filled — tailor as needed.

## Status
Proposed (YYYY-MM-DD)

## Context

Observability decides what you'll see when something breaks at 2 AM, and what data you'll have when a user reports "it didn't work yesterday". The three pillars are **logs** (what happened), **metrics** (how much/often), and **traces** (the path of a single request across services). Getting nothing in place ends up with print statements and screenshots; getting too much ends up with a $400/mo bill before product-market fit.

Typical drivers for this decision:

1. **Pricing model** — per-event (Sentry), per-GB-ingested (DataDog), per-host (older models), or self-hosted (free + ops cost). Costs diverge sharply at scale.
2. **Cardinality** — number of distinct dimension values per metric. Honeycomb and modern OTLP backends support high cardinality; older systems collapse at "user-id" granularity.
3. **Frontend coverage** — Sentry and DataDog Real User Monitoring (RUM) cover frontend; Prometheus/Grafana traditionally don't.
4. **Three-pillar breadth** — does the platform handle logs + metrics + traces, or just one? Single-pillar tools require glue.
5. **Self-host option** — required for compliance, or for cost control at scale. Grafana stack + Prometheus + Loki + Tempo is the standard self-host kit.
6. **Lock-in via instrumentation** — proprietary SDKs (DataDog, New Relic) lock you in; OpenTelemetry is portable.
7. **Time-to-first-signal** — Sentry catches an error in 10 minutes of setup; OpenTelemetry + a backend takes a day to wire up well.

## Options

### A. Print + platform logs only
- ✅ Zero setup; works the day you deploy
- ✅ Logs are searchable in most platforms (Vercel, Railway, Fly, Cloudflare)
- ❌ No error grouping, no alerting beyond what the platform offers
- ❌ Frontend errors invisible
- ❌ Falls apart above ~1 user

### B. Sentry (error tracking) + platform logs
- ✅ Best-in-class error grouping, release tracking, source-map support
- ✅ Frontend + backend covered with one SDK family
- ✅ Generous free tier (5k errors/mo); affordable to start
- ❌ Not a logs or metrics platform — pair with platform logs and something else for metrics
- ❌ Pricing scales with error volume; an error spike is also a billing spike

### C. DataDog
- ✅ Three pillars in one platform; APM is best-in-class; RUM covers frontend
- ✅ Mature dashboards and alerts
- ❌ Most expensive of the popular options at scale; pricing model has many surface areas
- ❌ Proprietary SDKs lock you in (mitigated if you instrument via OpenTelemetry)

### D. Grafana Cloud (or self-hosted Grafana + Prometheus + Loki + Tempo)
- ✅ Open-source backends; portable; self-host option escapes vendor lock-in
- ✅ Free tier covers small projects
- ❌ More moving parts than single-vendor solutions
- ❌ Frontend monitoring requires a separate tool (Grafana Faro, or Sentry)

### E. OpenTelemetry (instrumentation) + backend of choice
- ✅ Portable instrumentation — switch backends without re-instrumenting
- ✅ Vendor-neutral; growing standard
- ❌ Setup ceremony higher than vendor SDKs
- ❌ Choice paralysis on backend; OTel doesn't store data itself
- ❌ Auto-instrumentation libraries vary in quality

### F. Honeycomb (high-cardinality tracing)
- ✅ Best-in-class for tracing with high-cardinality fields (user-id, request-id, feature flags)
- ✅ Query model designed for "find the slow requests where X" investigations
- ❌ Pricing scales with event volume; can be expensive at high traffic
- ❌ Primarily a tracing/event tool; pair with logging and frontend separately

### G. Axiom / Better Stack / similar newer platforms
- ✅ Modern UX, often generous free tiers, OpenTelemetry-friendly
- ✅ Pricing simpler than DataDog
- ❌ Less mature ecosystem and integrations
- ❌ Maturity varies — evaluate each individually

## Tradeoffs (matrix)

| | Pricing (small) | Cardinality support | Frontend coverage | Three-pillar breadth | Self-host option | Lock-in (SDK level) |
|---|---|---|---|---|---|---|
| Print + platform logs | Free | None | None | Logs only | N/A | None |
| Sentry + platform logs | Free tier 5k/mo | Medium | Excellent | Errors + breadcrumbs | No (Sentry-managed); self-host edition exists | Medium (Sentry SDK) |
| DataDog | Free tier limited | High (with tags) | Yes (RUM) | All three | No | High (proprietary SDK; OTel mitigates) |
| Grafana Cloud / self-host | Free tier; self-host = ops cost | Limited (Prom) / High (Tempo) | Via Faro (separate) | All three (stack) | Yes (full) | Low (Prom, Loki, Tempo) |
| OpenTelemetry + backend | Backend-dependent | Backend-dependent | Yes (OTel browser SDK) | Depends on backend | Depends on backend | None (portable) |
| Honeycomb | Free tier | Excellent | Limited (no RUM) | Tracing-first | No | Medium |
| Axiom / Better Stack / etc. | Generous free tiers | Varies | Varies | Logs-heavy typically | No | Low–Medium |

## Decision

{Chosen stack, one sentence. Most projects end up with 2–3 tools — e.g., "Sentry for errors + frontend; OpenTelemetry → Grafana Cloud for traces and metrics; platform logs for raw logs". State explicitly which pillar each tool covers.}

## Reasoning

- {Driver 1 — e.g., need for low-cost start, cardinality requirement, compliance}
- {Driver 2 — e.g., expected traffic shape; spike-heavy vs steady}
- {Driver 3 — e.g., self-host requirement, vendor-neutrality preference}

## Consequences

### Positive
- {Concrete benefit — e.g., "Frontend errors appear in Sentry within 30s of deploy; release tracking shows which version introduced each regression"}
-

### Negative / trade-offs
- {Cost accepted — e.g., "Two dashboards (Sentry + Grafana) — operators need to know which to open"}
-

### Future implications
- {Exit path; pricing trajectory; what we can answer vs not}
-

## Alternatives considered

- **Print + platform logs** — {reason rejected if applicable}
- **Sentry + platform logs** — {…}
- **DataDog** — {…}
- **Grafana stack** — {…}
- **OpenTelemetry + ___** — {…}
- **Honeycomb** — {…}
- **Axiom / Better Stack / etc.** — {…}

## References

- Sentry: https://sentry.io/pricing/
- DataDog: https://www.datadoghq.com/pricing/
- Grafana Cloud: https://grafana.com/products/cloud/
- OpenTelemetry: https://opentelemetry.io/
- Honeycomb: https://www.honeycomb.io/
- Charity Majors — "Observability ≠ monitoring": https://charity.wtf/2019/02/05/logs-vs-structured-events/
- The 3 pillars of observability (overview): https://www.honeycomb.io/blog/three-pillars-of-observability
- {Project-specific — SLO definitions, expected traffic volume, incident class history}
