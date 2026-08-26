import {
  Brain,
  FlaskConical,
  MessageSquareText,
  Network,
  ShieldCheck,
  BugPlay,
  Webhook,
  ScanText,
} from 'lucide-react'
import { modules } from '../content/profile'
import { RevealGroup, RevealItem, Reveal } from './ui/Reveal'

const icons = { Brain, FlaskConical, MessageSquareText, Network, ShieldCheck, BugPlay, Webhook, ScanText }

export function Modules() {
  return (
    <section className="py-16">
      <div className="shell">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="eyebrow">Inside TestOps Hub</span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                Eight modules, one platform
              </h3>
            </div>
            <p className="max-w-xs text-sm" style={{ color: 'var(--text-faint)' }}>
              Each module solves a distinct QA problem — sharing one governed, AI-aware core.
            </p>
          </div>
        </Reveal>

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {modules.map((m) => {
            const Icon = icons[m.icon] || Brain
            return (
              <RevealItem key={m.name}>
                <article
                  className="card h-full p-6 transition-all duration-300 hover:-translate-y-1.5"
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <div
                    className="grid place-items-center h-11 w-11 rounded-xl mb-5"
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
                  >
                    <Icon size={19} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div className="eyebrow mb-2">{m.tag}</div>
                  <h4 className="font-display font-semibold text-lg tracking-tight mb-2">{m.name}</h4>
                  <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {m.desc}
                  </p>
                </article>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
