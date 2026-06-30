import React from 'react';
import styles from './CompanyPanel.module.css';
import type { CompanyId } from '../components/CompanyBadge';

interface CompanyInfo {
  id: CompanyId;
  name: string;
  tenure: string;
  role: string;
  currency: string;
}

const COMPANIES: CompanyInfo[] = [
  {
    id: 'tml',
    name: 'TML Information Services',
    tenure: 'Sep 2019 – May 2020',
    role: 'Frontend Developer',
    currency: 'My first production experience. MVR dashboard. Real data, real users, real constraints. Entry-level but serious work.',
  },
  {
    id: 'rethink',
    name: 'RethinkFirst (Rethink Autism)',
    tenure: 'Aug 2021 – Oct 2022',
    role: 'Frontend Engineer',
    currency: 'Healthcare-adjacent product. Storybook, Kubernetes exposure, working on software used by therapists and families. The stakes of correctness mattered here.',
  },
  {
    id: 'olivine',
    name: 'Olivine Inc',
    tenure: 'Nov 2022 – Mar 2024',
    role: 'Frontend Engineer',
    currency: 'Longest tenure. Portfolio restructuring, onboarding documentation, commercial expansion. Where I grew the most as a collaborator and systems thinker.',
  },
  {
    id: 'avandar',
    name: 'Avandar Labs',
    tenure: 'Jul – Oct 2025',
    role: 'Frontend/Fullstack Engineer',
    currency: 'DuckDB-WASM, LLM pipeline, production AI. The most technically distinctive work. Short contract but high signal.',
  },
];

export const CompanyPanel: React.FC = () => {
  return (
    <div id="company-reference" className={styles.panel}>
      <div className={styles.header}>
        <span className="label-cap">Company Reference & Story Currency</span>
      </div>
      <div className={styles.grid}>
        {COMPANIES.map((company) => (
          <div key={company.id} className={`${styles.card} ${styles[company.id]}`}>
            <div className={styles.cardHeader}>
              <h4 className={styles.companyName}>{company.name}</h4>
              <span className={styles.tenure}>{company.tenure}</span>
            </div>
            <div className={styles.role}>{company.role}</div>
            <p className={styles.currency}>
              <span className={styles.currencyLabel}>Story Currency: </span>
              "{company.currency}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
