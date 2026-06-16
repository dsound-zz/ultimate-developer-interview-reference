import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { BehavioralCard } from '../behavioral/BehavioralCard';

export const GrowthLearning: React.FC = () => {
  return (
    <SectionContainer
      id="growth-learning"
      title="Growth & Learning"
      category="BEHAVIORAL STRATEGY"
      accentColor="var(--accent)"
    >
      <BehavioralCard
        question='Tell me about a time you received difficult feedback.'
        reallyAsking="Are you coachable? Do you get defensive?"
        company="avandar"
        signals={['Coachability', 'Growth mindset', 'Self-awareness']}
        modeType="star"
        starContent={{
          situation: (
            <p>
              Working closely with the CTO at Avandar, I received detailed, high-standards code review feedback consistently. Some of it was affirming, some of it required real changes in how I thought about code structure.
            </p>
          ),
          task: (
            <p>
              Receive it well — not just implement the changes, but understand the reasoning behind them.
            </p>
          ),
          action: (
            <p>
              I treated each detailed review as a learning artifact. When I didn't understand the rationale for a change, I asked. When the feedback pointed to a pattern in how I was writing code, I looked for that pattern elsewhere and fixed it proactively — not just in the file being reviewed. I also noticed how he framed feedback: specific, affirming alongside critical, never personal. I started writing my own reviews the same way.
            </p>
          ),
          result: (
            <p>
              My code got better. My reviews got better. I came away with a model for how high-standards feedback can be a gift rather than a judgment.
            </p>
          ),
        }}
        honestContent={{
          candid: (
            <p>
              The behavioral change is the proof. Not "I received feedback well" (anyone can say that) but "here's what I changed as a result." The code review culture adoption is that proof.
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't make this a story about how brilliant the CTO was. Make it a story about how you responded to high-quality feedback.</li>
            </ul>
          ),
        }}
        followUps={[
          {
            question: "How do you handle feedback you disagree with?",
            note: "Take it seriously first. Understand the intent. If you still disagree after understanding it, say so — but respectfully and with reasoning.",
          },
          {
            question: "Have you ever received feedback that turned out to be wrong?",
            note: "Yes, occasionally. The move is to understand it, implement it if you can, and raise a question if you think there's a better path. Never ignore it silently.",
          },
        ]}
      />

      <BehavioralCard
        question='How do you stay current technically?'
        reallyAsking="Are you genuinely curious, or are you maintaining a static skillset?"
        company="avandar"
        signals={['Technical depth', 'Curiosity', 'Independent learning']}
        modeType="frame"
        frameContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p>
              <strong>Lead with what you build, not what you read:</strong>
              <br />
              "I learn by building. Reading about DuckDB-WASM is different from implementing HTTP Range requests with Parquet column pruning and debugging Arrow buffer lifecycle issues in production. I stay current by choosing projects that require me to use tools I don't fully know yet."
            </p>
            <p>
              <strong>Specific examples:</strong>
            </p>
            <ul>
              <li><strong>DuckDB-WASM at Avandar</strong> — learned WASM memory management by doing it</li>
              <li><strong>LangGraph and agentic workflows</strong> — built a RAG pipeline for Beelzebub's Tales to His Grandson as a personal project to understand the pattern properly</li>
              <li><strong>MCP server work at NEC Labs</strong> — worked with a production protocol that was new to me</li>
              <li><strong>Whim (events aggregator)</strong> — learning Mapbox GL JS, Drizzle, Railway deployment</li>
            </ul>
            <p>
              <strong>On communities and sources:</strong>
              <br />
              "I follow engineers whose taste I trust more than publications that cover everything. When something is everywhere, I try to build something small with it quickly rather than reading about it for months."
            </p>
          </div>
        }
        honestContent={{
          candid: (
            <p>
              Every tool you mention, be prepared to discuss what you actually built with it.
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't list technologies you "know about" but haven't used. Interviewers can tell.</li>
            </ul>
          ),
        }}
        followUps={[
          {
            question: "What are you learning right now?",
            note: "Whim's event aggregation pipeline, Mapbox GL JS, GTFS-RT for transit data.",
          },
          {
            question: "How do you know when to go deep vs. staying broad?",
            note: "Go deep on the things you'll use in production. Stay broad enough to know what's possible.",
          },
        ]}
      />
    </SectionContainer>
  );
};
