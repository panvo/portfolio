// ─────────────────────────────────────────────────────────────
//  ALL editable copy lives here. Change text in this one file and
//  the whole site updates. No design code to touch.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Jhon Rey Bañaga',
  firstName: 'Jhon Rey',
  role: 'QA Engineer · Software Tester',
  location: 'Paniqui, Central Luzon, Philippines',
  available: false, // shows the "Available for work" badge

  // The big hero statement. Keep it punchy.
  headline: [
    'I make complex software',
    'harder to break —',
    'and build the AI tools',
    'that keep it reliable.',
  ],

  // One-liner under the headline.
  intro:
    'Software Tester with 9+ years hardening enterprise web applications through manual, functional, regression and database testing. Now designing and building TestOps Hub — an AI-native QA platform.',

  // Contact + socials
  email: 'iamjhondrey@yahoo.com',
  linkedin: 'https://www.linkedin.com/in/panvo/',
  github: 'https://github.com/panvo',

  // Résumé — drop the PDF at public/resume.pdf; buttons link here.
  resumeUrl: '/resume.pdf',
  resumeName: 'Jhon-Rey-Banaga-QA-Resume.pdf',

  // Hero stats — career-level (platform-specific numbers live in the flagship panel, no overlap)
  stats: [
    { value: 9, label: 'Years in QA' },
    { value: 4000, label: 'Automated tests', compact: true },
    { value: 16, label: 'Modules built' },
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
    'Now I’m putting that experience into TestOps Hub — an AI-native platform I designed and built end to end to reimagine test design, requirements analysis, knowledge management, and AI-assisted testing.',
    'What drives me is the system around the testing: turning fragmented docs and repetitive manual work into repeatable, traceable, well-documented workflows — so quality is built in, not bolted on.',
  ],
  // At-a-glance facts (all true, from experience + education)
  facts: [
    { label: 'Based in', value: 'Paniqui, Central Luzon, PH' },
    { label: 'Experience', value: '9+ years in QA' },
    { label: 'Role', value: 'Software Tester' },
    { label: 'Company', value: 'Austin Alba Consulting, Inc.' },
    { label: 'Focus', value: 'Functional, database & AI-assisted testing' },
    { label: 'Databases', value: 'Microsoft SQL Server · Oracle' },
    { label: 'Methodology', value: 'Agile / Scrum' },
    { label: 'Open to', value: 'QA roles & testing consulting' },
  ],
}

// ── Recognition (a premium pull-quote band) ───────────────────
export const recognition = {
  quote: 'Nine years keeping mission-critical software honest — where a missed defect isn’t an option.',
  context:
    'Security-cleared enterprise QA in the law-enforcement and forensic domain at Austin Alba Consulting — the credentials below back the work.',
  highlights: [
    { label: 'Cum Laude', sub: 'BS Information Technology · GWA 1.73' },
    { label: 'Civil Service Eligible', sub: 'PD 907 · Civil Service Commission' },
    { label: 'CJIS · Privileged Role', sub: 'Security & Privacy certified' },
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
    { value: 51, suffix: '', label: 'Quality gates', note: 'automated checks that block regressions before any merge' },
    { value: 105, suffix: '', label: 'Security policies (RLS)', note: 'row-level rules enforcing per-user data isolation' },
    { value: 100, suffix: '%', label: 'Cortex retrieval accuracy', note: 'measured top-3 recall on a golden question set' },
  ],
  stack: ['React', 'Vite', 'Tailwind', 'Supabase', 'Framer Motion', 'Claude AI'],
}

