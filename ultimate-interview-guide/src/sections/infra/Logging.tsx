import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { CodeBlock } from '../../components/CodeBlock';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const Logging: React.FC = () => {
  return (
    <SectionContainer
      id="logging"
      title="Logging"
      category="WHAT HAPPENED"
      accentColor="var(--amber)"
    >
      <SectionCard title="The Problem">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          A distributed system might have logs scattered across dozens or thousands of ephemeral containers/instances — by the time you need to debug an incident, the machine that logged the error may no longer exist. Centralized logging platforms ship every log line to one durable, searchable place, so "what happened" doesn't depend on which specific instance happened to handle the request.
        </p>
      </SectionCard>

      <SectionCard title="Platforms Compared">
        <CompareTable
          headers={['Platform', 'Provider', 'Notable Trait']}
          columnWidths={['1.2fr', '1.3fr', '2.5fr']}
          rows={[
            ['CloudWatch Logs', 'AWS', 'Default destination for Lambda/ECS/EKS logs with zero extra setup; querying (Logs Insights) is more limited than dedicated tools'],
            ['Cloud Logging', 'GCP', 'Automatically captures logs from most GCP services with structured fields out of the box'],
            ['Monitor Logs', 'Azure', 'Kusto Query Language (KQL) for log queries — distinctive but a real learning curve'],
            ['Datadog', 'Third-party (multi-cloud)', 'Unifies logs, metrics, and traces in one product — strong correlation between the three'],
            ['Elastic Stack (ELK)', 'Self-hosted or Elastic Cloud', 'Open-source, highly customizable; full-text search (Elasticsearch) is its core strength'],
            ['Splunk', 'Third-party / self-hosted', 'Long-standing enterprise standard, powerful query language, often the priciest option at scale'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Structured Logging">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Every platform above is dramatically more useful when logs are structured (JSON) rather than free-text — structured fields are what actually make a log queryable ("show me every request with <InlineCode>userId=123</InlineCode> and <InlineCode>status&gt;=500</InlineCode>"):
        </p>
        <CodeBlock code={`{
  "timestamp": "2026-06-25T14:02:11Z",
  "level": "error",
  "service": "orders-api",
  "requestId": "req_8f3a...",
  "userId": "user_123",
  "message": "payment capture failed",
  "errorCode": "card_declined"
}`} />
      </SectionCard>

      <SectionCard title="Retention & Cost">
        <Callout type="key-insight">
          Logging cost scales with volume, and verbose debug-level logging in production adds up fast across every platform here. Most teams set a short hot-retention window for full-fidelity logs (searchable, expensive) and a longer cold-archive window (object storage, cheap) for compliance — rarely keeping everything "hot" indefinitely.
        </Callout>
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "I treat log volume as a cost lever, not just an engineering convenience — logging every field at debug level in production is easy to add and easy to forget about until the bill reflects it. I'd rather log fewer, well-chosen structured fields with a <InlineCode>requestId</InlineCode> threaded through every service than log everything verbosely and hope the query tool can find the signal later."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
