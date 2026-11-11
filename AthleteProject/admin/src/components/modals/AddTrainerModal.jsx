import { useState } from 'react'
import { X, Upload } from 'lucide-react'
import { trainerApi } from '../../api'
import { readImageAsDataUrl } from '../../utils/imageUpload'

export default function AddTrainerModal({ isOpen, onClose, onTrainerAdded }) {
  const initialForm = {
    name: '',
    role: 'Fitness Coach',
    specialty: '',
    experience: '3+ Years Experience',
    clientsCount: 0,
    phone: '',
    email: '',
    image: '',
  }

  const [formData, setFormData] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  if (!isOpen) return null

  const handleImageFileChange = async (e) => {
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
    if (!formData.name.trim() || !formData.specialty.trim()) {
      setError('Name and Specialty are required')
      return
    }

    setIsSubmitting(true)
    setError(null)

    const payload = {
      name: formData.name.trim(),
      role: formData.role.trim() || 'Fitness Coach',
      specialty: formData.specialty.trim(),
      experience: formData.experience.trim() || '3+ Years Experience',
      clientsCount: Number(formData.clientsCount) || 0,
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      image:
        formData.image.trim() ||
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85',
    }

    try {
      const res = await trainerApi.create(payload)
      const createdTrainer = res?.data || { ...payload, id: `tr-${Date.now()}` }
      onTrainerAdded?.(createdTrainer)
      handleClose()
    } catch (err) {
      setError(err.message || 'Failed to save trainer to database')
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
          Add New Trainer
        </h3>
        <p className="mt-1 text-xs text-[#747167]">
          Enter coach credentials, specialty, experience, and profile image.
        </p>

        {error && (
          <div className="mt-3 rounded-lg bg-red-100 p-2.5 text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {/* Profile Image with File Upload or URL & Live Preview */}
          <div className="rounded-xl border border-[#D5C9B7] bg-[#EDE4D7]/40 p-3">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Profile Image
              </label>
              <span className="text-[10px] font-semibold text-[#626A48]">
                Saved to Cloudinary &bull; Max 5MB
              </span>
            </div>

            <div className="mt-2.5 flex items-start gap-3.5">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 border-[#D5C9B7] bg-white shadow-sm">
                <img
                  src={
                    formData.image ||
                    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85'
                  }
                  alt="Trainer Preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85'
                  }}
                />
              </div>

              <div className="flex-1 space-y-2">
                <div>
                  <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#D5C9B7] bg-white px-3 py-1.5 text-xs font-semibold text-[#191916] shadow-sm hover:bg-black/5 transition-colors">
                    <Upload size={14} className="text-[#505A3B]" />
                    <span>Choose Local File</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/jpg"
                      onChange={handleImageFileChange}
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
                  placeholder="Or paste image URL (Unsplash, etc.)"
                  className="w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-1.5 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Sameer Khanna"
              className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Role / Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Master Strength Coach"
                className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Specialty <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                placeholder="e.g. Powerlifting & Hypertrophy"
                className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Experience
              </label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g. 5+ Years Experience"
                className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Active Clients Count
              </label>
              <input
                type="number"
                min="0"
                value={formData.clientsCount}
                onChange={(e) => setFormData({ ...formData, clientsCount: e.target.value })}
                placeholder="0"
                className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Phone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="coach@fitzone.com"
                className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              />
            </div>
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
              {isSubmitting ? 'Saving to Database...' : 'Save Trainer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
