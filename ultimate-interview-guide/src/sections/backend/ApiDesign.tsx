import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { TradeoffCard } from '../../components/TradeoffCard';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const ApiDesign: React.FC = () => {
  return (
    <SectionContainer
      id="api-design"
      title="API Design Patterns"
      category="API DESIGN"
      accentColor="var(--green)"
    >
      <SectionCard title="REST vs. RPC vs. GraphQL">
        <CompareTable
          headers={['Style', 'Best For', 'Weak At', 'Examples']}
          columnWidths={['1fr', '2fr', '2fr', '1.2fr']}
          rows={[
            ['REST', 'Resource-oriented CRUD, public APIs, cacheable reads', 'Chatty for deeply nested data, over/under-fetching', 'Stripe API, GitHub API'],
            ['RPC (gRPC)', 'Internal service-to-service calls, low-latency, typed contracts', 'Browser support, human-readability, no built-in caching semantics', 'Internal microservices'],
            ['GraphQL', 'Client-driven queries, aggregating many resources in one round trip', 'Caching complexity, N+1 resolver patterns, query cost control', 'Facebook/GitHub GraphQL API'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Resource Modeling">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li>Nouns, not verbs: <InlineCode>POST /orders</InlineCode>, not <InlineCode>POST /createOrder</InlineCode>.</li>
          <li>Nest only one level deep: <InlineCode>/users/{'{id}'}/orders</InlineCode> is fine; <InlineCode>/users/{'{id}'}/orders/{'{id}'}/items/{'{id}'}/notes</InlineCode> means it's time for a top-level resource.</li>
          <li>Plural collection names, consistent casing, and filtering via query params: <InlineCode>GET /orders?status=pending&limit=20</InlineCode>.</li>
          <li>Model actions that aren't pure CRUD as sub-resources: <InlineCode>POST /orders/{'{id}'}/cancel</InlineCode> rather than overloading PATCH semantics.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Pagination Strategies">
        <TradeoffCard
          title="Offset Pagination vs. Cursor Pagination"
          gains={[
            'Offset: trivial to implement, supports jumping to an arbitrary page number.',
            'Offset: works naturally with "page 1, 2, 3..." UI controls.',
            'Cursor: stable under concurrent inserts/deletes — no skipped or duplicated rows.',
            'Cursor: O(1) performance regardless of how deep you page (no OFFSET table scan).',
          ]}
          costs={[
            'Offset: large OFFSET values force the database to scan and discard rows — gets slower the deeper you page.',
            'Offset: rows shifting during pagination cause skipped or duplicated results.',
            'Cursor: cannot jump to an arbitrary page — only forward/backward from a known point.',
            'Cursor: requires a stable, indexed sort key (often a composite of timestamp + id).',
          ]}
        />
      </SectionCard>

      <SectionCard title="API Versioning Strategies">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>URI Versioning</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              <InlineCode>/v1/orders</InlineCode> — explicit and cache-friendly, but encourages full API forks rather than incremental evolution.
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Header Versioning</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              <InlineCode>Api-Version: 2024-01-15</InlineCode> — keeps URLs stable; harder to explore/debug in a browser.
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--blue)' }}>Content Negotiation</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              <InlineCode>Accept: application/vnd.api+json;version=2</InlineCode> — most "correct" per HTTP spec, least common in practice.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            Shipping a "breaking change" as a non-breaking one — renaming a field, changing a type, or tightening validation on an existing endpoint without a version bump. Clients you don't control will break silently in production.
          </Callout>
          <Callout type="senior-signal">
            "I design APIs for the consumer that's hardest to coordinate with — a mobile client on an old app version, or a third-party integration partner. That means additive changes by default, explicit deprecation windows, and never repurposing a field's meaning."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
