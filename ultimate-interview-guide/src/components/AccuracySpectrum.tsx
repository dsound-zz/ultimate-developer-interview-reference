import React from 'react';
import styles from './AccuracySpectrum.module.css';

interface AccuracySpectrumProps {
  value: number; // 0 to 100
  markerLabel?: string;
}

export const AccuracySpectrum: React.FC<AccuracySpectrumProps> = ({
  value,
  markerLabel,
}) => {
  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={styles.container}>
      <div className={styles.labels}>
        <div className={styles.endpoint}>
          <span className={styles.endpointTitle}>Deterministic</span>
          <span className={styles.endpointSubtitle}>Databases, APIs, Compilers</span>
        </div>
        <div className={styles.endpoint} style={{ alignItems: 'flex-end', textAlign: 'right' }}>
          <span className={styles.endpointTitle}>Probabilistic</span>
          <span className={styles.endpointSubtitle}>Agents, LLM Chats, Reasoning</span>
        </div>
      </div>
      
      <div className={styles.track}>
        <div className={styles.gradientBar} />
        <div 
          className={styles.marker} 
          style={{ left: `${clampedValue}%` }}
        >
          <div className={styles.markerPulse} />
          {markerLabel && (
            <div className={styles.markerTooltip}>
              <span className={styles.tooltipText}>{markerLabel}</span>
              <span className={styles.tooltipValue}>{clampedValue}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
