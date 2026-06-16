import React, { useState, useEffect } from 'react';
import styles from './AIAgentsTab.module.css';
import { Sidebar } from '../layout/Sidebar';
import type { SidebarItem } from '../layout/Sidebar';

// Import all 11 AI & Agents sections
import { MentalModels } from '../sections/ai/MentalModels';
import { LlmFundamentals } from '../sections/ai/LlmFundamentals';
import { PromptEngineering } from '../sections/ai/PromptEngineering';
import { RagArchitecture } from '../sections/ai/RagArchitecture';
import { AgenticSystems } from '../sections/ai/AgenticSystems';
import { McpProtocol } from '../sections/ai/McpProtocol';
import { LangGraphOrchestration } from '../sections/ai/LangGraphOrchestration';
import { EvalsObservability } from '../sections/ai/EvalsObservability';
import { AiFrontend } from '../sections/ai/AiFrontend';
import { ProductionConcerns } from '../sections/ai/ProductionConcerns';
import { InterviewPlaybook } from '../sections/ai/InterviewPlaybook';

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'mental-models', label: 'Mental Models' },
  { id: 'llm-fundamentals', label: 'LLM Fundamentals' },
  { id: 'prompt-engineering', label: 'Prompt Engineering' },
  { id: 'rag-architecture', label: 'RAG Architecture' },
  { id: 'agentic-systems', label: 'Agentic Systems' },
  { id: 'mcp-protocol', label: 'MCP — Model Context Protocol' },
  { id: 'langgraph-orchestration', label: 'LangGraph & Orchestration' },
  { id: 'evals-observability', label: 'Evals & Observability' },
  { id: 'ai-frontend', label: 'AI in the Frontend' },
  { id: 'production-concerns', label: 'Production Concerns' },
  { id: 'interview-playbook', label: 'Interview Playbook' },
];

export const AIAgentsTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState('mental-models');

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
        <MentalModels />
        <LlmFundamentals />
        <PromptEngineering />
        <RagArchitecture />
        <AgenticSystems />
        <McpProtocol />
        <LangGraphOrchestration />
        <EvalsObservability />
        <AiFrontend />
        <ProductionConcerns />
        <InterviewPlaybook />
      </main>
    </div>
  );
};
