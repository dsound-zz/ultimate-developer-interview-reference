import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { Callout } from '../../components/Callout';

export const Deployment: React.FC = () => {
  return (
    <SectionContainer
      id="deployment"
      title="Deployment Targets"
      category="WHERE CODE RUNS"
      accentColor="var(--accent)"
    >
      <SectionCard title="The Problem">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Before you can run a deployment strategy (rolling, blue-green, canary), you need somewhere for the code to actually live and execute. That choice trades off three things against each other: how much control you have over the runtime, how much operational burden you carry, and how you pay (for capacity vs. for usage). Every platform below is really just a different point on that triangle.
        </p>
      </SectionCard>

      <SectionCard title="The Hosting Models">
        <CompareTable
          headers={['Model', 'You Manage', 'Platform Manages', 'Examples']}
          columnWidths={['1.2fr', '2fr', '2fr', '2fr']}
          rows={[
            ['IaaS (raw VMs)', 'OS, runtime, scaling, patching, deployment process', 'Physical hardware, virtualization, networking', 'AWS EC2, GCP Compute Engine, Azure VMs'],
            ['PaaS', 'Application code and config', 'OS, runtime, scaling, load balancing', 'Heroku, Render, AWS Elastic Beanstalk, Azure App Service'],
            ['Containers/Orchestration', 'Container images, scaling rules, manifests', 'Scheduling, self-healing, networking between containers', 'Kubernetes, AWS ECS/EKS, GCP GKE'],
            ['Serverless Functions', 'Function code only', 'Everything — runtime, scaling to zero, infra', 'AWS Lambda, Cloudflare Workers, GCP Cloud Functions'],
            ['Frontend-specific PaaS', 'Static assets / framework build output', 'CDN distribution, build pipeline, edge functions', 'Vercel, Netlify, Cloudflare Pages'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Deployment Strategies Need a Capable Host">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Blue-green and canary deploys aren't free on every platform — they require the host to support running two versions simultaneously and shifting traffic between them. PaaS platforms (Heroku, Render) and orchestrators (Kubernetes, ECS) typically give you this out of the box. On raw VMs, you're building that traffic-shifting logic yourself, usually with a load balancer and two target groups.
        </p>
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            Reaching for Kubernetes for a project that's one small API and a database. The orchestration overhead (manifests, cluster management, networking concepts) buys you nothing at that scale and slows the team down — a PaaS or a single container on a managed service gets the same outcome with far less operational surface.
          </Callout>
          <Callout type="senior-signal">
            "I pick the hosting model based on how much the team's operational capacity matches the platform's demands, not based on what's most 'production-grade.' A two-person team is usually better served by a PaaS or managed container service than by operating their own Kubernetes cluster — the control Kubernetes gives you is only valuable if you actually need it and can staff for it."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
