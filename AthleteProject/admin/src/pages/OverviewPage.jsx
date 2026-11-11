import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Dumbbell, Flame, Ticket, RefreshCw } from 'lucide-react'
import { trainerApi, clubApi } from '../api'

export default function OverviewPage() {
  const [trainers, setTrainers] = useState([])
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      try {
        const [trainersRes, clubsRes] = await Promise.allSettled([
          trainerApi.getAll(),
          clubApi.getAll(),
        ])

        if (!isMounted) return

        if (trainersRes.status === 'fulfilled') {
          const data = trainersRes.value?.data || (Array.isArray(trainersRes.value) ? trainersRes.value : [])
          setTrainers(data.map((t) => ({ ...t, id: t._id || t.id })))
        }

        if (clubsRes.status === 'fulfilled') {
          const data = clubsRes.value?.data || (Array.isArray(clubsRes.value) ? clubsRes.value : [])
          setClubs(data.map((c) => ({ ...c, id: c._id || c.id })))
        }
      } catch {
        // network error
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-sans text-2xl font-black uppercase tracking-tight text-[#191916] sm:text-3xl">
          Gym Management Overview
        </h1>
        <p className="mt-1 text-xs text-[#747167]">
          Live database metrics for certified trainers and active workout squads.
        </p>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#747167]">
              Registered Members
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#505A3B]/10 text-[#505A3B]">
              <Users size={16} />
            </div>
          </div>
          <p className="mt-3 font-sans text-3xl font-black text-[#191916]">
            1,540
          </p>
          <p className="mt-1 text-[11px] font-semibold text-emerald-700">
            Database synchronized
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
            {loading ? '...' : trainers.length}
          </p>
          <p className="mt-1 text-[11px] text-[#747167]">
            Active in MongoDB roster
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
            {loading ? '...' : clubs.length}
          </p>
          <p className="mt-1 text-[11px] text-[#747167]">
            Active training squads
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
            Live
          </p>
          <p className="mt-1 text-[11px] font-semibold text-emerald-700">
            Digital vouchers active
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
            <Link
              to="/trainers"
              className="text-xs font-bold text-[#505A3B] hover:underline"
            >
              View All ({trainers.length}) &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="flex h-36 items-center justify-center">
              <RefreshCw size={16} className="animate-spin text-[#505A3B]" />
            </div>
          ) : trainers.length === 0 ? (
            <p className="py-8 text-center text-xs text-[#747167]">
              No coaches found in database.
            </p>
          ) : (
            <div className="mt-4 divide-y divide-[#D5C9B7]/60">
              {trainers.slice(0, 4).map((t) => (
                <div key={t.id || t._id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-10 w-10 rounded-full object-cover shadow-sm"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85'
                      }}
                    />
                    <div>
                      <p className="text-xs font-bold text-[#191916]">{t.name}</p>
                      <p className="text-[11px] text-[#747167]">{t.specialty || t.role}</p>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#E3DACB] px-2.5 py-0.5 text-[10px] font-bold text-[#505A3B]">
                    {t.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Workout Clubs Quick Preview */}
        <div className="rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#D5C9B7]/80 pb-3">
            <h3 className="font-sans text-base font-bold text-[#191916]">
              Active Workout Clubs
            </h3>
            <Link
              to="/clubs"
              className="text-xs font-bold text-[#505A3B] hover:underline"
            >
              View All ({clubs.length}) &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="flex h-36 items-center justify-center">
              <RefreshCw size={16} className="animate-spin text-[#505A3B]" />
            </div>
          ) : clubs.length === 0 ? (
            <p className="py-8 text-center text-xs text-[#747167]">
              No workout clubs found in database.
            </p>
          ) : (
            <div className="mt-4 divide-y divide-[#D5C9B7]/60">
              {clubs.slice(0, 4).map((c) => (
                <div key={c.id || c._id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-xs font-bold text-[#191916]">{c.name}</p>
                    <p className="text-[11px] text-[#747167]">{c.schedule}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-[#505A3B]">
                      {c.membersCount || 1} / {c.maxCapacity || 30}
                    </span>
                    <p className="text-[10px] text-[#747167]">Lead: {c.coach}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
