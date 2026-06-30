import React, { useState, useEffect } from 'react';
import styles from './BehavioralTab.module.css';
import { Sidebar } from '../layout/Sidebar';
import type { SidebarItem } from '../layout/Sidebar';
import { CompanyPanel } from '../behavioral/CompanyPanel';

// Import all sections
import { ConflictDisagreement } from '../sections/ConflictDisagreement';
import { OwnershipFailure } from '../sections/OwnershipFailure';
import { InitiativeImpact } from '../sections/InitiativeImpact';
import { CollaborationCulture } from '../sections/CollaborationCulture';
import { TechnicalJudgment } from '../sections/TechnicalJudgment';
import { GrowthLearning } from '../sections/GrowthLearning';
import { LeadershipMentorship } from '../sections/LeadershipMentorship';
import { AmbiguityPressure } from '../sections/AmbiguityPressure';
import { CompanySpecificQuestions } from '../sections/CompanySpecificQuestions';

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'company-reference', label: 'Company Reference' },
  { id: 'conflict-disagreement', label: 'Conflict & Disagreement' },
  { id: 'ownership-failure', label: 'Ownership & Failure' },
  { id: 'initiative-impact', label: 'Initiative & Impact' },
  { id: 'collaboration-culture', label: 'Collaboration & Culture' },
  { id: 'technical-judgment', label: 'Technical Judgment' },
  { id: 'growth-learning', label: 'Growth & Learning' },
  { id: 'leadership-mentorship', label: 'Leadership & Mentorship' },
  { id: 'ambiguity-pressure', label: 'Ambiguity & Pressure' },
  { id: 'company-specific', label: 'Company-Specific Questions' },
];

export const BehavioralTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState('company-reference');

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
        <CompanyPanel />
        <ConflictDisagreement />
        <OwnershipFailure />
        <InitiativeImpact />
        <CollaborationCulture />
        <TechnicalJudgment />
        <GrowthLearning />
        <LeadershipMentorship />
        <AmbiguityPressure />
        <CompanySpecificQuestions />
      </main>
    </div>
  );
};
