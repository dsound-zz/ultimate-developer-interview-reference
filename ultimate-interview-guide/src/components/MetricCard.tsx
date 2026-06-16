import React from 'react';
import styles from './MetricCard.module.css';

interface MetricCardProps {
  label: string;
  value: string;
  sub: string;
  status: 'good' | 'warn' | 'info';
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, sub, status }) => {
  return (
    <div className={`${styles.card} ${styles[status]}`}>
      <span className={`${styles.label} label-cap`}>{label}</span>
      <span className={styles.value}>{value}</span>
      <span className={styles.sub}>{sub}</span>
    </div>
  );
};
