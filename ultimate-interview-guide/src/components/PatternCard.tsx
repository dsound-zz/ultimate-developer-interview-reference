import React from 'react';
import styles from './PatternCard.module.css';
import { CodeBlock } from './CodeBlock';

interface PatternCardProps {
  patternName: string;
  code: string;
  description?: React.ReactNode;
}

export const PatternCard: React.FC<PatternCardProps> = ({
  patternName,
  code,
  description,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.label}>{patternName}</span>
      </div>
      {description && <div className={styles.description}>{description}</div>}
      <div className={styles.codeSection}>
        <CodeBlock code={code} />
      </div>
    </div>
  );
};
