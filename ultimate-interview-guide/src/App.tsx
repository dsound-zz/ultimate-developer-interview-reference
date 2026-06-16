import { useState, useEffect } from 'react';
import { AppNav } from './layout/AppNav';
import type { TabId } from './layout/AppNav';
import { FrontendTab } from './tabs/FrontendTab';
import { ChallengesTab } from './tabs/ChallengesTab';
import { SystemDesignTab } from './tabs/SystemDesignTab';
import { PlaceholderTab } from './tabs/PlaceholderTab';
import { BehavioralTab } from './tabs/BehavioralTab';
import { AIAgentsTab } from './tabs/AIAgentsTab';

const TAB_LABELS: Record<TabId, string> = {
  'frontend': 'Frontend',
  'react-native': 'React Native',
  'coding-challenges': 'Coding Challenges',
  'backend': 'Backend',
  'system-design': 'System Design',
  'behavioral': 'Behavioral',
  'ai': 'AI & Agents',
  'my-stories': 'My Stories',
};

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('frontend');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const renderActiveContent = () => {
    if (activeTab === 'frontend') {
      return <FrontendTab />;
    }
    if (activeTab === 'coding-challenges') {
      return <ChallengesTab />;
    }
    if (activeTab === 'system-design') {
      return <SystemDesignTab />;
    }
    if (activeTab === 'behavioral') {
      return <BehavioralTab />;
    }
    if (activeTab === 'ai') {
      return <AIAgentsTab />;
    }
    return <PlaceholderTab title={TAB_LABELS[activeTab]} />;
  };

  return (
    <>
      <AppNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        theme={theme}
        onThemeToggle={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
      />
      {renderActiveContent()}
    </>
  );
}

export default App;
