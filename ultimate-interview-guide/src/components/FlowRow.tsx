import React from 'react';
import styles from './FlowRow.module.css';

interface FlowRowProps {
  steps: string[];
}

export const FlowRow: React.FC<FlowRowProps> = ({ steps }) => {
  return (
    <div className={styles.flowRowContainer}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className={styles.stepPill}>
            {step}
          </div>
          {index < steps.length - 1 && (
            <div className={styles.arrow}>→</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
