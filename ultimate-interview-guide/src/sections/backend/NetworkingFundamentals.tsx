import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { StepList } from '../../components/StepList';
import { FlowRow } from '../../components/FlowRow';
import { Callout } from '../../components/Callout';

export const NetworkingFundamentals: React.FC = () => {
  return (
    <SectionContainer
      id="networking-fundamentals"
      title="Networking Fundamentals"
      category="NETWORKING"
      accentColor="var(--blue)"
    >
      <SectionCard title="TCP vs. UDP">
        <CompareTable
          headers={['Protocol', 'Guarantees', 'Overhead', 'Typical Use']}
          columnWidths={['1fr', '2fr', '1.2fr', '2fr']}
          rows={[
            ['TCP', 'Ordered delivery, retransmission, congestion control', 'Higher (handshake + ACKs)', 'HTTP/1.1, HTTP/2, gRPC, database connections'],
            ['UDP', 'Best-effort, no ordering or retry guarantees', 'Minimal', 'DNS lookups, video/voice streaming, QUIC/HTTP/3'],
          ]}
        />
      </SectionCard>

      <SectionCard title="DNS Resolution Path">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          A cache miss at every layer means a full round trip down the hierarchy before a single byte of the actual request is sent:
        </p>
        <FlowRow steps={['Browser cache', 'OS cache', 'Recursive resolver', 'Root server', 'TLD server', 'Authoritative server']} />
      </SectionCard>

      <SectionCard title="The TLS 1.3 Handshake">
        <StepList
          steps={[
            <span key="1"><strong>ClientHello</strong> — client sends supported cipher suites and a key share</span>,
            <span key="2"><strong>ServerHello + certificate</strong> — server picks a cipher, returns its cert and a key share</span>,
            <span key="3"><strong>Key derivation</strong> — both sides independently compute the same symmetric session key (Diffie-Hellman)</span>,
            <span key="4"><strong>Finished</strong> — encrypted handshake confirmation; application data can now flow</span>,
          ]}
        />
        <Callout type="key-insight">
          TLS 1.3 collapses the handshake to one round trip (down from two in TLS 1.2) by having the client guess the server's preferred key exchange parameters upfront. This is most of why HTTPS connection setup got noticeably faster.
        </Callout>
      </SectionCard>

      <SectionCard title="Connection Reuse">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li><strong>Keep-Alive</strong>: reuses one TCP connection across multiple HTTP/1.1 requests, avoiding repeated handshakes.</li>
          <li><strong>HTTP/2 multiplexing</strong>: many concurrent request/response streams share a single TCP connection, eliminating head-of-line blocking at the application layer.</li>
          <li><strong>Connection pooling</strong>: backend services keep a pool of warm database/HTTP connections open rather than paying handshake cost per request.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Senior Signal">
        <Callout type="senior-signal">
          "When latency matters, I think in round trips, not bytes. A request that needs DNS resolution, a TCP handshake, a TLS handshake, and then the actual HTTP exchange can spend more time negotiating the connection than transferring data. That's why connection reuse, DNS caching, and HTTP/2 matter more for tail latency than payload size optimization in most APIs."
        </Callout>
      </SectionCard>
    </SectionContainer>
  );
};
