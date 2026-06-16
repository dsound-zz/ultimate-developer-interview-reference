import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { Callout } from '../../components/Callout';
import { CapTriangle } from '../../diagrams/CapTriangle';

export const CapTheorem: React.FC = () => {
  return (
    <SectionContainer
      id="cap-theorem"
      title="CAP Theorem"
      category="DISTRIBUTED SYSTEMS"
      accentColor="var(--red)"
    >
      <SectionCard title="Core Definition">
        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          In a distributed data store, you can simultaneously provide at most two of the following three guarantees:
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li>
            <strong>Consistency (C)</strong>: Every read receives the most recent write or an error. Instant replication invariant.
          </li>
          <li>
            <strong>Availability (A)</strong>: Every non-failing node returns a non-error response, without guaranteeing it contains the most recent write.
          </li>
          <li>
            <strong>Partition Tolerance (P)</strong>: The system continues to operate despite arbitrary message loss or delay across nodes.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="The Real Tradeoff Zone">
        <Callout type="key-insight">
          "Partition tolerance is not optional in a real-world network. Network partitions (fiber cuts, switch failures, VM pauses) will happen. Therefore, the actual choice you face is: when a partition occurs, do you choose Consistency (CP) by rejecting writes/reads, or Availability (AP) by allowing local operations at the cost of serving stale data?"
        </Callout>
      </SectionCard>

      <SectionCard title="Tradeoff Visualization">
        <div style={{ padding: '1rem 0', background: 'var(--surface)', borderRadius: '6px', border: '1px solid var(--border)' }}>
          <CapTriangle />
        </div>
      </SectionCard>

      <SectionCard title="System Architectures by CAP Profile">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderLeft: '3px solid var(--accent)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>CP (Consistency Focus)</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem 0' }}>
              Rejects reads/writes if nodes cannot establish consensus during a partition.
            </p>
            <ul style={{ fontSize: '0.85rem', paddingLeft: '1rem', margin: 0 }}>
              <li>Financial Ledgers, Inventory Control</li>
              <li>Distributed Locks, Leader Election</li>
              <li>Examples: HBase, ZooKeeper, etcd</li>
            </ul>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderLeft: '3px solid var(--green)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>AP (Availability Focus)</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem 0' }}>
              Serves local data immediately, allowing nodes to drift and resolving conflicts later.
            </p>
            <ul style={{ fontSize: '0.85rem', paddingLeft: '1rem', margin: 0 }}>
              <li>Social Media Feeds, Like Counters</li>
              <li>Shopping Carts, DNS Records</li>
              <li>Examples: Cassandra, DynamoDB, CouchDB</li>
            </ul>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderLeft: '3px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>CA (Single-Node Limit)</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem 0' }}>
              Only possible on a single node or a completely reliable network with no partition risk.
            </p>
            <ul style={{ fontSize: '0.85rem', paddingLeft: '1rem', margin: 0 }}>
              <li>Non-replicated Relational DBs</li>
              <li>Examples: Single-instance Postgres</li>
              <li>Note: "CA in practice is just a system that hasn't distributed yet."</li>
            </ul>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Uptime Analogy">
        <Callout type="analogy">
          "Think of CAP like an ATM during a network disconnect. A **CP ATM** refuses to dispense money because it cannot verify your actual balance with the central ledger. An **AP ATM** dispenses up to $200 anyway to keep the customer happy, recording the transaction locally and syncing/overdrawing the account once the network recovers."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
