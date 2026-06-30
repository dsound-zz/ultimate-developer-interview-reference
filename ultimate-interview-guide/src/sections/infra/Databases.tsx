import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { TradeoffCard } from '../../components/TradeoffCard';
import { Callout } from '../../components/Callout';

export const Databases: React.FC = () => {
  return (
    <SectionContainer
      id="databases"
      title="Managed Databases"
      category="DATA PERSISTENCE"
      accentColor="var(--accent)"
    >
      <SectionCard title="The Problem">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Running a database yourself means owning patching, backups, failover, and scaling — all undifferentiated work that has nothing to do with your product. Managed database services take that operational burden off your plate, but the harder problem underneath doesn't go away: relational, document, key-value, and warehouse data stores all make different tradeoffs, and picking the right shape for your access patterns matters more than which vendor hosts it.
        </p>
      </SectionCard>

      <SectionCard title="Managed Relational & NoSQL Compared">
        <CompareTable
          headers={['Platform', 'Provider', 'Shape', 'Best For']}
          columnWidths={['1.1fr', '1fr', '1.2fr', '2.5fr']}
          rows={[
            ['RDS / Aurora', 'AWS', 'Relational (Postgres, MySQL, etc.)', 'Complex relationships, ACID transactions, ad-hoc SQL queries'],
            ['Cloud SQL / AlloyDB / Spanner', 'GCP', 'Relational / globally-distributed relational', 'Cloud SQL for standard relational; Spanner for global-scale strong consistency'],
            ['Azure SQL DB / Cosmos DB', 'Azure', 'Relational / multi-model NoSQL', 'Cosmos DB spans document, key-value, and graph under one API with tunable consistency'],
            ['DynamoDB', 'AWS', 'Key-value / wide-column', 'High-scale, known access patterns — sessions, leaderboards, IoT data'],
            ['Firestore', 'GCP / Firebase', 'Document, real-time sync', 'Mobile/web apps needing live data sync to clients with minimal backend code'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Firebase: More Than a Database">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Worth calling out separately because it's a different category — Firebase bundles Firestore/Realtime Database with authentication, hosting, and serverless functions into one product aimed at shipping mobile/web apps fast with minimal backend code. The tradeoff is the same as any all-in-one platform: extremely fast to start, harder to migrate off of once you've built deeply against its specific APIs and data model.
        </p>
      </SectionCard>

      <SectionCard title="Operational Databases vs. Data Warehouses">
        <TradeoffCard
          title="Operational DB (Postgres/DynamoDB) vs. Warehouse (Snowflake)"
          gains={[
            'Operational: optimized for fast, frequent, small read/write transactions — what your application runs on.',
            'Operational: low millisecond-scale latency per query.',
            'Snowflake: separates storage and compute, so you scale analytical query power independently of how much data you store.',
            'Snowflake: built for large aggregate scans across billions of rows — the thing operational databases are bad at.',
          ]}
          costs={[
            'Operational: falls over or gets expensive when you run heavy analytical aggregations against it.',
            'Snowflake: not meant for your application\'s live transactional traffic — it\'s a destination for data, not a source of truth your app reads/writes per-request.',
            'Snowflake: data typically arrives via an ETL/ELT pipeline, adding latency before it\'s queryable — not real-time.',
          ]}
        />
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "I choose a database by access pattern, not by what's trendy. If I need ACID transactions and flexible querying, relational. If I need massive horizontal write scale with known query shapes, a key-value store like DynamoDB. If the question is 'how did revenue trend over the last two years across every region,' that's a warehouse question, not something I'd ever run against the production OLTP database."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
