import React from 'react';

export const RagPipeline: React.FC = () => {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 680 340" 
      role="img" 
      aria-label="RAG Ingestion and Query Pipeline" 
      style={{ display: 'block', margin: '0 auto' }}
    >
      <defs>
        <marker 
          id="arrow-rag" 
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

      {/* Grid line splitting Ingest and Query */}
      <line x1="340" y1="20" x2="340" y2="320" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 8" />

      {/* Path 1: INGESTION (Left Half) */}
      <text x="170" y="24" fill="var(--text-muted)" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="0.08em" fontFamily="var(--font-body)">1. INGESTION PATHWAY</text>

      {/* Document Ingestion */}
      <g transform="translate(115, 50)">
        <rect width="110" height="40" rx="4" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="55" y="24" fill="var(--text-primary)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">📄 Docs / Files</text>
      </g>

      <path d="M 170 90 L 170 112" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow-rag)" />

      {/* Chunking Block */}
      <g transform="translate(105, 120)">
        <rect width="130" height="40" rx="4" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="65" y="24" fill="var(--text-primary)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">✂️ Semantic Chunking</text>
      </g>

      <path d="M 170 160 L 170 182" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow-rag)" />

      {/* Embedding Model Ingest */}
      <g transform="translate(100, 190)">
        <rect width="140" height="40" rx="4" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="70" y="24" fill="var(--accent)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">🧮 Embeddings Model</text>
      </g>

      <path d="M 170 230 L 170 252" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow-rag)" />

      {/* Vector Database */}
      <g transform="translate(280, 240)">
        <rect width="120" height="60" rx="6" fill="var(--surface-raised)" stroke="var(--green)" strokeWidth="2" />
        <text x="60" y="26" fill="var(--green)" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">💾 Vector DB</text>
        <text x="60" y="44" fill="var(--text-secondary)" fontSize="8.5" textAnchor="middle" fontFamily="var(--font-mono)">pgvector / Pinecone</text>
      </g>

      {/* Connection from Ingestion Embedding to Vector DB */}
      <path d="M 170 270 L 272 270" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow-rag)" />

      {/* Path 2: QUERYING (Right Half) */}
      <text x="510" y="24" fill="var(--text-muted)" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="0.08em" fontFamily="var(--font-body)">2. QUERY & RETRIEVAL</text>

      {/* User Query */}
      <g transform="translate(455, 50)">
        <rect width="110" height="40" rx="4" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="55" y="24" fill="var(--text-primary)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">💬 User Query</text>
      </g>

      <path d="M 510 90 L 510 112" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow-rag)" />

      {/* Embedding Model Query */}
      <g transform="translate(440, 120)">
        <rect width="140" height="40" rx="4" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="70" y="24" fill="var(--accent)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">🧮 Embeddings Model</text>
      </g>

      {/* Arrow from Query Embedding to Vector DB */}
      <path d="M 510 160 L 510 210 L 340 210 L 340 232" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow-rag)" />

      {/* Arrow from Vector DB to Context Node */}
      <path d="M 380 240 L 380 210 L 510 210 L 510 190" stroke="var(--border)" strokeWidth="2" />

      {/* Retrieval/Context Block */}
      <g transform="translate(440, 190)">
        <rect width="140" height="40" rx="4" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="70" y="24" fill="var(--text-primary)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">🔍 Search Results</text>
      </g>

      <path d="M 510 230 L 510 252" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow-rag)" />

      {/* LLM Synthesis */}
      <g transform="translate(440, 260)">
        <rect width="140" height="40" rx="4" fill="var(--surface-raised)" stroke="var(--accent)" strokeWidth="2" />
        <text x="70" y="24" fill="var(--accent)" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">🤖 LLM Generator</text>
      </g>

      {/* Connection from LLM to response */}
      <path d="M 580 280 L 612 280" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow-rag)" />

      {/* Response Box */}
      <g transform="translate(630, 280)">
        <circle r="14" fill="var(--green)" />
        <text x="0" y="4" fill="#FFFFFF" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">✓</text>
      </g>
    </svg>
  );
};
