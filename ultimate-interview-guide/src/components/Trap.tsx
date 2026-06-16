import React from 'react';
import styles from './Trap.module.css';

interface TrapProps {
  children: React.ReactNode;
}

export const Trap: React.FC<TrapProps> = ({ children }) => {
  return (
    <div className={styles.callout}>
      <span className={styles.label}>Trap</span>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
