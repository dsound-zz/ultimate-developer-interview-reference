import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const Storage: React.FC = () => {
  return (
    <SectionContainer
      id="storage"
      title="Object Storage"
      category="DURABLE FILES"
      accentColor="var(--green)"
    >
      <SectionCard title="The Problem">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Files — uploads, backups, exports, static assets — need to live somewhere durable, accessible over HTTP, and independent of any single server's disk (which is ephemeral, especially in containers and serverless). Object storage solves this with effectively unlimited capacity and per-object access control, at the cost of not being a real filesystem — there's no in-place edit, only replace.
        </p>
      </SectionCard>

      <SectionCard title="Platforms Compared">
        <CompareTable
          headers={['Platform', 'Provider', 'Notable Trait']}
          columnWidths={['1.2fr', '1fr', '2.8fr']}
          rows={[
            ['S3', 'AWS', 'The original and most widely integrated — most data lake / analytics tooling assumes S3-compatible APIs'],
            ['Cloud Storage', 'GCP', 'Tight integration with BigQuery for direct querying of files in-place'],
            ['Blob Storage', 'Azure', 'Tiered (Hot/Cool/Archive) similar to S3\'s storage classes'],
            ['Cloudflare R2', 'Cloudflare', 'S3-compatible API with zero egress fees — designed specifically to undercut cloud egress costs'],
            ['Firebase Storage', 'Firebase', 'Built for direct, secure access from mobile/web clients via Firebase Auth rules'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Storage Classes / Tiers">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Every major provider offers the same shape of tiering: a default "hot" tier for frequently accessed data, an infrequent-access tier with lower storage cost but a per-retrieval fee, and one or more archive tiers (AWS Glacier, Azure Archive, GCP Coldline/Archive) with minutes-to-hours retrieval time but the lowest possible storage cost — for backups and compliance retention that's rarely, if ever, read.
        </p>
      </SectionCard>

      <SectionCard title="Common Patterns">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li><strong>Presigned URLs</strong>: a time-limited URL granting temporary upload/download access to one object, without making the bucket public or routing bytes through your application server.</li>
          <li><strong>Event notifications</strong>: trigger a function or message automatically when an object is created/deleted — the backbone of most "process this file when it lands" pipelines.</li>
          <li><strong>Static site / CDN origin</strong>: pairing object storage with a CDN is one of the most common, near-zero-maintenance ways to serve a frontend SPA or any static content globally.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            Making a bucket public to "make sharing easier" instead of using presigned URLs or a signed CDN distribution. Public buckets are one of the most common real-world breach causes — almost always more permissive than the actual use case required.
          </Callout>
          <Callout type="senior-signal">
            "Default-private, narrowly-scoped policies, and presigned URLs for any external access — across every provider, not just AWS. I treat 'just make it public' as a request to solve the underlying access problem properly, not a shortcut to take. I also keep <InlineCode>egress cost</InlineCode> in mind early — it's the line item that surprises teams most when traffic grows."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
