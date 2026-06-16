import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { SectionCard } from '../components/SectionCard';
import { TwoCol } from '../components/TwoCol';
import { InlineCode } from '../components/InlineCode';

export const NextJS: React.FC = () => {
  return (
    <SectionContainer
      id="next-js"
      title="Next.js"
      category="FRAMEWORK"
      accentColor="var(--accent)"
    >
      <SectionCard title="React vs Next.js">
        <TwoCol
          left={{
            label: 'React',
            items: [
              'UI library only — handles component rendering',
              'No built-in routing; requires external library (React Router)',
              'No data fetching conventions — up to developer',
              'Runs almost entirely in the browser (CSR by default)',
              'Flexible; you choose the bundler, compiler, and design patterns',
            ],
          }}
          right={{
            label: 'Next.js',
            items: [
              'Full-stack framework — complete production system',
              'File-based routing with app/ directory conventions',
              'API routes (route.ts) out-of-the-box',
              'Hybrid rendering (SSR, SSG, ISR, RSC, client-side)',
              'Convention over configuration; pre-configured build optimization',
            ],
          }}
        />
      </SectionCard>

      <SectionCard title="App Router (Next.js 13+)">
        <ul>
          <li><InlineCode>app/</InlineCode> directory — RSC by default. Add <InlineCode>"use client"</InlineCode> for interactive leaves.</li>
          <li><InlineCode>layout.tsx</InlineCode> — shared UI that doesn't re-render on navigation</li>
          <li><InlineCode>loading.tsx</InlineCode> — automatic Suspense boundary per route segment</li>
          <li><InlineCode>error.tsx</InlineCode> — error boundary per segment with <InlineCode>reset()</InlineCode> capability</li>
          <li><InlineCode>route.ts</InlineCode> — API endpoints replacing <InlineCode>pages/api/</InlineCode></li>
          <li>Parallel routes <InlineCode>@slot</InlineCode> + Intercepting routes for modals/drawers</li>
        </ul>
      </SectionCard>

      <SectionCard title="Data fetching patterns">
        <ul>
          <li><InlineCode>fetch(url, &#123; cache: 'force-cache' &#125;)</InlineCode> → SSG behavior</li>
          <li><InlineCode>fetch(url, &#123; cache: 'no-store' &#125;)</InlineCode> → SSR per request</li>
          <li><InlineCode>fetch(url, &#123; next: &#123; revalidate: 60 &#125; &#125;)</InlineCode> → ISR</li>
          <li><InlineCode>revalidatePath()</InlineCode> / <InlineCode>revalidateTag()</InlineCode> → on-demand ISR from Server Actions</li>
          <li>Deduplication: multiple identical <InlineCode>fetch()</InlineCode> calls in one render tree hit the network once</li>
        </ul>
      </SectionCard>

      <SectionCard title="Performance features">
        <ul>
          <li><InlineCode>next/image</InlineCode> — WebP conversion, lazy loading, CLS prevention</li>
          <li><InlineCode>next/font</InlineCode> — zero layout shift, self-hosted, no FOUT</li>
          <li><InlineCode>next/link</InlineCode> — prefetches on viewport intersection, client-side nav</li>
          <li>Streaming with <InlineCode>Suspense</InlineCode> — page shell renders immediately, data fills progressively</li>
          <li>Edge runtime — lightweight V8 isolate at CDN edge for ultra-low TTFB</li>
        </ul>
      </SectionCard>
    </SectionContainer>
  );
};
