import { useState, useEffect } from 'react'
import { Ticket, Search, RefreshCw } from 'lucide-react'
import { inquiryApi } from '../api'

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

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

  const handleCycleStatus = async (id, currentStatus) => {
    const nextStatus =
      currentStatus === 'Unclaimed'
        ? 'Responded'
        : currentStatus === 'Responded'
        ? 'Pending'
        : 'Unclaimed'

    // Optimistic UI update
    setInquiries((prev) =>
      prev.map((inq) => ((inq._id || inq.id) === id ? { ...inq, status: nextStatus } : inq))
    )

    try {
      await inquiryApi.updateStatus(id, nextStatus)
    } catch (err) {
      console.warn('Failed to sync status to database:', err.message)
    }
  }

  const filteredInquiries = inquiries.filter((i) => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return true
    return (
      (i.name && i.name.toLowerCase().includes(q)) ||
      (i.email && i.email.toLowerCase().includes(q)) ||
      (i.code && i.code.toLowerCase().includes(q)) ||
      (i.type && i.type.toLowerCase().includes(q))
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-sans text-2xl font-black uppercase tracking-tight text-[#191916] sm:text-3xl">
            Pass Claims &amp; Inquiries
          </h1>
          <p className="mt-1 text-xs text-[#747167]">
            Direct database records of digital guest pass claims and visitor contact messages.
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
              placeholder="Search by code, name, email..."
              className="w-48 sm:w-64 rounded-xl border border-[#D5C9B7] bg-[#FAF7F2] py-2 pl-8 pr-3 text-xs text-[#191916] placeholder:text-[#8A8B70] focus:border-[#505A3B] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <button
            type="button"
            onClick={fetchInquiries}
            className="rounded-xl border border-[#D5C9B7] bg-[#FAF7F2] p-2 text-[#514D43] hover:bg-black/5"
            title="Reload from DB"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex h-48 w-full items-center justify-center rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#747167]">
            <RefreshCw size={16} className="animate-spin text-[#505A3B]" />
            <span>Loading inquiries from database...</span>
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
            {searchQuery ? 'No matching inquiries found' : 'No inquiries or claims recorded'}
          </p>
          <p className="mt-1 text-xs text-[#747167]">
            {searchQuery
              ? 'Try searching with another voucher code, name, or email.'
              : 'Guest pass downloads and contact messages from the site will appear here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredInquiries.map((inq) => {
            const id = inq._id || inq.id
            const dateStr = inq.createdAt || inq.date
              ? new Date(inq.createdAt || inq.date).toLocaleDateString()
              : 'Recent'

            return (
              <div
                key={id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-5 shadow-sm transition-all hover:border-[#505A3B]/50 sm:flex-row sm:items-center"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-[#191916]">{inq.name}</span>
                    <span className="rounded bg-[#E3DACB] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#505A3B]">
                      {inq.type || 'Pass Claim'}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#505A3B]">
                      {inq.code}
                    </span>
                  </div>
                  <p className="text-xs text-[#514D43]">{inq.message || 'No additional message.'}</p>
                  <p className="text-[11px] text-[#8A8B70]">
                    Email: {inq.email} &bull; Received {dateStr}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleCycleStatus(id, inq.status)}
                    title="Click to toggle status"
                    className={`cursor-pointer rounded-full px-3 py-1 text-xs font-bold transition-all ${
                      inq.status === 'Responded'
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : inq.status === 'Unclaimed'
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    }`}
                  >
                    {inq.status || 'Unclaimed'} &bull; Toggle
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
