import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { SectionCard } from '../components/SectionCard';
import { InlineCode } from '../components/InlineCode';
import { Badge } from '../components/Badge';

export const Optimization: React.FC = () => {
  return (
    <SectionContainer
      id="optimization"
      title="Optimization"
      category="PERFORMANCE"
      accentColor="var(--green)"
    >
      <SectionCard title="Render optimization">
        <ul>
          <li><InlineCode>React.memo(Component)</InlineCode> — skips re-render if props shallowly equal. Combine with <InlineCode>useCallback</InlineCode> for callbacks.</li>
          <li><strong>Lift state down</strong>: keep state close to where it's used</li>
          <li><strong>Component composition</strong>: pass children as props — they don't re-render when parent does</li>
          <li><InlineCode>key</InlineCode> changes force a full remount — useful to reset component state deliberately</li>
          <li>React DevTools Profiler → "Highlight updates when component renders"</li>
        </ul>
      </SectionCard>

      <SectionCard title="Bundle optimization">
        <ul>
          <li><InlineCode>React.lazy + Suspense</InlineCode> — code-split at route or component level</li>
          <li><InlineCode>{"dynamic(() => import(...))"}</InlineCode> in Next.js — SSR-safe lazy loading with <InlineCode>ssr: false</InlineCode> option</li>
          <li>Tree-shaking: use named imports, avoid barrel files</li>
          <li>Analyze with <InlineCode>@next/bundle-analyzer</InlineCode> or <InlineCode>webpack-bundle-analyzer</InlineCode></li>
          <li><Badge variant="tip">Tip</Badge> "I ship features behind lazy boundaries so the main bundle stays lean"</li>
        </ul>
      </SectionCard>

      <SectionCard title="Long list performance">
        <ul>
          <li><strong>Virtualization</strong>: only render DOM nodes for visible rows</li>
          <li>Libraries: <InlineCode>@tanstack/react-virtual</InlineCode>, <InlineCode>react-window</InlineCode></li>
          <li>Mental model: like a theater — only the actors on stage exist in the DOM</li>
          <li>Pagination / infinite scroll as alternatives when count is bounded</li>
        </ul>
      </SectionCard>

      <SectionCard title="Asset optimization">
        <ul>
          <li>Next.js <InlineCode>&lt;Image&gt;</InlineCode>: automatic WebP, lazy-load, prevents CLS via <InlineCode>width/height</InlineCode> or <InlineCode>fill</InlineCode></li>
          <li><InlineCode>loading="lazy"</InlineCode> on native <InlineCode>&lt;img&gt;</InlineCode> for below-fold images</li>
          <li><InlineCode>fetchpriority="high"</InlineCode> on LCP image — signals browser criticality</li>
          <li><InlineCode>next/font</InlineCode>: eliminates FOUT, self-hosts, sets <InlineCode>font-display: swap</InlineCode> automatically</li>
          <li>SVGs as React components = no network request, fully styleable</li>
        </ul>
      </SectionCard>
    </SectionContainer>
  );
};
