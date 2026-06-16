import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { SectionCard } from '../components/SectionCard';
import { InlineCode } from '../components/InlineCode';
import { Badge } from '../components/Badge';

export const RenderingStrategies: React.FC = () => {
  return (
    <SectionContainer
      id="rendering-strategies"
      title="Rendering Strategies"
      category="RENDERING"
      accentColor="var(--amber)"
    >
      <SectionCard title="CSR — Client-Side Rendering">
        <div style={{ marginBottom: '10px' }}>
          <Badge variant="info">SPA</Badge>
        </div>
        <ul>
          <li>Server sends empty HTML shell + JS bundle. Browser runs JS → renders content.</li>
          <li>✓ Rich interactivity, fast transitions after initial load</li>
          <li>✗ Slow TTI, poor SEO by default, blank flash on first load</li>
          <li>Best for: dashboards, authenticated apps, admin panels</li>
        </ul>
      </SectionCard>

      <SectionCard title="SSR — Server-Side Rendering">
        <div style={{ marginBottom: '10px' }}>
          <Badge variant="warn">DYNAMIC</Badge>
        </div>
        <ul>
          <li>HTML generated per-request on the server. Browser gets full HTML immediately.</li>
          <li>✓ Great SEO, fast FCP, always fresh data</li>
          <li>✗ Server load, higher TTFB possible, harder to cache</li>
          <li>Best for: product pages, user-personalized content, SEO-critical pages</li>
        </ul>
      </SectionCard>

      <SectionCard title="SSG — Static Site Generation">
        <div style={{ marginBottom: '10px' }}>
          <Badge variant="good">FASTEST</Badge>
        </div>
        <ul>
          <li>HTML built once at build time. Served from CDN edge.</li>
          <li>✓ Fastest TTFB, highest Lighthouse scores, cheapest to host</li>
          <li>✗ Stale data until next build</li>
          <li>Best for: marketing, blogs, docs, landing pages</li>
        </ul>
      </SectionCard>

      <SectionCard title="ISR — Incremental Static Regen">
        <div style={{ marginBottom: '10px' }}>
          <Badge variant="info">HYBRID</Badge>
        </div>
        <ul>
          <li>Static pages that revalidate on a timer (<InlineCode>revalidate: 60</InlineCode>) or on-demand (<InlineCode>revalidateTag</InlineCode>).</li>
          <li>✓ CDN speed + scheduled freshness</li>
          <li>✗ First user after stale window gets old content (stale-while-revalidate)</li>
          <li>Best for: e-commerce listings, news feeds, content that changes but not per-user</li>
        </ul>
      </SectionCard>

      <SectionCard title="React Server Components">
        <ul>
          <li>Run on server only — zero JS shipped to browser</li>
          <li><InlineCode>"use client"</InlineCode> boundary converts a subtree to client-rendered</li>
          <li>Cannot use hooks, event handlers, or browser APIs</li>
          <li><Badge variant="info">Info</Badge> RSC reduces bundle size because component code never ships to the client</li>
        </ul>
      </SectionCard>

      <SectionCard title="Hydration">
        <ul>
          <li>SSR/SSG sends HTML. React "attaches" event handlers to existing DOM = hydration.</li>
          <li>Until hydration completes, buttons look clickable but don't work — the <em>uncanny valley</em></li>
          <li><InlineCode>Suspense</InlineCode> + streaming HTML lets React hydrate in chunks</li>
          <li><Badge variant="trap">Trap</Badge> Hydration mismatch: server HTML ≠ client render. Common culprit: <InlineCode>new Date()</InlineCode> or <InlineCode>Math.random()</InlineCode> in render.</li>
        </ul>
      </SectionCard>
    </SectionContainer>
  );
};
