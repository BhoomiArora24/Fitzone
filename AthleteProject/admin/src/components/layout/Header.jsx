import { Menu } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Header({ mobileMenuOpen, setMobileMenuOpen }) {
  const { user } = useAuth()

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'AD'

  return (
    <header className="sticky top-0 z-40 border-b border-[#D5C9B7] bg-[#FAF7F2]/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-[#514D43] hover:bg-black/5 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2.5">
            <span className="font-logo text-2xl font-bold italic tracking-tight text-[#191916]">
              FitZone
            </span>
            <span className="rounded bg-[#505A3B] px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white shadow-sm">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Admin User Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 border-l border-[#D5C9B7] pl-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#505A3B] font-sans text-xs font-bold text-white shadow-sm">
              {initials}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-[#191916]">{user?.name || 'FitZone Admin'}</p>
              <p className="text-[10px] text-[#747167]">{user?.role || 'Super Admin'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
