import { useState } from 'react';
import styles from './GridToggle.module.css';
import { SectionCard } from '../components/SectionCard';
import { SeniorSignal } from '../components/SeniorSignal';
import { InlineCode } from '../components/InlineCode';

const GRID_SIZE = 8;

const grid = Array.from({ length: GRID_SIZE }, (_, row) =>
  Array.from({ length: GRID_SIZE }, (_, col) => ({ row, col }))
);

export default function GridToggle() {
  const [toggled, setToggled] = useState<Set<string>>(new Set());

  function handleToggle(row: number, col: number) {
    const key = `${row}-${col}`;
    setToggled((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <div className={styles.grid}>
      {grid.map((row) =>
        row.map(({ row: r, col: c }) => {
          const key = `${r}-${c}`;
          const isLight = (r + c) % 2 === 0;
          const isToggled = toggled.has(key);

          return (
            <button
              key={key}
              className={`${styles.cell}
                ${isLight ? styles.light : styles.dark}
                ${isToggled ? styles.toggled : ''}`}
              onClick={() => handleToggle(r, c)}
              aria-pressed={isToggled}
            />
          );
        })
      )}
    </div>
  );
}

export const GridToggleChallenge = {
  id: 'grid-toggle',
  title: 'Grid Toggle',
  demo: <GridToggle />,
  code: `const GRID_SIZE = 8

// "Build data outside the component — it never changes."
const grid = Array.from({ length: GRID_SIZE }, (_, row) =>
  Array.from({ length: GRID_SIZE }, (_, col) => ({ row, col }))
)

export default function GridToggle() {
  // "Set of 'row-col' keys. Sparse: only toggled cells exist."
  const [toggled, setToggled] = useState<Set<string>>(new Set())

  function handleToggle(row: number, col: number) {
    const key = \`\${row}-\${col}\`
    setToggled(prev => {
      const next = new Set(prev)
      // "Immutable update: clone the Set, then mutate the clone."
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div className={styles.grid}>
      {grid.map(row => (
        row.map(({ row: r, col: c }) => {
          const key = \`\${r}-\${c}\`
          const isLight = (r + c) % 2 === 0  // chessboard pattern
          const isToggled = toggled.has(key)

          return (
            <button
              key={key}
              className={\`\${styles.cell}
                \${isLight ? styles.light : styles.dark}
                \${isToggled ? styles.toggled : ''}\`}
              onClick={() => handleToggle(r, c)}
              aria-pressed={isToggled}
            />
          )
        })
      ))}
    </div>
  )
}`,
  coachView: (
    <>
      <SectionCard title="How to think about it">
        <ul>
          <li>"We build the grid coordinates structure before writing any JSX — a 2D array defined outside the component namespace. The render cycle simply maps over it."</li>
          <li>"State layout: a <InlineCode>Set&lt;string&gt;</InlineCode> containing active keys in <InlineCode>'row-col'</InlineCode> format. Checking if a cell is toggled is a constant-time <InlineCode>toggled.has(key)</InlineCode> check."</li>
          <li>"Alternative: a 2D array of booleans. Both are fine, but a sparse Set is cleaner and avoids allocating memory for dozens of unclicked cells."</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li>Builds static grid matrices outside the component tree. "No reason to recalculate coordinate grids during render frames."</li>
          <li>Computes chessboard alternating colors cleanly using index math: <InlineCode>(row + col) % 2 === 0</InlineCode>.</li>
          <li>Uses immutable Set modifications: <InlineCode>new Set(prev)</InlineCode> followed by mutations on the cloned copy.</li>
          <li>Mentions state libraries: "I'd reach for <InlineCode>useReducer</InlineCode> if complex interactions like clearing, inversions, or bounds dragging were required. For simple single clicks, a state Set is optimal."</li>
        </ul>
      </SeniorSignal>
    </>
  ),
};
