import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { TradeoffCard } from '../../components/TradeoffCard';
import { Callout } from '../../components/Callout';

export const MessageQueues: React.FC = () => {
  return (
    <SectionContainer
      id="message-queues"
      title="Message Queues"
      category="ASYNCHRONOUS PATTERNS"
      accentColor="var(--amber)"
    >
      <SectionCard title="Queue vs. Event Stream">
        <TradeoffCard
          title="Message Queue (e.g. RabbitMQ, AWS SQS) vs. Log Stream (e.g. Apache Kafka, AWS Kinesis)"
          gains={[
            'Queue: Messages are deleted instantly upon consumer acknowledgment (saves memory).',
            'Queue: Natural point-to-point task distribution. Easy to scale worker counts.',
            'Stream: Messages are persistent and immutable logs. Multiple consumers can read independently.',
            'Stream: Consumers can replay historical events from any historical offset.',
          ]}
          costs={[
            'Queue: Cannot support multiple independent consumers reading the same event (once read, it is gone).',
            'Queue: Lacks transaction log replay capabilities.',
            'Stream: High complexity (requires partition management, offset tracking, and cluster coordination).',
            'Stream: Consumers must handle data retention storage cleanup.',
          ]}
        />
      </SectionCard>

      <SectionCard title="Why Queues? (4 Key Scenarios)">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>1. Absorb Traffic Spikes</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              An influx of 10,000 tasks gets placed in a queue. Workers drain them sequentially at a safe pace, preventing database CPU exhaust.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>2. Decouple Microservices</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Order Service emits `order_placed` and returns immediately. Email Service, Inventory Service, and Analytics consume this event independently.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--cyan)' }}>3. Resilient Retries</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              If a worker fails to process a task due to temporary downstream network errors, the task is re-queued with an exponential backoff retry.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--yellow)' }}>4. Downstream Rate-Limiting</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              If a third-party billing vendor restricts calls to 10 req/sec, the queue buffer holds tasks while the workers limit dispatch rate.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Advanced Queue Patterns">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--red)' }}>Dead Letter Queue (DLQ)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Failed messages that exceed retry limits are redirected to a DLQ. This prevents "poison pill" messages from blocking workers in an infinite failure loop.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--orange)' }}>Backpressure Management</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              When consumers cannot keep pace with producers, the queue grows. Without backpressure controls, queues run out of memory. Fix by slowing down producers, scaling workers, or shedding low-priority load.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Senior Signal & Analogy">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="senior-signal">
            "Queue delivery guarantees are typically *at-least-once* rather than *exactly-once* (due to network drops during acknowledgments). Therefore, your consumers must be designed to be idempotent. Processing the same message multiple times must result in the same final system state. I achieve this by checking processed transaction IDs in Redis before performing writes."
          </Callout>

          <Callout type="analogy">
            "A message queue is like a restaurant ticket rail. Orders (messages) accumulate on the rail. Line cooks (workers) pull one ticket at a time. A sudden rush of diners doesn't crash the kitchen; it just builds a longer queue of tickets on the rail, which are processed at a steady pace."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
