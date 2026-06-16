import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { BehavioralCard } from '../behavioral/BehavioralCard';

export const InitiativeImpact: React.FC = () => {
  return (
    <SectionContainer
      id="initiative-impact"
      title="Initiative & Impact"
      category="BEHAVIORAL STRATEGY"
      accentColor="var(--green)"
    >
      <BehavioralCard
        question='Tell me about a time you went above and beyond.'
        reallyAsking="Do you own the outcome, or just your task? Are you a builder or a completer?"
        company="olivine"
        signals={['Initiative', 'Impact beyond role', 'Communication', 'Raising the bar']}
        modeType="star"
        starContent={{
          situation: (
            <p>
              When I joined Olivine, the developer onboarding process had gaps. New engineers arrived and had to piece the codebase together on their own — slow, inefficient, and hard on confidence.
            </p>
          ),
          task: (
            <p>
              Nobody asked me to fix this. I noticed it was a problem during my own onboarding and decided to address it.
            </p>
          ),
          action: (
            <p>
              I partnered with a PM, built a slide deck covering key architectural decisions, common patterns, and the parts of the codebase where footguns lived. Then I gave new developers personal codebase tours — not a recorded video, but a live walkthrough where they could ask questions.
            </p>
          ),
          result: (
            <p>
              Engineers onboarded faster and with more confidence. The materials became a reference people actually used. The time investment was real — I did this on top of my regular work — but the return was immediate and compounding.
            </p>
          ),
        }}
        listeningFor="Genuine initiative (not assigned), real impact (not just effort), judgment about what was worth fixing."
        honestContent={{
          candid: (
            <p>
              At staff level, a big part of the job is noticing what's missing and building it — not waiting to be assigned. This story demonstrates that instinct. The PM partnership is important too: good onboarding isn't just a technical document, it's a product, and I treated it that way.
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't be too modest about it. "I just threw together a slide deck" undersells the instinct. Own the initiative cleanly.</li>
            </ul>
          ),
          whatIfTheyPush: (
            <p>
              <strong>"Why did you pick onboarding specifically?"</strong>
              <br />
              "Because it was the highest-leverage problem I could see. The cost of a confused engineer is paid over months. A one-time investment in good materials pays it back immediately and keeps paying."
            </p>
          ),
        }}
        followUps={[
          {
            question: "How did you know it was the right thing to focus on?",
            note: "I'd just gone through the gap myself. The best time to fix onboarding is when you still remember what it felt like not to know.",
          },
          {
            question: "Did anyone push back on the time you spent on it?",
            note: "No. The impact was visible quickly. But even if they had, I'd have made the case — the cost of onboarding friction is real even if it's invisible.",
          },
        ]}
      />

      <BehavioralCard
        question="Tell me about a project you're most proud of."
        reallyAsking='What do you value? What does "good work" mean to you?'
        company="avandar"
        signals={['Technical depth', 'Performance', 'System-level thinking', 'Pride in craft']}
        modeType="frame"
        frameContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p>
              <strong>Lead with the problem, not the technology:</strong>
              <br />
              "The thing I'm most proud of at Avandar isn't the DuckDB-WASM implementation itself — it's what it solved. Users needed to explore large datasets interactively, and the traditional path was expensive, slow, and unnecessarily complex. The satisfaction was in finding a solution that was actually simpler from the user's perspective, even though the technical approach was novel."
            </p>
            <p>
              <strong>Then go technical if they invite it:</strong>
              <br />
              "DuckDB runs in the browser via WebAssembly. HTTP Range requests pull only the relevant columns from Parquet files in S3. Apache Arrow handles zero-copy memory transfer across the WASM boundary. The result: a 10GB dataset query in under 5 seconds, zero server compute."
            </p>
          </div>
        }
        honestContent={{
          candid: (
            <p>
              Make sure you lead with what it meant to the user, not with the technical elegance. Engineers who lead with "it was technically interesting" can come across as ungrounded from product reality. The technology served the user — say that first.
            </p>
          ),
          edge: (
            <p>
              "The CTO drove the architectural decision. I owned the implementation — the browser-side integration, the memory management, the Arrow data pipeline. I came away with a genuine understanding of WASM memory that I couldn't have gotten any other way."
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't over-claim ownership. The honest framing (CTO decided, I implemented) is more credible and still impressive.</li>
            </ul>
          ),
        }}
        followUps={[
          {
            question: "What would you do differently?",
            note: 'Be specific: "I\'d have invested more time in profiling memory usage on mid-tier devices earlier. We got lucky that our users were desktop-first."',
          },
          {
            question: "How did you validate the approach?",
            note: "Prototype first. Test with representative data sizes. Keep a fallback path.",
          },
        ]}
      />
    </SectionContainer>
  );
};
