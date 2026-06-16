import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { TradeoffCard } from '../../components/TradeoffCard';
import { Callout } from '../../components/Callout';

export const AvailabilityPatterns: React.FC = () => {
  return (
    <SectionContainer
      id="availability-patterns"
      title="Availability Patterns"
      category="RESILIENCY"
      accentColor="var(--accent)"
    >
      <SectionCard title="Failure Assumption Principle">
        <Callout type="key-insight">
          "Design for failure as the default state. In a system comprising 100 microservices, each boasting 99.9% uptime, the joint probability that all 100 are operational simultaneously is only 90.5% (0.999^100). The system as a whole will be down ~9.5% of the time if services fail synchronously. Resilient architectures assume dependencies are constantly failing."
        </Callout>
      </SectionCard>

      <SectionCard title="Redundancy & Failover Patterns">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TradeoffCard
            title="Active-Passive Failover"
            gains={[
              'Simpler write consistency: only one master processes updates.',
              'Lower operational and infrastructure costs (standby node does not serve traffic).',
            ]}
            costs={[
              'Failover window downtime: requires time (seconds to minutes) to detect master failure and promote standby.',
              'Idle hardware capacity represents wasted resources.',
            ]}
          />

          <TradeoffCard
            title="Active-Active Topology"
            gains={[
              'Zero failover delay: all nodes actively serve traffic; peers instantly absorb load on node failure.',
              '100% hardware utilization across regions.',
            ]}
            costs={[
              'Requires complex multi-region write resolution (conflict-free replicated data types or last-write-wins).',
              'Prone to split-brain data corruption risks.',
            ]}
          />

          <TradeoffCard
            title="Circuit Breaker"
            gains={[
              'Fast failure: rejects calls to struggling downstream services immediately without waiting for timeouts.',
              'Protects failing services from cascading traffic overload, giving them time to heal.',
              'Frees execution threads in the caller immediately.',
            ]}
            costs={[
              'Requires client-side logic to handle degraded fallback responses.',
              'Complex state tracking (Closed, Open, Half-Open states).',
            ]}
          />
        </div>
      </SectionCard>

      <SectionCard title="Isolating Failures">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Bulkhead Pattern</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Isolate resources (thread pools, memory, sockets) into distinct pockets so that a failure in one tenant or downstream system cannot consume all system resources.
              <br /><em>Analogy:</em> Water-tight compartments in a ship hull.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Graceful Degradation</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              When a dependency fails, serve a degraded response (cached page, static fallback list, or hidden widget) instead of throwing an error screen.
              <br /><em>Rule:</em> "Show the user something. A blank error page is a bounce."
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "Timeouts are the most important, invisible circuit breaker. Every network call must have a timeout. Without one, a slow downstream dependency will block your thread pool indefinitely, taking down your entire service. My default policy: connection timeout 1s, read timeout 5s, and retry with exponential backoff up to 3 times."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
