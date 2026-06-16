import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { Callout } from '../../components/Callout';
import { ModelComparisonPills } from '../../components/ModelComparisonPills';

export const InterviewPlaybook: React.FC = () => {
  return (
    <SectionContainer
      id="interview-playbook"
      title="Interview Playbook"
      category="INTERVIEW CHEAT SHEET"
      accentColor="var(--accent)"
    >
      <SectionCard title="Common LLM Models Cheat Sheet">
        <p style={{ marginBottom: '12px' }}>
          Be prepared to reference current model families, their context limits, and their best architectural roles during system design interviews:
        </p>
        <ModelComparisonPills />
      </SectionCard>

      <SectionCard title="Tradeoffs: RAG vs. Fine-Tuning">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', color: 'var(--text-secondary)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
              <th style={{ padding: '8px 0', color: 'var(--text-primary)', fontWeight: '600' }}>Dimension</th>
              <th style={{ padding: '8px', color: 'var(--text-primary)', fontWeight: '600' }}>RAG (Retrieval)</th>
              <th style={{ padding: '8px', color: 'var(--text-primary)', fontWeight: '600' }}>Fine-Tuning</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '8px 0', fontWeight: '600', color: 'var(--text-primary)' }}>Primary Use</td>
              <td style={{ padding: '8px' }}>Injecting dynamic, factual knowledge.</td>
              <td style={{ padding: '8px' }}>Teaching specialized styles, formatting, vocabularies.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '8px 0', fontWeight: '600', color: 'var(--text-primary)' }}>Information Freshness</td>
              <td style={{ padding: '8px' }}>Real-time (updated database chunks instantly available).</td>
              <td style={{ padding: '8px' }}>Static (requires retraining to update facts).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '8px 0', fontWeight: '600', color: 'var(--text-primary)' }}>Hallucination Control</td>
              <td style={{ padding: '8px' }}>High (grounds responses in context sources).</td>
              <td style={{ padding: '8px' }}>Low (model relies on weights, prone to hallucination).</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: '600', color: 'var(--text-primary)' }}>Cost & Overhead</td>
              <td style={{ padding: '8px' }}>High runtime cost (input tokens); low prep cost.</td>
              <td style={{ padding: '8px' }}>High prep cost (data gathering, training); lower runtime cost.</td>
            </tr>
          </tbody>
        </table>
      </SectionCard>

      <SectionCard title="Senior Signals vs. Junior Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Callout type="senior-signal">
            "I design AI pipelines defensively. Prompt instructions will fail occasionally, so I use structured output schemas with strict validation at the API edge. If the validation fails twice, the system falls back to a deterministic, non-LLM workflow."
          </Callout>

          <Callout type="senior-signal">
            "I always prioritize observability and execution tracing over prompt tuning. Tuning a prompt without evaluations is like refactoring code without unit tests—you have no idea what you broke."
          </Callout>

          <Callout type="trap">
            "Assuming longer prompts solve everything. Stuffing more instructions into the prompt increases latency, costs, and worsens the 'lost in the middle' attention degradation. Keep instructions focused and rely on few-shot examples."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
