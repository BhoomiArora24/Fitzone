import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  User,
  Ticket,
  Settings,
  LogOut,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react'

export default function ProfileDropdown({ isDarkTheme = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [membershipMode, setMembershipMode] = useState('member')
  const dropdownRef = useRef(null)

  // Radio options representing membership / profile status
  const radioOptions = [
    {
      id: 'member',
      label: 'Club Member',
      description: 'Full floor & locker access',
      badge: 'Active',
    },
    {
      id: 'pass',
      label: 'Free Pass Holder',
      description: '1 complimentary session',
      badge: 'Guest',
    },
  ]

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
          <div className="flex items-center gap-3 border-b border-[#D5C9B7]/80 pb-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#505A3B] to-[#3E472E] font-sans text-sm font-black text-white shadow">
              AM
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-bold text-[#191916]">
                  Alex Morgan
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#E3DACB] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#505A3B]">
                  <ShieldCheck size={11} /> Pro
                </span>
              </div>
              <p className="truncate text-xs text-[#747167]">
                alex.morgan@fitzone.com
              </p>
            </div>
          </div>

          {/* Radio Options Section */}
          <div className="mt-3.5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#626A48]">
                Membership Mode
              </span>
              <span className="text-[10px] text-[#8A8B70]">Select active tier</span>
            </div>

            <div className="space-y-1.5" role="radiogroup" aria-label="Membership Status Options">
              {radioOptions.map((option) => {
                const isSelected = membershipMode === option.id
                return (
                  <label
                    key={option.id}
                    onClick={() => setMembershipMode(option.id)}
                    className={`flex items-center justify-between gap-3 rounded-xl border p-2.5 transition-all duration-200 cursor-pointer select-none ${
                      isSelected
                        ? 'border-[#505A3B] bg-[#505A3B]/10 shadow-[0_2px_8px_rgba(80,90,59,0.12)]'
                        : 'border-transparent hover:border-[#D5C9B7] hover:bg-black/[0.03]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Custom Radio Button Indicator */}
                      <div
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                          isSelected
                            ? 'border-[#505A3B] bg-white ring-2 ring-[#505A3B]/30'
                            : 'border-[#96937D] bg-transparent'
                        }`}
                      >
                        {isSelected && (
                          <div className="h-2 w-2 rounded-full bg-[#505A3B]" />
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold leading-tight text-[#191916]">
                          {option.label}
                        </span>
                        <span className="text-[11px] text-[#747167]">
                          {option.description}
                        </span>
                      </div>
                    </div>

                    {/* Badge */}
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        isSelected
                          ? 'bg-[#505A3B] text-white'
                          : 'bg-[#E3DACB] text-[#514D43]'
                      }`}
                    >
                      {option.badge}
                    </span>
                  </label>
                )
              })}
            </div>
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
          <div className="mt-2.5 border-t border-[#D5C9B7]/80 pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#8B3A2B] transition-colors hover:bg-red-500/10"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
