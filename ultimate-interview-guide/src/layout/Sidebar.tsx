import React, { useEffect, useRef } from 'react';
import styles from './Sidebar.module.css';

export interface SidebarItem {
  id: string;
  label: string;
}

interface SidebarProps {
  items: SidebarItem[];
  activeSection: string;
  onItemClick: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ items, activeSection, onItemClick }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll the active nav item into view when in horizontal scroller mode (mobile)
  useEffect(() => {
    if (activeItemRef.current && sidebarRef.current) {
      const container = sidebarRef.current;
      const element = activeItemRef.current;
      
      // Only scroll horizontally if container is overflowed
      if (container.scrollWidth > container.clientWidth) {
        const elementLeft = element.offsetLeft;
        const elementWidth = element.clientWidth;
        const containerWidth = container.clientWidth;
        const scrollPosition = elementLeft - (containerWidth / 2) + (elementWidth / 2);
        
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [activeSection]);

  return (
    <aside className={styles.sidebarWrapper}>
      <div ref={sidebarRef} className={styles.sidebar}>
        {items.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              ref={isActive ? activeItemRef : null}
              onClick={() => onItemClick(item.id)}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.indicator} />
              <span className={styles.label}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
