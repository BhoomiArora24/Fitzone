import { UserRound, Target, HeartHandshake } from 'lucide-react'
import { images, banner } from '../data/siteContent'

const perkIcons = [UserRound, Target, HeartHandshake]

export default function LifestyleBanner() {
  return (
    <section id="coaching" className="relative min-h-[340px] overflow-hidden bg-[#2a2c20] text-white">
      <img src={images.lifestyleBanner} alt={banner.alt} loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[80%_50%] md:object-[75%_55%]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#14140e]/80 to-[#14140e]/35 md:bg-gradient-to-r md:from-[#14140e]/80 md:via-[#14140e]/55 md:via-[38%] md:to-transparent md:to-[68%]" />
      <div className="relative mx-auto flex max-w-[1440px] items-center gap-[clamp(24px,5vw,80px)] px-[var(--pad)] pb-[200px] pt-11 md:py-[54px]">
        <div className="flex flex-col items-start">
          <p className="-rotate-2 font-script text-[22px] leading-[1.1] text-[#d28668]">{banner.script}</p>
          <h2 className="my-1.5 font-display text-[clamp(40px,5vw,66px)] font-normal uppercase leading-none">
            {banner.lines.map(l => <span key={l} className="block">{l}</span>)}
          </h2>
          <p className="mb-5 mt-1.5 -rotate-[1.5deg] font-script text-[22px] leading-[1.1] text-[#e6c9b0]">{banner.script2}</p>
          <a href={banner.cta.href} className="btn btn-lg bg-terra hover:bg-terra-dark">{banner.cta.label}</a>
        </div>
        <ul className="hidden flex-col gap-[18px] lg:flex">
          {banner.perks.map((p, i) => {
            const I = perkIcons[i]
            return (
              <li key={p} className="flex max-w-[150px] items-center gap-3 text-[10px] uppercase leading-snug tracking-[.1em]">
                <I size={16} strokeWidth={1.5} className="box-content flex-none rounded-full border border-white/50 p-2" />{p}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
