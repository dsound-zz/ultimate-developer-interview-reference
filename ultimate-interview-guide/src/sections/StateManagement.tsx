import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { SectionCard } from '../components/SectionCard';
import { TwoCol } from '../components/TwoCol';
import { InlineCode } from '../components/InlineCode';
import { Badge } from '../components/Badge';

export const StateManagement: React.FC = () => {
  return (
    <SectionContainer
      id="state-management"
      title="State Management"
      category="STATE"
      accentColor="var(--accent)"
    >
      <SectionCard title="State taxonomy (the 6 levels)">
        <ul>
          <li><strong>Local (UI) state</strong> — <InlineCode>useState</InlineCode> / <InlineCode>useReducer</InlineCode>. Belongs in the component.</li>
          <li><strong>Shared (lifted) state</strong> — lifted to nearest common ancestor. Props down.</li>
          <li><strong>Global client state</strong> — app-wide: auth, theme, UI flags. Context, Zustand, Jotai, Redux.</li>
          <li><strong>Server state</strong> — async, lives on server. TanStack Query / SWR / RTK Query.</li>
          <li><strong>URL state</strong> — <InlineCode>?tab=reviews&page=2</InlineCode>. Shareable, survives refresh. <InlineCode>nuqs</InlineCode>, <InlineCode>next/navigation</InlineCode>.</li>
          <li><strong>Form state</strong> — ephemeral, validation-heavy. React Hook Form, Conform.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Tool selection guide">
        <TwoCol
          left={{
            label: 'Client Global State',
            items: [
              'Zustand — minimal, hook-based, selector-optimized',
              'Jotai — atomic state, fine-grained updates, React-native feel',
              'Redux Toolkit — structured, boilerplated, suited for large team scale',
            ],
          }}
          right={{
            label: 'Server State',
            items: [
              'TanStack Query — industry standard caching and syncing engine',
              'SWR — lighter alternative from Vercel',
              'RTK Query — built-in caching if already heavily utilizing Redux',
            ],
          }}
        />
        <div style={{ marginTop: '16px' }}>
          <Badge variant="good">Good</Badge>{' '}
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Senior take: Most apps don't need Redux. TanStack Query + Zustand + local state covers 95% of real-world needs.
          </span>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