// ── The full case study (the flagship story) ──────────────────
export const caseStudy = {
  kicker: 'Case study',
  title: 'How TestOps Hub got built',
  intro:
    'The full story behind the flagship — the manual grind that started it, the bet I made, the hard problems I solved, and what it changed.',
  // one-line teaser surfaced on the flagship panel
  teaser:
    'Solo-built in ~3 months of mornings, nights and weekends — an AI-native platform that turns years of scattered QA work into one fast, traceable system. Here’s the whole story.',

  chapters: [
    {
      no: '01',
      eyebrow: 'The problem',
      title: 'Everything lived in my head — and in years of scattered documents',
      body: [
        'A ticket travels from our project manager to a developer, then to our QA lead, who assigns it to a tester like me. The requirements arrive buried in a client email or the ticket itself — often vague, rarely complete.',
        'From there the work was mine, and manual. Test cases came from what I knew about the system and the right checks to run. To reuse anything, I hand-scanned years of QA documents looking for a relevant case — nothing was linked to anything else, so every search was a test of memory.',
      ],
      pains: [
        { t: 'Hand-scanning the archive', d: 'Years of QA documents, searched by eye every time I needed to reuse a case or reference a past test.' },
        { t: 'Vague requirements', d: 'Client requirements arrived unclear or incomplete — reconstructing the real intent was on me.' },
        { t: 'Test creation from scratch', d: 'Writing manual cases and scenarios by hand, ticket after ticket, was slow and repetitive.' },
        { t: 'Nothing was linked', d: 'Requirements, cases, results and knowledge lived in separate places with no traceability between them.' },
      ],
      cost: 'The cost landed squarely on the tester. Developers waited for results; the client waited for the finished product; I absorbed the manual search and authoring — easily 1–2 hours per ticket that never needed to be spent, and every ticket shipped slower for it.',
      tools: 'We had no Jira, TestRail or Zephyr. Ticketing ran on Trac — an open-source logger that records tickets but does nothing for test design or traceability. Everything past “here is a ticket” was manual.',
    },
    {
      no: '02',
      eyebrow: 'The bet',
      title: 'Not another tracker — a personal QA assistant',
      body: [
        'The core idea: stop doing by hand what AI does well — extracting requirements, reasoning over them, retrieving the right past work — and wrap it in tools shaped around how testing actually happens on my team.',
        'Buying a tool would never fit our process. Building it myself let me fold in years of testing judgment, match our real workflow, and keep enhancing it forever. The goal was never a tracker; it was an all-in-one hub for manual testers — with supervision for the QA lead and reports management can act on.',
      ],
      quote:
        'This is more than a tracker. What I built is closer to a personal assistant for testing — one that knows the system, the process, and my own years of documents.',
    },
    {
      no: '03',
      eyebrow: 'The constraints',
      title: 'Built solo, in the hours around a full-time job',
      body: [
        'It’s a personal project I took on in my own time — before my 9-to-6 shift, after it, and across the weekend. A lot of hours, put in because I wanted it to exist.',
        'Because it ingests real QA documents, I cleared data handling with my manager before anything went into Cortex, and looked into how Claude treats data first. Keeping our information safe came before any feature.',
      ],
      stats: [
        { k: 'Solo', v: 'One builder, start to finish' },
        { k: '~3 months', v: 'Intensive — a 5–6 month build, compressed' },
        { k: '6–8 hrs/day', v: 'Around work · more on weekends' },
        { k: 'Personal time', v: 'A project I chose to take on' },
      ],
      principles: [
        'Cortex must retrieve accurately — grounded in my own documents, never guesses.',
        'Extracted requirements pass through review and approval before they become real.',
        'Premium UX — a tool I actually want to open every day.',
        'Client data protected end to end.',
      ],
    },
    {
      no: '04',
      eyebrow: 'The architecture',
      title: 'React, Supabase and Claude — each doing one job well',
      body: [
        'The mental model is simple. React runs the interface. Supabase is the cloud store, with PostgreSQL underneath and row-level security isolating every user. Claude is both the engine I build with and the reasoning inside the tools — extraction, retrieval, drafting. Embeddings run locally in the browser, so retrieval works without shipping every document to a third party.',
        'AI is never left to run unchecked. Claude writes code; I review every change, audit for gaps and weaknesses, and fix them. I let it propose enhancements, then decide what earns a place. It drafts documentation; I verify it. Testing my own platform is the loop that keeps it improving — the one skill I already had.',
      ],
      decisions: [
        { t: 'Supabase + PostgreSQL', d: 'Integrates cleanly with the stack and Netlify, with a clear path to a local PostgreSQL deployment on-prem later.' },
        { t: 'Retrieval-augmented Cortex', d: 'A query returns answers grounded in my own QA artifacts — with real logic tuned for retrieving the right document.' },
        { t: 'Row-level security', d: 'Per-user isolation enforced in the database itself, not just the UI — 105 policies across the schema.' },
      ],
    },
    {
      no: '05',
      eyebrow: 'The core three',
      title: 'Test Studio, Cortex and Copilot',
      body: ['Sixteen modules — but three carry the platform: the workspace where tests are authored, the engine where knowledge lives, and the assistant that ties it all together.'],
      modules: [
        {
          name: 'Test Studio',
          organ: 'Test authoring',
          shot: 'test-studio-extraction',
          problem: 'Turning vague requirements into reviewed, traceable test scenarios by hand.',
          how: 'Paste or upload a requirement; the system extracts requirement candidates for you to review and approve. Approved requirements become scenarios — authored with AI, pulled from a Cortex document, or added by hand — surrounded by defect management, test rounds, multi-database testing, execution runs, versioning, a data library and a live traceability matrix.',
          wow: 'A built-in chat that explains how each requirement was extracted — you can interrogate the reasoning, not just accept it.',
        },
        {
          name: 'Cortex',
          organ: 'Knowledge engine',
          shot: 'cortex-answer',
          problem: 'Years of QA knowledge trapped in unsearchable documents.',
          how: 'Ingest documents once; Cortex retrieves the right passages on demand with tuned retrieval logic, presents grounded answers, and shows its work. It carries a knowledge base, an insights tool, and its own evaluation harness.',
          wow: 'A built-in evaluation harness that scores retrieval against a golden question set — deterministically, with no AI calls — so accuracy stays measured and repeatable, not assumed.',
        },
        {
          name: 'Copilot Chat',
          organ: 'AI assistant',
          shot: 'copilot-answer',
          problem: 'Context-switching between tools and losing the thread of what the app can even do.',
          how: 'An app-aware assistant that knows every module and surface — it drafts, answers from your own data, and guides you across the whole platform from a single chat.',
          wow: 'It understands the entire system, so help is always one message away, wherever you are.',
        },
      ],
    },
    {
      no: '06',
      eyebrow: 'The hard parts',
      title: 'Where the engineering got hard',
      items: [
        { t: 'Tuning Cortex retrieval', d: 'I treated it like any critical feature — audit, find where it returned the wrong passage, fix, and re-check against a golden question set (generated, then reviewed and adjusted by hand). The evaluation runs deterministically — no AI calls, exact matching — so the score is repeatable, and adversarial and integrity suites keep it honest. On that set it lands the right document in the top three every time.' },
        { t: '51 automated quality gates', d: 'Every change runs a verify pipeline: 51 contract checks — AI, storage, auth, security, migration-safety, design-system, docs-sync and more — plus lint, unit tests with coverage, a production build, and 55 end-to-end journeys. A failing gate blocks the merge. I test the platform the way I test enterprise software.' },
        { t: '105 row-level security policies', d: 'Isolation is enforced inside PostgreSQL — each user only ever sees their own rows — so a missed check in the UI can never leak another user’s data. The policies do the guarding; the interface stays simple.' },
        { t: 'Trustworthy AI costing', d: 'Every tool computed AI cost differently, so the numbers were inaccurate. I built one costing engine in the Admin Console that auto-fetches the correct per-model rate and its peso equivalent, and the Trace Log audits every call — so spend is exact, not estimated.' },
      ],
    },
    {
      no: '07',
      eyebrow: 'The payoff',
      title: 'What changed',
      body: ['Built the naive way, this platform would underperform badly. Built deliberately, it turned my slowest, most manual work into something fast and repeatable.'],
      beforeAfter: [
        { label: 'Testing a ticket, end to end', before: '6–8 hrs', after: '3–6 hrs' },
        { label: 'Reusing past QA work', before: 'Manual archive scan', after: 'Cortex, instant' },
        { label: 'Requirement → scenarios', before: 'Written from scratch', after: 'Extracted, reviewed, linked' },
      ],
      metrics: [
        { value: 16, label: 'Modules', note: 'one platform' },
        { value: 51, label: 'Quality gates', note: 'block every risky merge' },
        { value: 105, label: 'RLS policies', note: 'per-user isolation' },
        { value: 100, suffix: '%', label: 'Cortex accuracy', note: 'golden-set, top-3' },
      ],
      note: 'Live since early development, used by our five-person QA operation. Test cases generated are well beyond what manual authoring produced — enough that I stopped counting.',
    },
    {
      no: '08',
      eyebrow: 'What’s next',
      title: 'From personal tool to company system',
      body: [
        'The biggest lesson: integrating many features gracefully — killing redundancy and weakness — is the hard part, harder than any single feature. Solo, it’s demanding and costly. It also showed me how much strong, reusable technology is out there to build on, and how much further I can take it.',
        'The roadmap is to make it production-ready and bring it in-house: a local PostgreSQL deployment on a dedicated office machine, so TestOps Hub becomes a real tool our company runs on.',
      ],
      quote:
        'More than anything, it shows I can turn my own manual grind into tools that make the team faster — and that I test what I build until it holds.',
    },
  ],
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
    duration: '9 yrs 2 mos',
    location: 'Makati City, Philippines',
    summary:
      'Analyze requirements to identify scenarios, risks and coverage, then design, maintain, and run functional, regression, exploratory, GUI and database test cases for mission-critical enterprise applications in the law-enforcement and forensic domain. Validate backend data and transactions across Microsoft SQL Server and Oracle, prepare SQL scripts, test data and technical/user documentation, and drive client-reported defects to closure with developers, working in an Agile/Scrum team.',
    tags: ['Functional & Regression', 'SQL Server', 'Oracle', 'Trac', 'TortoiseSVN', 'SharePoint', 'Agile/Scrum'],
    now: true,
  },
  {
    kind: 'build',
    role: 'Creator — TestOps Hub',
    org: 'Self-directed · AI-native QA platform',
    meta: 'Side project',
    period: '2026 — Present',
    summary:
      'Designing and building an internal QA platform end to end — Cortex knowledge retrieval, governed Test Studio, an app-aware AI copilot, and design tools (decision tables, EP/BVA, state modeling) — to fix fragmented docs, thin coverage, and broken traceability. Backed by 4,000+ automated tests, 51 quality gates, and 105 row-level-security policies.',
    tags: ['React', 'Vite', 'Tailwind', 'Supabase', 'Framer Motion', 'Claude AI'],
    now: true,
  },
  {
    kind: 'edu',
    role: 'BS in Information Technology',
    org: 'Tarlac State University',
    meta: 'Cum Laude',
    period: '2013 — 2017',
    location: 'Tarlac, Philippines',
    summary:
      'Graduated Cum Laude with a General Weighted Average of 1.73, an Academic Excellence Award (2015–2017), and Dean’s Lister standing (2014–2016). Served as Vice President of a campus student organization (2015–2016) — the foundation that launched a QA career.',
    tags: ['Cum Laude', 'GWA 1.73', 'Dean’s Lister', 'Academic Excellence Award'],
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
    icon: 'Landmark',
  },
  {
    name: 'Test Automation Foundations',
    issuer: 'LinkedIn Learning',
    date: 'Nov 2023',
    icon: 'Linkedin',
    course: true,
  },
  {
    name: 'Agile Testing',
    issuer: 'LinkedIn Learning',
    date: 'Nov 2023',
    icon: 'Linkedin',
    course: true,
  },
  {
    name: 'Software Development Life Cycle (SDLC)',
    issuer: 'LinkedIn Learning',
    date: 'Nov 2023',
    icon: 'Linkedin',
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
      'State Transition Testing',
      'Pairwise Testing',
      'Traceability',
    ],
  },
  {
    title: 'Databases',
    items: ['Microsoft SQL Server', 'Oracle SQL Developer', 'PostgreSQL', 'Supabase', 'SQL', 'T-SQL', 'PL/SQL'],
  },
  {
    title: 'Build & AI',
    items: ['JavaScript', 'React', 'Tailwind CSS', 'Vite', 'Netlify', 'Git & GitHub', 'Prompt Engineering', 'Generative AI'],
  },
  {
    title: 'Process & Tools',
    items: ['Agile / Scrum', 'SDLC', 'Defect Management', 'Trac', 'TortoiseSVN', 'SharePoint', 'Technical Writing'],
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
  title: 'Inside TestOps Hub',
  sub: 'Sixteen real modules from the platform — pick one to see it. From an AI knowledge engine and an app-aware copilot to team governance, delivery, and API testing.',
}

