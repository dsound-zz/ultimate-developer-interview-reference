import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { Callout } from '../../components/Callout';

export const SystemTypeReference: React.FC = () => {
  return (
    <SectionContainer
      id="system-type-reference"
      title="Real-World System Reference"
      category="CASE STUDY REFERENCE"
      accentColor="var(--blue)"
    >
      <SectionCard title="Distributed System CAP Categorization">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Quick reference mapping of typical system designs to their primary CAP constraints under network partition conditions:
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          
          {/* Strongly CP Column */}
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderTop: '3px solid var(--accent)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Strongly CP</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              Consistency over Availability. Returning errors or blocking writes is preferred over serving stale data.
            </p>
            <ul style={{ fontSize: '0.85rem', paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Banking & Payments</strong>: Displaying incorrect balances or executing overdraft transfers during network splits is unacceptable.</li>
              <li><strong>Inventory Systems</strong>: Over-selling items that are out of stock creates physical business failures; writes must lock.</li>
              <li><strong>Distributed Locking</strong>: Ensuring single-ownership coordinates across nodes requires strong linearizable consensus.</li>
              <li><strong>Leader Election</strong>: Systems like ZooKeeper or etcd must prevent "split-brain" dual leaders at all costs.</li>
            </ul>
          </div>

          {/* Strongly AP Column */}
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderTop: '3px solid var(--green)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Strongly AP</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              Availability over Consistency. Serving stale data immediately is preferred over returning errors to users.
            </p>
            <ul style={{ fontSize: '0.85rem', paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Social Media Feeds</strong>: Displaying a post or comment thread delayed by a few seconds is completely unnoticeable to users.</li>
              <li><strong>DNS Resolution</strong>: Serving cached, slightly stale domain-to-IP records is far better than failing browser navigation.</li>
              <li><strong>Search Engines</strong>: Displaying slightly stale index search matches beats returning search system errors.</li>
              <li><strong>Shopping Carts</strong>: e-commerce models (e.g. Amazon Dynamo) keep the cart writeable on any node, merging conflicts later.</li>
            </ul>
          </div>

          {/* Tunable Column */}
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderTop: '3px solid var(--yellow)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--yellow)' }}>Tunable / Context-Driven</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              Systems where different routes/operations configure different levels of consistency.
            </p>
            <ul style={{ fontSize: '0.85rem', paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>E-Commerce Catalogs</strong>: AP when browsing product descriptions and images; CP at checkout transaction phases.</li>
              <li><strong>Collaborative Documents</strong>: AP when typing locally (instant responsiveness); CP/consensus when merging concurrent edits.</li>
              <li><strong>Analytics Dashboards</strong>: AP for viewing real-time traffic charts; CP when generating billing and invoicing summaries.</li>
              <li><strong>Push Notifications</strong>: AP for marketing notifications; CP for multi-factor auth (MFA) tokens.</li>
            </ul>
          </div>

        </div>
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "In production, I decompose systems by operation rather than applying a blanket CAP label to the entire architecture. For example, in an e-commerce platform, browsing products is AP (we serve cached prices and images instantly). But once a user clicks 'Buy', we transition to a CP flow (checking actual stock, capturing payment authorization). Designing this boundary is where senior software engineering happens."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
