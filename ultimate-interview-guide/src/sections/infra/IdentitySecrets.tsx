import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { CodeBlock } from '../../components/CodeBlock';
import { Callout } from '../../components/Callout';

export const IdentitySecrets: React.FC = () => {
  return (
    <SectionContainer
      id="identity-secrets"
      title="Identity, Access & Secrets"
      category="ACCESS CONTROL"
      accentColor="var(--blue)"
    >
      <SectionCard title="The Problem">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Two related problems. <strong>Access control</strong>: deciding exactly which humans and which services can do exactly what, to exactly which resources — getting this too loose creates a large breach blast radius, too tight breaks legitimate workflows. <strong>Secrets</strong>: credentials, API keys, and certificates need to exist somewhere other than hardcoded in source code or container images, with controlled access and ideally automatic rotation.
        </p>
      </SectionCard>

      <SectionCard title="Identity Platforms Compared">
        <CompareTable
          headers={['Platform', 'Provider', 'Core Idea']}
          columnWidths={['1.2fr', '1fr', '3fr']}
          rows={[
            ['IAM', 'AWS', 'Users, Roles, Groups, and JSON policies attached to them, with explicit deny always winning over any allow'],
            ['IAM', 'GCP', 'Resource-hierarchy-based — permissions inherit down through Organization → Folder → Project → Resource'],
            ['Microsoft Entra ID (Azure AD)', 'Azure', 'Centered on Azure AD identities — tightly integrated with Microsoft 365/enterprise SSO'],
          ]}
        />
        <Callout type="key-insight">
          The core mental model is the same everywhere: default deny, explicit allow, least privilege. The syntax and resource hierarchy differ per cloud, but the principle you're being tested on in an interview is identical.
        </Callout>
      </SectionCard>

      <SectionCard title="A Policy, Concretely (AWS IAM)">
        <CodeBlock code={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::my-bucket/uploads/*"
    }
  ]
}`} />
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          A <strong>Role</strong> (assumable, temporary credentials that auto-expire) is almost always preferable to a <strong>User's</strong> long-lived access keys for anything a service or workload needs — if a role's credentials leak, the exposure window is bounded; a leaked long-lived key is open-ended until someone notices and rotates it.
        </p>
      </SectionCard>

      <SectionCard title="Secrets Management Platforms">
        <CompareTable
          headers={['Platform', 'Provider', 'Notable Trait']}
          columnWidths={['1.3fr', '1fr', '2.7fr']}
          rows={[
            ['Secrets Manager', 'AWS', 'Native automatic rotation for RDS/Redshift/DocumentDB credentials'],
            ['Secret Manager', 'GCP', 'Simple versioned secret storage, IAM-controlled access'],
            ['Key Vault', 'Azure', 'Combines secrets, encryption keys, and certificates in one service'],
            ['Vault', 'HashiCorp (multi-cloud)', 'Cloud-agnostic, supports dynamic short-lived secrets generated on demand rather than static stored ones'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            Baking a secret into a container image, build arg, or deployed environment variable that ends up in plaintext in CI logs or image layer history. Fetching the secret at runtime via an attached role keeps it out of every static artifact that could leak it.
          </Callout>
          <Callout type="senior-signal">
            "I write access policies starting from zero and add exactly what's needed, rather than starting broad with a plan to narrow it later — that second step rarely happens under deadline pressure. Same logic for secrets: I think about blast radius and rotation cadence, not just whether something is encrypted at rest."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
