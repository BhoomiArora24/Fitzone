import { useState } from 'react'
import {
  ArrowRight,
  ChevronRight,
  Trophy,
} from 'lucide-react'

const teams = [
  {
    sport: 'Strength',
    name: 'Barbell Club',
    ageGroup: 'All Levels',
    coach: 'Arjun Mehta',
    achievements: 150,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85',
    avatar:
      'https://i.pravatar.cc/80?img=12',
  },
  {
    sport: 'HIIT',
    name: 'MetCon Squad',
    ageGroup: 'Intermediate',
    coach: 'Rohan Sinha',
    achievements: 45,
    image:
      'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=900&q=85',
    avatar:
      'https://i.pravatar.cc/80?img=11',
  },
  {
    sport: 'Hypertrophy',
    name: 'Bodybuilding Crew',
    ageGroup: 'Advanced',
    coach: 'Priya Kapoor',
    achievements: 80,
    image:
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=85',
    avatar:
      'https://i.pravatar.cc/80?img=47',
  },
  {
    sport: 'Functional',
    name: 'Cross-Training Unit',
    ageGroup: 'All Levels',
    coach: 'Karan Malhotra',
    achievements: 200,
    image:
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=85',
    avatar:
      'https://i.pravatar.cc/80?img=13',
  },
  {
    sport: 'Powerlifting',
    name: 'Heavy Iron League',
    ageGroup: 'Advanced',
    coach: 'Vikram Singh',
    achievements: 95,
    image:
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=900&q=85',
    avatar:
      'https://i.pravatar.cc/80?img=14',
  },
]

function TeamCard({ team }) {
  return (
    <article className="group min-w-0 overflow-hidden border border-[#D8CDBB]/80 bg-[#F5EEE3] transition-all duration-300 hover:-translate-y-1 hover:border-[#777B60]">
      {/* Team photograph */}
      <a
        href={`/teams/${team.name.toLowerCase().replaceAll(' ', '-')}`}
        aria-label={`Explore ${team.name}`}
        className="relative block aspect-[1.6/1] overflow-hidden bg-[#D8D0C2]"
      >
        <img
          src={team.image}
          alt={`${team.sport} ${team.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />

        <span className="absolute left-2 top-2.5 rounded-full bg-[#F4EDE2] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.09em] text-[#282820] sm:left-3 sm:top-3 sm:text-[9px]">
          {team.sport}
        </span>
      </a>

      {/* Team details */}
      <div className="px-3 pb-3 pt-3 sm:px-3.5 sm:pt-3.5">
        <h3 className="font-display text-[21px] font-bold uppercase leading-tight tracking-[0.02em] text-[#202019] sm:text-[23px]">
          {team.name}
        </h3>

        <p className="mt-1.5 text-[10px] text-[#716B5F] sm:text-[11px]">
          Training Level: {team.ageGroup}
        </p>

        <div className="my-2.5 h-px bg-[#DCD2C1]" />

        {/* Coach and achievements */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <img
              src={team.avatar}
              alt=""
              loading="lazy"
              className="h-7 w-7 shrink-0 rounded-full border border-[#D5C9B7] object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-[9px] font-semibold text-[#282820] sm:text-[10px]">
                {team.coach}
              </p>
              <p className="mt-0.5 text-[8px] text-[#80786B] sm:text-[9px]">
                Lead Trainer
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-start gap-1.5">
            <Trophy
              size={15}
              strokeWidth={1.7}
              className="mt-0.5 text-[#35372A]"
            />
            <div>
              <p className="text-[12px] font-bold leading-none text-[#29291F]">
                {team.achievements}
              </p>
              <p className="mt-1 text-[8px] text-[#80786B] sm:text-[9px]">
                PRs Logged
              </p>
            </div>
          </div>
        </div>

        <div className="my-2.5 h-px bg-[#CFC4B2]" />

        <a
          href={`/teams/${team.name.toLowerCase().replaceAll(' ', '-')}`}
          className="group/link inline-flex items-center gap-2 py-1 text-[9px] font-bold uppercase tracking-[0.06em] text-[#35372A] transition-colors hover:text-[#777B60]"
        >
          Join Squad
          <ArrowRight
            size={12}
            className="transition-transform duration-300 group-hover/link:translate-x-1"
          />
        </a>
      </div>
    </article>
  )
}

export default function Teams() {
  const [activeIndex, setActiveIndex] = useState(0)

  const visibleTeams = teams.map(
    (_, index) => teams[(index + activeIndex) % teams.length]
  )

  const moveNext = () => {
    setActiveIndex((current) => (current + 1) % teams.length)
  }

  const movePrevious = () => {
    setActiveIndex(
      (current) => (current - 1 + teams.length) % teams.length
    )
  }

  return (
    <section
      id="teams"
      className="relative overflow-hidden bg-[#EDE4D7] py-12 text-[#191916] sm:py-16 lg:py-[72px]"
    >
      {/* Subtle architectural background texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_8%,rgba(255,255,255,0.52),transparent_40%),linear-gradient(115deg,rgba(237,228,215,0.98),rgba(237,228,215,0.82))]"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-[4.2%]">
        {/* Section heading */}
        <div className="mb-7 flex flex-col gap-5 lg:mb-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="shrink-0">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-[9px] font-medium uppercase tracking-[0.17em] text-[#626A48]">
                Workout Squads
              </span>
              <span className="h-px w-14 bg-[#A49A83]" />
            </div>

            <h2 className="font-display text-[clamp(2.5rem,4.2vw,4.2rem)] font-bold uppercase leading-[1.08] tracking-[0.03em] sm:tracking-[0.05em]">
              Training{' '}
              <span className="text-[#505A3B]">&amp; Workout Clubs</span>
            </h2>
          </div>

          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <p className="max-w-[280px] text-[11px] leading-[1.7] text-[#5F5A50] sm:text-xs">
              Train with focused workout squads that push your intensity, guided
              by elite trainers and a dedicated gym community.
            </p>

            <a
              href="/teams"
              className="group hidden shrink-0 items-center gap-3 border border-[#B8AD99] px-3.5 py-3 text-[8px] font-bold uppercase tracking-[0.06em] transition-colors hover:border-[#505A3B] hover:bg-[#505A3B] hover:text-white sm:inline-flex"
            >
              Explore All Workout Clubs
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2.5">
          {visibleTeams.slice(0, 4).map((team) => (
            <TeamCard key={team.name} team={team} />
          ))}
        </div>

        {/* Bottom controls */}
        <div className="mt-5 flex items-center justify-between">
          <a
            href="/teams"
            className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.08em] text-[#505A3B] sm:hidden"
          >
            Explore All Workout Clubs
            <ArrowRight size={13} />
          </a>

          <span className="text-[9px] tracking-[0.12em] text-[#777163]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(teams.length).padStart(2, '0')}
          </span>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={movePrevious}
              aria-label="Previous workout clubs"
              className="flex h-8 w-8 items-center justify-center border border-[#B9AE9A] text-[#505A3B] transition-colors hover:bg-[#505A3B] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#505A3B]"
            >
              <ChevronRight size={16} className="rotate-180" />
            </button>

            <button
              type="button"
              onClick={moveNext}
              aria-label="Next workout clubs"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#626B48] text-white transition-all duration-300 hover:scale-105 hover:bg-[#454D33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#505A3B]"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
