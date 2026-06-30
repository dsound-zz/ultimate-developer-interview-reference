import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const CdnEdge: React.FC = () => {
  return (
    <SectionContainer
      id="cdn-edge"
      title="CDN & Edge"
      category="GLOBAL DELIVERY"
      accentColor="var(--blue)"
    >
      <SectionCard title="The Problem">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Physics doesn't negotiate — a user in Tokyo hitting an origin server in Virginia pays for that round-trip distance no matter how fast your code is. A CDN caches content at edge locations physically close to users worldwide, serving most requests without ever reaching the origin, which also means the origin sees a fraction of the real traffic.
        </p>
      </SectionCard>

      <SectionCard title="Platforms Compared">
        <CompareTable
          headers={['Platform', 'Notable Trait']}
          columnWidths={['1.3fr', '3.7fr']}
          rows={[
            ['Cloudflare', 'Enormous edge network plus a full platform around it (Workers, R2, DNS, DDoS protection) — often the default recommendation for breadth at a given price point'],
            ['AWS CloudFront', 'Deepest integration with other AWS services (S3, Lambda@Edge, ALB origins) — the natural choice if you\'re already AWS-native'],
            ['Fastly', 'Real-time purge and highly programmable edge logic (VCL) — popular with teams needing instant, precise cache invalidation'],
            ['Akamai', 'The oldest and one of the largest networks — common in large enterprise contracts'],
            ['GCP Cloud CDN', 'Tightly integrated with GCP load balancers and Cloud Storage origins'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Edge Compute">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          The newer layer on top of plain caching: running actual code at edge locations instead of just static files. <InlineCode>Cloudflare Workers</InlineCode> and <InlineCode>Lambda@Edge</InlineCode> / <InlineCode>CloudFront Functions</InlineCode> let you do things like A/B test routing, auth checks, or header rewriting at the edge — closer to the user and without a round trip to origin — at the cost of a more constrained runtime than a full backend server.
        </p>
      </SectionCard>

      <SectionCard title="The Hard Part: Invalidation">
        <Callout type="key-insight">
          "There are only two hard things in computer science: cache invalidation and off-by-one errors" applies directly here. A CDN makes content fast to serve but harder to update instantly — purging a cached asset across hundreds of global edge nodes isn't free or always immediate. This is why versioned asset filenames (<InlineCode>app.a1b2c3.js</InlineCode>) are preferred over relying on cache purges for anything that must update reliably and immediately.
        </Callout>
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "I default to long cache lifetimes plus content-hashed filenames for static assets, rather than short TTLs plus manual purges — it sidesteps invalidation entirely instead of fighting it. For genuinely dynamic content, I think carefully about what's actually cacheable (a logged-out homepage, yes; a personalized dashboard, no) rather than treating the CDN as all-or-nothing."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
