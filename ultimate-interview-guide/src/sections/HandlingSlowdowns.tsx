import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { SectionCard } from '../components/SectionCard';
import { InlineCode } from '../components/InlineCode';
import { Badge } from '../components/Badge';

export const HandlingSlowdowns: React.FC = () => {
  return (
    <SectionContainer
      id="handling-slowdowns"
      title="Handling Slowdowns"
      category="DEBUGGING"
      accentColor="var(--red)"
    >
      <SectionCard title="Diagnose first — never guess">
        <ul>
          <li><strong>React DevTools Profiler</strong> — which components render? How long? Why?</li>
          <li><strong>Chrome Performance tab</strong> — flame chart shows main thread work. Long yellow bars = JS blocking.</li>
          <li><strong>Lighthouse / PageSpeed Insights</strong> — CWV scores + specific recommendations</li>
          <li><strong>Network tab</strong> — waterfall, TTFB, large payloads, render-blocking resources</li>
          <li><Badge variant="good">Good</Badge> Senior signal: always profile before optimizing</li>
        </ul>
      </SectionCard>

      <SectionCard title="Common root causes + fixes">
        <ul>
          <li>Too many re-renders → <InlineCode>React.memo</InlineCode>, split state, lift state down</li>
          <li>Expensive computation → <InlineCode>useMemo</InlineCode>, move to web worker</li>
          <li>Big bundle → code-split with <InlineCode>lazy()</InlineCode>, audit with bundle analyzer</li>
          <li>Slow data → <InlineCode>Promise.all</InlineCode> for parallelization, TanStack Query for caching, Suspense for streaming</li>
          <li>Long list → virtualize with <InlineCode>@tanstack/react-virtual</InlineCode></li>
          <li>Waterfall requests → parallel fetch at route level, prefetch on hover</li>
        </ul>
      </SectionCard>
    </SectionContainer>
  );
};
