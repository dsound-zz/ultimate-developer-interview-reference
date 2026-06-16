import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { Callout } from '../../components/Callout';
import { RagPipeline } from '../../diagrams/RagPipeline';

export const LlmAgenticSystems: React.FC = () => {
  return (
    <SectionContainer
      id="llm-agentic-systems"
      title="LLM & Agentic Systems"
      category="ARTIFICIAL INTELLIGENCE"
      accentColor="var(--accent)"
    >
      <SectionCard title="AI Architectures at Scale">
        <Callout type="senior-signal">
          "LLM system design rests on the same distributed systems fundamentals as standard architectures — with new failure modes. Latency is measured in seconds, not milliseconds, outputs are probabilistic, and 'correctness' is fuzzy. Your engineering priority is managing these constraints gracefully."
        </Callout>
      </SectionCard>

      <SectionCard title="LLM APIs as External Dependencies">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Extreme Latency</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              API completions take 1s to 30s. Never put LLM calls on the user's synchronous path. Implement **streaming (SSE)** to stream first tokens in ~300ms.
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Token Budgeting</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Context windows are finite and priced per token. Implement conversation summarization, truncation strategies, or sliding window memory.
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--yellow)' }}>Rate Limits & Costs</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Provider rate limits require queues and exponential backoffs. Implement caching on common prompts to reduce token expenditures.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Retrieval Augmented Generation (RAG) Flow">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          RAG injects relevant facts into the LLM prompt context to ground model answers and prevent hallucinations:
        </p>
        <div style={{ padding: '1rem 0', background: 'var(--surface)', borderRadius: '6px', border: '1px solid var(--border)', marginBottom: '1rem' }}>
          <RagPipeline />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h5 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>Embedding Model</h5>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Determines vector space coordinates. Must remain consistent: if you update the embedding model, you must re-embed the entire corpus.
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h5 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>Chunking Strategy</h5>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Dividing documents into overlap blocks (typically 256-512 tokens). Too small loses context; too large dilutes target signal.
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h5 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>Top-K & Reranking</h5>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Retrieve Top-K chunks (e.g. 50), then pass to a lightweight **cross-encoder reranker** to filter the top 5. Maximizes precision.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Agentic System Architecture">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Unlike standard scripts, agents make autonomous decisions, executing tool call loops based on user inputs.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Orchestration Patterns</h4>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.25rem', margin: 0 }}>
              <li><strong>ReAct Loop</strong>: Reason → Act → Observe. A cyclic turn where the agent determines its next tool call, executes it, and reflects on the observation.</li>
              <li><strong>Supervisor Pattern</strong>: A master agent coordinates specialized subagents, passing tasks and aggregating outputs.</li>
              <li><strong>Human-in-the-Loop</strong>: For critical actions (e.g., sending emails, charging credit cards), pause execution and wait for manual approval.</li>
            </ul>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--red)' }}>Failure Modes & Guardrails</h4>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.25rem', margin: 0 }}>
              <li><strong>Infinite Loop</strong>: If stopping conditions fail, the agent loops tool calls indefinitely. Limit with `max_iterations = 10`.</li>
              <li><strong>Prompt Injection</strong>: Untrusted tool output (e.g., parsing a public webpage) hijacks the system prompt instruction. Sanitize tool results.</li>
              <li><strong>Context Exhaustion</strong>: Recursive tool loops fill the context window. Periodically summarize tool output histories.</li>
            </ul>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="LLM Caching Tier">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--cyan)' }}>Semantic Caching</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Caches responses by prompt embedding similarity rather than exact string matches. If a new prompt is &gt;95% similar to a cached query, return it.
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Prompt Prefix Caching</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Caches long, static instruction sets (e.g. system prompts) at the model provider. Structure prompts with system parameters first, dynamic input last.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "The hardest part of LLM system design isn't the model choice; it is the software engineering plumbing around it. Building robust async queues to handle long-running completions, implementing semantic caching to control API spend, establishing structured logging for non-deterministic executions, and putting strict schema constraints (JSON mode) on model outputs are what separates senior designs from simple wrappers."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
