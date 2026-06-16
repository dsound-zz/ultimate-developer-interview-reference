import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { Callout } from '../../components/Callout';

export const SlaSloSli: React.FC = () => {
  return (
    <SectionContainer
      id="sla-slo-sli"
      title="SLA, SLO, SLI"
      category="OPERATIONS"
      accentColor="var(--blue)"
    >
      <SectionCard title="Key Operational Definitions">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>SLI (Service Level Indicator)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              The actual, raw metric measured at runtime.
              <br /><em>Example:</em> "Our p99 latency was 240ms." or "Our error rate was 0.3%."
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>SLO (Service Level Objective)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              The internal target we commit to as an engineering team.
              <br /><em>Example:</em> "Our p99 latency must remain below 300ms."
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--red)' }}>SLA (Service Level Agreement)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              The contractual commitment with clients. Violation incurs business/financial penalties.
              <br /><em>Example:</em> "We guarantee 99.9% uptime, or we credit your account."
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="The Error Budget">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          The distance between your SLO target and your SLA commitment represents your error budget. You burn this budget on risky deployments, experiments, or fast feature releases. If the budget is exhausted, releases freeze until the metrics recover.
        </p>
        
        {/* Error Budget Bar */}
        <div style={{
          display: 'flex',
          background: 'var(--surface)',
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          border: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          gap: '0.25rem',
          alignItems: 'center'
        }}>
          <div style={{ flex: '7', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid var(--accent)', padding: '0.35rem', borderRadius: '4px', textAlign: 'center' }}>
            SLA Contract
          </div>
          <div style={{ flex: '3', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid var(--green)', padding: '0.35rem', borderRadius: '4px', textAlign: 'center' }}>
            SLO Target
          </div>
          <div style={{ flex: '1.5', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid var(--red)', padding: '0.35rem', borderRadius: '4px', textAlign: 'center' }}>
            Budget
          </div>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', textAlign: 'center' }}>
          Error Budget = SLO Target − SLA Commitment. Once burned, feature deployments are frozen.
        </p>
      </SectionCard>

      <SectionCard title="Uptime & The Nines Table">
        <CompareTable
          headers={['Availability', 'Downtime / Year', 'Downtime / Month', 'Downtime / Week']}
          columnWidths={['1fr', '1fr', '1.2fr', '1.2fr']}
          rows={[
            ['99% (Two Nines)', '87.6 hours', '7.2 hours', '1.68 hours'],
            ['99.9% (Three Nines)', '8.76 hours', '43.8 minutes', '10.1 minutes'],
            ['99.99% (Four Nines)', '52.6 minutes', '4.38 minutes', '1.01 minutes'],
            ['99.999% (Five Nines)', '5.26 minutes', '26.3 seconds', '6.05 seconds'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "When an interviewer asks for '99.99% uptime', I translate that to: 52 minutes of downtime per year. That means a single bad deploy that takes an hour to detect and roll back already breaks your annual budget. This reality mandates automated canary releases, blue/green deployments, circuit breaking, and rapid rollback triggers."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
