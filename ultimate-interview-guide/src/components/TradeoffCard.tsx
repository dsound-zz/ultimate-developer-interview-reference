import React from 'react';
import styles from './TradeoffCard.module.css';

interface TradeoffCardProps {
  title?: string;
  gains: string[];
  costs: string[];
}

export const TradeoffCard: React.FC<TradeoffCardProps> = ({ title, gains, costs }) => {
  return (
    <div className={styles.card}>
      {title && <h4 className={styles.title}>{title}</h4>}
      <div className={styles.columns}>
        {/* Gains Column */}
        <div className={`${styles.column} ${styles.gainsColumn}`}>
          <div className={`${styles.columnHeader} label-cap`}>Gains</div>
          <ul className={styles.list}>
            {gains.map((gain, i) => (
              <li key={i} className={styles.item}>
                {gain}
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.divider} />
        
        {/* Costs Column */}
        <div className={`${styles.column} ${styles.costsColumn}`}>
          <div className={`${styles.columnHeader} label-cap`}>Costs</div>
          <ul className={styles.list}>
            {costs.map((cost, i) => (
              <li key={i} className={styles.item}>
                {cost}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
