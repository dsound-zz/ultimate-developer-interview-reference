import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { Callout } from '../../components/Callout';
import { CdnEdgeMap } from '../../diagrams/CdnEdgeMap';

export const CdnEdge: React.FC = () => {
  return (
    <SectionContainer
      id="cdn-edge"
      title="CDN & Edge"
      category="GEOGRAPHY"
      accentColor="var(--cyan)"
    >
      <SectionCard title="Edge Caching Network Map">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Moving data physically closer to users eliminates WAN geographic latency bottlenecks. Edge nodes cache resources and proxy misses to origin:
        </p>
        <div style={{ padding: '1rem 0', background: 'var(--surface)', borderRadius: '6px', border: '1px solid var(--border)', marginBottom: '1rem' }}>
          <CdnEdgeMap />
        </div>
      </SectionCard>

      <SectionCard title="What CDNs Cache">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Static Assets</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              JS bundles, CSS files, fonts, and images. Long TTLs (e.g., 1 year) paired with content hashing in build names.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>API Responses</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Read-heavy HTTP GET requests (like product Catalogs) cached at the edge using custom HTTP Headers.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--cyan)' }}>Static HTML / ISR</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Server-rendered HTML pages. Edge nodes serve cached markup, revalidating on schedules or background triggers.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="CDN Cache Invalidation">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--yellow)' }}>Path-Based Purging</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Issuing a purge call on a specific resource path (`POST /purge /products/123`). Immediate, highly targeted, but requires precise orchestration.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--orange)' }}>Tag-Based Purging</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Attaching tags to HTTP responses (e.g. `Cache-Tag: category-12`). Purging `category-12` instantly invalidates hundreds of related page resources.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "HTTP Cache-Control headers are the primary interface to CDNs. I use `public, max-age=31536000, immutable` for static build chunks to prevent browsers from requesting them again. For semi-dynamic API payloads, I use `s-maxage=60, stale-while-revalidate=300`, which directs the CDN to serve stale content instantly from the edge while fetching fresh updates asynchronously in the background."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
