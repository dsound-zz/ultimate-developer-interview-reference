import { useState, useMemo } from 'react';
import styles from './SortableTable.module.css';
import { SectionCard } from '../components/SectionCard';
import { SeniorSignal } from '../components/SeniorSignal';
import { InlineCode } from '../components/InlineCode';

type SortKey = 'name' | 'age';
type SortDir = 'asc' | 'desc';

const data = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'David', age: 28 },
  { id: 5, name: 'Eve', age: 32 },
];

export default function SortableTable() {
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; dir: SortDir } | null>(null);

  // useMemo: sort only recalculates when data or sortConfig changes.
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    // Shallow clone FIRST. .sort() mutates. I always say this out loud.
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      const order = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortConfig.dir === 'asc' ? order : -order;
    });
  }, [sortConfig]);

  function handleSort(key: SortKey) {
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) return { key, dir: 'asc' };
      if (prev.dir === 'asc') return { key, dir: 'desc' };
      return null; // Third click clears sort — back to original order.
    });
  }

  function getSortIndicator(key: SortKey) {
    if (sortConfig?.key !== key) return '↕';
    return sortConfig.dir === 'asc' ? '↑' : '↓';
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Name {getSortIndicator('name')}</th>
          <th onClick={() => handleSort('age')}>Age {getSortIndicator('age')}</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export const SortableTableChallenge = {
  id: 'sortable-table',
  title: 'Sortable Table',
  demo: <SortableTable />,
  code: `type SortKey = 'name' | 'age'
type SortDir = 'asc' | 'desc'

const data = [
  { id: 1, name: 'Alice', age: 30 }, { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 }, { id: 4, name: 'David', age: 28 },
  { id: 5, name: 'Eve', age: 32 },
]

export default function SortableTable() {
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; dir: SortDir } | null>(null)

  // "useMemo: sort only recalculates when data or sortConfig changes."
  const sortedData = useMemo(() => {
    if (!sortConfig) return data
    // "Shallow clone FIRST. .sort() mutates. I always say this out loud."
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key]
      const bVal = b[sortConfig.key]
      const order = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortConfig.dir === 'asc' ? order : -order
    })
  }, [sortConfig])

  function handleSort(key: SortKey) {
    setSortConfig(prev => {
      if (!prev || prev.key !== key) return { key, dir: 'asc' }
      if (prev.dir === 'asc') return { key, dir: 'desc' }
      return null  // "Third click clears sort — back to original order."
    })
  }

  function getSortIndicator(key: SortKey) {
    if (sortConfig?.key !== key) return '↕'
    return sortConfig.dir === 'asc' ? '↑' : '↓'
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Name {getSortIndicator('name')}</th>
          <th onClick={() => handleSort('age')}>Age {getSortIndicator('age')}</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map(row => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}`,
  coachView: (
    <>
      <SectionCard title="How to think about it">
        <ul>
          <li>"State representation: one configuration object: <InlineCode>&#123; key: SortKey, dir: 'asc' | 'desc' &#125; | null</InlineCode>. The sorted data list is derived using a memoized selector."</li>
          <li>"The key senior developer signal is clone-before-sorting: <InlineCode>[...data].sort()</InlineCode>. Never mutate the original reference. I mention this unprompted."</li>
          <li>Walk through toggle cycles: first click sets key ascending → second click flips direction to descending → third click clears sorting completely.</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li>Shallow clones array before sorting: <InlineCode>[...data].sort()</InlineCode> because JS's native sort function mutates arrays in place, which violates React's state immutability.</li>
          <li>Wraps the sort algorithm in <InlineCode>useMemo</InlineCode> so sorting calculations do not run needlessly during irrelevant renders.</li>
          <li>Notes that comparator math must handle string comparisons differently from number calculations for general real-world tables.</li>
          <li>Explains that for large datasets in production, sorting should reside server-side, triggered via URL parameters.</li>
        </ul>
      </SeniorSignal>
    </>
  ),
};
