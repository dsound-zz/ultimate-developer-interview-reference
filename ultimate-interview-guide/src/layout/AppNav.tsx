import React from 'react';
import styles from './AppNav.module.css';

export type TabId = 
  | 'frontend' 
  | 'react-native' 
  | 'coding-challenges' 
  | 'backend' 
  | 'system-design' 
  | 'behavioral' 
  | 'ai' 
  | 'my-stories';

interface TabItem {
  id: TabId;
  label: string;
  isComingSoon?: boolean;
}

const TABS: TabItem[] = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'react-native', label: 'React Native', isComingSoon: true },
  { id: 'coding-challenges', label: 'Coding Challenges' },
  { id: 'backend', label: 'Backend', isComingSoon: true },
  { id: 'system-design', label: 'System Design' },
  { id: 'behavioral', label: 'Behavioral', isComingSoon: true },
  { id: 'ai', label: 'AI', isComingSoon: true },
  { id: 'my-stories', label: 'My Stories', isComingSoon: true },
];

interface AppNavProps {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}

export const AppNav: React.FC<AppNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <span className={styles.logoHighlight}>ultimate</span>-interview-guide
        </div>
        <nav className={styles.tabsNav}>
          <div className={styles.tabsList}>
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`${styles.tabButton} ${isActive ? styles.activeTab : ''}`}
                >
                  {tab.label}
                  {tab.isComingSoon && (
                    <span className={styles.comingSoonBadge}>Soon</span>
                  )}
                  {isActive && (
                    <span className={styles.glowIndicator} />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};
