import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { TradeoffCard } from '../../components/TradeoffCard';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const Security: React.FC = () => {
  return (
    <SectionContainer
      id="security"
      title="Security Fundamentals"
      category="SECURITY"
      accentColor="var(--red)"
    >
      <SectionCard title="High-Impact Risks for Backend Engineers">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderLeft: '3px solid var(--red)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Injection</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>SQL/NoSQL/command injection from concatenating untrusted input into a query or shell command. Fix: parameterized queries, never string-build SQL.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderLeft: '3px solid var(--red)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Broken Access Control</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Missing ownership checks — e.g. <InlineCode>GET /invoices/123</InlineCode> returns any user's invoice if you don't verify the requester owns it (IDOR).</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderLeft: '3px solid var(--red)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>SSRF</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Server-side requests to attacker-controlled URLs (e.g. "fetch this image URL") can be redirected to internal metadata endpoints or private network services.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderLeft: '3px solid var(--red)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Insecure Deserialization</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Deserializing untrusted data (e.g. pickled objects, certain JSON libraries) can lead to remote code execution.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderLeft: '3px solid var(--red)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Sensitive Data Exposure</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Plaintext secrets in logs, unencrypted PII at rest, or API responses that over-return fields the client never needed.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', borderLeft: '3px solid var(--red)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Security Misconfiguration</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Default credentials, verbose stack traces leaking to clients, overly permissive CORS (<InlineCode>Access-Control-Allow-Origin: *</InlineCode> with credentials).</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Input Validation & Output Encoding">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li>Validate at the boundary — reject malformed input as early as possible, with an allowlist (accept known-good shapes) rather than a denylist (block known-bad patterns).</li>
          <li>Parameterized queries / prepared statements neutralize SQL injection by separating code from data — the database never interprets user input as SQL syntax.</li>
          <li>Encode output for its destination context: HTML-escape for HTML, JSON-escape for JSON — the same string can be dangerous in one context and safe in another.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Secrets Management">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li>Never commit secrets to source control — not even in a "private" repo. Git history is forever.</li>
          <li>Prefer a secrets manager (Vault, AWS Secrets Manager) over plain environment variables for anything beyond local development — it adds rotation, audit logs, and fine-grained access.</li>
          <li>Rotate credentials on a schedule and immediately on suspected compromise or employee offboarding.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Rate Limiting Strategies">
        <TradeoffCard
          title="Token Bucket vs. Fixed Window Counter"
          gains={[
            'Token bucket: smooths bursts gracefully — allows a burst up to bucket capacity, then throttles to the refill rate.',
            'Token bucket: simple per-key state (tokens remaining, last refill time).',
            'Fixed window: trivial to implement and reason about (a counter that resets every N seconds).',
            'Fixed window: very cheap — a single incrementing counter per key per window.',
          ]}
          costs={[
            'Token bucket: slightly more bookkeeping than a plain counter.',
            'Fixed window: vulnerable to boundary bursts — 2x the limit can slip through right at a window edge (e.g. end of one window + start of next).',
            'Fixed window: less smooth — allows a full burst at any single instant within the window.',
          ]}
        />
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            Checking authorization only at the UI layer (hiding a button) and not re-checking it on the API endpoint itself. Any client can call the endpoint directly, bypassing the UI entirely — authorization must be enforced server-side, every time.
          </Callout>
          <Callout type="senior-signal">
            "I treat every external input — query params, headers, request bodies, even data from another internal service — as untrusted until validated. I'd rather over-validate at the boundary than rely on every downstream consumer remembering to sanitize."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
