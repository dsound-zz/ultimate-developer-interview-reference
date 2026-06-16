import React from 'react';
import styles from './SignalTag.module.css';

interface SignalTagProps {
  children: React.ReactNode;
}

export const SignalTag: React.FC<SignalTagProps> = ({ children }) => {
  return (
    <span className={styles.tag}>
      {children}
    </span>
  );
};
