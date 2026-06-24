import { useState, useMemo, useEffect } from 'react';
import styles from './SortableTable.module.css';
import { SectionCard } from '../components/SectionCard';
import { SeniorSignal } from '../components/SeniorSignal';
import { Trap } from '../components/Trap';
import { KeyInsight } from '../components/KeyInsight';
import { InlineCode } from '../components/InlineCode';

// ── Types ───────────────────────────────────────────────────
type Priority = 'High' | 'Normal' | 'Low';
type IssueStatus = 'Open' | 'In Progress' | 'Closed';

interface Issue {
  id: number;
  title: string;
  status: IssueStatus;
  priority: Priority;
  assignee: string;
  description: string;
}

const PRIORITY_RANK: Record<Priority, number> = { High: 0, Normal: 1, Low: 2 };

// ── Mock data ──────────────────────────────────────────────
const MOCK_ISSUES: Issue[] = [
  { id: 1, title: 'Fix login redirect loop', status: 'Open', priority: 'High', assignee: 'Alice', description: 'Users are caught in a redirect loop after OAuth.' },
  { id: 2, title: 'Add dark mode toggle', status: 'In Progress', priority: 'Normal', assignee: 'Bob', description: 'Implement a system-preference-aware dark mode.' },
  { id: 3, title: 'Optimise image compression', status: 'Open', priority: 'Low', assignee: 'Alice', description: 'Run images through WebP pipeline on upload.' },
  { id: 4, title: 'Database connection pool leaking', status: 'Open', priority: 'High', assignee: 'Carol', description: 'Pool exhaustion under load — needs timeout config.' },
  { id: 5, title: 'Update README for v2', status: 'Closed', priority: 'Low', assignee: 'Bob', description: 'Docs are out of date since the v2 release.' },
  { id: 6, title: 'Rate limiting on API', status: 'In Progress', priority: 'High', assignee: 'Carol', description: 'Add per-user rate limiting to prevent abuse.' },
];

// ── Simulated async fetch ──────────────────────────────────
function fetchIssues(): Promise<Issue[]> {
  const delay = 300 + Math.random() * 700;
  const shouldFail = Math.random() < 0.15;
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (shouldFail) reject(new Error('Simulated 500: server error'));
      else resolve(MOCK_ISSUES);
    }, delay)
  );
}

type SortKey = 'title' | 'priority';
type FetchStatus = 'loading' | 'success' | 'error';

