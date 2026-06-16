import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { SectionCard } from '../components/SectionCard';
import { InlineCode } from '../components/InlineCode';
import { Badge } from '../components/Badge';

export const ReactHooks: React.FC = () => {
  return (
    <SectionContainer
      id="react-hooks"
      title="React Hooks"
      category="HOOKS"
      accentColor="var(--blue)"
    >
      <SectionCard title="State hooks">
        <ul>
          <li><InlineCode>useState</InlineCode> — local primitive/object state. Re-renders on change.</li>
          <li><InlineCode>useReducer</InlineCode> — when next state depends on previous, or managing multiple sub-values. Like a mini Redux.</li>
          <li>State updates are <strong>batched</strong> in React 18+ (even in async handlers)</li>
          <li>State is snapshot-per-render — closures over state are stale if not refreshed</li>
        </ul>
      </SectionCard>

      <SectionCard title="Side effect hooks">
        <ul>
          <li><InlineCode>useEffect(fn, deps)</InlineCode> — runs after paint. Use for subscriptions, fetch, timers. Always return a cleanup.</li>
          <li><InlineCode>useLayoutEffect</InlineCode> — synchronous after DOM mutations, before paint. Use for measuring DOM, avoiding layout flash.</li>
          <li>Empty <InlineCode>[]</InlineCode> = run once on mount. No array = run every render.</li>
          <li><Badge variant="trap">Trap</Badge> React 18 Strict Mode mounts effects twice in dev — your cleanup must actually clean up</li>
        </ul>
      </SectionCard>

      <SectionCard title="Memoization hooks">
        <ul>
          <li><InlineCode>useMemo(fn, deps)</InlineCode> — caches the <strong>result</strong> of an expensive computation</li>
          <li><InlineCode>useCallback(fn, deps)</InlineCode> — caches the <strong>function reference</strong>. Critical when passing callbacks to memoized children.</li>
          <li>Both are opt-in perf tools — don't use them everywhere. Profile first.</li>
          <li><Badge variant="trap">Trap</Badge> Wrapping cheap computations adds overhead from comparison — net negative</li>
        </ul>
      </SectionCard>

      <SectionCard title="Ref hooks">
        <ul>
          <li><InlineCode>useRef</InlineCode> — mutable container that persists across renders <em>without</em> triggering re-render</li>
          <li>Use for: DOM access, storing previous values, tracking timers/subscriptions</li>
          <li><InlineCode>ref.current</InlineCode> is always up-to-date (not stale like closures over state)</li>
          <li><InlineCode>useImperativeHandle</InlineCode> — expose a custom ref API from a child to a parent</li>
        </ul>
      </SectionCard>

      <SectionCard title="Context">
        <ul>
          <li><InlineCode>useContext(Ctx)</InlineCode> — subscribe to nearest Provider value. Every consumer re-renders when value changes.</li>
          <li>Split contexts by update frequency to reduce blast radius</li>
          <li>Context is not a state manager — it doesn't optimize selectors</li>
        </ul>
      </SectionCard>

      <SectionCard title="React 19 additions">
        <ul>
          <li><InlineCode>use(promise)</InlineCode> — read a promise or context inside render. Works with Suspense.</li>
          <li><InlineCode>useOptimistic</InlineCode> — show optimistic UI while async action is in flight</li>
          <li><InlineCode>useFormStatus</InlineCode> — know if a parent <InlineCode>&lt;form&gt;</InlineCode> is submitting</li>
          <li>Server Actions can be called from client components; form actions are first-class</li>
        </ul>
      </SectionCard>
    </SectionContainer>
  );
};
