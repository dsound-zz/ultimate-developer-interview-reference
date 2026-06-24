import React, { useState } from 'react';
import styles from './AutocompleteLocal.module.css';
import { SectionCard } from '../components/SectionCard';
import { SeniorSignal } from '../components/SeniorSignal';
import { Trap } from '../components/Trap';
import { InlineCode } from '../components/InlineCode';

const items = [
  'Apple', 'Avocado', 'Banana', 'Blueberry', 'Cherry', 'Coconut',
  'Date', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Orange', 'Peach', 'Strawberry'
];

function highlightMatch(text: string, query: string) {
  if (!query) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <strong>{text.slice(idx, idx + query.length)}</strong>
      {text.slice(idx + query.length)}
    </span>
  );
}

export default function AutocompleteLocal() {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  // Derived. Never stored. Runs fresh on every render.
  const filtered = query
    ? items.filter((i) => i.toLowerCase().includes(query.toLowerCase()))
    : [];

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, -1));
    }
    if (e.key === 'Enter') {
      if (selectedIndex >= 0 && filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]);
      }
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }

  function handleSelect(item: string) {
    setQuery(item);
    setSelectedIndex(-1);
    setIsOpen(false);
  }

  return (
    <div className={styles.container}>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedIndex(-1);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          // Add delay to allow onMouseDown to fire first
          setTimeout(() => setIsOpen(false), 150);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search fruits..."
        className={styles.input}
      />
      {isOpen && filtered.length > 0 && (
        <ul className={styles.dropdown}>
          {filtered.map((item, index) => (
            <li
              key={item}
              className={`${styles.option} ${index === selectedIndex ? styles.active : ''}`}
              onMouseDown={() => handleSelect(item)}
            >
              {highlightMatch(item, query)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const AutocompleteLocalChallenge = {
  id: 'autocomplete-local',
  title: 'Autocomplete (local)',
  demo: <AutocompleteLocal />,
  code: `const items = ['Apple', 'Avocado', 'Banana', 'Blueberry', 'Cherry', 'Coconut',
  'Date', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Orange', 'Peach', 'Strawberry']

// "Pure function — outside the component. Takes two strings, returns JSX.
//  No reason for this to be inside."
function highlightMatch(text: string, query: string) {
  if (!query) return <span>{text}</span>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <span>{text}</span>
  return (
    <span>
      {text.slice(0, idx)}
      <strong>{text.slice(idx, idx + query.length)}</strong>
      {text.slice(idx + query.length)}
    </span>
  )
}

export default function Autocomplete() {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)

  // "Derived. Never stored. Runs fresh on every render."
  const filtered = query
    ? items.filter(i => i.toLowerCase().includes(query.toLowerCase()))
    : []

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') setSelectedIndex(i => Math.min(i + 1, filtered.length - 1))
    if (e.key === 'ArrowUp') setSelectedIndex(i => Math.max(i - 1, -1))
    if (e.key === 'Enter' && selectedIndex >= 0) {
      setQuery(filtered[selectedIndex])
      setSelectedIndex(-1)
    }
    if (e.key === 'Escape') {
      setQuery('')
      setSelectedIndex(-1)
    }
  }

  function handleSelect(item: string) {
    setQuery(item)
    setSelectedIndex(-1)
  }

  return (
    <div className={styles.container}>
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); setSelectedIndex(-1) }}
        onKeyDown={handleKeyDown}
        placeholder="Search fruits..."
        className={styles.input}
      />
      {filtered.length > 0 && (
        <ul className={styles.dropdown}>
          {filtered.map((item, index) => (
            <li
              key={item}
              className={\`\${styles.option} \${index === selectedIndex ? styles.active : ''}\`}
              // "onMouseDown not onClick — fires before blur so dropdown stays open"
              onMouseDown={() => handleSelect(item)}
            >
              {highlightMatch(item, query)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}`,
  coachView: (
    <>
      <SectionCard title="Requirements (from the drill spec)">
        <ol>
          <li><strong>Controlled input</strong> that filters items as user types.</li>
          <li><strong>Dropdown</strong> showing filtered matches.</li>
          <li><strong>Highlight matching text</strong> in dropdown items.</li>
          <li><strong>Click dropdown item</strong> to fill the input.</li>
          <li><strong><InlineCode>highlightMatch</InlineCode> extracted outside the component</strong> — the README explicitly requires this.</li>
        </ol>
      </SectionCard>

      <SectionCard title="How to think about it">
        <ul>
          <li>"Two pieces of state: the query string and the selected index for keyboard navigation. The filtered list is derived math — never stored as a separate state."</li>
          <li>"The derivation is just one simple filter: <InlineCode>items.filter(i =&gt; i.includes(query))</InlineCode>. No effects are needed here."</li>
          <li>Walk through the interactions: typing (triggering derivation), clicking (selecting and closing), and keyboard arrows (incrementing active select index).</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li><strong>Extracts <InlineCode>highlightMatch</InlineCode> outside the component.</strong> "This function is pure — two strings in, JSX out. It has no reason to live inside the component or access any hook. The interviewer will look for this."</li>
          <li>Uses <InlineCode>onMouseDown</InlineCode> instead of <InlineCode>onClick</InlineCode> on dropdown options. "Clicks fire after blurs. If we use <InlineCode>onClick</InlineCode>, the input blurs first and closes the menu before the selection fires. <InlineCode>onMouseDown</InlineCode> fires first."</li>
          <li>Resets the active <InlineCode>selectedIndex</InlineCode> to <InlineCode>-1</InlineCode> whenever the search query changes.</li>
          <li>Supports closing on Escape and committing on Enter.</li>
        </ul>
      </SeniorSignal>

      <Trap>
        <ul>
          <li>Storing the filtered list in state and syncing it via <InlineCode>useEffect</InlineCode> — derive it inline instead.</li>
          <li>Using <InlineCode>onClick</InlineCode> on dropdown items — the blur fires first and closes the dropdown before the selection registers.</li>
          <li>Keeping <InlineCode>highlightMatch</InlineCode> inside the component — it doesn't use any hooks or closure values and has no business being there.</li>
        </ul>
      </Trap>

      <SectionCard title="Architecture Decisions">
        <ul>
          <li><strong>Pure utility functions:</strong> Hoist <InlineCode>highlightMatch()</InlineCode> outside the component since it does not consume local hooks or component scope. This makes it independently testable and reusable.</li>
        </ul>
      </SectionCard>
    </>
  ),
};
