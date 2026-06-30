import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { CodeBlock } from '../../components/CodeBlock';
import { StepList } from '../../components/StepList';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const Observability: React.FC = () => {
  return (
    <SectionContainer
      id="observability"
      title="Observability & Monitoring"
      category="OPERATIONS"
      accentColor="var(--amber)"
    >
      <SectionCard title="The Three Pillars">
        <CompareTable
          headers={['Pillar', 'Answers', 'Example']}
          columnWidths={['1fr', '2fr', '2fr']}
          rows={[
            ['Logs', 'What exactly happened, in detail, for one event?', 'A structured JSON line per request with status, latency, user ID'],
            ['Metrics', 'How is the system behaving in aggregate, over time?', 'p99 latency, requests/sec, error rate, queue depth'],
            ['Traces', 'How did one request flow across services, and where did time go?', 'A trace showing 80ms in the auth service, 200ms in the DB query'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Structured Logging">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Plain-text log lines are easy to write and painful to query at scale. Structured (JSON) logs are queryable by field:
        </p>
        <CodeBlock code={`{
  "timestamp": "2026-06-25T14:02:11Z",
  "level": "error",
  "service": "orders-api",
  "requestId": "req_8f3a...",
  "userId": "user_123",
  "message": "payment capture failed",
  "errorCode": "card_declined",
  "latencyMs": 342
}`} />
      </SectionCard>

      <SectionCard title="The Four Golden Signals">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Latency</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Time to serve a request — track percentiles (p50/p95/p99), not just average, since averages hide tail pain.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Traffic</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Demand on the system — requests/sec, messages/sec consumed.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--red)' }}>Errors</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Rate of failed requests — both explicit errors and implicit ones (wrong content, slow enough to count as failed).</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--blue)' }}>Saturation</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>How "full" the system is — CPU, memory, connection pool, queue depth. The earliest warning sign before latency/errors degrade.</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Distributed Tracing">
        <StepList
          steps={[
            <span key="1">A request enters the system and is assigned a unique <InlineCode>traceId</InlineCode> (or one is propagated in from an upstream caller).</span>,
            <span key="2">Every service the request touches creates a <InlineCode>span</InlineCode> — a timed unit of work — tagged with that same <InlineCode>traceId</InlineCode>.</span>,
            <span key="3">The <InlineCode>traceId</InlineCode> (and parent span ID) is propagated in outgoing request headers to every downstream call.</span>,
            <span key="4">A tracing backend (Jaeger, Zipkin, Honeycomb) stitches all spans sharing a <InlineCode>traceId</InlineCode> into one waterfall view of the entire request.</span>,
          ]}
        />
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "I instrument for the question I'll need to answer at 3am, not just for a dashboard that looks good in a demo. That means correlation IDs threaded through every log line and propagated across service boundaries, so a single failed request can be traced end-to-end instead of grepping five separate log streams by timestamp and hoping they line up."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
