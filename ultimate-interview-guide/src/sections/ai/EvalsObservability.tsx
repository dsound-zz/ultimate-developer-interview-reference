import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { PatternCard } from '../../components/PatternCard';
import { WatchOut } from '../../components/WatchOut';

export const EvalsObservability: React.FC = () => {
  return (
    <SectionContainer
      id="evals-observability"
      title="Evals & Observability"
      category="PRODUCTION LIFE CYCLE"
      accentColor="var(--accent)"
    >
      <SectionCard title="Evaluating Probabilistic Systems">
        <ul>
          <li><strong>Why traditional asserts fail</strong>: LLMs produce syntactically unique completions on every execution. Asserting string matching or character counts leads to high test flakiness.</li>
          <li><strong>LLM-as-a-Judge (G-Eval)</strong>: Running a frontier model (like GPT-4o or Claude 3.5) with a rigorous rubric prompt to evaluate outputs. The judge model scores the output (e.g. 1 to 5) on specific dimensions like clarity, accuracy, and brand alignment.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Key Evaluation Metrics">
        <ul>
          <li><strong>Faithfulness / Groundedness</strong>: Evaluates whether the generated response is strictly derived from the retrieved RAG context. Prevents hallucinations.</li>
          <li><strong>Answer Relevancy</strong>: Evaluates whether the output directly answers the user's initial query (detecting if the model dodged the question or output irrelevant filler).</li>
          <li><strong>Semantic Similarity</strong>: Calculating the cosine distance between the embeddings of the generated response and a reference golden-set answer.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Observability & Nested Tracing">
        <p style={{ marginBottom: '12px' }}>
          When an agentic system fails, you must trace the exact step that went wrong. Traditional flat logs fail to capture execution trees:
        </p>
        <ul>
          <li><strong>Nested Span Tracing</strong>: Observability platforms (like LangSmith, LangFuse, OpenTelemetry) record calls as nested span hierarchies:
            <div style={{ marginTop: '8px', padding: '10px', backgroundColor: 'var(--background)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
              └─ Agent Execution Loop (Duration: 3.2s)
              <br />&nbsp;&nbsp;&nbsp;├── LLM Call: Query Planning (TTFT: 200ms)
              <br />&nbsp;&nbsp;&nbsp;├── Tool Call: fetch_weather (Latency: 800ms)
              <br />&nbsp;&nbsp;&nbsp;└── LLM Call: Synthesis (TTFT: 150ms)
            </div>
          </li>
          <li><strong>Prompt Auditing</strong>: Retaining precise records of prompts, variable inputs, and model outputs is essential for regression testing when modifying prompt guidelines.</li>
        </ul>
        <WatchOut>
          "Never deploy an LLM application to production without tracing enabled. You cannot diagnose why an agent hallucinated or got stuck in a loop without viewing the exact history of prompt iterations, tool calls, and model outputs."
        </WatchOut>
      </SectionCard>

      <PatternCard
        patternName="Implementing a Basic LLM-as-a-Judge Evaluation"
        code={`import { OpenAI } from 'openai';

const client = new OpenAI();

interface EvalInput {
  query: string;
  context: string;
  response: string;
}

export async function evaluateFaithfulness({ query, context, response }: EvalInput): Promise<{
  score: number;
  reasoning: string;
}> {
  const systemPrompt = [
    "You are an expert quality assurance auditor.",
    "Evaluate whether the response is strictly supported by the context.",
    "Return a score from 1 (hallucinated) to 5 (strictly grounded) and a brief reasoning.",
    "Your output MUST be structured as a JSON block matching this schema: { score: number, reasoning: string }"
  ].join('\\n');

  const userPrompt = [
    \`Context: \${context}\`,
    \`Query: \${query}\`,
    \`Generated Response: \${response}\`
  ].join('\\n\\n');

  const evalCall = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    response_format: { type: 'json_object' }
  });

  const rawJson = evalCall.choices[0].message.content || '{}';
  return JSON.parse(rawJson);
}

// Example usage inside CI/CD test runner:
// const audit = await evaluateFaithfulness(testData);
// expect(audit.score).toBeGreaterThanOrEqual(4);`}
        description="A simple, programmatic validation harness utilizing a frontier LLM as a judge model to assess faithfulness metrics."
      />
    </SectionContainer>
  );
};
