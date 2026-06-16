import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { StepList } from '../../components/StepList';
import { Callout } from '../../components/Callout';

export const InterviewFramework: React.FC = () => {
  return (
    <SectionContainer
      id="interview-framework"
      title="The Interview Framework"
      category="METHODOLOGY"
      accentColor="var(--accent)"
    >
      <SectionCard title="6-Step System Design Template">
        <StepList
          steps={[
            <span key="1"><strong>Clarify requirements</strong> — What are we actually building? Who uses it? What scale? What are the non-negotiables?</span>,
            <span key="2"><strong>Define constraints</strong> — Estimate QPS (queries per second), storage needs, read/write ratio, latency SLA, and geographic distribution.</span>,
            <span key="3"><strong>High-level design</strong> — Draw the box topology: clients, DNS, load balancers, web/app services, database nodes, cache clusters, and message queues.</span>,
            <span key="4"><strong>Data model & API</strong> — Define core database schema entities, primary keys, relationships, index choices, and endpoint payload contracts.</span>,
            <span key="5"><strong>Deep dive</strong> — Focus on bottlenecks. Address replication lag, cache invalidation, partition tolerance failures, and consistency tuning.</span>,
            <span key="6"><strong>Tradeoffs & scaling limits</strong> — Analyze what you sacrificed (e.g. latency vs consistency). Describe how the design adapts at 10x or 100x load.</span>,
          ]}
        />
      </SectionCard>

      <SectionCard title="Senior Signals vs. Junior Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="senior-signal">
            "I always ask about the read/write ratio before touching the design. A read-heavy system (like a social feed) and a write-heavy system (like an ingestion logging pipeline) require completely different storage engines and scaling strategies."
          </Callout>
          
          <Callout type="senior-signal">
            "I define the SLA and uptime expectations early. If the requirement is 99.9% uptime, that permits ~8.7 hours of downtime per year. If it is 99.99%, that's only ~52 minutes. The design changes from active-passive replication to multi-region active-active."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
