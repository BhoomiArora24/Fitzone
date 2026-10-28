import { useState } from 'react'
import {
  Users,
  Dumbbell,
  Flame,
  Search,
  Plus,
  Phone,
  Mail,
  Trash2,
  X,
  Ticket,
  ShieldCheck,
  TrendingUp,
  Award,
  Menu,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react'
import {
  initialTrainers,
  initialUsers,
  initialClubs,
  initialInquiries,
} from './data/adminData'

export default function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // State collections
  const [trainers, setTrainers] = useState(initialTrainers)
  const [users, setUsers] = useState(initialUsers)
  const [clubs, setClubs] = useState(initialClubs)
  const [inquiries, setInquiries] = useState(initialInquiries)

  // Modals state
  const [showAddTrainerModal, setShowAddTrainerModal] = useState(false)
  const [showAddClubModal, setShowAddClubModal] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)

  // New item form states
  const [newTrainer, setNewTrainer] = useState({
    name: '',
    role: 'Fitness Coach',
    specialty: '',
    experience: '3+ Years Experience',
    phone: '',
    email: '',
    availability: 'Available',
  })

  const [newClub, setNewClub] = useState({
    name: '',
    sport: '',
    coach: 'Arjun Mehta',
    schedule: '',
    maxCapacity: 30,
    intensity: 'High',
    description: '',
  })

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    membership: 'Club Member',
    assignedTrainer: 'Arjun Mehta',
  })

  // Handlers
  const handleAddTrainer = (e) => {
    e.preventDefault()
    if (!newTrainer.name) return
    const created = {
      id: `tr-${Date.now()}`,
      ...newTrainer,
      clientsCount: 0,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
    }
    setTrainers([created, ...trainers])
    setShowAddTrainerModal(false)
    setNewTrainer({
      name: '',
      role: 'Fitness Coach',
      specialty: '',
      experience: '3+ Years Experience',
      phone: '',
      email: '',
      availability: 'Available',
    })
  }

  const handleAddClub = (e) => {
    e.preventDefault()
    if (!newClub.name) return
    const created = {
      id: `cl-${Date.now()}`,
      ...newClub,
      membersCount: 1,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85',
    }
    setClubs([created, ...clubs])
    setShowAddClubModal(false)
    setNewClub({
      name: '',
      sport: '',
      coach: 'Arjun Mehta',
      schedule: '',
      maxCapacity: 30,
      intensity: 'High',
      description: '',
    })
  }

  const handleAddUser = (e) => {
    e.preventDefault()
    if (!newUser.name) return
    const created = {
      id: `usr-${Date.now()}`,
      ...newUser,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      attendance: '100%',
      avatar: `https://i.pravatar.cc/80?img=${Math.floor(Math.random() * 50) + 1}`,
    }
    setUsers([created, ...users])
    setShowAddUserModal(false)
    setNewUser({
      name: '',
      email: '',
      phone: '',
      membership: 'Club Member',
      assignedTrainer: 'Arjun Mehta',
    })
  }

  const toggleTrainerAvailability = (id) => {
    setTrainers(
      trainers.map((t) => {
        if (t.id === id) {
          const nextState =
            t.availability === 'Available'
              ? 'In Session'
              : t.availability === 'In Session'
              ? 'On Leave'
              : 'Available'
          return { ...t, availability: nextState }
        }
        return t
      })
    )
  }

  const deleteTrainer = (id) => {
    if (window.confirm('Are you sure you want to remove this trainer?')) {
      setTrainers(trainers.filter((t) => t.id !== id))
    }
  }

  const deleteClub = (id) => {
    if (window.confirm('Are you sure you want to delete this workout club?')) {
      setClubs(clubs.filter((c) => c.id !== id))
    }
  }

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      setUsers(users.filter((u) => u.id !== id))
    }
  }

  // Filtered queries
  const filteredTrainers = trainers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.membership.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredClubs = clubs.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.coach.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#EDE4D7] text-[#191916]">
      {/* ── Top Header Bar ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[#D5C9B7] bg-[#FAF7F2]/90 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-[#514D43] hover:bg-black/5 lg:hidden"
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

          {/* Search Bar */}
          <div className="relative hidden w-full max-w-xs md:block lg:max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8B70]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trainers, members, or clubs..."
              className="w-full rounded-full border border-[#D5C9B7] bg-[#EDE4D7]/70 py-1.5 pl-9 pr-4 text-xs text-[#191916] placeholder:text-[#8A8B70] focus:border-[#505A3B] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          {/* Admin User Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 border-l border-[#D5C9B7] pl-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#505A3B] font-sans text-xs font-bold text-white shadow-sm">
                AD
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-[#191916]">FitZone Admin</p>
                <p className="text-[10px] text-[#747167]">Gym Management System</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* ── Sidebar Navigation ─────────────────────────────────────── */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-[#D5C9B7] bg-[#FAF7F2] p-5 pt-20 transition-transform duration-300 lg:static lg:block lg:pt-5 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <span className="font-bold uppercase tracking-wider text-xs text-[#626A48]">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded p-1 text-[#514D43] hover:bg-black/5"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-1.5">
            <button
              onClick={() => {
                setActiveTab('overview')
                setMobileMenuOpen(false)
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#505A3B] text-white shadow-sm'
                  : 'text-[#514D43] hover:bg-black/5 hover:text-[#191916]'
              }`}
            >
              <TrendingUp size={16} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('trainers')
                setMobileMenuOpen(false)
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                activeTab === 'trainers'
                  ? 'bg-[#505A3B] text-white shadow-sm'
                  : 'text-[#514D43] hover:bg-black/5 hover:text-[#191916]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Dumbbell size={16} />
                <span>Trainers &amp; Coaches</span>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  activeTab === 'trainers'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#E3DACB] text-[#505A3B]'
                }`}
              >
                {trainers.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('users')
                setMobileMenuOpen(false)
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                activeTab === 'users'
                  ? 'bg-[#505A3B] text-white shadow-sm'
                  : 'text-[#514D43] hover:bg-black/5 hover:text-[#191916]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users size={16} />
                <span>Available Members</span>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  activeTab === 'users'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#E3DACB] text-[#505A3B]'
                }`}
              >
                {users.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('clubs')
                setMobileMenuOpen(false)
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                activeTab === 'clubs'
                  ? 'bg-[#505A3B] text-white shadow-sm'
                  : 'text-[#514D43] hover:bg-black/5 hover:text-[#191916]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Flame size={16} />
                <span>Clubs &amp; Workshops</span>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  activeTab === 'clubs'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#E3DACB] text-[#505A3B]'
                }`}
              >
                {clubs.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('inquiries')
                setMobileMenuOpen(false)
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-[#505A3B] text-white shadow-sm'
                  : 'text-[#514D43] hover:bg-black/5 hover:text-[#191916]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Ticket size={16} />
                <span>Pass Claims &amp; Inquiries</span>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  activeTab === 'inquiries'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#E3DACB] text-[#505A3B]'
                }`}
              >
                {inquiries.length}
              </span>
            </button>
          </div>

          {/* Quick Facility Status */}
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

        {/* ── Main Dashboard Workspace ───────────────────────────────── */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="font-sans text-2xl font-black uppercase tracking-tight text-[#191916] sm:text-3xl">
                  Gym Management Overview
                </h1>
                <p className="mt-1 text-xs text-[#747167]">
                  Monitor your personal trainers, member memberships, and active workout clubs.
                </p>
              </div>

              {/* KPI Stat Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#747167]">
                      Active Members
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#505A3B]/10 text-[#505A3B]">
                      <Users size={16} />
                    </div>
                  </div>
                  <p className="mt-3 font-sans text-3xl font-black text-[#191916]">
                    1,540
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-emerald-700">
                    +18% from last month
                  </p>
                </div>

                <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#747167]">
                      Certified Coaches
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#505A3B]/10 text-[#505A3B]">
                      <Dumbbell size={16} />
                    </div>
                  </div>
                  <p className="mt-3 font-sans text-3xl font-black text-[#191916]">
                    {trainers.length}
                  </p>
                  <p className="mt-1 text-[11px] text-[#747167]">
                    {trainers.filter((t) => t.availability === 'Available').length} Available today
                  </p>
                </div>

                <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#747167]">
                      Workout Squads
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#505A3B]/10 text-[#505A3B]">
                      <Flame size={16} />
                    </div>
                  </div>
                  <p className="mt-3 font-sans text-3xl font-black text-[#191916]">
                    {clubs.length}
                  </p>
                  <p className="mt-1 text-[11px] text-[#747167]">
                    Strength, HIIT, Powerlifting
                  </p>
                </div>

                <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#747167]">
                      Pass Claims
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#505A3B]/10 text-[#505A3B]">
                      <Ticket size={16} />
                    </div>
                  </div>
                  <p className="mt-3 font-sans text-3xl font-black text-[#191916]">
                    142
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-emerald-700">
                    28 claimed this week
                  </p>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Available Trainers Quick Preview */}
                <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#D5C9B7]/80 pb-3">
                    <h3 className="font-sans text-base font-bold text-[#191916]">
                      Trainers &amp; Coaches
                    </h3>
                    <button
                      onClick={() => setActiveTab('trainers')}
                      className="text-xs font-bold text-[#505A3B] hover:underline"
                    >
                      View All ({trainers.length}) &rarr;
                    </button>
                  </div>

                  <div className="mt-4 divide-y divide-[#D5C9B7]/60">
                    {trainers.slice(0, 4).map((t) => (
                      <div key={t.id} className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={t.image}
                            alt={t.name}
                            className="h-10 w-10 rounded-full object-cover shadow-sm"
                          />
                          <div>
                            <p className="text-xs font-bold text-[#191916]">{t.name}</p>
                            <p className="text-[11px] text-[#747167]">{t.specialty}</p>
                          </div>
                        </div>

                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            t.availability === 'Available'
                              ? 'bg-emerald-100 text-emerald-800'
                              : t.availability === 'In Session'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          {t.availability}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workout Clubs Quick Preview */}
                <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#D5C9B7]/80 pb-3">
                    <h3 className="font-sans text-base font-bold text-[#191916]">
                      Active Workout Clubs
                    </h3>
                    <button
                      onClick={() => setActiveTab('clubs')}
                      className="text-xs font-bold text-[#505A3B] hover:underline"
                    >
                      View All ({clubs.length}) &rarr;
                    </button>
                  </div>

                  <div className="mt-4 divide-y divide-[#D5C9B7]/60">
                    {clubs.slice(0, 4).map((c) => (
                      <div key={c.id} className="flex items-center justify-between py-3">
                        <div>
                          <p className="text-xs font-bold text-[#191916]">{c.name}</p>
                          <p className="text-[11px] text-[#747167]">{c.schedule}</p>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-[#505A3B]">
                            {c.membersCount} / {c.maxCapacity}
                          </span>
                          <p className="text-[10px] text-[#747167]">Lead: {c.coach}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TRAINERS SECTION */}
          {activeTab === 'trainers' && (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="font-sans text-2xl font-black uppercase tracking-tight text-[#191916] sm:text-3xl">
                    Trainers &amp; Coaches Management
                  </h1>
                  <p className="mt-1 text-xs text-[#747167]">
                    Manage gym coaches, adjust live availability, and assign athlete sessions.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddTrainerModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#505A3B] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#3E472E]"
                >
                  <Plus size={16} />
                  <span>Add Trainer</span>
                </button>
              </div>

              {/* Trainers Grid */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredTrainers.map((trainer) => (
                  <div
                    key={trainer.id}
                    className="flex flex-col justify-between rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-5 shadow-sm transition-all hover:border-[#505A3B] hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={trainer.image}
                            alt={trainer.name}
                            className="h-14 w-14 rounded-xl object-cover shadow-sm"
                          />
                          <div>
                            <h3 className="font-sans text-base font-bold text-[#191916]">
                              {trainer.name}
                            </h3>
                            <p className="text-xs font-semibold text-[#505A3B]">
                              {trainer.role}
                            </p>
                            <p className="text-[11px] text-[#747167]">
                              {trainer.experience}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteTrainer(trainer.id)}
                          className="rounded-lg p-1.5 text-[#A49E8D] transition-colors hover:bg-red-50 hover:text-red-600"
                          title="Remove Trainer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="mt-4 border-t border-[#D5C9B7]/60 pt-3">
                        <p className="text-[11px] text-[#747167]">Specialty</p>
                        <p className="text-xs font-bold text-[#191916]">
                          {trainer.specialty}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-[#514D43]">
                        <div className="flex items-center gap-1.5">
                          <Users size={14} className="text-[#505A3B]" />
                          <span>{trainer.clientsCount} Active Clients</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Award size={14} className="text-amber-600" />
                          <span>{trainer.rating} Rating</span>
                        </div>
                      </div>

                      <div className="mt-3 space-y-1 text-[11px] text-[#747167]">
                        <p className="flex items-center gap-1.5">
                          <Phone size={12} /> {trainer.phone}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Mail size={12} /> {trainer.email}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Availability Toggle */}
                    <div className="mt-5 border-t border-[#D5C9B7]/80 pt-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#747167]">
                        Status
                      </span>

                      <button
                        type="button"
                        onClick={() => toggleTrainerAvailability(trainer.id)}
                        className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                          trainer.availability === 'Available'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : trainer.availability === 'In Session'
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                        }`}
                        title="Click to switch status"
                      >
                        {trainer.availability} &bull; Click to toggle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AVAILABLE USERS / MEMBERS SECTION */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="font-sans text-2xl font-black uppercase tracking-tight text-[#191916] sm:text-3xl">
                    Available Members &amp; Users
                  </h1>
                  <p className="mt-1 text-xs text-[#747167]">
                    Check registered members, free pass claims, and assigned trainers.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddUserModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#505A3B] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#3E472E]"
                >
                  <Plus size={16} />
                  <span>Add Member</span>
                </button>
              </div>

              {/* Members Table */}
              <div className="overflow-hidden rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-[#D5C9B7] bg-[#EDE4D7]/80 text-[11px] font-bold uppercase tracking-wider text-[#514D43]">
                      <tr>
                        <th className="px-5 py-3.5">Member Name</th>
                        <th className="px-5 py-3.5">Membership Tier</th>
                        <th className="px-5 py-3.5">Assigned Coach</th>
                        <th className="px-5 py-3.5">Joined Date</th>
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D5C9B7]/60">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="transition-colors hover:bg-black/[0.02]">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-9 w-9 rounded-full object-cover shadow-sm"
                              />
                              <div>
                                <p className="font-bold text-[#191916]">{user.name}</p>
                                <p className="text-[11px] text-[#747167]">{user.email}</p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                user.membership === 'Personal Training'
                                  ? 'bg-[#505A3B] text-white'
                                  : user.membership === 'Free Pass Holder'
                                  ? 'bg-[#E3DACB] text-[#505A3B]'
                                  : 'bg-[#D5C9B7]/60 text-[#191916]'
                              }`}
                            >
                              {user.membership}
                            </span>
                          </td>

                          <td className="px-5 py-4 font-medium text-[#191916]">
                            {user.assignedTrainer}
                          </td>

                          <td className="px-5 py-4 text-[#747167]">
                            {user.joinedDate}
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                user.status === 'Active'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : user.status === 'Pass Claimed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />
                              {user.status}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-right">
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="rounded p-1.5 text-[#A49E8D] hover:bg-red-50 hover:text-red-600 transition-colors"
                              title="Delete Member"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* WORKOUT CLUBS & WORKSHOPS SECTION */}
          {activeTab === 'clubs' && (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="font-sans text-2xl font-black uppercase tracking-tight text-[#191916] sm:text-3xl">
                    Training Clubs &amp; Workshops
                  </h1>
                  <p className="mt-1 text-xs text-[#747167]">
                    Manage training squads, capacity quotas, schedules, and assigned lead trainers.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddClubModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#505A3B] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#3E472E]"
                >
                  <Plus size={16} />
                  <span>Create Club</span>
                </button>
              </div>

              {/* Clubs Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredClubs.map((club) => {
                  const percentFilled = Math.min(
                    Math.round((club.membersCount / club.maxCapacity) * 100),
                    100
                  )

                  return (
                    <div
                      key={club.id}
                      className="overflow-hidden rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] shadow-sm transition-all hover:border-[#505A3B] hover:shadow-md"
                    >
                      <div className="relative h-44 w-full overflow-hidden bg-black/10">
                        <img
                          src={club.image}
                          alt={club.name}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                          {club.sport}
                        </div>
                        <button
                          onClick={() => deleteClub(club.id)}
                          className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-white hover:bg-red-600 transition-colors backdrop-blur-sm"
                          title="Delete Club"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between">
                          <h3 className="font-sans text-lg font-black text-[#191916]">
                            {club.name}
                          </h3>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                              club.status === 'Full'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {club.status}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-[#514D43] leading-relaxed">
                          {club.description}
                        </p>

                        <div className="mt-4 space-y-2 border-t border-[#D5C9B7]/60 pt-3 text-xs">
                          <div className="flex items-center justify-between text-[#747167]">
                            <span className="font-semibold">Schedule:</span>
                            <span className="font-bold text-[#191916]">{club.schedule}</span>
                          </div>
                          <div className="flex items-center justify-between text-[#747167]">
                            <span className="font-semibold">Lead Coach:</span>
                            <span className="font-bold text-[#505A3B]">{club.coach}</span>
                          </div>
                        </div>

                        {/* Capacity Progress Bar */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-[11px] font-bold text-[#514D43]">
                            <span>Roster Capacity</span>
                            <span>
                              {club.membersCount} / {club.maxCapacity} ({percentFilled}%)
                            </span>
                          </div>
                          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#E3DACB]">
                            <div
                              className="h-full rounded-full bg-[#505A3B] transition-all duration-500"
                              style={{ width: `${percentFilled}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* PASS CLAIMS & INQUIRIES SECTION */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-sans text-2xl font-black uppercase tracking-tight text-[#191916] sm:text-3xl">
                  Pass Claims &amp; Inquiries
                </h1>
                <p className="mt-1 text-xs text-[#747167]">
                  Review digital free pass vouchers generated by visitors and direct messages from the contact page.
                </p>
              </div>

              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-5 shadow-sm sm:flex-row sm:items-center"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-[#191916]">{inq.name}</span>
                        <span className="rounded bg-[#E3DACB] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#505A3B]">
                          {inq.type}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#505A3B]">
                          {inq.code}
                        </span>
                      </div>
                      <p className="text-xs text-[#514D43]">{inq.message}</p>
                      <p className="text-[11px] text-[#8A8B70]">
                        Email: {inq.email} &bull; Received {inq.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          inq.status === 'Responded'
                            ? 'bg-emerald-100 text-emerald-800'
                            : inq.status === 'Unclaimed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Add Trainer Modal ───────────────────────────────────────── */}
      {showAddTrainerModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-[#D5C9B7] bg-[#EDE4D7] p-6 shadow-2xl">
            <button
              onClick={() => setShowAddTrainerModal(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-[#514D43] hover:bg-black/10"
            >
              <X size={18} />
            </button>

            <h3 className="font-sans text-xl font-black uppercase text-[#191916]">
              Add New Trainer
            </h3>
            <p className="mt-1 text-xs text-[#747167]">
              Enter coach credentials and initial availability.
            </p>

            <form onSubmit={handleAddTrainer} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newTrainer.name}
                  onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                  placeholder="e.g. Sameer Khanna"
                  className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                  Role / Title
                </label>
                <input
                  type="text"
                  required
                  value={newTrainer.role}
                  onChange={(e) => setNewTrainer({ ...newTrainer, role: e.target.value })}
                  placeholder="e.g. Master Strength Coach"
                  className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                  Specialty
                </label>
                <input
                  type="text"
                  required
                  value={newTrainer.specialty}
                  onChange={(e) => setNewTrainer({ ...newTrainer, specialty: e.target.value })}
                  placeholder="e.g. Powerlifting &amp; Hypertrophy"
                  className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={newTrainer.phone}
                    onChange={(e) => setNewTrainer({ ...newTrainer, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newTrainer.email}
                    onChange={(e) => setNewTrainer({ ...newTrainer, email: e.target.value })}
                    placeholder="coach@fitzone.com"
                    className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#505A3B] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-[#3E472E] transition-colors"
                >
                  Save Trainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Add Club Modal ─────────────────────────────────────────── */}
      {showAddClubModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-[#D5C9B7] bg-[#EDE4D7] p-6 shadow-2xl">
            <button
              onClick={() => setShowAddClubModal(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-[#514D43] hover:bg-black/10"
            >
              <X size={18} />
            </button>

            <h3 className="font-sans text-xl font-black uppercase text-[#191916]">
              Create Workout Club
            </h3>
            <p className="mt-1 text-xs text-[#747167]">
              Set up a training cohort, schedule, and assign a lead coach.
            </p>

            <form onSubmit={handleAddClub} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                  Club Name
                </label>
                <input
                  type="text"
                  required
                  value={newClub.name}
                  onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                  placeholder="e.g. Iron Kettlebell Syndicate"
                  className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                    Sport / Discipline
                  </label>
                  <input
                    type="text"
                    required
                    value={newClub.sport}
                    onChange={(e) => setNewClub({ ...newClub, sport: e.target.value })}
                    placeholder="e.g. Kettlebell"
                    className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                    Max Capacity
                  </label>
                  <input
                    type="number"
                    value={newClub.maxCapacity}
                    onChange={(e) => setNewClub({ ...newClub, maxCapacity: Number(e.target.value) })}
                    className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                  Schedule
                </label>
                <input
                  type="text"
                  required
                  value={newClub.schedule}
                  onChange={(e) => setNewClub({ ...newClub, schedule: e.target.value })}
                  placeholder="e.g. Mon / Fri · 7:30 PM"
                  className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                  Lead Coach
                </label>
                <select
                  value={newClub.coach}
                  onChange={(e) => setNewClub({ ...newClub, coach: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
                >
                  {trainers.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#505A3B] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-[#3E472E] transition-colors"
                >
                  Create Club
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Add Member Modal ───────────────────────────────────────── */}
      {showAddUserModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-[#D5C9B7] bg-[#EDE4D7] p-6 shadow-2xl">
            <button
              onClick={() => setShowAddUserModal(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-[#514D43] hover:bg-black/10"
            >
              <X size={18} />
            </button>

            <h3 className="font-sans text-xl font-black uppercase text-[#191916]">
              Register Member
            </h3>
            <p className="mt-1 text-xs text-[#747167]">
              Add a new athlete or member to the FitZone roster.
            </p>

            <form onSubmit={handleAddUser} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                  Member Name
                </label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. Jordan Hayes"
                  className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="jordan@example.com"
                  className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                    Membership Tier
                  </label>
                  <select
                    value={newUser.membership}
                    onChange={(e) => setNewUser({ ...newUser, membership: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
                  >
                    <option value="Club Member">Club Member</option>
                    <option value="Personal Training">Personal Training</option>
                    <option value="Free Pass Holder">Free Pass Holder</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                    Assigned Coach
                  </label>
                  <select
                    value={newUser.assignedTrainer}
                    onChange={(e) => setNewUser({ ...newUser, assignedTrainer: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
                  >
                    {trainers.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#505A3B] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-[#3E472E] transition-colors"
                >
                  Register Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
