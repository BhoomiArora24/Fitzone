import { useState, useEffect } from 'react'
import {
  Users,
  Search,
  RefreshCw,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Ticket,
  Flame,
  Shield,
  UserCheck,
  AlertCircle,
  Check,
  Sparkles,
} from 'lucide-react'
import { userApi, clubApi } from '../api'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all') // 'all', 'active-club', 'pending-club', 'pass-claimed', 'pass-used'
  const [actionLoadingId, setActionLoadingId] = useState(null)

  // Fetch Users & Clubs from MongoDB
  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [usersRes, clubsRes] = await Promise.allSettled([
        userApi.getAll(),
        clubApi.getAll(),
      ])

      if (usersRes.status === 'fulfilled') {
        const uData = usersRes.value?.data || (Array.isArray(usersRes.value) ? usersRes.value : [])
        setUsers(uData.map((u) => ({ ...u, id: u._id || u.id })))
      } else {
        throw new Error(usersRes.reason?.message || 'Failed to fetch registered users')
      }

      if (clubsRes.status === 'fulfilled') {
        const cData = clubsRes.value?.data || (Array.isArray(clubsRes.value) ? clubsRes.value : [])
        setClubs(cData.map((c) => ({ ...c, id: c._id || c.id })))
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to database')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Update User Club Member Status (Active / Pending / Inactive)
  const handleUpdateClubStatus = async (userId, newStatus, currentClub) => {
    setActionLoadingId(userId)
    // Optimistic UI update
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              clubMembershipStatus: newStatus,
              joinedClub: u.joinedClub || currentClub || (clubs[0]?.name || 'Barbell Club'),
            }
          : u
      )
    )

    try {
      await userApi.updateStatus(userId, {
        clubMembershipStatus: newStatus,
        joinedClub: currentClub !== undefined ? currentClub : undefined,
      })
    } catch (err) {
      alert(`Failed to update club status: ${err.message}`)
      fetchData() // Re-sync on error
    } finally {
      setActionLoadingId(null)
    }
  }

  // Update User Assigned Club
  const handleAssignClub = async (userId, clubName) => {
    setActionLoadingId(userId)
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, joinedClub: clubName } : u))
    )

    try {
      await userApi.updateStatus(userId, { joinedClub: clubName })
    } catch (err) {
      alert(`Failed to assign club: ${err.message}`)
      fetchData()
    } finally {
      setActionLoadingId(null)
    }
  }

  // Update Free Pass Status (Used / Claimed / Not Claimed)
  const handleUpdatePassStatus = async (userId, newPassStatus) => {
    setActionLoadingId(userId)
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, freePassStatus: newPassStatus } : u))
    )

    try {
      await userApi.updateStatus(userId, { freePassStatus: newPassStatus })
    } catch (err) {
      alert(`Failed to update free pass status: ${err.message}`)
      fetchData()
    } finally {
      setActionLoadingId(null)
    }
  }

  // Delete User
  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to permanently delete user "${userName}" from the database?`)) {
      return
    }

    try {
      await userApi.delete(userId)
      setUsers((prev) => prev.filter((u) => u.id !== userId))
    } catch (err) {
      alert(`Failed to delete user: ${err.message}`)
    }
  }

  // Filter calculations
  const totalUsers = users.length
  const activeClubCount = users.filter((u) => u.clubMembershipStatus === 'Active').length
  const pendingClubCount = users.filter((u) => u.clubMembershipStatus === 'Pending').length
  const passClaimedCount = users.filter((u) => u.freePassStatus === 'Claimed').length
  const passUsedCount = users.filter((u) => u.freePassStatus === 'Used').length

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase().trim()
    const matchesSearch =
      !q ||
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q)) ||
      (u.phone && u.phone.toLowerCase().includes(q)) ||
      (u.joinedClub && u.joinedClub.toLowerCase().includes(q))

    if (!matchesSearch) return false

    if (activeTab === 'active-club') return u.clubMembershipStatus === 'Active'
    if (activeTab === 'pending-club') return u.clubMembershipStatus === 'Pending'
    if (activeTab === 'pass-claimed') return u.freePassStatus === 'Claimed'
    if (activeTab === 'pass-used') return u.freePassStatus === 'Used'

    return true
  })

  return (
    <div className="space-y-6">
      {/* ── Top Header Strip ───────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-sans text-2xl font-black uppercase tracking-tight text-[#191916] sm:text-3xl">
            Registered Users &amp; Members
          </h1>
          <p className="mt-1 text-xs text-[#747167]">
            Live MongoDB database records of registered account holders. Manage club active status, assign workout squads, and redeem free workout passes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Search Box */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8B70]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, phone, squad..."
              className="w-52 sm:w-64 rounded-xl border border-[#D5C9B7] bg-[#FAF7F2] py-2 pl-8 pr-3 text-xs text-[#191916] placeholder:text-[#8A8B70] focus:border-[#505A3B] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <button
            type="button"
            onClick={fetchData}
            className="rounded-xl border border-[#D5C9B7] bg-[#FAF7F2] p-2 text-[#514D43] hover:bg-black/5"
            title="Reload from MongoDB"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* ── Summary Stat KPI Cards ───────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* Total Users */}
        <div
          onClick={() => setActiveTab('all')}
          className={`cursor-pointer rounded-2xl border p-4 transition-all ${
            activeTab === 'all'
              ? 'border-[#505A3B] bg-[#505A3B]/10 shadow-sm'
              : 'border-[#D5C9B7] bg-[#FAF7F2] hover:bg-[#F2ECE3]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#747167]">
              All Users
            </span>
            <Users size={15} className="text-[#505A3B]" />
          </div>
          <p className="mt-2 font-sans text-2xl font-black text-[#191916]">
            {loading ? '...' : totalUsers}
          </p>
          <p className="mt-0.5 text-[10px] text-[#8A8B70]">Registered accounts</p>
        </div>

        {/* Active Club Members */}
        <div
          onClick={() => setActiveTab('active-club')}
          className={`cursor-pointer rounded-2xl border p-4 transition-all ${
            activeTab === 'active-club'
              ? 'border-emerald-600 bg-emerald-50 shadow-sm'
              : 'border-[#D5C9B7] bg-[#FAF7F2] hover:bg-[#F2ECE3]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Active Club Members
            </span>
            <CheckCircle2 size={15} className="text-emerald-700" />
          </div>
          <p className="mt-2 font-sans text-2xl font-black text-emerald-950">
            {loading ? '...' : activeClubCount}
          </p>
          <p className="mt-0.5 text-[10px] text-emerald-700 font-semibold">Admin verified</p>
        </div>

        {/* Pending Club Approvals */}
        <div
          onClick={() => setActiveTab('pending-club')}
          className={`cursor-pointer rounded-2xl border p-4 transition-all ${
            activeTab === 'pending-club'
              ? 'border-amber-600 bg-amber-50 shadow-sm'
              : 'border-[#D5C9B7] bg-[#FAF7F2] hover:bg-[#F2ECE3]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Pending Approvals
            </span>
            <Clock size={15} className="text-amber-700" />
          </div>
          <p className="mt-2 font-sans text-2xl font-black text-amber-950">
            {loading ? '...' : pendingClubCount}
          </p>
          <p className="mt-0.5 text-[10px] text-amber-700 font-bold">
            {pendingClubCount > 0 ? 'Requires action!' : 'Up to date'}
          </p>
        </div>

        {/* Free Passes (Claimed / Used) */}
        <div
          onClick={() => setActiveTab('pass-claimed')}
          className={`cursor-pointer rounded-2xl border p-4 transition-all ${
            activeTab === 'pass-claimed' || activeTab === 'pass-used'
              ? 'border-blue-600 bg-blue-50 shadow-sm'
              : 'border-[#D5C9B7] bg-[#FAF7F2] hover:bg-[#F2ECE3]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">
              Free Passes
            </span>
            <Ticket size={15} className="text-blue-700" />
          </div>
          <p className="mt-2 font-sans text-2xl font-black text-[#191916]">
            {loading ? '...' : `${passClaimedCount} / ${passUsedCount}`}
          </p>
          <p className="mt-0.5 text-[10px] text-blue-700 font-semibold">
            {passClaimedCount} Claimed &bull; {passUsedCount} Used
          </p>
        </div>
      </div>

      {/* ── Filter Tabs ────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#D5C9B7] pb-3 text-xs">
        {[
          { id: 'all', label: `All Users (${totalUsers})` },
          { id: 'active-club', label: `Active Club Members (${activeClubCount})` },
          { id: 'pending-club', label: `Pending Approvals (${pendingClubCount})` },
          { id: 'pass-claimed', label: `Pass Claimed (${passClaimedCount})` },
          { id: 'pass-used', label: `Pass Used (${passUsedCount})` },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-[#505A3B] text-white shadow-sm'
                : 'text-[#514D43] hover:bg-black/5 hover:text-[#191916]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Main Users Table ───────────────────────────────────────── */}
      {loading ? (
        <div className="flex h-56 w-full items-center justify-center rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#747167]">
            <RefreshCw size={16} className="animate-spin text-[#505A3B]" />
            <span>Fetching registered users directly from MongoDB...</span>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-bold text-red-800">{error}</p>
          <button
            onClick={fetchData}
            className="mt-3 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D5C9B7] bg-[#FAF7F2] p-12 text-center">
          <p className="text-sm font-bold text-[#191916]">No matching users found</p>
          <p className="mt-1 text-xs text-[#747167]">
            {searchQuery
              ? 'Try searching with another name, email or squad.'
              : 'Registered accounts will appear here once visitors sign up or claim passes.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#D5C9B7] bg-[#EDE4D7]/80 text-[11px] font-bold uppercase tracking-wider text-[#514D43]">
                <tr>
                  <th className="px-5 py-3.5">User Account</th>
                  <th className="px-5 py-3.5">Joined Club / Squad</th>
                  <th className="px-5 py-3.5">Club Member Status (Admin Managed)</th>
                  <th className="px-5 py-3.5">Free Pass Status</th>
                  <th className="px-5 py-3.5">Role</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D5C9B7]/60">
                {filteredUsers.map((user) => {
                  const isProcessing = actionLoadingId === user.id
                  const isClubActive = user.clubMembershipStatus === 'Active'
                  const isClubPending = user.clubMembershipStatus === 'Pending'

                  return (
                    <tr key={user.id} className="transition-colors hover:bg-black/[0.02]">
                      {/* 1. User Info */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar || `https://i.pravatar.cc/80?u=${user.id}`}
                            alt={user.name}
                            className="h-9 w-9 rounded-full object-cover shadow-sm border border-[#D5C9B7]"
                            onError={(e) => {
                              e.target.src = `https://i.pravatar.cc/80?u=${user.id}`
                            }}
                          />
                          <div>
                            <p className="font-bold text-[#191916] flex items-center gap-1.5">
                              <span>{user.name}</span>
                              {user.role === 'admin' && (
                                <span className="rounded bg-stone-800 px-1.5 py-0.2 text-[9px] font-bold uppercase text-white">
                                  Admin
                                </span>
                              )}
                            </p>
                            <p className="text-[11px] text-[#747167]">{user.email}</p>
                            {user.phone && (
                              <p className="text-[10px] text-[#8A8B70]">{user.phone}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 2. Assigned Club */}
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 font-semibold text-[#191916]">
                            <Flame size={14} className="text-[#505A3B] shrink-0" />
                            <span>{user.joinedClub || 'No Squad Assigned'}</span>
                          </div>

                          {/* Inline Club Selector */}
                          <select
                            value={user.joinedClub || ''}
                            onChange={(e) => handleAssignClub(user.id, e.target.value)}
                            disabled={isProcessing}
                            className="w-full max-w-[170px] rounded-lg border border-[#D5C9B7] bg-white px-2 py-1 text-[11px] font-medium text-[#191916] focus:border-[#505A3B] focus:outline-none"
                          >
                            <option value="">-- Assign Squad --</option>
                            {clubs.map((c) => (
                              <option key={c.id || c.name} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>

                      {/* 3. Club Member Active Status (Admin Managed) */}
                      <td className="px-5 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {isClubActive ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-300">
                                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                                Active Club Member
                              </span>
                            ) : isClubPending ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 border border-amber-300">
                                <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                                Pending Admin Approval
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E3DACB] px-2.5 py-0.5 text-[11px] font-bold text-[#514D43]">
                                <span className="h-2 w-2 rounded-full bg-[#8A8B70]" />
                                Inactive / Not Joined
                              </span>
                            )}
                          </div>

                          {/* Quick Admin Action Buttons */}
                          <div className="flex items-center gap-1.5">
                            {isClubActive ? (
                              <button
                                type="button"
                                disabled={isProcessing}
                                onClick={() => handleUpdateClubStatus(user.id, 'Inactive')}
                                className="rounded-md border border-[#D5C9B7] bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#747167] hover:bg-black/5 hover:text-red-700 transition-colors"
                              >
                                Mark Inactive
                              </button>
                            ) : (
                              <button
                                type="button"
                                disabled={isProcessing}
                                onClick={() =>
                                  handleUpdateClubStatus(
                                    user.id,
                                    'Active',
                                    user.joinedClub || (clubs[0]?.name || 'Barbell Club')
                                  )
                                }
                                className="inline-flex items-center gap-1 rounded-md bg-[#505A3B] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#3E472E] transition-colors"
                              >
                                <Check size={12} strokeWidth={2.5} />
                                <span>{isClubPending ? 'Approve & Activate' : 'Make Active'}</span>
                              </button>
                            )}

                            {!isClubPending && !isClubActive && user.joinedClub && (
                              <button
                                type="button"
                                disabled={isProcessing}
                                onClick={() => handleUpdateClubStatus(user.id, 'Pending')}
                                className="rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800 hover:bg-amber-100"
                              >
                                Set Pending
                              </button>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 4. Free Pass Status (Admin Managed) */}
                      <td className="px-5 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {user.freePassStatus === 'Used' ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-stone-200 px-2.5 py-0.5 text-[11px] font-bold text-stone-800">
                                <Check size={12} strokeWidth={2.5} />
                                Pass Used (Redeemed)
                              </span>
                            ) : user.freePassStatus === 'Claimed' ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-blue-800 border border-blue-300">
                                <Ticket size={12} />
                                Claimed ({user.freePassCode || 'Active Pass'})
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#E3DACB]/80 px-2.5 py-0.5 text-[11px] font-bold text-[#747167]">
                                Not Claimed
                              </span>
                            )}
                          </div>

                          {/* Quick Admin Pass Action */}
                          <div className="flex items-center gap-1.5">
                            {user.freePassStatus === 'Claimed' ? (
                              <button
                                type="button"
                                disabled={isProcessing}
                                onClick={() => handleUpdatePassStatus(user.id, 'Used')}
                                className="inline-flex items-center gap-1 rounded-md bg-stone-800 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm hover:bg-black transition-colors"
                                title="Click when visitor presents this pass at the front desk"
                              >
                                <Check size={11} strokeWidth={2.5} />
                                <span>Mark as Used</span>
                              </button>
                            ) : user.freePassStatus === 'Used' ? (
                              <button
                                type="button"
                                disabled={isProcessing}
                                onClick={() => handleUpdatePassStatus(user.id, 'Claimed')}
                                className="rounded-md border border-[#D5C9B7] bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#747167] hover:bg-black/5"
                              >
                                Reset to Claimed
                              </button>
                            ) : (
                              <button
                                type="button"
                                disabled={isProcessing}
                                onClick={() => handleUpdatePassStatus(user.id, 'Claimed')}
                                className="rounded-md border border-[#D5C9B7] bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#505A3B] hover:bg-[#505A3B]/10"
                              >
                                Issue Pass
                              </button>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 5. Role */}
                      <td className="px-5 py-4">
                        <span className="rounded-md bg-[#D5C9B7]/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#191916]">
                          {user.role || 'user'}
                        </span>
                      </td>

                      {/* 6. Actions */}
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          className="rounded p-1.5 text-[#A49E8D] hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete User from Database"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

