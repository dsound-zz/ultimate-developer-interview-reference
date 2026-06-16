import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { SectionCard } from '../components/SectionCard';
import { StepList } from '../components/StepList';
import { Badge } from '../components/Badge';

export const FESystemDesign: React.FC = () => {
  return (
    <SectionContainer
      id="fe-system-design"
      title="FE System Design"
      category="SYSTEM DESIGN"
      accentColor="var(--blue)"
    >
      <SectionCard title="7-step framework">
        <StepList
          steps={[
            'Clarify requirements — scale, auth, real-time needs, SEO, target devices',
            'Define data model — state entities, schemas, local vs server state ownership',
            'Component architecture — structural breakdown, composition, slot strategies',
            'Routing & rendering strategy — SSR/CSR/ISR/RSC decision per page type',
            'State management — local UI vs global client vs server-synchronized state',
            'Performance optimization — code splitting, prefetching, asset pipes, CWV goals',
            'A11y, i18n, error boundaries, and telemetry integration',
          ]}
        />
      </SectionCard>

      <SectionCard title="Component design principles">
        <ul>
          <li><strong>Single responsibility</strong>: one clear reason to change. If a component does too much, split it.</li>
          <li><strong>Composition over inheritance</strong>: use children, render props, and slot patterns for flexibility.</li>
          <li><strong>Controlled vs uncontrolled</strong>: decide where the truth lives. Controlled means the parent drives the state.</li>
          <li><strong>API design</strong>: keep required props minimal, export sensible defaults, and forward refs when creating base components.</li>
          <li><strong>Design tokens</strong>: consume design tokens rather than defining raw magic colors/spacing hexes in components.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Design system layers">
        <ul>
          <li><strong>Tokens</strong> → primitives (color themes, spacing scales, typography weight, shadow rules)</li>
          <li><strong>Atoms</strong> → standalone elements (Button, Input, Badge, Icon). Zero domain-knowledge.</li>
          <li><strong>Molecules</strong> → simple compound layouts (SearchBar = Input + Button)</li>
          <li><strong>Organisms</strong> → complete UI sections (Header, ProductCard). Domain-aware.</li>
          <li><strong>Templates/Pages</strong> → wireframe structures and context/data mapping</li>
          <li>Commonly version-controlled, automated, and documented in Storybook</li>
        </ul>
      </SectionCard>

      <SectionCard title="Micro-frontends (tradeoffs)">
        <ul>
          <li>Different teams own isolated parts of the page, deployable independently</li>
          <li>Module Federation (Webpack 5) allows runtime sharing of component code</li>
          <li>Gains: independent releases, technology freedom, autonomous teams</li>
          <li>Costs: shared state complexity, version skew, duplicated dependencies, performance overhead</li>
          <li><Badge variant="warn">Warn</Badge> Mention tradeoffs proactively rather than pitching MFEs as universally good</li>
        </ul>
      </SectionCard>
    </SectionContainer>
  );
};
