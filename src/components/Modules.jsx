import {
  LayoutDashboard, History, Brain, MessageSquareText, Wand2, FlaskConical, Network,
  Activity, ShieldCheck, Radar, Receipt, KanbanSquare, Webhook, Library, MessagesSquare, Inbox, ArrowUpRight,
} from 'lucide-react'
import { tourModules } from '../content/profile'
import { RevealGroup, RevealItem, Reveal } from './ui/Reveal'
import { SpotlightCard } from './ui/SpotlightCard'

const icons = { LayoutDashboard, History, Brain, MessageSquareText, Wand2, FlaskConical, Network, Activity, ShieldCheck, Radar, Receipt, KanbanSquare, Webhook, Library, MessagesSquare, Inbox }

// group modules by category, preserving declaration order + global index
const GROUPS = (() => {
  const order = []
  const map = {}
  tourModules.forEach((m, i) => {
    if (!map[m.category]) { map[m.category] = []; order.push(m.category) }
    map[m.category].push({ ...m, index: i })
  })
  return order.map((cat) => ({ cat, items: map[cat] }))
})()

function openInTour(index) {
  window.dispatchEvent(new CustomEvent('tour:select', { detail: index }))
  document.getElementById('tour')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Modules() {
  return (
    <section className="py-16 sm:py-20">
      <div className="shell">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <span className="eyebrow">Inside TestOps Hub</span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                {tourModules.length} modules, one platform
              </h3>
            </div>
            <p className="max-w-xs text-sm" style={{ color: 'var(--text-faint)' }}>
              Grouped by what they do. Click any to open it live in the tour below.
            </p>
          </div>
        </Reveal>

        <div className="space-y-11">
          {GROUPS.map((g) => (
            <div key={g.cat}>
              {/* category header */}
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="eyebrow !text-[11px]" style={{ color: 'var(--accent)' }}>{g.cat}</span>
                  <span className="font-mono text-[11px]" style={{ color: 'var(--text-faint)' }}>{String(g.items.length).padStart(2, '0')}</span>
                  <span className="h-px flex-1" style={{ background: 'var(--border)' }} />
                </div>
              </Reveal>

              <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {g.items.map((m) => {
                  const Icon = icons[m.icon] || Brain
                  return (
                    <RevealItem key={m.id} className="h-full">
                      <SpotlightCard
                        as="button"
                        onClick={() => openInTour(m.index)}
                        aria-label={`Open ${m.name} in the tour`}
                        className="group card w-full h-full text-left p-5 flex flex-col overflow-hidden cursor-pointer transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow)] hover:border-[color:var(--border-strong)]"
                      >
                        <ArrowUpRight size={16} className="absolute top-4 right-4 opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" style={{ color: 'var(--accent)' }} />
                        <div className="flex items-center gap-3 mb-3">
                          <div className="relative grid place-items-center h-10 w-10 rounded-xl shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-105" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                            <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }} />
                            <Icon size={18} className="relative z-[1] text-[color:var(--accent)] transition-colors duration-300 group-hover:text-white" />
                          </div>
                          <h4 className="font-display font-semibold text-[15px] tracking-tight leading-tight">{m.name}</h4>
                        </div>
                        <p className="text-[13px] leading-relaxed line-clamp-3 flex-1" style={{ color: 'var(--text-muted)' }}>
                          {m.tagline}
                        </p>
                        <div className="mt-3 h-4 flex items-center gap-1.5 font-mono text-[10.5px]" style={{ color: 'var(--text-faint)' }}>
                          {m.shots.length > 1 ? `${m.shots.length} views` : ''}
                        </div>
                      </SpotlightCard>
                    </RevealItem>
                  )
                })}
              </RevealGroup>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
