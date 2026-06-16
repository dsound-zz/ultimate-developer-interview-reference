import React from 'react';

export const CapTriangle: React.FC = () => {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 680 400" 
      role="img" 
      aria-label="CAP Theorem Triangle Diagram"
      style={{ display: 'block', margin: '0 auto' }}
    >
      {/* Background Grid Lines (Subtle Aesthetics) */}
      <line x1="40" y1="200" x2="640" y2="200" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 8" />
      <line x1="340" y1="20" x2="340" y2="380" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 8" />

      {/* Connecting Triangle Lines */}
      <line x1="340" y1="70" x2="140" y2="330" stroke="var(--border)" strokeWidth="3" />
      <line x1="340" y1="70" x2="540" y2="330" stroke="var(--border)" strokeWidth="3" />
      <line x1="140" y1="330" x2="540" y2="330" stroke="var(--border)" strokeWidth="3" />

      {/* Tradeoff Labels (Background Rectangles + Text) */}
      {/* CA Tradeoff (Left Edge) */}
      <g transform="translate(190, 185)">
        <rect x="-10" y="-12" width="130" height="24" rx="12" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
        <text x="55" y="4" fill="var(--text-secondary)" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">
          CA (Not Distributed)
        </text>
      </g>

      {/* CP Tradeoff (Right Edge) */}
      <g transform="translate(370, 185)">
        <rect x="-10" y="-12" width="130" height="24" rx="12" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
        <text x="55" y="4" fill="var(--text-secondary)" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">
          CP (Consistency focus)
        </text>
      </g>

      {/* AP Tradeoff (Bottom Edge) */}
      <g transform="translate(275, 318)">
        <rect x="-10" y="-12" width="150" height="24" rx="12" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
        <text x="65" y="4" fill="var(--text-secondary)" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">
          AP (Availability focus)
        </text>
      </g>

      {/* Corner Nodes */}
      {/* Node C (Consistency - Top) */}
      <g transform="translate(340, 70)">
        <circle r="36" fill="var(--surface-raised)" stroke="var(--accent)" strokeWidth="3" />
        <text y="-5" fill="var(--accent)" fontSize="18" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">C</text>
        <text y="15" fill="var(--text-primary)" fontSize="9" fontWeight="600" textAnchor="middle" letterSpacing="0.05em" fontFamily="var(--font-body)">CONSISTENCY</text>
      </g>

      {/* Node A (Availability - Bottom Left) */}
      <g transform="translate(140, 330)">
        <circle r="36" fill="var(--surface-raised)" stroke="var(--accent)" strokeWidth="3" />
        <text y="-5" fill="var(--accent)" fontSize="18" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">A</text>
        <text y="15" fill="var(--text-primary)" fontSize="9" fontWeight="600" textAnchor="middle" letterSpacing="0.05em" fontFamily="var(--font-body)">AVAILABILITY</text>
      </g>

      {/* Node P (Partition Tolerance - Bottom Right) */}
      <g transform="translate(540, 330)">
        <circle r="36" fill="var(--surface-raised)" stroke="var(--accent)" strokeWidth="3" />
        <text y="-5" fill="var(--accent)" fontSize="18" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">P</text>
        <text y="15" fill="var(--text-primary)" fontSize="9" fontWeight="600" textAnchor="middle" letterSpacing="0.05em" fontFamily="var(--font-body)">PARTITION TOL</text>
      </g>
    </svg>
  );
};
