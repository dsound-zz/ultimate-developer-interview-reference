import React, { useState } from 'react';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const lines = code.trim().split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const renderLineContent = (line: string) => {
    // Look for comments (e.g. // ...)
    const commentIndex = line.indexOf('//');
    if (commentIndex !== -1) {
      const codePart = line.substring(0, commentIndex);
      const commentPart = line.substring(commentIndex);
      return (
        <>
          <span>{codePart}</span>
          <span className={styles.comment}>{commentPart}</span>
        </>
      );
    }
    return <span>{line}</span>;
  };

  return (
    <div className={styles.codeContainer}>
      <button className={styles.copyButton} onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <div className={styles.codeWrapper}>
        <div className={styles.lineNumbers}>
          {lines.map((_, i) => (
            <div key={i} className={styles.lineNumber}>
              {i + 1}
            </div>
          ))}
        </div>
        <pre className={styles.pre}>
          {lines.map((line, i) => (
            <div key={i} className={styles.codeLine}>
              {renderLineContent(line)}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};
