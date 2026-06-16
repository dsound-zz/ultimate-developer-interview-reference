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
        company="avandar"
        signals={['Collaboration', 'Judgment', 'Humility', 'Team-first']}
        modeType="star"
        starContent={{
          situation: (
            <p>
              At Avandar, we had a form-heavy feature and I wanted to use React Hook Form — it handles validation, touched state, and submission in a way that's genuinely cleaner for complex forms. Another senior engineer preferred a simpler, hand-rolled approach, citing onboarding ease and readability for future engineers.
            </p>
          ),
          task: (
            <p>
              Make a case for my preference without creating unnecessary friction on a small team where trust matters more than any individual tool choice.
            </p>
          ),
          action: (
            <p>
              I made my case once, clearly — explained the benefits, showed a quick example of how it would handle the validation complexity we were dealing with. The other engineer listened, understood, and explained their reasoning around maintainability and onboarding friction for future developers who might not know RHF. I considered their argument seriously and agreed to the simpler approach.
            </p>
          ),
          result: (
            <p>
              We shipped with the hand-rolled form. The codebase stayed readable. No drama. I learned something real about how tool preferences can create long-term onboarding debt if the team doesn't share familiarity.
            </p>
          ),
        }}
        listeningFor="That you can make your case, hear the other side, and commit — without passive resistance or bringing it up again every sprint."
        honestContent={{
          candid: (
            <p>
              This story is genuinely clean. The only thing to watch is underselling your reasoning — don't frame it as "I just gave in." Frame it as "I made my case, heard a strong counter-argument, and committed." Deferring because someone outranks you is not the same as disagreeing and committing. Make sure the distinction is clear.
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't frame this as "they were wrong but I let it go." That reads as passive resistance. Frame it as "their argument was actually good."</li>
            </ul>
          ),
          whatIfTheyPush: (
            <p>
              <strong>"Do you regret the decision?"</strong>
              <br />
              "Honestly, no. The simpler form worked fine. If the validation complexity had grown significantly, I might have revisited it — but at the time, the other engineer's reasoning about maintainability was sound."
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

      <BehavioralCard
        question='Describe a conflict with a teammate or stakeholder.'
        reallyAsking="Do you handle interpersonal friction professionally? Do you take responsibility for your part in it?"
        company="olivine"
        signals={['Communication', 'Collaboration', 'Stakeholder management']}
        modeType="star"
        starContent={{
          situation: (
            <p>
              At Olivine, as the product expanded from residential to commercial and industrial users, requirements were evolving faster than they could be fully specced. There were moments where engineering and product had different assumptions about what "done" meant for a given view.
            </p>
          ),
          task: (
            <p>
              Maintain a productive working relationship while pushing back on scope that wasn't clearly defined and could cause rework.
            </p>
          ),
          action: (
            <p>
              I got better at surfacing assumptions explicitly before starting work — writing out what I understood the requirement to be and getting a quick confirmation before building. When I thought something was underspecced, I'd ask a targeted question rather than just flagging it as a problem.
            </p>
          ),
          result: (
            <p>
              Fewer surprises at review. More shared clarity before work started. The relationship stayed collaborative because I framed it as "helping us both be right" rather than "you didn't spec this properly."
            </p>
          ),
        }}
        honestContent={{
          candid: (
            <p>
              This is a pattern story rather than a single conflict. If the interviewer asks for a more specific moment, pivot to the form disagreement at Avandar — that's cleaner and more concrete.
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't invent interpersonal drama. Genuine process friction is a valid answer and is more common in real engineering than blow-up conflicts.</li>
            </ul>
          ),
          whatIfTheyPush: (
            <p>
              <strong>"What if they push for a specific conflict with a person?"</strong>
              <br />
              "It's okay to say: 'Most of the friction I experienced was process-level rather than interpersonal. The sharpest example of a genuine disagreement with a peer is the technical one at Avandar, which I can go into.'"
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
