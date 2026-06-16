import React, { useState, useEffect } from 'react';
import styles from './FrontendTab.module.css';
import { Sidebar } from '../layout/Sidebar';
import type { SidebarItem } from '../layout/Sidebar';

// Import all 14 sections
import { HowReactWorks } from '../sections/HowReactWorks';
import { ReactHooks } from '../sections/ReactHooks';
import { Optimization } from '../sections/Optimization';
import { RenderingStrategies } from '../sections/RenderingStrategies';
import { NextJS } from '../sections/NextJS';
import { CoreWebVitals } from '../sections/CoreWebVitals';
import { HandlingSlowdowns } from '../sections/HandlingSlowdowns';
import { CachingStrategies } from '../sections/CachingStrategies';
import { StateManagement } from '../sections/StateManagement';
import { CSSBestPractices } from '../sections/CSSBestPractices';
import { FESystemDesign } from '../sections/FESystemDesign';
import { Testing } from '../sections/Testing';
import { Storybook } from '../sections/Storybook';
import { AIInFEDev } from '../sections/AIInFEDev';

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'how-react-works', label: 'How React Works' },
  { id: 'react-hooks', label: 'React Hooks' },
  { id: 'optimization', label: 'Optimization' },
  { id: 'rendering-strategies', label: 'Rendering Strategies' },
  { id: 'next-js', label: 'Next.js' },
  { id: 'core-web-vitals', label: 'Core Web Vitals' },
  { id: 'handling-slowdowns', label: 'Handling Slowdowns' },
  { id: 'caching-strategies', label: 'Caching Strategies' },
  { id: 'state-management', label: 'State Management' },
  { id: 'css-best-practices', label: 'CSS Best Practices' },
  { id: 'fe-system-design', label: 'FE System Design' },
  { id: 'testing', label: 'Testing' },
  { id: 'storybook', label: 'Storybook' },
  { id: 'ai-in-fe-dev', label: 'AI in FE Dev' },
];

export const FrontendTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState('how-react-works');

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
        <HowReactWorks />
        <ReactHooks />
        <Optimization />
        <RenderingStrategies />
        <NextJS />
        <CoreWebVitals />
        <HandlingSlowdowns />
        <CachingStrategies />
        <StateManagement />
        <CSSBestPractices />
        <FESystemDesign />
        <Testing />
        <Storybook />
        <AIInFEDev />
      </main>
    </div>
  );
};
