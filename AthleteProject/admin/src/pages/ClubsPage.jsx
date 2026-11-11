import { useState, useEffect } from 'react'
import { Plus, Trash2, Search, RefreshCw } from 'lucide-react'
import { clubApi } from '../api'
import AddClubModal from '../components/modals/AddClubModal'

export default function ClubsPage() {
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const fetchClubs = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await clubApi.getAll()
      const data = res?.data || (Array.isArray(res) ? res : [])
      setClubs(data.map((c) => ({ ...c, id: c._id || c.id })))
    } catch (err) {
      setError(err.message || 'Failed to fetch clubs from database')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClubs()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this workout club from the database?')) {
      return
    }

    try {
      await clubApi.delete(id)
      setClubs((prev) => prev.filter((c) => (c._id || c.id) !== id))
    } catch (err) {
      alert(err.message || 'Failed to delete club from database')
    }
  }

  const handleClubAdded = (newClub) => {
    setClubs((prev) => [{ ...newClub, id: newClub._id || newClub.id }, ...prev])
  }

  const filteredClubs = clubs.filter((c) => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return true
    return (
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.sport && c.sport.toLowerCase().includes(q)) ||
      (c.coach && c.coach.toLowerCase().includes(q))
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-sans text-2xl font-black uppercase tracking-tight text-[#191916] sm:text-3xl">
            Training Clubs &amp; Workshops
          </h1>
          <p className="mt-1 text-xs text-[#747167]">
            Direct database records of squads, schedules, and assigned lead trainers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Page Search Bar */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8B70]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clubs or sports..."
              className="w-48 sm:w-60 rounded-xl border border-[#D5C9B7] bg-[#FAF7F2] py-2 pl-8 pr-3 text-xs text-[#191916] placeholder:text-[#8A8B70] focus:border-[#505A3B] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <button
            type="button"
            onClick={fetchClubs}
            className="rounded-xl border border-[#D5C9B7] bg-[#FAF7F2] p-2 text-[#514D43] hover:bg-black/5"
            title="Reload from DB"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#505A3B] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#3E472E]"
          >
            <Plus size={15} />
            <span>Create Club</span>
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex h-48 w-full items-center justify-center rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#747167]">
            <RefreshCw size={16} className="animate-spin text-[#505A3B]" />
            <span>Loading training clubs from database...</span>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-bold text-red-800">{error}</p>
          <button
            onClick={fetchClubs}
            className="mt-3 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredClubs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D5C9B7] bg-[#FAF7F2] p-12 text-center">
          <p className="text-sm font-bold text-[#191916]">No clubs found</p>
          <p className="mt-1 text-xs text-[#747167]">
            {searchQuery
              ? 'Try searching with different sport or coach keywords.'
              : 'Create your first workout club to persist it in MongoDB.'}
          </p>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#505A3B] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#3E472E]"
          >
            <Plus size={14} />
            <span>Create Club</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredClubs.map((club) => {
            const id = club._id || club.id
            const members = Number(club.membersCount) || 0
            const maxCap = Number(club.maxCapacity) || 30
            const percentFilled = Math.min(
              Math.round((members / maxCap) * 100),
              100
            )

            return (
              <div
                key={id}
                className="overflow-hidden rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] shadow-sm transition-all hover:border-[#505A3B] hover:shadow-md"
              >
                <div className="relative h-44 w-full overflow-hidden bg-black/10">
                  <img
                    src={club.image}
                    alt={club.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85'
                    }}
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    {club.sport}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(id)}
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
                        club.status === 'Full' || percentFilled >= 100
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {club.status || (percentFilled >= 100 ? 'Full' : 'Active')}
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
                        {members} / {maxCap} ({percentFilled}%)
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
      )}

      {/* Modal is mounted locally on this page */}
      <AddClubModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onClubAdded={handleClubAdded}
      />
    </div>
  )
}
