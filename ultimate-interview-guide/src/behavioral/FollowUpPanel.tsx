import React, { useState } from 'react';
import styles from './FollowUpPanel.module.css';

export interface FollowUpItem {
  question: string;
  note: string;
}

interface FollowUpPanelProps {
  items: FollowUpItem[];
}

export const FollowUpPanel: React.FC<FollowUpPanelProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.trigger}
        aria-expanded={isOpen}
      >
        <span className={styles.triggerText}>
          {isOpen ? 'Hide' : 'Show'} Likely Follow-ups ({items.length})
        </span>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div className={`${styles.contentWrapper} ${isOpen ? styles.isOpen : ''}`}>
        <div className={styles.content}>
          <ul className={styles.list}>
            {items.map((item, index) => (
              <li key={index} className={styles.listItem}>
                <span className={styles.bullet}>→</span>
                <div className={styles.body}>
                  <strong className={styles.question}>{item.question}</strong>
                  <p className={styles.note}>
                    <span className={styles.coachingLabel}>Coach:</span> {item.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
