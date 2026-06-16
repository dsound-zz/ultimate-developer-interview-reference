import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { Callout } from '../../components/Callout';
import { AccuracySpectrum } from '../../components/AccuracySpectrum';
import { InlineCode } from '../../components/InlineCode';

export const MentalModels: React.FC = () => {
  return (
    <SectionContainer
      id="mental-models"
      title="Mental Models"
      category="CONCEPTUAL FRAMES"
      accentColor="var(--accent)"
    >
      <SectionCard title="1. LLMs are stochastic function calls">
        <p style={{ marginBottom: '12px' }}>
          An LLM is a function: <InlineCode>f(prompt) → text</InlineCode>. It is not a database. It is not a knowledge graph. It does not "know" things — it has learned statistical associations between tokens and generates the most probable continuation of your input.
        </p>
        <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Engineering Implications:
        </strong>
        <ul>
          <li><strong>Probabilistic Outputs</strong>: The same input can produce different outputs (temperature &gt; 0). Correctness is a statistical distribution, not a guarantee.</li>
          <li><strong>Beyond Unit Tests</strong>: You cannot assert exact equality when testing LLM outputs. Tests must evaluate semantic similarity, structure, or run via LLM-as-a-judge.</li>
          <li><strong>Defensive System Design</strong>: The downstream system must handle malformed JSON, hallucinated arguments, or unexpected text outputs gracefully.</li>
        </ul>
        
        <Callout type="key-insight">
          "The mental shift is from 'this function returns X' to 'this function usually returns something in the neighborhood of X.' Your system design has to account for the boundaries of that neighborhood."
        </Callout>
      </SectionCard>

      <SectionCard title="2. The Context Window is working memory">
        <p style={{ marginBottom: '12px' }}>
          Everything the LLM "knows" during inference must reside in the context window. Nothing else. It does not remember previous turns unless they are appended to the prompt. It does not know your database rows or system date unless you inject them.
        </p>
        <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Engineering Implications:
        </strong>
        <ul>
          <li><strong>Context Budgets</strong>: Every AI design pattern (RAG, summarization, tool calling) is fundamentally a context management problem.</li>
          <li><strong>Attention Dilution ("Lost in the Middle")</strong>: Attention curves degrade in the center of long prompts. Critical instructions or data should be placed at the very beginning or the very end of the context window.</li>
          <li><strong>Cost and Latency</strong>: Context size scales pricing (input tokens) and increases Time-To-First-Token (TTFT) due to prompt processing.</li>
        </ul>

        <Callout type="trap">
          "Stuffing a 200K context window with raw files and asking a question is not RAG. It is slow, expensive, and dilutes model attention. RAG is about retrieving the narrowest, highest-signal chunks first."
        </Callout>
      </SectionCard>

      <SectionCard title="Accuracy & Execution Spectrum">
        <p style={{ marginBottom: '16px' }}>
          Traditional software design assumes 100% deterministic outputs. LLM systems introduce probabilistic execution. Successful AI engineering lies in knowing where to deploy each execution model.
        </p>
        <AccuracySpectrum value={75} markerLabel="Agentic Workflow (Planning & Execution)" />
      </SectionCard>
    </SectionContainer>
  );
};
