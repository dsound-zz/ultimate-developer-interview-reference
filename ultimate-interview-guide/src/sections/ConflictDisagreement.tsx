import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { BehavioralCard } from '../behavioral/BehavioralCard';

export const ConflictDisagreement: React.FC = () => {
  return (
    <SectionContainer
      id="conflict-disagreement"
      title="Conflict & Disagreement"
      category="BEHAVIORAL STRATEGY"
      accentColor="var(--accent)"
    >
      <BehavioralCard
        question='Tell me about a time you disagreed with a technical decision.'
        reallyAsking="Can you push back constructively? Do you know when to let it go? Are you collaborative or combative?"
        company="olivine"
        signals={['Collaboration', 'Judgment', 'Advocacy', 'Design patterns']}
        modeType="star"
        starContent={{
          situation: (
            <p>
              At Olivine, we were onboarding commercial and industrial users alongside our existing residential customers. These segments needed meaningfully different UI experiences — different views, different data, different workflows. The question was how to architect that divergence in the frontend.
            </p>
          ),
          task: (
            <p>
              Align the team on an approach before we built ourselves into a corner. I advocated for the Factory Pattern*; others on the team leaned toward adding conditional branches — more <code>if</code>/<code>else</code> switches keyed on user type spread throughout the components.
            </p>
          ),
          action: (
            <p>
              I laid out the tradeoff clearly: the branching approach was faster to start but would compound — every new user type or edge case would touch every switch in the codebase. The Factory Pattern encapsulated the variation behind a single abstraction, so adding a new user type meant adding a new implementation, not hunting for all the existing branches. I walked through a concrete example showing how the branching approach would look after two or three more segments were added. The team came around to it.
            </p>
          ),
          result: (
            <p>
              We went with the Factory Pattern. Adding commercial and industrial experiences stayed contained and the codebase didn't become a tangle of user-type conditionals. It also made onboarding future engineers easier — the pattern was self-documenting.
            </p>
          ),
        }}
        listeningFor="That you can advocate for a technical position with reasoning, not just preference — and that you make the case with evidence rather than authority."
        honestContent={{
          candid: (
            <p>
              The strength of this story is that the disagreement was substantive and the outcome was measurable. Don't undersell the advocacy — you saw a real scaling problem and made the case for the right solution before it became painful.
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't frame it as "they were wrong." Frame it as "I saw how the simpler approach would compound and was able to show it."</li>
              <li>Be ready to briefly explain the Factory Pattern if asked — it shouldn't take more than two sentences.</li>
            </ul>
          ),
          whatIfTheyPush: (
            <p>
              <strong>"What if you hadn't been able to convince them?"</strong>
              <br />
              "I would have made my case once more with the concrete example, then committed to whatever the team decided. Once a decision is made, arguing in the background creates worse problems than a suboptimal architecture."
            </p>
          ),
        }}
        followUps={[
          {
            question: "What would you have done if the decision had been made by someone above you and you thought it was genuinely harmful?",
            note: "Distinguish between taste disagreements (defer) and correctness disagreements (escalate with evidence).",
          },
          {
            question: "How do you handle disagreements with engineers more senior than you?",
            note: "Respect seniority, not authority. Make your case with evidence, not hierarchy.",
          },
        ]}
      />
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '-8px', marginBottom: '16px' }}>
        * <strong>Factory Pattern:</strong> A design pattern where a factory function or class is responsible for creating objects (or UI components) of the appropriate type based on some input, rather than scattering conditional logic throughout the codebase. Each variant is encapsulated in its own implementation; the factory decides which one to return.
      </p>

      <BehavioralCard
        question='Describe a conflict with a teammate or stakeholder.'
        reallyAsking="Do you handle interpersonal friction professionally? Do you take responsibility for your part in it?"
        company="rethink"
        signals={['Communication', 'Collaboration', 'Flexibility', 'Team-first']}
        modeType="star"
        starContent={{
          situation: (
            <p>
              At Rethink, another developer and I were tasked with building an Admin Portal for the customer service team. Early on, we disagreed about how to handle forms — I wanted to use React Hook Form, and he preferred writing our own lightweight solution.
            </p>
          ),
          task: (
            <p>
              Settle on an approach we could both own and maintain, without letting the disagreement stall the project or create a split codebase.
            </p>
          ),
          action: (
            <p>
              We started with my preference — React Hook Form. After implementing a few of the Admin Portal's forms, it became clear that the abstraction layer, while powerful, was adding cognitive friction. The code was harder to read and reason about quickly, which mattered in an internal tool that would need to be maintained and extended by whoever inherited it. My colleague made that case directly, and I agreed. We switched to a homespun solution — simple, explicit, and easy to trace through.
            </p>
          ),
          result: (
            <p>
              The forms were cleaner to read and easier for both of us — and future developers — to reason about. The conflict resolved cleanly because we were both focused on the same goal: a maintainable codebase, not winning the argument.
            </p>
          ),
        }}
        honestContent={{
          candid: (
            <p>
              This is a good story because you genuinely changed your mind based on evidence in the code, not just social pressure. That's the distinction to draw clearly — you updated your position because the implementation revealed something the abstract debate didn't.
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't frame this as "I gave in." Frame it as "the code showed us the right answer and I was willing to see it."</li>
              <li>Don't disparage React Hook Form — it's a legitimate tool for the right context. The issue was fit for this specific use case.</li>
            </ul>
          ),
          whatIfTheyPush: (
            <p>
              <strong>"Would you use React Hook Form in a different context?"</strong>
              <br />
              "Absolutely. For a complex public-facing product with heavy validation logic, it earns its complexity. For an internal admin tool that needs to be readable and easily extended by whoever inherits it, the overhead wasn't worth it."
            </p>
          ),
        }}
        followUps={[
          {
            question: "What would you do if the conflict wasn't resolving?",
            note: "Escalate early, not late. Bring it to a manager before it festers, not after.",
          },
          {
            question: "Have you ever had to work with someone you just didn't get along with?",
            note: "Be honest but professional. Focus on what you did to make the collaboration work.",
          },
        ]}
      />
    </SectionContainer>
  );
};
