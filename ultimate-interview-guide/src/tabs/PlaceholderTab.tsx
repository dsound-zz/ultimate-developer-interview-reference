import React from 'react';
import styles from './PlaceholderTab.module.css';

interface PlaceholderTabProps {
  title: string;
}

export const PlaceholderTab: React.FC<PlaceholderTabProps> = ({ title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.glow} />
        <span className="label-cap">{title} Module</span>
        <h2 className={styles.comingSoon}>Coming Soon</h2>
        <p className={styles.description}>
          This module is currently being compiled. Deep-dive senior interview preparation guides, code challenges, and architecture sheets are incoming.
        </p>
      </div>
    </div>
  );
};
