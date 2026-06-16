import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { Callout } from '../../components/Callout';
import { PatternCard } from '../../components/PatternCard';
import { InlineCode } from '../../components/InlineCode';

export const AiFrontend: React.FC = () => {
  return (
    <SectionContainer
      id="ai-frontend"
      title="AI in the Frontend"
      category="CLIENT-SIDE PATTERNS"
      accentColor="var(--accent)"
    >
      <SectionCard title="Server-Sent Events (SSE) vs. WebSockets">
        <ul>
          <li><strong>Server-Sent Events (SSE)</strong>: The de-facto standard for token streaming. Standard unidirectional HTTP connection using <InlineCode>Content-Type: text/event-stream</InlineCode>. Easier to scale, traverses firewalls easily, and supports native client reconnections.</li>
          <li><strong>WebSockets</strong>: Bi-directional, stateful socket connection. Necessary only if the user needs to stream inputs (e.g. real-time speech/audio stream) alongside the output. Overkill for standard text chat.</li>
        </ul>
      </SectionCard>

      <SectionCard title="UX Best Practices for AI Products">
        <ul>
          <li><strong>Source Citations</strong>: RAG systems must link responses to document sources. Anchor tags with target IDs let users click a quote to scroll directly to the raw text inside a reference document panel.</li>
          <li><strong>Streaming Interruptions (Cancel Button)</strong>: Users must be able to cancel token generation mid-stream. Instantly aborts the client fetch request to free up connections and stop model compute costs.</li>
          <li><strong>Optimistic Placeholders</strong>: Instantly rendering a layout placeholder (or thinking skeleton loader) as soon as the user submits, reducing perceived latency.</li>
        </ul>
        <Callout type="senior-signal">
          "When implementing chat interfaces in React, avoid updating state on every single token chunk if it triggers massive, un-throttled re-renders of complex sub-trees. Use a local ref to gather tokens, and batch state updates at 50-100ms intervals to keep the browser main thread free."
        </Callout>
      </SectionCard>

      <PatternCard
        patternName="Consuming an SSE Stream with Fetch AbortController"
        code={`import { useState, useRef } from 'react';

export function useTokenStream() {
  const [content, setContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const startStream = async (prompt: string) => {
    setContent('');
    setIsStreaming(true);
    
    // 1. Initialize AbortController for cancel capabilities
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      });

      if (!response.body) throw new Error('Response body is not readable');

      // 2. Consume stream via Reader
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        
        // Decode chunk text and append to state
        const chunk = decoder.decode(value, { stream: !done });
        setContent((prev) => prev + chunk);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Stream successfully canceled by user.');
      } else {
        console.error('Stream processing failed:', err);
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const cancelStream = () => {
    if (abortControllerRef.current) {
      // 3. Abort connection immediately
      abortControllerRef.current.abort();
    }
  };

  return { content, isStreaming, startStream, cancelStream };
}`}
        description="A robust React hook for consumption of Server-Sent Events (SSE) token streams with full AbortController cancellation controls."
      />
    </SectionContainer>
  );
};
