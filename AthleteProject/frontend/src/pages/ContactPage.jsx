import { useState } from 'react'
import { Check } from 'lucide-react'
import { contactData } from '../data/contactData'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiry: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#EDE4D7] pb-24 pt-24 text-[#191916] sm:pb-32 sm:pt-28 lg:pb-40 lg:pt-36">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-14">
        {/* ── Main Heading in Website Green Tone ──────────────────────── */}
        <div className="border-b border-[#D5C9B7] pb-8 sm:pb-12">
          <h1 className="font-sans text-[clamp(3.6rem,11.5vw,9.8rem)] font-black tracking-[-0.035em] leading-[0.88] text-[#505A3B]">
            {contactData.headline}
          </h1>
        </div>

        {/* ── Two Column Content & Form Section ──────────────────────── */}
        <div className="mt-12 grid grid-cols-1 gap-12 sm:mt-16 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Location & Gym Timings */}
          <div className="space-y-10 lg:col-span-5">
            <div>
              <p className="text-[15px] font-bold tracking-tight text-[#191916]">
                {contactData.location.city}
              </p>
              <p className="mt-1 text-[13px] text-[#514D43]">
                {contactData.location.address}
              </p>
            </div>

            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#505A3B]">
                {contactData.timings.label}
              </p>
              <div className="mt-3 space-y-2 text-[14px]">
                <p className="text-[#514D43]">
                  {contactData.timings.weekday}:{' '}
                  <span className="font-semibold text-[#191916]">
                    {contactData.timings.weekdayHours}
                  </span>
                </p>
                <p className="text-[#514D43]">
                  {contactData.timings.weekend}:{' '}
                  <span className="font-semibold text-[#191916]">
                    {contactData.timings.weekendHours}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Underline Form (Name, Mail, Inquiry) */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="rounded-lg border border-[#8A8B70]/40 bg-[#E3DACB]/50 p-8 text-[#191916]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#505A3B] text-white">
                  <Check size={22} strokeWidth={2.5} />
                </div>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-[#191916]">
                  Inquiry Received!
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#514D43]">
                  Thank you, <span className="font-semibold text-[#191916]">{formData.name}</span>. Our team will review your inquiry and get back to you at{' '}
                  <span className="font-semibold text-[#191916]">{formData.email}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', email: '', inquiry: '' })
                  }}
                  className="mt-6 rounded-full bg-[#505A3B] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#3E472E]"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#191916]">
                    Name <span className="font-normal text-[#514D43]">(required)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="mt-2 w-full border-b border-[#191916]/30 bg-transparent py-2.5 text-[15px] text-[#191916] transition-colors placeholder:text-[#A49E8D] focus:border-[#505A3B] focus:outline-none"
                  />
                </div>

                {/* Mail */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#191916]">
                    Mail <span className="font-normal text-[#514D43]">(required)</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your email address"
                    className="mt-2 w-full border-b border-[#191916]/30 bg-transparent py-2.5 text-[15px] text-[#191916] transition-colors placeholder:text-[#A49E8D] focus:border-[#505A3B] focus:outline-none"
                  />
                </div>

                {/* Inquiry */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#191916]">
                    Inquiry
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.inquiry}
                    onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                    placeholder="Write your inquiry here..."
                    className="mt-2 w-full resize-y border-b border-[#191916]/30 bg-transparent py-2.5 text-[15px] text-[#191916] transition-colors placeholder:text-[#A49E8D] focus:border-[#505A3B] focus:outline-none min-h-[80px]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="rounded-full bg-[#505A3B] px-8 py-3 text-[13px] font-semibold tracking-wide text-white transition-all hover:bg-[#3E472E] active:scale-[0.98] shadow-sm hover:shadow"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
