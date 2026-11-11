import { useState, useEffect } from 'react'
import { X, Upload } from 'lucide-react'
import { memberApi, trainerApi } from '../../api'
import { readImageAsDataUrl } from '../../utils/imageUpload'

export default function AddMemberModal({ isOpen, onClose, onMemberAdded }) {
  const [trainersList, setTrainersList] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const initialForm = {
    name: '',
    email: '',
    phone: '',
    membership: 'Club Member',
    assignedTrainer: 'Arjun Mehta',
    avatar: '',
  }

  const [formData, setFormData] = useState(initialForm)

  useEffect(() => {
    if (isOpen) {
      trainerApi
        .getAll()
        .then((res) => {
          const list = res?.data || (Array.isArray(res) ? res : [])
          if (list.length > 0) {
            setTrainersList(list)
            setFormData((prev) => ({ ...prev, assignedTrainer: list[0].name }))
          }
        })
        .catch(() => {})
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleUserAvatarChange = async (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return

    try {
      const dataUrl = await readImageAsDataUrl(file, 5)
      setFormData((prev) => ({ ...prev, avatar: dataUrl }))
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
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Member Name and Email are required')
      return
    }

    setIsSubmitting(true)
    setError(null)

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      membership: formData.membership || 'Club Member',
      assignedTrainer: formData.assignedTrainer || 'Arjun Mehta',
      avatar:
        formData.avatar.trim() ||
        `https://i.pravatar.cc/80?img=${Math.floor(Math.random() * 50) + 1}`,
    }

    try {
      const res = await memberApi.create(payload)
      const createdMember = res?.data || {
        ...payload,
        id: `usr-${Date.now()}`,
        status: 'Active',
        joinedDate: new Date().toISOString().split('T')[0],
      }
      onMemberAdded?.(createdMember)
      handleClose()
    } catch (err) {
      setError(err.message || 'Failed to enroll member in database')
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
          Enroll New Member
        </h3>
        <p className="mt-1 text-xs text-[#747167]">
          Add personal contact details, membership tier, and assign an onboarding coach.
        </p>

        {error && (
          <div className="mt-3 rounded-lg bg-red-100 p-2.5 text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {/* Member Avatar */}
          <div className="rounded-xl border border-[#D5C9B7] bg-[#EDE4D7]/40 p-3">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Member Avatar
              </label>
              <span className="text-[10px] font-semibold text-[#626A48]">
                Saved to Cloudinary &bull; Max 5MB
              </span>
            </div>

            <div className="mt-2.5 flex items-start gap-3.5">
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#D5C9B7] bg-white shadow-sm">
                <img
                  src={
                    formData.avatar ||
                    `https://i.pravatar.cc/80?img=1`
                  }
                  alt="Member Preview"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <div>
                  <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#D5C9B7] bg-white px-3 py-1.5 text-xs font-semibold text-[#191916] shadow-sm hover:bg-black/5 transition-colors">
                    <Upload size={14} className="text-[#505A3B]" />
                    <span>Upload Avatar</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/jpg"
                      onChange={handleUserAvatarChange}
                      className="hidden"
                    />
                  </label>
                  {formData.avatar && formData.avatar.startsWith('data:image') && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: '' })}
                      className="ml-2 text-[11px] text-red-600 hover:underline"
                    >
                      Clear File
                    </button>
                  )}
                </div>

                <input
                  type="url"
                  value={formData.avatar.startsWith('data:image') ? '' : formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="Or paste avatar URL"
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
              placeholder="e.g. Marcus Vance"
              className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="marcus@example.com"
                className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Membership Tier
              </label>
              <select
                value={formData.membership}
                onChange={(e) => setFormData({ ...formData, membership: e.target.value })}
                className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              >
                <option value="Club Member">Club Member</option>
                <option value="Personal Training">Personal Training</option>
                <option value="Free Pass Holder">Free Pass Holder</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#191916]">
                Assigned Coach
              </label>
              <select
                value={formData.assignedTrainer}
                onChange={(e) => setFormData({ ...formData, assignedTrainer: e.target.value })}
                className="mt-1 w-full rounded-lg border border-[#D5C9B7] bg-white px-3 py-2 text-xs text-[#191916] focus:border-[#505A3B] focus:outline-none"
              >
                {trainersList.length > 0 ? (
                  trainersList.map((t) => (
                    <option key={t._id || t.id} value={t.name}>
                      {t.name}
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
              {isSubmitting ? 'Saving to Database...' : 'Register Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
