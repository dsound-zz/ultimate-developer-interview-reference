import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { SectionCard } from '../components/SectionCard';

export const Storybook: React.FC = () => {
  return (
    <SectionContainer
      id="storybook"
      title="Storybook"
      category="STORYBOOK"
      accentColor="var(--amber)"
    >
      <SectionCard title="What it is and when to use it">
        <ul>
          <li>Isolated component development environment — build and test UI outside the main app context</li>
          <li>Living documentation — stories serve as both code-level documentation and test fixtures</li>
          <li>Each story defines a single state: <code>Default</code>, <code>Disabled</code>, <code>Loading</code>, <code>Error</code></li>
          <li>Standard practice for building and validating shared component libraries</li>
        </ul>
      </SectionCard>

      <SectionCard title="Key integrations">
        <ul>
          <li><strong>Chromatic</strong> — visual regression testing pipeline that flags pixel diffs on pull requests</li>
          <li><strong>a11y addon</strong> — runs axe-core audits inline within the story frame</li>
          <li><strong>Controls addon</strong> — auto-creates interactive knobs based on TypeScript type declarations</li>
          <li><strong>MSW (Mock Service Worker)</strong> — intercepts browser network requests to mock API responses</li>
          <li><strong>Interactions addon</strong> — supports writing automated play script events (user events) inside the browser</li>
        </ul>
      </SectionCard>
    </SectionContainer>
  );
};
