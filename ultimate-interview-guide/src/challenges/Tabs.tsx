import { useState } from 'react';
import styles from './Tabs.module.css';
import { SectionCard } from '../components/SectionCard';
import { SeniorSignal } from '../components/SeniorSignal';
import { Trap } from '../components/Trap';
import { InlineCode } from '../components/InlineCode';

const tabs = [
  { label: 'Overview', content: 'High-level summary of the component.' },
  { label: 'Props', content: 'Detailed prop documentation.' },
  { label: 'Examples', content: 'Usage examples and edge cases.' },
];

export default function Tabs() {
  const [activeIndex, setActiveIndex] = useState(0);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      setActiveIndex((i) => Math.min(i + 1, tabs.length - 1));
    }
    if (e.key === 'ArrowLeft') {
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
  }

  return (
    <div className={styles.container}>
      <div role="tablist" className={styles.tabList}>
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={index === activeIndex}
            className={`${styles.tab} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => handleKeyDown(e)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className={styles.panel}>
        {tabs[activeIndex].content}
      </div>
    </div>
  );
}

export const TabsChallenge = {
  id: 'tabs',
  title: 'Tabs',
  demo: <Tabs />,
  code: `// Tabs — canonical "store index, derive everything"
// Say this out loud: "tabs[activeIndex].content is derived on every render.
//  I never store content in state."

const tabs = [
  { label: 'Overview', content: 'High-level summary of the component.' },
  { label: 'Props', content: 'Detailed prop documentation.' },
  { label: 'Examples', content: 'Usage examples and edge cases.' },
]

export default function Tabs() {
  const [activeIndex, setActiveIndex] = useState(0)

  // "Arrow key navigation — shows I know the a11y pattern"
  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === 'ArrowRight') setActiveIndex(i => Math.min(i + 1, tabs.length - 1))
    if (e.key === 'ArrowLeft') setActiveIndex(i => Math.max(i - 1, 0))
  }

  return (
    <div className={styles.container}>
      <div role="tablist" className={styles.tabList}>
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={index === activeIndex}
            className={\`\${styles.tab} \${index === activeIndex ? styles.active : ''}\`}
            onClick={() => setActiveIndex(index)}
            onKeyDown={e => handleKeyDown(e, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* "Derived. Not stored. Every render, I just index into the array." */}
      <div role="tabpanel" className={styles.panel}>
        {tabs[activeIndex].content}
      </div>
    </div>
  )
}`,
  coachView: (
    <>
      <SectionCard title="How to think about it">
        <ul>
          <li>"What's the minimum I need to track? The active index. The content is already in the data — I derive it during render."</li>
          <li>"Tabs are the canonical example of 'store index, derive content'. If someone stores the active tab's content in state, that's an immediate red flag."</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li>"I'd use <InlineCode>role="tablist"</InlineCode>, <InlineCode>role="tab"</InlineCode>, and <InlineCode>aria-selected</InlineCode> because tabs have a well-defined ARIA specification."</li>
          <li>"If tabs needed to lazy-load content, I'd swap to a render prop or slot pattern."</li>
          <li>Notes that the tab list should be keyboard-navigable with arrow keys: "I'd wire up ArrowLeft/ArrowRight for completeness."</li>
        </ul>
      </SeniorSignal>

      <Trap>
        <ul>
          <li>Storing <InlineCode>activeContent</InlineCode> in state alongside the <InlineCode>activeIndex</InlineCode>.</li>
          <li>Using a <InlineCode>useEffect</InlineCode> block to synchronize the content when the index changes.</li>
        </ul>
      </Trap>

      <SectionCard title="Architecture Decisions">
        <ul>
          <li><strong>When to extract a child component:</strong> We'd extract <InlineCode>TabPanel</InlineCode> if each panel had complex internal lifecycle requirements (e.g. fetching API data on activation). For static content, keeping it inline is much cleaner.</li>
          <li><strong>Deriving vs storing:</strong> Keep the active content derived: <InlineCode>const activeContent = tabs[activeIndex].content</InlineCode> which is always in sync and takes zero state slots.</li>
        </ul>
      </SectionCard>
    </>
  ),
};
