import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { StepList } from '../../components/StepList';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const CiCd: React.FC = () => {
  return (
    <SectionContainer
      id="ci-cd"
      title="CI/CD & Release Automation"
      category="SHIPPING SOFTWARE"
      accentColor="var(--green)"
    >
      <SectionCard title="The Problem">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Shipping changes manually — building locally, copying artifacts, SSH-ing into a server — doesn't scale and isn't repeatable; what works for one engineer's machine isn't guaranteed to work the same way for the next deploy. CI/CD platforms turn "build, test, deploy" into an automated, identical, auditable process that runs the same way every single time.
        </p>
      </SectionCard>

      <SectionCard title="Platforms Compared">
        <CompareTable
          headers={['Platform', 'Hosting', 'Notable Trait']}
          columnWidths={['1.2fr', '1.3fr', '2.5fr']}
          rows={[
            ['GitHub Actions', 'Hosted (or self-hosted runners)', 'Tightest integration if code already lives on GitHub; huge marketplace of pre-built actions'],
            ['GitLab CI', 'Hosted or self-hosted', 'Pipeline config lives alongside the GitLab-native repo and issue tracker'],
            ['CircleCI', 'Hosted', 'Mature caching and parallelism features, popular before GitHub Actions matured'],
            ['Jenkins', 'Self-hosted', 'Maximum flexibility and plugin ecosystem, at the cost of operating the Jenkins server yourself'],
            ['AWS CodePipeline / Azure DevOps', 'Cloud-native', 'Deepest integration with that cloud\'s own deploy targets (ECS, Lambda, App Service)'],
            ['ArgoCD', 'Kubernetes-native (GitOps)', 'Continuously reconciles the cluster\'s actual state to match a Git repo — deploy by merging a PR'],
          ]}
        />
      </SectionCard>

      <SectionCard title="A Typical Pipeline">
        <StepList
          steps={[
            <span key="1"><strong>Lint & unit test</strong> — fastest feedback, fails fast on obvious issues.</span>,
            <span key="2"><strong>Build artifact</strong> — compile/bundle once into an immutable, versioned artifact (usually a container image).</span>,
            <span key="3"><strong>Integration test</strong> — run the artifact against real or realistic dependencies.</span>,
            <span key="4"><strong>Deploy to staging</strong> — the exact same artifact, a production-like environment.</span>,
            <span key="5"><strong>Progressive production rollout</strong> — canary or rolling deploy gated by automated health checks.</span>,
          ]}
        />
        <Callout type="key-insight">
          Build the artifact exactly once and promote that same artifact through every stage. Rebuilding per-environment risks "works in staging, breaks in prod" drift from a slightly different dependency resolution or build flag.
        </Callout>
      </SectionCard>

      <SectionCard title="GitOps: Deploy by Pull Request">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Tools like <InlineCode>ArgoCD</InlineCode> and <InlineCode>Flux</InlineCode> flip the deployment model: instead of a pipeline pushing changes out to a cluster, an agent inside the cluster continuously watches a Git repo and pulls in whatever's declared there. Merging a PR that bumps an image tag <em>is</em> the deploy — and because the cluster state and the Git repo are kept in sync, drift between "what's declared" and "what's actually running" gets self-corrected automatically.
        </p>
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            Shipping a database migration and the code that depends on it in the same deploy with no rollback path. If the deploy needs reverting, the old code is now running against an already-migrated schema it doesn't understand — migrations should be backward-compatible and deployed separately from the code that depends on them.
          </Callout>
          <Callout type="senior-signal">
            "I pick a CI/CD platform based on where the team's deploy targets and source code already live — fighting that gravity (e.g. Jenkins for a team fully on GitHub with AWS deploy targets) adds integration work that buys nothing. The bigger lever is always pipeline design — fast feedback, one immutable artifact promoted through every stage — not which vendor runs it."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
