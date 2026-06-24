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

  // Form state
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // GET on mount
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
      } catch (err: unknown) {
        const e = err as { name?: string; message?: string };
        if (e.name !== 'AbortError') {
          setError(e.message ?? 'Unknown error');
          setStatus('error');
        }
      }
    }

    load();
    return () => controller.abort();
  }, []);

  // POST on submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, userId: 1 }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const newPost: Post = await res.json();
      // Prepend to list — optimistic-style update from server response
      setPosts((prev) => [newPost, ...prev]);
      setTitle('');
      setBody('');
    } catch (err: unknown) {
      const e = err as { message?: string };
      alert('Post failed: ' + (e.message ?? 'unknown'));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status === 'loading') return <div className={styles.state}>Loading posts...</div>;
  if (status === 'error') return <div className={styles.state}>Error: {error}</div>;

  return (
    <div>
      {/* Create post form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          className={styles.input}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
        />
        <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
          {isSubmitting ? 'Posting...' : 'Add Post'}
        </button>
      </form>

      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.id} className={styles.post}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const FetchDemoChallenge = {
  id: 'fetch-demo',
  title: 'Fetch Demo',
  demo: <FetchDemo />,
  code: `type Status = 'loading' | 'success' | 'error'
interface Post { id: number; title: string; body: string }

export default function FetchDemo() {
  // "Status enum: loading | success | error. No impossible states."
  const [status, setStatus] = useState<Status>('loading')
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)

  // Form state — separate from the fetch state
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ── GET on mount ───────────────────────────────────────
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

  // ── POST on submit ─────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return

    setIsSubmitting(true)  // "Disable button to prevent double-submit."
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, userId: 1 })
      })
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
      const newPost: Post = await res.json()
      // "Prepend the server response — don't mutate existing array."
      setPosts(prev => [newPost, ...prev])
      setTitle('')
      setBody('')
    } catch (err: any) {
      alert('Post failed: ' + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading') return <div>Loading posts...</div>
  if (status === 'error') return <div>Error: {error}</div>

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <input value={body} onChange={e => setBody(e.target.value)} placeholder="Body" />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Add Post'}
        </button>
      </form>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}`,
  coachView: (
    <>
      <SectionCard title="Requirements (from the drill spec)">
        <ol>
          <li><strong>GET posts on mount</strong> — fetch from the API and display the list.</li>
          <li><strong>Form to create a new post</strong> — controlled inputs for title and body.</li>
          <li><strong>POST on submit</strong> — send <InlineCode>{`{ title, body, userId: 1 }`}</InlineCode> and update the list on success.</li>
          <li><strong>Loading state</strong> while the initial GET is in flight.</li>
          <li><strong>Submitting state</strong> while the POST is in flight — disable the button.</li>
          <li><strong>Update list after successful POST</strong> — prepend the server's response to the posts array.</li>
        </ol>
      </SectionCard>

      <SectionCard title="How to think about it">
        <ul>
          <li>"Two async operations with different state shapes. The GET drives the page-load status (<InlineCode>'loading' | 'success' | 'error'</InlineCode>). The POST drives a separate <InlineCode>isSubmitting</InlineCode> flag."</li>
          <li>"I prefer a status enum over parallel booleans: <InlineCode>'idle' | 'loading' | 'success' | 'error'</InlineCode>. It makes impossible states like <InlineCode>loading: true, error: 'failed'</InlineCode> structurally impossible."</li>
          <li>Mount → GET with abort signal → set loaded data or catch error → return cleanup. Submit → POST → prepend server response to list → reset form.</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li>Chooses a status enum over parallel booleans. "Parallel booleans permit states like <InlineCode>loading: true, error: 'failure'</InlineCode> which shouldn't happen."</li>
          <li>Explicitly checks <InlineCode>res.ok</InlineCode> before parsing JSON. "HTTP 404s and 500s do not throw — fetch only throws on network failure."</li>
          <li>Sets <InlineCode>isSubmitting</InlineCode> before the POST and clears it in <InlineCode>finally</InlineCode>. "The <InlineCode>finally</InlineCode> block guarantees the button re-enables even if the request fails."</li>
          <li>Prepends the server's response using <InlineCode>setPosts(prev =&gt; [newPost, ...prev])</InlineCode> — never mutates the existing array, and uses the ID the server assigned.</li>
          <li>Attaches an <InlineCode>AbortController</InlineCode> to the GET and cleans it up on unmount. "Without this, setting state after unmount throws a React warning."</li>
        </ul>
      </SeniorSignal>

      <Trap>
        <ul>
          <li>Starting with <InlineCode>loading: false</InlineCode> and flipping it inside the effect — causes a flash of empty content before loading starts.</li>
          <li>Skipping <InlineCode>res.ok</InlineCode> checks, causing silent failures when the API returns a non-2xx status.</li>
          <li>Missing the <InlineCode>isSubmitting</InlineCode> flag — users can double-submit by clicking the button multiple times.</li>
          <li>Mutating the posts array directly instead of spreading: <InlineCode>posts.push(newPost)</InlineCode> won't trigger a re-render.</li>
        </ul>
      </Trap>

      <SectionCard title="Architecture Decisions">
        <ul>
          <li><strong>Hooks extraction:</strong> "In a real product I'd extract <InlineCode>useFetch&lt;T&gt;(url)</InlineCode>. The GET state orchestration is identical for every basic data-loading hook."</li>
          <li><strong>Error recovery:</strong> "In production, the POST error should show an inline error message rather than <InlineCode>alert()</InlineCode>, but for an interview this is fine — it shows you thought about it."</li>
        </ul>
      </SectionCard>
    </>
  ),
};
