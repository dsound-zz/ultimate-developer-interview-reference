import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { BehavioralCard } from '../behavioral/BehavioralCard';

export const LeadershipMentorship: React.FC = () => {
  return (
    <SectionContainer
      id="leadership-mentorship"
      title="Leadership & Mentorship"
      category="BEHAVIORAL STRATEGY"
      accentColor="var(--green)"
    >
      <BehavioralCard
        question='Tell me about a time you mentored someone or helped a colleague grow.'
        reallyAsking="Do you invest in others? What does your influence look like at scale?"
        company="olivine"
        signals={['Mentorship', 'Culture', 'Multiplier effect', 'Investment in others']}
        modeType="star"
        starContent={{
          situation: (
            <p>
              At Olivine, new engineers arrived and had to figure the codebase out largely on their own. The knowledge lived in individuals, not in any shared artifact.
            </p>
          ),
          task: (
            <p>
              Change that — not because it was assigned, but because the cost of scattered onboarding is paid by every new engineer who joins.
            </p>
          ),
          action: (
            <p>
              Built onboarding materials — slide deck, architectural overview — and gave new engineers personal live codebase tours. The tours were the key part: not a recording, but a conversation where they could ask questions in real time and I could adjust depth based on what they already knew.
            </p>
          ),
          result: (
            <p>
              Engineers onboarded faster. The materials became a shared resource. And personally, I got better at explaining architectural decisions out loud — which is its own skill.
            </p>
          ),
        }}
        honestContent={{
          candid: (
            <p>
              Mentorship at senior level isn't always formal. Sometimes it's taking an hour to walk someone through the codebase properly rather than pointing them to a README and walking away. The investment is small; the return is significant.
            </p>
          ),
          edge: (
            <p>
              "The code review culture I learned from the CTO at Avandar — affirming alongside critical — I've applied to mentorship interactions since. The goal isn't to show what you know. It's to make the other person better."
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't frame mentorship as "I helped junior engineers." Frame it as "I invested in the team's capacity." The first sounds condescending. The second sounds senior.</li>
            </ul>
          ),
        }}
        followUps={[
          {
            question: "How do you mentor without creating dependency?",
            note: "Teach the reasoning, not the answer. The goal is for them not to need you.",
          },
          {
            question: "What's the hardest part of mentoring?",
            note: "Calibrating to where someone actually is, not where you assume they are. Explaining something too simply is insulting; too complex is useless.",
          },
        ]}
      />

      <BehavioralCard
        question='Describe your leadership style.'
        reallyAsking="How do you influence without authority? What does working with you look like?"
        company="olivine"
        signals={['Leadership', 'Influence', 'Culture']}
        modeType="frame"
        frameContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '12px', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              "I lead by making the right path visible — prototypes over proposals, clear documentation over verbal agreements, and asking questions that surface tradeoffs before they become problems."
            </div>
            <p>
              <strong>Specific details:</strong>
            </p>
            <ul>
              <li><strong>In code reviews</strong>: specific, affirming alongside critical. Critique the code, not the person.</li>
              <li><strong>In technical decisions</strong>: prototype to reduce uncertainty before asking for buy-in.</li>
              <li><strong>In collaboration</strong>: state my assumptions explicitly. Invite challenge early. Commit fully once a decision is made.</li>
              <li><strong>In mentorship</strong>: teach the reasoning, not just the answer.</li>
            </ul>
            <p>
              <strong>What I'm not:</strong>
              <br />
              "I'm not a loud presence in a room. I don't push hard for my ideas based on confidence alone. I push when I have evidence."
            </p>
          </div>
        }
        honestContent={{
          candid: (
            <p>
              Don't describe a leadership style you don't actually have. Interviewers will probe this in follow-ups and the inconsistency shows.
            </p>
          ),
          watchOut: (
            <ul>
              <li>Make sure you emphasize leading by evidence and building, rather than just waiting or being passive.</li>
            </ul>
          ),
        }}
        followUps={[
          {
            question: "Give me an example of leading without formal authority.",
            note: "DuckDB prototype. Onboarding materials. Code review culture adoption.",
          },
          {
            question: "How do you handle it when your leadership style doesn't work with a particular person?",
            note: "Adapt. Not every person responds to the same approach. Ask what they need.",
          },
        ]}
      />
    </SectionContainer>
  );
};
