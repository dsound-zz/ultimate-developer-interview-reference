import React from 'react';
import styles from './StepList.module.css';

interface StepListProps {
  steps: React.ReactNode[];
}

export const StepList: React.FC<StepListProps> = ({ steps }) => {
  return (
    <div className={styles.stepList}>
      {steps.map((step, index) => (
        <div key={index} className={styles.stepItem}>
          <div className={styles.stepNumber}>
            {index + 1}
          </div>
          <div className={styles.stepContent}>
            {step}
          </div>
        </div>
      ))}
    </div>
  );
};
