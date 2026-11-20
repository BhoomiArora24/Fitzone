import { useState, useEffect } from 'react'
import { X, Upload, Check, Flame, Clock, MapPin } from 'lucide-react'
import { clubApi, trainerApi } from '../../api'
import { readImageAsDataUrl } from '../../utils/imageUpload'

export default function EditClubModal({ isOpen, onClose, club, onClubUpdated }) {
  const [trainersList, setTrainersList] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    sport: '',
    coach: '',
    schedule: '',
    maxCapacity: 30,
    intensity: 'High',
    status: 'Active',
    location: '',
    duration: '',
    targetAudience: '',
    prerequisites: '',
    perks: '',
    description: '',
    image: '',
  })

  // Pre-fill form data when club prop changes
  useEffect(() => {
    if (club) {
      setFormData({
        name: club.name || '',
        sport: club.sport || '',
        coach: club.coach || '',
        schedule: club.schedule || '',
        maxCapacity: club.maxCapacity || 30,
        intensity: club.intensity || 'High',
        status: club.status || 'Active',
        location: club.location || 'Main Gym Floor - Zone A',
        duration: club.duration || '60 Mins / Session',
        targetAudience: club.targetAudience || 'All Fitness Levels',
        prerequisites: club.prerequisites || 'Open to all gym members & pass holders',
        perks: Array.isArray(club.perks)
          ? club.perks.join(', ')
          : club.perks || 'Dedicated Coach Supervision, Video Form Feedback, Reserved Racks',
        description: club.description || '',
        image: club.image || '',
      })
      setError(null)
    }
  }, [club, isOpen])

  // Fetch trainers for dropdown
  useEffect(() => {
    if (isOpen) {
      trainerApi
        .getAll()
        .then((res) => {
          const list = res?.data || (Array.isArray(res) ? res : [])
          if (list.length > 0) {
            setTrainersList(list)
          }
        })
        .catch(() => {})
    }
  }, [isOpen])

  if (!isOpen || !club) return null

  const handleClubImageChange = async (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return

    try {
      const dataUrl = await readImageAsDataUrl(file, 5)
      setFormData((prev) => ({ ...prev, image: dataUrl }))
    } catch (err) {
      alert(err.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.sport.trim() || !formData.schedule.trim()) {
      setError('Name, sport, and schedule are required')
      return
    }

    setIsSubmitting(true)
    setError(null)

    const payload = {
      name: formData.name.trim(),
      sport: formData.sport.trim(),
      coach: formData.coach || 'Arjun Mehta',
      schedule: formData.schedule.trim(),
      maxCapacity: Number(formData.maxCapacity) || 30,
      intensity: formData.intensity || 'High',
      status: formData.status || 'Active',
      location: formData.location.trim() || 'Main Gym Floor - Zone A',
      duration: formData.duration.trim() || '60 Mins / Session',
      targetAudience: formData.targetAudience.trim() || 'All Fitness Levels',
      prerequisites: formData.prerequisites.trim() || 'Open to all gym members & pass holders',
      perks: formData.perks
        ? formData.perks.split(',').map((p) => p.trim()).filter(Boolean)
        : [],
      description: formData.description.trim() || '',
      image: formData.image.trim() || club.image,
    }

    try {
      const clubId = club._id || club.id
      const res = await clubApi.update(clubId, payload)
      const updatedData = res?.data || { ...payload, id: clubId, _id: clubId }

      if (onClubUpdated) {
        onClubUpdated(updatedData)
      }
      onClose()
    } catch (err) {
      setError(err.message || 'Failed to update club in database')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#D5C9B7] bg-[#FAF7F2] p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-[#514D43] hover:bg-black/10"
        >
          <X size={20} />
        </button>

        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#505A3B] text-white">
            <Flame size={20} />
          </div>
          <div>
            <h2 className="font-sans text-xl font-black uppercase text-[#191916]">
              Edit Training Club
            </h2>
            <p className="text-xs text-[#747167]">
              Update squad curriculum, schedules, lead coach, and capacity.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Row 1: Club Name & Sport Category */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-bold uppercase tracking-wider text-[#191916]">
                Club / Squad Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Barbell Club"
                className="mt-1 w-full rounded-xl border border-[#D5C9B7] bg-white px-3.5 py-2.5 text-xs text-[#191916] placeholder:text-[#A49E8D] focus:border-[#505A3B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-[#191916]">
                Sport Modality *
              </label>
              <input
                type="text"
                required
                value={formData.sport}
                onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                placeholder="e.g. Strength & Conditioning"
                className="mt-1 w-full rounded-xl border border-[#D5C9B7] bg-white px-3.5 py-2.5 text-xs text-[#191916] placeholder:text-[#A49E8D] focus:border-[#505A3B] focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2: Coach & Status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-bold uppercase tracking-wider text-[#191916]">
                Assigned Lead Coach *
              </label>
              <select
                value={formData.coach}
                onChange={(e) => setFormData({ ...formData, coach: e.target.value })}
                className="mt-1 w-full rounded-xl border border-[#D5C9B7] bg-white px-3.5 py-2.5 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              >
                {trainersList.length > 0 ? (
                  trainersList.map((t) => (
                    <option key={t.id || t._id || t.name} value={t.name}>
                      {t.name} ({t.specialty || 'Coach'})
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Arjun Mehta">Arjun Mehta (Strength)</option>
                    <option value="Aanya Kapoor">Aanya Kapoor (HIIT)</option>
                    <option value="Rahul Sharma">Rahul Sharma (Powerlifting)</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-[#191916]">
                Squad Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="mt-1 w-full rounded-xl border border-[#D5C9B7] bg-white px-3.5 py-2.5 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              >
                <option value="Active">Active (Open Roster)</option>
                <option value="Full">Full (Waitlist Only)</option>
                <option value="Archived">Archived / Inactive</option>
              </select>
            </div>
          </div>

          {/* Row 3: Schedule & Intensity */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-bold uppercase tracking-wider text-[#191916]">
                Weekly Schedule *
              </label>
              <input
                type="text"
                required
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                placeholder="e.g. Mon / Wed / Fri · 6:30 PM"
                className="mt-1 w-full rounded-xl border border-[#D5C9B7] bg-white px-3.5 py-2.5 text-xs text-[#191916] placeholder:text-[#A49E8D] focus:border-[#505A3B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-[#191916]">
                Workout Intensity
              </label>
              <select
                value={formData.intensity}
                onChange={(e) => setFormData({ ...formData, intensity: e.target.value })}
                className="mt-1 w-full rounded-xl border border-[#D5C9B7] bg-white px-3.5 py-2.5 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              >
                <option value="All Levels">All Levels (Foundational to Intermediate)</option>
                <option value="Moderate">Moderate Intensity</option>
                <option value="High">High Intensity</option>
                <option value="Extreme">Extreme (Advanced Competitors)</option>
              </select>
            </div>
          </div>

          {/* Row 4: Location, Duration & Max Capacity */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block font-bold uppercase tracking-wider text-[#191916]">
                Gym Floor Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Zone A · Power Rig"
                className="mt-1 w-full rounded-xl border border-[#D5C9B7] bg-white px-3 py-2.5 text-xs text-[#191916] placeholder:text-[#A49E8D] focus:border-[#505A3B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-[#191916]">
                Session Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="60 Mins / Session"
                className="mt-1 w-full rounded-xl border border-[#D5C9B7] bg-white px-3 py-2.5 text-xs text-[#191916] placeholder:text-[#A49E8D] focus:border-[#505A3B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-[#191916]">
                Max Athlete Capacity
              </label>
              <input
                type="number"
                min="5"
                max="100"
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                className="mt-1 w-full rounded-xl border border-[#D5C9B7] bg-white px-3 py-2.5 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              />
            </div>
          </div>

          {/* Row 5: Target Audience & Prerequisites */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-bold uppercase tracking-wider text-[#191916]">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder="e.g. Strength Athletes & Compound Lifters"
                className="mt-1 w-full rounded-xl border border-[#D5C9B7] bg-white px-3.5 py-2.5 text-xs text-[#191916] placeholder:text-[#A49E8D] focus:border-[#505A3B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-[#191916]">
                Prerequisites
              </label>
              <input
                type="text"
                value={formData.prerequisites}
                onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
                placeholder="e.g. Open to all gym members & pass holders"
                className="mt-1 w-full rounded-xl border border-[#D5C9B7] bg-white px-3.5 py-2.5 text-xs text-[#191916] placeholder:text-[#A49E8D] focus:border-[#505A3B] focus:outline-none"
              />
            </div>
          </div>

          {/* Row 6: Perks / Inclusions */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-[#191916]">
              Key Inclusions &amp; Perks (Comma-separated)
            </label>
            <input
              type="text"
              value={formData.perks}
              onChange={(e) => setFormData({ ...formData, perks: e.target.value })}
              placeholder="Dedicated Coach Supervision, Video Form Feedback, Reserved Racks"
              className="mt-1 w-full rounded-xl border border-[#D5C9B7] bg-white px-3.5 py-2.5 text-xs text-[#191916] placeholder:text-[#A49E8D] focus:border-[#505A3B] focus:outline-none"
            />
          </div>

          {/* Row 7: Description */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-[#191916]">
              Detailed Club Curriculum &amp; Overview
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe squad focus, weekly programming, and training methodology..."
              className="mt-1 w-full rounded-xl border border-[#D5C9B7] bg-white px-3.5 py-2.5 text-xs text-[#191916] placeholder:text-[#A49E8D] focus:border-[#505A3B] focus:outline-none"
            />
          </div>

          {/* Row 8: Image Upload & Preview */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-[#191916]">
              Club Banner Image
            </label>
            <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 rounded-xl border border-[#D5C9B7] bg-white px-3.5 py-2 text-xs text-[#191916] placeholder:text-[#A49E8D] focus:border-[#505A3B] focus:outline-none"
              />
              <label className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[#D5C9B7] bg-[#EDE4D7] px-4 py-2 font-bold uppercase tracking-wider text-[#191916] hover:bg-black/5">
                <Upload size={14} />
                <span>Upload New</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleClubImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {formData.image && (
              <div className="mt-2 h-24 w-full overflow-hidden rounded-xl border border-[#D5C9B7]">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D5C9B7]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#D5C9B7] bg-white px-4 py-2.5 font-bold uppercase tracking-wider text-[#514D43] hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#505A3B] px-5 py-2.5 font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#3E472E] disabled:opacity-60"
            >
              <Check size={14} strokeWidth={2.5} />
              <span>{isSubmitting ? 'Saving Changes...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
