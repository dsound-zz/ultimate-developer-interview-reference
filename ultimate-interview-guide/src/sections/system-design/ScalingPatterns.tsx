import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { TradeoffCard } from '../../components/TradeoffCard';
import { Callout } from '../../components/Callout';

export const ScalingPatterns: React.FC = () => {
  return (
    <SectionContainer
      id="scaling-patterns"
      title="Scaling Patterns"
      category="SCALING"
      accentColor="var(--cyan)"
    >
      <SectionCard title="Vertical vs. Horizontal Scaling">
        <TradeoffCard
          title="Vertical Scaling (Scale Up) vs. Horizontal Scaling (Scale Out)"
          gains={[
            'Vertical: Easy implementation: zero changes to application code or architecture.',
            'Vertical: Keeps database joins simple (everything resides on one disk).',
            'Horizontal: No hardware scaling ceiling: just keep adding cheap servers.',
            'Horizontal: Built-in redundancy: if one instance crashes, load balancers bypass it.',
          ]}
          costs={[
            'Vertical: Hard physical ceiling: you can only buy a machine so large.',
            'Vertical: Represents a single point of failure (no redundancy).',
            'Horizontal: Mandates that all application servers be completely stateless.',
            'Horizontal: Relational joins across nodes become difficult or impossible.',
          ]}
        />
      </SectionCard>

      <SectionCard title="State Management Signal">
        <Callout type="senior-signal">
          "I design services to be completely stateless from day one. Any session state, files, or transaction history goes into a shared external cache like Redis or an object store like S3 rather than in-process server memory. This makes horizontal scaling as trivial as setting an autoscale group trigger."
        </Callout>
      </SectionCard>

      <SectionCard title="Database Scaling Patterns">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Database Sharding</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Splits a database into smaller, horizontal pieces across multiple servers using a <em>shard key</em>.
              <br />• <strong>Range-Based</strong>: Key routes by values (e.g., A-M to Node 1). Risk of hot shards.
              <br />• <strong>Hash-Based</strong>: Key gets hashed (`hash(id) % count`) for even spread. Range queries are slow.
              <br />• <strong>Directory-Based</strong>: A lookup service holds the node mappings. Flexible, but adds a network hop.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Read Replicas</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Writes go to a single primary master database node. Master updates are replicated asynchronously to read-only replica nodes.
              <br /><em>Tradeoff:</em> Replication lag. If replica lag is high, users may read stale data. Design critical paths (like checkout) to read directly from the master.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', gridColumn: '1 / -1' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--cyan)' }}>CQRS (Command Query Responsibility Segregation)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Separates the write model (commands: update state) from the read model (queries: retrieve state).
              <br />• <strong>Write Path</strong>: Optimized for write validation, ACID consistency, and normalization.
              <br />• <strong>Read Path</strong>: Optimized for read performance, often using pre-aggregated, denormalized database views or Elasticsearch indexes.
            </p>
          </div>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
