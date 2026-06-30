import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { TradeoffCard } from '../../components/TradeoffCard';
import { StepList } from '../../components/StepList';
import { Callout } from '../../components/Callout';

export const MicroservicesCommunication: React.FC = () => {
  return (
    <SectionContainer
      id="microservices-communication"
      title="Microservices Communication"
      category="DISTRIBUTED SYSTEMS"
      accentColor="var(--green)"
    >
      <SectionCard title="Synchronous vs. Asynchronous Communication">
        <TradeoffCard
          title="Sync (REST/gRPC request-response) vs. Async (event/message-driven)"
          gains={[
            'Sync: simple to reason about — caller gets an immediate result or error.',
            'Sync: easy to trace a single request through a call chain.',
            'Async: services stay decoupled — a downstream outage doesn\'t cascade to callers.',
            'Async: natural load leveling via a queue/broker absorbing bursts.',
          ]}
          costs={[
            'Sync: tight coupling to downstream availability — if it\'s down, you\'re down (or you need a fallback).',
            'Sync: latency stacks up across a chain of synchronous calls.',
            'Async: eventual consistency — the caller can\'t assume the effect happened yet.',
            'Async: harder to trace and debug a logical "request" spread across many events.',
          ]}
        />
      </SectionCard>

      <SectionCard title="Service Discovery & Mesh">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li><strong>Client-side discovery</strong>: the calling service queries a registry (Consul, Eureka) and load-balances itself.</li>
          <li><strong>Server-side discovery</strong>: the caller hits a stable endpoint; a load balancer/gateway resolves the actual instance.</li>
          <li><strong>Service mesh</strong> (Istio, Linkerd): a sidecar proxy next to every service instance handles discovery, retries, mTLS, and observability — application code stays unaware of the networking concerns.</li>
        </ul>
      </SectionCard>

      <SectionCard title="The Circuit Breaker Pattern">
        <StepList
          steps={[
            <span key="1"><strong>Closed</strong> — requests flow normally; failures are counted.</span>,
            <span key="2"><strong>Open</strong> — once the failure rate crosses a threshold, the breaker trips: requests fail fast locally without hitting the unhealthy dependency.</span>,
            <span key="3"><strong>Half-Open</strong> — after a cooldown, a limited number of trial requests are let through to test recovery before fully closing again.</span>,
          ]}
        />
        <Callout type="key-insight">
          The point of a circuit breaker isn't to fix the failing dependency — it's to stop a slow or failing downstream service from exhausting your own service's thread pool / connection pool while every request blocks waiting on a timeout.
        </Callout>
      </SectionCard>

      <SectionCard title="Distributed Transactions: 2PC vs. Saga">
        <CompareTable
          headers={['Approach', 'Consistency', 'Availability Impact', 'Complexity']}
          columnWidths={['1fr', '1.5fr', '1.5fr', '1.5fr']}
          rows={[
            ['Two-Phase Commit (2PC)', 'Strong — all-or-nothing across services', 'High — a coordinator failure or slow participant blocks everyone', 'Coordinator is a single point of failure; rarely used across true microservice boundaries'],
            ['Saga Pattern', 'Eventual — each step commits locally, compensating actions undo prior steps on failure', 'High — no global lock held', 'Requires designing a compensating action for every step (e.g. refund after a failed shipment reservation)'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            The "distributed monolith": services are deployed independently but call each other synchronously in long chains and share a database. You get all the operational cost of microservices with none of the failure isolation or independent scalability.
          </Callout>
          <Callout type="senior-signal">
            "Before splitting a service, I ask whether it can fail independently and be deployed independently — if every change still requires coordinating deploys across three services, the boundary is wrong. I also default to async events for cross-service side effects and reserve synchronous calls for things the caller truly cannot proceed without."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
