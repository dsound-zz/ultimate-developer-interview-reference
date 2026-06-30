import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { CodeBlock } from '../../components/CodeBlock';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const BackgroundJobs: React.FC = () => {
  return (
    <SectionContainer
      id="background-jobs"
      title="Background Jobs & Queues"
      category="ASYNC PROCESSING"
      accentColor="var(--blue)"
    >
      <SectionCard title="Why Offload Work">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li>Keep the request/response cycle fast — anything not needed for the immediate response (emails, PDF generation, webhooks) belongs off the hot path.</li>
          <li>Absorb traffic spikes — a queue smooths a burst of 10,000 signups into a steady processing rate instead of overwhelming downstream services.</li>
          <li>Enable retries without re-bothering the user — a failed job can be retried automatically; a failed inline request just shows the user an error.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Queue Patterns">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>FIFO Queue</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Strict ordering, processed first-in-first-out. Necessary when order matters (e.g. sequential state transitions for one entity).</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Priority Queue</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Urgent jobs (password reset email) jump ahead of low-priority ones (weekly digest) sharing the same worker pool.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--amber)' }}>Delayed Queue</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Job becomes visible to workers only after a scheduled time — used for reminders, scheduled sends, exponential backoff retries.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--red)' }}>Dead-Letter Queue (DLQ)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Jobs that exceed their max retry count are routed here instead of retried forever — for manual inspection rather than silent data loss.</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Delivery Guarantees">
        <CompareTable
          headers={['Guarantee', 'Behavior', 'Consumer Must']}
          columnWidths={['1.2fr', '2fr', '2fr']}
          rows={[
            ['At-most-once', 'Message may be lost, never delivered twice', 'Tolerate occasional message loss'],
            ['At-least-once', 'Message is never lost, but may be delivered more than once (e.g. after a crash before ack)', 'Be idempotent — duplicate processing must be safe'],
            ['Exactly-once', 'Delivered and processed exactly one time', 'Usually requires transactional outbox / dedup tracking — true exactly-once end-to-end is rare and expensive'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Idempotent Consumers">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Since most real-world queues are at-least-once, the consumer — not the queue — is responsible for safety under duplicate delivery:
        </p>
        <CodeBlock code={`function processPayment(event) {
  // Check if we've already handled this exact event
  if (processedEventStore.has(event.id)) {
    return; // already applied — safe no-op on redelivery
  }

  applyPaymentCharge(event.amount, event.accountId);
  processedEventStore.markProcessed(event.id); // same transaction as the charge
}`} />
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            A "poison message" — one malformed job that crashes the worker every time it's picked up — can take down an entire queue if retries aren't capped. Without a DLQ and a max-retry limit, one bad message can loop forever, blocking everything behind it in a FIFO queue.
          </Callout>
          <Callout type="senior-signal">
            "I assume at-least-once delivery by default and design the consumer to be idempotent, rather than chasing exactly-once semantics in the broker. It's a strictly easier problem: dedupe on a unique <InlineCode>event.id</InlineCode> than trying to make distributed delivery perfectly exactly-once."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
