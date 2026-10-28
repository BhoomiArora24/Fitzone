import { ArrowRight, Dumbbell, Flower2, Leaf } from 'lucide-react'
import { images } from '../data/siteContent'

const icons = { dumbbell: Dumbbell, lotus: Flower2, leaf: Leaf }
const tones = {
  olive: { badge: 'bg-olive', link: 'text-olive' },
  terracotta: { badge: 'bg-terra', link: 'text-terra' },
}

export default function ProgramCard({ item, wide = false }) {
  const Icon = icons[item.icon]
  const t = tones[item.tone]
  // `wide` = last card; on tablet it spans both columns and goes horizontal
  return (
    <article className={`flex flex-col overflow-hidden rounded-md border border-line bg-cream text-center ${wide ? 'md:max-lg:col-span-2 md:max-lg:flex-row md:max-lg:text-left' : ''}`}>
      <div className={`relative ${wide ? 'md:max-lg:w-1/2' : ''}`}>
        <img src={images[item.id]} alt={item.alt} loading="lazy" className="aspect-[16/10] w-full object-cover md:max-lg:h-full md:max-lg:aspect-auto" />
        <span className={`absolute bottom-0 left-1/2 z-10 grid h-11 w-11 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full border-[3px] border-cream text-white ${t.badge} ${wide ? 'md:max-lg:hidden' : ''}`}>
          <Icon size={20} strokeWidth={1.6} />
        </span>
      </div>
      <div className={`flex flex-1 flex-col items-center gap-2.5 px-6 pb-6 pt-[34px] ${wide ? 'md:max-lg:items-start md:max-lg:justify-center md:max-lg:pt-6' : ''}`}>
        <h3 className="text-sm font-bold uppercase tracking-[.09em]">{item.title}</h3>
        <p className="max-w-[250px] flex-1 text-[12.5px] leading-[1.55] text-mute">{item.text}</p>
        <a href={item.href} className={`link mt-1.5 ${t.link}`}>
          Explore <ArrowRight size={13} className="transition-transform group-hover:translate-x-[3px]" />
        </a>
      </div>
    </article>
  )
}
