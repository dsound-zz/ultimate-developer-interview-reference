import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  variant: 'good' | 'warn' | 'trap' | 'info' | 'tip';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant, children }) => {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {children}
    </span>
  );
};
