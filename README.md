# Jhon Rey Bañaga — Portfolio

A premium, animated personal portfolio built with **React + Vite + Tailwind v4 + Framer Motion**, backed by **Supabase** (contact form + visitor counter) and deployed on **Netlify**.

Showcases 9+ years of QA / software testing work and the flagship **TestOps Hub** — an AI-native QA productivity platform — as an interactive case study.

## Tech

- **React 18** + **Vite 5** — fast, modern SPA
- **Tailwind CSS v4** — design tokens + utilities
- **Framer Motion** — scroll reveals, staggered headline, animated metric counters, aurora background
- **Supabase** — Postgres-backed contact form (with DB-level validation + RLS) and a visitor counter RPC
- **Netlify** — CI/CD from GitHub, SPA routing, security headers

## Structure

```
src/
  content/profile.js     ← ALL editable copy (edit this to update the site)
  index.css              ← design tokens + reusable classes
  components/            ← Hero, About, Flagship, Modules, Experience, Skills, Contact, Footer…
  lib/                   ← supabase client + animation hooks
supabase/schema.sql      ← run once in Supabase to create the backend
```

## Getting started

```bash
npm install
npm run dev        # http://localhost:5180
```

The site runs fine without any backend. To enable the contact form + counter, follow **[SETUP.md](SETUP.md)**.

## Deploy

Full step-by-step for GitHub + Supabase + Netlify is in **[SETUP.md](SETUP.md)**.
