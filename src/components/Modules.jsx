import {
  LayoutDashboard, Brain, MessageSquareText, Wand2, ClipboardCheck, FlaskConical,
  Activity, ShieldCheck, Radar, Receipt, KanbanSquare, Webhook, MessagesSquare, ArrowUpRight,
} from 'lucide-react'
import { tourModules } from '../content/profile'
import { RevealGroup, RevealItem, Reveal } from './ui/Reveal'
import { SpotlightCard } from './ui/SpotlightCard'

const icons = { LayoutDashboard, Brain, MessageSquareText, Wand2, ClipboardCheck, FlaskConical, Activity, ShieldCheck, Radar, Receipt, KanbanSquare, Webhook, MessagesSquare }

function openInTour(index) {
  window.dispatchEvent(new CustomEvent('tour:select', { detail: index }))
  document.getElementById('tour')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Modules() {
  return (
    <section className="py-16">
      <div className="shell">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="eyebrow">Inside TestOps Hub</span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                {tourModules.length} modules, one platform
              </h3>
            </div>
            <p className="max-w-xs text-sm" style={{ color: 'var(--text-faint)' }}>
              Each solves a distinct QA problem — click any to open it live in the tour below.
            </p>
          </div>
        </Reveal>

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {tourModules.map((m, i) => {
            const Icon = icons[m.icon] || Brain
            return (
              <RevealItem key={m.id}>
                <SpotlightCard
                  as="button"
                  onClick={() => openInTour(i)}
                  aria-label={`Open ${m.name} in the tour`}
                  className="group card w-full h-full text-left p-6 overflow-hidden cursor-pointer transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow)] hover:border-[color:var(--border-strong)]"
                >
                  <ArrowUpRight
                    size={18}
                    className="absolute top-5 right-5 opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                    style={{ color: 'var(--accent)' }}
                  />
                  <div
                    className="relative grid place-items-center h-11 w-11 rounded-xl mb-5 overflow-hidden transition-transform duration-300 group-hover:scale-105"
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
                  >
                    <span
                      className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
                    />
                    <Icon size={19} className="relative z-[1] text-[color:var(--accent)] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div className="eyebrow mb-2">{m.category}</div>
                  <h4 className="font-display font-semibold text-lg tracking-tight mb-2">{m.name}</h4>
                  <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {m.tagline}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{ color: 'var(--accent)' }}
                  >
                    See it live <ArrowUpRight size={12} />
                  </span>
                </SpotlightCard>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
