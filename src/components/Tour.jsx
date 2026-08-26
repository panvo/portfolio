import { motion } from 'framer-motion'
import { Search, Sparkles, ShieldCheck } from 'lucide-react'
import { tour } from '../content/profile'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

/**
 * A SAFE demo of TestOps Hub: representative UI built with sample data only.
 * No live records, no auth, no backend — nothing real is exposed.
 * To use real captures instead, drop images in /public/shots and swap a panel
 * for <img src="/shots/cortex.png" className="w-full" />.
 */
export function Tour() {
  return (
    <section id="tour" className="py-24 sm:py-28 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="shell">
        <SectionHeading kicker={tour.kicker} title={tour.title} sub={tour.sub} />

        <div className="grid lg:grid-cols-2 gap-6">
          <Reveal>
            <BrowserFrame label="cortex · ask">
              <CortexMock />
            </BrowserFrame>
          </Reveal>
          <Reveal delay={0.06}>
            <BrowserFrame label="test-studio · scenarios">
              <StudioMock />
            </BrowserFrame>
          </Reveal>
          <Reveal delay={0.1}>
            <BrowserFrame label="test-design · decision-table">
              <DecisionTableMock />
            </BrowserFrame>
          </Reveal>
          <Reveal delay={0.14}>
            <BrowserFrame label="delivery-board · flow">
              <DeliveryBoardMock />
            </BrowserFrame>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
            <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
            Representative UI · sample data only · no live records or logins exposed
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function BrowserFrame({ label, children }) {
  return (
    <motion.div
      className="browser"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div className="browser-bar">
        <span className="browser-dot" style={{ background: '#ff5f57' }} />
        <span className="browser-dot" style={{ background: '#febc2e' }} />
        <span className="browser-dot" style={{ background: '#28c840' }} />
        <span className="ml-3 font-mono text-[12.5px]" style={{ color: 'var(--text-faint)' }}>{label}</span>
      </div>
      <div className="p-5 sm:p-6" style={{ minHeight: 300 }}>{children}</div>
    </motion.div>
  )
}

/* ── Cortex: AI knowledge answer with citations ─────────────── */
function CortexMock() {
  return (
    <div>
      <div className="flex items-center gap-2 rounded-xl px-3.5 py-2.5" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
        <Search size={16} style={{ color: 'var(--text-faint)' }} />
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>How do we validate refund edge cases?</span>
      </div>

      <div className="mt-4 rounded-xl p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} style={{ color: 'var(--accent)' }} />
          <span className="eyebrow">Answer</span>
          <span className="ml-auto text-[12.5px] font-mono px-2 py-0.5 rounded-full" style={{ color: '#22c55e', border: '1px solid rgba(34,197,94,0.4)' }}>
            High · 0.94
          </span>
        </div>
        <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Refund edge cases are covered by three scenarios. A refund that exceeds the original charge must be
          rejected; partial refunds round to two decimals; and refunds to an expired card fall back to store
          credit.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {['SPEC-142', 'TC-1042', 'KB-07'].map((c) => (
            <span key={c} className="text-[12.5px] font-mono px-2 py-1 rounded-md" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Test Studio: scenario table ────────────────────────────── */
const rows = [
  { id: 'QA-1042', name: 'Refund exceeds original charge', pri: 'High', status: 'Failed' },
  { id: 'QA-1043', name: 'Partial refund rounds correctly', pri: 'Medium', status: 'Passed' },
  { id: 'QA-1044', name: 'Refund to expired card', pri: 'High', status: 'Blocked' },
  { id: 'QA-1045', name: 'Duplicate refund prevented', pri: 'High', status: 'Passed' },
]
const statusColor = {
  Passed: { c: '#22c55e', b: 'rgba(34,197,94,0.4)' },
  Failed: { c: '#f43f5e', b: 'rgba(244,63,94,0.4)' },
  Blocked: { c: '#f59e0b', b: 'rgba(245,158,11,0.4)' },
}

function StudioMock() {
  return (
    <div>
      <div className="grid grid-cols-[auto_1fr_auto_auto] gap-x-4 px-1 pb-3 eyebrow" style={{ borderBottom: '1px solid var(--border)' }}>
        <span>ID</span>
        <span>Test case</span>
        <span>Priority</span>
        <span>Status</span>
      </div>
      {rows.map((r) => {
        const s = statusColor[r.status]
        return (
          <div key={r.id} className="grid grid-cols-[auto_1fr_auto_auto] gap-x-4 items-center px-1 py-3 text-[14px]" style={{ borderBottom: '1px solid var(--border)' }}>
            <span className="font-mono text-[12px]" style={{ color: 'var(--text-faint)' }}>{r.id}</span>
            <span style={{ color: 'var(--text-muted)' }}>{r.name}</span>
            <span className="text-[12.5px]" style={{ color: r.pri === 'High' ? 'var(--accent)' : 'var(--text-faint)' }}>{r.pri}</span>
            <span className="text-[12.5px] font-mono px-2 py-0.5 rounded-full whitespace-nowrap" style={{ color: s.c, border: `1px solid ${s.b}` }}>
              {r.status}
            </span>
          </div>
        )
      })}
      <div className="mt-4 flex items-center gap-2 text-[12.5px] font-mono" style={{ color: 'var(--text-faint)' }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#22c55e' }} /> 2 passed
        <span className="h-1.5 w-1.5 rounded-full ml-2" style={{ background: '#f43f5e' }} /> 1 failed
        <span className="h-1.5 w-1.5 rounded-full ml-2" style={{ background: '#f59e0b' }} /> 1 blocked
      </div>
    </div>
  )
}

/* ── Decision Table: conditions → rules → actions ───────────── */
const conditions = [
  ['Valid card', ['Y', 'Y', 'Y', 'N']],
  ['Sufficient funds', ['Y', 'Y', 'N', '–']],
  ['Within daily limit', ['Y', 'N', '–', '–']],
]
const actions = [
  ['Approve', [true, false, false, false]],
  ['Decline', [false, true, true, true]],
]

function DecisionTableMock() {
  return (
    <div>
      <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] gap-x-2 pb-2 eyebrow" style={{ borderBottom: '1px solid var(--border)' }}>
        <span>Condition</span>
        {['R1', 'R2', 'R3', 'R4'].map((r) => <span key={r} className="text-center">{r}</span>)}
      </div>
      {conditions.map(([name, vals]) => (
        <div key={name} className="grid grid-cols-[1.4fr_repeat(4,1fr)] gap-x-2 py-2.5 items-center text-[14px]" style={{ borderBottom: '1px solid var(--border)' }}>
          <span style={{ color: 'var(--text-muted)' }}>{name}</span>
          {vals.map((v, i) => (
            <span key={i} className="text-center font-mono text-[13px]" style={{ color: v === 'Y' ? 'var(--accent)' : v === 'N' ? 'var(--text-faint)' : 'var(--text-faint)' }}>{v}</span>
          ))}
        </div>
      ))}
      {actions.map(([name, marks]) => (
        <div key={name} className="grid grid-cols-[1.4fr_repeat(4,1fr)] gap-x-2 py-2.5 items-center text-[14px]" style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="font-medium" style={{ color: 'var(--text)' }}>{name}</span>
          {marks.map((m, i) => (
            <span key={i} className="grid place-items-center">
              {m ? <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--accent)' }} /> : <span style={{ color: 'var(--text-faint)' }}>·</span>}
            </span>
          ))}
        </div>
      ))}
      <p className="mt-3 text-[12.5px] font-mono" style={{ color: 'var(--text-faint)' }}>4 rules · full condition coverage</p>
    </div>
  )
}

/* ── Delivery Board: kanban flow ────────────────────────────── */
const board = [
  { col: 'To do', tint: 'var(--text-faint)', cards: [{ t: 'Payments regression', tag: '12 cases' }] },
  { col: 'In progress', tint: 'var(--accent)', cards: [{ t: 'Refund edge cases', tag: '8 cases' }, { t: 'Login rate-limit', tag: '5 cases' }] },
  { col: 'Done', tint: '#22c55e', cards: [{ t: 'Checkout smoke', tag: 'passed' }] },
]

function DeliveryBoardMock() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {board.map((c) => (
        <div key={c.col}>
          <div className="flex items-center gap-1.5 mb-3">
            <span className="h-2 w-2 rounded-full" style={{ background: c.tint }} />
            <span className="eyebrow">{c.col}</span>
          </div>
          <div className="space-y-2.5">
            {c.cards.map((card) => (
              <div key={card.t} className="rounded-lg p-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                <div className="text-[13px] font-medium leading-snug" style={{ color: 'var(--text)' }}>{card.t}</div>
                <div className="mt-1.5 text-[12px] font-mono" style={{ color: 'var(--text-faint)' }}>{card.tag}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
