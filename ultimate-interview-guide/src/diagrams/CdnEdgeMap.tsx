import React from 'react';

export const CdnEdgeMap: React.FC = () => {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 680 400" 
      role="img" 
      aria-label="CDN Edge Network and Origin Server Diagram"
    >
      {/* Background Continent Indications (Aesthetic Circles) */}
      <circle cx="120" cy="160" r="100" fill="var(--border-subtle)" opacity="0.15" /> {/* NA */}
      <circle cx="430" cy="120" r="80" fill="var(--border-subtle)" opacity="0.15" />  {/* EU */}
      <circle cx="560" cy="240" r="90" fill="var(--border-subtle)" opacity="0.15" />  {/* APAC */}

      {/* Long Dashed Lines from Edges to Origin (Cache Misses) */}
      <path d="M 175,170 Q 257.5,185 305,190" fill="none" stroke="var(--red)" strokeWidth="1.5" strokeDasharray="5 5" />
      <path d="M 410,135 Q 375,167.5 355,180" fill="none" stroke="var(--red)" strokeWidth="1.5" strokeDasharray="5 5" />
      <path d="M 525,270 Q 432.5,235 375,215" fill="none" stroke="var(--red)" strokeWidth="1.5" strokeDasharray="5 5" />

      {/* Origin Server (Center) */}
      <g transform="translate(305, 185)">
        <rect x="0" y="0" width="70" height="40" rx="4" fill="var(--surface-raised)" stroke="var(--green)" strokeWidth="2" />
        <text x="35" y="18" fill="var(--text-primary)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">
          Origin
        </text>
        <text x="35" y="28" fill="var(--green)" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">
          Server
        </text>
      </g>

      {/* Edge Node: US-East */}
      <g transform="translate(100, 140)">
        <rect x="0" y="0" width="85" height="30" rx="4" fill="var(--surface-raised)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="42.5" y="18" fill="var(--text-primary)" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">
          Edge: US-East
        </text>
        <text x="42.5" y="-5" fill="var(--accent)" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">
          POP (PoP)
        </text>
      </g>

      {/* Edge Node: EU-West */}
      <g transform="translate(400, 110)">
        <rect x="0" y="0" width="85" height="30" rx="4" fill="var(--surface-raised)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="42.5" y="18" fill="var(--text-primary)" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">
          Edge: EU-West
        </text>
        <text x="42.5" y="-5" fill="var(--accent)" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">
          POP (PoP)
        </text>
      </g>

      {/* Edge Node: APAC */}
      <g transform="translate(515, 260)">
        <rect x="0" y="0" width="85" height="30" rx="4" fill="var(--surface-raised)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="42.5" y="18" fill="var(--text-primary)" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">
          Edge: APAC
        </text>
        <text x="42.5" y="-5" fill="var(--accent)" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body)">
          POP (PoP)
        </text>
      </g>

      {/* Clients & Fast Request Arrows */}
      {/* Client 1 (US) */}
      <g transform="translate(30, 95)">
        <circle cx="15" cy="15" r="10" fill="var(--border)" />
        <text x="15" y="18" fill="var(--text-secondary)" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">U1</text>
        <path d="M 27,27 L 65,42" fill="none" stroke="var(--green)" strokeWidth="1.5" />
        <polygon points="61,42 66,43 63,38" fill="var(--green)" />
        <text x="25" y="42" fill="var(--green)" fontSize="7" fontWeight="600" fontFamily="var(--font-body)">5ms (HIT)</text>
      </g>

      {/* Client 2 (EU) */}
      <g transform="translate(485, 45)">
        <circle cx="15" cy="15" r="10" fill="var(--border)" />
        <text x="15" y="18" fill="var(--text-secondary)" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">U2</text>
        <path d="M 12,27 L -25,60" fill="none" stroke="var(--green)" strokeWidth="1.5" />
        <polygon points="-21,59 -26,61 -24,56" fill="var(--green)" />
        <text x="5" y="47" fill="var(--green)" fontSize="7" fontWeight="600" fontFamily="var(--font-body)">6ms (HIT)</text>
      </g>

      {/* Client 3 (APAC) */}
      <g transform="translate(615, 320)">
        <circle cx="15" cy="15" r="10" fill="var(--border)" />
        <text x="15" y="18" fill="var(--text-secondary)" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body)">U3</text>
        <path d="M 5,12 L -50,-28" fill="none" stroke="var(--green)" strokeWidth="1.5" />
        <polygon points="-46,-27 -52,-29 -49,-23" fill="var(--green)" />
        <text x="-40" y="2" fill="var(--green)" fontSize="7" fontWeight="600" fontFamily="var(--font-body)">8ms (HIT)</text>
      </g>

      {/* Labels for cache miss latency */}
      <rect x="200" y="235" width="105" height="18" rx="4" fill="rgba(248, 113, 113, 0.08)" stroke="rgba(248, 113, 113, 0.2)" strokeWidth="1" />
      <text x="252.5" y="247" fill="var(--red)" fontSize="7.5" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">
        MISS: 120ms (ORIGIN)
      </text>
    </svg>
  );
};
