import { useState, useEffect } from 'react'
import { Plus, Trash2, Search, RefreshCw } from 'lucide-react'
import { memberApi } from '../api'
import AddMemberModal from '../components/modals/AddMemberModal'

export default function MembersPage() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const fetchMembers = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await memberApi.getAll()
      const data = res?.data || (Array.isArray(res) ? res : [])
      setMembers(data.map((m) => ({ ...m, id: m._id || m.id })))
    } catch (err) {
      setError(err.message || 'Failed to fetch members from database')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this member from the database?')) {
      return
    }

    try {
      await memberApi.delete(id)
      setMembers((prev) => prev.filter((m) => (m._id || m.id) !== id))
    } catch (err) {
      alert(err.message || 'Failed to delete member from database')
    }
  }

  const handleMemberAdded = (newMember) => {
    setMembers((prev) => [{ ...newMember, id: newMember._id || newMember.id }, ...prev])
  }

  const filteredMembers = members.filter((u) => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return true
    return (
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q)) ||
      (u.membership && u.membership.toLowerCase().includes(q))
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-sans text-2xl font-black uppercase tracking-tight text-[#191916] sm:text-3xl">
            Available Members &amp; Users
          </h1>
          <p className="mt-1 text-xs text-[#747167]">
            Direct database records of registered members, pass holders, and assigned coaches.
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
              placeholder="Search members by name/email..."
              className="w-48 sm:w-60 rounded-xl border border-[#D5C9B7] bg-[#FAF7F2] py-2 pl-8 pr-3 text-xs text-[#191916] placeholder:text-[#8A8B70] focus:border-[#505A3B] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <button
            type="button"
            onClick={fetchMembers}
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
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex h-48 w-full items-center justify-center rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#747167]">
            <RefreshCw size={16} className="animate-spin text-[#505A3B]" />
            <span>Loading members from database...</span>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-bold text-red-800">{error}</p>
          <button
            onClick={fetchMembers}
            className="mt-3 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D5C9B7] bg-[#FAF7F2] p-12 text-center">
          <p className="text-sm font-bold text-[#191916]">No members found</p>
          <p className="mt-1 text-xs text-[#747167]">
            {searchQuery
              ? 'Try searching with another name or email.'
              : 'Enroll your first member to persist them in MongoDB.'}
          </p>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#505A3B] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#3E472E]"
          >
            <Plus size={14} />
            <span>Add Member</span>
          </button>
        </div>
      ) : (
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
                {filteredMembers.map((user) => {
                  const id = user._id || user.id
                  return (
                    <tr key={id} className="transition-colors hover:bg-black/[0.02]">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-9 w-9 rounded-full object-cover shadow-sm"
                            onError={(e) => {
                              e.target.src = `https://i.pravatar.cc/80?u=${id}`
                            }}
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
                        {user.assignedTrainer || 'None'}
                      </td>

                      <td className="px-5 py-4 text-[#747167]">
                        {user.joinedDate || 'Recent'}
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
                          {user.status || 'Active'}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(id)}
                          className="rounded p-1.5 text-[#A49E8D] hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete Member from DB"
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

      {/* Modal is mounted locally on this page */}
      <AddMemberModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onMemberAdded={handleMemberAdded}
      />
    </div>
  )
}