export default function SortableTable() {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>('loading');
  const [issues, setIssues] = useState<Issue[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('All');
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  function loadIssues() {
    setFetchStatus('loading');
    setFetchError(null);
    fetchIssues()
      .then((data) => {
        setIssues(data);
        setFetchStatus('success');
      })
      .catch((err: Error) => {
        setFetchError(err.message);
        setFetchStatus('error');
      });
  }

  useEffect(() => { loadIssues(); }, []);

  // Derived — never stored
  const uniqueStatuses = useMemo(
    () => ['All', ...Array.from(new Set(issues.map((i) => i.status)))],
    [issues]
  );
  const uniqueAssignees = useMemo(
    () => ['All', ...Array.from(new Set(issues.map((i) => i.assignee)))],
    [issues]
  );

  const displayedIssues = useMemo(() => {
    let result = issues;
    if (statusFilter !== 'All') result = result.filter((i) => i.status === statusFilter);
    if (assigneeFilter !== 'All') result = result.filter((i) => i.assignee === assigneeFilter);
    if (sortKey === 'title') result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    if (sortKey === 'priority') result = [...result].sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);
    return result;
  }, [issues, statusFilter, assigneeFilter, sortKey]);

  if (fetchStatus === 'loading') return <div className={styles.state}>Loading issues...</div>;
  if (fetchStatus === 'error') {
    return (
      <div className={styles.state}>
        <span>Error: {fetchError}</span>
        <button className={styles.retryBtn} onClick={loadIssues}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* Filter + sort controls */}
      <div className={styles.controls}>
        <select
          className={styles.select}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {uniqueStatuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select
          className={styles.select}
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
        >
          {uniqueAssignees.map((a) => <option key={a}>{a}</option>)}
        </select>
        <button
          className={`${styles.sortBtn} ${sortKey === 'title' ? styles.active : ''}`}
          onClick={() => setSortKey(sortKey === 'title' ? null : 'title')}
        >
          Title A–Z
        </button>
        <button
          className={`${styles.sortBtn} ${sortKey === 'priority' ? styles.active : ''}`}
          onClick={() => setSortKey(sortKey === 'priority' ? null : 'priority')}
        >
          Priority
        </button>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        {displayedIssues.map((issue) => (
          <div key={issue.id}>
            <div
              className={styles.row}
              onClick={() => setExpandedId(expandedId === issue.id ? null : issue.id)}
            >
              <span className={styles.rowTitle}>{issue.title}</span>
              <span className={`${styles.badge} ${styles[issue.status.replace(' ', '')]}`}>
                {issue.status}
              </span>
              <span className={`${styles.badge} ${styles[issue.priority]}`}>
                {issue.priority}
              </span>
              <span className={styles.assignee}>{issue.assignee}</span>
            </div>
            {expandedId === issue.id && (
              <div className={styles.details}>
                <p><strong>Description:</strong> {issue.description}</p>
                <p><strong>Assignee:</strong> {issue.assignee} · <strong>Priority:</strong> {issue.priority}</p>
              </div>
            )}
          </div>
        ))}
        {displayedIssues.length === 0 && (
          <div className={styles.empty}>No issues match the current filters.</div>
        )}
      </div>
    </div>
  );
}

export const SortableTableChallenge = {
  id: 'sortable-table',
  title: 'Sortable Table',
  demo: <SortableTable />,
  code: `// This is the hardest React drill — it layers 5 patterns simultaneously.
// Walk the interviewer through each layer before coding.

type Priority = 'High' | 'Normal' | 'Low'
type IssueStatus = 'Open' | 'In Progress' | 'Closed'
interface Issue { id: number; title: string; status: IssueStatus; priority: Priority; assignee: string; description: string }

// "Priority sort requires a rank map — alphabetical won't work."
const PRIORITY_RANK: Record<Priority, number> = { High: 0, Normal: 1, Low: 2 }

// "Simulated async fetch — 300–1000ms delay, ~15% failure rate."
function fetchIssues(): Promise<Issue[]> {
  const delay = 300 + Math.random() * 700
  const shouldFail = Math.random() < 0.15
  return new Promise((resolve, reject) =>
    setTimeout(() => shouldFail ? reject(new Error('Server error')) : resolve(MOCK_ISSUES), delay)
  )
}

type FetchStatus = 'loading' | 'success' | 'error'
type SortKey = 'title' | 'priority'

export default function SortableTable() {
  // ── Async fetch state ──────────────────────────────────
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>('loading')
  const [issues, setIssues] = useState<Issue[]>([])
  const [fetchError, setFetchError] = useState<string | null>(null)

  // ── UI state ──────────────────────────────────────────
  const [statusFilter, setStatusFilter] = useState('All')
  const [assigneeFilter, setAssigneeFilter] = useState('All')
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  function loadIssues() {
    setFetchStatus('loading')
    setFetchError(null)
    fetchIssues()
      .then(data => {
        setIssues(data)
        setFetchStatus('success')
        // "Optional: cache to localStorage here."
        // localStorage.setItem('issues-cache', JSON.stringify(data))
      })
      .catch((err: Error) => {
        setFetchError(err.message)
        setFetchStatus('error')
      })
  }

  useEffect(() => { loadIssues() }, [])

  // ── All derived — never stored ─────────────────────────
  const uniqueStatuses = useMemo(
    () => ['All', ...new Set(issues.map(i => i.status))], [issues]
  )
  const uniqueAssignees = useMemo(
    () => ['All', ...new Set(issues.map(i => i.assignee))], [issues]
  )
  const displayedIssues = useMemo(() => {
    let result = issues
    if (statusFilter !== 'All') result = result.filter(i => i.status === statusFilter)
    if (assigneeFilter !== 'All') result = result.filter(i => i.assignee === assigneeFilter)
    if (sortKey === 'title') result = [...result].sort((a, b) => a.title.localeCompare(b.title))
    if (sortKey === 'priority') result = [...result].sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority])
    return result
  }, [issues, statusFilter, assigneeFilter, sortKey])

  if (fetchStatus === 'loading') return <div>Loading...</div>
  if (fetchStatus === 'error') return (
    <div>
      Error: {fetchError}
      <button onClick={loadIssues}>Retry</button>
    </div>
  )

  return (
    <div>
      {/* Filter + sort controls */}
      <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
        {uniqueStatuses.map(s => <option key={s}>{s}</option>)}
      </select>
      <select value={assigneeFilter} onChange={e => setAssigneeFilter(e.target.value)}>
        {uniqueAssignees.map(a => <option key={a}>{a}</option>)}
      </select>
      <button onClick={() => setSortKey(s => s === 'title' ? null : 'title')}>Title A–Z</button>
      <button onClick={() => setSortKey(s => s === 'priority' ? null : 'priority')}>Priority</button>

      {/* Rows */}
      {displayedIssues.map(issue => (
        <div key={issue.id}>
          <div onClick={() => setExpandedId(id => id === issue.id ? null : issue.id)}>
            {issue.title} | {issue.status} | {issue.priority} | {issue.assignee}
          </div>
          {/* Inline detail panel */}
          {expandedId === issue.id && (
            <div>{issue.description}</div>
          )}
        </div>
      ))}
    </div>
  )
}`,
  coachView: (
    <>
      <SectionCard title="Requirements (from the drill spec)">
        <ol>
          <li><strong>Async fetch</strong> with simulated 300–1000ms delay and ~15% failure rate.</li>
          <li><strong>Loading state</strong> while fetching; <strong>error state with Retry button</strong> on failure.</li>
          <li><strong>Table with columns:</strong> Title, Status, Priority, Assignee.</li>
          <li><strong>Filter controls:</strong> Status filter (All + unique statuses) and Assignee filter (All + unique assignees).</li>
          <li><strong>Sort by:</strong> Title (A–Z) and Priority (High &gt; Normal &gt; Low — requires a rank map, not alphabetical).</li>
          <li><strong>Click row</strong> to toggle an inline detail panel.</li>
          <li><strong>Cache</strong> successful results in <InlineCode>localStorage</InlineCode> and read on load.</li>
          <li><strong>Optimistic "Close Issue":</strong> update UI immediately, simulate async with ~20% failure, rollback on failure.</li>
        </ol>
      </SectionCard>

      <SectionCard title="How to think about it">
        <ul>
          <li>"This is five patterns layered together. I walk through them in order before writing any code: async fetch → filter → sort → detail panel → optimistic update."</li>
          <li>"State layout: fetch status (enum), raw issues array, filter values, sort key, expanded row ID. Everything displayed is derived with <InlineCode>useMemo</InlineCode>."</li>
          <li>"The filter + sort chain is a pipeline: filter by status → filter by assignee → sort. All applied in one <InlineCode>useMemo</InlineCode> block."</li>
          <li>Priority sort is a common trap: <InlineCode>PRIORITY_RANK: Record&lt;Priority, number&gt; = {'{ High: 0, Normal: 1, Low: 2 }'}</InlineCode>. Alphabetical sort on the string gives the wrong order.</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li>Extracts a <InlineCode>loadIssues()</InlineCode> function (not just an arrow in the effect) so the Retry button can call the same logic.</li>
          <li>Derives <InlineCode>uniqueStatuses</InlineCode> and <InlineCode>uniqueAssignees</InlineCode> dynamically from the fetched data. "Never hardcode filter options — they'd drift out of sync with the data."</li>
          <li>Shallow clones before sorting: <InlineCode>[...result].sort()</InlineCode>. "JS's native sort mutates. I say this out loud."</li>
          <li>Explains localStorage caching: "On mount, read from cache first if present. After a successful fetch, write back. This gives instant first paint on revisit."</li>
          <li>Explains optimistic updates: "I update the UI immediately, fire the API call, and roll back <InlineCode>setIssues(prev)</InlineCode> if it fails. The 20% failure rate in the drill is designed to test this."</li>
        </ul>
      </SeniorSignal>

      <Trap>
        <ul>
          <li>Storing <InlineCode>filteredIssues</InlineCode> or <InlineCode>sortedIssues</InlineCode> in state and syncing them with <InlineCode>useEffect</InlineCode> — derive them with <InlineCode>useMemo</InlineCode> instead.</li>
          <li>Sorting priority alphabetically — 'High', 'Low', 'Normal' (wrong). Use a rank map.</li>
          <li>Mutating the array before sorting: <InlineCode>issues.sort()</InlineCode> without spreading first breaks React's immutability contract.</li>
          <li>Not handling the Retry case — the Retry button must call the same fetch function, which means it can't be anonymous inside <InlineCode>useEffect</InlineCode>.</li>
        </ul>
      </Trap>

      <KeyInsight>
        <ul>
          <li><strong>When to use <InlineCode>useReducer</InlineCode>:</strong> "If the filter/sort state grows complex or actions need to be combined atomically, I'd switch to <InlineCode>useReducer</InlineCode>. For this scope, individual <InlineCode>useState</InlineCode> calls are fine."</li>
          <li><strong>Optimistic update pattern:</strong> "Save the previous state before the mutation. If the API call fails, call <InlineCode>setIssues(previousIssues)</InlineCode> in the catch block. That's the whole pattern."</li>
        </ul>
      </KeyInsight>
    </>
  ),
};
