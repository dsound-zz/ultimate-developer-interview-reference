import React from 'react';
import styles from './KeyInsight.module.css';

interface KeyInsightProps {
  children: React.ReactNode;
}

export const KeyInsight: React.FC<KeyInsightProps> = ({ children }) => {
  return (
    <div className={styles.callout}>
      <span className={styles.label}>Key Insight</span>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
