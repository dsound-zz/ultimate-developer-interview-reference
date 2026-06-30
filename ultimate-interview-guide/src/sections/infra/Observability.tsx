import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { TradeoffCard } from '../../components/TradeoffCard';
import { Callout } from '../../components/Callout';

export const Observability: React.FC = () => {
  return (
    <SectionContainer
      id="observability"
      title="Observability & Monitoring"
      category="IS THE SYSTEM HEALTHY"
      accentColor="var(--red)"
    >
      <SectionCard title="The Problem">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Logs tell you what happened in one specific event after the fact. They don't easily answer "is the system healthy right now" or "where in this request chain did the latency come from." Observability platforms add metrics (aggregate numeric trends over time) and distributed tracing (the path and timing of one request across services) — and alerting on top of both, so a human finds out before users do.
        </p>
      </SectionCard>

      <SectionCard title="Platforms Compared">
        <CompareTable
          headers={['Platform', 'Model', 'Notable Trait']}
          columnWidths={['1.2fr', '1.5fr', '2.3fr']}
          rows={[
            ['CloudWatch (+ X-Ray)', 'Managed, AWS-native', 'Zero setup for AWS-native services; tracing (X-Ray) and metrics feel like separate products bolted together'],
            ['Datadog', 'Managed SaaS, multi-cloud', 'Logs, metrics, and traces correlated in one UI — strong out-of-the-box experience, priced per-host'],
            ['New Relic', 'Managed SaaS, multi-cloud', 'Similar all-in-one positioning to Datadog, historically strong in APM (application performance monitoring)'],
            ['Prometheus + Grafana', 'Self-hosted (open source)', 'Pull-based metrics scraping plus a separate, highly customizable dashboarding layer — the de facto Kubernetes-native standard'],
            ['Honeycomb', 'Managed SaaS', 'Built around high-cardinality event data and fast ad-hoc exploration rather than pre-defined dashboards'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Build-Your-Own vs. Managed SaaS">
        <TradeoffCard
          title="Prometheus + Grafana (self-hosted) vs. Datadog/New Relic (managed)"
          gains={[
            'Self-hosted: no per-host/per-metric billing — cost is just your own infrastructure.',
            'Self-hosted: full control over retention, data residency, and the query language.',
            'Managed: zero infrastructure to run or scale — the vendor handles it, not you.',
            'Managed: faster time-to-value with pre-built dashboards and integrations.',
          ]}
          costs={[
            'Self-hosted: you now operate and scale another piece of infrastructure (and page yourself when it breaks).',
            'Self-hosted: integrating logs, metrics, and traces into one coherent view takes real setup work.',
            'Managed: cost scales with hosts/usage and can become a significant line item at scale.',
            'Managed: less control over exactly how/where data is stored, which matters for some compliance regimes.',
          ]}
        />
      </SectionCard>

      <SectionCard title="The Four Golden Signals">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Regardless of platform, the same four signals are worth instrumenting first: <strong>latency</strong> (track percentiles, not just average — averages hide tail pain), <strong>traffic</strong> (demand on the system), <strong>errors</strong> (rate of failed requests), and <strong>saturation</strong> (how "full" the system is — CPU, memory, connection pools). Saturation is usually the earliest warning sign before the other three degrade.
        </p>
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "I pick observability tooling based on team size and existing skill, not feature checklists. A small team is usually better served by a managed platform that correlates logs/metrics/traces out of the box — operating your own Prometheus/Grafana stack is a real ongoing commitment, and it's only worth it once you have the platform team to own it or cost becomes the deciding factor at scale."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
