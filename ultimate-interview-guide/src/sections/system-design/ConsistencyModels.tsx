import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { Callout } from '../../components/Callout';

export const ConsistencyModels: React.FC = () => {
  return (
    <SectionContainer
      id="consistency-models"
      title="Consistency Models"
      category="DISTRIBUTED SYSTEMS"
      accentColor="var(--amber)"
    >
      <SectionCard title="Consistency Spectrum">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Consistency is not a binary choice between "eventual" and "strong". It is a spectrum with proportional latency and throughput tradeoffs:
        </p>
        
        {/* Visual Spectrum Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--surface)',
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          border: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          overflowX: 'auto',
          gap: '0.5rem',
          whiteSpace: 'nowrap'
        }}>
          <span style={{ color: 'var(--green)' }}>Eventual</span>
          <span style={{ color: 'var(--text-secondary)' }}>→</span>
          <span style={{ color: 'var(--cyan)' }}>Monotonic Read</span>
          <span style={{ color: 'var(--text-secondary)' }}>→</span>
          <span style={{ color: 'var(--yellow)' }}>Read-Your-Writes</span>
          <span style={{ color: 'var(--text-secondary)' }}>→</span>
          <span style={{ color: 'var(--orange)' }}>Causal</span>
          <span style={{ color: 'var(--text-secondary)' }}>→</span>
          <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Linearizable</span>
          <span style={{ color: 'var(--text-secondary)' }}>→</span>
          <span style={{ color: 'var(--red)', fontWeight: 'bold' }}>Strict Serial</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', padding: '0 0.5rem' }}>
          <span>← Weakest / Highest Performance</span>
          <span>Strongest / Highest Latency →</span>
        </div>
      </SectionCard>

      <SectionCard title="Key Consistency Guarantees">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Eventual Consistency</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Updates will propagate to all nodes over time. No timing guarantees are offered. Reads can return stale data indefinitely.
              <br /><strong>Best for</strong>: DNS records, social media metrics (likes, shares), CDN cache invalidation.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--yellow)' }}>Read-Your-Writes Consistency</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              A client will always see their own updates immediately. Other users may see stale data for a short replication window.
              <br /><strong>Best for</strong>: User profile modifications, updating account configurations.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--orange)' }}>Causal Consistency</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Operations that are causally related must be seen in the same order by all nodes. Concurrent updates have no ordering constraints.
              <br /><strong>Best for</strong>: Nested comment threads, chat threads (replies must appear after parent messages).
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Linearizability</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Operations appear to happen instantaneously at a single global point in time. Reads are guaranteed to see the latest write.
              <br /><strong>Best for</strong>: Distributed locks, ledger balances, leader election coordinates.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Senior vs. Junior Signal">
        <Callout type="senior-signal">
          "Most candidate systems that claim they need 'strong consistency' actually only require read-your-writes or causal consistency. Real strong consistency (linearizability) incurs significant network coordination costs and reduces availability. I always push back and clarify which invariants are actual non-negotiables before committing to a database engine."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
