import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const HttpRest: React.FC = () => {
  return (
    <SectionContainer
      id="http-rest"
      title="HTTP & REST Fundamentals"
      category="PROTOCOLS"
      accentColor="var(--accent)"
    >
      <SectionCard title="HTTP Methods: Safety & Idempotency">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          <strong>Safe</strong> = doesn't change server state. <strong>Idempotent</strong> = calling it N times has the same effect as calling it once.
        </p>
        <CompareTable
          headers={['Method', 'Safe?', 'Idempotent?', 'Typical Use']}
          columnWidths={['1fr', '1fr', '1fr', '2.5fr']}
          rows={[
            ['GET', 'Yes', 'Yes', 'Retrieve a resource, no side effects'],
            ['POST', 'No', 'No', 'Create a resource or trigger a non-idempotent action'],
            ['PUT', 'No', 'Yes', 'Replace a resource entirely with a known representation'],
            ['PATCH', 'No', 'No (usually)', 'Apply a partial update; idempotent only if the patch is a full-value set, not a delta'],
            ['DELETE', 'No', 'Yes', 'Remove a resource — deleting twice still ends in "gone"'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Status Code Families">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderLeft: '3px solid var(--green)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>2xx — Success</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              <InlineCode>200</InlineCode> OK, <InlineCode>201</InlineCode> Created, <InlineCode>202</InlineCode> Accepted (async work queued), <InlineCode>204</InlineCode> No Content.
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderLeft: '3px solid var(--blue)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--blue)' }}>3xx — Redirection</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              <InlineCode>301</InlineCode> Moved Permanently, <InlineCode>304</InlineCode> Not Modified (cache validation), <InlineCode>307</InlineCode> Temporary Redirect (method preserved).
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderLeft: '3px solid var(--amber)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--amber)' }}>4xx — Client Error</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              <InlineCode>400</InlineCode> Bad Request, <InlineCode>401</InlineCode> Unauthenticated, <InlineCode>403</InlineCode> Unauthorized, <InlineCode>404</InlineCode> Not Found, <InlineCode>409</InlineCode> Conflict, <InlineCode>422</InlineCode> Unprocessable, <InlineCode>429</InlineCode> Too Many Requests.
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderLeft: '3px solid var(--red)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--red)' }}>5xx — Server Error</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              <InlineCode>500</InlineCode> Internal Error, <InlineCode>502</InlineCode> Bad Gateway, <InlineCode>503</InlineCode> Unavailable (often used for backpressure), <InlineCode>504</InlineCode> Gateway Timeout.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Statelessness & Caching Headers">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li>REST mandates <strong>statelessness</strong>: every request carries all the context needed to process it — no server-side session affinity required.</li>
          <li><InlineCode>Cache-Control</InlineCode> directs intermediary and browser caching (<InlineCode>max-age</InlineCode>, <InlineCode>no-store</InlineCode>, <InlineCode>private</InlineCode>).</li>
          <li><InlineCode>ETag</InlineCode> + <InlineCode>If-None-Match</InlineCode> enable cheap revalidation — server replies <InlineCode>304</InlineCode> instead of re-sending the body.</li>
          <li><InlineCode>Authorization</InlineCode> header (not cookies) keeps stateless APIs free of CSRF concerns, since the token must be explicitly attached by the client.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            Returning <InlineCode>200 OK</InlineCode> with <InlineCode>{'{ "error": "..." }'}</InlineCode> in the body. This breaks every HTTP-aware client, proxy, and monitoring tool that keys off status codes — use the actual 4xx/5xx code.
          </Callout>
          <Callout type="senior-signal">
            "I treat PATCH idempotency as a design decision, not a given. If a PATCH body is <InlineCode>{'{ "views": "+1" }'}</InlineCode> it's a delta and not idempotent — replaying it on retry double-counts. I either make the body a full replacement value or attach an idempotency key so retries are safe."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
