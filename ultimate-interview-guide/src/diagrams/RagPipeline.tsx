import React from 'react';

export const RagPipeline: React.FC = () => {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 680 180" 
      role="img" 
      aria-label="RAG (Retrieval Augmented Generation) Pipeline Diagram"
      style={{ display: 'block', margin: '0 auto' }}
    >
      {/* Background Grid Lines (Subtle Aesthetics) */}
      <line x1="20" y1="90" x2="660" y2="90" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 8" />

      {/* Connecting Flow Lines / Arrows */}
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--text-secondary)" />
        </marker>
        <marker id="arrow-accent" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* Arrows between steps */}
      <line x1="85" y1="90" x2="115" y2="90" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="205" y1="90" x2="235" y2="90" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="325" y1="90" x2="355" y2="90" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="445" y1="90" x2="475" y2="90" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="565" y1="90" x2="595" y2="90" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* STEP 1: User Query */}
      <g transform="translate(20, 55)">
        <rect x="0" y="0" width="65" height="70" rx="6" fill="var(--surface-raised)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="32" y="24" fill="var(--text-secondary)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">STEP 1</text>
        <text x="32" y="44" fill="var(--text-primary)" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">User</text>
        <text x="32" y="58" fill="var(--text-primary)" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">Query</text>
      </g>

      {/* STEP 2: Embed Query */}
      <g transform="translate(125, 55)">
        <rect x="0" y="0" width="80" height="70" rx="6" fill="var(--surface-raised)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="40" y="24" fill="var(--text-secondary)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">STEP 2</text>
        <text x="40" y="44" fill="var(--text-primary)" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">Embedding</text>
        <text x="40" y="58" fill="var(--text-secondary)" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">Vector Model</text>
      </g>

      {/* STEP 3: Vector DB Search */}
      <g transform="translate(245, 55)">
        <rect x="0" y="0" width="80" height="70" rx="6" fill="var(--surface-raised)" stroke="var(--accent)" strokeWidth="2" />
        <text x="40" y="24" fill="var(--accent)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">STEP 3</text>
        <text x="40" y="44" fill="var(--text-primary)" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">Vector DB</text>
        <text x="40" y="58" fill="var(--text-secondary)" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">Similarity Search</text>
      </g>

      {/* STEP 4: Top-K Retracted Chunks */}
      <g transform="translate(365, 55)">
        <rect x="0" y="0" width="80" height="70" rx="6" fill="var(--surface-raised)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="40" y="24" fill="var(--text-secondary)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">STEP 4</text>
        <text x="40" y="44" fill="var(--text-primary)" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">Top-K Chunks</text>
        <text x="40" y="58" fill="var(--text-secondary)" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">Context Retr.</text>
      </g>

      {/* STEP 5: LLM Context Assembly */}
      <g transform="translate(485, 55)">
        <rect x="0" y="0" width="80" height="70" rx="6" fill="var(--surface-raised)" stroke="var(--accent)" strokeWidth="2" />
        <text x="40" y="24" fill="var(--accent)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">STEP 5</text>
        <text x="40" y="44" fill="var(--text-primary)" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">LLM Prompt</text>
        <text x="40" y="58" fill="var(--text-secondary)" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">Query + Chunks</text>
      </g>

      {/* STEP 6: Response */}
      <g transform="translate(605, 55)">
        <rect x="0" y="0" width="65" height="70" rx="6" fill="var(--surface-raised)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="32" y="24" fill="var(--text-secondary)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">STEP 6</text>
        <text x="32" y="44" fill="var(--text-primary)" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">Response</text>
        <text x="32" y="58" fill="var(--text-secondary)" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">Streamed</text>
      </g>
    </svg>
  );
};
