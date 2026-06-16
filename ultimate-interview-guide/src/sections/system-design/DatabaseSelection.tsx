import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { Callout } from '../../components/Callout';

export const DatabaseSelection: React.FC = () => {
  return (
    <SectionContainer
      id="database-selection"
      title="Database Selection"
      category="DATA STORAGE"
      accentColor="var(--accent)"
    >
      <SectionCard title="Database Selection Framework">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Avoid choosing databases by familiarity. Evaluate structural constraints using four core questions:
        </p>
        <ol style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem', margin: 0 }}>
          <li>
            <strong>Is the data highly relational?</strong> Do you need transaction boundaries, multi-table joins, and strict schema validation? → <em>Relational (Postgres, MySQL)</em>
          </li>
          <li>
            <strong>Do you need massive horizontal write scale?</strong> Are writes exceeding the throughput capacity of a single master node? → <em>NoSQL (Cassandra, DynamoDB, MongoDB)</em>
          </li>
          <li>
            <strong>Is the data defined by complex relationships?</strong> Are you traversing network graphs with deep connections (e.g. social maps, fraud rings)? → <em>Graph DB (Neo4j)</em>
          </li>
          <li>
            <strong>Do you need sub-millisecond lookups on simple key/value structures?</strong> → <em>In-memory (Redis, Memcached)</em>
          </li>
        </ol>
      </SectionCard>

      <SectionCard title="Database Types Comparison">
        <CompareTable
          headers={['Type', 'Best For', 'Weak At', 'Examples', 'Consistency']}
          columnWidths={['1fr', '1.5fr', '1.5fr', '1fr', '1fr']}
          rows={[
            ['Relational (RDBMS)', 'Complex queries, multi-table joins, ACID transactions', 'Horizontal write scaling', 'Postgres, MySQL', 'Strong (ACID)'],
            ['Document', 'Flexible schema, nested hierarchical records, per-user data', 'Complex joins, multi-document transactions', 'MongoDB, Firestore', 'Eventual / Strong'],
            ['Wide-Column', 'Heavy writes, time-series logs, massive multi-petabyte scales', 'Ad-hoc query filters, joins', 'Cassandra, HBase', 'Tunable'],
            ['Key-Value', 'Caching, session stores, fast lookup by simple ID', 'Querying on non-key attributes', 'Redis, DynamoDB', 'Varies'],
            ['Graph', 'Relationship traversal, social networks, fraud graphs', 'Bulk sequential updates, batch analytics', 'Neo4j, Neptune', 'Strong'],
            ['Search', 'Full-text search, fuzzy matching, ranking', 'High-throughput transactional writes', 'Elasticsearch, Typesense', 'Eventually consistent'],
            ['Time-Series', 'Sensor telemetry, clickstream logs, metrics over time', 'General-purpose CRUD operations', 'InfluxDB, TimescaleDB', 'Eventual'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Indexing Strategies">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>B-Tree Index (Default)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              The standard index type. Self-balancing tree structure optimized for range queries (`WHERE age &gt; 30`) and equality matches.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Hash Index</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Optimized for exact equality matches (`WHERE id = 123`). Faster than B-tree for single lookups, but does not support range queries.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--cyan)' }}>Composite Index (Multi-Column)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Indexes multiple columns (`last_name, first_name`). Follows the <em>leftmost prefix rule</em>: must search on `last_name` first to utilize the index.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--yellow)' }}>Partial Index</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Only indexes rows matching a specific clause (`WHERE status = 'active'`). Reduces disk space and improves write performance.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            <strong>The N+1 Query Problem</strong>: Occurs when an application fetches a parent list of 100 rows, then issues 100 individual database queries to retrieve child details.
            <br /><em>Fix:</em> Use SQL `JOIN`s, pre-fetch queries in batches, or use select-related features in ORMs.
          </Callout>

          <Callout type="senior-signal">
            "I never pick a database by popularity or familiarity. I always drive the decision from three inputs: the read/write ratio, the specific query access patterns (what filters are applied?), and the size of the largest entity. Relational Postgres is my default unless write volume requires Wide-column scaling or lookups require in-memory speed."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
