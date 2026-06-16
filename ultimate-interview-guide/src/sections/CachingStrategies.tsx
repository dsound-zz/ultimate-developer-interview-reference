import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { SectionCard } from '../components/SectionCard';
import { InlineCode } from '../components/InlineCode';
import { Badge } from '../components/Badge';

export const CachingStrategies: React.FC = () => {
  return (
    <SectionContainer
      id="caching-strategies"
      title="Caching Strategies"
      category="CACHING"
      accentColor="var(--green)"
    >
      <SectionCard title="HTTP / CDN cache">
        <ul>
          <li><InlineCode>Cache-Control: public, max-age=31536000, immutable</InlineCode> — for content-hashed static assets</li>
          <li><InlineCode>stale-while-revalidate</InlineCode> — serve stale, refresh in background. HTTP-level ISR.</li>
          <li>CDN edge caching: page HTML cached at edge, invalidated by path/tag on deploy</li>
          <li><InlineCode>Vary</InlineCode> header: cache separately per <InlineCode>Accept-Encoding</InlineCode>, <InlineCode>Accept-Language</InlineCode></li>
        </ul>
      </SectionCard>

      <SectionCard title="Client-side data cache (TanStack Query)">
        <ul>
          <li>Cache server state in memory, deduplicate in-flight requests, background refetch</li>
          <li><InlineCode>staleTime</InlineCode> — how long data is considered fresh (no refetch triggered)</li>
          <li><InlineCode>gcTime</InlineCode> — how long inactive data stays in cache before GC</li>
          <li>Query invalidation on mutation → fresh data without full reload</li>
          <li><Badge variant="info">Info</Badge> TanStack Query is a smart async state machine, not just a fetch wrapper</li>
        </ul>
      </SectionCard>

      <SectionCard title="Next.js 4-layer cache">
        <ul>
          <li><strong>Request Memoization</strong> — dedupes identical <InlineCode>fetch()</InlineCode> in one render tree</li>
          <li><strong>Data Cache</strong> — persists across requests. Invalidated by <InlineCode>revalidateTag</InlineCode>.</li>
          <li><strong>Full Route Cache</strong> — stores rendered HTML + RSC payload on server</li>
          <li><strong>Router Cache</strong> — client-side prefetched pages. Survives soft navigation.</li>
          <li><Badge variant="tip">Tip</Badge> <InlineCode>no-store</InlineCode> opts out of data cache for truly dynamic, per-user data</li>
        </ul>
      </SectionCard>
    </SectionContainer>
  );
};
