import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { SectionCard } from '../components/SectionCard';
import { Badge } from '../components/Badge';

export const AIInFEDev: React.FC = () => {
  return (
    <SectionContainer
      id="ai-in-fe-dev"
      title="AI in FE Dev"
      category="AI"
      accentColor="var(--accent)"
    >
      <SectionCard title="Where AI helps most">
        <ul>
          <li>Scaffolding — generating component boilerplate, hook templates, and unit test stubs</li>
          <li>Refactoring — extracting logic into custom hooks, structural renames, and migration patterns</li>
          <li>Type generation — translating raw JSON to TypeScript interfaces and mapping OpenAPI schemas</li>
          <li>Accessibility — suggesting standard ARIA attributes and detecting missing labels</li>
          <li>Docs + stories — writing JSDoc tags, PropTables, and Storybook story configurations</li>
          <li>Test generation — creating initial RTL test suites based on types and component layouts</li>
        </ul>
      </SectionCard>

      <SectionCard title="Tools in production">
        <ul>
          <li><strong>GitHub Copilot</strong> — inline code autocomplete, highly effective for repetitive patterns</li>
          <li><strong>Cursor</strong> — AI-native editor featuring multi-file codebase indexing and chat interface</li>
          <li><strong>Claude Code</strong> — agentic coding companion capable of analyzing complex logic and executing tasks</li>
          <li><strong>v0 (Vercel)</strong> — generative design engine, ideal for rapid component prototyping</li>
          <li><strong>Codeium / Supermaven</strong> — lightweight, fast auto-complete alternatives</li>
        </ul>
      </SectionCard>

      <SectionCard title="Senior-level take">
        <ul>
          <li>AI excels at boilerplate and drafts where critical engineering judgment is not required</li>
          <li>System architecture, security parameters, and specialized accessibility details still require human expertise</li>
          <li><Badge variant="trap">Trap</Badge> Blindly accepting AI-generated hooks without inspecting dependencies, closures, and cleaning up effects</li>
          <li><Badge variant="good">Good</Badge> Use AI to accelerate drafting; apply senior-level review to verify and constrain. The leverage is in the loop.</li>
          <li>AI-generated tests often mock internal structures rather than user behavior — verify what they test</li>
        </ul>
      </SectionCard>
    </SectionContainer>
  );
};
