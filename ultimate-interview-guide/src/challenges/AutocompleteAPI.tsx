import { useState, useEffect } from 'react';
import styles from './AutocompleteAPI.module.css';
import { SectionCard } from '../components/SectionCard';
import { SeniorSignal } from '../components/SeniorSignal';
import { Trap } from '../components/Trap';
import { KeyInsight } from '../components/KeyInsight';
import { InlineCode } from '../components/InlineCode';

function useDebounce<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function AutocompleteAPI() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 220);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    async function fetchData() {
      try {
        // Simulate local endpoint using public users API
        const url = `https://jsonplaceholder.typicode.com/users`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error('API server returned status ' + res.status);
        const data = await res.json();
        
        // Filter users to mock a server-side search
        const filtered = data
          .map((user: any) => user.name)
          .filter((name: string) => name.toLowerCase().includes(debouncedQuery.toLowerCase()));
        
        setResults(filtered);
        setLoading(false);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <div className={styles.container}>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder="Search names (e.g., Ervin, Leanne)..."
        className={styles.input}
      />
      {isOpen && (query.length > 0 || loading || error) && (
        <ul className={styles.dropdown}>
          {loading && <li className={styles.statusMessage}>Loading suggestions...</li>}
          {error && <li className={styles.errorMessage}>Error: {error}</li>}
          {!loading && !error && results.length === 0 && (
            <li className={styles.statusMessage}>No matches found</li>
          )}
          {!loading &&
            !error &&
            results.map((item) => (
              <li
                key={item}
                className={styles.option}
                onMouseDown={() => {
                  setQuery(item);
                  setIsOpen(false);
                }}
              >
                {item}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export const AutocompleteAPIChallenge = {
  id: 'autocomplete-api',
  title: 'Autocomplete (API / debounced)',
  demo: <AutocompleteAPI />,
  code: `// Custom hook — justified: reusable, clean boundaries, no component coupling
function useDebounce<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(id)
  }, [value, delay])
  return debounced
}

export default function AutocompleteAPI() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedQuery = useDebounce(query, 220)

  useEffect(() => {
    if (!debouncedQuery) { setResults([]); return }

    // "AbortController: cancels the in-flight request when query changes.
    //  Without this, a slow request can overwrite a fast one."
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    async function fetchData() {
      try {
        const res = await fetch(\`http://localhost:3001/query?search=\${encodeURIComponent(debouncedQuery)}\`, {
          signal: controller.signal
        })
        if (!res.ok) throw new Error('Request failed')
        const data: string[] = await res.json()
        setResults(data)
        setLoading(false)
      } catch (err: any) {
        // "AbortError is not a real error — it's expected cleanup."
        if (err.name !== 'AbortError') {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    fetchData()
    return () => controller.abort()  // "Cleanup: abort on every new keystroke after debounce."
  }, [debouncedQuery])

  // ... render (same as local autocomplete + loading/error states)
}`,
  coachView: (
    <>
      <SectionCard title="How to think about it">
        <ul>
          <li>"Now we have asynchronous data, so I need state for: query, results, loading, and error, plus a debounced query to throttle network requests."</li>
          <li>"I immediately reach for <InlineCode>AbortController</InlineCode>. Race conditions on typing search boxes are a classic senior-level evaluation question."</li>
          <li>Walk through the fetch lifecycle: user typing updates raw query → debounce timer triggers updates to debounced query → fetch fires with abort signal → results resolve or get caught in cleanup.</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li>Attaches an <InlineCode>AbortController</InlineCode> on every request inside the effect. "If I fire two requests and the second resolves first, I cancel the in-flight stale one."</li>
          <li>Distinguishes between <InlineCode>AbortError</InlineCode> and real errors inside the catch block to avoid showing error flags during standard keystroke cancellations.</li>
          <li>Explains that the fetch effect depends on the debounced value, not the raw query state, ensuring requests only fire when typing pauses.</li>
        </ul>
      </SeniorSignal>

      <Trap>
        <ul>
          <li>Forgetting to abort pending fetches on component unmount or keystroke updates, producing race conditions.</li>
          <li>Omitting debounce timers entirely and hitting the API on every single keystroke.</li>
        </ul>
      </Trap>

      <KeyInsight>
        <ul>
          <li><strong>Custom hook justification:</strong> Extracting a reusable <InlineCode>useDebounce</InlineCode> hook is highly recommended here. It has clear inputs, zero coupling to component UI, and is a pattern you'll reuse for all debounced events.</li>
        </ul>
      </KeyInsight>
    </>
  ),
};
