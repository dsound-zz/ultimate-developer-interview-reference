import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { BehavioralCard } from '../behavioral/BehavioralCard';

export const CollaborationCulture: React.FC = () => {
  return (
    <SectionContainer
      id="collaboration-culture"
      title="Collaboration & Culture"
      category="BEHAVIORAL STRATEGY"
      accentColor="var(--blue)"
    >
      <BehavioralCard
        question='Tell me about a time you had to work with someone whose style was very different from yours.'
        reallyAsking="Are you adaptable? Do you have self-awareness about your own style?"
        company="avandar"
        signals={['Adaptability', 'Self-awareness', 'Learning from seniors']}
        modeType="star"
        starContent={{
          situation: (
            <p>
              At Avandar, I worked closely with the CTO. He had a very specific, high-standards approach to everything — code reviews were detailed, architectural decisions were deliberate, expectations were clear and high.
            </p>
          ),
          task: (
            <p>
              Match that standard without feeling defensive about feedback.
            </p>
          ),
          action: (
            <p>
              I paid close attention to how he framed feedback — particularly in code reviews. His approach was to write affirming comments alongside corrections, never just "fix this." I adapted my own style to match: specific about what was wrong, explicit about what was working. I also got better at asking "why" when I disagreed with an architectural decision, rather than just implementing silently.
            </p>
          ),
          result: (
            <p>
              The working relationship was genuinely productive. I came away with a code review approach I still use, and a model for how high-standards engineering culture can be warm rather than harsh.
            </p>
          ),
        }}
        honestContent={{
          candid: (
            <p>
              Working with someone technically stronger than you is only valuable if you're actually paying attention and adapting. The risk is either getting defensive or getting passive. The right move is to observe the pattern, adopt what works, and ask about what you don't understand.
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't make this sound like hero worship. "I worked with a brilliant CTO and learned from him" is less interesting than "I consciously adapted my behavior based on what I observed."</li>
            </ul>
          ),
        }}
        followUps={[
          {
            question: "How do you work with people who have a very different communication style?",
            note: "Ask early what they prefer. Watch how they give feedback and adapt. Don't assume your default is the right default.",
          },
          {
            question: "Have you ever had to work with someone you found genuinely difficult?",
            note: "Be honest and professional. Focus on what you did to make the collaboration work, not on the other person.",
          },
        ]}
      />

      <BehavioralCard
        question='Describe your experience working cross-functionally — with product, design, or non-engineering stakeholders.'
        reallyAsking="Can you operate outside the engineering bubble? Do you translate well?"
        company="olivine"
        signals={['Cross-functional', 'Communication', 'Translation', 'Product thinking']}
        modeType="star"
        starContent={{
          situation: (
            <p>
              At Olivine, the expansion to commercial and industrial users was driven by product strategy, not engineering capability. The PM had the context on what these users needed; engineers had the context on what was technically feasible and what would create debt.
            </p>
          ),
          task: (
            <p>
              Translate between those two contexts productively — especially when requirements were evolving faster than they could be fully specced.
            </p>
          ),
          action: (
            <p>
              I built the habit of writing out my understanding of a requirement before starting work and getting a quick PM confirmation. When I built the onboarding materials, I involved the PM explicitly — because good onboarding isn't just a technical document, it's a product, and she had context I didn't.
            </p>
          ),
          result: (
            <p>
              Fewer surprises at review. The PM had confidence that engineering would flag ambiguity early rather than discover it late. The onboarding materials were better for having her input.
            </p>
          ),
        }}
        honestContent={{
          candid: (
            <p>
              Cross-functional work fails when engineers treat it as "get the requirements, go build." It works when you treat the PM as a collaborator who has context you need, not a spec-dispenser. That's the frame to communicate.
            </p>
          ),
          watchOut: (
            <ul>
              <li>Don't frame this as "I translated PM requirements into code." That's junior framing. Senior framing is "we figured out what to build together."</li>
            </ul>
          ),
        }}
        followUps={[
          {
            question: "What do you do when engineering and product disagree on priority?",
            note: "Make the tradeoff visible. \"If we do X now, it will cost us Y later\" is more useful than \"I disagree.\" Let the decision-maker decide with full information.",
          },
          {
            question: "How do you handle vague requirements?",
            note: "State your assumptions explicitly before starting. Build the simplest version that proves the concept. Invite feedback on the interpretation, not the finished product.",
          },
        ]}
      />
    </SectionContainer>
  );
};
