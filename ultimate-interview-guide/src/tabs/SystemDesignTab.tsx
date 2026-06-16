import React, { useState, useEffect } from 'react';
import styles from './SystemDesignTab.module.css';
import { Sidebar } from '../layout/Sidebar';
import type { SidebarItem } from '../layout/Sidebar';

// Import all 15 system design sections
import { InterviewFramework } from '../sections/system-design/InterviewFramework';
import { CapTheorem } from '../sections/system-design/CapTheorem';
import { ConsistencyModels } from '../sections/system-design/ConsistencyModels';
import { SlaSloSli } from '../sections/system-design/SlaSloSli';
import { Caching } from '../sections/system-design/Caching';
import { LoadBalancing } from '../sections/system-design/LoadBalancing';
import { DatabaseSelection } from '../sections/system-design/DatabaseSelection';
import { ApiGateway } from '../sections/system-design/ApiGateway';
import { MessageQueues } from '../sections/system-design/MessageQueues';
import { CdnEdge } from '../sections/system-design/CdnEdge';
import { AvailabilityPatterns } from '../sections/system-design/AvailabilityPatterns';
import { HandlingSlowdowns } from '../sections/system-design/HandlingSlowdowns';
import { ScalingPatterns } from '../sections/system-design/ScalingPatterns';
import { LlmAgenticSystems } from '../sections/system-design/LlmAgenticSystems';
import { SystemTypeReference } from '../sections/system-design/SystemTypeReference';

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'interview-framework', label: 'The Interview Framework' },
  { id: 'cap-theorem', label: 'CAP Theorem' },
  { id: 'consistency-models', label: 'Consistency Models' },
  { id: 'sla-slo-sli', label: 'SLA, SLO, SLI' },
  { id: 'caching', label: 'Caching' },
  { id: 'load-balancing', label: 'Load Balancing' },
  { id: 'database-selection', label: 'Database Selection' },
  { id: 'api-gateway', label: 'API Design & Gateway' },
  { id: 'message-queues', label: 'Message Queues' },
  { id: 'cdn-edge', label: 'CDN & Edge' },
  { id: 'availability-patterns', label: 'Availability Patterns' },
  { id: 'sys-handling-slowdowns', label: 'Handling Slowdowns' },
  { id: 'scaling-patterns', label: 'Scaling Patterns' },
  { id: 'llm-agentic-systems', label: 'LLM & Agentic Systems' },
  { id: 'system-type-reference', label: 'Real-World System Reference' },
];

export const SystemDesignTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState('interview-framework');

  useEffect(() => {
    const sectionIds = SIDEBAR_ITEMS.map((item) => item.id);
    
    // Find all section elements
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const intersectingMap = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersectingMap.set(entry.target.id, entry.isIntersecting);
        });

        // Find the first intersecting section on the page
        const active = sectionIds.find((id) => intersectingMap.get(id));
        if (active) {
          setActiveSection(active);
        }
      },
      {
        // Adjust margins to focus on the top-middle third of the viewport
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
      // Calculate offset for sticky top navbar (60px) + mobile tab bar if present
      const isMobile = window.innerWidth <= 768;
      const offset = isMobile ? 120 : 80;
      
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      
      // Manually set active section immediately for snappier feedback
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
        <InterviewFramework />
        <CapTheorem />
        <ConsistencyModels />
        <SlaSloSli />
        <Caching />
        <LoadBalancing />
        <DatabaseSelection />
        <ApiGateway />
        <MessageQueues />
        <CdnEdge />
        <AvailabilityPatterns />
        <HandlingSlowdowns />
        <ScalingPatterns />
        <LlmAgenticSystems />
        <SystemTypeReference />
      </main>
    </div>
  );
};
