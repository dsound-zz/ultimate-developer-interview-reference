import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { Callout } from '../../components/Callout';
import { PatternCard } from '../../components/PatternCard';
import { InlineCode } from '../../components/InlineCode';

export const AgenticSystems: React.FC = () => {
  return (
    <SectionContainer
      id="agentic-systems"
      title="Agentic Systems"
      category="APPLIED PATTERNS"
      accentColor="var(--accent)"
    >
      <SectionCard title="The Autonomy Spectrum">
        <p style={{ marginBottom: '12px' }}>
          Agentic systems are categorized by their level of autonomy and decision-making capabilities:
        </p>
        <ul>
          <li><strong>Chatbot</strong>: Stateless, takes text input and returns text. No external capabilities.</li>
          <li><strong>Routing Router</strong>: Evaluates input and selects a specialized prompt path or static API.</li>
          <li><strong>Tool-Calling Loop</strong>: Can declare tools and parse tool calls, but execution steps are pre-determined.</li>
          <li><strong>Goal-Seeking Agent (ReAct)</strong>: Given a high-level goal, autonomously loops through planning, tool execution, and reflection until it resolves the goal.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Tool-Calling Mechanics">
        <p style={{ marginBottom: '12px' }}>
          An LLM cannot run APIs directly. Tool calling is a cooperative loop:
        </p>
        <ol style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
          <li>The client sends the user query + a list of available tool definitions (JSON schemas).</li>
          <li>The LLM decides a tool is needed, halts text output, and returns a structured <InlineCode>tool_calls</InlineCode> payload (arguments + tool name).</li>
          <li>The client receives this payload, executes the actual code (e.g. running a DB query or writing a file), and returns the results to the LLM.</li>
          <li>The LLM reads the tool output and continues text generation or issues another tool call.</li>
        </ol>
      </SectionCard>

      <SectionCard title="Planning, Self-Reflection & Memory">
        <ul>
          <li><strong>Planning</strong>: Breaking a complex prompt down into a linear sequence of sub-tasks before execution.</li>
          <li><strong>Self-Reflection (Self-Refine)</strong>: Having the agent review its output or tool results and critique them against the goal (e.g. "Does this code build without errors?") before finalizing the response.</li>
          <li><strong>Short-Term Memory</strong>: The thread state and conversation history contained in the active context window.</li>
          <li><strong>Long-Term Memory</strong>: Retrieving past agent observations or user preference tags from a semantic vector database and injecting them into the prompt.</li>
        </ul>
        <Callout type="trap">
          "Do not allow agents to run in infinite loops without a strict max_iterations count. If a tool fails repeatedly, the agent will loop, wasting thousands of tokens trying the same action. Always clamp execution steps."
        </Callout>
      </SectionCard>

      <PatternCard
        patternName="Manual Tool Call Processing & Dispatcher Loop"
        code={`import { OpenAI } from 'openai';

const client = new OpenAI();

// 1. Declare the tools schemas
const tools = [{
  type: 'function' as const,
  function: {
    name: 'fetchStockPrice',
    description: 'Get active stock price for ticker',
    parameters: {
      type: 'object',
      properties: { ticker: { type: 'string' } },
      required: ['ticker'],
    }
  }
}];

// 2. Map tool names to local implementations
const toolRegistry: Record<string, (args: any) => Promise<string>> = {
  fetchStockPrice: async ({ ticker }) => \`Active price for \${ticker} is $152.34\`,
};

// 3. Execution dispatcher loop
export async function runAgentLoop(userMessage: string) {
  const messages = [{ role: 'user' as const, content: userMessage }];

  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages,
    tools,
  });

  const message = response.choices[0].message;

  if (message.tool_calls && message.tool_calls.length > 0) {
    // LLM requested a tool call. Append LLM's request to thread.
    messages.push(message as any);

    for (const toolCall of message.tool_calls) {
      const toolFn = toolRegistry[toolCall.function.name];
      if (toolFn) {
        const args = JSON.parse(toolCall.function.arguments);
        const result = await toolFn(args);

        // Append tool execution observations back to the thread
        messages.push({
          role: 'tool' as const,
          tool_call_id: toolCall.id,
          content: result,
        });
      }
    }

    // Call LLM again with the gathered observations
    const finalResponse = await client.chat.completions.create({
      model: 'gpt-4o',
      messages,
    });
    return finalResponse.choices[0].message.content;
  }

  return message.content;
}`}
        description="A lightweight, robust tool execution dispatcher loop managing thread state injection and tool payload resolution."
      />
    </SectionContainer>
  );
};
