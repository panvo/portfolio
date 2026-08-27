// ─────────────────────────────────────────────────────────────
//  ALL editable copy lives here. Change text in this one file and
//  the whole site updates. No design code to touch.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Jhon Rey Bañaga',
  firstName: 'Jhon Rey',
  role: 'QA Engineer · Software Tester',
  location: 'Paniqui, Central Luzon, Philippines',
  available: true, // shows the "Available for work" badge

  // The big hero statement. Keep it punchy.
  headline: [
    'I make complex software',
    'impossible to break —',
    'and build the AI tools',
    'that keep it that way.',
  ],

  // One-liner under the headline.
  intro:
    'Software Tester with 9+ years hardening enterprise web applications through manual, functional, regression and database testing. Now building TestOps Hub — an AI-native QA platform.',

  // Contact + socials
  email: 'iamjhondrey@yahoo.com',
  linkedin: 'https://www.linkedin.com/in/panvo/',
  github: 'https://github.com/panvo',

  // Hero stats — career-level (platform-specific numbers live in the flagship panel, no overlap)
  stats: [
    { value: 9, label: 'Years in QA' },
    { value: 4000, label: 'Automated tests', compact: true },
    { value: 8, label: 'Modules built' },
  ],
}

// Two vibrant feature cards in the hero (à la the reference)
export const heroCards = [
  { label: 'Functional · Regression · Database Testing', icon: 'Layers', color: 'accent' },
  { label: 'SQL Server · Oracle · React · Supabase', icon: 'Boxes', color: 'lime' },
]

export const about = {
  title: 'About',
  kicker: 'Who I am',
  paragraphs: [
    'My work lives at the intersection of requirements analysis, test-case design, and SQL-based backend validation across Microsoft SQL Server and Oracle. I partner closely with developers and stakeholders to reproduce issues, validate business rules, and protect software reliability and data integrity.',
    'Consistently recognized as a top-performing QA professional, I’m now channeling that experience into TestOps Hub — an internal platform that reimagines test design, requirements analysis, knowledge management, and AI-assisted testing.',
  ],
}

// ── Flagship case study ───────────────────────────────────────
export const flagship = {
  kicker: 'Flagship project',
  name: 'TestOps Hub',
  tagline: 'An AI-native QA productivity platform',
  period: 'Jun 2026 — Present',
  summary:
    'A single platform that consolidates test analysis, test design, documentation, knowledge management, and AI-assisted testing — built to kill the recurring pain of enterprise QA: fragmented docs, repetitive manual work, incomplete coverage, and broken traceability.',
  metrics: [
    { value: 51, suffix: '', label: 'Quality gates' },
    { value: 105, suffix: '', label: 'Security policies (RLS)' },
    { value: 100, suffix: '%', label: 'Cortex retrieval accuracy' },
  ],
  stack: ['React', 'Vite', 'Tailwind', 'Supabase', 'Framer Motion', 'Claude AI'],
}

// The modules of TestOps Hub — each a mini case study card.
export const modules = [
  {
    name: 'Cortex',
    icon: 'Brain',
    tag: 'AI Knowledge Engine',
    desc: 'Retrieval-augmented QA knowledge base with measured 100% top-3 recall and citation-correct answers — not vibes, verified.',
  },
  {
    name: 'Test Studio',
    icon: 'FlaskConical',
    tag: 'Governed Authoring',
    desc: 'Governed test-case authoring with multi-database test tracks, versioning, and cloud sync across the whole team.',
  },
  {
    name: 'Copilot Chat',
    icon: 'MessageSquareText',
    tag: 'AI Assistant',
    desc: 'A context-aware AI copilot that rides along on every surface — drafting cases, analyzing requirements, and answering from your own data.',
  },
  {
    name: 'Design Tools',
    icon: 'Network',
    tag: 'Test Design',
    desc: 'Decision tables, equivalence partitioning, boundary-value analysis and state modeling — with live diagrams and AI suggestions.',
  },
  {
    name: 'Admin Console',
    icon: 'ShieldCheck',
    tag: 'Governance',
    desc: 'Multi-user governance with role-based access, audit trails, and row-level security across 10 admin surfaces.',
  },
  {
    name: 'Execution & Defects',
    icon: 'BugPlay',
    tag: 'Run & Track',
    desc: 'Execution runs, evidence capture, and end-to-end defect management wired straight to requirements and test cases.',
  },
  {
    name: 'API Workbench',
    icon: 'Webhook',
    tag: 'Integration',
    desc: 'Author, run, and attest API tests with structured evidence — bridging functional and backend validation.',
  },
  {
    name: 'Requirement Intelligence',
    icon: 'ScanText',
    tag: 'Analysis',
    desc: 'Extracts testable requirements from documents, surfaces gaps and risks, and traces every requirement to coverage.',
  },
]

// ── Experience — a vertical timeline ──────────────────────────
export const experienceHeading = {
  kicker: 'Experience',
  title: '9+ years in the loop',
}

