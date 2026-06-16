import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { SectionCard } from '../components/SectionCard';
import { MetricCard } from '../components/MetricCard';
import { InlineCode } from '../components/InlineCode';
import { Badge } from '../components/Badge';

export const CoreWebVitals: React.FC = () => {
  return (
    <SectionContainer
      id="core-web-vitals"
      title="Core Web Vitals"
      category="METRICS"
      accentColor="var(--blue)"
    >
      {/* Metrics Row at the top of the section */}
      <div style={{
        gridColumn: '1 / -1',
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        width: '100%'
      }}>
        <MetricCard label="LCP" value="≤ 2.5s" sub="Largest Contentful Paint (Good)" status="good" />
        <MetricCard label="INP" value="≤ 200ms" sub="Interaction to Next Paint (Good)" status="good" />
        <MetricCard label="CLS" value="≤ 0.1" sub="Cumulative Layout Shift (Good)" status="good" />
        <MetricCard label="TTFB" value="≤ 600ms" sub="Time to First Byte (Good)" status="good" />
      </div>

      <SectionCard title="LCP — Largest Contentful Paint">
        <ul>
          <li>Measures when the largest visible element (hero image, h1) is painted</li>
          <li>Culprits: render-blocking resources, slow server, unoptimized images</li>
          <li>Fix: <InlineCode>fetchpriority="high"</InlineCode> on hero image, preload critical fonts, CDN for assets, eliminate render-blocking JS</li>
          <li><Badge variant="tip">Tip</Badge> Audit the LCP element in DevTools → Performance tab → LCP marker</li>
        </ul>
      </SectionCard>

      <SectionCard title="INP — Interaction to Next Paint">
        <div style={{ marginBottom: '10px' }}>
          <Badge variant="info">Replaced FID 2024</Badge>
        </div>
        <ul>
          <li>Measures responsiveness: time from user interaction to next visual update</li>
          <li>Long tasks (&gt;50ms on main thread) delay INP. Culprits: heavy JS parsing, synchronous state cascades, large event handlers.</li>
          <li>Fix: <InlineCode>scheduler.yield()</InlineCode> to break long tasks, debounce inputs, <InlineCode>useTransition</InlineCode> for non-urgent updates, web workers for heavy compute</li>
        </ul>
      </SectionCard>

      <SectionCard title="CLS — Cumulative Layout Shift">
        <ul>
          <li>Measures visual stability — how much content unexpectedly moves</li>
          <li>Culprits: images without dimensions, dynamically injected banners, late-loading fonts</li>
          <li>Fix: always set <InlineCode>width/height</InlineCode> on images, <InlineCode>aspect-ratio</InlineCode> for containers, <InlineCode>font-display: swap</InlineCode>, reserve space for ads</li>
          <li>Next.js <InlineCode>&lt;Image&gt;</InlineCode> prevents CLS automatically</li>
        </ul>
      </SectionCard>
    </SectionContainer>
  );
};
