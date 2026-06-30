import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { StepList } from '../../components/StepList';
import { CodeBlock } from '../../components/CodeBlock';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const Auth: React.FC = () => {
  return (
    <SectionContainer
      id="auth"
      title="Authentication & Authorization"
      category="SECURITY"
      accentColor="var(--red)"
    >
      <SectionCard title="Authentication vs. Authorization">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          <strong>Authentication</strong> answers "who are you?" <strong>Authorization</strong> answers "what are you allowed to do?" A valid token proves identity; it doesn't automatically grant access to every resource.
        </p>
      </SectionCard>

      <SectionCard title="Session Cookies vs. Token-Based Auth">
        <CompareTable
          headers={['Approach', 'State', 'Revocation', 'Best For']}
          columnWidths={['1.2fr', '1.3fr', '1.5fr', '2fr']}
          rows={[
            ['Session cookie', 'Server-side (session store / Redis)', 'Instant — delete the session record', 'Traditional web apps, same-origin clients'],
            ['JWT (stateless)', 'Client-side, self-contained', 'Hard — must wait for expiry or maintain a denylist', 'Mobile/SPA clients, microservices avoiding a shared session store'],
            ['Opaque token + introspection', 'Server-side, looked up per request', 'Instant', 'APIs needing both statelessness at the edge and fast revocation'],
          ]}
        />
      </SectionCard>

      <SectionCard title="JWT Anatomy">
        <CodeBlock code={`header.payload.signature

// header (base64url JSON)
{ "alg": "HS256", "typ": "JWT" }

// payload (base64url JSON) — NOT encrypted, just encoded
{ "sub": "user_123", "role": "admin", "exp": 1735689600 }

// signature = HMAC-SHA256(base64url(header) + "." + base64url(payload), secret)`} />
        <Callout type="trap">
          The payload is base64-encoded, not encrypted — anyone can decode and read it. Never put secrets, passwords, or sensitive PII in a JWT payload.
        </Callout>
      </SectionCard>

      <SectionCard title="OAuth 2.0 Authorization Code Flow">
        <StepList
          steps={[
            <span key="1">User clicks "Log in" — app redirects to the authorization server with a <InlineCode>client_id</InlineCode> and <InlineCode>redirect_uri</InlineCode>.</span>,
            <span key="2">User authenticates and consents; the authorization server redirects back with a short-lived <InlineCode>code</InlineCode>.</span>,
            <span key="3">App's backend exchanges the <InlineCode>code</InlineCode> for an access token + refresh token (this exchange requires a client secret, kept server-side).</span>,
            <span key="4">App calls the resource server with <InlineCode>Authorization: Bearer &lt;access_token&gt;</InlineCode>; refresh token is used later to mint a new access token without re-prompting login.</span>,
          ]}
        />
        <Callout type="key-insight">
          OIDC (OpenID Connect) is a thin identity layer on top of OAuth2 — it adds the <InlineCode>id_token</InlineCode> (a JWT describing who the user is), since OAuth2 itself was only ever designed for delegated authorization, not authentication.
        </Callout>
      </SectionCard>

      <SectionCard title="RBAC vs. ABAC">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
          <li><strong>RBAC</strong> (Role-Based): permissions attach to roles (<InlineCode>admin</InlineCode>, <InlineCode>editor</InlineCode>), users get roles. Simple to reason about, but coarse-grained.</li>
          <li><strong>ABAC</strong> (Attribute-Based): permissions are evaluated against attributes of the user, resource, and context (e.g. "owner of this document, during business hours"). Flexible, but harder to audit.</li>
          <li>Most production systems are hybrid: RBAC for coarse access tiers, ABAC-style ownership checks (<InlineCode>resource.ownerId === user.id</InlineCode>) layered on top.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            Storing JWTs in <InlineCode>localStorage</InlineCode>. Any XSS vulnerability anywhere on the page can read it and exfiltrate the token. <InlineCode>httpOnly</InlineCode>, <InlineCode>Secure</InlineCode>, <InlineCode>SameSite=Strict</InlineCode> cookies are the safer default for browser clients.
          </Callout>
          <Callout type="senior-signal">
            "I always design for token revocation up front, even with JWTs. Either I keep access token lifetimes short (minutes, not days) and rely on refresh-token rotation, or I accept the statelessness tradeoff isn't worth it and use opaque tokens with server-side introspection."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