// Real history only. Add earlier roles here if you held them (title/org/period/summary).
export const timeline = [
  {
    kind: 'work',
    role: 'Software Tester',
    org: 'Austin Alba Consulting, Inc.',
    meta: 'Full-time',
    period: '2017 — Present',
    summary:
      'Analyze requirements, then design, maintain, and run functional, regression, GUI and database test cases for complex enterprise web apps; validate backend data across Microsoft SQL Server and Oracle, and drive defects to closure with developers in an Agile/Scrum cadence.',
    now: true,
  },
  {
    kind: 'build',
    role: 'Creator — TestOps Hub',
    org: 'Self-directed · AI-native QA platform',
    meta: 'Side project',
    period: '2026 — Present',
    summary:
      'Designing and building an internal QA platform — Cortex knowledge retrieval, governed Test Studio, AI copilot, and design tools — with React, Supabase and Claude to fix fragmented docs, thin coverage, and broken traceability.',
    now: true,
  },
  {
    kind: 'edu',
    role: 'BS in Information Technology',
    org: 'Tarlac State University',
    meta: 'Cum Laude',
    period: '2013 — 2017',
    summary:
      'Graduated Cum Laude with an Academic Excellence Award (2015–2017) and Dean’s Lister standing — the foundation that launched a QA career.',
  },
]

// kept for reference / other surfaces
export const education = {
  school: 'Tarlac State University',
  degree: 'BS in Information Technology',
  period: '2013 — 2017',
  honors: [
    'Graduated Cum Laude',
    'General Weighted Average — 1.73',
    'Academic Excellence Award, 2015–2017',
    'Dean’s Lister, 2014–2016',
  ],
}

// ── Certifications & licenses ─────────────────────────────────
export const certHeading = {
  kicker: 'Credentials',
  title: 'Certifications & licenses',
  sub: 'Verified professional credentials, plus focused courses that keep the craft current.',
}

export const certifications = [
  {
    name: 'Security and Privacy: Privileged Role',
    issuer: 'Peak Performance Solutions',
    date: 'Apr 2026',
    expires: 'Apr 2027',
    tag: 'CJIS',
    icon: 'ShieldCheck',
    active: true,
  },
  {
    name: 'Civil Service Eligibility — Presidential Decree No. 907',
    issuer: 'Civil Service Commission (Philippines)',
    date: 'Nov 2019',
    credentialId: '03190707',
    icon: 'Award',
  },
  {
    name: 'Test Automation Foundations',
    issuer: 'LinkedIn Learning',
    date: 'Nov 2023',
    icon: 'GraduationCap',
    course: true,
  },
  {
    name: 'Agile Testing',
    issuer: 'LinkedIn Learning',
    date: 'Nov 2023',
    icon: 'GraduationCap',
    course: true,
  },
  {
    name: 'Software Development Life Cycle (SDLC)',
    issuer: 'LinkedIn Learning',
    date: 'Nov 2023',
    icon: 'GraduationCap',
    course: true,
  },
]

// ── Skills, grouped (curated — the ones that matter) ──────────
export const skillGroups = [
  {
    title: 'Testing',
    items: [
      'Functional Testing',
      'Regression Testing',
      'Database Testing',
      'System Testing',
      'Exploratory Testing',
      'GUI Testing',
      'Smoke & Sanity',
      'Black / Gray Box',
    ],
  },
  {
    title: 'Design & Analysis',
    items: [
      'Requirements Analysis',
      'Test Design',
      'Test Planning',
      'Equivalence Partitioning',
      'Boundary-Value Analysis',
      'Decision Tables',
      'Traceability',
    ],
  },
  {
    title: 'Databases',
    items: ['Microsoft SQL Server', 'Oracle SQL Developer', 'SQL'],
  },
  {
    title: 'Build & AI',
    items: ['JavaScript', 'React', 'Supabase', 'Git & GitHub', 'Prompt Engineering', 'Generative AI'],
  },
  {
    title: 'Process & Tools',
    items: ['Agile / Scrum', 'SDLC', 'Trac', 'TortoiseSVN', 'SharePoint', 'Technical Writing'],
  },
]

// Marquee of tools that scrolls under the hero
export const marquee = [
  'Software QA',
  'SQL Server',
  'Oracle',
  'Functional Testing',
  'Database Testing',
  'Requirements Analysis',
  'Agile / Scrum',
  'Test Design',
  'React',
  'Supabase',
  'AI-Assisted Testing',
  'Traceability',
]

// ── Minimalist layout data ────────────────────────────────────

// Big editorial "what I do" lines (shown large in the Skills section)
export const skillHighlights = [
  'Functional & Regression Testing',
  'Database Validation',
  'Requirements Analysis',
  'AI-Assisted QA Tooling',
]

// Product tour — safe, representative mockups of TestOps Hub (fake sample data,
// no real records / auth / backend). Swap in real screenshots at /public/shots/* later.
export const tour = {
  kicker: 'Product tour',
  title: 'See TestOps Hub in action',
  sub: 'Real screens from the platform — AI knowledge retrieval, governed test design, an app-aware copilot, and generated coverage.',
}
