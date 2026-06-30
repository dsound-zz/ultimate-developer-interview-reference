import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { CompareTable } from '../../components/CompareTable';
import { CodeBlock } from '../../components/CodeBlock';
import { InlineCode } from '../../components/InlineCode';
import { Callout } from '../../components/Callout';

export const Containers: React.FC = () => {
  return (
    <SectionContainer
      id="containers"
      title="Containers & Orchestration"
      category="PACKAGING & SCHEDULING"
      accentColor="var(--green)"
    >
      <SectionCard title="The Problem">
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Two layers of problem here. <strong>Packaging</strong>: "works on my machine" happens because an app's dependencies, OS libraries, and runtime version are implicit, not declared — a container bundles all of that into one portable artifact. <strong>Orchestration</strong>: once you have many containers across many machines, something needs to decide where they run, restart them when they crash, and route traffic to healthy ones — doing that by hand doesn't scale past a handful of containers.
        </p>
      </SectionCard>

      <SectionCard title="Docker: The Packaging Layer">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          An <strong>image</strong> is a read-only, layered filesystem snapshot — the blueprint. A <strong>container</strong> is a running instance of that image with its own writable layer on top. Each Dockerfile instruction creates a cacheable layer, which is why instruction order affects build speed:
        </p>
        <CodeBlock code={`# Stage 1: build with full toolchain
FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: copy only the output into a minimal runtime image
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html`} />
        <Callout type="key-insight">
          This is a multi-stage build — the final image contains only what's copied in the last stage, none of the build toolchain. Standard practice for keeping production images small.
        </Callout>
      </SectionCard>

      <SectionCard title="Orchestrators Compared">
        <CompareTable
          headers={['Platform', 'Provider', 'Portability', 'Best For']}
          columnWidths={['1fr', '1.2fr', '1.5fr', '2.5fr']}
          rows={[
            ['Kubernetes (self/managed)', 'Any cloud or on-prem', 'High — same manifests run anywhere k8s runs', 'Teams wanting portability, the CNCF ecosystem (Helm, operators, service mesh)'],
            ['AWS ECS', 'AWS-native', 'None — AWS-only', 'AWS-only teams wanting less operational complexity than Kubernetes'],
            ['AWS EKS', 'AWS-managed Kubernetes', 'High', 'Teams that want Kubernetes but not to run the control plane themselves'],
            ['GCP GKE', 'GCP-managed Kubernetes', 'High', 'GCP-native teams — generally considered the most "batteries-included" managed k8s'],
            ['Azure AKS', 'Azure-managed Kubernetes', 'High', 'Azure-native teams, especially already in the Microsoft ecosystem'],
            ['Fargate / Cloud Run', 'Serverless containers (AWS / GCP)', 'Low-moderate', 'Running containers without managing any underlying nodes at all'],
          ]}
        />
      </SectionCard>

      <SectionCard title="Core Kubernetes Objects">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Pod</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Smallest deployable unit — one or more containers sharing network and storage.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--green)' }}>Deployment</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Declares desired replica count, manages rolling updates between versions.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--blue)' }}>Service</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Stable network endpoint load-balancing across a set of (ephemeral) Pods.</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--surface-raised)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--red)' }}>Ingress</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Routes external HTTP(S) traffic into the cluster based on host/path rules.</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Senior Signals & Traps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Callout type="trap">
            Deploying Kubernetes Pods without resource requests/limits, or running a container's main process without proper <InlineCode>SIGTERM</InlineCode> handling. The first lets one noisy Pod starve a node; the second means every deploy takes the full grace period — or gets hard-killed — instead of shutting down cleanly.
          </Callout>
          <Callout type="senior-signal">
            "The decision between ECS, EKS, GKE, and AKS is rarely about raw capability — they can all run almost anything. It's about whether the team already thinks in Kubernetes primitives, needs multi-cloud portability, or wants the CNCF ecosystem. If none of that applies, the cloud-native option (ECS on AWS, Cloud Run on GCP) is usually less for the team to operate for the same outcome."
          </Callout>
        </div>
      </SectionCard>
    </SectionContainer>
  );
};
