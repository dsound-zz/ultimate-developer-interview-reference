import React, { useEffect, useRef, useState } from 'react';
import styles from './SectionContainer.module.css';

interface SectionContainerProps {
  id: string;
  title: string;
  category: string;
  accentColor: string; // CSS variable like 'var(--accent)', 'var(--green)', etc.
  children: React.ReactNode;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  title,
  category,
  accentColor,
  children,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger the height animation when the section enters the viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        rootMargin: '0px 0px -20% 0px', // Trigger slightly before it hits the middle
        threshold: 0.1, // Trigger when 10% is visible
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`${styles.section} ${isVisible ? styles.visible : ''}`}
      style={{ '--bar-color': accentColor } as React.CSSProperties}
    >
      <div className={styles.accentBar} />
      <div className={styles.header}>
        <span className={`${styles.category} label-cap`}>{category}</span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.grid}>
        {children}
      </div>
    </section>
  );
};
