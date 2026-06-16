import React from 'react';
import styles from './CompareTable.module.css';

export interface CompareCell {
  text: string;
  status?: 'good' | 'warn' | 'bad';
}

export type CompareRowItem = string | CompareCell;

interface CompareTableProps {
  headers: string[];
  rows: CompareRowItem[][];
  columnWidths?: string[]; // e.g. ['1.2fr', '2fr', '2fr', '1.5fr']
}

export const CompareTable: React.FC<CompareTableProps> = ({
  headers,
  rows,
  columnWidths,
}) => {
  const colsCount = headers.length;
  
  // Set up CSS grid-template-columns inline style
  const gridTemplateColumns = columnWidths 
    ? columnWidths.join(' ') 
    : `repeat(${colsCount}, 1fr)`;

  const renderCell = (item: CompareRowItem, cellIndex: number, isLastRow: boolean) => {
    const borderClass = isLastRow ? styles.lastRowCell : '';
    
    if (typeof item === 'string') {
      // Auto-detect some status classes based on text content if status isn't specified
      const lowercase = item.toLowerCase();
      let statusClass = '';
      if (lowercase === 'good' || lowercase.startsWith('strong')) {
        statusClass = styles.cellGood;
      } else if (lowercase === 'ok' || lowercase.startsWith('eventual') || lowercase.startsWith('tunable') || lowercase.startsWith('varies')) {
        statusClass = styles.cellWarn;
      } else if (lowercase === 'bad') {
        statusClass = styles.cellBad;
      }
      
      return (
        <div key={cellIndex} className={`${styles.cell} ${statusClass} ${borderClass}`}>
          {item}
        </div>
      );
    }

    const { text, status } = item;
    let statusClass = '';
    if (status === 'good') statusClass = styles.cellGood;
    if (status === 'warn') statusClass = styles.cellWarn;
    if (status === 'bad') statusClass = styles.cellBad;

    return (
      <div key={cellIndex} className={`${styles.cell} ${statusClass} ${borderClass}`}>
        {text}
      </div>
    );
  };

  return (
    <div className={styles.tableCard}>
      <div 
        className={styles.gridContainer} 
        style={{ gridTemplateColumns } as React.CSSProperties}
      >
        {/* Table Header */}
        {headers.map((header, i) => (
          <div key={i} className={`${styles.headerCell} label-cap`}>
            {header}
          </div>
        ))}

        {/* Table Rows */}
        {rows.map((row, rowIndex) => {
          const isLastRow = rowIndex === rows.length - 1;
          return (
            <React.Fragment key={rowIndex}>
              {row.map((item, cellIndex) => renderCell(item, cellIndex, isLastRow))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
