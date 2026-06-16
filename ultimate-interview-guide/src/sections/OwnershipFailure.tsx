import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { BehavioralCard } from '../behavioral/BehavioralCard';

export const OwnershipFailure: React.FC = () => {
  return (
    <SectionContainer
      id="ownership-failure"
      title="Ownership & Failure"
      category="BEHAVIORAL STRATEGY"
      accentColor="var(--red)"
    >
      <BehavioralCard
        question='Tell me about a time you made a mistake.'
        reallyAsking="Do you own things? Do you learn? Do you blame others?"
        company="olivine"
        signals={['Ownership', 'Accountability', 'Production thinking', 'Recovery']}
        modeType="star"
        starContent={{
          situation: (
            <p>
              I rushed a change to a production pipeline without adequate staging validation. The change broke the pipeline.
            </p>
          ),
          task: (
            <p>
              Fix it. Own it. Prevent it from happening again.
            </p>
          ),
          action: (
            <p>
              I rolled it back immediately as soon as I understood what had happened. Did the root cause analysis — the issue was that I'd made an assumption about the data shape that wasn't true in production. Fixed it properly. Added validation and a test that would catch that class of assumption failure in the future.
            </p>
          ),
          result: (
            <p>
              Zero repeat incidents. The safeguard I added caught a similar assumption error from another engineer a few months later. The mistake paid for itself.
            </p>
          ),
        }}
        listeningFor="Speed of ownership, quality of recovery, evidence of learning rather than just remorse."
        honestContent={{
          candid: (
            <p>
              The temptation is to over-explain the context until it sounds like you're building a case for why it wasn't really your fault. Don't. Lead with "I made a mistake." Interviewers are listening for that sentence. Everything after it lands better when you lead with accountability.
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't let the recovery story crowd out the ownership moment. Say "I made a mistake" before you say anything else.</li>
            </ul>
          ),
          whatIfTheyPush: (
            <p>
              <strong>"What was the business impact?"</strong>
              <br />
              "It caused a delay in data processing for that pipeline. Nothing customer-facing was affected, but it was a real production incident that I should have prevented with better staging validation."
            </p>
          ),
        }}
        followUps={[
          {
            question: "What would you do differently?",
            note: "Better staging validation, explicit testing of assumptions about data shape, slower movement on anything touching production pipelines.",
          },
          {
            question: "How do you balance speed with caution in production?",
            note: "Context-dependent. On a UI change, faster is usually fine. On data pipelines, auth, or billing — caution by default.",
          },
        ]}
      />

      <BehavioralCard
        question='Tell me about a time you failed to meet a deadline or expectation.'
        reallyAsking="How do you handle pressure? Do you communicate early or cover up?"
        company="olivine"
        signals={['Communication', 'Prioritization', 'Maturity']}
        modeType="star"
        starContent={{
          situation: (
            <p>
              Earlier in my career at Olivine, I had a tendency to over-engineer solutions before shipping. I'd be close to done but keep refining — and the estimate I'd given would slip.
            </p>
          ),
          task: (
            <p>
              Recognize the pattern and fix it, because late delivery with no communication is worse than either early delivery or communicated delay.
            </p>
          ),
          action: (
            <p>
              I started explicitly separating "done" from "perfect" in my planning. Setting a stake in the ground: what's the v1 that validates the approach? What can be added in the next iteration? I also got better at raising my hand when I realized I was going to miss a deadline — earlier rather than later, with context.
            </p>
          ),
          result: (
            <p>
              Delivery became more predictable. I shipped simpler versions faster and added complexity with evidence that it was needed. The team had more confidence in my estimates because I'd learned to communicate variance rather than absorb it silently.
            </p>
          ),
        }}
        honestContent={{
          candid: (
            <p>
              The failure here is actually a common senior anti-pattern: over-engineering. The real growth is in recognizing it and changing the behavior. That's more impressive than a candidate who's never missed a deadline because they've never worked on anything hard.
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't frame this as "I was a perfectionist" — that's the clichéd version. Frame it as "I had a pattern of absorbing variance rather than communicating it, and I fixed that."</li>
            </ul>
          ),
          whatIfTheyPush: (
            <p>
              <strong>"Can you give me a specific project where this happened?"</strong>
              <br />
              "Pivot to any medium-complexity feature at Olivine — the portfolio view restructuring is a good one. 'That work had enough complexity that I could have spent months on it. Learning to define done and ship it was part of the growth.'"
            </p>
          ),
        }}
        followUps={[
          {
            question: "How do you estimate work now?",
            note: "Break it into knowns and unknowns. Give a range, not a point estimate. Flag when the unknowns are large.",
          },
          {
            question: "What do you do when you realize you're going to miss a deadline?",
            note: "Tell someone immediately. Come with a plan, not just a problem.",
          },
        ]}
      />
    </SectionContainer>
  );
};
