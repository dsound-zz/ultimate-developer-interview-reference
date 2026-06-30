import React from 'react';
import styles from './CompanyBadge.module.css';

export type CompanyId = 'tml' | 'rethink' | 'olivine' | 'avandar' | 'nec';

interface CompanyBadgeProps {
  company: CompanyId;
}

const COMPANY_LABELS: Record<CompanyId, string> = {
  tml: 'TML Information Services',
  rethink: 'RethinkFirst (Rethink Autism)',
  olivine: 'Olivine Inc',
  avandar: 'Avandar Labs',
  nec: 'NEC Labs',
};

export const CompanyBadge: React.FC<CompanyBadgeProps> = ({ company }) => {
  return (
    <span className={`${styles.badge} ${styles[company]}`}>
      {COMPANY_LABELS[company]}
    </span>
  );
};
