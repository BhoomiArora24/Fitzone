import { useState, useEffect } from 'react'
import {
  Plus,
  Trash2,
  Search,
  RefreshCw,
  Eye,
  Calendar,
  Clock,
  MapPin,
  Flame,
  CheckCircle2,
  Users,
  Target,
  ShieldCheck,
  X,
  Pencil,
} from 'lucide-react'
import { clubApi } from '../api'
import AddClubModal from '../components/modals/AddClubModal'
import EditClubModal from '../components/modals/EditClubModal'

export default function ClubsPage() {
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingClub, setEditingClub] = useState(null)
  const [viewClub, setViewClub] = useState(null)

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

  const handleClubUpdated = (updatedClub) => {
    const updatedId = updatedClub._id || updatedClub.id
    setClubs((prev) =>
      prev.map((c) =>
        (c._id || c.id) === updatedId ? { ...c, ...updatedClub, id: updatedId } : c
      )
    )
    if (viewClub && ((viewClub._id || viewClub.id) === updatedId)) {
      setViewClub((prev) => ({ ...prev, ...updatedClub, id: updatedId }))
    }
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

                  {/* Badges for Intensity & Location */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded bg-[#E3DACB] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#505A3B]">
                      <Flame size={10} /> {club.intensity || 'High'}
                    </span>
                    {club.location && (
                      <span className="inline-flex items-center gap-1 rounded bg-black/5 px-2 py-0.5 text-[9px] font-semibold text-[#514D43]">
                        <MapPin size={10} /> {club.location}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-[#514D43] line-clamp-2 leading-relaxed">
                    {club.description || 'No description provided.'}
                  </p>

                  <div className="mt-3.5 space-y-1.5 border-t border-[#D5C9B7]/60 pt-3 text-xs">
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
                  <div className="mt-3.5">
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

                  {/* Action buttons */}
                  <div className="mt-4 flex items-center gap-2 border-t border-[#D5C9B7]/60 pt-3">
                    <button
                      type="button"
                      onClick={() => setViewClub(club)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#D5C9B7] bg-white py-2 text-xs font-bold text-[#191916] shadow-sm transition-colors hover:bg-[#505A3B] hover:text-white hover:border-[#505A3B]"
                    >
                      <Eye size={13} />
                      <span>View</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingClub(club)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#D5C9B7] bg-white px-3 py-2 text-xs font-bold text-[#505A3B] shadow-sm transition-colors hover:bg-[#505A3B] hover:text-white hover:border-[#505A3B]"
                      title="Edit Club"
                    >
                      <Pencil size={13} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(id)}
                      className="rounded-xl border border-red-200 bg-red-50 p-2 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                      title="Delete Club"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Admin Club Details Modal */}
      {viewClub && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setViewClub(null)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-[#514D43] hover:bg-black/10"
            >
              <X size={18} />
            </button>

            <div className="relative h-48 w-full overflow-hidden rounded-xl bg-black/10 mb-5">
              <img
                src={viewClub.image}
                alt={viewClub.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85'
                }}
              />
              <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {viewClub.sport}
              </div>
              <div className="absolute right-3 top-3 rounded-full bg-[#505A3B] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {viewClub.intensity || 'High'} Intensity
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-sans text-2xl font-black uppercase text-[#191916]">
                  {viewClub.name}
                </h3>
                <p className="mt-1 text-xs text-[#514D43] leading-relaxed">
                  {viewClub.description || 'No description entered.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-[#EDE4D7]/50 rounded-xl p-3 border border-[#D5C9B7]">
                <div>
                  <span className="font-semibold text-[#747167]">Lead Trainer:</span>
                  <p className="font-bold text-[#505A3B] mt-0.5">{viewClub.coach}</p>
                </div>
                <div>
                  <span className="font-semibold text-[#747167]">Schedule:</span>
                  <p className="font-bold text-[#191916] mt-0.5">{viewClub.schedule}</p>
                </div>
                <div>
                  <span className="font-semibold text-[#747167]">Duration:</span>
                  <p className="font-bold text-[#191916] mt-0.5">{viewClub.duration || '60 Mins'}</p>
                </div>
                <div>
                  <span className="font-semibold text-[#747167]">Location / Zone:</span>
                  <p className="font-bold text-[#191916] mt-0.5">{viewClub.location || 'Zone A'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-[#D5C9B7] bg-white p-3">
                  <span className="font-bold text-[#191916] block mb-1">Target Audience</span>
                  <p className="text-[#514D43]">{viewClub.targetAudience || 'All Fitness Levels'}</p>
                </div>
                <div className="rounded-xl border border-[#D5C9B7] bg-white p-3">
                  <span className="font-bold text-[#191916] block mb-1">Prerequisites</span>
                  <p className="text-[#514D43]">{viewClub.prerequisites || 'Open to all gym members'}</p>
                </div>
              </div>

              {viewClub.perks && viewClub.perks.length > 0 && (
                <div>
                  <span className="font-bold text-xs uppercase tracking-wider text-[#626A48] block mb-2">
                    Squad Highlights &amp; Perks
                  </span>
                  <div className="space-y-1.5">
                    {(Array.isArray(viewClub.perks)
                      ? viewClub.perks
                      : String(viewClub.perks).split(',')
                    ).map((p, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#191916]">
                        <CheckCircle2 size={13} className="text-[#505A3B] shrink-0" />
                        <span>{p.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-[#D5C9B7] bg-white p-3 text-xs">
                <div className="flex items-center justify-between font-bold text-[#191916] mb-1.5">
                  <span>Enrolled Members</span>
                  <span>{viewClub.membersCount || 0} / {viewClub.maxCapacity || 30}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#E3DACB]">
                  <div
                    className="h-full rounded-full bg-[#505A3B]"
                    style={{
                      width: `${Math.min(
                        Math.round(((viewClub.membersCount || 0) / (viewClub.maxCapacity || 30)) * 100),
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#D5C9B7]">
                <button
                  type="button"
                  onClick={() => {
                    const idToDelete = viewClub._id || viewClub.id
                    setViewClub(null)
                    handleDelete(idToDelete)
                  }}
                  className="rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                >
                  Delete Club
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = viewClub
                    setViewClub(null)
                    setEditingClub(target)
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#505A3B] bg-white px-4 py-2 text-xs font-bold text-[#505A3B] hover:bg-[#505A3B] hover:text-white transition-colors"
                >
                  <Pencil size={13} />
                  <span>Edit Squad</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewClub(null)}
                  className="rounded-xl bg-[#505A3B] px-5 py-2 text-xs font-bold text-white hover:bg-[#3E472E] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Club Modal */}
      <AddClubModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onClubAdded={handleClubAdded}
      />

      {/* Edit Club Modal */}
      <EditClubModal
        isOpen={Boolean(editingClub)}
        club={editingClub}
        onClose={() => setEditingClub(null)}
        onClubUpdated={handleClubUpdated}
      />
    </div>
  )
}
