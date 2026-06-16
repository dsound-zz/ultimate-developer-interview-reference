import React from 'react';
import styles from './Callout.module.css';

export type CalloutType = 'senior-signal' | 'trap' | 'key-insight' | 'analogy';

interface CalloutProps {
  type: CalloutType;
  children: React.ReactNode;
}

const TYPE_LABELS: Record<CalloutType, string> = {
  'senior-signal': 'Senior Signal',
  'trap': 'Trap',
  'key-insight': 'Key Insight',
  'analogy': 'Analogy',
};

export const Callout: React.FC<CalloutProps> = ({ type, children }) => {
  return (
    <div className={`${styles.callout} ${styles[type]}`}>
      <span className={styles.label}>{TYPE_LABELS[type]}</span>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
