import { useState } from 'react';
import styles from './TicTacToe.module.css';
import { SectionCard } from '../components/SectionCard';
import { SeniorSignal } from '../components/SeniorSignal';
import { InlineCode } from '../components/InlineCode';

type Player = 'X' | 'O';
type Cell = Player | null;

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],          // diagonals
];

function getWinner(board: Cell[]): Player | null {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }
  return null;
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [current, setCurrent] = useState<Player>('X');

  const winner = getWinner(board);
  const isDraw = !winner && board.every(Boolean);

  function handleClick(index: number) {
    if (board[index] || winner) return;

    setBoard((prev) => prev.map((cell, i) => (i === index ? current : cell)));
    setCurrent((p) => (p === 'X' ? 'O' : 'X'));
  }

  function restart() {
    setBoard(Array(9).fill(null));
    setCurrent('X');
  }

  return (
    <div className={styles.container}>
      <p className={styles.status}>
        {winner ? `Winner: ${winner}` : isDraw ? 'Draw!' : `Turn: ${current}`}
      </p>
      <div className={styles.board}>
        {board.map((cell, i) => (
          <button
            key={i}
            className={`${styles.cell} ${cell ? styles[cell.toLowerCase()] : ''}`}
            onClick={() => handleClick(i)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button className={styles.restart} onClick={restart}>
        Restart
      </button>
    </div>
  );
}

export const TicTacToeChallenge = {
  id: 'tic-tac-toe',
  title: 'Tic Tac Toe',
  demo: <TicTacToe />,
  code: `type Player = 'X' | 'O'
type Cell = Player | null

const LINES = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6],          // diagonals
]

// "Outside: pure, testable, no closure."
function getWinner(board: Cell[]): Player | null {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player
    }
  }
  return null
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const [current, setCurrent] = useState<Player>('X')

  // "Derived on every render."
  const winner = getWinner(board)
  const isDraw = !winner && board.every(Boolean)

  function handleClick(index: number) {
    // "Guard: already filled, or game over."
    if (board[index] || winner) return

    // "Immutable update: map returns a new array."
    setBoard(prev => prev.map((cell, i) => i === index ? current : cell))
    setCurrent(p => p === 'X' ? 'O' : 'X')
  }

  function restart() {
    setBoard(Array(9).fill(null))
    setCurrent('X')
  }

  return (
    <div className={styles.container}>
      <p className={styles.status}>
        {winner ? \`Winner: \${winner}\` : isDraw ? 'Draw!' : \`Turn: \${current}\`}
      </p>
      <div className={styles.board}>
        {board.map((cell, i) => (
          <button
            key={i}
            className={\`\${styles.cell} \${cell ? styles[cell.toLowerCase()] : ''}\`}
            onClick={() => handleClick(i)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button className={styles.restart} onClick={restart}>Restart</button>
    </div>
  )
}`,
  coachView: (
    <>
      <SectionCard title="How to think about it">
        <ul>
          <li>"State model: <InlineCode>board: Cell[]</InlineCode> (1D array of size 9) and <InlineCode>currentPlayer: 'X' | 'O'</InlineCode>. The game winner is derived math — never stored as a state value."</li>
          <li>"We place <InlineCode>getWinner</InlineCode> outside the component context. It is a pure, testable utility function that accepts the board and returns a player marker or null."</li>
          <li>Using a flat 1D array instead of a 2D matrix simplifies lookup math (<InlineCode>row * 3 + col</InlineCode>) and reduces rendering code nested tags.</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li>Derives the game winner on every single render pass. "Never write winner flags into state. Storing derived state calculations is one of the most common junior patterns."</li>
          <li>Hoists the checker <InlineCode>getWinner()</InlineCode> outside the component scope to preserve function purity and ease of testing.</li>
          <li>Performs board updates immutably using <InlineCode>board.map()</InlineCode> or shallow clones.</li>
          <li>Proactively mentions extension ideas: "We could easily make the winning selector return the coordinate lines so we can highlight matching cells."</li>
        </ul>
      </SeniorSignal>
    </>
  ),
};
