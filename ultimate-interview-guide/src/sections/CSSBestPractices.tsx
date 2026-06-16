import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { SectionCard } from '../components/SectionCard';
import { InlineCode } from '../components/InlineCode';
import { Badge } from '../components/Badge';

export const CSSBestPractices: React.FC = () => {
  return (
    <SectionContainer
      id="css-best-practices"
      title="CSS Best Practices"
      category="CSS / HTML"
      accentColor="var(--amber)"
    >
      <SectionCard title="Modern CSS fundamentals">
        <ul>
          <li>Custom properties: <InlineCode>--color-primary: #5A3AB7</InlineCode> — scoped, composable, JS-readable</li>
          <li>Logical properties: <InlineCode>margin-inline</InlineCode>, <InlineCode>padding-block</InlineCode> → RTL support for free</li>
          <li>Container queries: <InlineCode>@container (min-width: 400px)</InlineCode> — responsive to parent, not viewport</li>
          <li><InlineCode>:has()</InlineCode> selector — style a parent based on its child's state</li>
          <li><InlineCode>@layer</InlineCode> — explicit cascade layers, eliminates specificity wars</li>
        </ul>
      </SectionCard>

      <SectionCard title="Layout">
        <ul>
          <li><strong>Grid</strong> for 2D (rows AND columns). Use <InlineCode>subgrid</InlineCode> for nested alignment.</li>
          <li><strong>Flexbox</strong> for 1D (a row or a column).</li>
          <li><InlineCode>gap</InlineCode> everywhere — cleaner than margin hacks</li>
          <li><InlineCode>clamp()</InlineCode> for fluid, responsive sizing</li>
          <li>Avoid fixed heights — let content define height</li>
        </ul>
      </SectionCard>

      <SectionCard title="CSS architecture">
        <ul>
          <li><strong>CSS Modules</strong> — scoped by default, no collisions, TypeScript-friendly</li>
          <li><strong>Tailwind CSS</strong> — utility-first, enforces design system, zero dead CSS in prod</li>
          <li><strong>Zero-runtime CSS-in-JS</strong> trend: Panda, Linaria, vanilla-extract replacing styled-components</li>
          <li><Badge variant="warn">Warn</Badge> Avoid nesting deeper than 3 levels — high specificity = refactoring pain</li>
        </ul>
      </SectionCard>

      <SectionCard title="Performance & accessibility">
        <ul>
          <li>Animate <InlineCode>transform</InlineCode> and <InlineCode>opacity</InlineCode> only — they don't trigger layout or paint</li>
          <li>Avoid animating <InlineCode>width</InlineCode>, <InlineCode>height</InlineCode>, <InlineCode>top</InlineCode>, <InlineCode>left</InlineCode> — causes reflow</li>
          <li><InlineCode>will-change: transform</InlineCode> promotes to GPU layer — use sparingly</li>
          <li><InlineCode>@media (prefers-reduced-motion)</InlineCode> — always respect user preference</li>
          <li><InlineCode>outline: none</InlineCode> without a custom focus style = accessibility failure</li>
          <li>WCAG AA: 4.5:1 contrast ratio for body text</li>
        </ul>
      </SectionCard>
    </SectionContainer>
  );
};
