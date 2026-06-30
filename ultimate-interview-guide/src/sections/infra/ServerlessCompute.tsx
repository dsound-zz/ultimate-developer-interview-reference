import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { TradeoffCard } from '../../components/TradeoffCard';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const ServerlessCompute: React.FC = () => {
  return (
    <SectionContainer
      id="serverless-compute"
      title="Serverless Compute"
      category="EVENT-DRIVEN FUNCTIONS"
      accentColor="var(--amber)"
    >
      <SectionCard title="The Problem">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Many workloads are bursty or have long idle periods — a webhook handler, an image-resize-on-upload job, a cron task that runs once an hour. Provisioning and paying for always-on servers for that is wasteful, and scaling them up/down in response to traffic is its own operational job. Serverless functions hand both problems — provisioning and scaling — entirely to the platform, billing per invocation instead of per hour of idle capacity.
        </p>
      </SectionCard>

      <SectionCard title="Platforms Compared">
        <CompareTable
          headers={['Platform', 'Provider', 'Max Duration', 'Notable Trait']}
          columnWidths={['1.1fr', '1fr', '1.2fr', '2.5fr']}
          rows={[
            ['AWS Lambda', 'AWS', '15 minutes', 'Deepest event-source integration (S3, SQS, DynamoDB Streams, API Gateway)'],
            ['GCP Cloud Functions / Cloud Run', 'GCP', 'Up to 60 min (Cloud Run)', 'Cloud Run also accepts arbitrary containers, not just functions — a serverless/container hybrid'],
            ['Azure Functions', 'Azure', '10 min (Consumption plan)', 'Strong "Durable Functions" support for stateful, long-running workflows'],
            ['Cloudflare Workers', 'Cloudflare', 'CPU-time limited, not wall-clock', 'Runs at the edge, near-zero cold start (V8 isolates, not containers)'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Serverless vs. Containers">
        <TradeoffCard
          title="Serverless Functions vs. Always-On Containers"
          gains={[
            'Serverless: zero idle cost — nothing billed when there\'s no traffic.',
            'Serverless: no servers, clusters, or scaling config to manage at all.',
            'Containers: no cold starts on a warm fleet, predictable latency.',
            'Containers: no execution time limit — fits long-running processes, WebSocket connections, background workers.',
          ]}
          costs={[
            'Serverless: cold starts add latency after idle periods, worse for heavier runtimes (JVM, .NET).',
            'Serverless: hard execution time limits make it the wrong tool for long batch jobs.',
            'Containers: you pay for capacity whether or not it\'s used.',
            'Containers: more operational surface to set up — image builds, registries, deployment pipelines.',
          ]}
        />
      </SectionCard>

      <SectionCard title="Mitigating Cold Starts">
        <Callout type="key-insight">
          A cold start happens when the platform has to initialize a fresh execution environment before your handler runs. AWS Lambda's <InlineCode>Provisioned Concurrency</InlineCode> and Azure Functions' <InlineCode>Premium plan</InlineCode> both solve this the same way — paying to keep a set number of instances warm at all times — trading away some of the "pay only for usage" benefit for consistently low latency. Cloudflare Workers mostly avoid the problem altogether by using lightweight V8 isolates instead of spinning up a full container/runtime per invocation.
        </Callout>
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "I reach for serverless functions when the workload is event-driven or has long idle periods — that's the whole value proposition. Once traffic becomes steady and high-volume, I re-evaluate against containers, because at that point per-invocation pricing often costs more than a right-sized fleet running constantly — the platform choice should track the traffic shape, not a blanket 'serverless is modern' preference."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
