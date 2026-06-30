export interface TradeoffEntry {
  id: string;
  pair: string;
  domain: 'frontend' | 'backend' | 'infra' | 'system-design' | 'ai';
  axis: string;
  gains: string[];
  costs: string[];
  chooseAWhen: string;
  chooseBWhen: string;
  pickIfAsked: string;
  trap: string;
  analogy?: string;
  crossReference?: { tab: string; section: string };
}

export const TRADEOFFS: TradeoffEntry[] = [
  // ─── FRONTEND ─────────────────────────────────────────────────────────────

  {
    id: 'csr-vs-ssr-vs-ssg',
    pair: 'CSR vs. SSR vs. SSG',
    domain: 'frontend',
    axis:
      'Where rendering work happens and when HTML reaches the browser — tradeoff between time-to-first-byte, interactivity cost, and data freshness.',
    gains: [
      'SSR: HTML delivered on first request — crawlers and users see content immediately, no JS parse delay before content.',
      'SSR: SEO without any extra config — the HTML response is already fully formed.',
      'SSR: personalized content without a loading spinner — the server can access session/cookies before render.',
    ],
    costs: [
      'SSR: server CPU on every request — each page load is a render cycle, not a cache hit.',
      'SSR: cold-start latency on serverless — if a Lambda is spinning up, TTFB spikes.',
      'SSR: hydration cost on client — React still ships the JS and reconciles the server HTML, so TTI can lag even after TTFB is great.',
    ],
    chooseAWhen:
      'Content is personalized, changes per-user, or requires auth (dashboards, feeds, account pages) — SSR delivers the right content on first load without a spinner.',
    chooseBWhen:
      'Content is static or changes infrequently (marketing pages, docs, blogs) — SSG pre-renders at build time so every request is a CDN cache hit with ~0ms server latency.',
    pickIfAsked:
      'Default to SSR for personalized content; SSG for public pages; CSR only for auth-gated apps where SEO does not matter and you want a simple deployment model.',
    trap:
      "Assuming SSR is always better for performance — SSG is faster for cacheable content because there's no server render at request time at all. The trap is conflating 'server renders it' with 'it's fast.'",
    analogy:
      'SSR is a made-to-order restaurant: every dish is fresh but someone has to cook it right now. SSG is a buffet: everything is already out and ready, but it was made at breakfast.',
  },

  {
    id: 'client-state-vs-server-state',
    pair: 'Client-side State (Redux/Zustand) vs. Server State (React Query/SWR)',
    domain: 'frontend',
    axis:
      'Whether the UI owns its data model or treats the server as the source of truth — the tradeoff between responsiveness and consistency.',
    gains: [
      'Client state: instant UI response — no network round-trip before state updates.',
      'Client state: works offline — state persists across navigation without re-fetching.',
      'Client state: fine-grained control over update timing and batching.',
    ],
    costs: [
      'Client state: you now own synchronization — when the server updates, you need to manually invalidate and re-fetch.',
      'Client state: stale data risk — a cache that never refetches is eventually just wrong.',
      'Client state: boilerplate overhead — reducers, actions, selectors for data that already lives on the server.',
    ],
    chooseAWhen:
      "State is truly client-only — UI preferences, multi-step form state, ephemeral wizard progress, undo/redo history — that has no server representation.",
    chooseBWhen:
      "State is a remote resource that other users or processes can mutate — user profile, order status, notifications — React Query's stale-while-revalidate keeps it fresh automatically.",
    pickIfAsked:
      'Default to React Query/SWR for anything that comes from an API. Reserve Zustand/Redux for UI state that genuinely has no server equivalent. The constraint that flips it: if you need offline-first behavior, you need an explicit client store.',
    trap:
      "Putting server-fetched data into Redux and writing reducers to 'update' it — you've reimplemented a database client with worse caching semantics than React Query.",
    analogy:
      'Using Redux for server data is like keeping a handwritten copy of a Google Doc locally and manually typing in changes whenever the doc updates.',
  },

  {
    id: 'monolith-frontend-vs-micro-frontends',
    pair: 'Monolith Frontend vs. Micro-Frontends',
    domain: 'frontend',
    axis:
      'Whether frontend teams deploy independently at the cost of runtime composition overhead and shared-state complexity.',
    gains: [
      'Micro-frontends: separate teams deploy independently — no release coordination, no shared branching strategy.',
      'Micro-frontends: failure isolation — a crash in one micro-frontend does not take down the whole shell.',
      'Micro-frontends: separate tech stacks per domain if needed.',
    ],
    costs: [
      'Micro-frontends: runtime overhead — each micro-frontend ships its own copy of React, adding bundle weight.',
      'Micro-frontends: shared state is hard — cross-boundary communication via custom events or shared stores adds coordination cost.',
      'Micro-frontends: consistent UX requires active enforcement — design system adoption breaks down when teams are truly separate.',
    ],
    chooseAWhen:
      "You have 3+ frontend teams with separate release cadences and the coordination overhead of a shared monorepo is the actual bottleneck — not a hypothetical future problem.",
    chooseBWhen:
      "You have one or two frontend teams — the overhead of runtime module federation, independent CI pipelines, and cross-boundary state management costs more than it saves.",
    pickIfAsked:
      'Default to a monolith frontend with a shared component library. Micro-frontends solve an organizational problem, not a technical one — the constraint that flips it is hitting release-train coordination failures in practice.',
    trap:
      "Adopting micro-frontends because microservices worked on the backend — the decomposition problems are different. Backend services have clear data ownership; frontends share a DOM, a router, and a design system.",
    analogy:
      'Micro-frontends are like separate food trucks sharing a parking lot — each operator is autonomous, but customers still expect one menu board and one checkout process.',
  },

  {
    id: 'optimistic-vs-pessimistic-ui',
    pair: 'Optimistic UI Updates vs. Wait-for-Server Confirmation',
    domain: 'frontend',
    axis:
      'Whether the UI assumes success and rolls back on failure, or blocks interaction until the server responds — tradeoff between perceived speed and correctness guarantees.',
    gains: [
      'Optimistic: instant perceived responsiveness — the UI feels fast because it updates before any network round-trip.',
      'Optimistic: hides network latency from users in happy-path flows.',
      'Optimistic: works naturally with offline-first patterns.',
    ],
    costs: [
      'Optimistic: rollback UX is hard to get right — when the server fails, you need to undo the change visibly without disorienting the user.',
      'Optimistic: conflict risk — two clients optimistically updating the same resource can diverge.',
      'Optimistic: not appropriate for any action with external side effects (payment charge, email send) where showing success before it happens is actively misleading.',
    ],
    chooseAWhen:
      'The success rate is very high (>99%), the failure UX is safe to roll back visually (like/unlike, checkbox, drag-drop reorder), and latency is the main UX problem.',
    chooseBWhen:
      'The action has real-world side effects that cannot be undone (financial transactions, published content, destructive deletes) — showing a spinner and waiting is the right choice.',
    pickIfAsked:
      'Default to optimistic updates for low-stakes, high-frequency interactions (likes, checkboxes, reorder). Always wait for confirmation before telling the user money moved or an email was sent.',
    trap:
      "Applying optimistic updates to financial or irreversible actions because 'the API is usually fast' — you are one transient failure away from showing a user that their payment succeeded when it did not.",
    analogy:
      "Optimistic UI is like nodding 'got it' before you've actually read the message — works fine 99% of the time, awkward when you have to come back and say 'actually I missed that.'",
  },

  // ─── BACKEND ──────────────────────────────────────────────────────────────

  {
    id: 'monolith-vs-microservices',
    pair: 'Modular Monolith vs. Microservices',
    domain: 'backend',
    axis:
      'Whether deployment units map to team boundaries and scale independently, at the cost of distributed systems complexity.',
    gains: [
      'Monolith: one deploy, one transaction boundary, trivial cross-module refactors, no network calls between modules.',
      'Monolith: far simpler local development and debugging — one process, one stack trace.',
      'Microservices: independent scaling and deployment per service.',
      "Microservices: failure isolation — one service's outage does not necessarily take down the rest.",
    ],
    costs: [
      'Monolith: scaling is all-or-nothing; a hot module forces scaling the whole app.',
      'Monolith: a team boundary mismatch — many teams shipping to one codebase causes coordination overhead.',
      'Microservices: network calls replace function calls — new latency, new failure modes, new debugging surface.',
      'Microservices: operational overhead — N services means N deployment pipelines, N sets of dashboards, distributed transactions to reason about.',
    ],
    chooseAWhen:
      "Team is under ~20 engineers, deployment friction is not yet the bottleneck, and the domain model is still evolving — premature decomposition locks you into service boundaries you'll regret.",
    chooseBWhen:
      'Multiple teams are blocked waiting on each other to deploy, specific services need radically different scaling profiles (e.g. image processing vs. user lookup), or you need independent failure isolation between critical paths.',
    pickIfAsked:
      'Start with a well-structured monolith. Extract services when team coordination or scaling requirements actually demand it, not as a default architecture.',
    trap:
      "Designing a microservices architecture on day one because it's 'how Netflix does it' — Netflix had thousands of engineers and a decade of monolith pain before decomposing.",
    analogy:
      'Microservices are like separate apartments in a building — each tenant is independent, but now you need an HOA, shared utilities contracts, and a way for tenants to talk without shouting through walls.',
    crossReference: { tab: 'backend', section: 'architecture-patterns' },
  },

  {
    id: 'offset-vs-cursor-pagination',
    pair: 'Offset Pagination vs. Cursor Pagination',
    domain: 'backend',
    axis:
      'Whether you navigate a result set by position or by a stable bookmark — tradeoff between flexibility and consistency under concurrent writes.',
    gains: [
      'Offset: trivial to implement, supports jumping to an arbitrary page number.',
      'Offset: works naturally with "page 1, 2, 3..." UI controls.',
      'Cursor: stable under concurrent inserts/deletes — no skipped or duplicated rows.',
      'Cursor: O(1) performance regardless of how deep you page (no OFFSET table scan).',
    ],
    costs: [
      'Offset: large OFFSET values force the database to scan and discard rows — gets slower the deeper you page.',
      'Offset: rows shifting during pagination cause skipped or duplicated results.',
      'Cursor: cannot jump to an arbitrary page — only forward/backward from a known point.',
      'Cursor: requires a stable, indexed sort key (often a composite of timestamp + id).',
    ],
    chooseAWhen:
      'Data is static or rarely mutated, users need to jump to arbitrary pages (page 47 of 100), and total count display matters.',
    chooseBWhen:
      'Data is live (rows are inserted/deleted while users paginate), result sets are large, or you need infinite scroll — offset pagination produces skipped or duplicated rows when rows shift.',
    pickIfAsked:
      'Default to cursor pagination for any real-time feed or large dataset. Use offset only for admin tables on append-only data where page-jumping UX matters.',
    trap:
      'Using OFFSET on a 10M-row table in production — PostgreSQL still scans and discards the first N rows on every query, so page 500 of your user list takes seconds.',
    analogy:
      "Offset pagination is like bookmarking 'page 47' in a book where pages can be added or removed — your bookmark now points to the wrong chapter.",
    crossReference: { tab: 'backend', section: 'api-design' },
  },

  {
    id: 'sync-vs-async-communication',
    pair: 'Synchronous vs. Asynchronous Service Communication',
    domain: 'backend',
    axis:
      'Whether a service waits for a response before continuing, coupling its availability to the downstream service.',
    gains: [
      'Sync: simple to reason about — caller gets an immediate result or error.',
      'Sync: easy to trace a single request through a call chain.',
      "Async: services stay decoupled — a downstream outage doesn't cascade to callers.",
      'Async: natural load leveling via a queue/broker absorbing bursts.',
    ],
    costs: [
      "Sync: tight coupling to downstream availability — if it's down, you're down (or you need a fallback).",
      'Sync: latency stacks up across a chain of synchronous calls.',
      "Async: eventual consistency — the caller can't assume the effect happened yet.",
      'Async: harder to trace and debug a logical "request" spread across many events.',
    ],
    chooseAWhen:
      'The caller needs the result to continue (user login, payment confirmation, search results) — async here would require polling or webhooks and adds complexity without benefit.',
    chooseBWhen:
      'The caller can proceed without the result (email send, audit log write, analytics event, image resize) — async decouples services and absorbs traffic spikes via a queue.',
    pickIfAsked:
      'Default to sync for user-facing read paths where results are needed immediately; async for work that can be queued and processed later without blocking the user.',
    trap:
      'Making everything async because it sounds more scalable — async adds observability complexity, retry logic, and dead-letter queues. Synchronous calls are simpler to reason about and debug.',
    analogy:
      'Async communication is like dropping a letter in a mailbox — you walk away immediately and trust it will arrive. Sync is a phone call — you wait for an answer before hanging up.',
    crossReference: { tab: 'backend', section: 'microservices-communication' },
  },

  {
    id: 'optimistic-vs-pessimistic-locking',
    pair: 'Optimistic vs. Pessimistic Locking',
    domain: 'backend',
    axis:
      'Whether you prevent conflicts upfront by holding a lock, or detect conflicts on commit — tradeoff between throughput under low contention and safety under high contention.',
    gains: [
      'Optimistic: no locks held — high throughput under low contention.',
      'Optimistic: naturally distributed-friendly, no lock coordination needed.',
      'Pessimistic: guarantees no conflicting writes — caller never has to retry.',
      'Pessimistic: simpler reasoning for high-contention hot rows (e.g. inventory counters).',
    ],
    costs: [
      'Optimistic: caller must detect the version mismatch and retry the transaction.',
      'Optimistic: degrades badly under high contention — many wasted retries.',
      'Pessimistic: holds a row lock for the transaction duration, reducing concurrency.',
      'Pessimistic: risk of deadlocks if multiple transactions lock rows in different orders.',
    ],
    chooseAWhen:
      'Read-heavy workloads with rare write conflicts — optimistic locking has near-zero overhead when conflicts do not occur.',
    chooseBWhen:
      'High write contention on the same rows (inventory, seat reservations, bank transfers) — pessimistic locking prevents the wasted work of computing a change that will be rejected.',
    pickIfAsked:
      'Default to optimistic locking (via version columns) unless you can demonstrate high contention on specific rows. Pessimistic locks block readers and serialize writes globally.',
    trap:
      "Using pessimistic locks everywhere 'to be safe' — you've serialized a concurrent system. Under load, contention on the lock itself becomes the bottleneck.",
    analogy:
      'Optimistic is like two people editing a Google Doc simultaneously and merging conflicts afterward. Pessimistic is locking the document to one editor at a time — nothing conflicts, but only one person can work.',
    crossReference: { tab: 'backend', section: 'databases-transactions' },
  },

  {
    id: 'sql-vs-nosql',
    pair: 'SQL vs. NoSQL',
    domain: 'backend',
    axis:
      'Schema enforcement and join expressiveness vs. horizontal write scalability and flexible document shapes.',
    gains: [
      'SQL: ACID transactions across tables — joins, constraints, and referential integrity enforced by the database.',
      'SQL: expressive ad-hoc queries — schema is known, so you can query in ways you did not anticipate at design time.',
      'SQL: decades of tooling, operational experience, and DBA knowledge.',
    ],
    costs: [
      'SQL: vertical scaling hits a wall — a single primary can only get so big before write throughput becomes the bottleneck.',
      'SQL: schema migrations on large tables are operationally painful — adding a column to a 100M-row table requires careful planning.',
      'SQL: denormalized read patterns require joins, which add query complexity and latency as data grows.',
    ],
    chooseAWhen:
      'Data has clear relationships, you need transactions across multiple entities, or query patterns are unknown — relational databases handle ad-hoc queries that document stores cannot.',
    chooseBWhen:
      'Write throughput exceeds single-node capacity, data is naturally document-shaped with no cross-document joins, or you need global horizontal sharding from the start (DynamoDB, Cassandra).',
    pickIfAsked:
      'Default to PostgreSQL. It handles more NoSQL-style workloads (JSONB, partitioning, logical replication) than people realize. Switch to NoSQL when you have a concrete sharding or schema-flexibility requirement.',
    trap:
      "Choosing NoSQL for 'flexibility' because you do not know your schema yet — schema-on-read does not remove structure, it just moves enforcement to application code where it is harder to find bugs.",
    analogy:
      'SQL is a well-organized filing cabinet with labeled folders — finding anything cross-referenced is easy, but adding a new category requires reorganizing. NoSQL is a pile of folders you can add to instantly, but finding something that spans multiple folders requires digging.',
  },

  {
    id: 'normalization-vs-denormalization',
    pair: 'Normalization vs. Denormalization',
    domain: 'backend',
    axis:
      'Whether you optimize for write integrity and storage efficiency, or read performance and query simplicity — with data duplication as the price of the latter.',
    gains: [
      "Normalization: single source of truth — updating a user's name in one place is reflected everywhere instantly.",
      'Normalization: smaller storage footprint — no duplicated data.',
      'Normalization: write anomalies are impossible — you cannot have two rows disagree on a fact.',
    ],
    costs: [
      'Normalization: joins everywhere — a product page might need 5+ joins to assemble what the user sees.',
      'Normalization: read performance degrades under join overhead at scale.',
      'Normalization: schema changes cascade through every join-dependent query.',
    ],
    chooseAWhen:
      'Write correctness matters more than read speed — financial ledgers, user identity, inventory systems where having two rows with different prices for the same product is catastrophic.',
    chooseBWhen:
      'Read volume dwarfs write volume, latency is the primary constraint, and the data you are denormalizing is stable (product names, user display names do not change every second).',
    pickIfAsked:
      'Normalize by default; denormalize specific read paths under measurement. The constraint that flips it: if a dashboard query needs 8 joins to load and p99 latency is already the product risk, denormalize that specific read model.',
    trap:
      "Denormalizing everything upfront 'for performance' before you have any latency data — you've created a consistency problem you'll be managing forever in exchange for a performance gain you haven't measured yet.",
    analogy:
      'Normalization is keeping one master contact list and referencing it everywhere. Denormalization is printing that contact list on every document that needs it — faster to read, but if a phone number changes you are reprinting everything.',
  },

  // ─── INFRA ────────────────────────────────────────────────────────────────

  {
    id: 'cache-aside-vs-write-through',
    pair: 'Cache-Aside vs. Write-Through vs. Write-Behind',
    domain: 'infra',
    axis:
      'Who is responsible for keeping the cache populated — the application on reads vs. the write path automatically — and what that means for cache freshness and failure modes.',
    gains: [
      'Cache-aside: cache being down degrades to slower, not broken — the app falls through to the database.',
      'Cache-aside: only data that is actually read gets cached — no wasted cache warming of cold data.',
      'Write-through: cache is always warm — reads never miss after the first write.',
    ],
    costs: [
      'Cache-aside: cache miss on cold start or eviction — the first request always hits the database.',
      'Cache-aside: race condition window — two simultaneous cache misses can both hit the DB and write stale values.',
      'Write-through: wasted cache warming — you are caching data that may never be read again.',
    ],
    chooseAWhen:
      'Read-heavy workload with low update frequency and tolerance for cache miss latency — cache-aside is the safe default.',
    chooseBWhen:
      'Read-after-write consistency is critical (user profile updates that must be immediately visible), and your write volume is low enough that always-warm cache is affordable.',
    pickIfAsked:
      'Default to cache-aside with LRU eviction. It is the simplest pattern and fails gracefully. Switch to write-through when you need guaranteed read-after-write consistency at the cost of write overhead.',
    trap:
      'Setting no TTL on a cache-aside cache — you now have a cache that serves stale data until the process restarts, which is the worst of both worlds: you do not get freshness, and you cannot predict when the stale data expires.',
    analogy:
      'Cache-aside is stocking the fridge only with food you actually eat. Write-through is putting every grocery purchase straight into the fridge whether you plan to eat it this week or not.',
    crossReference: { tab: 'infra', section: 'caching' },
  },

  {
    id: 'serverless-vs-always-on',
    pair: 'Serverless vs. Always-On Containers',
    domain: 'infra',
    axis:
      'Whether compute scales to zero between requests at the cost of cold-start latency and execution time limits, or stays running for predictable latency with fixed baseline cost.',
    gains: [
      'Serverless: zero idle cost — you pay per invocation, not for reserved capacity.',
      'Serverless: no servers, clusters, or scaling config to manage at all.',
      'Containers: no cold starts on a warm fleet, predictable latency.',
      'Containers: no execution time limit — fits long-running processes, WebSocket connections, background workers.',
    ],
    costs: [
      'Serverless: cold starts add latency after idle periods, worse for heavier runtimes (JVM, .NET).',
      'Serverless: hard execution time limits make it the wrong tool for long batch jobs.',
      'Containers: you pay for capacity whether or not it is used.',
      'Containers: more operational surface to set up — image builds, registries, deployment pipelines.',
    ],
    chooseAWhen:
      'Workload is bursty or event-driven, cold-start latency is acceptable, and cost efficiency at low average utilization matters — async jobs, webhooks, ETL triggers.',
    chooseBWhen:
      'Your workload is latency-sensitive (user-facing API with p99 SLA), long-running (model inference, video processing), or has warm connection requirements (database connection pools).',
    pickIfAsked:
      'Default to containers for user-facing services where cold-start latency would be user-visible. Use serverless for async/event-driven work where you would otherwise be paying for idle capacity.',
    trap:
      "Putting a high-traffic API behind Lambda without a provisioned concurrency allocation — the first request after any cold period gets the cold-start penalty, and under bursty traffic you can hit concurrency limits that queue or drop requests.",
    analogy:
      'Serverless is a taxi — no fixed cost, but you wait for it to arrive. Always-on containers are a company car — always in the parking lot, costs money even when parked.',
    crossReference: { tab: 'infra', section: 'serverless-compute' },
  },

  {
    id: 'diy-auth-vs-managed',
    pair: 'Rolling Your Own Auth vs. Auth0 / Clerk / Cognito',
    domain: 'infra',
    axis:
      'Whether your team owns the full auth security surface and compliance burden, or delegates it to a managed platform at per-MAU cost.',
    gains: [
      'DIY: full control over the data model, storage, and auth flow — no vendor dependency.',
      'DIY: no per-MAU billing that becomes painful as you scale.',
      'Managed: handles MFA, social login, token rotation, brute-force protection, and compliance features out of the box.',
      'Managed: faster time to launch — auth UX is notoriously hard to get right and test thoroughly.',
    ],
    costs: [
      'DIY: you now own the hardest part of the security surface. Password reset flows, session management, MFA, and breach response are all yours.',
      'DIY: auth is also a compliance problem (SOC2, GDPR session handling, audit logs) — managed platforms come with that coverage.',
      'Managed: per-MAU pricing can become significant at consumer scale (Auth0 especially).',
      "Managed: customizing beyond the vendor's happy path (custom session logic, unusual token claims) often hits a wall.",
    ],
    chooseAWhen:
      "Per-MAU pricing becomes material at your user volume, you need custom session logic the vendor's happy path does not support, or you have security/compliance requirements that mandate on-premise credential storage.",
    chooseBWhen:
      'Team is small, auth is not a core differentiator, and you need MFA, social login, enterprise SSO, and breach protection faster than you can build them — managed platforms buy back months of engineering time.',
    pickIfAsked:
      'Default to a managed platform. The security surface, compliance requirements, and edge cases are genuinely hard to get right from scratch. Switch to DIY only when you have a concrete requirement the vendor cannot meet.',
    trap:
      "Rolling your own auth because the team 'knows security' — auth edge cases (password reset flows, MFA recovery, brute-force protection, session fixation, breach notification) compound quickly. Knowing security principles is not the same as having shipped a secure auth system through multiple incident response cycles.",
    analogy:
      'Building your own auth is like building your own payment processor — technically possible, but the liability and edge-case complexity far exceed what you would expect from the happy-path implementation.',
    crossReference: { tab: 'infra', section: 'auth' },
  },

  {
    id: 'l4-vs-l7-load-balancing',
    pair: 'Layer 4 vs. Layer 7 Load Balancing',
    domain: 'infra',
    axis:
      'Whether routing decisions are made at the TCP connection level or at the HTTP request level — tradeoff between throughput and routing intelligence.',
    gains: [
      'Layer 4: Extremely fast routing — handles TCP/UDP protocols without parsing packet payloads (reads headers only).',
      'Layer 4: Lower CPU utilization on load balancers. High packets-per-second throughput.',
      'Layer 7: Highly flexible routing — inspects URL paths, headers, cookies, and HTTP request bodies.',
      'Layer 7: Enables canary deployments, path-based routing (e.g. /api/users goes to User Service), and SSL termination.',
    ],
    costs: [
      'Layer 4: Cannot perform header manipulation, path-based routing, or SSL termination.',
      'Layer 4: Hard to balance traffic evenly for long-lived TCP multiplexed connections.',
      'Layer 7: Significant CPU overhead due to complete TLS termination and packet payload parsing.',
      'Layer 7: Higher latency per proxy hop compared to L4.',
    ],
    chooseAWhen:
      'Non-HTTP traffic (game servers, IoT, database proxies), ultra-low latency requirements, or you need raw throughput and can accept dumb routing.',
    chooseBWhen:
      'You need path-based routing (/api/* vs /static/*), A/B testing via headers, WebSocket handling, or gRPC load balancing — anything that requires reading the request.',
    pickIfAsked:
      'Default to L7 (ALB/nginx/Envoy) for web applications — the routing intelligence pays for itself. Use L4 (NLB) for non-HTTP protocols or when you need the absolute minimum forwarding latency.',
    trap:
      "Using L4 for a microservices setup and then wondering why you cannot do path-based routing to different services — you've routed at the wrong layer for your use case.",
    analogy:
      'L4 is a postal sorter that routes by zip code — fast, but it does not open the envelope. L7 reads the letter and routes based on the content — slower, but it can send different paragraphs to different departments.',
    crossReference: { tab: 'system-design', section: 'load-balancing' },
  },

  // ─── SYSTEM DESIGN ────────────────────────────────────────────────────────

  {
    id: 'vertical-vs-horizontal-scaling',
    pair: 'Vertical Scaling vs. Horizontal Scaling',
    domain: 'system-design',
    axis:
      'Whether you grow capacity by making one machine bigger or adding more machines — tradeoff between operational simplicity and ceiling/cost.',
    gains: [
      'Vertical: Easy implementation — zero changes to application code or architecture.',
      'Vertical: Keeps database joins simple (everything resides on one disk).',
      'Horizontal: No hardware scaling ceiling — just keep adding cheap servers.',
      'Horizontal: Built-in redundancy — if one instance crashes, load balancers bypass it.',
    ],
    costs: [
      'Vertical: Hard physical ceiling — you can only buy a machine so large.',
      'Vertical: Represents a single point of failure (no redundancy).',
      'Horizontal: Mandates that all application servers be completely stateless.',
      'Horizontal: Relational joins across nodes become difficult or impossible.',
    ],
    chooseAWhen:
      'Database primary nodes, stateful single-process services, or early-stage products where operational simplicity matters more than the scaling ceiling — a bigger box is much simpler to operate than a distributed system.',
    chooseBWhen:
      'You have hit the ceiling of available hardware, need geographic distribution, or want fault tolerance via redundancy — no single machine can become a SPOF.',
    pickIfAsked:
      'Scale vertically first — it is faster and simpler. Switch to horizontal when you have hit the hardware ceiling or need multi-region, not before.',
    trap:
      "Horizontally scaling a stateful service without solving session affinity — you've distributed the problem and added a load balancer, but users now randomly lose state when they hit different nodes.",
    analogy:
      'Vertical scaling is upgrading from a sedan to a truck. Horizontal scaling is running a fleet of sedans. The truck is simpler to manage; the fleet has no ceiling but requires coordination.',
    crossReference: { tab: 'system-design', section: 'scaling-patterns' },
  },

  {
    id: 'strong-vs-eventual-consistency',
    pair: 'Strong Consistency vs. Eventual Consistency',
    domain: 'system-design',
    axis:
      'Whether every read reflects the latest write globally, at the cost of latency and availability, or whether replicas converge over time to allow faster, always-available reads.',
    gains: [
      'Strong: reads always reflect the latest write — no stale data risk, no divergence between nodes.',
      'Strong: simpler application logic — you do not need to reason about what version of the truth each read returns.',
      'Strong: required for correctness in financial and inventory systems.',
    ],
    costs: [
      'Strong: latency cost — the write must be acknowledged by a quorum before returning.',
      'Strong: availability sacrifice — if network partition isolates nodes, strong consistency chooses unavailability over serving stale data (CAP theorem).',
      'Strong: limits geographic distribution — writing to a primary in us-east and reading from eu-west incurs cross-region round-trip latency.',
    ],
    chooseAWhen:
      "Correctness is non-negotiable: bank balance, inventory count, booking systems where two users simultaneously seeing 'available' and both booking is catastrophic.",
    chooseBWhen:
      'Availability and low latency matter more than perfect freshness: social feeds, analytics counters, product catalog caches — a follower count being 3 seconds stale is acceptable.',
    pickIfAsked:
      'Default to strong consistency for anything involving money, inventory, or reservations. Accept eventual consistency for social/content data where a stale read is annoying but not catastrophic.',
    trap:
      "Assuming 'eventual' means 'approximately now' — in a partitioned network, eventual consistency can mean minutes or longer. If your SLO requires users to see their own writes immediately, eventual consistency on the read path needs a workaround (read-your-writes guarantee, sticky sessions, or read from primary).",
    analogy:
      'Strong consistency is a single whiteboard everyone reads from directly — always current, but everyone has to wait their turn. Eventual consistency is photocopies distributed to each desk — everyone can read instantly, but the copies take time to reflect the latest erasure.',
  },

  {
    id: 'sharding-vs-replication',
    pair: 'Sharding vs. Replication',
    domain: 'system-design',
    axis:
      'Whether you distribute data across nodes for write scale (sharding) or copy it across nodes for read scale and fault tolerance (replication) — they solve different bottlenecks.',
    gains: [
      'Sharding: horizontal write scale — each shard handles a subset of the keyspace, so total write throughput scales with shard count.',
      'Sharding: data volume scale — no single node holds the entire dataset.',
      'Replication: read scale — replicas serve reads, taking load off the primary.',
      'Replication: fault tolerance — if the primary fails, a replica promotes.',
    ],
    costs: [
      'Sharding: cross-shard queries are painful — joins, aggregations, and transactions that span shards require application-level fan-out and merge.',
      'Sharding: shard key choice is irreversible — a bad shard key causes hotspots that negate the benefit.',
      'Replication: replication lag — replicas are not always fully current, so you may serve stale reads.',
      'Replication: does not help write throughput — all writes still go to the primary.',
    ],
    chooseAWhen:
      "Write throughput or total data volume exceeds single-node capacity — sharding is the answer to 'we cannot write fast enough' or 'the dataset will not fit'.",
    chooseBWhen:
      'Read throughput exceeds single-node capacity, or you need high availability via failover — replication adds read capacity and resilience without the complexity of cross-shard queries.',
    pickIfAsked:
      'Default to replication — it adds read scale and HA with manageable complexity. Add sharding only when write throughput or dataset size is the actual bottleneck, because it permanently complicates your data access patterns.',
    trap:
      'Sharding too early — if your write bottleneck is actually an inefficient query or missing index, sharding distributes the inefficiency across more nodes without fixing it.',
    analogy:
      'Replication is making copies of a book so more people can read simultaneously. Sharding is splitting the book into volumes so different readers cover different chapters — each reader is faster, but finding something that spans volumes requires checking multiple places.',
  },

  // ─── BACKEND (RBAC/ABAC) ──────────────────────────────────────────────────

  {
    id: 'rbac-vs-abac',
    pair: 'RBAC vs. ABAC',
    domain: 'backend',
    axis:
      "Whether access decisions are based on a user's assigned role (simple, auditable) or on arbitrary attributes of the user, resource, and environment (expressive, complex).",
    gains: [
      'RBAC: simple mental model — assign a role, get a set of permissions, done. Easy to audit who can do what.',
      'RBAC: fast enforcement — check role membership, not a policy evaluation engine.',
      'ABAC: expressive — can encode "allow if user.department == resource.department AND time is business hours" without adding a new role for every combination.',
    ],
    costs: [
      'RBAC: role explosion — every new permission combination requires a new role, which compounds as the product grows.',
      "RBAC: can't express resource-level rules — 'can edit their own posts but not others' requires either ABAC or an ownership check bolted onto RBAC.",
      'ABAC: complex to audit — "who can access this resource?" requires evaluating the policy against every user, not just looking up group membership.',
      'ABAC: debugging failures is hard — policy engines (OPA, Cedar) produce denials with opaque explanations.',
    ],
    chooseAWhen:
      'Access patterns are stable and map cleanly to a small number of roles (admin/editor/viewer), and you need simple audit trails for compliance.',
    chooseBWhen:
      'Fine-grained resource-level access control is required (multi-tenant SaaS, document sharing with team/org/public visibility levels), and you are willing to invest in a proper policy engine.',
    pickIfAsked:
      "Start with RBAC. Most products never outgrow it. The signal to switch: you find yourself adding 'is_owner' checks all over service code — that's ABAC implemented badly, and you should evaluate a policy engine.",
    trap:
      "Accumulating 'is_owner' and 'is_team_member' checks scattered across service methods — you've built ABAC without realizing it, with no central place to audit or change the policy.",
    analogy:
      "RBAC is a building's key card system — your card level determines which floors you can access. ABAC is a smart lock that checks your card, the time, whether you're escorting a visitor, and which security zone you're in, all at once.",
    crossReference: { tab: 'infra', section: 'auth' },
  },
];
