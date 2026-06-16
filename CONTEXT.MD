# Context: Ultimate Developer Interview Reference - Frontend Module

This file tracks the status, configuration, and architectural choices of the ultimate-interview-guide project.

## Project Goal
Build a premium, senior-engineer interview prep tool as a Vite + React + TypeScript single-page application. The active tabs include:
1. **Frontend**: Comprehensive study sheets for senior FE interview topics.
2. **Coding Challenges**: 13 hand-crafted React coding challenges with interactive live demos, interview coach instructions (mental models, senior signals, traps), and copyable annotated code views.
3. **System Design**: Visual, scannable system design reference covering 15 core concepts with custom inline diagrams.

## Tech Stack & Restraints
- **Framework**: Vite + React + TypeScript
- **Styling**: CSS Modules (strictly no Tailwind, no CSS-in-JS)
- **UI Components**: Hand-crafted, no external component libraries
- **Fonts**: Inter (body) & JetBrains Mono (code/mono) via Google Fonts in `index.html`
- **Theme**: Dark-first, premium developer cockpit aesthetics
- **Interactive Features**: Sticky app shell, custom scroll tracking, intersection observer for section accent bar animations, and instant Coach/Code toggle pill switcher.
- **Promise Policy**: All async logic written using `async/await`; promise chaining (`.then`) is strictly forbidden.

## Progress Checklist
- [x] Scaffold Vite + React + TypeScript project
- [x] Configure global styles, fonts, and theme variables in CSS (`global.css`)
- [x] Create reusable component inventory (`Badge`, `InlineCode`, `FlowRow`, `TwoCol`, `MetricCard`, `StepList`, `SectionCard`)
- [x] Build layout shell (`AppNav`, `Sidebar`)
- [x] Build the 14 detailed frontend sections
- [x] Integrate IntersectionObserver for scroll spy and accent bar animations
- [x] Build coming soon placeholder for other tabs
- [x] Create React Coding Challenges Tab with sidebar navigations and layout wrapper
- [x] Implement Callout Components (`SeniorSignal`, `Trap`, `KeyInsight`)
- [x] Build line-numbered custom `CodeBlock` with Copy action and comments highlighting (`#5a5a72`)
- [x] Implement all 13 coding challenges with full Coach Content, raw annotated code strings, and running interactive browser demos
- [x] Eliminate all `.then` occurrences in async hooks and components in favor of `async/await`
- [x] Build Shared Widgets (`CompareTable`, `TradeoffCard`, `MetricPill`, `Callout`) for System Design
- [x] Build 6 custom inline SVG diagrams (`CapTriangle`, `CacheLayers`, `ApiGatewayHub`, `CdnEdgeMap`, `RagPipeline`, `RequestLatencyBudget`)
- [x] Implement 15 system design sections under `src/sections/system-design/`
- [x] Build layout and scrollspy navigation integration in `SystemDesignTab`
- [x] Integrate and enable the System Design tab in the main App shell navigation
- [x] Fix invalid CSS selectors and compile warnings to ensure production build completeness
- [x] Stage and commit all codebase updates to git

## Git & Repository Status
- Local git repository initialized on `main` branch.
- First commit completed (Frontend Module).
- Second commit completed (React Coding Challenges Tab & Custom Code Viewer).
- Third commit completed (System Design Concepts Tab, 6 Inline SVG Diagrams, and Custom Shared Widgets).
- Remote origin configured to: `https://github.com/dsound-zz/Ultimate-Developer-Interview-Reference.git`

## Current State
The **Frontend**, **Coding Challenges**, and **System Design** tabs are fully complete, interactive, and build cleanly. The application bundles successfully with zero TypeScript compile issues or CSS minification warnings.
