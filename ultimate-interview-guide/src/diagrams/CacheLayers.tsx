import React from 'react';

interface LayerProps {
  y: number;
  name: string;
  ttl: string;
  caches: string;
  isStorage?: boolean;
}

const CacheLayerItem: React.FC<LayerProps> = ({ y, name, ttl, caches, isStorage }) => {
  return (
    <g transform={`translate(80, ${y})`}>
      {/* Box */}
      <rect 
        width="280" 
        height="40" 
        rx="6" 
        fill="var(--surface-raised)" 
        stroke={isStorage ? "var(--green)" : "var(--accent)"} 
        strokeWidth="2" 
      />
      {/* Name */}
      <text x="14" y="24" fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="var(--font-body)">
        {name}
      </text>
      {/* Detail (TTL / Scope) */}
      <text x="266" y="24" fill="var(--text-muted)" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">
        {ttl}
      </text>
      
      {/* Small cache items description below the box */}
      <text x="14" y="52" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-body)">
        {caches}
      </text>
    </g>
  );
};

export const CacheLayers: React.FC = () => {
  const layers = [
    { y: 20, name: "1. Browser Cache", ttl: "TTL: Min/Days", caches: "Caches: Static assets, document structures" },
    { y: 80, name: "2. CDN Edge Cache", ttl: "TTL: Hours/Days", caches: "Caches: Edge compiled HTML, media assets" },
    { y: 140, name: "3. API Gateway Cache", ttl: "TTL: Sec/Min", caches: "Caches: Common public JSON response endpoints" },
    { y: 200, name: "4. Application Cache (Redis)", ttl: "TTL: Min/Hours", caches: "Caches: User sessions, deserialized object nodes" },
    { y: 260, name: "5. DB Query Cache", ttl: "TTL: Sec/Min", caches: "Caches: Index tables, raw query results" },
    { y: 320, name: "6. Database Storage", ttl: "PERSISTENT", caches: "Source of Truth: Relational / NoSQL disk writes", isStorage: true }
  ];

  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 680 400" 
      role="img" 
      aria-label="Vertical Caching Layers Request Pipeline Diagram"
    >
      {/* Draw Downward Request Flow Arrows */}
      {layers.map((_, index) => {
        if (index === layers.length - 1) return null;
        const arrowY = 20 + index * 60 + 40;
        return (
          <g key={index} transform={`translate(220, ${arrowY})`}>
            {/* Vertical Line */}
            <line x1="0" y1="0" x2="0" y2="20" stroke="var(--border)" strokeWidth="2" strokeDasharray="3 3" />
            {/* Arrow Head */}
            <polygon points="-4,16 0,20 4,16" fill="var(--text-muted)" />
            <text x="10" y="14" fill="var(--text-muted)" fontSize="9" fontWeight="500" fontFamily="var(--font-body)">
              Miss
            </text>
          </g>
        );
      })}

      {/* Draw Layers */}
      {layers.map((layer, index) => (
        <CacheLayerItem key={index} {...layer} />
      ))}

      {/* Draw HIT Short-Circuit Arrows to the Right */}
      {layers.map((layer, index) => {
        if (layer.isStorage) return null;
        const midY = layer.y + 20;
        return (
          <g key={index}>
            {/* Arrow line from rect right boundary (360) */}
            <line x1="360" y1={midY} x2="480" y2={midY} stroke="var(--green)" strokeWidth="2" />
            <polygon points="476,y 480,y 476,y" transform={`translate(0, 0)`} />
            <polygon points="476,0 480,3 476,6" fill="var(--green)" transform={`translate(0, ${midY - 3})`} />
            
            {/* HIT Label */}
            <rect x="492" y={midY - 10} width="112" height="20" rx="4" fill="rgba(52, 211, 153, 0.08)" stroke="rgba(52, 211, 153, 0.2)" strokeWidth="1" />
            <text x="548" y={midY + 4} fill="var(--green)" fontSize="9" fontWeight="600" textAnchor="middle" letterSpacing="0.05em" fontFamily="var(--font-body)">
              HIT → RETURN
            </text>
          </g>
        );
      })}
    </svg>
  );
};
