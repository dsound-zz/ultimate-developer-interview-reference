import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { TradeoffCard } from '../../components/TradeoffCard';
import { Callout } from '../../components/Callout';
import { ApiGatewayHub } from '../../diagrams/ApiGatewayHub';

export const ApiGateway: React.FC = () => {
  return (
    <SectionContainer
      id="api-gateway"
      title="API Design & Gateway"
      category="GATEWAY"
      accentColor="var(--red)"
    >
      <SectionCard title="API Gateway Hub Responsibilities">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          An API Gateway acts as the reverse proxy entrance, intercepting client calls and orchestrating cross-cutting concerns:
        </p>
        <div style={{ padding: '1rem 0', background: 'var(--surface)', borderRadius: '6px', border: '1px solid var(--border)', marginBottom: '1rem' }}>
          <ApiGatewayHub />
        </div>
      </SectionCard>

      <SectionCard title="API Architecture Styles">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TradeoffCard
            title="REST (Representational State Transfer)"
            gains={[
              'Stateless, simple, and universally supported across client platforms.',
              'Highly cacheable via standard HTTP verbs (GET caching at CDN level).',
            ]}
            costs={[
              'Over-fetching or under-fetching: clients retrieve complete payloads even if only one field is needed.',
              'Requires multiple round-trips to resolve nested/related resources.',
            ]}
          />

          <TradeoffCard
            title="GraphQL"
            gains={[
              'Clients specify exactly what fields they need, avoiding over-fetching.',
              'Single endpoint aggregates data from multiple microservices.',
              'Strongly-typed schema acts as a clear integration contract.',
            ]}
            costs={[
              'Difficult CDN caching because requests are typically HTTP POST payloads.',
              'Prone to N+1 resolver performance traps in DB fetches.',
              'Schema overhead and security concerns with deeply nested queries.',
            ]}
          />

          <TradeoffCard
            title="gRPC (Google Remote Procedure Call)"
            gains={[
              'Uses Protocol Buffers (binary serialization) for extremely fast transmissions.',
              'Supports client/server bi-directional streaming.',
              'Out-of-the-box client code generation for polyglot systems.',
            ]}
            costs={[
              'Not human-readable: payloads are binary (requires tooling to debug).',
              'Poor browser support; typically requires an Envoy translation proxy.',
            ]}
          />

          <TradeoffCard
            title="WebSockets"
            gains={[
              'Full-duplex, real-time persistent connection (client/server send messages anytime).',
              'Low latency: avoids HTTP handshake overhead on every packet.',
            ]}
            costs={[
              'Stateful connections: hard to scale load balancers horizontally.',
              'Requires complex connection management, heartbeats, and reconnection logic.',
            ]}
          />
        </div>
      </SectionCard>

      <SectionCard title="Rate Limiting Algorithms">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Fixed Window Counter</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Tracks request counts in fixed intervals (e.g. 100/minute). Simple to implement, but allows traffic bursts at the window boundaries (e.g. 200 requests within 2 seconds).
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Sliding Window Log / Counter</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Computes request rate dynamically over the past N seconds. Prevents boundary bursts, but consumes high memory since individual timestamps must be recorded.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--cyan)' }}>Token Bucket</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              A bucket fills with tokens at a constant rate. Requests consume a token. Allows short bursts of traffic when the bucket is full while enforcing long-term limits.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--yellow)' }}>Leaky Bucket</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Requests queue up and flow out at a constant, fixed rate. Smooths out traffic spikes, but increases latency for bursty requests as they wait in the queue.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "When designing rate limiting, the choice of key is critical: rate limiting by IP is easy to spoof; limiting by User ID is secure but requires authentication; limiting by API Key is ideal for B2B. I recommend storing counts in a distributed cache like Redis. To prevent race conditions, implement Token Bucket or Sliding Window using atomic Redis pipelines (LUA scripts) rather than multi-step client lookups."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
