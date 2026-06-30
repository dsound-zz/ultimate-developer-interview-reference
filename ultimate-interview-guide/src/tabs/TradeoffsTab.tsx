import React, { useState } from 'react';
import styles from './TradeoffsTab.module.css';
import { SectionCard } from '../components/SectionCard';
import { TradeoffCard } from '../components/TradeoffCard';
import { Callout } from '../components/Callout';
import { TRADEOFFS } from '../data/tradeoffData';
import type { TradeoffEntry } from '../data/tradeoffData';

type DomainFilter = 'all' | TradeoffEntry['domain'];

interface FilterPill {
  id: DomainFilter;
  label: string;
}

const FILTERS: FilterPill[] = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'infra', label: 'Infra' },
  { id: 'system-design', label: 'System Design' },
  { id: 'ai', label: 'AI' },
];

const DOMAIN_LABELS: Record<TradeoffEntry['domain'], string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  infra: 'Infra',
  'system-design': 'System Design',
  ai: 'AI',
};

export const TradeoffsTab: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<DomainFilter>('all');

  const visible =
    activeFilter === 'all'
      ? TRADEOFFS
      : TRADEOFFS.filter((entry) => entry.domain === activeFilter);

  return (
    <>
      {/* Sticky filter bar */}
      <div className={styles.filterBar}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`${styles.pill} ${activeFilter === f.id ? styles.pillActive : ''}`}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className={styles.container}>
        {visible.length === 0 && (
          <p className={styles.emptyState}>No entries for this domain yet.</p>
        )}

        <div className={styles.entryList}>
          {visible.map((entry) => (
            <SectionCard key={entry.id}>
              {/* Header: pair title + domain badge */}
              <div className={styles.entryHeader}>
                <h3 className={styles.pairTitle}>{entry.pair}</h3>
                <span className={styles.domainBadge}>
                  {DOMAIN_LABELS[entry.domain]}
                </span>
              </div>

              {/* Axis — the underlying tension */}
              <div className={styles.axisBlock}>{entry.axis}</div>

              {/* Gains / Costs */}
              <TradeoffCard gains={entry.gains} costs={entry.costs} />

              {/* When to choose A / B */}
              <div className={styles.whenGrid}>
                <div className={styles.whenCell}>
                  <span className={`${styles.whenLabel} ${styles.whenLabelA}`}>
                    Choose A when
                  </span>
                  <p className={styles.whenText}>{entry.chooseAWhen}</p>
                </div>
                <div className={styles.whenCell}>
                  <span className={`${styles.whenLabel} ${styles.whenLabelB}`}>
                    Choose B when
                  </span>
                  <p className={styles.whenText}>{entry.chooseBWhen}</p>
                </div>
              </div>

              {/* Pick if asked */}
              <Callout type="key-insight">{entry.pickIfAsked}</Callout>

              {/* Trap */}
              <Callout type="trap">{entry.trap}</Callout>

              {/* Analogy (optional) */}
              {entry.analogy && (
                <Callout type="analogy">{entry.analogy}</Callout>
              )}

              {/* Cross-reference (optional) */}
              {entry.crossReference && (
                <p className={styles.crossRef}>
                  Deep dive:{' '}
                  <span>
                    {entry.crossReference.tab} → {entry.crossReference.section}
                  </span>
                </p>
              )}
            </SectionCard>
          ))}
        </div>
      </div>
    </>
  );
};
