import React from 'react';
import styles from './CompanySpecific.module.css';

interface CompanySpecificProps {
  typeLabel: string;
  recommendedStory: string;
  framing: React.ReactNode;
  listeningFor: string;
}

export const CompanySpecific: React.FC<CompanySpecificProps> = ({
  typeLabel,
  recommendedStory,
  framing,
  listeningFor,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.typeLabel}>{typeLabel}</span>
        <span className={styles.templateBadge}>Company Fit Template</span>
      </div>
      <div className={styles.body}>
        <div className={styles.section}>
          <span className={styles.label}>Recommended Story</span>
          <div className={styles.storyName}>{recommendedStory}</div>
        </div>
        <div className={styles.section}>
          <span className={styles.label}>Tailored Context Framing</span>
          <div className={styles.framingText}>{framing}</div>
        </div>
        <div className={styles.section}>
          <span className={styles.label}>What they're really listening for</span>
          <p className={styles.listeningText}>{listeningFor}</p>
        </div>
      </div>
    </div>
  );
};
