import {
  Brain,
  FlaskConical,
  MessageSquareText,
  Network,
  ShieldCheck,
  BugPlay,
  Webhook,
  ScanText,
  ArrowUpRight,
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
                  className="group card relative h-full p-6 overflow-hidden transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow)] hover:border-[color:var(--border-strong)]"
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
                    <Icon
                      size={19}
                      className="relative z-[1] text-[color:var(--accent)] transition-colors duration-300 group-hover:text-white"
                    />
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
