import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { Callout } from '../../components/Callout';

export const ConcurrencyRuntime: React.FC = () => {
  return (
    <SectionContainer
      id="concurrency-runtime"
      title="Concurrency & Runtime Models"
      category="RUNTIME"
      accentColor="var(--amber)"
    >
      <SectionCard title="Threads vs. Processes vs. Async">
        <CompareTable
          headers={['Model', 'Memory', 'Switch Cost', 'Failure Isolation']}
          columnWidths={['1.2fr', '1.5fr', '1.3fr', '1.5fr']}
          rows={[
            ['Process', 'Isolated address space', 'Highest (full context switch)', 'Strong — a crash can\'t corrupt another process\'s memory'],
            ['Thread', 'Shared address space within a process', 'Moderate', 'Weak — one thread\'s bad pointer can corrupt shared state'],
            ['Async (event loop)', 'Single thread, shared memory', 'Lowest (no OS context switch)', 'Weak — one unhandled blocking call stalls everything'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Runtime Models in the Wild">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Node.js — Single-Threaded Event Loop</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              One thread runs your JS; I/O is delegated to libuv's thread pool. Excellent for I/O-bound workloads, terrible if you run CPU-heavy synchronous code — it blocks every other request.
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--blue)' }}>JVM — Thread-Per-Request</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Each request typically gets a dedicated OS thread from a pool. Simple mental model, but thread stacks are expensive — thousands of concurrent connections means thousands of threads. Virtual threads (Project Loom) close this gap.
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Go — Goroutines</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Lightweight (~2KB stack) green threads multiplexed onto a small number of OS threads by the Go scheduler. Cheap enough to spawn per-request or per-task without the JVM's memory overhead.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Race Conditions & Synchronization Primitives">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li><strong>Mutex</strong>: only one thread may hold the lock at a time — protects a critical section.</li>
          <li><strong>Semaphore</strong>: allows up to N holders concurrently — used for bounding concurrency (e.g. a connection pool limit).</li>
          <li><strong>Atomic operations</strong>: hardware-level compare-and-swap, avoiding lock overhead entirely for simple counters/flags.</li>
          <li>A race condition needs two things: <em>shared mutable state</em> and <em>concurrent access without synchronization</em>. Remove either one and the bug disappears.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Garbage Collection Awareness">
        <Callout type="key-insight">
          GC pauses ("stop-the-world" or concurrent) directly impact p99 latency, not average latency. A service can have a great average response time and still fail its SLA because GC pauses spike the tail. This is why latency-sensitive services tune heap size and GC algorithm (G1, ZGC, Shenandoah) rather than treating it as a black box.
        </Callout>
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            Running a synchronous, CPU-heavy operation (image resizing, large JSON parsing, crypto hashing) directly inside a Node.js request handler. It blocks the single event loop thread, stalling every other in-flight request on the process.
          </Callout>
          <Callout type="senior-signal">
            "I pick the concurrency model based on the workload's bottleneck. I/O-bound and high fan-out — async/event loop. CPU-bound and parallelizable — worker threads or a process pool. I don't reach for more threads to fix a problem that's actually waiting on a downstream service."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
