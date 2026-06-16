import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { Callout } from '../../components/Callout';
import { PatternCard } from '../../components/PatternCard';
import { InlineCode } from '../../components/InlineCode';

export const PromptEngineering: React.FC = () => {
  return (
    <SectionContainer
      id="prompt-engineering"
      title="Prompt Engineering"
      category="APPLIED PATTERNS"
      accentColor="var(--accent)"
    >
      <SectionCard title="Prompt Hierarchy: System vs. User">
        <ul>
          <li><strong>System Prompt</strong>: Sets the model's persona, boundary rules (e.g. "Do not discuss other competitors"), structured output rules, and tool descriptions. It is given higher privilege in some architectures to prevent prompt injection.</li>
          <li><strong>User Prompt</strong>: Contains the runtime data, queries, and variable inputs. Keep system instructions out of the user prompt to maximize adherence.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Reasoning: Few-Shotting & Chain of Thought">
        <ul>
          <li><strong>Few-Shot Prompting</strong>: Providing concrete examples of target inputs and outputs in the context. Crucial for stylistic compliance, formatting preferences, and teaching edge-case behavior.</li>
          <li><strong>Chain of Thought (CoT)</strong>: Forcing the LLM to output its step-by-step reasoning (often wrapped in a <InlineCode>&lt;thinking&gt;</InlineCode> tag) before generating the final answer. This activates additional token-generation steps that increase accuracy on logic and mathematical tasks.</li>
        </ul>
        <Callout type="senior-signal">
          "Don't write longer system instructions when a model fails. Instead, write 2 or 3 few-shot examples showing the exact behavior. Show, don't tell, is the single most effective prompt optimization."
        </Callout>
      </SectionCard>

      <SectionCard title="The ReAct Loop Pattern">
        <p style={{ marginBottom: '12px' }}>
          <strong>Reason + Act (ReAct)</strong> is a foundational agentic loop. The model alternates between reasoning about a task and calling external tools to get observations:
        </p>
        <div style={{ padding: '12px', backgroundColor: 'var(--background)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
          Thought → Action (Tool Call) → Observation (Tool Result) → Repeat
        </div>
        <p style={{ marginTop: '12px' }}>
          This loop allows the LLM to fetch missing info, execute API operations, and refine its plan dynamically.
        </p>
      </SectionCard>

      <PatternCard
        patternName="Dynamic Prompt Compilation with Few-Shot Examples"
        code={`interface PromptInput {
  query: string;
  context: string;
}

// 1. Maintain a clean, immutable array of few-shot examples
const FEW_SHOT_EXAMPLES = [
  {
    user: "Translate SQL to plain text: SELECT name FROM users WHERE age > 21",
    assistant: "<thinking>Needs to extract name column from users table where age is strictly greater than 21.</thinking>Get names of users who are older than 21."
  }
];

// 2. Safe prompt compiler helper
export function compilePrompt({ query, context }: PromptInput) {
  const systemMessage = [
    "You are a database liaison. Translate queries to natural English.",
    "Always wrap your internal query breakdown inside <thinking> tags."
  ].join('\\n');

  const messages = [
    { role: 'system', content: systemMessage }
  ];

  // Inject few-shots
  for (const example of FEW_SHOT_EXAMPLES) {
    messages.push({ role: 'user', content: example.user });
    messages.push({ role: 'assistant', content: example.assistant });
  }

  // Inject active user request
  messages.push({
    role: 'user',
    content: \`Context schemas:\\n\${context}\\n\\nQuery: \${query}\`
  });

  return messages;
}`}
        description="A robust prompt compiler compiling system prompts, injecting static few-shot examples, and appending sanitized runtime inputs."
      />
    </SectionContainer>
  );
};