// Interactive showcase — each module has a gallery of real screenshots
// (public/shots/<file>.png). Missing files fall back to a "coming" tile.
// `icon` maps to lucide in Tour.jsx. Order here drives the grouped tab list.
export const tourModules = [
  // ── Overview ──
  {
    id: 'home', name: 'Command Center', category: 'Overview', icon: 'LayoutDashboard', route: '/home',
    tagline: 'Your whole QA operation at a glance — KPIs, live activity, system health and next actions in one command center.',
    shots: [
      { file: 'home-overview', label: 'Overview' },
      { file: 'home-work-lifecycle', label: 'Work lifecycle' },
    ],
  },
  {
    id: 'recent', name: 'Recent Work', category: 'Overview', icon: 'History', route: '/recent',
    tagline: 'Pick up exactly where you left off — your recent tools and projects, one tap away.',
    shots: [{ file: 'recent-work', label: 'Recent' }],
  },

  // ── AI ──
  {
    id: 'cortex', name: 'Cortex', category: 'AI', icon: 'Brain', route: '/cortex',
    tagline: 'A retrieval-augmented knowledge engine that answers QA questions with real, verifiable citations.',
    shots: [
      { file: 'cortex-overview', label: 'Overview' },
      { file: 'cortex-ask', label: 'Ask' },
      { file: 'cortex-answer', label: 'Answer' },
      { file: 'cortex-insights', label: 'Insights' },
      { file: 'cortex-knowledge-base', label: 'Knowledge base' },
    ],
  },
  {
    id: 'copilot', name: 'Copilot Chat', category: 'AI', icon: 'MessageSquareText', route: '/copilot/chat',
    tagline: 'An app-aware AI copilot that drafts cases, analyzes requirements and answers from your own data.',
    shots: [
      { file: 'copilot-ask', label: 'Ask' },
      { file: 'copilot-answer', label: 'Answer' },
      { file: 'copilot-answer-2', label: 'Answer II' },
      { file: 'copilot-assistant-profile', label: 'Assistant profile' },
    ],
  },
  {
    id: 'test-case-ai', name: 'Test Case AI', category: 'AI', icon: 'Wand2', route: '/copilot/test-case-generator',
    tagline: 'Generate structured test cases from a requirement, then AI-review them for coverage, clarity and weak assertions.',
    shots: [
      { file: 'test-case-generator', label: 'Generator' },
      { file: 'test-case-reviewer', label: 'Reviewer' },
    ],
  },

  // ── Test Design ──
  {
    id: 'studio', name: 'Test Studio', category: 'Test Design', icon: 'FlaskConical', route: '/test-design/intake',
    tagline: 'Governed authoring — requirements to scenarios to execution, with AI extraction and an in-context chat.',
    shots: [
      { file: 'test-studio-dashboard', label: 'Dashboard' },
      { file: 'test-studio-requirements-and-scenarios', label: 'Requirements & scenarios' },
      { file: 'test-studio-candidates', label: 'Candidates' },
      { file: 'test-studio-extraction', label: 'Extraction' },
      { file: 'test-studio-chat', label: 'Chat' },
    ],
  },
  {
    id: 'design-tools', name: 'Design Tools', category: 'Test Design', icon: 'Network', route: '/test-design/decision-table',
    tagline: 'Model coverage visually — decision tables, equivalence partitioning & boundary values, and state-transition machines — each generating test cases.',
    shots: [
      { file: 'decision-table-setup', group: 'Decision Table', label: 'Setup' },
      { file: 'decision-table-simulate', group: 'Decision Table', label: 'Simulate' },
      { file: 'decision-table', group: 'Decision Table', label: 'Result' },
      { file: 'EP-BVA-setup', group: 'EP / BVA', label: 'Setup' },
      { file: 'EP-BVA-visualize', group: 'EP / BVA', label: 'Visualize' },
      { file: 'EP-BVA-table', group: 'EP / BVA', label: 'Table' },
      { file: 'state-transition-model', group: 'State Transition', label: 'Model' },
      { file: 'state-transition-diagram', group: 'State Transition', label: 'Diagram' },
      { file: 'state-transition-table', group: 'State Transition', label: 'Table' },
    ],
  },

  // ── Governance ──
  {
    id: 'qa-health', name: 'QA Health', category: 'Governance', icon: 'Activity', route: '/qa-health',
    tagline: 'A living quality score with severity bands and evidence-backed findings — each one traceable and actionable.',
    shots: [{ file: 'qa-health', label: 'Health' }],
  },
  {
    id: 'admin', name: 'Admin Console', category: 'Governance', icon: 'ShieldCheck', route: '/admin-console',
    tagline: 'Role-based governance across the team — overview, users & access, AI pricing, audit trails and reports.',
    shots: [
      { file: 'admin-console-overview', label: 'Overview' },
      { file: 'admin-console-ai-pricing', label: 'AI pricing' },
    ],
  },
  {
    id: 'impact-watch', name: 'Impact Watch', category: 'Governance', icon: 'Radar', route: '/impact-watch',
    tagline: 'A cross-tool change feed — what changed, where, and everything it might affect downstream.',
    shots: [{ file: 'impact-watch', label: 'Impact feed' }],
  },
  {
    id: 'trace', name: 'Trace Log', category: 'Governance', icon: 'Receipt', route: '/utility/trace-log',
    tagline: 'Every AI call audited — model, tokens, latency and cost in USD and PHP. Responsible AI, measured.',
    shots: [{ file: 'tracelog', label: 'Audit ledger' }],
  },

  // ── Delivery ──
  {
    id: 'delivery', name: 'Delivery Board', category: 'Delivery', icon: 'KanbanSquare', route: '/delivery-board',
    tagline: 'A cross-project delivery command center — lanes, ownership, health scoring and stand-up metrics.',
    shots: [{ file: 'delivery-board', label: 'Board' }],
  },
  {
    id: 'api', name: 'API Tester', category: 'Delivery', icon: 'Webhook', route: '/api-workbench',
    tagline: 'Design → send → assert API tests as a workflow, with run history, reports and AI failure analysis.',
    shots: [{ file: 'api-tester', label: 'Workbench' }],
  },
  {
    id: 'resource-library', name: 'Resource Library', category: 'Delivery', icon: 'Library', route: '/resource-library',
    tagline: 'A versioned home for QA docs and references — linked to requirements, connections and Cortex.',
    shots: [
      { file: 'resource-library', label: 'Overview' },
      { file: 'resource-library-document', label: 'Documents' },
      { file: 'resource-library-connections', label: 'Connections' },
    ],
  },

  // ── Community ──
  {
    id: 'exchange', name: 'Exchange', category: 'Community', icon: 'MessagesSquare', route: '/exchange',
    tagline: 'A team knowledge exchange — discussions, Q&A, guides, feature requests and a moderation queue.',
    shots: [{ file: 'exchange', label: 'Community' }],
  },
  {
    id: 'messaging', name: 'Messaging', category: 'Community', icon: 'Inbox', route: '/inbox',
    tagline: 'Team messaging and admin broadcasts — threaded conversations that keep everyone in sync.',
    shots: [
      { file: 'messaging', label: 'Inbox' },
      { file: 'admin-messaging', label: 'Admin broadcast' },
    ],
  },
]
