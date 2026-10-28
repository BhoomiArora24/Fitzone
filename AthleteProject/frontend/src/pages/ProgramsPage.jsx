import { Link } from 'react-router-dom'
import {
  Dumbbell,
  LineChart,
  Users,
  Zap,
  Target,
  HeartHandshake,
  Shield,
  Heart,
  UserCheck,
  TrendingUp,
  Flame,
  Activity,
  ArrowRight,
} from 'lucide-react'
import { programsData } from '../data/programsData'

const iconMap = {
  Dumbbell,
  LineChart,
  Users,
  Zap,
  Target,
  HeartHandshake,
  Shield,
  Heart,
  UserCheck,
  TrendingUp,
  Flame,
  Activity,
}

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-[#EDE4D7] pb-24 pt-24 text-[#191916] sm:pt-28 lg:pt-32">
      {/* ── Top Header Section ───────────────────────────────────── */}
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 border-b border-[#D5C9B7] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#626A48]">
                Our Programs
              </span>
              <span className="h-px w-14 bg-[#8A8B70]" />
            </div>

            <h1 className="font-display text-[clamp(2.8rem,6.5vw,5.6rem)] font-extrabold uppercase leading-[0.9] tracking-[0.02em] text-[#191916]">
              Explore <span className="text-[#505A3B]">Programs.</span>
            </h1>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center md:max-w-md lg:max-w-lg">
            <p className="flex-1 text-[12px] leading-relaxed text-[#5F5A50] sm:text-[13px]">
              Training designed around your goals, your lifestyle and the
              stronger version of yourself.
            </p>

            {/* Top Right Corner Join Button in Signature Green */}
            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center justify-center gap-2.5 bg-[#505A3B] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#3E472E] hover:shadow-md"
            >
              Join
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Programs List (Horizontal Rows matching reference UI) ── */}
      <div className="mx-auto max-w-[1560px]">
        {programsData.map((item) => (
          <article
            key={item.id}
            className="border-b border-[#D5C9B7] px-5 py-8 transition-colors duration-200 hover:bg-[#E9DFD0]/40 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8 xl:gap-12">
              {/* Column 1: Number Index (Far Left) */}
              <span className="font-display text-2xl font-bold text-[#A49E8D] sm:text-3xl lg:w-14 lg:shrink-0 xl:w-16 xl:text-4xl">
                {item.id}
              </span>

              {/* Column 2: Program Photograph */}
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#D8D0C2] md:w-[320px] lg:w-[360px] xl:w-[420px]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Column 3: Main Program Details (Center) */}
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#626A48] sm:text-[10px]">
                    {item.category}
                  </span>
                  <span className="h-px w-10 bg-[#8A8B70]" />
                </div>

                <h2 className="font-display text-2xl font-extrabold uppercase leading-none tracking-[0.01em] text-[#191916] sm:text-3xl xl:text-[32px]">
                  {item.title}
                </h2>

                <p className="mt-3 max-w-xl text-[12.5px] leading-[1.7] text-[#514D43] sm:text-[13.5px]">
                  {item.description}
                </p>

                {/* Pill Tags Row */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-[#D5C9B7]/80 bg-[#E3DACB] px-2.5 py-1 text-[10px] font-medium text-[#5F5A50] sm:text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Column 4: Perks List (Right Column with Divider) */}
              <div className="mt-2 flex flex-col gap-3.5 border-t border-[#D5C9B7] pt-4 sm:flex-row sm:flex-wrap lg:mt-0 lg:w-[220px] lg:shrink-0 lg:flex-col lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:w-[250px]">
                {item.perks.map((perk) => {
                  const Icon = iconMap[perk.icon] || Dumbbell
                  return (
                    <div
                      key={perk.text}
                      className="flex items-center gap-3 text-[11px] font-medium text-[#46443D] sm:text-[12px]"
                    >
                      <Icon
                        size={17}
                        className="shrink-0 text-[#505A3B]"
                        strokeWidth={1.8}
                      />
                      <span>{perk.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
