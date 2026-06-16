import React from 'react';

interface SpokeProps {
  x: number;
  y: number;
  label: string;
}

const SpokeNode: React.FC<SpokeProps> = ({ x, y, label }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Background Capsule */}
      <rect 
        x="-65" 
        y="-15" 
        width="130" 
        height="30" 
        rx="6" 
        fill="var(--surface-raised)" 
        stroke="var(--border)" 
        strokeWidth="1.5" 
      />
      {/* Label Text */}
      <text 
        x="0" 
        y="4" 
        fill="var(--text-primary)" 
        fontSize="10" 
        fontWeight="600" 
        textAnchor="middle" 
        fontFamily="var(--font-body)"
      >
        {label}
      </text>
    </g>
  );
};

export const ApiGatewayHub: React.FC = () => {
  const center = { x: 340, y: 200 };
  const radius = 135;
  
  const spokes = [
    { angle: 0, label: "Auth / AuthZ" },
    { angle: 45, label: "Rate Limiting" },
    { angle: 90, label: "SSL Termination" },
    { angle: 135, label: "Request Routing" },
    { angle: 180, label: "Response Caching" },
    { angle: 225, label: "Logging / Metrics" },
    { angle: 270, label: "Circuit Breaking" },
    { angle: 315, label: "Request Transform" }
  ];

  const spokeNodes = spokes.map((spoke) => {
    const rad = (spoke.angle * Math.PI) / 180;
    const x = center.x + radius * Math.cos(rad);
    const y = center.y + radius * Math.sin(rad);
    return { x, y, label: spoke.label };
  });

  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 680 400" 
      role="img" 
      aria-label="API Gateway Hub and Spoke Responsibilities Diagram"
    >
      {/* Background circular track */}
      <circle cx={center.x} cy={center.y} r={radius} stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 8" fill="none" />

      {/* Spoke lines */}
      {spokeNodes.map((node, i) => (
        <line 
          key={i} 
          x1={center.x} 
          y1={center.y} 
          x2={node.x} 
          y2={node.y} 
          stroke="var(--border)" 
          strokeWidth="2" 
        />
      ))}

      {/* Spoke nodes (boxes) */}
      {spokeNodes.map((node, i) => (
        <SpokeNode key={i} x={node.x} y={node.y} label={node.label} />
      ))}

      {/* Center Hub Node */}
      <g transform={`translate(${center.x}, ${center.y})`}>
        <circle r="44" fill="var(--surface-raised)" stroke="var(--accent)" strokeWidth="3" />
        <circle r="36" fill="rgba(123, 97, 255, 0.05)" />
        <text 
          x="0" 
          y="-3" 
          fill="var(--accent)" 
          fontSize="11" 
          fontWeight="700" 
          textAnchor="middle" 
          fontFamily="var(--font-body)"
        >
          API
        </text>
        <text 
          x="0" 
          y="11" 
          fill="var(--text-primary)" 
          fontSize="11" 
          fontWeight="700" 
          textAnchor="middle" 
          fontFamily="var(--font-body)"
        >
          Gateway
        </text>
      </g>
    </svg>
  );
};
