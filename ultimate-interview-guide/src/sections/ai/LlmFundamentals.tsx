import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { Callout } from '../../components/Callout';
import { TokenFlow } from '../../diagrams/ai/TokenFlow';
import { PatternCard } from '../../components/PatternCard';
import { InlineCode } from '../../components/InlineCode';

export const LlmFundamentals: React.FC = () => {
  return (
    <SectionContainer
      id="llm-fundamentals"
      title="LLM Fundamentals"
      category="CORE CORE CONCEPTS"
      accentColor="var(--accent)"
    >
      <SectionCard title="Tokenization & Embedding Vectors">
        <ul>
          <li><strong>Byte-Pair Encoding (BPE)</strong>: Text is split into sub-word units called tokens. Common words get single tokens; rare words or code syntaxes are fragmented (e.g. spaces, brackets). 1 token ≈ 4 characters or 0.75 words.</li>
          <li><strong>Embedding Space</strong>: An embedding model converts tokens into a dense floating-point vector (e.g. 1536 dimensions for <InlineCode>text-embedding-3-small</InlineCode>). Distance metrics like cosine similarity measure the semantic closeness of two pieces of text.</li>
        </ul>
        <div style={{ marginTop: '16px', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '12px' }}>
          <TokenFlow />
        </div>
      </SectionCard>

      <SectionCard title="Transformer Mechanics & KV Caching">
        <ul>
          <li><strong>Self-Attention Layer</strong>: Computes relationship weights between all tokens in a sequence using Query, Key, and Value (<InlineCode>Q, K, V</InlineCode>) matrices. Allows tokens to attend dynamically to context.</li>
          <li><strong>Auto-Regressive Generation</strong>: LLMs predict text one token at a time. To generate token <InlineCode>N</InlineCode>, the model must re-evaluate all tokens from <InlineCode>1</InlineCode> to <InlineCode>N-1</InlineCode>.</li>
          <li><strong>Key-Value (KV) Cache</strong>: To avoid quadratic computational blowups, servers cache the computed <InlineCode>K</InlineCode> and <InlineCode>V</InlineCode> matrices of prior tokens in GPU memory. This is critical for fast chat turns.</li>
        </ul>
        <Callout type="senior-signal">
          "When evaluating LLM latency, always look at Time-to-First-Token (TTFT) vs. Time-Per-Output-Token. High TTFT is caused by prompt processing (pre-fill phase, which can be optimized with prompt caching). Output latency is bound by sequential auto-regressive generation."
        </Callout>
      </SectionCard>

      <SectionCard title="JSON Mode vs. Structured Outputs">
        <p style={{ marginBottom: '12px' }}>
          Raw text completions often fail JSON parsing due to hallucinations or trailing text. 
        </p>
        <ul>
          <li><strong>JSON Mode</strong>: Forces the model's output to start with <InlineCode>{"{"}</InlineCode> and contain a JSON structure, but does not guarantee schema compliance.</li>
          <li><strong>Grammar-Constrained Decoding (Structured Outputs)</strong>: The inference engine restricts output token probabilities at the sampler level. It blocks tokens that would violate a specified JSON schema, guaranteeing 100% syntactical correctness.</li>
        </ul>
        <Callout type="trap">
          "Do not use regex post-parsers to fix JSON outputs. Use grammar-constrained decoding (e.g., Zod schemas with OpenAI/Anthropic SDKs) to enforce compliance directly during the token generation process."
        </Callout>
      </SectionCard>

      <PatternCard
        patternName="Structured Output with Schema Enforcement"
        code={`import { OpenAI } from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const client = new OpenAI();

// 1. Define the target TypeScript/validation structure
const TicketEscalationSchema = z.object({
  urgency: z.enum(['low', 'medium', 'high', 'critical']),
  category: z.string(),
  reasoning: z.string(),
  suggestedAction: z.string(),
});

// 2. Call the LLM with grammar constraints
const response = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { role: 'system', content: 'Analyze the support ticket and extract structural metadata.' },
    { role: 'user', content: 'My DB cluster is throwing OOM errors and throwing 500s!' }
  ],
  response_format: zodResponseFormat(TicketEscalationSchema, 'escalation'),
});

const result = JSON.parse(response.choices[0].message.content || '{}');
console.log(result.urgency); // Guaranteed to be 'low' | 'medium' | 'high' | 'critical'`}
        description="Enforcing a strict JSON response schema using OpenAI SDK with Zod helpers, guaranteeing schema compliance at the sampling layer."
      />
    </SectionContainer>
  );
};
