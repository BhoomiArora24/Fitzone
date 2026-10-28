import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  Bookmark,
  QrCode,
  Download,
  X,
  Check,
  Sparkles,
} from 'lucide-react'
import { freePassData } from '../data/freePassData'

export default function FreePassPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [claimed, setClaimed] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const handleClaim = (e) => {
    e.preventDefault()
    setClaimed(true)
  }

  const handleDownload = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-[#EDE4D7] pb-20 pt-20 text-[#191916] sm:pb-28 sm:pt-24 lg:pb-32 lg:pt-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        {/* ── Top Header Strip ───────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-[#D5C9B7] pb-5">
          <Link to="/" className="inline-flex flex-col leading-none" aria-label="FitZone home">
            <span className="font-logo text-[30px] italic leading-none text-[#191916] sm:text-[34px]">
              {freePassData.brand.name}
            </span>
            <span className="mt-1 text-[8px] uppercase tracking-[0.26em] text-[#747167]">
              {freePassData.brand.tagline}
            </span>
          </Link>

          {/* User specifically instructed: "remove the tag complementary pass" */}
          {/* Tag omitted per instruction */}
        </div>

        {/* ── Main Two Column Layout ─────────────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 items-center gap-10 sm:mt-14 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Heading, Description, Checklist */}
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#626A48] sm:text-[12px]">
              {freePassData.eyebrow}
            </span>

            <h1 className="mt-3 font-sans text-[clamp(2.6rem,5.6vw,4.6rem)] font-black uppercase leading-[0.98] tracking-tight">
              <span className="block text-[#191916]">
                {freePassData.headline.line1}
              </span>
              <span className="block text-[#505A3B]">
                {freePassData.headline.line2}
              </span>
            </h1>

            <p className="mt-5 max-w-[490px] text-[15px] leading-relaxed text-[#514D43] sm:text-[17px]">
              {freePassData.description}
            </p>

            {/* Checklist */}
            <div className="mt-8 space-y-3.5">
              {freePassData.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-[#505A3B]"
                    strokeWidth={2.2}
                  />
                  <span className="text-[15px] font-medium text-[#191916] sm:text-[16px]">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Ticket Pass Card */}
          <div className="lg:col-span-5">
            <div className="mx-auto w-full max-w-[430px] rounded-2xl bg-[#23291B] p-5 shadow-2xl sm:p-7">
              {/* Top Bar inside Dark Card */}
              <div className="flex items-center justify-between text-[#A4A790]">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {freePassData.ticket.perkHeader}
                </span>
                <Bookmark size={20} className="text-[#C5C8B4]" />
              </div>

              {/* Inner Cream Ticket */}
              <div className="mt-4 rounded-xl bg-[#F4EFE6] p-6 text-[#191916] shadow-sm sm:p-7">
                <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#747167]">
                  {freePassData.ticket.exclusiveTag}
                </span>

                <h3 className="mt-1 font-sans text-[34px] font-black leading-none tracking-tight text-[#191916] sm:text-[38px]">
                  {freePassData.ticket.title}
                </h3>

                <h4 className="mt-1 font-sans text-[20px] font-black uppercase tracking-wide text-[#505A3B] sm:text-[22px]">
                  {freePassData.ticket.passType}
                </h4>

                <div className="my-4 h-px w-full bg-[#D5C9B7]" />

                <div className="space-y-1.5 text-[12px] font-bold uppercase tracking-wide text-[#514D43] sm:text-[13px]">
                  {freePassData.ticket.items.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>

                <div className="mt-6 flex items-end justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#747167] sm:text-[11px]">
                    {freePassData.brand.club}
                  </span>

                  <div className="rounded border border-[#D5C9B7] bg-white p-1 text-[#191916] shadow-inner">
                    <QrCode size={36} strokeWidth={1.8} />
                  </div>
                </div>
              </div>

              {/* Motto Footer inside Dark Card */}
              <p className="mt-4 text-center text-[12px] font-bold uppercase tracking-[0.22em] text-[#C5C8B4]">
                {freePassData.ticket.motto}
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom CTA Section ─────────────────────────────────────── */}
        <div className="mt-10 sm:mt-12">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#4B5536] px-6 py-4 text-center text-[14px] font-black uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#3B432B] hover:shadow-lg active:scale-[0.99] sm:py-5 sm:text-[16px]"
          >
            <Download
              size={20}
              strokeWidth={2.4}
              className="transition-transform group-hover:translate-y-0.5"
            />
            {freePassData.cta.buttonText}
          </button>

          <p className="mt-3 text-center text-[12px] text-[#747167] sm:text-[13px]">
            {freePassData.cta.finePrint}
          </p>
        </div>
      </div>

      {/* ── Interactive Claim Modal ─────────────────────────────────── */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-[#D5C9B7] bg-[#EDE4D7] p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => {
                setModalOpen(false)
                setClaimed(false)
              }}
              className="absolute right-4 top-4 rounded-full p-1.5 text-[#514D43] transition-colors hover:bg-black/10 hover:text-[#191916]"
            >
              <X size={20} />
            </button>

            {claimed ? (
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#505A3B] text-white">
                  <Check size={28} strokeWidth={2.5} />
                </div>
                <h3 className="mt-4 font-sans text-2xl font-black uppercase text-[#191916]">
                  Your Pass Is Ready!
                </h3>
                <p className="mt-2 text-sm text-[#514D43]">
                  A confirmation has been sent to{' '}
                  <span className="font-semibold text-[#191916]">{formData.email}</span>.
                  Present this digital pass at the front desk when you arrive.
                </p>

                {/* Digital Ticket Preview */}
                <div className="mt-6 rounded-xl border border-[#D5C9B7] bg-[#F4EFE6] p-5 text-left text-[#191916]">
                  <div className="flex items-center justify-between text-xs text-[#747167]">
                    <span className="font-bold uppercase tracking-wider">Pass Code</span>
                    <span className="font-mono font-bold text-[#505A3B]">FZ-PASS-2026</span>
                  </div>
                  <p className="mt-2 font-sans text-xl font-black text-[#191916]">
                    {formData.name || 'FitZone Guest'}
                  </p>
                  <p className="text-xs text-[#514D43]">1x Complimentary Personal Training Session</p>
                  <div className="mt-4 flex items-center justify-between border-t border-[#D5C9B7] pt-3 text-[11px] text-[#747167]">
                    <span>Valid at Manhattan, New York</span>
                    <span className="font-semibold text-[#505A3B]">No Expiration</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#505A3B] py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#3E472E]"
                  >
                    <Download size={16} /> Print / Save Pass
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setModalOpen(false)
                      setClaimed(false)
                    }}
                    className="rounded-xl border border-[#191916]/30 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#191916] transition-colors hover:bg-black/5"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#505A3B]">
                  <Sparkles size={16} />
                  <span>Exclusive Member Pass</span>
                </div>
                <h3 className="font-sans text-2xl font-black uppercase text-[#191916] sm:text-3xl">
                  Claim Your Free Pass
                </h3>
                <p className="mt-1 text-sm text-[#514D43]">
                  Enter your details to generate your complimentary 1-on-1 session voucher.
                </p>

                <form onSubmit={handleClaim} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#191916]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="mt-1.5 w-full border-b border-[#191916]/30 bg-transparent py-2 text-sm text-[#191916] placeholder:text-[#A49E8D] focus:border-[#505A3B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#191916]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@example.com"
                      className="mt-1.5 w-full border-b border-[#191916]/30 bg-transparent py-2 text-sm text-[#191916] placeholder:text-[#A49E8D] focus:border-[#505A3B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#191916]">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +1 (555) 000-1234"
                      className="mt-1.5 w-full border-b border-[#191916]/30 bg-transparent py-2 text-sm text-[#191916] placeholder:text-[#A49E8D] focus:border-[#505A3B] focus:outline-none"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-[#505A3B] py-3.5 text-xs font-black uppercase tracking-wider text-white shadow transition-all hover:bg-[#3E472E]"
                    >
                      Generate Free Pass Now
                    </button>
                    <p className="mt-2 text-center text-[11px] text-[#747167]">
                      No credit card required. 100% free workout pass.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
