import React, { useState } from 'react';
import styles from './ChallengesTab.module.css';
import { CodeBlock } from '../components/CodeBlock';

// Import all challenge configurations
import { AccordionChallenge } from '../challenges/Accordion';
import { TabsChallenge } from '../challenges/Tabs';
import { ModalChallenge } from '../challenges/Modal';
import { AutocompleteLocalChallenge } from '../challenges/AutocompleteLocal';
import { AutocompleteAPIChallenge } from '../challenges/AutocompleteAPI';
import { FetchDemoChallenge } from '../challenges/FetchDemo';
import { PaginationChallenge } from '../challenges/Pagination';
import { SortableTableChallenge } from '../challenges/SortableTable';
import { TimerChallenge } from '../challenges/Timer';
import { GridToggleChallenge } from '../challenges/GridToggle';
import { TicTacToeChallenge } from '../challenges/TicTacToe';
import { WordleChallenge } from '../challenges/Wordle';
import { RegistrationFormChallenge } from '../challenges/RegistrationForm';

const CHALLENGES = [
  AccordionChallenge,
  TabsChallenge,
  ModalChallenge,
  AutocompleteLocalChallenge,
  AutocompleteAPIChallenge,
  FetchDemoChallenge,
  PaginationChallenge,
  SortableTableChallenge,
  TimerChallenge,
  GridToggleChallenge,
  TicTacToeChallenge,
  WordleChallenge,
  RegistrationFormChallenge,
];

type ViewMode = 'coach' | 'code';

export const ChallengesTab: React.FC = () => {
  const [activeId, setActiveId] = useState(CHALLENGES[0].id);
  const [viewMode, setViewMode] = useState<ViewMode>('coach');

  const activeChallenge = CHALLENGES.find((c) => c.id === activeId) || CHALLENGES[0];

  return (
    <div className={styles.tabLayout}>
      {/* Sidebar navigation */}
      <aside className={styles.sidebarWrapper}>
        <div className={styles.sidebar}>
          {CHALLENGES.map((challenge) => {
            const isActive = challenge.id === activeId;
            return (
              <button
                key={challenge.id}
                onClick={() => setActiveId(challenge.id)}
                className={`${styles.navItem} ${isActive ? styles.activeNav : ''}`}
              >
                {challenge.title}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.contentArea}>
        <div className={styles.header}>
          <h2 className={styles.title}>{activeChallenge.title}</h2>
          
          {/* Coach / Code Pill Switcher */}
          <div className={styles.toggleContainer}>
            <button
              onClick={() => setViewMode('coach')}
              className={`${styles.togglePill} ${viewMode === 'coach' ? styles.activePill : ''}`}
            >
              Coach
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`${styles.togglePill} ${viewMode === 'code' ? styles.activePill : ''}`}
            >
              Code
            </button>
          </div>
        </div>

        {/* Live Interactive Demo Box */}
        <div className={styles.demoCard}>
          <span className={`${styles.demoLabel} label-cap`}>Interactive Demo</span>
          <div className={styles.demoContent}>
            {activeChallenge.demo}
          </div>
        </div>

        {/* Content Views */}
        <div className={styles.viewContent}>
          {viewMode === 'coach' ? (
            <div className={styles.coachGrid}>
              {activeChallenge.coachView}
            </div>
          ) : (
            <CodeBlock code={activeChallenge.code} />
          )}
        </div>
      </main>
    </div>
  );
};
