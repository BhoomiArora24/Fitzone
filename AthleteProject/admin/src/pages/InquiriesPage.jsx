import { useState, useEffect } from 'react'
import { Ticket, Search, RefreshCw, Trash2, CheckCircle2, Clock, Check, MessageSquare } from 'lucide-react'
import { inquiryApi } from '../api'

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all') // 'all', 'passes', 'inquiries', 'used'

  const fetchInquiries = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await inquiryApi.getAll()
      const data = res?.data || (Array.isArray(res) ? res : [])
      setInquiries(data.map((i) => ({ ...i, id: i._id || i.id })))
    } catch (err) {
      setError(err.message || 'Failed to fetch inquiries from database')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  const handleUpdateStatus = async (id, newStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => ((inq._id || inq.id) === id ? { ...inq, status: newStatus } : inq))
    )

    try {
      await inquiryApi.updateStatus(id, newStatus)
    } catch (err) {
      alert(`Failed to update status: ${err.message}`)
      fetchInquiries()
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record from the database?')) {
      return
    }

    try {
      await inquiryApi.delete(id)
      setInquiries((prev) => prev.filter((inq) => (inq._id || inq.id) !== id))
    } catch (err) {
      alert(`Failed to delete record: ${err.message}`)
    }
  }

  const filteredInquiries = inquiries.filter((i) => {
    const q = searchQuery.toLowerCase().trim()
    const matchesSearch =
      !q ||
      (i.name && i.name.toLowerCase().includes(q)) ||
      (i.email && i.email.toLowerCase().includes(q)) ||
      (i.code && i.code.toLowerCase().includes(q)) ||
      (i.type && i.type.toLowerCase().includes(q)) ||
      (i.message && i.message.toLowerCase().includes(q))

    if (!matchesSearch) return false

    if (filterType === 'passes') return i.type === 'Free Pass Claim'
    if (filterType === 'inquiries') return i.type !== 'Free Pass Claim'
    if (filterType === 'used') return i.status === 'Used'

    return true
  })

  const totalPassClaims = inquiries.filter((i) => i.type === 'Free Pass Claim').length
  const totalGeneral = inquiries.filter((i) => i.type !== 'Free Pass Claim').length
  const totalUsed = inquiries.filter((i) => i.status === 'Used').length

  return (
    <div className="space-y-6">
      {/* ── Top Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-sans text-2xl font-black uppercase tracking-tight text-[#191916] sm:text-3xl">
            Pass Claims &amp; Inquiries
          </h1>
          <p className="mt-1 text-xs text-[#747167]">
            Live MongoDB database records of digital workout pass claims and visitor messages. Nothing is static.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8B70]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code, name, email..."
              className="w-48 sm:w-64 rounded-xl border border-[#D5C9B7] bg-[#FAF7F2] py-2 pl-8 pr-3 text-xs text-[#191916] placeholder:text-[#8A8B70] focus:border-[#505A3B] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <button
            type="button"
            onClick={fetchInquiries}
            className="rounded-xl border border-[#D5C9B7] bg-[#FAF7F2] p-2 text-[#514D43] hover:bg-black/5"
            title="Reload from MongoDB"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* ── Quick KPI Stat Pills ─────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#D5C9B7] pb-3 text-xs">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
            filterType === 'all'
              ? 'bg-[#505A3B] text-white shadow-sm'
              : 'text-[#514D43] hover:bg-black/5 hover:text-[#191916]'
          }`}
        >
          All Records ({inquiries.length})
        </button>

        <button
          type="button"
          onClick={() => setFilterType('passes')}
          className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
            filterType === 'passes'
              ? 'bg-[#505A3B] text-white shadow-sm'
              : 'text-[#514D43] hover:bg-black/5 hover:text-[#191916]'
          }`}
        >
          Free Pass Claims ({totalPassClaims})
        </button>

        <button
          type="button"
          onClick={() => setFilterType('used')}
          className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
            filterType === 'used'
              ? 'bg-[#505A3B] text-white shadow-sm'
              : 'text-[#514D43] hover:bg-black/5 hover:text-[#191916]'
          }`}
        >
          Passes Used ({totalUsed})
        </button>

        <button
          type="button"
          onClick={() => setFilterType('inquiries')}
          className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
            filterType === 'inquiries'
              ? 'bg-[#505A3B] text-white shadow-sm'
              : 'text-[#514D43] hover:bg-black/5 hover:text-[#191916]'
          }`}
        >
          General Inquiries ({totalGeneral})
        </button>
      </div>

      {/* ── Content List ────────────────────────────────────────────── */}
      {loading ? (
        <div className="flex h-48 w-full items-center justify-center rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#747167]">
            <RefreshCw size={16} className="animate-spin text-[#505A3B]" />
            <span>Fetching live inquiries from MongoDB...</span>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-bold text-red-800">{error}</p>
          <button
            onClick={fetchInquiries}
            className="mt-3 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D5C9B7] bg-[#FAF7F2] p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#505A3B]/10 text-[#505A3B]">
            <Ticket size={24} />
          </div>
          <p className="mt-3 text-sm font-bold text-[#191916]">
            {searchQuery ? 'No matching records found' : 'No pass claims or inquiries in database'}
          </p>
          <p className="mt-1 text-xs text-[#747167]">
            {searchQuery
              ? 'Try searching with another voucher code, name, or email.'
              : 'When visitors claim a free pass or send a message on the site, records will appear here live from MongoDB.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredInquiries.map((inq) => {
            const id = inq._id || inq.id
            const dateStr = inq.createdAt || inq.date
              ? new Date(inq.createdAt || inq.date).toLocaleDateString()
              : 'Recent'
            const isPass = inq.type === 'Free Pass Claim'
            const isUsed = inq.status === 'Used'

            return (
              <div
                key={id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-5 shadow-sm transition-all hover:border-[#505A3B]/50 sm:flex-row sm:items-center"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-[#191916]">{inq.name}</span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        isPass
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-[#E3DACB] text-[#505A3B]'
                      }`}
                    >
                      {inq.type || 'Inquiry'}
                    </span>
                    {inq.code && (
                      <span className="font-mono text-xs font-bold text-[#505A3B]">
                        {inq.code}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#514D43]">{inq.message || 'No additional message.'}</p>
                  <p className="text-[11px] text-[#8A8B70]">
                    Email: {inq.email} &bull; Received {dateStr}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Status Dropdown / Toggle */}
                  {isPass ? (
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                          isUsed
                            ? 'bg-stone-200 text-stone-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {isUsed ? 'Pass Used' : 'Pass Claimed'}
                      </span>

                      {/* 1-Click Action for Free Pass */}
                      {!isUsed ? (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(id, 'Used')}
                          className="inline-flex items-center gap-1 rounded-lg bg-stone-800 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-black transition-colors"
                          title="Mark this pass as redeemed at the front desk"
                        >
                          <Check size={12} strokeWidth={2.5} />
                          <span>Mark as Used</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(id, 'Claimed')}
                          className="rounded-lg border border-[#D5C9B7] bg-white px-2 py-1 text-[10px] font-bold uppercase text-[#747167] hover:bg-black/5"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  ) : (
                    <select
                      value={inq.status || 'Pending'}
                      onChange={(e) => handleUpdateStatus(id, e.target.value)}
                      className="rounded-lg border border-[#D5C9B7] bg-white px-2.5 py-1 text-xs font-bold text-[#191916] focus:border-[#505A3B] focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Responded">Responded</option>
                      <option value="Closed">Closed</option>
                    </select>
                  )}

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDelete(id)}
                    className="rounded p-1.5 text-[#A49E8D] hover:bg-red-50 hover:text-red-600 transition-colors"
                    title="Delete record from database"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
