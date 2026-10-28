import { ArrowRight } from 'lucide-react'
import SocialProof from './SocialProof'
import { images, hero } from '../../data/siteContent' 

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate grid overflow-hidden bg-cream pt-14 md:min-h-[min(640px,calc(100vh-60px))] md:grid-cols-[46fr_54fr] md:pt-[68px] lg:grid-cols-[42fr_58fr]"
    >
      {/* Full hero background image */}
      <img
        src={images.hero}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover object-[70%_40%] md:object-[60%_40%]"
      />

      {/* All existing content stays above the image */}
      <div className="relative z-10 flex flex-col items-start justify-center pb-8 pl-[var(--pad)] pr-[var(--pad)] pt-9 md:py-12 md:pr-0 lg:py-[72px]">
        <p className="mb-[22px] text-[10.5px] uppercase tracking-[.1em] text-mute">
          {hero.eyebrow}{' '}
          <span className="text-terra">{hero.eyebrowAccent}</span>
        </p>

        <h1 className="mb-[26px] font-display text-[clamp(56px,7.4vw,108px)] font-normal uppercase leading-[.96] tracking-[.005em] md:text-[clamp(48px,8vw,72px)] lg:text-[clamp(56px,7.4vw,108px)]">
          {hero.lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
          <span className="block text-olive">{hero.accentLine}</span>
        </h1>

        <p className="mb-[26px] max-w-[300px] text-sm leading-relaxed text-[#3b3a35]">
          {hero.body}
        </p>

        <a
          href={hero.cta.href}
          className="btn btn-lg group bg-olive hover:bg-olive-dark"
        >
          {hero.cta.label}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-[3px]"
          />
        </a>

        <SocialProof />
      </div>
    </section>
  )
}