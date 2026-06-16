import React from 'react';
import styles from './TwoCol.module.css';

interface TwoColColumn {
  label: string;
  items: React.ReactNode[];
}

interface TwoColProps {
  left: TwoColColumn;
  right: TwoColColumn;
}

export const TwoCol: React.FC<TwoColProps> = ({ left, right }) => {
  return (
    <div className={styles.twoColContainer}>
      <div className={styles.column}>
        <div className={`${styles.columnHeader} label-cap`}>{left.label}</div>
        <ul className={styles.itemsList}>
          {left.items.map((item, index) => (
            <li key={index} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.divider} />
      <div className={styles.column}>
        <div className={`${styles.columnHeader} label-cap`}>{right.label}</div>
        <ul className={styles.itemsList}>
          {right.items.map((item, index) => (
            <li key={index} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
