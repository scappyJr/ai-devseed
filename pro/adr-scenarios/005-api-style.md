# ADR NNN — API Style

> **Scenario starter.** Renumber `NNN`, set the date, and fill in Decision + Consequences. Context, Options, and the Tradeoff matrix are pre-filled — tailor as needed.

## Status
Proposed (YYYY-MM-DD)

## Context

API style decides how the frontend talks to the backend, and how external clients (mobile, third-party integrations, CLI) interact with your services. The choice affects type safety across the wire, caching strategy, versioning model, and how easy it is to onboard a new client.

Typical drivers for this decision:

1. **Frontend ↔ backend coupling** — same team and language (TS on both sides) unlocks tRPC; different teams or polyglot stacks favor REST or GraphQL.
2. **End-to-end type safety** — tRPC and GraphQL with codegen give you compile-time errors on contract mismatches; REST relies on OpenAPI codegen or hope.
3. **Versioning model** — REST versions via URL/header, GraphQL deprecates fields, tRPC re-deploys the contract. Migration friction differs.
4. **Caching strategy** — REST plays nicely with HTTP caching (CDN, browser cache); GraphQL needs client-side cache (Apollo, urql, Relay) and is harder to CDN-cache.
5. **Tooling and discoverability** — OpenAPI/Swagger UI for REST; GraphiQL for GraphQL; tRPC has no inspector but has autocomplete in the IDE.
6. **Third-party / mobile-client friendliness** — REST has the broadest client support; GraphQL needs a client library; tRPC is TS-only.
7. **Server complexity** — REST is the most "just-write-a-handler"; GraphQL adds schema + resolvers + N+1 considerations.

## Options

### A. REST + OpenAPI (Swagger)
- ✅ Universal — every language has a client; CDN-cacheable; works with browser tools
- ✅ Easy to evolve incrementally (add fields, add endpoints)
- ❌ Versioning is your problem (`/v1/`, `/v2/`, deprecation, header negotiation)
- ❌ Type safety requires generating clients from OpenAPI (extra build step) or living with `any`

### B. GraphQL
- ✅ Single endpoint, clients ask for the fields they need (reduced over-fetching)
- ✅ Strongly-typed schema; introspection enables GraphiQL and codegen
- ❌ Caching is client-side (Apollo, urql); CDN caching is hard
- ❌ N+1 query risk on the server; needs DataLoader pattern
- ❌ More moving parts than REST for small projects

### C. tRPC
- ✅ End-to-end type safety with zero codegen (TypeScript inference)
- ✅ Minimal boilerplate; routers feel like ordinary functions
- ❌ TypeScript-only on both sides (or use OpenAPI plugin for non-TS clients)
- ❌ Not designed for third-party clients (no schema document by default)
- ❌ Couples deployment of frontend and backend (changes ship together for type safety)

### D. JSON-RPC
- ✅ Simple — methods over HTTP POST with JSON body
- ✅ Easy to evolve (methods are versioned independently)
- ❌ Smaller ecosystem; you'll be writing more glue
- ❌ Not RESTful caching; no built-in convention for pagination, filtering

### E. gRPC (internal services)
- ✅ Strongly-typed via Protobuf, excellent for high-throughput service-to-service
- ✅ HTTP/2 streaming built-in
- ❌ Browser support requires gRPC-Web bridge; non-trivial setup
- ❌ Overkill for most web/mobile-facing APIs; better as internal-only

## Tradeoffs (matrix)

| | E2E type safety | Caching ease (CDN/browser) | Versioning model | Tooling / discoverability | Mobile / 3rd-party friendly | Server complexity |
|---|---|---|---|---|---|---|
| REST + OpenAPI | Via codegen | Excellent | URL/header, manual | Swagger UI, OpenAPI ecosystem | Excellent | Low |
| GraphQL | Via codegen | Hard (client-side) | Field deprecation | GraphiQL, schema introspection | Good (client lib needed) | Medium |
| tRPC | Built-in (TS) | Same as REST under the hood | Re-deploy contract | IDE autocomplete (no UI) | TS-only by default | Low |
| JSON-RPC | Manual | OK (POSTs) | Per-method versioning | Minimal | OK | Low |
| gRPC | Built-in (Protobuf) | N/A (binary, HTTP/2) | Protobuf compat rules | grpcurl, BloomRPC | Bridge required for browser | Medium |

## Decision

{Chosen API style, one sentence. Often more than one — e.g., "tRPC for the web app; REST + OpenAPI for the mobile and third-party API surface". State the boundary if applicable.}

## Reasoning

- {Driver 1 — e.g., team's full-stack TypeScript, no external clients yet}
- {Driver 2 — e.g., need for CDN caching on most reads}
- {Driver 3}

## Consequences

### Positive
- {Concrete benefit — e.g., "Renaming a field is one rename in the router; both client and server fail to compile if anything's missed"}
-

### Negative / trade-offs
- {Cost accepted — e.g., "Frontend and backend deploy together; we accept the coordination cost"}
-

### Future implications
- {What this locks in — e.g., "Adding a third-party API surface later means adding REST + OpenAPI alongside tRPC"}
-

## Alternatives considered

- **REST + OpenAPI** — {reason rejected}
- **GraphQL** — {…}
- **tRPC** — {…}
- **JSON-RPC** — {…}
- **gRPC** — {…}

## References

- REST + OpenAPI: https://www.openapis.org/
- GraphQL: https://graphql.org/
- tRPC: https://trpc.io/
- JSON-RPC 2.0 spec: https://www.jsonrpc.org/specification
- gRPC: https://grpc.io/
- "Choose Boring Technology" (Dan McKinley): https://boringtechnology.club/
- {Project-specific — client surface inventory, latency budget, traffic shape}
