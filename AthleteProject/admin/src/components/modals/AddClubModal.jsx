import { useState, useEffect } from 'react'
import { X, Upload } from 'lucide-react'
import { clubApi, trainerApi } from '../../api'
import { readImageAsDataUrl } from '../../utils/imageUpload'

export default function AddClubModal({ isOpen, onClose, onClubAdded }) {
  const [trainersList, setTrainersList] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const initialForm = {
    name: '',
    sport: '',
    coach: 'Arjun Mehta',
    schedule: '',
    maxCapacity: 30,
    intensity: 'High',
    description: '',
    image: '',
  }

  const [formData, setFormData] = useState(initialForm)

  // Fetch coach names for the select dropdown when modal opens
  useEffect(() => {
    if (isOpen) {
      trainerApi
        .getAll()
        .then((res) => {
          const list = res?.data || (Array.isArray(res) ? res : [])
          if (list.length > 0) {
            setTrainersList(list)
            setFormData((prev) => ({ ...prev, coach: list[0].name }))
          }
        })
        .catch(() => {})
    }
  }, [isOpen])

  if (!isOpen) return null

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

  const handleClose = () => {
    setFormData(initialForm)
    setError(null)
    onClose()
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
      description: formData.description.trim() || '',
      image:
        formData.image.trim() ||
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85',
    }

    try {
      const res = await clubApi.create(payload)
      const createdClub = res?.data || {
        ...payload,
        id: `cl-${Date.now()}`,
        membersCount: 1,
        status: 'Active',
      }
      onClubAdded?.(createdClub)
      handleClose()
    } catch (err) {
      setError(err.message || 'Failed to save club to database')
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
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[#D5C9B7] bg-[#EDE4D7] p-6 shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 text-[#514D43] hover:bg-black/10"
        >
          <X size={18} />
        </button>

        <h3 className="font-sans text-xl font-black uppercase text-[#191916]">
          Create Training Club
        </h3>
        <p className="mt-1 text-xs text-[#747167]">
          Add workout squad schedule, capacity limit, and assign lead trainer.
        </p>

        {error && (
          <div className="mt-3 rounded-lg bg-red-100 p-2.5 text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {/* Cover Photo */}
          <div className="rounded-xl border border-[#D5C9B7] bg-[#EDE4D7]/40 p-3">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Cover Photo
              </label>
              <span className="text-[10px] font-semibold text-[#626A48]">
                Saved to Cloudinary &bull; Max 5MB
              </span>
            </div>

            <div className="mt-2.5 flex items-start gap-3.5">
              <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 border-[#D5C9B7] bg-white shadow-sm">
                <img
                  src={
                    formData.image ||
                    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85'
                  }
                  alt="Club Preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85'
                  }}
                />
              </div>

              <div className="flex-1 space-y-2">
                <div>
                  <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#D5C9B7] bg-white px-3 py-1.5 text-xs font-semibold text-[#191916] shadow-sm hover:bg-black/5 transition-colors">
                    <Upload size={14} className="text-[#505A3B]" />
                    <span>Choose Cover File</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/jpg"
                      onChange={handleClubImageChange}
                      className="hidden"
                    />
                  </label>
                  {formData.image && formData.image.startsWith('data:image') && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="ml-2 text-[11px] text-red-600 hover:underline"
                    >
                      Clear File
                    </button>
                  )}
                </div>

                <input
                  type="url"
                  value={formData.image.startsWith('data:image') ? '' : formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Or paste cover image URL"
                  className="w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-1.5 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
              Club Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Iron Brigade Powerlifting"
              className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Discipline / Sport <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.sport}
                onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                placeholder="e.g. Strength / Powerlifting"
                className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Lead Coach
              </label>
              <select
                value={formData.coach}
                onChange={(e) => setFormData({ ...formData, coach: e.target.value })}
                className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              >
                {trainersList.length > 0 ? (
                  trainersList.map((t) => (
                    <option key={t._id || t.id} value={t.name}>
                      {t.name} ({t.role || 'Coach'})
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Arjun Mehta">Arjun Mehta</option>
                    <option value="Rahul Sharma">Rahul Sharma</option>
                    <option value="Aanya Kapoor">Aanya Kapoor</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Schedule <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                placeholder="e.g. Mon, Wed, Fri &bull; 6:30 AM"
                className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Max Capacity
              </label>
              <input
                type="number"
                min="5"
                max="100"
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
              Brief Description
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Squad description, training focus..."
              className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow transition-colors ${
                isSubmitting
                  ? 'cursor-not-allowed bg-[#8A8B70]'
                  : 'bg-[#505A3B] hover:bg-[#3E472E]'
              }`}
            >
              {isSubmitting ? 'Saving to Database...' : 'Create Club'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
