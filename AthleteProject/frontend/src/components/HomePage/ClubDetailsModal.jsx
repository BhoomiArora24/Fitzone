import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Flame,
  Users,
  Target,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function ClubDetailsModal({ club, onClose }) {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (club) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [club, onClose])

  if (!club) return null

  const members = Number(club.membersCount || club.achievements) || 24
  const capacity = Number(club.maxCapacity) || 35
  const percentFilled = Math.min(Math.round((members / capacity) * 100), 100)
  const spotsLeft = Math.max(capacity - members, 0)

  const perks = Array.isArray(club.perks) && club.perks.length > 0
    ? club.perks
    : [
        'Structured progressive overload & personal record tracking',
        'Direct technique coaching & video biomechanics feedback',
        'Reserved floor equipment & Olympic barbell racks',
        'Dedicated squad community & training partner pairing',
      ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-[#D5C9B7] bg-[#FAF7F2] text-[#191916] shadow-2xl"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-transform duration-200 hover:scale-105 hover:bg-black/75"
          >
            <X size={18} />
          </button>

          {/* Hero Banner */}
          <div className="relative aspect-[2.1/1] w-full overflow-hidden bg-[#2D3025]">
            <img
              src={club.image}
              alt={club.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.src =
                  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C14] via-[#1A1C14]/40 to-transparent" />

            {/* Badges on hero */}
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#FAF7F2] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#282820] shadow">
                {club.sport}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#505A3B] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                <Flame size={12} /> {club.ageGroup || club.intensity || 'High Intensity'}
              </span>
            </div>

            {/* Title on hero bottom */}
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="font-display text-2xl font-black uppercase tracking-wide text-white sm:text-3xl">
                {club.name}
              </h2>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-7 space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-[#D5C9B7]/80 bg-white/70 p-3 text-center">
                <Calendar size={18} className="mx-auto text-[#505A3B]" />
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-[#747167]">
                  Schedule
                </p>
                <p className="mt-0.5 text-xs font-bold text-[#191916]">
                  {club.schedule || 'Mon / Wed / Fri'}
                </p>
              </div>

              <div className="rounded-2xl border border-[#D5C9B7]/80 bg-white/70 p-3 text-center">
                <Clock size={18} className="mx-auto text-[#505A3B]" />
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-[#747167]">
                  Duration
                </p>
                <p className="mt-0.5 text-xs font-bold text-[#191916]">
                  {club.duration || '60 Mins'}
                </p>
              </div>

              <div className="rounded-2xl border border-[#D5C9B7]/80 bg-white/70 p-3 text-center">
                <MapPin size={18} className="mx-auto text-[#505A3B]" />
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-[#747167]">
                  Location
                </p>
                <p className="mt-0.5 text-xs font-bold text-[#191916] truncate">
                  {club.location || 'Zone A · Power Rig'}
                </p>
              </div>

              <div className="rounded-2xl border border-[#D5C9B7]/80 bg-white/70 p-3 text-center">
                <Users size={18} className="mx-auto text-[#505A3B]" />
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-[#747167]">
                  Availability
                </p>
                <p className="mt-0.5 text-xs font-bold text-[#505A3B]">
                  {spotsLeft > 0 ? `${spotsLeft} Spots Left` : 'Waitlist Only'}
                </p>
              </div>
            </div>

            {/* Lead Trainer Card */}
            <div className="flex items-center justify-between rounded-2xl border border-[#D5C9B7] bg-[#F2ECE1] p-4">
              <div className="flex items-center gap-3">
                <img
                  src={club.avatar || 'https://i.pravatar.cc/80?img=12'}
                  alt={club.coach}
                  className="h-12 w-12 rounded-full border border-[#D5C9B7] object-cover shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-sm text-[#191916]">{club.coach}</p>
                    <span className="inline-flex items-center gap-1 rounded bg-[#E3DACB] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#505A3B]">
                      <ShieldCheck size={10} /> Lead Coach
                    </span>
                  </div>
                  <p className="text-xs text-[#747167]">Program Director &amp; Head Coach</p>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <span className="text-xs font-bold text-[#505A3B]">FitZone Certified</span>
                <p className="text-[10px] text-[#8A8B70]">Elite Performance</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-[#626A48]">
                About This Squad
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#514D43] sm:text-sm">
                {club.description ||
                  `The ${club.name} is a dedicated training collective tailored for individuals who want progressive strength and athletic conditioning. Under structured coaching, you follow progressive periodization designed to break plateaus safely and build unmatched functional power.`}
              </p>
            </div>

            {/* Target Audience & Prerequisites */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#D5C9B7]/80 bg-white/50 p-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#191916]">
                  <Target size={14} className="text-[#505A3B]" />
                  <span>Target Audience</span>
                </div>
                <p className="mt-1 text-xs text-[#747167]">
                  {club.targetAudience || 'All Fitness Levels & Lifters wanting serious results.'}
                </p>
              </div>

              <div className="rounded-xl border border-[#D5C9B7]/80 bg-white/50 p-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#191916]">
                  <ShieldCheck size={14} className="text-[#505A3B]" />
                  <span>Prerequisites</span>
                </div>
                <p className="mt-1 text-xs text-[#747167]">
                  {club.prerequisites || 'Open to all gym members & complimentary pass holders.'}
                </p>
              </div>
            </div>

            {/* Squad Perks / Highlights */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-[#505A3B]" />
                <h3 className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-[#626A48]">
                  Squad Highlights &amp; Inclusions
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {perks.map((perk, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 rounded-xl bg-white/60 p-2.5 border border-[#E3DACB]"
                  >
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#505A3B]" />
                    <span className="text-xs text-[#282820] leading-snug">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Capacity Progress */}
            <div className="rounded-2xl border border-[#D5C9B7] bg-white/60 p-4">
              <div className="flex items-center justify-between text-xs font-bold text-[#191916]">
                <span>Active Squad Roster</span>
                <span>
                  {members} / {capacity} Enrolled ({percentFilled}%)
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#E3DACB]">
                <div
                  className="h-full rounded-full bg-[#505A3B] transition-all duration-500"
                  style={{ width: `${percentFilled}%` }}
                />
              </div>
            </div>

            {/* CTA Footer */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                to={isAuthenticated ? '/free-pass' : '/register'}
                onClick={onClose}
                className="flex w-full sm:flex-1 items-center justify-center gap-2 rounded-xl bg-[#505A3B] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#3E472E]"
              >
                <span>{isAuthenticated ? 'Join This Squad' : 'Sign Up to Join Squad'}</span>
                <ArrowRight size={14} />
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto rounded-xl border border-[#D5C9B7] bg-white px-5 py-3.5 text-xs font-bold text-[#191916] transition-colors hover:bg-black/5"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
