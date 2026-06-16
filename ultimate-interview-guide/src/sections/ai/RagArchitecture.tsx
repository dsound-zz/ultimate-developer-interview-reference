import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { Callout } from '../../components/Callout';
import { RagPipeline } from '../../diagrams/ai/RagPipeline';
import { PatternCard } from '../../components/PatternCard';

export const RagArchitecture: React.FC = () => {
  return (
    <SectionContainer
      id="rag-architecture"
      title="RAG Architecture"
      category="APPLIED ARCHITECTURES"
      accentColor="var(--accent)"
    >
      <SectionCard title="Ingestion & Retrieval Pipeline">
        <p style={{ marginBottom: '16px' }}>
          Retrieval-Augmented Generation (RAG) grounds LLM outputs in verified external documents. Below is the ingestion and retrieval flow:
        </p>
        <div style={{ padding: '16px', border: '1px solid var(--border-subtle)', borderRadius: '8px', backgroundColor: 'var(--background)' }}>
          <RagPipeline />
        </div>
      </SectionCard>

      <SectionCard title="Chunking Strategies: Fixed vs. Semantic">
        <ul>
          <li><strong>Fixed-Size Chunking</strong>: Splitting text into fixed character counts (e.g. 500 characters with 50-character overlap). Simple but frequently cuts off sentences in the middle of a concept, breaking semantic continuity.</li>
          <li><strong>Recursive Character Chunking</strong>: Splitting by a hierarchy of separators (paragraphs, sentences, spaces) to keep semantic blocks together while respecting length boundaries.</li>
          <li><strong>Semantic Chunking</strong>: Using distance thresholds between consecutive sentence embeddings to split text when semantic topics change. Most accurate, but requires embedding model calls during preprocessing.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Hybrid Search & Re-Ranking">
        <ul>
          <li><strong>Dense Semantic Search</strong>: Uses embedding vectors to find matching concepts. Excellent at finding conceptual matches (e.g., matching "OOM" to "out of memory") but fails on exact strings like product codes.</li>
          <li><strong>Sparse Search (BM25)</strong>: Uses keyword statistics to match exact strings (like serial numbers or API names).</li>
          <li><strong>Reciprocal Rank Fusion (RRF) & Re-Rankers</strong>: Combines dense and sparse search results. A secondary, highly-accurate model (a cross-encoder re-ranker) then grades the top 20 retrieved chunks, selecting the top 5 to insert into the LLM context.</li>
        </ul>
        <Callout type="senior-signal">
          "A naive vector search has low accuracy on exact ID lookups. In production, always pair vector search with sparse keyword indexing (like Elasticsearch or pg_trgm in Postgres) in a hybrid query. Follow this with a re-ranking step (e.g., Cohere Re-rank) to strip context noise."
        </Callout>
      </SectionCard>

      <PatternCard
        patternName="Recursive Chunking & Metadata Ingestion"
        code={`interface Document {
  id: string;
  content: string;
  category: string;
}

export function chunkDocument(doc: Document, maxChunkSize = 800): Array<{
  docId: string;
  chunkContent: string;
  metadata: Record<string, string>;
}> {
  const chunks = [];
  const paragraphs = doc.content.split('\\n\\n');

  let currentChunk = '';

  for (const para of paragraphs) {
    // If paragraph fits, append it
    if ((currentChunk + para).length <= maxChunkSize) {
      currentChunk += (currentChunk ? '\\n\\n' : '') + para;
    } else {
      // Push existing, start new
      if (currentChunk) {
        chunks.push({
          docId: doc.id,
          chunkContent: currentChunk,
          metadata: { category: doc.category, length: String(currentChunk.length) }
        });
      }
      currentChunk = para;
    }
  }

  if (currentChunk) {
    chunks.push({
      docId: doc.id,
      chunkContent: currentChunk,
      metadata: { category: doc.category, length: String(currentChunk.length) }
    });
  }

  return chunks;
}`}
        description="A simple recursive character chunking algorithm grouping document paragraphs by semantic blocks and associating metadata tags."
      />
    </SectionContainer>
  );
};
