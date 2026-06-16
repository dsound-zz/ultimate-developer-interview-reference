import React from 'react';
import styles from './QuoteBlock.module.css';

interface QuoteBlockProps {
  children: React.ReactNode;
}

export const QuoteBlock: React.FC<QuoteBlockProps> = ({ children }) => {
  return (
    <blockquote className={styles.quoteBlock}>
      {children}
    </blockquote>
  );
};
