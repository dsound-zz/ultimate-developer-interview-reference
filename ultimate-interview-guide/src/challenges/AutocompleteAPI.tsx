import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './AutocompleteAPI.module.css';
import { SectionCard } from '../components/SectionCard';
import { SeniorSignal } from '../components/SeniorSignal';
import { Trap } from '../components/Trap';
import { KeyInsight } from '../components/KeyInsight';
import { InlineCode } from '../components/InlineCode';

// ── Custom hook ────────────────────────────────────────────
// Justification: reusable, zero coupling to component UI.
function useDebounce<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

// ── Pure helper — outside the component ───────────────────
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

export default function AutocompleteAPI() {
  // All fruits fetched once on mount, then filtered locally
  const [allFruits, setAllFruits] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 220);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch once on mount — store entire list locally
  useEffect(() => {
    const controller = new AbortController();

    async function fetchAll() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users', {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('API error: ' + res.status);
        const data = await res.json();
        setAllFruits(data.map((u: { name: string }) => u.name));
      } catch (err: unknown) {
        const e = err as { name?: string; message?: string };
        if (e.name !== 'AbortError') setError(e.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
    return () => controller.abort();
  }, []); // ← empty deps: fires once

  // Derive filtered list from local data — no network call needed
  const filtered = useMemo(
    () =>
      debouncedQuery
        ? allFruits.filter((name) =>
            name.toLowerCase().includes(debouncedQuery.toLowerCase())
          )
        : allFruits.slice(0, 8), // show first 8 when no query
    [allFruits, debouncedQuery]
  );

  // Outside-click detection
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(item: string) {
    setQuery(item);
    setIsOpen(false);
    setSelectedIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, -1));
    }
    if (e.key === 'Enter' && selectedIndex >= 0 && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex]);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }

  const showDropdown = isOpen && !loading && !error;

  return (
    <div className={styles.container} ref={containerRef}>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedIndex(-1);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={loading ? 'Loading...' : 'Search names...'}
        disabled={!!error}
        className={styles.input}
        role="combobox"
        aria-expanded={showDropdown && filtered.length > 0}
        aria-autocomplete="list"
        aria-controls="autocomplete-listbox"
      />
      {error && <p className={styles.errorMessage}>Error: {error}</p>}
      {showDropdown && filtered.length > 0 && (
        <ul className={styles.dropdown} id="autocomplete-listbox" role="listbox">
          {filtered.map((item, index) => (
            <li
              key={item}
              role="option"
              aria-selected={index === selectedIndex}
              className={`${styles.option} ${index === selectedIndex ? styles.active : ''}`}
              onMouseDown={() => handleSelect(item)}
            >
              {highlightMatch(item, debouncedQuery)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const AutocompleteAPIChallenge = {
  id: 'autocomplete-api',
  title: 'Autocomplete (API)',
  demo: <AutocompleteAPI />,
  code: `// ── Custom hook ────────────────────────────────────────────
// Justification: reusable, zero coupling to component UI.
function useDebounce<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(id)
  }, [value, delay])
  return debounced
}

// ── Pure helper — outside the component ───────────────────
// "highlightMatch is pure: two strings in, JSX out. No reason to be inside."
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

export default function AutocompleteAPI() {
  // "Fetch once, store locally — don't hit the API on every keystroke."
  const [allItems, setAllItems] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)

  const debouncedQuery = useDebounce(query, 220)
  // "useRef for outside-click: I need the DOM node, not render state."
  const containerRef = useRef<HTMLDivElement>(null)

  // "Empty dep array: fires once on mount. AbortController cleans up on unmount."
  useEffect(() => {
    const controller = new AbortController()
    async function fetchAll() {
      try {
        const res = await fetch('http://localhost:3001/query?search=', {
          signal: controller.signal
        })
        if (!res.ok) throw new Error('API error: ' + res.status)
        const data: string[] = await res.json()
        setAllItems(data)
      } catch (err: any) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
    return () => controller.abort()
  }, [])  // ← empty: fetch once

  // "Derive filtered list — useMemo because allItems could be large."
  const filtered = useMemo(
    () => debouncedQuery
      ? allItems.filter(name => name.toLowerCase().includes(debouncedQuery.toLowerCase()))
      : allItems.slice(0, 8),
    [allItems, debouncedQuery]
  )

  // "Outside-click: capture container ref, listen on document."
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(item: string) {
    setQuery(item)
    setIsOpen(false)
    setSelectedIndex(-1)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, -1)) }
    if (e.key === 'Enter' && selectedIndex >= 0) handleSelect(filtered[selectedIndex])
    if (e.key === 'Escape') { setIsOpen(false); setSelectedIndex(-1) }
  }

  return (
    <div ref={containerRef}>
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); setSelectedIndex(-1); setIsOpen(true) }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={isOpen && filtered.length > 0}
        aria-autocomplete="list"
        aria-controls="autocomplete-listbox"
      />
      {isOpen && !loading && !error && filtered.length > 0 && (
        <ul id="autocomplete-listbox" role="listbox">
          {filtered.map((item, index) => (
            <li
              key={item}
              role="option"
              aria-selected={index === selectedIndex}
              className={index === selectedIndex ? styles.active : ''}
              onMouseDown={() => handleSelect(item)}
            >
              {highlightMatch(item, debouncedQuery)}
            </li>
          ))}
        </ul>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  )
}`,
  coachView: (
    <>
      <SectionCard title="Requirements (from the drill spec)">
        <ol>
          <li><strong>Controlled input with debounce</strong> — use a <InlineCode>useDebounce</InlineCode> hook; don't hit the API on every keystroke.</li>
          <li><strong>Fetch once on mount, store locally</strong> — one <InlineCode>GET</InlineCode> request fills an <InlineCode>allItems</InlineCode> array; every subsequent filter is local via <InlineCode>useMemo</InlineCode>.</li>
          <li><strong>Highlight matched text</strong> — extract <InlineCode>highlightMatch(text, query)</InlineCode> as a pure function outside the component.</li>
          <li><strong>Keyboard navigation</strong> — ArrowDown/Up move <InlineCode>selectedIndex</InlineCode>, Enter selects, Escape closes.</li>
          <li><strong>Outside-click closes dropdown</strong> — attach a <InlineCode>mousedown</InlineCode> listener on <InlineCode>document</InlineCode>, compare against a container <InlineCode>useRef</InlineCode>.</li>
          <li><strong>Loading and error states</strong> — show feedback while the initial fetch is in flight; show an error if it fails.</li>
        </ol>
      </SectionCard>

      <SectionCard title="How to think about it">
        <ul>
          <li>"The core insight: this is NOT a 'fetch on every keystroke' component. I fetch all data once and filter locally. Debounce only controls how often the filter runs."</li>
          <li>"State layout: <InlineCode>allItems</InlineCode> (fetched once), <InlineCode>query</InlineCode>, <InlineCode>selectedIndex</InlineCode>, <InlineCode>isOpen</InlineCode>. The filtered list is derived with <InlineCode>useMemo</InlineCode>."</li>
          <li>Walk through user interactions: type → debounce → filter locally → ArrowDown/Up → Enter selects → Escape or outside-click closes.</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li>Fetches once in a <InlineCode>useEffect(fn, [])</InlineCode> with an <InlineCode>AbortController</InlineCode> for cleanup. "Empty dep array: this fires exactly once on mount."</li>
          <li>Derives <InlineCode>filtered</InlineCode> with <InlineCode>useMemo([allItems, debouncedQuery])</InlineCode> — not stored in state, not re-fetched.</li>
          <li>Extracts <InlineCode>highlightMatch</InlineCode> outside the component. "Pure function: two strings in, JSX out. No closures needed."</li>
          <li>Uses <InlineCode>useRef</InlineCode> for the container node + <InlineCode>document.addEventListener('mousedown')</InlineCode> for outside-click. "I use <InlineCode>mousedown</InlineCode> not <InlineCode>click</InlineCode> because it fires before the input's blur."</li>
          <li>Adds ARIA: <InlineCode>role="combobox"</InlineCode>, <InlineCode>aria-expanded</InlineCode>, <InlineCode>aria-autocomplete="list"</InlineCode> on the input; <InlineCode>role="listbox"</InlineCode> on the <InlineCode>ul</InlineCode>; <InlineCode>role="option"</InlineCode> + <InlineCode>aria-selected</InlineCode> on each <InlineCode>li</InlineCode>.</li>
        </ul>
      </SeniorSignal>

      <Trap>
        <ul>
          <li>Fetching on every debounced keystroke — the README says fetch once and filter locally.</li>
          <li>Storing <InlineCode>filtered</InlineCode> in state with a <InlineCode>useEffect</InlineCode> watcher instead of deriving it with <InlineCode>useMemo</InlineCode>.</li>
          <li>Using <InlineCode>onClick</InlineCode> instead of <InlineCode>onMouseDown</InlineCode> for dropdown items — the click fires after blur, closing the list before selection.</li>
          <li>Forgetting to ignore <InlineCode>AbortError</InlineCode> in the catch block — it fires on every unmount and is not a real error.</li>
        </ul>
      </Trap>

      <KeyInsight>
        <ul>
          <li><strong>Custom hook justification:</strong> <InlineCode>useDebounce</InlineCode> is extracted because it has zero coupling to component UI and is reused for all debounced inputs. It's one of the few hooks that's always worth extracting.</li>
          <li><strong>Why <InlineCode>useMemo</InlineCode> over <InlineCode>useEffect</InlineCode>:</strong> Filtering is a synchronous derivation — not a side effect. <InlineCode>useMemo</InlineCode> is the right tool; <InlineCode>useEffect</InlineCode> would add an extra render cycle and a stale-closure risk.</li>
        </ul>
      </KeyInsight>
    </>
  ),
};
