import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { FlowRow } from '../../components/FlowRow';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const Testing: React.FC = () => {
  return (
    <SectionContainer
      id="testing"
      title="Testing Strategies"
      category="QUALITY"
      accentColor="var(--accent)"
    >
      <SectionCard title="The Testing Pyramid">
        <FlowRow steps={['Unit (many, fast, cheap)', 'Integration (fewer, slower)', 'E2E (fewest, slowest, brittle)']} />
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: 0 }}>
          The shape is a guide, not a law: most of your confidence should come from fast unit tests close to the code, with a thinner layer of integration tests verifying components wire together correctly, and a minimal set of E2E tests covering critical user flows end-to-end.
        </p>
      </SectionCard>

      <SectionCard title="Mocks vs. Stubs vs. Fakes">
        <CompareTable
          headers={['Test Double', 'Behavior', 'Used to Verify']}
          columnWidths={['1fr', '2fr', '2fr']}
          rows={[
            ['Stub', 'Returns canned responses, no behavior logic', 'State — "given this input, did my function return the right output?"'],
            ['Mock', 'Records calls made to it; assertions check it was called correctly', 'Interaction — "did my code call the payment gateway exactly once, with these args?"'],
            ['Fake', 'A lightweight working implementation (e.g. in-memory DB instead of real Postgres)', 'Behavior over a real-ish dependency, without the cost of the real one'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Contract Testing">
        <Callout type="key-insight">
          When two services evolve independently, an integration test that spins up both is slow and flaky. Contract testing (e.g. Pact) lets the consumer define its expectations of the provider's API as a contract; the provider verifies it still satisfies that contract in CI — without either side needing the other running.
        </Callout>
      </SectionCard>

      <SectionCard title="Test Data & Fixtures">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li>Each test should set up its own data and not depend on execution order or leftover state from a previous test — tests must be runnable in any order, in isolation.</li>
          <li>Prefer factories/builders over giant fixture files — <InlineCode>buildUser({'{ role: "admin" }'})</InlineCode> communicates intent better than a 200-line JSON fixture.</li>
          <li>Reset or roll back database state between tests (transaction rollback per test is the fastest pattern when supported).</li>
        </ul>
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            Testing implementation details instead of behavior — asserting that a private helper method was called, rather than that the public function returned the correct result. These tests break on every refactor even when behavior hasn't changed, training the team to ignore failing tests.
          </Callout>
          <Callout type="senior-signal">
            "I write tests against the contract a caller depends on, not the internals. That means I can refactor the implementation freely as long as the public behavior is unchanged, and the test suite stays a source of confidence instead of a tax on every change."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
