import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { Callout } from '../../components/Callout';
import { RequestLatencyBudget } from '../../diagrams/RequestLatencyBudget';

export const HandlingSlowdowns: React.FC = () => {
  return (
    <SectionContainer
      id="sys-handling-slowdowns"
      title="Handling Slowdowns"
      category="DIAGNOSTICS"
      accentColor="var(--red)"
    >
      <SectionCard title="Debugging Frontend Slowdowns">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
          When asked "Your web app is slow, how do you fix it?", structure your answer systematically:
        </p>
        <ol style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            <strong>Define "Slow"</strong>: Clarify the target metric. Is it initial load (LCP, FCP), interactive latency (INP), API latency, or user-perceived visual lag?
          </li>
          <li>
            <strong>Isolate and Reproduce</strong>: Check if it's geographic, device-specific, or affecting all users. Check production Core Web Vitals telemetry.
          </li>
          <li>
            <strong>Profile UI Thread</strong>: Run Chrome Performance flame chart, check network request waterfalls, and inspect React DevTools Profiler component render counts.
          </li>
          <li>
            <strong>Common Culprits</strong>: Massive JS bundles (need code-splitting), render-blocking resources in header, unvirtualized long lists, or heavy main-thread computations.
          </li>
        </ol>
      </SectionCard>

      <SectionCard title="Debugging Backend Slowdowns">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
          For server-side and api endpoints:
        </p>
        <ol style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            <strong>Isolate Latency Percentiles</strong>: Focus on the p99 and p99.9 latency, not the average (p50), to discover bottleneck outliers under load.
          </li>
          <li>
            <strong>Trace Request Paths</strong>: Check APM traces (Datadog, New Relic) and distributed trace spans (Jaeger) to isolate which service boundary is slow.
          </li>
          <li>
            <strong>Inspect Storage Layer First</strong>: Review DB slow query logs. Run `EXPLAIN` queries to audit full table scans, missing indexes, or transaction lock delays.
          </li>
          <li>
            <strong>Common Culprits</strong>: Missing DB indexes, database connection pool exhaustion, synchronous calls to slow third-party APIs, or lack of caching on hot read paths.
          </li>
        </ol>
      </SectionCard>

      <SectionCard title="Request Latency Budget (200ms SLO Example)">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          A latency budget assigns maximum permissible times to each step of a request. It sets boundaries for network, app, cache, and database layers:
        </p>
        <div style={{ padding: '1rem 0', background: 'var(--surface)', borderRadius: '6px', border: '1px solid var(--border)', marginBottom: '1rem' }}>
          <RequestLatencyBudget />
        </div>
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "When discussing slowdowns, I lead with metrics and data, never speculative guesses. For example: 'Our p99 latency spiked to 2.3s starting at 14:22 UTC. The DB slow query log pointed to a full table scan on the orders table due to a missing composite index on `user_id, status`. Adding the index reduced p99 back to 45ms.' This shows you are analytical under pressure."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
