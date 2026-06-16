import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { SectionCard } from '../components/SectionCard';
import { FlowRow } from '../components/FlowRow';
import { InlineCode } from '../components/InlineCode';

export const HowReactWorks: React.FC = () => {
  return (
    <SectionContainer
      id="how-react-works"
      title="How React Works"
      category="CORE CONCEPTS"
      accentColor="var(--accent)"
    >
      <SectionCard title="The mental model">
        <ul>
          <li>React keeps a lightweight in-memory tree called the Virtual DOM (<InlineCode>VDOM</InlineCode>)</li>
          <li>On every state/prop change, React re-runs your component function and builds a new VDOM tree</li>
          <li><strong>Reconciliation</strong>: React diffs old vs new VDOM using the Fiber algorithm and computes the minimal real DOM mutations</li>
          <li>Work is split into small <strong>Fiber units</strong> that can be paused and resumed — enabling Concurrent Mode</li>
          <li>Think of it like a Git diff: React computes what changed, not what to redraw</li>
        </ul>
      </SectionCard>

      <SectionCard title="The render cycle">
        <FlowRow steps={['Trigger', 'Render phase', 'Commit phase']} />
        <ul>
          <li><strong>Trigger</strong>: <InlineCode>setState</InlineCode>, prop change, or parent re-render</li>
          <li><strong>Render phase</strong>: React calls your function — pure, no side effects. Builds new Fiber tree. Can be interrupted in Concurrent Mode.</li>
          <li><strong>Commit phase</strong>: mutations applied to real DOM. Runs <InlineCode>useLayoutEffect</InlineCode>, then <InlineCode>useEffect</InlineCode>. Cannot be interrupted.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Keys & reconciliation rules">
        <ul>
          <li>Same component type + same position = same instance (state preserved)</li>
          <li>Different type at same position = unmount old, mount new (state reset)</li>
          <li><InlineCode>key</InlineCode> lets React track identity regardless of position — critical for lists</li>
          <li>Using index as key breaks on reorder: animations jank, state lands in wrong component</li>
          <li>Use stable, unique IDs as keys (<InlineCode>item.id</InlineCode>)</li>
        </ul>
      </SectionCard>

      <SectionCard title="Concurrent Mode (React 18+)">
        <ul>
          <li>React can yield render work to the browser between frames — prevents jank</li>
          <li><InlineCode>useTransition</InlineCode> — marks state update as non-urgent; UI stays responsive</li>
          <li><InlineCode>useDeferredValue</InlineCode> — defers a value, shows stale data temporarily while fresh data loads</li>
          <li><InlineCode>Suspense</InlineCode> — declarative loading states; React "pauses" the subtree until data is ready</li>
          <li>Mental model: urgent updates (typing) always win over background renders (search results)</li>
        </ul>
      </SectionCard>
    </SectionContainer>
  );
};
