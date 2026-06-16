import { useState } from 'react';
import styles from './Pagination.module.css';
import { SectionCard } from '../components/SectionCard';
import { SeniorSignal } from '../components/SeniorSignal';
import { InlineCode } from '../components/InlineCode';

const items = Array.from({ length: 47 }, (_, i) => `Item ${i + 1}`);
const PER_PAGE = 10;

export default function Pagination() {
  const [page, setPage] = useState(1);

  // Everything derived. I say this out loud: 'I'm deriving three values from one integer.'
  const totalPages = Math.ceil(items.length / PER_PAGE);
  const startIndex = (page - 1) * PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + PER_PAGE);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {currentItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className={styles.controls}>
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export const PaginationChallenge = {
  id: 'pagination',
  title: 'Pagination',
  demo: <Pagination />,
  code: `const items = Array.from({ length: 47 }, (_, i) => \`Item \${i + 1}\`)
const PER_PAGE = 10

export default function Pagination() {
  const [page, setPage] = useState(1)

  // "Everything derived. I say this out loud: 'I'm deriving three values from one integer.'"
  const totalPages = Math.ceil(items.length / PER_PAGE)
  const startIndex = (page - 1) * PER_PAGE
  const currentItems = items.slice(startIndex, startIndex + PER_PAGE)

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {currentItems.map(item => <li key={item}>{item}</li>)}
      </ul>
      <div className={styles.controls}>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  )
}`,
  coachView: (
    <>
      <SectionCard title="How to think about it">
        <ul>
          <li>"One piece of state: <InlineCode>page</InlineCode>. Everything else — <InlineCode>totalPages</InlineCode>, <InlineCode>startIndex</InlineCode>, <InlineCode>currentItems</InlineCode> — is derived math."</li>
          <li>"I build the derived values in three lines above the return and never touch state again."</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li>"I name the constants clearly: <InlineCode>PER_PAGE</InlineCode>, <InlineCode>totalPages</InlineCode>, <InlineCode>startIndex</InlineCode>. Someone should be able to read this layout code without comments."</li>
          <li>Correctly utilizes <InlineCode>Math.ceil(items.length / PER_PAGE)</InlineCode> instead of <InlineCode>Math.floor</InlineCode> to handle fractional pages.</li>
          <li>Disables buttons on boundary limits: Prev on page 1, Next on last page.</li>
          <li>Proactively mentions that for shareable, URL-driven routing, page numbers should be driven by search parameters using <InlineCode>useSearchParams</InlineCode> rather than local state.</li>
        </ul>
      </SeniorSignal>
    </>
  ),
};
