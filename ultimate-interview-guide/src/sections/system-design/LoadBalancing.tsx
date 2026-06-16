import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { TradeoffCard } from '../../components/TradeoffCard';
import { Callout } from '../../components/Callout';

export const LoadBalancing: React.FC = () => {
  return (
    <SectionContainer
      id="load-balancing"
      title="Load Balancing"
      category="SCALING"
      accentColor="var(--cyan)"
    >
      <SectionCard title="Load Balancing Algorithms">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h4 style={{ margin: 0, color: 'var(--accent)' }}>Round Robin</h4>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent)' }}>Weight: Equal</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Requests are distributed sequentially down the list of servers. Simple, stateless, and effective when backend servers are identical in capacity.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h4 style={{ margin: 0, color: 'var(--green)' }}>Weighted Round Robin</h4>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--green)' }}>Weight: Capacity</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Servers receive requests proportional to a preassigned weight. Best for heterogeneous server clusters (e.g. mix of r6g.xlarge and r6g.4xlarge instances).
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h4 style={{ margin: 0, color: 'var(--cyan)' }}>Least Connections</h4>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: '4px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--cyan)' }}>Weight: Active Conn</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Directs traffic to the server with the lowest active connection count. Essential for long-lived client interactions (e.g. WebSockets, video streams).
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h4 style={{ margin: 0, color: 'var(--red)' }}>IP Hash / Sticky Sessions</h4>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.15)', color: 'var(--red)' }}>Weight: Stateful</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Hashes client IP to ensure they consistently route to the same server. Used when server-side state is stored in local memory (an anti-pattern in cloud architectures).
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h4 style={{ margin: 0, color: 'var(--yellow)' }}>Power of Two Choices (P2C)</h4>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: '4px', background: 'rgba(234, 179, 8, 0.15)', color: 'var(--yellow)' }}>Weight: O(1) Overhead</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Selects two servers at random, then routes to the one with fewer active connections. Avoids the overhead of locking the global connections counter (as Least Connections must do) while achieving near-identical efficiency.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Layer 4 vs. Layer 7 Balancing">
        <TradeoffCard
          title="Layer 4 (Transport Layer) vs. Layer 7 (Application Layer)"
          gains={[
            'Layer 4: Extremely fast routing. Handles TCP/UDP protocols without parsing packet payloads (reads headers only).',
            'Layer 4: Lower CPU utilization on load balancers. High packets-per-second throughput.',
            'Layer 7: Highly flexible routing. Inspects URL paths, headers, cookies, and HTTP request bodies.',
            'Layer 7: Enables canary deployments, path-based routing (e.g. /api/users goes to User Service), and SSL termination.',
          ]}
          costs={[
            'Layer 4: Cannot perform header manipulation, path-based routing, or SSL termination.',
            'Layer 4: Hard to balance traffic evenly for long-lived TCP multiplexed connections.',
            'Layer 7: Significant CPU overhead due to complete TLS termination and packet payload parsing.',
            'Layer 7: Higher latency per proxy hop compared to L4.',
          ]}
        />
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "For standard web services, I default to a Layer 7 load balancer (e.g., NGINX, AWS ALB) because it handles SSL termination, cookie routing, and path-based microservices mapping out of the box. I only recommend Layer 4 load balancers (e.g., AWS NLB, HAProxy) when dealing with non-HTTP protocols, persistent WebSockets with huge connection volume, or ultra-low latency requirements."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
