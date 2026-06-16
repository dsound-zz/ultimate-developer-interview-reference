import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { SectionCard } from '../components/SectionCard';
import { InlineCode } from '../components/InlineCode';
import { Badge } from '../components/Badge';

export const Testing: React.FC = () => {
  return (
    <SectionContainer
      id="testing"
      title="Testing"
      category="TESTING"
      accentColor="var(--green)"
    >
      <SectionCard title="The testing pyramid">
        <ul>
          <li><strong>Unit</strong> — fast, isolated. Functions, hooks, utils. Jest / Vitest.</li>
          <li><strong>Integration</strong> — components with dependencies wired. React Testing Library.</li>
          <li><strong>E2E</strong> — full user flows in a real browser. Playwright / Cypress. Slow but high confidence.</li>
          <li><Badge variant="good">Good</Badge> Many unit, some integration, few E2E. Don't invert the pyramid.</li>
        </ul>
      </SectionCard>

      <SectionCard title="React Testing Library philosophy">
        <ul>
          <li>Query by accessibility attributes — <InlineCode>getByRole</InlineCode>, <InlineCode>getByLabelText</InlineCode>, <InlineCode>getByText</InlineCode></li>
          <li><Badge variant="trap">Trap</Badge> Avoid <InlineCode>getByTestId</InlineCode> as first resort — tests DOM structure, not user-perceived behavior</li>
          <li><InlineCode>userEvent</InlineCode> over <InlineCode>fireEvent</InlineCode> — simulates real browser interactions</li>
          <li><InlineCode>waitFor</InlineCode> / <InlineCode>findBy</InlineCode> for async assertions</li>
          <li>Wrap in <InlineCode>act()</InlineCode> when updating state outside standard React lifecycle render cycles</li>
        </ul>
      </SectionCard>

      <SectionCard title="Visual regression">
        <ul>
          <li><strong>Chromatic</strong> — auto-captures Storybook stories, flags pixel diffs in PRs</li>
          <li><strong>Percy</strong> / <strong>Playwright screenshots</strong> — E2E-level visual snapshots</li>
          <li>Critical for design system components — subtle regressions are invisible in standard code review</li>
          <li>Approve baselines intentionally — treat as a living visual specification</li>
        </ul>
      </SectionCard>
    </SectionContainer>
  );
};
