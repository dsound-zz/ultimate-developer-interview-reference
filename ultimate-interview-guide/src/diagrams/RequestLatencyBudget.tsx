import React from 'react';

export const RequestLatencyBudget: React.FC = () => {
  // 200ms = 640px (leave 20px padding on each side)
  // Scale factor: 3.2px per 1ms
  const scale = 3.2;
  const startX = 20;
  const barY = 50;
  const barHeight = 24;

  const segments = [
    { label: 'DNS', val: 5, color: 'var(--red)', desc: 'DNS Lookup' },
    { label: 'TLS', val: 20, color: 'var(--amber)', desc: 'TLS Handshake' },
    { label: 'LB', val: 2, color: 'var(--yellow)', desc: 'Load Balancer' },
    { label: 'Cache', val: 2, color: 'var(--blue)', desc: 'Cache Check' },
    { label: 'App', val: 50, color: 'var(--accent)', desc: 'App Server Processing' },
    { label: 'DB', val: 30, color: 'var(--green)', desc: 'Database Query' },
    { label: 'Serial', val: 10, color: 'var(--purple)', desc: 'Response Serialization' },
    { label: 'Net', val: 50, color: 'var(--cyan)', desc: 'Network RTT (Ping)' },
    { label: 'Buffer', val: 31, color: 'var(--text-secondary)', desc: 'SLA Buffer' },
  ];

  let currentX = startX;

  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 680 220" 
      role="img" 
      aria-label="Request Latency Budget Diagram (200ms SLO)"
      style={{ display: 'block', margin: '0 auto' }}
    >
      {/* Title / Budget Scale */}
      <text x="20" y="25" fill="var(--text-primary)" fontSize="12" fontWeight="700" fontFamily="var(--font-body)">
        LATENCY BUDGET BREAKDOWN (200ms SLO)
      </text>
      <text x="660" y="25" fill="var(--text-secondary)" fontSize="10" fontWeight="600" textAnchor="end" fontFamily="var(--font-mono)">
        TOTAL: 200ms
      </text>

      {/* Rulers */}
      <line x1="20" y1="40" x2="660" y2="40" stroke="var(--border)" strokeWidth="1" />
      <text x="20" y="36" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)">0ms</text>
      <text x="180" y="36" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">50ms</text>
      <text x="340" y="36" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">100ms</text>
      <text x="500" y="36" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">150ms</text>
      <text x="660" y="36" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">200ms</text>

      {/* Stacked Bar */}
      {segments.map((seg, i) => {
        const width = seg.val * scale;
        const x = currentX;
        currentX += width;
        return (
          <g key={i}>
            <rect 
              x={x} 
              y={barY} 
              width={width} 
              height={barHeight} 
              fill={seg.color} 
              opacity="0.85"
              stroke="var(--background)"
              strokeWidth="1"
            />
            {/* Draw brief labels for larger segments inside the bar */}
            {width > 28 && (
              <text 
                x={x + width / 2} 
                y={barY + 15} 
                fill="var(--background)" 
                fontSize="9" 
                fontWeight="700" 
                textAnchor="middle"
                fontFamily="var(--font-body)"
              >
                {seg.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Leader Lines and Legend Details */}
      {(() => {
        let xOffset = startX;
        return (
          <g transform="translate(0, 95)">
            {/* Grid of legend items */}
            {segments.map((seg, i) => {
              const width = seg.val * scale;
              const midX = xOffset + width / 2;
              xOffset += width;

              // Row index (0 or 1) to prevent text collision
              const row = i % 2;
              const textY = row === 0 ? 25 : 55;
              const lineEndY = row === 0 ? 15 : 45;

              return (
                <g key={i}>
                  {/* Subtle connector line from bar bottom to legend text */}
                  <line 
                    x1={midX} 
                    y1={barY - 95 + barHeight} 
                    x2={midX} 
                    y2={lineEndY} 
                    stroke="var(--border-subtle)" 
                    strokeWidth="1.5" 
                    strokeDasharray="2 2"
                  />
                  {/* Dot */}
                  <circle cx={midX} cy={lineEndY} r="3" fill={seg.color} />
                  
                  {/* Label & Value */}
                  <text 
                    x={midX} 
                    y={textY} 
                    fill="var(--text-primary)" 
                    fontSize="9.5" 
                    fontWeight="700" 
                    textAnchor="middle"
                    fontFamily="var(--font-body)"
                  >
                    {seg.label} ({seg.val}ms)
                  </text>
                  <text 
                    x={midX} 
                    y={textY + 12} 
                    fill="var(--text-secondary)" 
                    fontSize="8" 
                    textAnchor="middle"
                    fontFamily="var(--font-body)"
                  >
                    {seg.desc}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })()}
    </svg>
  );
};
