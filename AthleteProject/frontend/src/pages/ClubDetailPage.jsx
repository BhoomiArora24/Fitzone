import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  MapPin,
  Flame,
  Users,
  Target,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Dumbbell,
  Sparkles,
  RefreshCw,
} from 'lucide-react'
import { clubApi } from '../api'
import { useAuth } from '../context/AuthContext'

export default function ClubDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [club, setClub] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setError(null)

    const fetchClub = async () => {
      try {
        const res = await clubApi.getById(id)
        if (!isMounted) return
        const clubData = res?.data || res
        if (clubData) {
          setClub(clubData)
        } else {
          setError('Club not found')
        }
      } catch (err) {
        console.warn('[FitZone] Unable to load club via ID from API:', err.message)
        if (isMounted) {
          setError('Failed to load club details from server.')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchClub()

    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EDE4D7] flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3 text-[#505A3B]">
          <RefreshCw size={28} className="animate-spin" />
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-[#747167]">
            Loading Squad Curriculum &amp; Details...
          </p>
        </div>
      </div>
    )
  }

  if (error || !club) {
    return (
      <div className="min-h-[75vh] bg-[#EDE4D7] flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold uppercase text-[#191916]">
          Workout Squad Not Found
        </h1>
        <p className="mt-2 max-w-md text-xs text-[#747167]">
          {error || 'The requested training club or squad could not be loaded from the database.'}
        </p>
        <Link
          to="/#teams"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#505A3B] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#3E472E]"
        >
          <ArrowLeft size={14} />
          <span>Back to All Workout Clubs</span>
        </Link>
      </div>
    )
  }

  const members = Number(club.membersCount) || 28
  const capacity = Number(club.maxCapacity) || 35
  const percentFilled = Math.min(Math.round((members / capacity) * 100), 100)
  const spotsLeft = Math.max(capacity - members, 0)

  const perks = Array.isArray(club.perks) && club.perks.length > 0
    ? club.perks
    : [
        'Dedicated Coach Supervision & Technique Video Analysis',
        'Progressive Overload Tracking & PR Milestone Documentation',
        'Reserved Olympic Lifting Platforms & Calibrated Equipment',
        'Small Group Training Roster for Maximum Accountability',
      ]

  return (
    <div className="relative min-h-screen bg-[#EDE4D7] text-[#191916] pb-24 overflow-x-hidden selection:bg-[#505A3B] selection:text-white">
      {/* Subtle paper grain / ambient texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_80%_8%,rgba(255,255,255,0.65),transparent_40%),linear-gradient(135deg,rgba(237,228,215,0.98),rgba(237,228,215,0.9))]"
      />

      {/* Top Navigation Breadcrumb Bar */}
      <div className="relative z-20 mx-auto max-w-5xl px-4 sm:px-6 pt-6 pb-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#626A48] transition-colors hover:text-[#191916]"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to Squads</span>
        </button>
      </div>

      <article className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-2">
        {/* ── 1. Top Curved Hero Banner (Editorial Style) ────────────────── */}
        <div className="relative overflow-hidden rounded-[32px] sm:rounded-[44px] shadow-2xl border border-[#D5C9B7]/80">
          <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full overflow-hidden bg-[#2C2E24]">
            <img
              src={club.image}
              alt={club.name}
              className="h-full w-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
              onError={(e) => {
                e.target.src =
                  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=85'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35" />

            {/* Top Welcome Title matching reference image */}
            <div className="absolute inset-x-0 top-8 text-center px-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                FitZone Performance Collective
              </span>
              <h3 className="mt-1 font-serif text-lg sm:text-2xl font-normal text-white/95 tracking-wide">
                Welcome to the <span className="italic font-serif font-light text-[#E8E1CE]">pure world</span> of{' '}
                <span className="font-semibold text-white">{club.name}</span>
              </h3>
            </div>
          </div>
        </div>

        {/* ── Overlapping Center Emblem Badge ────────────────────────────── */}
        <div className="relative -mt-8 flex justify-center z-20">
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-4 border-[#EDE4D7] bg-[#505A3B] text-white shadow-xl">
            <Dumbbell size={28} strokeWidth={1.8} className="rotate-45" />
          </div>
        </div>

        {/* ── 2. Editorial Title Section ─────────────────────────────────── */}
        <div className="mt-6 text-center space-y-3">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#191916] font-normal tracking-tight leading-[1.12]">
            A <span className="italic font-serif text-[#505A3B]">journey</span> into the heart
            <br />
            of <span className="italic font-serif font-semibold text-[#191916]">athletic performance</span>
          </h1>

          {/* Minimalist Graphic Motif */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="h-px w-10 bg-[#A49A83]" />
            <div className="flex gap-1 text-[#626A48]">
              <Sparkles size={16} />
            </div>
            <span className="h-px w-10 bg-[#A49A83]" />
          </div>

          <h2 className="font-serif text-xl sm:text-2xl text-[#2B2A24] font-normal pt-1">
            More <span className="italic font-serif">than</span> just a training club
          </h2>
        </div>

        {/* ── 3. Dual Column Editorial Narrative & Pill Action Buttons ────── */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-[#3D3A31] leading-relaxed">
          {/* Left Editorial Column */}
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-justify font-serif text-[#4A473D] leading-[1.8]">
              {club.description ||
                `${club.name} is not merely a scheduled workout block or a casual fitness group. It is a dedicated standard of athletic mastery where members step onto the floor with singular focus. Under our disciplined framework, athletes learn to respect progressive tension, barbell mechanics, and the quiet consistency required to break long-standing plateaus.`}
            </p>

            <p className="text-xs sm:text-sm text-justify font-serif text-[#4A473D] leading-[1.8]">
              Here, every movement has intention. Whether you are dialing in compound bar paths, increasing anaerobic threshold, or building dense functional hypertrophy, our coaching staff safeguards your form while challenging your perceived limitations.
            </p>

            {/* Pill Action Buttons (Left) */}
            <div className="pt-3 space-y-2.5">
              <a
                href="#schedule"
                className="flex w-full items-center justify-center rounded-full bg-[#505A3B] py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF7F2] shadow-sm transition-all duration-300 hover:bg-[#3E472E] hover:shadow-md"
              >
                SCHEDULE &amp; TIMINGS
              </a>

              <a
                href="#curriculum"
                className="flex w-full items-center justify-center rounded-full bg-[#626B48] py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF7F2] shadow-sm transition-all duration-300 hover:bg-[#4C5435] hover:shadow-md"
              >
                SQUAD HIGHLIGHTS
              </a>
            </div>
          </div>

          {/* Right Editorial Column */}
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-justify font-serif text-[#4A473D] leading-[1.8]">
              Your strengths will be sharpened and your weaknesses addressed. In this collective, you train alongside individuals who honor the process—sharing the racks, calling out technique adjustments, and logging genuine personal records week over week.
            </p>

            <p className="text-xs sm:text-sm text-justify font-serif text-[#4A473D] leading-[1.8]">
              Our lead coaches do not stand by passively with stopwatches. They actively curate weekly load progressions, monitor recovery markers, and foster a culture of collective resilience where showing up and doing the work is the only prerequisite.
            </p>

            {/* Pill Action Buttons (Right) */}
            <div className="pt-3 space-y-2.5">
              <Link
                to={isAuthenticated ? '/free-pass' : '/register'}
                className="flex w-full items-center justify-center rounded-full bg-[#505A3B] py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF7F2] shadow-sm transition-all duration-300 hover:bg-[#3E472E] hover:shadow-md"
              >
                CLAIM SQUAD PASS
              </Link>

              <a
                href="#coach"
                className="flex w-full items-center justify-center rounded-full bg-[#626B48] py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF7F2] shadow-sm transition-all duration-300 hover:bg-[#4C5435] hover:shadow-md"
              >
                @ LEAD COACH
              </a>
            </div>
          </div>
        </div>

        {/* ── 4. Secondary Feature: Arched Window & Coaching Philosophy ────── */}
        <div className="mt-16 sm:mt-24 border-t border-[#D5C9B7] pt-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Arched Window Photo (Reference Style) */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative aspect-[3/4] w-48 sm:w-56 overflow-hidden rounded-t-[110px] rounded-b-2xl border-2 border-[#D5C9B7] bg-[#D0C7B7] shadow-xl">
                <img
                  src={club.avatar || club.image}
                  alt={club.coach}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=600&q=85'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-3 inset-x-0 text-center text-[10px] font-bold uppercase tracking-wider text-white">
                  {club.coach} · Head Trainer
                </span>
              </div>
            </div>

            {/* Editorial Content Beside Arch */}
            <div className="md:col-span-8 space-y-4 text-[#3D3A31]">
              <h2 className="font-serif text-2xl sm:text-4xl text-[#191916] font-normal leading-snug">
                The <span className="italic font-serif text-[#505A3B]">purest standard</span> of athletic coaching
              </h2>

              <p className="text-xs sm:text-sm text-justify font-serif text-[#4A473D] leading-[1.8]">
                Every athlete who steps under the bar is treated as a unique kinetic system. We bridge biomechanical principles with relentless work ethic so that every pound added to the bar translates into longevity, injury resilience, and raw physical confidence.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border-l-2 border-[#505A3B] pl-3">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#626A48]">
                    Discipline
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#191916]">
                    {club.sport}
                  </span>
                </div>
                <div className="border-l-2 border-[#505A3B] pl-3">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#626A48]">
                    Intensity Level
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#191916]">
                    {club.intensity || 'High'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 5. Practical Information Grid (Schedule, Location, Perks) ── */}
        <div id="schedule" className="mt-16 sm:mt-24 space-y-8">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626A48]">
              Squad Specifications
            </span>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl text-[#191916]">
              Timings, Location &amp; Inclusions
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-4 text-center shadow-sm">
              <Calendar size={20} className="mx-auto text-[#505A3B]" />
              <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#747167]">
                Days &amp; Time
              </p>
              <p className="mt-1 text-xs font-bold text-[#191916]">
                {club.schedule || 'Mon / Wed / Fri · 6:30 PM'}
              </p>
            </div>

            <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-4 text-center shadow-sm">
              <Clock size={20} className="mx-auto text-[#505A3B]" />
              <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#747167]">
                Session Length
              </p>
              <p className="mt-1 text-xs font-bold text-[#191916]">
                {club.duration || '60 Mins'}
              </p>
            </div>

            <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-4 text-center shadow-sm">
              <MapPin size={20} className="mx-auto text-[#505A3B]" />
              <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#747167]">
                Training Zone
              </p>
              <p className="mt-1 text-xs font-bold text-[#191916] truncate">
                {club.location || 'Zone A · Power Rig'}
              </p>
            </div>

            <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-4 text-center shadow-sm">
              <Users size={20} className="mx-auto text-[#505A3B]" />
              <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#747167]">
                Roster Status
              </p>
              <p className="mt-1 text-xs font-bold text-[#505A3B]">
                {spotsLeft > 0 ? `${spotsLeft} Spots Available` : 'Roster Full'}
              </p>
            </div>
          </div>

          {/* Target Audience & Prerequisites */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#626A48] mb-2">
                <Target size={15} />
                <span>Target Audience</span>
              </div>
              <p className="text-xs sm:text-sm text-[#4A473D] leading-relaxed">
                {club.targetAudience || 'Athletes of all levels seeking focused group accountability and progressive strength programming.'}
              </p>
            </div>

            <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#626A48] mb-2">
                <ShieldCheck size={15} />
                <span>Prerequisites</span>
              </div>
              <p className="text-xs sm:text-sm text-[#4A473D] leading-relaxed">
                {club.prerequisites || 'Open to all gym members & complimentary pass holders. Basic enthusiasm to learn compound technique.'}
              </p>
            </div>
          </div>

          {/* Perks Grid */}
          <div id="curriculum" className="rounded-3xl border border-[#D5C9B7] bg-[#FAF7F2] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-[#505A3B]" />
              <h3 className="font-serif text-lg sm:text-xl font-normal text-[#191916]">
                Squad Highlights &amp; Member Inclusions
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {perks.map((perk, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-xl border border-[#E3DACB] bg-white/70 p-3"
                >
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#505A3B]" />
                  <span className="text-xs sm:text-sm font-serif text-[#282820] leading-snug">
                    {perk}
                  </span>
                </div>
              ))}
            </div>

            {/* Capacity Progress Bar */}
            <div className="mt-8 border-t border-[#D5C9B7]/80 pt-6">
              <div className="flex items-center justify-between text-xs font-bold text-[#191916] mb-2">
                <span>Active Squad Roster</span>
                <span>{members} / {capacity} Enrolled ({percentFilled}%)</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-[#E3DACB]">
                <div
                  className="h-full rounded-full bg-[#505A3B] transition-all duration-500"
                  style={{ width: `${percentFilled}%` }}
                />
              </div>
            </div>
          </div>

          {/* Coach Profile Card */}
          <div id="coach" className="rounded-3xl border border-[#D5C9B7] bg-[#F4EFE6] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={club.avatar || 'https://i.pravatar.cc/80?img=12'}
                alt={club.coach}
                className="h-16 w-16 rounded-full border-2 border-[#D5C9B7] object-cover shadow"
              />
              <div>
                <p className="font-serif text-lg font-bold text-[#191916]">{club.coach}</p>
                <p className="text-xs font-semibold text-[#626A48] uppercase tracking-wider">
                  Lead Coach · FitZone {club.sport}
                </p>
                <p className="mt-1 text-xs text-[#747167]">
                  Certified Performance Specialist &bull; Strength Periodization Coach
                </p>
              </div>
            </div>

            <Link
              to="/contact"
              className="shrink-0 rounded-full border border-[#505A3B] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#505A3B] hover:bg-[#505A3B] hover:text-white transition-colors"
            >
              Direct Inquiry
            </Link>
          </div>

          {/* Bottom Call to Action Banner */}
          <div className="rounded-3xl bg-[#505A3B] p-8 text-center text-white shadow-xl space-y-4">
            <h2 className="font-serif text-2xl sm:text-4xl font-normal">
              Ready to train with <span className="italic font-serif font-semibold">{club.name}</span>?
            </h2>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-white/85 leading-relaxed font-serif">
              Claim your complimentary workout pass or activate your membership today to reserve your spot on the platform.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={isAuthenticated ? '/free-pass' : '/register'}
                className="inline-flex items-center gap-2 rounded-full bg-[#FAF7F2] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#191916] shadow-md transition-all hover:bg-white hover:scale-105"
              >
                <span>{isAuthenticated ? 'Claim Workout Pass' : 'Register & Join Squad'}</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/#teams"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white hover:bg-white/10 transition-colors"
              >
                <span>Browse All Squads</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
