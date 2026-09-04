import { useState } from 'react'
import { motion } from 'framer-motion'
import { Quote, ArrowRight, Check, FlaskConical, Library, Bot } from 'lucide-react'
import { caseStudy } from '../content/profile'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { SpotlightCard } from './ui/SpotlightCard'
import { Metric } from './ui/Metric'

const EASE = [0.16, 1, 0.3, 1]
const organIcons = { 'Test Studio': FlaskConical, Cortex: Library, 'Copilot Chat': Bot }

// quick-jump chips for skimmers (a curated subset of the eight chapters)
const JUMPS = [
  { no: '01', label: 'The problem' },
  { no: '02', label: 'The bet' },
  { no: '04', label: 'Architecture' },
  { no: '05', label: 'The core three' },
  { no: '07', label: 'Results' },
]

export function CaseStudy() {
  return (
    <section id="case-study" className="py-20 sm:py-24 scroll-mt-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <SectionHeading kicker={caseStudy.kicker} title={caseStudy.title} sub={caseStudy.intro} />

        {/* TL;DR + jump chips — for skimmers */}
        <Reveal>
          <div className="-mt-6 mb-10 sm:mb-12">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4 max-w-2xl text-[13.5px]">
              <span className="font-mono shrink-0" style={{ color: 'var(--accent-text)' }}>{caseStudy.readingTime}</span>
              <span style={{ color: 'var(--text-faint)' }}>·</span>
              <span className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>{caseStudy.tldr}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {JUMPS.map((j) => (
                <a
                  key={j.no}
                  href={'#cs-' + j.no}
                  className="chip !text-[12.5px] transition-all duration-200 hover:-translate-y-0.5"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-text)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {j.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {caseStudy.chapters.map((c, i) => (
            <Chapter key={c.no} c={c} last={i === caseStudy.chapters.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Chapter({ c, last }) {
  return (
    <div
      id={'cs-' + c.no}
      className="grid lg:grid-cols-[132px_1fr] gap-5 lg:gap-12 border-t pt-10 sm:pt-12 scroll-mt-24"
      style={{ borderColor: 'var(--border)', paddingBottom: last ? 0 : '2.75rem' }}
    >
      {/* rail: number + eyebrow */}
      <div className="lg:sticky lg:top-28 self-start flex lg:flex-col items-baseline lg:items-start gap-3">
        <motion.span
          className="font-display font-semibold leading-none text-5xl sm:text-6xl"
          style={{ color: 'var(--accent-text)', opacity: 0.9 }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {c.no}
        </motion.span>
        <span className="eyebrow lg:mt-3">{c.eyebrow}</span>
      </div>

      {/* content */}
      <div className="min-w-0">
        <Reveal>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight leading-tight max-w-3xl">
            {c.title}
          </h3>
        </Reveal>

        {c.body?.map((p, i) => (
          <Reveal key={i} delay={0.05 + i * 0.05}>
            <p className="mt-5 max-w-2xl text-[15px] sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {p}
            </p>
          </Reveal>
        ))}

        {c.pains && <Pains pains={c.pains} cost={c.cost} tools={c.tools} />}
        {c.quote && !c.modules && <PullQuote text={c.quote} />}
        {c.stats && <Constraints stats={c.stats} principles={c.principles} />}
        {c.decisions && <Decisions items={c.decisions} />}
        {c.modules && <Organs modules={c.modules} />}
        {c.items && <HardParts items={c.items} />}
        {c.beforeAfter && <Payoff data={c} />}
      </div>
    </div>
  )
}

/* ── 01 — pains ─────────────────────────────── */
function Pains({ pains, cost, tools }) {
  return (
    <>
      <div className="mt-8 grid sm:grid-cols-2 gap-3">
        {pains.map((p, i) => (
          <Reveal key={p.t} delay={i * 0.06}>
            <SpotlightCard className="card h-full p-5" style={{ background: 'var(--surface)' }}>
              <h4 className="font-display font-semibold text-[15px] tracking-tight" style={{ color: 'var(--accent-text)' }}>
                {p.t}
              </h4>
              <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{p.d}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{cost}</p>
      </Reveal>
      <Reveal>
        <p className="mt-4 max-w-2xl text-[14px] leading-relaxed pl-4 border-l-2" style={{ color: 'var(--text-faint)', borderColor: 'var(--border-strong)' }}>
          {tools}
        </p>
      </Reveal>
    </>
  )
}

/* ── pull quote ─────────────────────────────── */
function PullQuote({ text }) {
  return (
    <Reveal>
      <blockquote className="mt-8 relative max-w-2xl pl-6" style={{ borderLeft: '2px solid var(--accent)' }}>
        <Quote size={20} style={{ color: 'var(--accent)' }} className="mb-2" />
        <p className="font-display text-xl sm:text-2xl font-medium tracking-tight leading-snug" style={{ color: 'var(--text)' }}>
          {text}
        </p>
      </blockquote>
    </Reveal>
  )
}

/* ── 03 — constraints ───────────────────────── */
function Constraints({ stats, principles }) {
  return (
    <>
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <Reveal key={s.k} delay={i * 0.06}>
            <div className="card h-full p-5" style={{ background: 'var(--surface-2)' }}>
              <div className="font-display font-semibold text-xl tracking-tight" style={{ color: 'var(--accent-text)' }}>{s.k}</div>
              <div className="mt-1.5 text-[13px] leading-snug" style={{ color: 'var(--text-muted)' }}>{s.v}</div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-2.5 max-w-2xl">
        {principles.map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="flex items-start gap-2.5 text-[14px] leading-snug" style={{ color: 'var(--text-muted)' }}>
              <span className="grid place-items-center h-5 w-5 rounded-md shrink-0 mt-px" style={{ background: 'color-mix(in srgb, var(--accent) 16%, transparent)', color: 'var(--accent)' }}>
                <Check size={12} />
              </span>
              {p}
            </div>
          </Reveal>
        ))}
      </div>
    </>
  )
}

/* ── 04 — decisions ─────────────────────────── */
function Decisions({ items }) {
  return (
    <div className="mt-8 flex flex-col divide-y" style={{ borderColor: 'var(--border)' }}>
      {items.map((it, i) => (
        <Reveal key={it.t} delay={i * 0.05}>
          <div className="grid sm:grid-cols-[220px_1fr] gap-2 sm:gap-8 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <span className="font-display font-semibold text-[15px] tracking-tight">{it.t}</span>
            <span className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{it.d}</span>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/* ── 05 — the three organs ──────────────────── */
function Organs({ modules }) {
  return (
    <div className="mt-9 flex flex-col gap-10">
      {modules.map((m, i) => (
        <Organ key={m.name} m={m} flip={i % 2 === 1} />
      ))}
    </div>
  )
}

function Organ({ m, flip }) {
  const Icon = organIcons[m.name] || FlaskConical
  return (
    <Reveal>
      <div className={`grid lg:grid-cols-2 gap-6 lg:gap-10 items-center ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <BrowserShot file={m.shot} label={m.name} />
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center h-9 w-9 rounded-xl shrink-0" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff' }}>
              <Icon size={17} />
            </span>
            <div>
              <span className="eyebrow" style={{ color: 'var(--accent-text)' }}>{m.organ}</span>
              <h4 className="font-display text-xl font-semibold tracking-tight leading-none mt-0.5">{m.name}</h4>
            </div>
          </div>
          <p className="mt-4 text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--text)' }}>The problem — </span>{m.problem}
          </p>
          <p className="mt-3 text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{m.how}</p>
          <div className="mt-4 flex items-start gap-2.5 rounded-xl p-3.5" style={{ background: 'color-mix(in srgb, var(--accent) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--accent) 22%, transparent)' }}>
            <span className="eyebrow shrink-0 mt-0.5" style={{ color: 'var(--accent-text)' }}>Wow</span>
            <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{m.wow}</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function BrowserShot({ file, label }) {
  const [ok, setOk] = useState(true)
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow)', background: 'var(--surface-2)' }}>
      <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
        <span className="h-2 w-2 rounded-full" style={{ background: 'var(--border-strong)' }} />
        <span className="h-2 w-2 rounded-full" style={{ background: 'var(--border-strong)' }} />
        <span className="h-2 w-2 rounded-full" style={{ background: 'var(--border-strong)' }} />
      </div>
      {ok ? (
        <img src={`/shots/${file}.webp`} alt={`${label} — TestOps Hub`} loading="lazy" className="block w-full" onError={() => setOk(false)} />
      ) : (
        <div className="grid place-items-center aspect-[16/10] font-display font-semibold text-lg" style={{ color: 'var(--text-faint)' }}>{label}</div>
      )}
    </div>
  )
}

/* ── 06 — hard parts ────────────────────────── */
function HardParts({ items }) {
  return (
    <div className="mt-8 grid sm:grid-cols-2 gap-3">
      {items.map((it, i) => (
        <Reveal key={it.t} delay={i * 0.06}>
          <SpotlightCard className="card h-full p-5" style={{ background: 'var(--surface)' }}>
            <h4 className="font-display font-semibold text-[15px] tracking-tight leading-snug" style={{ color: 'var(--accent-text)' }}>{it.t}</h4>
            <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{it.d}</p>
          </SpotlightCard>
        </Reveal>
      ))}
    </div>
  )
}

/* ── 07 — payoff ────────────────────────────── */
function Payoff({ data }) {
  return (
    <>
      <div className="mt-8 flex flex-col gap-2.5 max-w-2xl">
        {data.beforeAfter.map((b, i) => (
          <Reveal key={b.label} delay={i * 0.06}>
            <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto] sm:items-center gap-1.5 sm:gap-5 card p-4" style={{ background: 'var(--surface-2)' }}>
              <span className="text-[14px] font-medium" style={{ color: 'var(--text)' }}>{b.label}</span>
              <span className="flex items-center gap-2 sm:gap-3 text-[13px] sm:text-[13.5px] font-mono justify-start sm:justify-end text-left sm:text-right">
                <span style={{ color: 'var(--text-faint)', textDecoration: 'line-through', textDecorationColor: 'var(--border-strong)' }}>{b.before}</span>
                <ArrowRight size={14} style={{ color: 'var(--accent)' }} className="shrink-0" />
                <span style={{ color: 'var(--accent-text)' }}>{b.after}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {data.metrics.map((m) => (
          <Reveal key={m.label}>
            <Metric value={m.value} suffix={m.suffix} label={m.label} note={m.note} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-8 max-w-2xl text-[14px] leading-relaxed pl-4 border-l-2" style={{ color: 'var(--text-faint)', borderColor: 'var(--border-strong)' }}>
          {data.note}
        </p>
      </Reveal>
    </>
  )
}
