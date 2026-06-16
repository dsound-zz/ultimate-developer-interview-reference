import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { BehavioralCard } from '../behavioral/BehavioralCard';

export const TechnicalJudgment: React.FC = () => {
  return (
    <SectionContainer
      id="technical-judgment"
      title="Technical Judgment"
      category="BEHAVIORAL STRATEGY"
      accentColor="var(--accent)"
    >
      <BehavioralCard
        question='Tell me about a time you had to choose between two technical approaches.'
        reallyAsking="How do you make decisions under uncertainty? Do you have a framework or just instincts?"
        company="avandar"
        signals={['Technical judgment', 'Pragmatism', 'Prototyping', 'Risk management']}
        modeType="star"
        starContent={{
          situation: (
            <p>
              At Avandar, we needed users to be able to query large datasets interactively. The default approach was server-side query processing — route every request through the backend, return results. The alternative was client-side execution using DuckDB-WASM.
            </p>
          ),
          task: (
            <p>
              Evaluate both approaches honestly and recommend one, knowing the client-side path was novel and less proven.
            </p>
          ),
          action: (
            <p>
              I built a prototype of the DuckDB-WASM approach with representative data sizes to validate that it actually worked at the scale we needed. Tested memory usage, latency, and column pruning behavior with HTTP Range requests. Documented the tradeoffs — client-side was faster and cheaper, but had memory limits on low-end devices and required careful Parquet schema design. The server-side path was more familiar but had real cost and latency implications at scale.
            </p>
          ),
          result: (
            <p>
              The prototype made the value visible. The decision was made with evidence, not just belief in the new approach. We kept a fallback path available while the client-side approach was validated in production.
            </p>
          ),
        }}
        honestContent={{
          candid: (
            <p>
              The CTO drove the final architectural decision. I prototyped and validated. That's still real and valuable — but be accurate about the decision-making structure if asked.
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't present this as "I unilaterally decided to use DuckDB-WASM." The story is "I validated the approach with evidence and contributed to an informed decision."</li>
            </ul>
          ),
        }}
        followUps={[
          {
            question: "How do you know when a prototype is good enough to make a decision on?",
            note: "When it tests the highest-risk assumption. Not when it's production-ready.",
          },
          {
            question: "What would you have done if the prototype hadn't worked?",
            note: "Documented why it didn't work and recommended the server-side path. The point of a prototype is to reduce uncertainty, not to confirm your preference.",
          },
        ]}
      />

      <BehavioralCard
        question='Tell me about a time you had to introduce a new technology or approach to a team.'
        reallyAsking="Can you bring people along? Do you lead with evidence or opinion?"
        company="avandar"
        signals={['Technical leadership', 'Communication', 'Evidence-based', 'Influence without authority']}
        modeType="star"
        starContent={{
          situation: (
            <p>
              The DuckDB-WASM approach was novel. Not everyone on the team had seen client-side query execution before. The natural reaction was skepticism — WASM in the browser for database queries felt exotic.
            </p>
          ),
          task: (
            <p>
              Make the case without being evangelical about it. Let the evidence do the work.
            </p>
          ),
          action: (
            <p>
              Built a small working prototype. Walked through the tradeoffs explicitly — faster and cheaper in our case, with real memory constraints on low-end devices. Documented the rationale so it was reviewable. Didn't advocate based on "this is cool" — advocated based on "here's what this does for our users and here's what it costs us."
            </p>
          ),
          result: (
            <p>
              Alignment followed once the value was visible. The team had real information to evaluate, not just a pitch.
            </p>
          ),
        }}
        honestContent={{
          candid: (
            <p>
              The pattern here is: prototype → document tradeoffs → show, don't tell → let the team decide with real information. This is how you introduce anything novel without creating resistance. "Trust me, it's better" is the worst argument. A working demo with explicit tradeoffs is the best argument.
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't let enthusiasm for the technology read as evangelism. Interviewers can tell the difference between "I thought this was interesting" and "I evaluated this carefully and here's why it was the right call."</li>
            </ul>
          ),
        }}
        followUps={[
          {
            question: "What if the team had said no?",
            note: "Accept it. Document the reasons. If the decision created a real problem later, bring it back with new evidence. Don't relitigate.",
          },
          {
            question: "How do you keep up with new technologies without chasing every trend?",
            note: "Build things with them. A blog post isn't knowledge. A prototype is.",
          },
        ]}
      />
    </SectionContainer>
  );
};
