import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { FlowRow } from '../../components/FlowRow';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const DataEngineering: React.FC = () => {
  return (
    <SectionContainer
      id="data-engineering"
      title="Data Engineering & ETL"
      category="MOVING & SHAPING DATA"
      accentColor="var(--blue)"
    >
      <SectionCard title="The Problem">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Raw data rarely lives where — or in the shape — it needs to be queried. A folder of JSON event logs in object storage isn't a queryable table until something infers its schema; an analytics dashboard needs aggregated data, not raw transactional rows. ETL/ELT platforms extract data from a source, transform it into a usable shape, and load it somewhere queryable — at a scale beyond what a single script or cron job can reliably handle.
        </p>
      </SectionCard>

      <SectionCard title="Platforms Compared">
        <CompareTable
          headers={['Platform', 'Provider', 'Model', 'Notable Trait']}
          columnWidths={['1.1fr', '1fr', '1.3fr', '2.3fr']}
          rows={[
            ['AWS Glue', 'AWS', 'Serverless Spark + metadata catalog', 'Crawlers auto-discover schema from raw files in S3'],
            ['Dataflow / Dataproc', 'GCP', 'Serverless Beam / managed Spark+Hadoop', 'Dataflow unifies batch and streaming under one Apache Beam model'],
            ['Data Factory', 'Azure', 'Visual pipeline orchestration', 'Strong low-code/visual pipeline design for less code-heavy teams'],
            ['Databricks', 'Multi-cloud', 'Managed Spark + notebooks', 'Popular for data science-adjacent teams wanting notebooks and Spark together'],
            ['Snowflake', 'Multi-cloud (SaaS)', 'ELT — load raw, transform with SQL inside the warehouse', 'Shifts transformation into SQL after loading, rather than before'],
            ['Apache Airflow', 'Self/managed (any cloud)', 'Pipeline orchestration (DAGs)', 'The de facto standard for scheduling and sequencing data pipeline steps'],
          ]}
        />
      </SectionCard>

      <SectionCard title="The Classic Pattern">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Object storage (S3/GCS/Blob) + a catalog/crawler (Glue, Dataproc Metastore) + a query engine (Athena, BigQuery) is one of the most common data lake patterns across every cloud — land raw data, infer/register its schema, then query it with SQL without ever provisioning a database server:
        </p>
        <FlowRow steps={['Raw files in object storage', 'Crawler / schema discovery', 'Catalog (table schema)', 'ETL transform job', 'SQL query engine']} />
      </SectionCard>

      <SectionCard title="ETL vs. ELT">
        <Callout type="key-insight">
          <strong>ETL</strong> transforms data <em>before</em> loading it into the destination — the destination only ever sees clean data. <strong>ELT</strong> (Snowflake's model, and increasingly the industry default) loads raw data first and transforms it afterward using the destination's own compute — taking advantage of warehouses that have become cheap and powerful enough to do transformation work themselves, and keeping the raw data around for re-processing if requirements change.
        </Callout>
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "I reach for a distributed ETL platform like Glue or Dataflow when the transformation needs genuine distributed compute over large datasets, or when I want a shared schema catalog across teams. For a small, frequent, low-latency transformation — normalizing one incoming webhook payload — a serverless function is almost always the better fit; spinning up a Spark job for that is solving a problem you don't have."
          {' '}
          <InlineCode>Airflow</InlineCode> or an equivalent orchestrator becomes worth adopting once you have more than a couple of pipeline steps with real dependencies between them — before that, a single scheduled job is simpler and just as correct.
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
