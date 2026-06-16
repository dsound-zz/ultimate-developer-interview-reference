import React from 'react';
import styles from './WatchOut.module.css';

interface WatchOutProps {
  children: React.ReactNode;
}

export const WatchOut: React.FC<WatchOutProps> = ({ children }) => {
  return (
    <div className={styles.watchOut}>
      <span className={styles.label}>Watch Out</span>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
