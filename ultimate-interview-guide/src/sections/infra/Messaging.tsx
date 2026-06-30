import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { Callout } from '../../components/Callout';

export const Messaging: React.FC = () => {
  return (
    <SectionContainer
      id="messaging"
      title="Messaging & Event Streaming"
      category="DECOUPLING SERVICES"
      accentColor="var(--amber)"
    >
      <SectionCard title="The Problem">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Services calling each other directly and synchronously means every caller is coupled to every callee's availability and latency — one slow downstream service makes everything upstream of it slow too. Messaging platforms put a durable buffer between services: the sender doesn't wait for the receiver, and the receiver processes work at its own pace, even catching up later if it was offline.
        </p>
      </SectionCard>

      <SectionCard title="Three Different Shapes">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Queue</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>One message, consumed by exactly one worker, then removed. Built for task distribution — "do this job once."</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Pub/Sub</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>One message, fanned out to every subscriber. Built for notification — "tell everyone who cares this happened."</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--blue)' }}>Log-Based Streaming</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Messages persist on a durable, ordered log; consumers track their own read position and can replay history. Built for event streaming at scale.</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Platforms Compared">
        <CompareTable
          headers={['Platform', 'Provider', 'Shape', 'Notable Trait']}
          columnWidths={['1.1fr', '1.3fr', '1.2fr', '2.4fr']}
          rows={[
            ['Apache Kafka', 'Self-hosted or Confluent (managed)', 'Log-based streaming', 'Messages are retained and replayable — consumers can reprocess history, not just react to new events'],
            ['SQS', 'AWS', 'Queue', 'Simple, durable, at-least-once queue — the default choice for task distribution on AWS'],
            ['SNS / EventBridge', 'AWS', 'Pub/Sub', 'EventBridge adds content-based routing rules on top of plain fan-out'],
            ['Pub/Sub', 'GCP', 'Pub/Sub + some streaming features', 'GCP\'s unified messaging primitive, used both for simple fan-out and higher-throughput pipelines'],
            ['Service Bus', 'Azure', 'Queue + Pub/Sub (topics)', 'Adds enterprise messaging features like sessions and dead-lettering natively'],
          ]}
        />
      </SectionCard>

      <SectionCard title="When Does Kafka Earn Its Complexity?">
        <Callout type="key-insight">
          Kafka is the heaviest option here operationally (or the most expensive, managed via Confluent) — and it's overkill for "just send this one task to a worker," which is a queue's job. It earns its place when you need <em>replayability</em> (reprocess the last 7 days of events after fixing a bug), very high sustained throughput, or multiple independent consumer groups reading the same event stream for different purposes (e.g. one service updates a database, another feeds a real-time dashboard, off the same events).
        </Callout>
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "I start with the simplest shape that fits — a plain queue (SQS) for task distribution, pub/sub for simple fan-out notifications — and only reach for Kafka when I specifically need replay, very high throughput, or multiple consumer groups processing the same stream independently. Picking Kafka by default because it's the most capable option means carrying operational complexity the problem doesn't actually need."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
