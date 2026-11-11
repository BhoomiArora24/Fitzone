import { NavLink } from 'react-router-dom'
import {
  TrendingUp,
  Dumbbell,
  Users,
  Flame,
  Ticket,
  ShieldCheck,
  X,
} from 'lucide-react'

export default function Sidebar({ mobileMenuOpen, setMobileMenuOpen }) {
  const navLinks = [
    {
      to: '/overview',
      label: 'Overview',
      icon: TrendingUp,
    },
    {
      to: '/trainers',
      label: 'Trainers & Coaches',
      icon: Dumbbell,
    },
    {
      to: '/members',
      label: 'Available Members',
      icon: Users,
    },
    {
      to: '/clubs',
      label: 'Clubs & Workshops',
      icon: Flame,
    },
    {
      to: '/inquiries',
      label: 'Pass Claims & Inquiries',
      icon: Ticket,
    },
  ]

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-[#D5C9B7] bg-[#FAF7F2] p-5 pt-20 transition-transform duration-300 lg:static lg:block lg:pt-5 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="mb-6 flex items-center justify-between lg:hidden">
        <span className="font-bold uppercase tracking-wider text-xs text-[#626A48]">
          Menu
        </span>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="rounded p-1 text-[#514D43] hover:bg-black/5"
        >
          <X size={18} />
        </button>
      </div>

      <div className="space-y-1.5">
        {navLinks.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#505A3B] text-white shadow-sm'
                    : 'text-[#514D43] hover:bg-black/5 hover:text-[#191916]'
                }`
              }
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </div>

      {/* Facility Status */}
      <div className="mt-8 rounded-xl border border-[#D5C9B7] bg-[#EDE4D7] p-3.5">
        <div className="flex items-center gap-2 text-xs font-bold text-[#505A3B]">
          <ShieldCheck size={16} />
          <span>Facility Status</span>
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-[#514D43]">
          Manhattan Gym is <span className="font-bold text-emerald-700">Open</span>.
          Peak training hours: 5:00 PM – 8:00 PM.
        </p>
      </div>
    </aside>
  )
}
