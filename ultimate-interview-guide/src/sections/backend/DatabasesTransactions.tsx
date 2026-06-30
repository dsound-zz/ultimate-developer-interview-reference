import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { TradeoffCard } from '../../components/TradeoffCard';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const DatabasesTransactions: React.FC = () => {
  return (
    <SectionContainer
      id="databases-transactions"
      title="Databases & Transactions"
      category="DATA LAYER"
      accentColor="var(--accent)"
    >
      <SectionCard title="ACID Properties">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Atomicity</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>All statements in a transaction succeed, or none do — partial writes never persist.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Consistency</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Every transaction moves the database from one valid state to another, respecting constraints and invariants.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--blue)' }}>Isolation</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Concurrent transactions don't see each other's uncommitted intermediate state.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--red)' }}>Durability</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Once committed, a write survives a crash — typically guaranteed via a write-ahead log (WAL).</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Isolation Levels & the Anomalies They Prevent">
        <CompareTable
          headers={['Isolation Level', 'Dirty Reads', 'Non-Repeatable Reads', 'Phantom Reads']}
          rows={[
            ['Read Uncommitted', 'Possible', 'Possible', 'Possible'],
            ['Read Committed', 'Prevented', 'Possible', 'Possible'],
            ['Repeatable Read', 'Prevented', 'Prevented', 'Possible'],
            ['Serializable', 'Prevented', 'Prevented', 'Prevented'],
          ]}
        />
        <Callout type="key-insight">
          Postgres defaults to <InlineCode>Read Committed</InlineCode>. Stricter isolation isn't free — <InlineCode>Serializable</InlineCode> typically means more lock contention or more transaction retries on conflict.
        </Callout>
      </SectionCard>

      <SectionCard title="Optimistic vs. Pessimistic Locking">
        <TradeoffCard
          title="Optimistic Locking (version column) vs. Pessimistic Locking (SELECT ... FOR UPDATE)"
          gains={[
            'Optimistic: no locks held — high throughput under low contention.',
            'Optimistic: naturally distributed-friendly, no lock coordination needed.',
            'Pessimistic: guarantees no conflicting writes — caller never has to retry.',
            'Pessimistic: simpler reasoning for high-contention hot rows (e.g. inventory counters).',
          ]}
          costs={[
            'Optimistic: caller must detect the version mismatch and retry the transaction.',
            'Optimistic: degrades badly under high contention — many wasted retries.',
            'Pessimistic: holds a row lock for the transaction duration, reducing concurrency.',
            'Pessimistic: risk of deadlocks if multiple transactions lock rows in different orders.',
          ]}
        />
      </SectionCard>

      <SectionCard title="Transaction Scope & Migrations">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li>Keep transactions short — a long-running transaction holds locks and prevents <InlineCode>VACUUM</InlineCode>/cleanup, bloating the table.</li>
          <li>Never make a network call (another service, an email send) inside a database transaction — it ties unrelated failure domains together and holds locks open for the network's latency.</li>
          <li>Schema migrations should be backward-compatible during rollout: add a nullable column, deploy code that writes to both, backfill, then drop the old column in a later release.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "I pick isolation level and locking strategy based on contention, not habit. Low-contention writes (a user editing their own profile) get optimistic locking. High-contention hot rows (decrementing inventory on a flash sale) get a short pessimistic lock or an atomic <InlineCode>UPDATE ... WHERE quantity &gt; 0</InlineCode> instead of a read-then-write round trip."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
