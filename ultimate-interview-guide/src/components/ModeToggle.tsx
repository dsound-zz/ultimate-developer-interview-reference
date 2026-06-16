import React from 'react';
import styles from './ModeToggle.module.css';

export type InterviewMode = 'interview' | 'honest';

interface ModeToggleProps {
  mode: InterviewMode;
  onChange: (mode: InterviewMode) => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onChange }) => {
  return (
    <div className={styles.toggleContainer}>
      <button
        onClick={() => onChange('interview')}
        className={`${styles.togglePill} ${mode === 'interview' ? styles.activePill : ''}`}
      >
        Interview
      </button>
      <button
        onClick={() => onChange('honest')}
        className={`${styles.togglePill} ${mode === 'honest' ? styles.activePill : ''}`}
      >
        Honest
      </button>
    </div>
  );
};
