import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CodeBlock } from '../../components/CodeBlock';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const InterviewCodingPatterns: React.FC = () => {
  return (
    <SectionContainer
      id="interview-coding-patterns"
      title="Backend Coding Patterns Reference"
      category="REFERENCE"
      accentColor="var(--accent)"
    >
      <SectionCard title="Rate Limiter Algorithms">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderTop: '3px solid var(--accent)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Fixed Window Counter</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Increment a counter per key, reset every fixed interval. O(1) memory, but allows bursts at window boundaries.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderTop: '3px solid var(--green)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Sliding Window Log</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Store a timestamp per request, count entries within the trailing window. Precise, but memory grows with request volume.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderTop: '3px solid var(--blue)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--blue)' }}>Token Bucket</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Bucket refills at a fixed rate up to a max capacity; each request consumes a token. Allows controlled bursts.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderTop: '3px solid var(--amber)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--amber)' }}>Leaky Bucket</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Requests queue into a bucket that drains (processes) at a constant rate — smooths output regardless of input burstiness.</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Idempotency Key Pattern">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          The standard way to make a non-idempotent <InlineCode>POST</InlineCode> (e.g. "charge this card") safe to retry on network failure:
        </p>
        <CodeBlock code={`async function handleCreatePayment(req) {
  const idempotencyKey = req.headers['idempotency-key'];

  const existing = await store.get(idempotencyKey);
  if (existing) {
    return existing.response; // replay the original result, no double charge
  }

  const result = await chargeCard(req.body);
  await store.set(idempotencyKey, { response: result }, { ttl: '24h' });
  return result;
}`} />
        <Callout type="key-insight">
          The client generates the idempotency key (typically a UUID) once and resends the same key on every retry of the same logical operation — the server is what deduplicates.
        </Callout>
      </SectionCard>

      <SectionCard title="Pagination Cheat Sheet">
        <CodeBlock code={`-- Offset pagination (simple, slow at depth)
SELECT * FROM orders ORDER BY created_at DESC LIMIT 20 OFFSET 4000;

-- Cursor pagination (stable, fast at any depth)
SELECT * FROM orders
WHERE (created_at, id) < (:lastSeenCreatedAt, :lastSeenId)
ORDER BY created_at DESC, id DESC
LIMIT 20;`} />
      </SectionCard>

      <SectionCard title="Distributed ID Generation">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li><strong>UUID v4</strong>: random, no coordination needed, but not sortable by creation time and indexes poorly (random insertion order).</li>
          <li><strong>Snowflake-style ID</strong>: <InlineCode>(timestamp | worker ID | sequence number)</InlineCode> packed into one integer — sortable, unique across machines without central coordination, used by Twitter/Discord.</li>
          <li><strong>Database auto-increment</strong>: simplest, but a single point of write coordination — doesn't scale to multiple writable database nodes.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "These patterns aren't trivia — they're the difference between a coding-round answer and a production-ready one. A rate limiter that's correct in 20 minutes of whiteboard time still needs to answer: what happens under clock skew across instances, and where does the counter state actually live? I always state that assumption out loud rather than letting it stay implicit."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
