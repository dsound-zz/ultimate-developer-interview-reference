import React from 'react';
import styles from './AppNav.module.css';

export type TabId =
  | 'frontend'
  | 'react-native'
  | 'coding-challenges'
  | 'code-challenges'
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
  { id: 'coding-challenges', label: 'React Challenges' },
  { id: 'code-challenges', label: 'Code Challenges' },
  { id: 'backend', label: 'Backend', isComingSoon: true },
  { id: 'system-design', label: 'System Design' },
  { id: 'behavioral', label: 'Behavioral' },
  { id: 'ai', label: 'AI & Agents' },
  { id: 'my-stories', label: 'My Stories', isComingSoon: true },
];

interface AppNavProps {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

export const AppNav: React.FC<AppNavProps> = ({ activeTab, onTabChange, theme, onThemeToggle }) => {
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
                  {tab.id === 'ai' && (
                    <span className={styles.pulseDot} />
                  )}
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
        <button
          onClick={onThemeToggle}
          className={styles.themeToggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.themeIcon}>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.themeIcon}>
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};
