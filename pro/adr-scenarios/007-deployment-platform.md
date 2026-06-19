# ADR NNN — Deployment Platform

> **Scenario starter.** Renumber `NNN`, set the date, and fill in Decision + Consequences. Context, Options, and the Tradeoff matrix are pre-filled — tailor as needed.

## Status
Proposed (YYYY-MM-DD)

## Context

Deployment platform decides cold-start latency, geographic coverage, what runtime primitives are available (cron, queues, KV, blob storage), and your monthly bill at small and at scale. Lock-in is real — apps that adopt Vercel's runtime, Cloudflare Workers' Web APIs, or Lambda's response shape are not trivial to move.

Typical drivers for this decision:

1. **Pricing at small scale** — generous free tiers vs hard charges. Critical pre-PMF.
2. **Pricing at scale** — per-invocation, per-GB-second, or fixed-instance billing models behave very differently as traffic grows.
3. **Cold start / latency** — serverless functions cold-start in 50ms–2s depending on runtime and provider. Matters for low-latency user-facing paths.
4. **Geographic coverage** — Edge platforms (Cloudflare, Vercel Edge) deploy globally by default. Region-specific platforms (Fly, Railway) require explicit setup.
5. **Service breadth** — does the platform provide DB, queue, cron, blob storage, KV, secrets? Each missing primitive is a separate vendor.
6. **Lock-in** — "vanilla Node" deployable to anything vs Cloudflare-Workers-specific globals or Vercel-specific edge runtime.
7. **CI/CD integration** — Git-triggered deploys, preview environments per PR. Standard everywhere, but UX varies.

## Options

### A. Vercel
- ✅ Best-in-class Next.js DX; preview deploys per PR; edge + serverless mix
- ✅ Generous hobby tier
- ❌ Pricing scales steeply on bandwidth and function-second usage
- ❌ Lock-in to Next.js features and Vercel's edge runtime grows over time

### B. Netlify
- ✅ Simple static-first model; functions and edge functions available
- ✅ Generous free tier for small sites
- ❌ Less competitive for full-stack apps now that Vercel and Cloudflare have moved
- ❌ Function pricing similar to Vercel; bandwidth caps in lower tiers

### C. Cloudflare (Pages + Workers + D1/R2/KV)
- ✅ Largest edge network; lowest cold-start latency
- ✅ Surprisingly broad primitives (D1 SQLite, R2 object storage, KV, Queues, Cron Triggers, Durable Objects)
- ✅ Generous free tier; pay-per-use scales linearly
- ❌ Workers runtime is Web-API-based (not Node) — many npm packages don't work or need polyfills
- ❌ Younger primitives (D1, Queues) have lower limits and rougher edges than mature alternatives

### D. Fly.io
- ✅ Runs Docker containers; closer to "real servers" model
- ✅ Multi-region deploys; persistent volumes available
- ❌ Free tier removed; minimum cost ~$5/month per app
- ❌ Operational model closer to traditional infra; more knobs

### E. Railway
- ✅ Smooth onboarding for Docker-based apps; one-click Postgres, Redis, etc.
- ✅ Predictable pricing; no minimum
- ❌ Smaller geographic footprint than the edge platforms
- ❌ Single-region by default; multi-region setup is manual

### F. AWS (Lambda + S3 + ALB/CloudFront, or ECS)
- ✅ Most comprehensive primitive set; pricing competitive at scale if used well
- ✅ Maximum flexibility; eventual exit cost spread across many services
- ❌ Steepest learning curve; configuration sprawl across IAM, VPCs, CloudFormation/CDK
- ❌ Easy to leave money on the table or accidentally spend it (unattended Lambdas, NAT Gateway traffic, etc.)

### G. Self-host (VPS — Hetzner / DigitalOcean / Linode + Coolify or plain Docker)
- ✅ Lowest monthly cost at small/medium scale; full control
- ✅ Coolify/Dokku provide PaaS-like ergonomics on your own server
- ❌ You own backups, security patches, monitoring, scaling
- ❌ Outage means you wake up

## Tradeoffs (matrix)

| | Pricing (small) | Pricing (at scale) | Cold start | Geographic coverage | Service breadth | Lock-in risk |
|---|---|---|---|---|---|---|
| Vercel | Free | Steep | Low (edge) / Medium (serverless) | Global edge | DB add-ons via partners | High (Next.js + edge runtime) |
| Netlify | Free | Medium | Low / Medium | Global edge | Limited | Medium |
| Cloudflare | Free, generous | Linear, predictable | Lowest | Largest edge | Broad (D1, R2, KV, Queues…) | Medium (Workers runtime) |
| Fly.io | ~$5/mo min | Predictable | None (long-running) | Multi-region available | Postgres, volumes | Low (Docker) |
| Railway | $5/mo usage start | Predictable | None | Single-region default | DBs, Redis, cron | Low (Docker) |
| AWS | Free tier 12mo | Best at high scale (if optimized) | Low–High depending on service | Global | Complete | Low–Medium (services, not platform) |
| Self-host (VPS) | $5–20/mo | Lowest | None | Single region per server | You own everything | None |

## Decision

{Chosen platform, one sentence. State whether the primary compute is edge-serverless / containerized / VPS, and which auxiliary services come from the same vendor vs separate (e.g., "Cloudflare for compute + Neon for Postgres").}

## Reasoning

- {Driver 1 — e.g., latency budget, cost forecast, runtime familiarity}
- {Driver 2 — e.g., team experience, ops appetite}
- {Driver 3}

## Consequences

### Positive
- {Concrete benefit — e.g., "Preview deploys per PR; review without local setup"}
-

### Negative / trade-offs
- {Cost accepted — e.g., "Workers runtime means we can't use some npm packages without finding alternatives"}
-

### Future implications
- {Exit cost, regional expansion path, scaling ceiling}
-

## Alternatives considered

- **Vercel** — {reason rejected}
- **Netlify** — {…}
- **Cloudflare** — {…}
- **Fly.io** — {…}
- **Railway** — {…}
- **AWS** — {…}
- **Self-host (VPS)** — {…}

## References

- Vercel: https://vercel.com/pricing
- Netlify: https://www.netlify.com/pricing/
- Cloudflare Workers: https://developers.cloudflare.com/workers/
- Fly.io: https://fly.io/
- Railway: https://railway.app/
- AWS Free Tier: https://aws.amazon.com/free/
- Coolify (self-host PaaS): https://coolify.io/
- "The cost of cloud" (Andreessen Horowitz): https://a16z.com/the-cost-of-cloud-a-trillion-dollar-paradox/
- {Project-specific — latency requirements doc, cost forecast spreadsheet}
