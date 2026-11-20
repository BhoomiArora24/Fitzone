import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Dumbbell,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  HeartHandshake,
  Zap,
  Target,
  Send,
  Check,
} from 'lucide-react'
import { clubApi } from '../api/clubApi'
import { inquiryApi } from '../api/inquiryApi'
import { useAuth } from '../context/AuthContext'

export default function ClubDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated, updateProfile } = useAuth()

  const [club, setClub] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Join Club Opt-in Form State
  const [joinForm, setJoinForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })
  const [joining, setJoining] = useState(false)
  const [joinSuccess, setJoinSuccess] = useState(false)
  const [joinMessage, setJoinMessage] = useState('')

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
          setError('Workout squad not found')
        }
      } catch (err) {
        console.warn('[FitZone] Unable to load club via ID from API:', err.message)
        if (isMounted) {
          setError('Failed to load squad details from server.')
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

  // Sync user info into join form if auth state changes
  useEffect(() => {
    if (user) {
      setJoinForm((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }))
    }
  }, [user])

  // Check if current authenticated user is already enrolled in this club
  const isUserEnrolled =
    Boolean(user?.joinedClub && club?.name && user.joinedClub.toLowerCase() === club.name.toLowerCase())

  // Handle Join Club Opt-in Submission
  const handleJoinClub = async (e) => {
    e?.preventDefault()
    setJoining(true)
    setJoinMessage('')

    try {
      if (isAuthenticated) {
        // Logged in user: update their profile with the joined club
        await updateProfile({ joinedClub: club.name })
        setJoinSuccess(true)
        setJoinMessage(`Congratulations! You are now officially enrolled in ${club.name}.`)
      } else {
        // Non-logged in user: submit enrollment opt-in via inquiry API
        if (!joinForm.name.trim() || !joinForm.email.trim()) {
          alert('Please enter your name and email address to join.')
          setJoining(false)
          return
        }

        await inquiryApi.create({
          name: joinForm.name.trim(),
          email: joinForm.email.trim().toLowerCase(),
          type: 'Membership Inquiry',
          message: `Club Enrollment Opt-in: Requested membership in ${club.name} (Phone: ${joinForm.phone || 'N/A'}).`,
        })

        setJoinSuccess(true)
        setJoinMessage(`Welcome! Your enrollment request for ${club.name} has been confirmed. Our team will reach out shortly.`)
      }
    } catch (err) {
      setJoinMessage(err.message || 'Unable to complete enrollment. Please try again.')
    } finally {
      setJoining(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EDE4D7] flex items-center justify-center py-24 w-full">
        <div className="flex flex-col items-center gap-3 text-[#505A3B]">
          <RefreshCw size={32} className="animate-spin" />
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-[#747167]">
            Loading Squad Curriculum &amp; Details...
          </p>
        </div>
      </div>
    )
  }

  if (error || !club) {
    return (
      <div className="min-h-[75vh] bg-[#EDE4D7] flex flex-col items-center justify-center px-4 py-20 text-center w-full">
        <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#191916]">
          Workout Squad Not Found
        </h1>
        <p className="mt-2 max-w-md text-xs sm:text-sm text-[#747167]">
          {error || 'The requested training club could not be found or loaded from the database.'}
        </p>
        <Link
          to="/#teams"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#505A3B] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#3E472E] transition-all"
        >
          <ArrowLeft size={15} />
          <span>Back to All Workout Clubs</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full bg-[#EDE4D7] text-[#191916] pb-24 overflow-x-hidden selection:bg-[#505A3B] selection:text-white">
      {/* Background subtle paper ambient tone */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_80%_8%,rgba(255,255,255,0.65),transparent_40%),linear-gradient(135deg,rgba(237,228,215,0.98),rgba(237,228,215,0.9))]"
      />

      {/* Top Full-Width Navigation Breadcrumb */}
      <div className="relative z-20 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 max-w-[1700px] mx-auto pt-6 pb-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#626A48] transition-colors hover:text-[#191916]"
        >
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to All Squads</span>
        </button>
      </div>

      {/* Full-Width Main Container */}
      <main className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 max-w-[1700px] mx-auto mt-2">
        {/* ── 1. Full-Width Curved Hero Banner (Editorial Style) ─────────────── */}
        <section className="relative w-full overflow-hidden rounded-[24px] sm:rounded-[36px] lg:rounded-[48px] shadow-2xl border border-[#D5C9B7]/80">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[25/9] w-full overflow-hidden bg-[#24261E]">
            <img
              src={club.image}
              alt={club.name}
              className="h-full w-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
              onError={(e) => {
                e.target.src =
                  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=85'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/35" />

            {/* Top Welcome Title matching reference image */}
            <div className="absolute inset-x-0 top-6 sm:top-10 text-center px-4">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                FitZone Performance Collective
              </span>
              <h3 className="mt-1.5 font-serif text-lg sm:text-2xl lg:text-3xl font-normal text-white/95 tracking-wide">
                Welcome to the <span className="italic font-serif font-light text-[#E8E1CE]">pure world</span> of{' '}
                <span className="font-semibold text-white">{club.name}</span>
              </h3>
            </div>

            {/* Floating Quick Badges on Hero */}
            <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-10 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#FAF7F2] px-3.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#191916] shadow">
                {club.sport}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#505A3B] px-3.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow">
                <Zap size={13} /> {club.intensity || 'High'} Intensity
              </span>
            </div>
          </div>
        </section>

        {/* ── Overlapping Center Emblem Badge ──────────────────────────────── */}
        <div className="relative -mt-7 sm:-mt-9 lg:-mt-10 flex justify-center z-20">
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-4 border-[#EDE4D7] bg-[#505A3B] text-white shadow-xl">
            <Dumbbell size={28} strokeWidth={1.8} className="rotate-45" />
          </div>
        </div>

        {/* ── 2. Editorial Title Section ───────────────────────────────────── */}
        <header className="mt-6 sm:mt-8 text-center space-y-3 max-w-4xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#191916] font-normal tracking-tight leading-[1.12]">
            A <span className="italic font-serif text-[#505A3B]">journey</span> into the heart
            <br />
            of <span className="italic font-serif font-semibold text-[#191916]">athletic performance</span>
          </h1>

          {/* Minimalist Graphic Motif */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="h-px w-12 bg-[#A49A83]" />
            <div className="flex gap-1 text-[#626A48]">
              <Sparkles size={16} />
            </div>
            <span className="h-px w-12 bg-[#A49A83]" />
          </div>

          <h2 className="font-serif text-xl sm:text-2xl text-[#2B2A24] font-normal pt-1">
            More <span className="italic font-serif">than</span> just a training club
          </h2>
        </header>

        {/* ── 3. Dual Column Editorial Narrative & Pill Action Buttons ──────── */}
        <section className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 text-[#3D3A31] leading-relaxed">
          {/* Left Column */}
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-justify font-serif text-[#4A473D] leading-[1.85]">
              {club.description ||
                `${club.name} is not merely a scheduled workout block or a casual fitness group. It is a dedicated standard of athletic mastery where members step onto the floor with singular focus. Under our disciplined framework, athletes learn to respect progressive tension, barbell mechanics, and the quiet consistency required to break long-standing plateaus.`}
            </p>

            <p className="text-xs sm:text-sm text-justify font-serif text-[#4A473D] leading-[1.85]">
              Here, every movement has intention. Whether you are dialing in compound bar paths, increasing anaerobic threshold, or building dense functional hypertrophy, our coaching staff safeguards your form while challenging your perceived limitations.
            </p>

            {/* Pill Action Buttons (Left) */}
            <div className="pt-3 space-y-2.5 max-w-md">
              <a
                href="#about-experience"
                className="flex w-full items-center justify-center rounded-full bg-[#505A3B] py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF7F2] shadow-sm transition-all duration-300 hover:bg-[#3E472E] hover:shadow-md"
              >
                CLUB EXPERIENCE
              </a>

              <a
                href="#coach"
                className="flex w-full items-center justify-center rounded-full bg-[#626B48] py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF7F2] shadow-sm transition-all duration-300 hover:bg-[#4C5435] hover:shadow-md"
              >
                LEAD COACH PROFILE
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-justify font-serif text-[#4A473D] leading-[1.85]">
              Your strengths will be sharpened and your weaknesses addressed. In this collective, you train alongside individuals who honor the process—sharing the floor, encouraging technique refinement, and celebrating personal milestones together.
            </p>

            <p className="text-xs sm:text-sm text-justify font-serif text-[#4A473D] leading-[1.85]">
              Our lead coaches do not stand by passively. They actively curate progressions, monitor recovery markers, and foster a culture of collective resilience where showing up and doing the work is the only prerequisite.
            </p>

            {/* Pill Action Buttons (Right) */}
            <div className="pt-3 space-y-2.5 max-w-md">
              <a
                href="#join-club-optin"
                className="flex w-full items-center justify-center rounded-full bg-[#505A3B] py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF7F2] shadow-sm transition-all duration-300 hover:bg-[#3E472E] hover:shadow-md"
              >
                JOIN THIS CLUB NOW
              </a>

              <Link
                to="/free-pass"
                className="flex w-full items-center justify-center rounded-full bg-[#626B48] py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF7F2] shadow-sm transition-all duration-300 hover:bg-[#4C5435] hover:shadow-md"
              >
                CLAIM A FREE PASS
              </Link>
            </div>
          </div>
        </section>

        {/* ── 4. Secondary Feature: Arched Window & Coaching Philosophy ──────── */}
        <section className="mt-16 sm:mt-24 border-t border-[#D5C9B7] pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Arched Window Photo (Reference Style) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative aspect-[3/4] w-56 sm:w-64 lg:w-72 overflow-hidden rounded-t-[120px] rounded-b-2xl border-2 border-[#D5C9B7] bg-[#D0C7B7] shadow-xl">
                <img
                  src={club.avatar || club.image}
                  alt={club.coach}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=800&q=85'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute bottom-3 inset-x-0 text-center text-xs font-bold uppercase tracking-wider text-white">
                  {club.coach} · Lead Coach
                </span>
              </div>
            </div>

            {/* Editorial Content Beside Arch */}
            <div className="lg:col-span-8 space-y-4 text-[#3D3A31]">
              <h2 className="font-serif text-2xl sm:text-4xl text-[#191916] font-normal leading-snug">
                The <span className="italic font-serif text-[#505A3B]">purest standard</span> of athletic coaching
              </h2>

              <p className="text-xs sm:text-sm text-justify font-serif text-[#4A473D] leading-[1.85]">
                Every athlete who trains with {club.name} is supported by thoughtful, hands-on programming. We combine proven biomechanical principles with relentless work ethic so that every workout translates into longevity, injury resilience, and functional capability.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                <div className="border-l-2 border-[#505A3B] pl-4">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#626A48]">
                    Focus Modality
                  </span>
                  <span className="font-serif text-base sm:text-lg font-semibold text-[#191916]">
                    {club.sport}
                  </span>
                </div>

                <div className="border-l-2 border-[#505A3B] pl-4">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#626A48]">
                    Intensity Level
                  </span>
                  <span className="font-serif text-base sm:text-lg font-semibold text-[#191916]">
                    {club.intensity || 'High Intensity'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Normal Club Experience & Overview (Clean Info Instead of Specs) ── */}
        <section id="about-experience" className="mt-16 sm:mt-24 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626A48]">
              The Club Experience
            </span>
            <h2 className="mt-1 font-serif text-2xl sm:text-4xl text-[#191916]">
              What You Experience in {club.name}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#747167]">
              Everything you need to know about participating, training, and growing with our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-5 shadow-sm space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#505A3B]/10 text-[#505A3B]">
                <Target size={20} />
              </div>
              <h3 className="font-serif text-base font-bold text-[#191916]">
                Targeted Training
              </h3>
              <p className="text-xs text-[#514D43] leading-relaxed">
                Structured sessions designed specifically around {club.sport.toLowerCase()}, helping you develop real strength and endurance.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-5 shadow-sm space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#505A3B]/10 text-[#505A3B]">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-serif text-base font-bold text-[#191916]">
                Coach Guidance
              </h3>
              <p className="text-xs text-[#514D43] leading-relaxed">
                Led by coach {club.coach}, with active cues, posture adjustments, and progressive advice every session.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-5 shadow-sm space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#505A3B]/10 text-[#505A3B]">
                <HeartHandshake size={20} />
              </div>
              <h3 className="font-serif text-base font-bold text-[#191916]">
                Community Support
              </h3>
              <p className="text-xs text-[#514D43] leading-relaxed">
                Train alongside motivated gym members who hold each other accountable, celebrate personal bests, and keep morale high.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-5 shadow-sm space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#505A3B]/10 text-[#505A3B]">
                <Zap size={20} />
              </div>
              <h3 className="font-serif text-base font-bold text-[#191916]">
                All Levels Welcomed
              </h3>
              <p className="text-xs text-[#514D43] leading-relaxed">
                Whether you are refining advanced lifting or building foundational conditioning, exercises are scalable to your current capability.
              </p>
            </div>
          </div>
        </section>

        {/* ── 6. Dedicated Option to Join Club (Opt-In Section) ─────────────── */}
        <section
          id="join-club-optin"
          className="mt-16 sm:mt-24 rounded-3xl border-2 border-[#505A3B] bg-[#FAF7F2] p-6 sm:p-10 lg:p-12 shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Information & Status */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#E3DACB] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#505A3B]">
                <Sparkles size={13} />
                <span>Club Enrollment</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl text-[#191916] font-normal leading-tight">
                Join <span className="italic font-serif font-semibold">{club.name}</span> Today
              </h2>

              <p className="text-xs sm:text-sm text-[#514D43] leading-relaxed font-serif">
                Lock in your spot with our squad. Joining this club connects you directly to Coach {club.coach}&apos;s roster, shared workout challenges, and dedicated gym floor access.
              </p>

              {/* Already Enrolled Banner */}
              {isUserEnrolled && (
                <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800 flex items-start gap-3">
                  <UserCheck size={20} className="shrink-0 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wider">
                      You are an enrolled member of this club!
                    </p>
                    <p className="mt-0.5 text-xs text-emerald-700">
                      Your profile is actively linked with {club.name}. Check in with Coach {club.coach} during your next gym visit.
                    </p>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {joinSuccess && !isUserEnrolled && (
                <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800 flex items-start gap-3">
                  <CheckCircle2 size={20} className="shrink-0 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wider">
                      Enrollment Submitted
                    </p>
                    <p className="mt-0.5 text-xs text-emerald-700">{joinMessage}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Interactive Opt-in Form / Action */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-[#D5C9B7] bg-[#EDE4D7]/70 p-6 sm:p-8 shadow-sm">
                {isAuthenticated ? (
                  /* Authenticated User: One-Click Quick Join */
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#505A3B] text-white font-bold text-sm">
                        {user.name?.slice(0, 2).toUpperCase() || 'FZ'}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#191916]">{user.name}</p>
                        <p className="text-xs text-[#747167]">{user.email}</p>
                      </div>
                    </div>

                    <p className="text-xs text-[#514D43] leading-relaxed">
                      You are signed in. Click below to add <strong>{club.name}</strong> to your member profile.
                    </p>

                    <button
                      type="button"
                      disabled={joining || isUserEnrolled}
                      onClick={handleJoinClub}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#505A3B] py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-md transition-all hover:bg-[#3E472E] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {joining ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : isUserEnrolled ? (
                        <>
                          <Check size={16} />
                          <span>Already Enrolled</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm Club Enrollment</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  /* Guest User: Fast Opt-in Form */
                  <form onSubmit={handleJoinClub} className="space-y-3.5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D3B35]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={joinForm.name}
                        onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="mt-1 w-full rounded-xl border border-[#D5C9B7] bg-white px-3.5 py-2.5 text-xs text-[#191916] placeholder-[#A49E93] focus:border-[#505A3B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D3B35]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={joinForm.email}
                        onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                        placeholder="alex@fitzone.com"
                        className="mt-1 w-full rounded-xl border border-[#D5C9B7] bg-white px-3.5 py-2.5 text-xs text-[#191916] placeholder-[#A49E93] focus:border-[#505A3B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D3B35]">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={joinForm.phone}
                        onChange={(e) => setJoinForm({ ...joinForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="mt-1 w-full rounded-xl border border-[#D5C9B7] bg-white px-3.5 py-2.5 text-xs text-[#191916] placeholder-[#A49E93] focus:border-[#505A3B] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={joining}
                      className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#505A3B] py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-md transition-all hover:bg-[#3E472E] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {joining ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Join {club.name}</span>
                        </>
                      )}
                    </button>

                    <div className="pt-2 text-center">
                      <p className="text-[11px] text-[#747167]">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-[#505A3B] hover:underline">
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. Lead Coach Profile Card ────────────────────────────────────── */}
        <section id="coach" className="mt-16 sm:mt-24 rounded-3xl border border-[#D5C9B7] bg-[#F4EFE6] p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            <img
              src={club.avatar || 'https://i.pravatar.cc/80?img=12'}
              alt={club.coach}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-[#D5C9B7] object-cover shadow"
            />
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-[#191916]">{club.coach}</p>
              <p className="text-xs font-semibold text-[#626A48] uppercase tracking-wider mt-0.5">
                Lead Coach &bull; FitZone {club.sport}
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-[#747167] max-w-lg leading-relaxed">
                Certified Performance Specialist dedicating every session to athlete progression, technical mastery, and safety.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="shrink-0 rounded-full border border-[#505A3B] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#505A3B] hover:bg-[#505A3B] hover:text-white transition-colors"
          >
            Direct Coach Inquiry
          </Link>
        </section>

        {/* ── 8. Bottom Call to Action Banner ───────────────────────────────── */}
        <section className="mt-16 sm:mt-24 rounded-3xl bg-[#505A3B] p-8 sm:p-12 text-center text-white shadow-xl space-y-4">
          <h2 className="font-serif text-2xl sm:text-4xl font-normal">
            Ready to train with <span className="italic font-serif font-semibold">{club.name}</span>?
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-white/85 leading-relaxed font-serif">
            Claim your complimentary workout pass or join the club online to reserve your training spot today.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#join-club-optin"
              className="inline-flex items-center gap-2 rounded-full bg-[#FAF7F2] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#191916] shadow-md transition-all hover:bg-white hover:scale-105"
            >
              <span>Join Club</span>
              <ArrowRight size={14} />
            </a>
            <Link
              to="/#teams"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white hover:bg-white/10 transition-colors"
            >
              <span>Browse All Squads</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
