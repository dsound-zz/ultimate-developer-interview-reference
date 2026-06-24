import React, { useState } from 'react';
import styles from './CodeChallengesTab.module.css';
import { CodeBlock } from '../components/CodeBlock';
import { CODE_CHALLENGES, CATEGORIES } from './codeChallengeData';

type ViewMode = 'think' | 'solution';

export const CodeChallengesTab: React.FC = () => {
  const [activeId, setActiveId] = useState(CODE_CHALLENGES[0].id);
  const [viewMode, setViewMode] = useState<ViewMode>('think');

  const activeChallenge = CODE_CHALLENGES.find((c) => c.id === activeId) ?? CODE_CHALLENGES[0];
  const diffClass = activeChallenge.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard';

  const handleSelect = (id: string) => {
    setActiveId(id);
    setViewMode('think');
  };

  return (
    <div className={styles.tabLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebarWrapper}>
        <div className={styles.sidebar}>
          {CATEGORIES.map((cat) => {
            const catChallenges = CODE_CHALLENGES.filter((c) => c.category === cat.id);
            if (catChallenges.length === 0) return null;
            return (
              <React.Fragment key={cat.id}>
                <div className={styles.categoryHeader}>{cat.label}</div>
                {catChallenges.map((challenge) => (
                  <button
                    key={challenge.id}
                    onClick={() => handleSelect(challenge.id)}
                    className={`${styles.navItem} ${challenge.id === activeId ? styles.activeNav : ''}`}
                  >
                    {challenge.title}
                  </button>
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.contentArea}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>{activeChallenge.title}</h2>
            <div className={styles.badges}>
              <span className={`${styles.diffBadge} ${styles[diffClass]}`}>
                {activeChallenge.difficulty}
              </span>
              <span className={styles.patternBadge}>{activeChallenge.pattern}</span>
            </div>
          </div>

          <div className={styles.toggleContainer}>
            <button
              onClick={() => setViewMode('think')}
              className={`${styles.togglePill} ${viewMode === 'think' ? styles.activePill : ''}`}
            >
              Think
            </button>
            <button
              onClick={() => setViewMode('solution')}
              className={`${styles.togglePill} ${viewMode === 'solution' ? styles.activePill : ''}`}
            >
              Solution
            </button>
          </div>
        </div>

        <div className={styles.viewContent}>
          {viewMode === 'think' ? (
            <div className={styles.thinkGrid}>
              <div className={styles.thinkCard}>
                <h3 className={styles.cardTitle}>Problem</h3>
                <p className={styles.cardBody}>{activeChallenge.problem}</p>
              </div>

              <div className={styles.thinkCard}>
                <h3 className={styles.cardTitle}>Approach</h3>
                <ol className={styles.approachList}>
                  {activeChallenge.approach.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              {activeChallenge.example.trim() !== '' && (
                <div className={styles.thinkCard}>
                  <h3 className={styles.cardTitle}>Example</h3>
                  <CodeBlock code={activeChallenge.example} />
                </div>
              )}

              <div className={styles.thinkCard}>
                <h3 className={styles.cardTitle}>Common Traps</h3>
                <ul className={styles.trapList}>
                  {activeChallenge.traps.map((trap, i) => (
                    <li key={i}>{trap}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <CodeBlock code={activeChallenge.solution} />
          )}
        </div>
      </main>
    </div>
  );
};
