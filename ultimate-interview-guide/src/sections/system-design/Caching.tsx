import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { TradeoffCard } from '../../components/TradeoffCard';
import { Callout } from '../../components/Callout';
import { CacheLayers } from '../../diagrams/CacheLayers';

export const Caching: React.FC = () => {
  return (
    <SectionContainer
      id="caching"
      title="Caching"
      category="PERFORMANCE"
      accentColor="var(--green)"
    >
      <SectionCard title="Vertical Cache Layers">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Caching operates at multiple tiers of the request life cycle. Cache hits short-circuit the request, preventing downstream network and DB overhead:
        </p>
        <div style={{ padding: '1rem 0', background: 'var(--surface)', borderRadius: '6px', border: '1px solid var(--border)', marginBottom: '1rem' }}>
          <CacheLayers />
        </div>
      </SectionCard>

      <SectionCard title="Caching Strategies">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TradeoffCard
            title="Cache-Aside (Lazy Loading)"
            gains={[
              'Only requested data is loaded into the cache (saves memory).',
              'System is resilient to cache node failures; defaults back to direct DB reads.',
            ]}
            costs={[
              'Cache miss penalty on first-time reads (requires two round-trips).',
              'Stale data risks if database updates occur without cache invalidation.',
            ]}
          />

          <TradeoffCard
            title="Write-Through"
            gains={[
              'Data in cache is never stale; cache is updated synchronously with the database.',
              'Simple read path (guaranteed cache hit for writes).',
            ]}
            costs={[
              'Write latency doubles because writes must block on both cache and DB writes.',
              'Cache can fill up with data that is never or rarely read.',
            ]}
          />

          <TradeoffCard
            title="Write-Behind (Write-Back)"
            gains={[
              'Extremely low write latency; application returns immediately after writing to cache.',
              'DB writes can be coalesced and batch-flushed to reduce DB load.',
            ]}
            costs={[
              'High risk of data loss: if the cache node crashes before flushing to the DB, updates are lost.',
              'Very complex sync mechanics and consistency handling.',
            ]}
          />

          <TradeoffCard
            title="Read-Through"
            gains={[
              'Simplifies application code: app reads from cache, cache handles DB fetching internally on a miss.',
              'Ensures cache and DB interfaces are decoupled from application logic.',
            ]}
            costs={[
              'High initial cache miss penalty.',
              'Requires implementing custom provider classes in the caching layer.',
            ]}
          />
        </div>
      </SectionCard>

      <SectionCard title="Cache Invalidation Strategies">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>TTL Expiration</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Automatic expiration of cache items after a set period. Simple and safe, but leaves a window where stale data is served.
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Event-Driven Invalidation</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Database writes or service updates fire events that explicitly delete affected cache keys. Provides exact freshness but increases complexity.
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--yellow)' }}>Cache Versioning</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Changing the base namespace key (e.g. `v1:user:123` to `v2:user:123`). Instantly invalidates all assets at the cost of leaving old keys to expire via TTL.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Performance Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            <strong>Cache Stampede (Thundering Herd)</strong>: Occurs when a highly popular key (e.g. homepage configuration) expires, causing thousands of concurrent requests to miss the cache and hit the database simultaneously, knocking the DB offline.
            <br /><em>Mitigations:</em> Probabilistic early expiration (XFetch), mutex locks on cache misses (only one thread fetches, others wait), or background worker cron updates before TTL expiry.
          </Callout>

          <Callout type="senior-signal">
            "I always monitor the cache hit rate metric. If your hit rate is below 80%, you are adding consistency overhead and architectural complexity for very little hardware benefit. At 95%+, you have effectively insulated your database. Designing cache sizing and eviction policies (LRU, LFU) should be driven by this single metric."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
