import { useState, useEffect } from 'react';
import styles from './FetchDemo.module.css';
import { SectionCard } from '../components/SectionCard';
import { SeniorSignal } from '../components/SeniorSignal';
import { Trap } from '../components/Trap';
import { InlineCode } from '../components/InlineCode';

type Status = 'loading' | 'success' | 'error';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function FetchDemo() {
  const [status, setStatus] = useState<Status>('loading');
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Post[] = await res.json();
        setPosts(data);
        setStatus('success');
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setStatus('error');
        }
      }
    }

    load();
    return () => controller.abort();
  }, []);

  if (status === 'loading') return <div className={styles.state}>Loading posts...</div>;
  if (status === 'error') return <div className={styles.state}>Error: {error}</div>;

  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.id} className={styles.post}>
          <strong>{post.title}</strong>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

export const FetchDemoChallenge = {
  id: 'fetch-demo',
  title: 'Fetch Demo',
  demo: <FetchDemo />,
  code: `type Status = 'loading' | 'success' | 'error'

interface Post { id: number; title: string; body: string }

// "Extract to useFetch in production. For now, inline to show the pattern."
export default function FetchDemo() {
  // "Status enum: loading | success | error. No impossible states."
  const [status, setStatus] = useState<Status>('loading')
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
          signal: controller.signal
        })
        // "Always check res.ok — 404/500 don't throw."
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
        const data: Post[] = await res.json()
        setPosts(data)
        setStatus('success')
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setStatus('error')
        }
      }
    }

    load()
    return () => controller.abort()
  }, [])

  if (status === 'loading') return <div className={styles.state}>Loading...</div>
  if (status === 'error') return <div className={styles.state}>Error: {error}</div>

  return (
    <ul className={styles.list}>
      {posts.map(post => (
        <li key={post.id} className={styles.post}>
          <strong>{post.title}</strong>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  )
}`,
  coachView: (
    <>
      <SectionCard title="How to think about it">
        <ul>
          <li>"Classic async data state triangle: data, loading, and error. The only design question is whether to use a unified state status enum or three separate booleans."</li>
          <li>"I prefer a status enum: <InlineCode>'idle' | 'loading' | 'success' | 'error'</InlineCode>. It makes impossible states impossible — you can't be loading and errored simultaneously."</li>
          <li>Mount → fetch with abort signal → set loaded data or catch exception error → return cleanups.</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li>Chooses state enum status keys over parallel booleans. "Parallel booleans permit states like <InlineCode>loading: true, error: 'failure'</InlineCode> which shouldn't happen."</li>
          <li>Explicitly inspects <InlineCode>res.ok</InlineCode> before running JSON parsing, noting that HTTP 404s/500s do not natively throw errors in fetch.</li>
          <li>Ensures the default status begins with <InlineCode>'loading'</InlineCode> if fetching immediately on mount to prevent flash-frames of empty success states.</li>
        </ul>
      </SeniorSignal>

      <Trap>
        <ul>
          <li>Starting fetch state triggers with loading set to <InlineCode>false</InlineCode> and flipping it inside effect triggers, generating jarring layout shifts.</li>
          <li>Skipping <InlineCode>res.ok</InlineCode> checks, causing silent failures on broken API routes.</li>
        </ul>
      </Trap>

      <SectionCard title="Architecture Decisions">
        <ul>
          <li><strong>Hooks extraction:</strong> "I'd extract this request structure to <InlineCode>useFetch&lt;T&gt;(url)</InlineCode> in a real product. The state orchestration is identical for every basic GET hook."</li>
        </ul>
      </SectionCard>
    </>
  ),
};
