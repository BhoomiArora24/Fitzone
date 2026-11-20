import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  User,
  Ticket,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Clock,
  XCircle,
  Flame,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function ProfileDropdown({ isDarkTheme = false }) {
  const { user, isAuthenticated, logout, refreshUser } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Re-fetch latest user status from database whenever dropdown is opened
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      refreshUser?.()
    }
  }, [isOpen, isAuthenticated, refreshUser])

  const handleSignOut = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'AM'

  // Dynamic calculations according to live DB state
  const isClubActive = user?.clubMembershipStatus === 'Active'
  const isClubPending = user?.clubMembershipStatus === 'Pending'
  const hasClub = Boolean(user?.joinedClub)

  const isPassUsed = user?.freePassStatus === 'Used'
  const isPassClaimed = user?.freePassStatus === 'Claimed'

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* ── Profile Trigger Button ──────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User Profile and Account Menu"
        className={`group relative flex items-center gap-2 rounded-full p-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#505A3B] focus-visible:ring-offset-2 ${
          isOpen
            ? 'ring-2 ring-[#505A3B] bg-black/5'
            : 'hover:bg-black/5'
        }`}
      >
        {/* Avatar Circle */}
        <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#505A3B] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
          <User size={16} strokeWidth={2.2} />
          {/* Active online pulse indicator */}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full border border-white bg-emerald-500" />
          </span>
        </div>

        {/* Small Chevron indicator */}
        <ChevronDown
          size={14}
          className={`hidden transition-transform duration-300 sm:inline-block ${
            isDarkTheme ? 'text-[#F5F1E9]' : 'text-[#1B1C16]'
          } ${isOpen ? 'rotate-180 text-[#505A3B]' : 'group-hover:text-[#505A3B]'}`}
        />
      </button>

      {/* ── Profile Dropdown Panel ──────────────────────────────────── */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 top-full z-50 mt-2.5 w-[320px] origin-top-right rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-4 text-[#191916] shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-200 animate-in fade-in slide-in-from-top-2 sm:w-[340px]"
        >
          {/* User Info Header */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3 border-b border-[#D5C9B7]/80 pb-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#505A3B] to-[#3E472E] font-sans text-sm font-black text-white shadow">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-bold text-[#191916]">
                    {user?.name || 'FitZone Athlete'}
                  </p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E3DACB] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#505A3B]">
                    <ShieldCheck size={11} /> {user?.role === 'admin' ? 'Admin' : (user?.membershipStatus || 'Member')}
                  </span>
                </div>
                <p className="truncate text-xs text-[#747167]">
                  {user?.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="border-b border-[#D5C9B7]/80 pb-3.5 text-center">
              <p className="text-sm font-bold text-[#191916]">
                Welcome to <span className="text-[#505A3B]">FitZone</span>
              </p>
              <p className="mt-0.5 text-xs text-[#747167]">
                Sign in to manage passes and workouts
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#505A3B] py-2 text-xs font-bold text-white transition-colors hover:bg-[#3E472E]"
                >
                  <LogIn size={13} />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#D5C9B7] bg-white py-2 text-xs font-bold text-[#191916] transition-colors hover:bg-[#F0EAE1]"
                >
                  <UserPlus size={13} />
                  <span>Register</span>
                </Link>
              </div>
            </div>
          )}

          {/* Live Membership & Pass Status Section */}
          <div className="mt-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#626A48]">
                Member &amp; Pass Status
              </span>
              <span className="text-[9px] text-[#8A8B70]">Live sync</span>
            </div>

            {/* 1. Club Membership Card */}
            <div
              onClick={() => {
                setIsOpen(false)
                if (hasClub) {
                  navigate(`/clubs/${user.joinedClub.toLowerCase().replaceAll(' ', '-')}`)
                } else {
                  navigate('/#teams')
                }
              }}
              className={`flex items-center justify-between gap-3 rounded-xl border p-2.5 transition-all cursor-pointer ${
                isClubActive
                  ? 'border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/70 shadow-sm'
                  : isClubPending
                  ? 'border-amber-300 bg-amber-50/70 hover:bg-amber-100/70'
                  : 'border-[#D5C9B7] bg-white/60 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    isClubActive
                      ? 'bg-emerald-600 text-white'
                      : isClubPending
                      ? 'bg-amber-500 text-white'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  <Flame size={14} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="truncate text-[12px] font-bold text-[#191916]">
                    {hasClub ? user.joinedClub : 'Training Club'}
                  </span>
                  <span className="text-[10px] text-[#747167]">
                    {isClubActive
                      ? 'Verified active member'
                      : isClubPending
                      ? 'Awaiting admin approval'
                      : hasClub
                      ? 'Membership inactive'
                      : 'Click to explore squads'}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`shrink-0 rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                  isClubActive
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : isClubPending
                    ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                    : 'bg-[#E3DACB] text-[#514D43]'
                }`}
              >
                {isClubActive ? 'Active' : isClubPending ? 'Pending' : hasClub ? 'Inactive' : 'Not Joined'}
              </span>
            </div>

            {/* 2. Free Pass Card */}
            <Link
              to="/free-pass"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between gap-3 rounded-xl border p-2.5 transition-all ${
                isPassUsed
                  ? 'border-stone-300 bg-stone-100/80 hover:bg-stone-200/80'
                  : isPassClaimed
                  ? 'border-blue-300 bg-blue-50/70 hover:bg-blue-100/70'
                  : 'border-[#D5C9B7] bg-white/60 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    isPassUsed
                      ? 'bg-stone-600 text-white'
                      : isPassClaimed
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#505A3B] text-white'
                  }`}
                >
                  <Ticket size={14} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="truncate text-[12px] font-bold text-[#191916]">
                    Free Workout Pass
                  </span>
                  <span className="text-[10px] text-[#747167]">
                    {isPassUsed
                      ? 'Redeemed at front desk'
                      : isPassClaimed
                      ? `Voucher: ${user?.freePassCode || 'FZ-PASS-2026'}`
                      : '1 complimentary session'}
                  </span>
                </div>
              </div>

              {/* Pass Badge */}
              <span
                className={`shrink-0 rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                  isPassUsed
                    ? 'bg-rose-100 text-rose-800 border border-rose-300 font-bold'
                    : isPassClaimed
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}
              >
                {isPassUsed ? 'Used' : isPassClaimed ? 'Claimed' : 'Available'}
              </span>
            </Link>
          </div>

          {/* Quick Action Links */}
          <div className="mt-3.5 border-t border-[#D5C9B7]/80 pt-2.5">
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#626A48]">
              Quick Access
            </span>

            <div className="space-y-0.5">
              <Link
                to="/free-pass"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-[#191916] transition-colors hover:bg-black/5 hover:text-[#505A3B]"
              >
                <Ticket size={15} className="text-[#505A3B]" />
                <span>My Workout Pass</span>
                <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-[#505A3B]">
                  Free
                </span>
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-[#191916] transition-colors hover:bg-black/5 hover:text-[#505A3B]"
              >
                <Settings size={15} className="text-[#747167]" />
                <span>Account & Preferences</span>
              </Link>
            </div>
          </div>

          {/* Sign Out Row */}
          {isAuthenticated && (
            <div className="mt-2.5 border-t border-[#D5C9B7]/80 pt-2">
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#8B3A2B] transition-colors hover:bg-red-500/10"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
