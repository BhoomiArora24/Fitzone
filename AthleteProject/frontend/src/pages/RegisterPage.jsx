import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Dumbbell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields.')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      })
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-[85vh] bg-[#EDE4D7] px-4 py-16 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* Background ambient gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_15%,rgba(255,255,255,0.6),transparent_40%),linear-gradient(135deg,rgba(237,228,215,0.98),rgba(237,228,215,0.85))]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="overflow-hidden border border-[#D5C9B7] bg-[#FAF7F2] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:p-10">
          {/* Brand & Title */}
          <div className="text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#505A3B] text-white shadow-md mb-4">
              <Dumbbell size={24} />
            </div>

            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#626A48]">
                Join The Movement
              </span>
              <span className="h-px w-8 bg-[#A49A83]" />
            </div>

            <h1 className="font-display text-3xl font-bold uppercase tracking-[0.03em] text-[#191916]">
              Create Your <span className="text-[#505A3B]">FitZone</span> Profile
            </h1>
            <p className="mt-2 text-xs text-[#6F6B61]">
              Register to access workout squads, schedule sessions, and join our fitness community.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-3.5 text-xs text-red-800">
              <p className="font-semibold">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#3D3B35]">
                Full Name *
              </label>
              <div className="relative mt-1.5">
                <User
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A857B]"
                />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Morgan"
                  className="w-full border border-[#D5C9B7] bg-white py-2.5 pl-10 pr-4 text-xs text-[#191916] placeholder-[#A49E93] transition-colors focus:border-[#505A3B] focus:outline-none focus:ring-1 focus:ring-[#505A3B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#3D3B35]">
                Email Address *
              </label>
              <div className="relative mt-1.5">
                <Mail
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A857B]"
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex.morgan@fitzone.com"
                  className="w-full border border-[#D5C9B7] bg-white py-2.5 pl-10 pr-4 text-xs text-[#191916] placeholder-[#A49E93] transition-colors focus:border-[#505A3B] focus:outline-none focus:ring-1 focus:ring-[#505A3B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#3D3B35]">
                Phone Number (Optional)
              </label>
              <div className="relative mt-1.5">
                <Phone
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A857B]"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full border border-[#D5C9B7] bg-white py-2.5 pl-10 pr-4 text-xs text-[#191916] placeholder-[#A49E93] transition-colors focus:border-[#505A3B] focus:outline-none focus:ring-1 focus:ring-[#505A3B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#3D3B35]">
                Password * (min 6 characters)
              </label>
              <div className="relative mt-1.5">
                <Lock
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A857B]"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border border-[#D5C9B7] bg-white py-2.5 pl-10 pr-10 text-xs text-[#191916] placeholder-[#A49E93] transition-colors focus:border-[#505A3B] focus:outline-none focus:ring-1 focus:ring-[#505A3B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A857B] hover:text-[#191916]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#3D3B35]">
                Confirm Password *
              </label>
              <div className="relative mt-1.5">
                <Lock
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A857B]"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border border-[#D5C9B7] bg-white py-2.5 pl-10 pr-4 text-xs text-[#191916] placeholder-[#A49E93] transition-colors focus:border-[#505A3B] focus:outline-none focus:ring-1 focus:ring-[#505A3B]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 bg-[#505A3B] py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#3E472E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 border-t border-[#E3DACB] pt-4 text-center">
            <p className="text-xs text-[#6F6B61]">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-[#505A3B] hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

