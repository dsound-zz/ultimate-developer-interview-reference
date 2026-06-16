import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { Callout } from '../../components/Callout';
import { McpFlow } from '../../diagrams/ai/McpFlow';
import { PatternCard } from '../../components/PatternCard';
import { InlineCode } from '../../components/InlineCode';

export const McpProtocol: React.FC = () => {
  return (
    <SectionContainer
      id="mcp-protocol"
      title="MCP — Model Context Protocol"
      category="APPLIED PROTOCOLS"
      accentColor="var(--accent)"
    >
      <SectionCard title="What is MCP?">
        <p style={{ marginBottom: '16px' }}>
          <strong>Model Context Protocol (MCP)</strong> is an open standard designed by Anthropic. It establishes a secure client-server relationship for context exchange, allowing host applications (like IDEs or chat interfaces) to access tools, prompts, and resources exposed by local or remote MCP servers.
        </p>
        <div style={{ padding: '16px', border: '1px solid var(--border-subtle)', borderRadius: '8px', backgroundColor: 'var(--background)' }}>
          <McpFlow />
        </div>
      </SectionCard>

      <SectionCard title="Core MCP Capabilities">
        <ul>
          <li><strong>Resources</strong>: Read-only data sources exposed to the model. Allows the model to inspect database schemas, read log files, or pull document context safely (e.g. <InlineCode>postgres://users/schema</InlineCode>).</li>
          <li><strong>Tools</strong>: Actionable, executable functions. The model can request tool executions (e.g. running a build command, writing code changes, or calling external APIs). The host remains in control of permission approvals.</li>
          <li><strong>Prompts</strong>: Pre-defined prompt templates exposed by the server. Simplifies complex workflows like code refactoring or issue audits.</li>
        </ul>
        <Callout type="senior-signal">
          "MCP decouples model integration from data integration. Instead of writing custom API integration code for every new LLM application, developers can write a single MCP server. Any MCP-compliant host (like Cursor, Windsurf, or Claude Desktop) can instantly connect and use its tools."
        </Callout>
      </SectionCard>

      <PatternCard
        patternName="Building a Basic MCP Server in Node.js"
        code={`import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

// 1. Initialize MCP Server
const server = new Server(
  { name: 'db-inspector-mcp', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

// 2. Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'inspect_table',
      description: 'Fetch column schemas for a local database table',
      inputSchema: {
        type: 'object',
        properties: { tableName: { type: 'string' } },
        required: ['tableName'],
      },
    },
  ],
}));

// 3. Handle tool executions
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'inspect_table') {
    const { tableName } = request.params.arguments as { tableName: string };
    
    // Perform database inspection logic here
    const mockSchema = \`Columns for table "\${tableName}": id (uuid), email (varchar), active (boolean)\`;

    return {
      content: [{ type: 'text', text: mockSchema }],
    };
  }
  
  throw new Error('Tool not found');
});

// 4. Run transport process via stdio
const transport = new StdioServerTransport();
await server.connect(transport);`}
        description="A lightweight, production-grade MCP server using Anthropic's official SDK, communicating via standard I/O (Stdio)."
      />
    </SectionContainer>
  );
};
