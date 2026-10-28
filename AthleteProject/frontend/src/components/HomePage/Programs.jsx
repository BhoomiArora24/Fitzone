import { ArrowRight } from 'lucide-react'
import ProgramCard from './ProgramCard'
import { programs } from '../data/siteContent'

export default function Programs() {
  const last = programs.items.length - 1
  return (
    <section id="programs" className="mx-auto max-w-[1440px] px-[var(--pad)] pb-11 pt-9 md:pb-14 md:pt-11">
      <div className="mb-[22px] flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-1.5 text-[10.5px] font-medium uppercase tracking-[.14em] text-terra">{programs.label}</p>
          <h2 className="text-[clamp(20px,2.2vw,26px)] font-bold tracking-tight">{programs.title}</h2>
        </div>
        <a href={programs.link.href} className="link group">
          {programs.link.label} <ArrowRight size={14} className="transition-transform group-hover:translate-x-[3px]" />
        </a>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-[18px] lg:grid-cols-3 lg:gap-[26px]">
        {programs.items.map((p, i) => <ProgramCard key={p.id} item={p} wide={i === last} />)}
      </div>
    </section>
  )
}
