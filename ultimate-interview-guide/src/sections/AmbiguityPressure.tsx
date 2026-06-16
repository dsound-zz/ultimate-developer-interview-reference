import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { BehavioralCard } from '../behavioral/BehavioralCard';

export const AmbiguityPressure: React.FC = () => {
  return (
    <SectionContainer
      id="ambiguity-pressure"
      title="Ambiguity & Pressure"
      category="BEHAVIORAL STRATEGY"
      accentColor="var(--red)"
    >
      <BehavioralCard
        question='Tell me about a time you had to make a decision with incomplete information.'
        reallyAsking="Can you act under uncertainty? Do you freeze or move?"
        company="avandar"
        signals={['Decisiveness', 'Judgment', 'Comfort with uncertainty', 'Prototyping']}
        modeType="star"
        starContent={{
          situation: (
            <p>
              When evaluating DuckDB-WASM for the Avandar analytics feature, we didn't have full certainty about how it would perform at scale in the browser, how memory would behave with real user datasets, or whether the approach was proven enough to commit to.
            </p>
          ),
          task: (
            <p>
              Make a recommendation without being able to know with certainty whether it would work.
            </p>
          ),
          action: (
            <p>
              I made the decision testable rather than trying to resolve the uncertainty theoretically. Built a prototype with representative data sizes. Defined the specific questions I needed the prototype to answer — memory ceiling, query latency at scale, column pruning behavior. Ran the tests, documented the results, and made a recommendation based on what I could measure, with explicit acknowledgment of what remained uncertain.
            </p>
          ),
          result: (
            <p>
              The recommendation had a real foundation. The uncertainty that remained was named rather than hidden — which meant the team knew what to watch for in production.
            </p>
          ),
        }}
        honestContent={{
          candid: (
            <p>
              Ambiguity is almost always reducible. The move is to identify the highest-risk assumption and test it — not to wait for certainty, not to make a guess and hope. A small experiment beats a long debate.
            </p>
          ),
          edge: (
            <p>
              "Before engineering I worked professionally as a music producer. Studio sessions run on incomplete information — the brief is vague, the feedback is emotional, the deadline is real. You learn to make a stake in the ground and iterate. That's the same move in engineering."
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't frame incomplete information as comfortable. Frame it as manageable. "I'm fine not knowing things" sounds reckless. "I know how to reduce uncertainty quickly" sounds senior.</li>
            </ul>
          ),
        }}
        followUps={[
          {
            question: "What do you do when you can't build a prototype?",
            note: "Talk to the people who've done it. Find analogous systems. Make the assumptions explicit and get them reviewed.",
          },
          {
            question: "How do you know when you have enough information to decide?",
            note: "When you've answered the highest-risk question. You'll never have all the information. The goal is to answer the right question.",
          },
        ]}
      />

      <BehavioralCard
        question='Tell me about a time you were under significant pressure.'
        reallyAsking="Do you maintain quality under stress? Do you communicate or hide?"
        company="rethink"
        signals={['Pressure', 'Quality', 'Domain sensitivity', 'Correctness']}
        modeType="star"
        starContent={{
          situation: (
            <p>
              At RethinkFirst, the product was used by behavior analysts and therapists working with children with autism. The stakes of correctness were different from a standard consumer app — errors in data or workflow could affect clinical decisions.
            </p>
          ),
          task: (
            <p>
              Maintain quality standards under normal product development pressure while understanding that the domain required extra care.
            </p>
          ),
          action: (
            <p>
              I became more deliberate about regression risk on changes that touched data display or workflow state. Wrote more defensive tests. When I wasn't sure about the clinical meaning of something, I asked rather than assuming. Storybook was part of the workflow here — I used it to isolate and verify component behavior before integration.
            </p>
          ),
          result: (
            <p>
              No incidents on features I owned. A heightened sensitivity to correctness that I've carried into every role since — especially when working with data users rely on to make decisions.
            </p>
          ),
        }}
        honestContent={{
          candid: (
            <p>
              Domain context changes what "good enough" means. Consumer app: ship fast, iterate on feedback. Healthcare-adjacent product: get it right before you ship, because the feedback loop is much harder to trace. I understood that early at RethinkFirst and it shaped how I think about correctness.
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't overstate the clinical impact of frontend work. The product was serious, but "I wrote a button that affected therapy decisions" is a different claim than "I maintained quality standards on a product used in clinical settings." Say the latter.</li>
            </ul>
          ),
        }}
        followUps={[
          {
            question: "How do you know when something is critical enough to slow down on?",
            note: "When an error is hard to trace or hard to reverse. Data display errors, state persistence errors, auth errors. These get extra care.",
          },
          {
            question: "What's your relationship to QA and testing?",
            note: "I write tests for the things I'm uncertain about and the things that would be bad to break. I don't write tests to hit a coverage number.",
          },
        ]}
      />
    </SectionContainer>
  );
};
