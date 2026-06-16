import React from 'react';
import styles from './MetricPill.module.css';

interface MetricPillProps {
  value: string;
  status: 'good' | 'warn' | 'bad';
}

export const MetricPill: React.FC<MetricPillProps> = ({ value, status }) => {
  return (
    <span className={`${styles.pill} ${styles[status]}`}>
      {value}
    </span>
  );
};
