import React, { useState, useEffect } from 'react';
import styles from './InfraTab.module.css';
import { Sidebar } from '../layout/Sidebar';
import type { SidebarItem } from '../layout/Sidebar';

// Import all 13 infra sections
import { Deployment } from '../sections/infra/Deployment';
import { Containers } from '../sections/infra/Containers';
import { ServerlessCompute } from '../sections/infra/ServerlessCompute';
import { Databases } from '../sections/infra/Databases';
import { IdentitySecrets } from '../sections/infra/IdentitySecrets';
import { Auth } from '../sections/infra/Auth';
import { CiCd } from '../sections/infra/CiCd';
import { DataEngineering } from '../sections/infra/DataEngineering';
import { Storage } from '../sections/infra/Storage';
import { Logging } from '../sections/infra/Logging';
import { Observability } from '../sections/infra/Observability';
import { Caching } from '../sections/infra/Caching';
import { CdnEdge } from '../sections/infra/CdnEdge';
import { Messaging } from '../sections/infra/Messaging';

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'deployment', label: 'Deployment Targets' },
  { id: 'containers', label: 'Containers & Orchestration' },
  { id: 'serverless-compute', label: 'Serverless Compute' },
  { id: 'databases', label: 'Managed Databases' },
  { id: 'identity-secrets', label: 'Identity, Access & Secrets' },
  { id: 'auth', label: 'Auth' },
  { id: 'ci-cd', label: 'CI/CD & Release Automation' },
  { id: 'data-engineering', label: 'Data Engineering & ETL' },
  { id: 'storage', label: 'Object Storage' },
  { id: 'logging', label: 'Logging' },
  { id: 'observability', label: 'Observability & Monitoring' },
  { id: 'caching', label: 'Caching' },
  { id: 'cdn-edge', label: 'CDN & Edge' },
  { id: 'messaging', label: 'Messaging & Event Streaming' },
];

export const InfraTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState('deployment');

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
        <Deployment />
        <Containers />
        <ServerlessCompute />
        <Databases />
        <IdentitySecrets />
        <Auth />
        <CiCd />
        <DataEngineering />
        <Storage />
        <Logging />
        <Observability />
        <Caching />
        <CdnEdge />
        <Messaging />
      </main>
    </div>
  );
};
