import { useState, useEffect } from 'react'
import { Plus, Trash2, Users, Phone, Mail, Search, RefreshCw } from 'lucide-react'
import { trainerApi } from '../api'
import AddTrainerModal from '../components/modals/AddTrainerModal'

export default function TrainersPage() {
  const [trainers, setTrainers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const fetchTrainers = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await trainerApi.getAll()
      // Support both { success, data } or direct array
      const data = res?.data || (Array.isArray(res) ? res : [])
      setTrainers(data.map((t) => ({ ...t, id: t._id || t.id })))
    } catch (err) {
      setError(err.message || 'Failed to fetch trainers from database')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrainers()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this trainer from the database?')) {
      return
    }

    try {
      await trainerApi.delete(id)
      setTrainers((prev) => prev.filter((t) => (t._id || t.id) !== id))
    } catch (err) {
      alert(err.message || 'Failed to delete trainer from database')
    }
  }

  const handleTrainerAdded = (newTrainer) => {
    setTrainers((prev) => [{ ...newTrainer, id: newTrainer._id || newTrainer.id }, ...prev])
  }

  const filteredTrainers = trainers.filter((t) => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return true
    return (
      (t.name && t.name.toLowerCase().includes(q)) ||
      (t.specialty && t.specialty.toLowerCase().includes(q)) ||
      (t.role && t.role.toLowerCase().includes(q))
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-sans text-2xl font-black uppercase tracking-tight text-[#191916] sm:text-3xl">
            Trainers &amp; Coaches Management
          </h1>
          <p className="mt-1 text-xs text-[#747167]">
            Direct database records of gym coaches, specialties, and contact info.
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
              placeholder="Search coaches..."
              className="w-48 sm:w-60 rounded-xl border border-[#D5C9B7] bg-[#FAF7F2] py-2 pl-8 pr-3 text-xs text-[#191916] placeholder:text-[#8A8B70] focus:border-[#505A3B] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <button
            type="button"
            onClick={fetchTrainers}
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
            <span>Add Trainer</span>
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex h-48 w-full items-center justify-center rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#747167]">
            <RefreshCw size={16} className="animate-spin text-[#505A3B]" />
            <span>Loading trainers from database...</span>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-bold text-red-800">{error}</p>
          <button
            onClick={fetchTrainers}
            className="mt-3 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredTrainers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D5C9B7] bg-[#FAF7F2] p-12 text-center">
          <p className="text-sm font-bold text-[#191916]">No trainers found</p>
          <p className="mt-1 text-xs text-[#747167]">
            {searchQuery
              ? 'Try adjusting your search criteria.'
              : 'Add your first coach to persist them in MongoDB.'}
          </p>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#505A3B] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#3E472E]"
          >
            <Plus size={14} />
            <span>Add New Trainer</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredTrainers.map((trainer) => {
            const id = trainer._id || trainer.id
            return (
              <div
                key={id}
                className="flex flex-col justify-between rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-5 shadow-sm transition-all hover:border-[#505A3B] hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={trainer.image}
                        alt={trainer.name}
                        className="h-14 w-14 rounded-xl object-cover shadow-sm"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85'
                        }}
                      />
                      <div>
                        <h3 className="font-sans text-base font-bold text-[#191916]">
                          {trainer.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#505A3B]">
                          {trainer.role}
                        </p>
                        <p className="text-[11px] text-[#747167]">
                          {trainer.experience || '3+ Years Experience'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(id)}
                      className="rounded-lg p-1.5 text-[#A49E8D] transition-colors hover:bg-red-50 hover:text-red-600"
                      title="Remove Trainer from DB"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mt-4 border-t border-[#D5C9B7]/60 pt-3">
                    <p className="text-[11px] text-[#747167]">Specialty</p>
                    <p className="text-xs font-bold text-[#191916]">
                      {trainer.specialty || 'General Fitness'}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#514D43]">
                    <Users size={14} className="text-[#505A3B]" />
                    <span>{trainer.clientsCount || 0} Active Clients</span>
                  </div>

                  <div className="mt-3 space-y-1 text-[11px] text-[#747167]">
                    <p className="flex items-center gap-1.5">
                      <Phone size={12} /> {trainer.phone || 'No phone provided'}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Mail size={12} /> {trainer.email || 'No email provided'}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal is mounted locally on this page */}
      <AddTrainerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onTrainerAdded={handleTrainerAdded}
      />
    </div>
  )
}
