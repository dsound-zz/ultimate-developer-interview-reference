import { useState, useEffect, useRef } from 'react';
import styles from './Timer.module.css';
import { SectionCard } from '../components/SectionCard';
import { SeniorSignal } from '../components/SeniorSignal';
import { InlineCode } from '../components/InlineCode';

function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
  const centis = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}.${centis}`;
}

export default function Timer() {
  const [timeMs, setTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeMs((prev) => prev + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  function reset() {
    setIsRunning(false);
    setTimeMs(0);
  }

  return (
    <div className={styles.timer}>
      <div className={styles.display}>{formatTime(timeMs)}</div>
      <div className={styles.controls}>
        <button onClick={() => setIsRunning((r) => !r)}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export const TimerChallenge = {
  id: 'timer',
  title: 'Timer / Stopwatch',
  demo: <Timer />,
  code: `// Pure formatter outside the component — no closures needed
function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000).toString().padStart(2, '0')
  const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0')
  const centis = Math.floor((ms % 1000) / 10).toString().padStart(2, '0')
  return \`\${minutes}:\${seconds}.\${centis}\`
}

export default function Timer() {
  const [timeMs, setTimeMs] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  // "useRef for the ID — changing it doesn't need a re-render."
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        // "Callback form avoids stale closure over timeMs."
        setTimeMs(prev => prev + 10)
      }, 10)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  function reset() {
    setIsRunning(false)
    setTimeMs(0)
  }

  return (
    <div className={styles.timer}>
      <div className={styles.display}>{formatTime(timeMs)}</div>
      <div className={styles.controls}>
        <button onClick={() => setIsRunning(r => !r)}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}`,
  coachView: (
    <>
      <SectionCard title="How to think about it">
        <ul>
          <li>"State layout: <InlineCode>timeMs: number</InlineCode> and <InlineCode>isRunning: boolean</InlineCode>. The interval ID is stored in a ref container, not state, so we avoid triggering renders when starting and stopping."</li>
          <li>"The effect hooks into changes on <InlineCode>isRunning</InlineCode>. If true, start interval tick. If false, clear it. Return the clear function for standard cleanup."</li>
          <li>"We update time using the functional state form: <InlineCode>prev =&gt; prev + 10</InlineCode>. This prevents stale closure reference bugs over the <InlineCode>timeMs</InlineCode> value."</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li>Uses <InlineCode>useRef</InlineCode> for the interval ID: "It is not UI state. Saving it in state would trigger a useless additional render cycle."</li>
          <li>Employs the functional updater form <InlineCode>setTimeMs(prev =&gt; prev + 10)</InlineCode> inside intervals to eliminate stale closures.</li>
          <li>Places time string formatting <InlineCode>formatTime(ms)</InlineCode> outside the component context as a pure, easily testable helper.</li>
          <li>Mentions timer drift: "Native intervals can drift. For high-precision stopwatches, I'd track <InlineCode>Date.now()</InlineCode> timestamps and compute elapsed offsets."</li>
        </ul>
      </SeniorSignal>
    </>
  ),
};
