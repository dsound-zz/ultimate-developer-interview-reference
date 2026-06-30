import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { TradeoffCard } from '../../components/TradeoffCard';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const ArchitecturePatterns: React.FC = () => {
  return (
    <SectionContainer
      id="architecture-patterns"
      title="Architecture & Design Patterns"
      category="ARCHITECTURE"
      accentColor="var(--blue)"
    >
      <SectionCard title="Layered / Hexagonal / Clean Architecture">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Layered (N-Tier)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Controller → Service → Repository → Database, each layer only calling the one beneath it. Simple, familiar, but business logic can leak into controllers if discipline slips.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Hexagonal (Ports & Adapters)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Core domain logic depends on abstract "ports"; concrete "adapters" (a Postgres repository, a REST controller) plug in from the outside. The domain has zero knowledge of HTTP or SQL.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--blue)' }}>Clean Architecture</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Concentric rings with dependencies pointing strictly inward — frameworks and infrastructure are the outermost, replaceable ring; business rules are the innermost, most stable ring.</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="SOLID, Quickly">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li><strong>S</strong>ingle Responsibility — a class/module should have one reason to change.</li>
          <li><strong>O</strong>pen/Closed — extend behavior without modifying existing, tested code (e.g. via new strategy implementations, not branching deeper into an existing function).</li>
          <li><strong>L</strong>iskov Substitution — a subtype must be usable anywhere its base type is expected, without surprising behavior.</li>
          <li><strong>I</strong>nterface Segregation — prefer several small, focused interfaces over one bloated one that forces implementers to support methods they don't need.</li>
          <li><strong>D</strong>ependency Inversion — depend on abstractions, not concrete implementations — this is what makes a database swap or a mock-in-tests possible.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Common Patterns You'll Actually Use">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li><strong>Repository</strong>: abstracts persistence behind a domain-shaped interface (<InlineCode>findById</InlineCode>, <InlineCode>save</InlineCode>) so the rest of the app never talks SQL directly.</li>
          <li><strong>Factory</strong>: centralizes object construction logic, especially when creation depends on runtime conditions (which payment processor implementation to instantiate).</li>
          <li><strong>Strategy</strong>: swaps an algorithm at runtime behind a common interface (different pricing rules, different shipping calculators).</li>
          <li><strong>Dependency Injection</strong>: dependencies are passed in rather than constructed internally — the backbone that makes testability and the patterns above practical.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Monolith vs. Microservices — the Code-Level Lens">
        <TradeoffCard
          title="Modular Monolith vs. Microservices"
          gains={[
            'Monolith: one deploy, one transaction boundary, trivial cross-module refactors, no network calls between modules.',
            'Monolith: far simpler local development and debugging — one process, one stack trace.',
            'Microservices: independent scaling and deployment per service.',
            'Microservices: failure isolation — one service\'s outage doesn\'t necessarily take down the rest.',
          ]}
          costs={[
            'Monolith: scaling is all-or-nothing; a hot module forces scaling the whole app.',
            'Monolith: a team boundary mismatch — many teams shipping to one codebase causes coordination overhead.',
            'Microservices: network calls replace function calls — new latency, new failure modes, new debugging surface.',
            'Microservices: operational overhead — N services means N deployment pipelines, N sets of dashboards, distributed transactions to reason about.',
          ]}
        />
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            Splitting into microservices before the team or the domain boundaries are well understood. Premature decomposition tends to draw service boundaries around technical layers rather than business capabilities, producing chatty, tightly-coupled services that are worse than the monolith they replaced.
          </Callout>
          <Callout type="senior-signal">
            "I default to a modular monolith with clean internal boundaries — clear interfaces between modules, no direct cross-module database access. If a module's boundary is already clean and well-understood, peeling it into its own service later is mechanical. Doing it the other way around, untangling a tightly-coupled distributed system, is much harder."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
