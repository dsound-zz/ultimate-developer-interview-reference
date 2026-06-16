import React from 'react';
import styles from './SeniorSignal.module.css';

interface SeniorSignalProps {
  children: React.ReactNode;
}

export const SeniorSignal: React.FC<SeniorSignalProps> = ({ children }) => {
  return (
    <div className={styles.callout}>
      <span className={styles.label}>Senior Signal</span>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
