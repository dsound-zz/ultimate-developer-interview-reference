import { useState } from 'react';
import styles from './Accordion.module.css';
import { SectionCard } from '../components/SectionCard';
import { SeniorSignal } from '../components/SeniorSignal';
import { Trap } from '../components/Trap';
import { InlineCode } from '../components/InlineCode';

interface AccordionItem {
  title: string;
  content: string;
}

const items: AccordionItem[] = [
  { title: 'What is React?', content: 'A UI library for building component trees.' },
  { title: 'What is a hook?', content: 'A function that lets you use React features in function components.' },
  { title: 'What is reconciliation?', content: 'The process React uses to diff and update the DOM.' },
];

function getNextIndex(current: number | null, clicked: number): number | null {
  return current === clicked ? null : clicked;
}

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setOpenIndex((prev) => getNextIndex(prev, index));
  }

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.title} className={styles.item}>
            <button
              className={styles.header}
              onClick={() => handleToggle(index)}
              aria-expanded={isOpen}
              aria-controls={`panel-${index}`}
            >
              <span>{item.title}</span>
              <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
            </button>

            {isOpen && (
              <div
                id={`panel-${index}`}
                role="region"
                className={styles.panel}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export const AccordionChallenge = {
  id: 'accordion',
  title: 'Accordion',
  demo: <Accordion />,
  code: `// Accordion — optimal state: one index, null means closed
// Outside component: pure logic has no reason to live inside

interface AccordionItem {
  title: string
  content: string
}

const items: AccordionItem[] = [
  { title: 'What is React?', content: 'A UI library for building component trees.' },
  { title: 'What is a hook?', content: 'A function that lets you use React features in function components.' },
  { title: 'What is reconciliation?', content: 'The process React uses to diff and update the DOM.' },
]

// ── OUTSIDE the component ──────────────────────────────────
// Pure function: no state, no closures, no side effects.
// "I put toggle logic outside because it doesn't need component scope."
function getNextIndex(current: number | null, clicked: number): number | null {
  return current === clicked ? null : clicked
}

// ── COMPONENT ─────────────────────────────────────────────
export default function Accordion() {
  // "My only state: which index is open. null = nothing open."
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // "Toggle handler: I inline this because it's one line and used in one place.
  //  If it grew or was reused, I'd extract it."
  function handleToggle(index: number) {
    setOpenIndex(prev => getNextIndex(prev, index))
  }

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        // "Derive isOpen during render — never store it."
        const isOpen = openIndex === index

        return (
          <div key={item.title} className={styles.item}>
            <button
              className={styles.header}
              onClick={() => handleToggle(index)}
              aria-expanded={isOpen}          // "I mention aria-expanded unprompted."
              aria-controls={\`panel-\${index}\`}
            >
              <span>{item.title}</span>
              <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
            </button>

            {/* "Conditional render, not display:none. The DOM is clean." */}
            {isOpen && (
              <div
                id={\`panel-\${index}\`}
                role="region"
                className={styles.panel}
              >
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}`,
  coachView: (
    <>
      <SectionCard title="How to think about it">
        <ul>
          <li>"The only question is: what identifies which panel is open? An index is enough. A boolean per-item is overkill."</li>
          <li>"I store one integer — the open index. Everything else derives from that during render."</li>
          <li>We compare <InlineCode>openIndex: number | null</InlineCode> vs <InlineCode>openItems: boolean[]</InlineCode> or a Set. Since only one panel is open at a time, a single index is the optimal state representation.</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li>Mentions <InlineCode>null</InlineCode> vs <InlineCode>-1</InlineCode> as the sentinel for "nothing open" and prefers <InlineCode>null</InlineCode> for semantic explicitness.</li>
          <li>Notes that toggling is a clean ternary: <InlineCode>prev === index ? null : index</InlineCode>.</li>
          <li>Says: "I'd derive <InlineCode>isOpen</InlineCode> inline during mapping — no need to store it."</li>
          <li>Mentions accessibility tags like <InlineCode>aria-expanded</InlineCode> and <InlineCode>aria-controls</InlineCode> unprompted.</li>
        </ul>
      </SeniorSignal>

      <Trap>
        <ul>
          <li>Storing <InlineCode>isOpen: boolean</InlineCode> directly on each item object in a local state array.</li>
          <li>Using a <InlineCode>useEffect</InlineCode> block to "sync" open state when items change.</li>
        </ul>
      </Trap>

      <SectionCard title="Architecture Decisions">
        <ul>
          <li><strong>When to extract a child component:</strong> We'd extract <InlineCode>AccordionItem</InlineCode> if each item had complex internal state (like a nested form). For static panels, mapping inline keeps it clean and avoids prop-drilling noise.</li>
          <li><strong>When to use memoization:</strong> Not here. The toggle handler is trivial and the list array is static. Memoizing would only add execution overhead.</li>
          <li><strong>Custom hook:</strong> If accordion behavior appeared in multiple places (drawers, FAQ, settings), we'd extract <InlineCode>useDisclosure(count)</InlineCode>. For one view, it is over-engineering.</li>
          <li><strong>Deriving vs Storing:</strong> Never store <InlineCode>isOpen</InlineCode> as state. Compute it inline: <InlineCode>const isOpen = openIndex === index</InlineCode>.</li>
          <li><strong>Smooth expand/collapse:</strong> The README asks for smooth animation. Conditional render (<InlineCode>{'{'} isOpen && ... {'}'}</InlineCode>) instantly mounts/unmounts the panel. For a CSS transition, use <InlineCode>max-height: 0 → max-height: 200px</InlineCode> and always render the panel with <InlineCode>hidden</InlineCode> attribute — the tradeoff is a bit more CSS complexity vs. a cleaner DOM.</li>
        </ul>
      </SectionCard>
    </>
  ),
};
