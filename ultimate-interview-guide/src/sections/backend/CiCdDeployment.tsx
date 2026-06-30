import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { StepList } from '../../components/StepList';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const CiCdDeployment: React.FC = () => {
  return (
    <SectionContainer
      id="ci-cd-deployment"
      title="CI/CD & Deployment"
      category="DELIVERY"
      accentColor="var(--green)"
    >
      <SectionCard title="Twelve-Factor App Highlights">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li><strong>Config in the environment</strong>: never hardcode environment-specific values — read them from env vars, not committed config files.</li>
          <li><strong>Stateless processes</strong>: any persistent state (sessions, files) lives in an external backing service, so any instance can handle any request and be killed/restarted freely.</li>
          <li><strong>Disposability</strong>: fast startup and graceful shutdown — a process should finish in-flight requests and exit cleanly on <InlineCode>SIGTERM</InlineCode>, not be force-killed mid-request.</li>
          <li><strong>Dev/prod parity</strong>: keep environments as similar as possible (same backing service versions) to avoid "works on my machine" surprises.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Deployment Strategies">
        <CompareTable
          headers={['Strategy', 'Rollback Speed', 'Resource Cost', 'Risk Profile']}
          columnWidths={['1.2fr', '1.3fr', '1.3fr', '2fr']}
          rows={[
            ['Recreate', 'Slow (must redeploy old version)', 'Low', 'Downtime during cutover — simplest but riskiest for availability'],
            ['Rolling', 'Moderate (drain in reverse)', 'Low — incremental', 'Brief window where old and new versions both serve traffic'],
            ['Blue-Green', 'Instant (flip the router back)', 'High — two full environments running', 'Near-zero downtime; easiest to reason about, costliest to run'],
            ['Canary', 'Fast (route traffic away from canary)', 'Low — small canary fleet', 'Limits blast radius — issues caught on a small traffic slice before full rollout'],
          ]}
        />
      </SectionCard>

      <SectionCard title="A Typical CI/CD Pipeline">
        <StepList
          steps={[
            <span key="1"><strong>Lint & unit test</strong> — fastest feedback loop, fails the build in seconds on obvious issues.</span>,
            <span key="2"><strong>Build artifact</strong> — compile/bundle and produce an immutable, versioned artifact (container image) once.</span>,
            <span key="3"><strong>Integration test</strong> — run the artifact against real or realistic dependencies.</span>,
            <span key="4"><strong>Deploy to staging</strong> — same artifact, production-like environment, smoke tests.</span>,
            <span key="5"><strong>Progressive production rollout</strong> — canary or rolling deploy with automated health checks gating each step.</span>,
          ]}
        />
        <Callout type="key-insight">
          Build the artifact exactly once and promote that same artifact through every stage. Rebuilding per-environment risks "works in staging, breaks in prod" drift from a different dependency resolution or build flag.
        </Callout>
      </SectionCard>

      <SectionCard title="Feature Flags & Progressive Delivery">
        <Callout type="key-insight">
          Feature flags decouple <em>deployment</em> (code is running in production) from <em>release</em> (a user can actually reach that code path). This lets you deploy continuously while controlling exposure separately — ramping a risky change to 1% of traffic, or instantly killing it without a redeploy if it misbehaves.
        </Callout>
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            Shipping a database migration and the code that depends on it in the same deploy, with no rollback path. If the deploy needs to be rolled back, the old code is now running against a migrated schema it doesn't understand. Migrations should be backward-compatible and deployed separately from the code that depends on them.
          </Callout>
          <Callout type="senior-signal">
            "I think about rollback before I think about rollout. Every deploy plan I write has an explicit answer to 'what happens if this needs to be reverted in five minutes' — feature flags for behavior changes, backward-compatible migrations for schema changes, and canary analysis before full exposure."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
