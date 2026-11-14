import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Dumbbell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const from = location.state?.from?.pathname || '/'

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError('Please provide both email and password.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      await login(formData.email, formData.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please check your details.')
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
                Member Access
              </span>
              <span className="h-px w-8 bg-[#A49A83]" />
            </div>

            <h1 className="font-display text-3xl font-bold uppercase tracking-[0.03em] text-[#191916]">
              Sign In To <span className="text-[#505A3B]">FitZone</span>
            </h1>
            <p className="mt-2 text-xs text-[#6F6B61]">
              Enter your credentials to access your workout squads &amp; training profile.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-3.5 text-xs text-red-800">
              <p className="font-semibold">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#3D3B35]">
                Email Address
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
                  placeholder="name@fitzone.com"
                  className="w-full border border-[#D5C9B7] bg-white py-2.5 pl-10 pr-4 text-xs text-[#191916] placeholder-[#A49E93] transition-colors focus:border-[#505A3B] focus:outline-none focus:ring-1 focus:ring-[#505A3B]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#3D3B35]">
                  Password
                </label>
                <Link
                  to="/contact"
                  className="text-[10px] text-[#626A48] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 bg-[#505A3B] py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#3E472E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-8 border-t border-[#E3DACB] pt-4 text-center">
            <p className="text-xs text-[#6F6B61]">
              Don&apos;t have a FitZone account?{' '}
              <Link
                to="/register"
                className="font-bold text-[#505A3B] hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

