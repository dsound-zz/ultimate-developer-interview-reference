import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { TradeoffCard } from '../../components/TradeoffCard';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const Auth: React.FC = () => {
  return (
    <SectionContainer
      id="auth"
      title="Auth"
      category="WHO ARE YOU & WHAT CAN YOU DO"
      accentColor="var(--blue)"
    >
      <SectionCard title="The Problem">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Auth is two distinct problems that get conflated. <strong>Authentication</strong> (AuthN) is proving identity: "are you who you say you are?" <strong>Authorization</strong> (AuthZ) is enforcing permissions: "okay, and are you allowed to do this specific thing?" Getting either one wrong creates either a security breach (someone accesses what they should not) or a broken product (legitimate users get locked out of what they should). The challenge is that both problems feel simple to start and become deeply complex as the system grows — adding SSO, multi-tenancy, fine-grained permissions, token refresh, and audit logging all while users are actively depending on the auth path staying up.
        </p>
      </SectionCard>

      <SectionCard title="The Auth Patterns">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Username + Password</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>The oldest pattern. Credentials stored (hashed) in your own database. You own the full flow — and the full liability: password resets, breach exposure, brute-force protection, MFA wiring.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>OAuth 2.0 / OIDC</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Delegate authentication to a trusted identity provider ("Sign in with Google"). OIDC layers identity (who the user is) on top of OAuth 2.0 (what they can access). You never see the password — you get a signed token.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--blue)' }}>SSO (SAML / OIDC)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Enterprise: one login grants access to all connected apps. The company&apos;s Identity Provider (Okta, Entra ID) is the single source of truth. SAML is the older XML-based standard; OIDC is the modern JSON/JWT approach.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--amber)' }}>API Keys / Service Tokens</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Machine-to-machine auth where there is no human in the loop. A long-lived secret or short-lived signed JWT passed in a header. The risk: leaked keys have no expiry unless you build rotation.</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="How Tokens Work: JWT Basics">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Most modern auth flows issue a <strong>JSON Web Token (JWT)</strong> after login. A JWT is a base64-encoded, cryptographically signed payload — <InlineCode>header.payload.signature</InlineCode>. Any service holding the signing key (or its public key counterpart) can verify the token without hitting the database on every request.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ padding: '0.875rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)', fontSize: '0.85rem' }}>Access Token</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Short-lived (minutes to an hour). Sent on every API request. Stateless verification — no DB lookup needed.</p>
          </div>
          <div style={{ padding: '0.875rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--amber)', fontSize: '0.85rem' }}>Refresh Token</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Long-lived (days to weeks). Used only to get new access tokens. Stored securely (httpOnly cookie), revocable server-side.</p>
          </div>
        </div>
        <Callout type="trap">
          Putting sensitive data (PII, permissions that could change) directly in the JWT payload and then caching it aggressively. The token is signed, not encrypted — anyone who holds it can base64-decode the payload. And stale permissions live until the token expires, which bites you when you revoke access and users stay "in" for another 55 minutes.
        </Callout>
      </SectionCard>

      <SectionCard title="Auth Vendors Compared">
        <CompareTable
          headers={['Platform', 'Provider', 'Best Fit']}
          columnWidths={['1.4fr', '1.2fr', '3.4fr']}
          rows={[
            ['Cognito', 'AWS', 'User pools (consumer-facing auth with email/social login) + Identity Pools (federated access to AWS resources). Tightly integrated with the AWS ecosystem, notoriously sharp edges to configure, but zero extra infrastructure if you\'re already AWS-native.'],
            ['Microsoft Entra ID', 'Microsoft (Azure)', 'The enterprise identity standard — the dominant SSO/SAML/OIDC provider in large organizations. If your B2B customer\'s IT department is involved, you\'re almost certainly integrating with Entra ID (formerly Azure AD).'],
            ['Okta', 'Independent (Workforce Identity)', 'Enterprise workforce SSO and lifecycle management — provisioning and deprovisioning users across hundreds of connected SaaS apps. The market leader for large enterprise IT.'],
            ['Auth0', 'Okta (Customer Identity)', 'Developer-friendly hosted auth — handles email/password, social, MFA, enterprise SSO connections, and customizable login UI. Lower setup cost than rolling your own, higher than a thin SDK wrapper.'],
            ['Clerk', 'Independent', 'Modern developer experience focus — pre-built UI components, easy Next.js/React integration, handles sessions/JWTs/MFA/OAuth out of the box. Popular for startups that want fast, clean auth without a lot of config.'],
            ['Firebase Auth', 'Google (GCP)', 'Consumer-facing mobile/web auth with social providers and phone number support. Tightly integrated with Firestore/Firebase ecosystem. Free tier is generous; not a fit for enterprise SSO requirements.'],
            ['Google Identity / OIDC', 'Google', '"Sign in with Google" — the OIDC flow for consumer apps where Google accounts are an acceptable identity source. Not a full auth platform; just one delegated login option.'],
          ]}
        />
      </SectionCard>

      <SectionCard title="DIY vs. Managed Auth Platform">
        <TradeoffCard
          title="Rolling your own vs. Auth0 / Clerk / Cognito"
          gains={[
            'DIY: full control over the data model, storage, and auth flow — no vendor dependency.',
            'DIY: no per-MAU billing that becomes painful as you scale.',
            'Managed: handles MFA, social login, token rotation, brute-force protection, and compliance features out of the box.',
            'Managed: faster time to launch — auth UX is notoriously hard to get right and test thoroughly.',
          ]}
          costs={[
            'DIY: you now own the hardest part of the security surface. Password reset flows, session management, MFA, and breach response are all yours.',
            'DIY: auth is also a compliance problem (SOC2, GDPR session handling, audit logs) — managed platforms come with that coverage.',
            'Managed: per-MAU pricing can become significant at consumer scale (Auth0 especially).',
            'Managed: customizing beyond the vendor\'s happy path (custom session logic, unusual token claims) often hits a wall.',
          ]}
        />
      </SectionCard>

      <SectionCard title="SSO Deep Dive">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Single Sign-On (SSO) means one login grants access to multiple applications. The user authenticates once against an Identity Provider (IdP), which then asserts their identity to any connected Service Provider (SP) app. For B2B products, SSO support is often a hard enterprise sales requirement — large companies will not let employees create per-app username/password accounts.
        </p>
        <CompareTable
          headers={['Protocol', 'Format', 'When to Use']}
          columnWidths={['1fr', '1.2fr', '3.8fr']}
          rows={[
            ['SAML 2.0', 'XML assertions', 'Enterprise legacy standard — if your customer uses Okta, Entra ID, or any enterprise IdP built before ~2015, they almost certainly speak SAML. You need to support it to close B2B deals with large companies.'],
            ['OIDC', 'JSON / JWT', 'Modern default — built on OAuth 2.0. Easier to implement, better tooling, native to web/mobile. New enterprise IdPs support it; use OIDC unless the customer specifically requires SAML.'],
          ]}
        />
        <Callout type="key-insight">
          The practical question for a B2B product: "Do we need SAML or OIDC?" The answer is almost always both — large enterprise customers on legacy IdPs will require SAML, while newer customers and internal tooling will prefer OIDC. Managed platforms (Auth0, Clerk) handle both behind a single integration, which is most of the reason to use one.
        </Callout>
      </SectionCard>

      <SectionCard title="Authorization: RBAC vs. ABAC">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Once you know who the user is (AuthN), you still need to decide what they can do (AuthZ). Two dominant models:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)', fontSize: '0.9rem' }}>RBAC — Role-Based</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Assign users to roles (<InlineCode>admin</InlineCode>, <InlineCode>editor</InlineCode>, <InlineCode>viewer</InlineCode>). Each role has a fixed set of permissions. Simple to reason about and audit. Breaks down when you need fine-grained resource-level rules like "can edit their own posts but not others."</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)', fontSize: '0.9rem' }}>ABAC — Attribute-Based</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Decisions based on attributes of the user, the resource, and the environment. Very expressive ("allow if user.department == resource.owner_department AND time is business hours") but complex to audit and debug. IAM policies and OPA (Open Policy Agent) are examples.</p>
          </div>
        </div>
        <Callout type="key-insight">
          Most products start with RBAC and stay there. The moment you find yourself making exceptions ("admin, but only for their own team") you are building ABAC whether you call it that or not — which is a good signal to evaluate a proper policy engine rather than accumulating if-statements in your service layer.
        </Callout>
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            Storing JWTs in <InlineCode>localStorage</InlineCode>. Any XSS on the page can read it — and exfiltrate tokens silently. Access tokens belong in memory (short-lived, gone on refresh); refresh tokens belong in <InlineCode>httpOnly</InlineCode> cookies (inaccessible to JS entirely).
          </Callout>
          <Callout type="trap">
            Building auth before you decide on a multi-tenancy model. Row-level tenant isolation, separate databases, and shared-schema designs all have fundamentally different auth/authZ implications — retrofitting tenant isolation into an auth system already in production is one of the most painful refactors in a SaaS product.
          </Callout>
          <Callout type="senior-signal">
            "I treat auth as infrastructure, not a feature — it needs to be boring and predictable. I default to a managed platform until I have a concrete reason not to: the security surface, compliance requirements, and edge cases (MFA, breach handling, password reset) are genuinely hard to get right from scratch, and the cost of getting them wrong falls on users. The moment I do roll my own, I start with bcrypt, rate limiting, and short-lived sessions — not optional extras I'll add later."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
