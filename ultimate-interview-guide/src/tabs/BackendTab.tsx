import React, { useState, useEffect } from 'react';
import styles from './BackendTab.module.css';
import { Sidebar } from '../layout/Sidebar';
import type { SidebarItem } from '../layout/Sidebar';

// Import all 14 backend sections
import { NetworkingFundamentals } from '../sections/backend/NetworkingFundamentals';
import { HttpRest } from '../sections/backend/HttpRest';
import { ApiDesign } from '../sections/backend/ApiDesign';
import { Auth } from '../sections/backend/Auth';
import { DatabasesTransactions } from '../sections/backend/DatabasesTransactions';
import { ConcurrencyRuntime } from '../sections/backend/ConcurrencyRuntime';
import { BackgroundJobs } from '../sections/backend/BackgroundJobs';
import { MicroservicesCommunication } from '../sections/backend/MicroservicesCommunication';
import { Security } from '../sections/backend/Security';
import { Testing } from '../sections/backend/Testing';
import { Observability } from '../sections/backend/Observability';
import { ArchitecturePatterns } from '../sections/backend/ArchitecturePatterns';
import { CiCdDeployment } from '../sections/backend/CiCdDeployment';
import { InterviewCodingPatterns } from '../sections/backend/InterviewCodingPatterns';

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'networking-fundamentals', label: 'Networking Fundamentals' },
  { id: 'http-rest', label: 'HTTP & REST' },
  { id: 'api-design', label: 'API Design Patterns' },
  { id: 'auth', label: 'Authentication & Authorization' },
  { id: 'databases-transactions', label: 'Databases & Transactions' },
  { id: 'concurrency-runtime', label: 'Concurrency & Runtime Models' },
  { id: 'background-jobs', label: 'Background Jobs & Queues' },
  { id: 'microservices-communication', label: 'Microservices Communication' },
  { id: 'security', label: 'Security Fundamentals' },
  { id: 'testing', label: 'Testing Strategies' },
  { id: 'observability', label: 'Observability & Monitoring' },
  { id: 'architecture-patterns', label: 'Architecture & Design Patterns' },
  { id: 'ci-cd-deployment', label: 'CI/CD & Deployment' },
  { id: 'interview-coding-patterns', label: 'Coding Patterns Reference' },
];

export const BackendTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState('networking-fundamentals');

  useEffect(() => {
    const sectionIds = SIDEBAR_ITEMS.map((item) => item.id);

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const intersectingMap = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersectingMap.set(entry.target.id, entry.isIntersecting);
        });

        const active = sectionIds.find((id) => intersectingMap.get(id));
        if (active) {
          setActiveSection(active);
        }
      },
      {
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const handleSidebarClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const isMobile = window.innerWidth <= 768;
      const offset = isMobile ? 120 : 80;

      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setActiveSection(id);
    }
  };

  return (
    <div className={styles.tabLayout}>
      <Sidebar
        items={SIDEBAR_ITEMS}
        activeSection={activeSection}
        onItemClick={handleSidebarClick}
      />
      <main className={styles.contentArea}>
        <NetworkingFundamentals />
        <HttpRest />
        <ApiDesign />
        <Auth />
        <DatabasesTransactions />
        <ConcurrencyRuntime />
        <BackgroundJobs />
        <MicroservicesCommunication />
        <Security />
        <Testing />
        <Observability />
        <ArchitecturePatterns />
        <CiCdDeployment />
        <InterviewCodingPatterns />
      </main>
    </div>
  );
};
