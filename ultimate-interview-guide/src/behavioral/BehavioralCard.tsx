import React, { useState } from 'react';
import styles from './BehavioralCard.module.css';
import { CompanyBadge } from '../components/CompanyBadge';
import type { CompanyId } from '../components/CompanyBadge';
import { SignalTag } from '../components/SignalTag';
import { ModeToggle } from '../components/ModeToggle';
import type { InterviewMode } from '../components/ModeToggle';
import { QuoteBlock } from '../components/QuoteBlock';
import { WatchOut } from '../components/WatchOut';
import { FollowUpPanel } from './FollowUpPanel';
import type { FollowUpItem } from './FollowUpPanel';

export interface StarContent {
  situation: React.ReactNode;
  task: React.ReactNode;
  action: React.ReactNode;
  result: React.ReactNode;
}

interface HonestContent {
  candid: React.ReactNode;
  watchOut: React.ReactNode;
  whatIfTheyPush?: React.ReactNode;
  edge?: React.ReactNode; // Optional edge detail if present
}

interface BehavioralCardProps {
  question: string;
  reallyAsking: string; // "What they're really asking"
  company: CompanyId;
  signals: string[];
  modeType: 'star' | 'frame';
  starContent?: StarContent;
  frameContent?: React.ReactNode;
  listeningFor?: React.ReactNode; // Optional interviewer listen signals
  honestContent: HonestContent;
  followUps: FollowUpItem[];
}

export const BehavioralCard: React.FC<BehavioralCardProps> = ({
  question,
  reallyAsking,
  company,
  signals,
  modeType,
  starContent,
  frameContent,
  listeningFor,
  honestContent,
  followUps,
}) => {
  const [viewMode, setViewMode] = useState<InterviewMode>('interview');

  return (
    <div className={styles.card}>
      {/* Top Metadata Row */}
      <div className={styles.header}>
        <div className={styles.badgeRow}>
          <CompanyBadge company={company} />
          <div className={styles.signals}>
            {signals.map((sig, idx) => (
              <SignalTag key={idx}>{sig}</SignalTag>
            ))}
          </div>
        </div>
        <ModeToggle mode={viewMode} onChange={setViewMode} />
      </div>

      {/* Question Header */}
      <div className={styles.questionSection}>
        <h3 className={styles.question}>{question}</h3>
        <p className={styles.reallyAsking}>
          <em>What they're really asking: {reallyAsking}</em>
        </p>
      </div>

      {/* Main Content Area */}
      <div className={styles.body}>
        {viewMode === 'interview' ? (
          <div className={styles.interviewContent}>
            {modeType === 'star' && starContent ? (
              <div className={styles.starContainer}>
                <div className={styles.starSection}>
                  <span className={styles.starLabel}>Situation</span>
                  <div className={styles.starText}>{starContent.situation}</div>
                </div>
                <div className={styles.starSection}>
                  <span className={styles.starLabel}>Task</span>
                  <div className={styles.starText}>{starContent.task}</div>
                </div>
                <div className={styles.starSection}>
                  <span className={styles.starLabel}>Action</span>
                  <div className={styles.starText}>{starContent.action}</div>
                </div>
                <div className={styles.starSection}>
                  <span className={styles.starLabel}>Result</span>
                  <div className={styles.starText}>{starContent.result}</div>
                </div>
              </div>
            ) : (
              <div className={styles.frameContainer}>
                {frameContent}
              </div>
            )}

            {/* Listening For Callout */}
            {listeningFor && (
              <div className={styles.listeningFor}>
                <span className={styles.listeningLabel}>What they're listening for:</span>
                <p className={styles.listeningText}>{listeningFor}</p>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.honestContent}>
            {/* Candid Coaching Quote */}
            <div className={styles.honestBlock}>
              <span className={styles.honestSectionLabel}>Candid Coaching Note</span>
              <QuoteBlock>{honestContent.candid}</QuoteBlock>
            </div>

            {/* Edge details if present */}
            {honestContent.edge && (
              <div className={styles.edgeSection}>
                <span className={styles.honestSectionLabel}>The Edge / Challenge</span>
                <p className={styles.honestText}>{honestContent.edge}</p>
              </div>
            )}

            {/* Watch Out Callout Box */}
            <WatchOut>
              {honestContent.watchOut}
            </WatchOut>

            {/* What If They Push */}
            {honestContent.whatIfTheyPush && (
              <div className={styles.pushSection}>
                <span className={styles.honestSectionLabel}>What if they push?</span>
                <div className={styles.pushText}>
                  {honestContent.whatIfTheyPush}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Follow-up collapsible panel */}
      {followUps.length > 0 && <FollowUpPanel items={followUps} />}
    </div>
  );
};
