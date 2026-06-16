# Context: Ultimate Developer Interview Reference - Frontend Module

This file tracks the status, configuration, and architectural choices of the ultimate-interview-guide project.

## Project Goal
Build a premium, senior-engineer interview prep tool as a Vite + React + TypeScript single-page application. The initial focus is the fully functional "Frontend" tab.

## Tech Stack & Restraints
- **Framework**: Vite + React + TypeScript
- **Styling**: CSS Modules (strictly no Tailwind, no CSS-in-JS)
- **UI Components**: Hand-crafted, no external component libraries
- **Fonts**: Inter (body) & JetBrains Mono (code/mono) via Google Fonts in `index.html`
- **Theme**: Dark-first, premium developer cockpit aesthetics
- **Interactive Features**: Sticky app shell, custom scroll tracking, intersection observer for section accent bar animations and active sidebar tracking.

## Progress Checklist
- [x] Scaffold Vite + React + TypeScript project
- [x] Configure global styles, fonts, and theme variables in CSS (`global.css`)
- [x] Create reusable component inventory (`Badge`, `InlineCode`, `FlowRow`, `TwoCol`, `MetricCard`, `StepList`, `SectionCard`)
- [x] Build layout shell (`AppNav`, `Sidebar`)
- [x] Build the 14 detailed frontend sections
- [x] Integrate IntersectionObserver for scroll spy and accent bar animations
- [x] Build coming soon placeholder for other tabs
- [x] Verify responsiveness and overall user experience
- [x] Set up local git repository, commit all code changes

## Git & Repository Status
- Local git repository initialized on `main` branch.
- Initial commit created containing the entire Frontend module.
- Remote origin configured to: `https://github.com/dsound-zz/Ultimate-Developer-Interview-Reference.git`
- *Note*: Push to remote pending creation of the empty GitHub repository by the user.

## Current State
All 14 Frontend sections are fully implemented with detailed content, custom components, styling, and dynamic viewport scroll spy tracking. The project builds successfully (`npm run build`) with zero compile warnings or TypeScript errors.
