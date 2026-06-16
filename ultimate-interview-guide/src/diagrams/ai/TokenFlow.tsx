import React from 'react';

export const TokenFlow: React.FC = () => {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 680 320" 
      role="img" 
      aria-label="Token Flow Diagram" 
      style={{ display: 'block', margin: '0 auto' }}
    >
      <defs>
        <marker 
          id="arrow-token" 
          viewBox="0 0 10 10" 
          refX="6" 
          refY="5" 
          markerWidth="6" 
          markerHeight="6" 
          orient="auto-start-reverse"
        >
          <path d="M 0 2 L 8 5 L 0 8 z" fill="var(--text-muted)" />
        </marker>
      </defs>

      {/* Grid Lines */}
      <line x1="340" y1="20" x2="340" y2="300" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 8" />

      {/* Raw text input */}
      <g transform="translate(40, 130)">
        <rect width="110" height="60" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="55" y="24" fill="var(--text-primary)" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">Input Text</text>
        <text x="55" y="42" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)">"Agentic AI"</text>
      </g>

      {/* Arrow 1 -> 2 */}
      <path d="M 150 160 L 172 160" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow-token)" />

      {/* Tokenization */}
      <g transform="translate(180, 130)">
        <rect width="110" height="60" rx="6" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="55" y="24" fill="var(--accent)" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">Tokenization</text>
        <text x="55" y="42" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)">[254, 8731, 29]</text>
      </g>

      {/* Arrow 2 -> 3 */}
      <path d="M 290 160 L 312 160" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow-token)" />

      {/* Embeddings */}
      <g transform="translate(320, 130)">
        <rect width="110" height="60" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="55" y="24" fill="var(--text-primary)" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">Embeddings</text>
        <text x="55" y="42" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">1536-dim vector</text>
      </g>

      {/* Arrow 3 -> 4 */}
      <path d="M 430 160 L 452 160" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow-token)" />

      {/* Transformer Layers */}
      <g transform="translate(465, 80)">
        <rect width="175" height="150" rx="8" fill="var(--surface-raised)" stroke="var(--accent)" strokeWidth="2" />
        <text x="87.5" y="24" fill="var(--accent)" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">Transformer Block</text>
        
        {/* Attention layer representation */}
        <rect x="15" y="42" width="145" height="36" rx="4" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
        <text x="87.5" y="58" fill="var(--text-primary)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">Multi-Head Attention</text>
        <text x="87.5" y="70" fill="var(--text-secondary)" fontSize="8" textAnchor="middle" fontFamily="var(--font-body)">Query, Key, Value vectors</text>
        
        {/* Feed Forward layer representation */}
        <rect x="15" y="94" width="145" height="36" rx="4" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
        <text x="87.5" y="110" fill="var(--text-primary)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">Feed Forward Network</text>
        <text x="87.5" y="122" fill="var(--text-secondary)" fontSize="8" textAnchor="middle" fontFamily="var(--font-body)">Non-linear projection</text>
      </g>

      {/* Arrow 4 -> Output */}
      <path d="M 552 230 L 552 252" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow-token)" />

      {/* Output Node: Next token probabilities */}
      <g transform="translate(465, 260)">
        <rect width="175" height="40" rx="6" fill="var(--background)" stroke="var(--green)" strokeWidth="1.5" />
        <text x="87.5" y="24" fill="var(--green)" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">Softmax Next Token Prob</text>
      </g>
    </svg>
  );
};
