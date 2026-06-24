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
        company="olivine"
        signals={['Coachability', 'Growth mindset', 'Self-awareness', 'Communication']}
        modeType="star"
        starContent={{
          situation: (
            <p>
              At Olivine, feedback came through that my documentation had fallen significantly behind. As the product was expanding to serve new user segments, keeping internal docs current had slipped — and it was creating friction for teammates trying to understand existing systems.
            </p>
          ),
          task: (
            <p>
              Take the feedback seriously, catch up on what was missing, and build a habit that actually stuck — not just a one-time patch.
            </p>
          ),
          action: (
            <p>
              I audited what was outdated or missing and worked through it systematically. More importantly, I changed how I wrote documentation going forward — shorter, more direct, focused on what a reader actually needs to know rather than exhaustive coverage. The feedback was specifically that docs needed to be more concise, and that landed: I had been writing for completeness when I should have been writing for clarity.
            </p>
          ),
          result: (
            <p>
              Documentation stayed current from that point on. Teammates could find what they needed without coming to me to fill in gaps. The habit of writing leaner, more targeted docs stuck — and made the writing faster too.
            </p>
          ),
        }}
        honestContent={{
          candid: (
            <p>
              The behavioral change is the proof here. Not "I received it well" — but "here's what I actually changed." The shift from writing for completeness to writing for clarity is a real, demonstrable improvement you can speak to.
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't be defensive about letting docs slip — it happens, and the response matters more than the mistake.</li>
              <li>Don't frame it as a one-time fix. The story is about changing a habit, not clearing a backlog.</li>
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
