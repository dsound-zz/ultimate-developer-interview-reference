import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const Caching: React.FC = () => {
  return (
    <SectionContainer
      id="caching"
      title="Caching"
      category="REDUCING REPEATED WORK"
      accentColor="var(--red)"
    >
      <SectionCard title="The Problem">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Recomputing or re-fetching the same expensive result on every request wastes latency and load on whatever's doing the real work — usually a database. A cache sits in front of that slow path and serves repeat requests from fast, in-memory storage instead, at the cost of having to reason about staleness: a cached value can be wrong the moment the underlying data changes.
        </p>
      </SectionCard>

      <SectionCard title="Platforms Compared">
        <CompareTable
          headers={['Platform', 'Provider', 'Notable Trait']}
          columnWidths={['1.3fr', '1.3fr', '2.4fr']}
          rows={[
            ['Redis (self/managed)', 'AWS ElastiCache, GCP Memorystore, Azure Cache for Redis', 'Rich data structures (hashes, sorted sets, lists) — a cache that doubles as a lightweight data store'],
            ['Memcached', 'Available on every major cloud', 'Simpler than Redis — pure key-value, multi-threaded, slightly better raw throughput for plain caching'],
            ['Varnish', 'Self-hosted', 'HTTP-specific reverse-proxy cache — caches entire rendered responses, not just data'],
          ]}
        />
        <Callout type="key-insight">
          CDN edge caching (covered separately) solves a related but distinct problem — caching whole HTTP responses close to users globally, versus Redis/Memcached caching application data close to your backend. Most production systems use both layers together.
        </Callout>
      </SectionCard>

      <SectionCard title="Redis Data Structures">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li><strong>String</strong>: simple key-value, plus atomic counters (<InlineCode>INCR</InlineCode>) — the basis for rate limiters.</li>
          <li><strong>Hash</strong>: a field-value map under one key — efficient for caching an object without re-serializing the whole thing on every field update.</li>
          <li><strong>List</strong>: ordered, push/pop from either end — a simple queue or capped activity feed.</li>
          <li><strong>Sorted Set</strong>: unique, scored, ordered members — the standard structure behind real-time leaderboards.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Caching Patterns & Eviction">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li><strong>Cache-aside</strong>: app checks the cache first, falls back to the database on a miss and writes the result back. Most common pattern — the cache being down degrades to "slower," not "broken."</li>
          <li><strong>Write-through</strong>: every write goes to the cache and database together, keeping the cache always warm at the cost of extra write latency.</li>
          <li><strong>Eviction policy</strong>: <InlineCode>allkeys-lru</InlineCode> (evict least-recently-used) is the right default for a pure cache — using a no-eviction policy on a cache workload risks the cache simply refusing new writes once memory fills.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "I treat a cache as disposable, not a system of record, unless I've deliberately configured persistence and accepted the tradeoffs. The test I apply: if the cache disappeared right now, can the system rebuild that data from the source of truth without anyone noticing besides a latency blip? If not, that data doesn't belong in the cache alone."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
