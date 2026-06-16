import { useState } from 'react';
import styles from './Wordle.module.css';
import { SectionCard } from '../components/SectionCard';
import { SeniorSignal } from '../components/SeniorSignal';
import { Trap } from '../components/Trap';
import { InlineCode } from '../components/InlineCode';

const TARGET = 'REACT';
const MAX_GUESSES = 6;

type TileStatus = 'correct' | 'present' | 'absent';
interface TileData {
  letter: string;
  status: TileStatus;
}

function evaluateGuess(guess: string, target: string): TileData[] {
  const result: TileData[] = guess.split('').map((letter) => ({
    letter,
    status: 'absent' as TileStatus,
  }));
  const remaining = target.split('');

  // Pass 1: exact matches (green)
  guess.split('').forEach((char, i) => {
    if (char === remaining[i]) {
      result[i].status = 'correct';
      remaining[i] = '#'; // consume
    }
  });

  // Pass 2: present but wrong position (yellow)
  guess.split('').forEach((char, i) => {
    if (result[i].status === 'correct') return;
    const idx = remaining.indexOf(char);
    if (idx !== -1) {
      result[i].status = 'present';
      remaining[idx] = '#'; // consume to avoid double-counting
    }
  });

  return result;
}

export default function Wordle() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');

  const isWon = guesses.includes(TARGET);
  const isLost = !isWon && guesses.length >= MAX_GUESSES;
  const gameOver = isWon || isLost;

  function handleSubmit() {
    if (currentGuess.length !== 5 || gameOver) return;
    setGuesses((prev) => [...prev, currentGuess.toUpperCase()]);
    setCurrentGuess('');
  }

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {guesses.map((guess, gi) => (
          <div key={gi} className={styles.row}>
            {evaluateGuess(guess.toUpperCase(), TARGET).map(({ letter, status }, ti) => (
              <div key={ti} className={`${styles.tile} ${styles[status]}`}>
                {letter}
              </div>
            ))}
          </div>
        ))}
        {/* Fill remaining empty rows */}
        {Array.from({ length: Math.max(0, MAX_GUESSES - guesses.length) }).map((_, ri) => (
          <div key={ri} className={styles.row}>
            {Array.from({ length: 5 }).map((_, ti) => (
              <div key={ti} className={styles.tile}>
                {ri === 0 && !gameOver ? currentGuess[ti] || '' : ''}
              </div>
            ))}
          </div>
        ))}
      </div>

      {!gameOver && (
        <div className={styles.input}>
          <input
            value={currentGuess}
            maxLength={5}
            onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Type 5-letter word"
          />
          <button disabled={currentGuess.length !== 5} onClick={handleSubmit}>
            Guess
          </button>
        </div>
      )}

      {isWon && <p className={styles.win}>You got it in {guesses.length} guesses!</p>}
      {isLost && <p className={styles.loss}>Game over. The word was {TARGET}</p>}
    </div>
  );
}

export const WordleChallenge = {
  id: 'wordle',
  title: 'Wordle',
  demo: <Wordle />,
  code: `const TARGET = 'REACT'
const MAX_GUESSES = 6

type TileStatus = 'correct' | 'present' | 'absent'
interface TileData { letter: string; status: TileStatus }

// "Two-pass algorithm — outside the component.
//  Pass 1: mark greens, consume exact matches.
//  Pass 2: mark yellows from remaining supply."
function evaluateGuess(guess: string, target: string): TileData[] {
  const result: TileData[] = guess.split('').map(letter => ({ letter, status: 'absent' as TileStatus }))
  const remaining = target.split('')

  // Pass 1: exact matches (green)
  guess.split('').forEach((char, i) => {
    if (char === remaining[i]) {
      result[i].status = 'correct'
      remaining[i] = '#'  // consume
    }
  })

  // Pass 2: present but wrong position (yellow)
  guess.split('').forEach((char, i) => {
    if (result[i].status === 'correct') return
    const idx = remaining.indexOf(char)
    if (idx !== -1) {
      result[i].status = 'present'
      remaining[idx] = '#'  // consume to avoid double-counting
    }
  })

  return result
}

export default function Wordle() {
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState('')

  // "Everything derived."
  const isWon = guesses.includes(TARGET)
  const isLost = !isWon && guesses.length >= MAX_GUESSES
  const gameOver = isWon || isLost

  function handleSubmit() {
    if (currentGuess.length !== 5 || gameOver) return
    setGuesses(prev => [...prev, currentGuess.toUpperCase()])
    setCurrentGuess('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {guesses.map((guess, gi) => (
          <div key={gi} className={styles.row}>
            {evaluateGuess(guess.toUpperCase(), TARGET).map(({ letter, status }, ti) => (
              <div key={ti} className={\`\${styles.tile} \${styles[status]}\`}>{letter}</div>
            ))}
          </div>
        ))}
      </div>

      {!gameOver && (
        <div className={styles.input}>
          <input
            value={currentGuess}
            maxLength={5}
            onChange={e => setCurrentGuess(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="Type a 5-letter word"
          />
          <button disabled={currentGuess.length !== 5} onClick={handleSubmit}>
            Guess
          </button>
        </div>
      )}

      {isWon && <p className={styles.win}>You got it in {guesses.length}!</p>}
      {isLost && <p className={styles.loss}>The word was {TARGET}</p>}
    </div>
  )
}`,
  coachView: (
    <>
      <SectionCard title="How to think about it">
        <ul>
          <li>"State values are just: <InlineCode>guesses: string[]</InlineCode> and the input buffer <InlineCode>currentGuess: string</InlineCode>. Win/loss conditions, validated tiles — all derived."</li>
          <li>"The hard algorithmic part is the scoring check <InlineCode>evaluateGuess</InlineCode>. This is where candidates easily fail. Explain the two-pass algorithm before coding JSX."</li>
          <li>First pass checks greens (exact index matching) and marks characters as consumed. Second pass checks yellows (exist elsewhere in remaining supply).</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li>Details the two-pass validation logic clearly. "Duplicate letters are the trap. Single-pass evaluation gets edge cases wrong."</li>
          <li>Hoists the evaluator <InlineCode>evaluateGuess()</InlineCode> outside the component container.</li>
          <li>Derives win/loss flags (<InlineCode>isWon</InlineCode>, <InlineCode>isLost</InlineCode>) directly from the guesses array instead of synchronization state slots.</li>
          <li>Proactively outlines UI keyboard state overlays in a complete system implementation.</li>
        </ul>
      </SeniorSignal>

      <Trap>
        <ul>
          <li>Evaluating letter matches in a single pass, which reports duplicate letters incorrectly when only one exists in the target.</li>
        </ul>
      </Trap>
    </>
  ),
};
