# Context: Ultimate Developer Interview Reference - Frontend Module

This file tracks the status, configuration, and architectural choices of the ultimate-interview-guide project.

## Project Goal
Build a premium, senior-engineer interview prep tool as a Vite + React + TypeScript single-page application. The initial focus is the fully functional "Frontend" tab.

## Tech Stack & Constraints
- **Framework**: Vite + React + TypeScript
- **Styling**: CSS Modules (strictly no Tailwind, no CSS-in-JS)
- **UI Components**: Hand-crafted, no external component libraries
- **Fonts**: Inter (body) & JetBrains Mono (code/mono) via Google Fonts
- **Theme**: Dark-first, premium developer cockpit aesthetics
- **Interactive Features**: Sticky app shell, custom scroll tracking, intersection observer for section accent bar animations and active sidebar tracking.

## Progress Checklist
- [ ] Scaffold Vite + React + TypeScript project
- [ ] Configure global styles, fonts, and theme variables in CSS
- [ ] Create reusable component inventory (`Badge`, `InlineCode`, `FlowRow`, `TwoCol`, `MetricCard`, `StepList`, `SectionCard`)
- [ ] Build layout shell (`AppNav`, `Sidebar`)
- [ ] Build the 14 detailed frontend sections
- [ ] Integrate IntersectionObserver for scroll spy and accent bar animations
- [ ] Build coming soon placeholder for other tabs
- [ ] Verify responsiveness and overall user experience
