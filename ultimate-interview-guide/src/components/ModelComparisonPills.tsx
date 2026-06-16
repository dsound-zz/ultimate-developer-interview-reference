import React from 'react';
import styles from './ModelComparisonPills.module.css';

interface ModelInfo {
  name: string;
  provider: string;
  contextWindow: string;
  strengths: string[];
  costPerM: string; // "Input / Output"
  role: string;
}

const MODELS: ModelInfo[] = [
  {
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    contextWindow: '200K',
    strengths: ['Coding', 'Reasoning', 'JSON output'],
    costPerM: '$3.00 / $15.00',
    role: 'State-of-the-art software engineering agents, complex refactors.',
  },
  {
    name: 'GPT-4o',
    provider: 'OpenAI',
    contextWindow: '128K',
    strengths: ['Function calls', 'Speed', 'Multimodal'],
    costPerM: '$2.50 / $10.00',
    role: 'High-speed tool execution loops, low-latency UI streaming.',
  },
  {
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    contextWindow: '2M',
    strengths: ['Huge context', 'Multimodal', 'Reasoning'],
    costPerM: '$1.25 / $5.00',
    role: 'Ingesting full codebases, huge video files, massive log histories.',
  },
  {
    name: 'Llama 3.1 70B',
    provider: 'Meta (Open Source)',
    contextWindow: '128K',
    strengths: ['Self-hosting', 'Fine-tuning', 'Data Privacy'],
    costPerM: 'Compute cost',
    role: 'On-prem deployments, custom domain-specific fine-tuning.',
  },
];

export const ModelComparisonPills: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {MODELS.map((model) => (
          <div key={model.name} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.meta}>
                <span className={styles.provider}>{model.provider}</span>
                <span className={styles.context}>{model.contextWindow} Context</span>
              </div>
              <h4 className={styles.name}>{model.name}</h4>
            </div>
            
            <div className={styles.tags}>
              {model.strengths.map((str) => (
                <span key={str} className={styles.tag}>{str}</span>
              ))}
            </div>

            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Strength:</span>
                <span className={styles.detailValue}>{model.role}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Cost/1M:</span>
                <span className={styles.detailValue}>{model.costPerM}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
