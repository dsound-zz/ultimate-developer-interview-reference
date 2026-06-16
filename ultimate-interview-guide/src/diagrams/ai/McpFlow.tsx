import React from 'react';

export const McpFlow: React.FC = () => {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 680 300" 
      role="img" 
      aria-label="MCP Architecture Flow Diagram" 
      style={{ display: 'block', margin: '0 auto' }}
    >
      <defs>
        <marker 
          id="arrow-mcp" 
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

      {/* Grid lines */}
      <line x1="340" y1="20" x2="340" y2="280" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 8" />

      {/* Host Application (Client) */}
      <g transform="translate(40, 100)">
        <rect width="180" height="100" rx="8" fill="var(--surface-raised)" stroke="var(--accent)" strokeWidth="2" />
        <text x="90" y="24" fill="var(--accent)" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">Host / Client</text>
        <text x="90" y="42" fill="var(--text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--font-body)">(e.g., Cursor IDE, Claude Desktop)</text>
        
        <rect x="20" y="56" width="140" height="30" rx="4" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
        <text x="90" y="75" fill="var(--text-primary)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">Local Host Orchestration</text>
      </g>

      {/* Bi-directional arrow with Protocol labels */}
      {/* Client to Server arrow */}
      <path d="M 230 130 L 410 130" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow-mcp)" />
      {/* Server to Client arrow */}
      <path d="M 410 170 L 230 170" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow-mcp)" />
      
      {/* Protocol boundary text */}
      <rect x="245" y="138" width="150" height="24" rx="12" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="320" y="154" fill="var(--text-secondary)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">JSON-RPC 2.0 via Stdio</text>

      {/* MCP Server */}
      <g transform="translate(420, 60)">
        <rect width="220" height="180" rx="8" fill="var(--surface-raised)" stroke="var(--accent)" strokeWidth="2" />
        <text x="110" y="24" fill="var(--accent)" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">MCP Server</text>
        <text x="110" y="42" fill="var(--text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--font-body)">(Node.js/Python subprocess)</text>

        {/* Resources */}
        <g transform="translate(20, 60)">
          <rect width="180" height="30" rx="4" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
          <text x="90" y="19" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontFamily="var(--font-body)">📂 Resources (Context Read)</text>
        </g>
        
        {/* Tools */}
        <g transform="translate(20, 100)">
          <rect width="180" height="30" rx="4" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
          <text x="90" y="19" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontFamily="var(--font-body)">🛠️ Tools (Actions/Operations)</text>
        </g>

        {/* Prompts */}
        <g transform="translate(20, 140)">
          <rect width="180" height="30" rx="4" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
          <text x="90" y="19" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontFamily="var(--font-body)">📝 Prompts (Shorthand templates)</text>
        </g>
      </g>
    </svg>
  );
};
