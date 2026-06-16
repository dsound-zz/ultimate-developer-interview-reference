import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { CompanySpecific } from '../behavioral/CompanySpecific';

export const CompanySpecificQuestions: React.FC = () => {
  return (
    <SectionContainer
      id="company-specific"
      title="Company-Specific Questions"
      category="TAILORING TEMPLATES"
      accentColor="var(--accent)"
    >
      <CompanySpecific
        typeLabel="Mission-Driven / Social Impact"
        recommendedStory="RethinkFirst (Healthcare stakes of correctness) or Olivine (Clean energy transition impact)"
        framing={
          <p>
            Frame your work as serving the larger mission. At <em>RethinkFirst</em>, emphasize how clinical software requires strict correctness because real therapists and families rely on it. At <em>Olivine</em>, connect the commercial/residential scaling work to driving the clean energy transition.
          </p>
        }
        listeningFor="Empathy, responsibility, and an understanding that the product has real-world consequences beyond code performance metrics."
      />

      <CompanySpecific
        typeLabel="Data-Heavy / Analytics"
        recommendedStory="Avandar Labs (DuckDB-WASM browser queries)"
        framing={
          <p>
            Frame the choice of browser-side query execution as a way to simplify data exploration. Explain how client-side WASM processing, HTTP Range requests on Parquet files, and zero-copy Apache Arrow memory transfer reduced costs and made query speeds near-instant.
          </p>
        }
        listeningFor="Strong understanding of data lifecycle, memory layouts, compression (Parquet), performance optimization, and client vs server tradeoffs."
      />

      <CompanySpecific
        typeLabel="AI-First / Production AI"
        recommendedStory="Avandar Labs (LLM pipelines) + NEC Labs (MCP protocol server work)"
        framing={
          <p>
            Emphasize how you integrated models into the user experience, rather than just writing model logic. Talk about LLM pipeline state management, context limits, and using Model Context Protocol (MCP) to bridge developer workflows with production APIs.
          </p>
        }
        listeningFor="Pragmatic AI development, understanding LLM latency characteristics, agentic workflow reliability, and protocol integration."
      />

      <CompanySpecific
        typeLabel="Scale-Focused / High-Growth"
        recommendedStory="Olivine (Commercial/Industrial expansion + cursor-based pagination)"
        framing={
          <p>
            Talk about how you adapted interfaces and APIs for high-volume data. Emphasize replacing legacy offsets with cursor-based pagination to prevent DB lockups, and handling dynamic layouts as the platform transitioned from small residential users to large enterprises.
          </p>
        }
        listeningFor="Systems thinking, prevention of database bottlenecks, API design patterns for high throughput, and performance-critical UI design."
      />

      <CompanySpecific
        typeLabel="Early-Stage / Startup"
        recommendedStory="Avandar Labs (Small team, high autonomy, rapid delivery)"
        framing={
          <p>
            Highlight your comfort with ambiguity, direct line of communication with leadership, and taking end-to-end ownership of features (from prototyping to production) in small, high-velocity environments where shipping fast beats perfect spec sheets.
          </p>
        }
        listeningFor="Generalist mindset, speed of execution, comfort with high ambiguity, and ability to manage multiple responsibilities."
      />

      <CompanySpecific
        typeLabel="Enterprise / Process-Heavy"
        recommendedStory="Olivine Inc (PM collaboration, onboarding tours, architectural docs)"
        framing={
          <p>
            Focus on how you align engineering priorities with product requirements, build consensus across stakeholders, and document processes to reduce knowledge fragmentation across large or growing teams.
          </p>
        }
        listeningFor="Communication skills, stakeholder alignment, documentation discipline, and ability to navigate process and compliance requirements constructively."
      />
    </SectionContainer>
  );
};
