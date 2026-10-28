import { Link } from 'react-router-dom'
import {
    ArrowRight,
    Phone,
    MapPin,
    Mail,
    Clock,
    Instagram,
    Facebook,
    Youtube,
    Linkedin,
} from 'lucide-react'

const quickLinks = [
    ['Home', '/'],
    ['About Us', '/about'],
    ['Gym Programs', '/programs'],
    ['Personal Trainers', '/#coaches'],
    ['Workout Squads', '/#teams'],
    ['Gym Gallery', '/#gallery'],
    ['Claim Free Pass', '/free-pass'],
    ['Contact & Location', '/contact'],
]

const programs = [
    'Strength & Conditioning',
    'Hypertrophy & Muscle Gain',
    'HIIT & Calorie Torch',
    'Powerlifting & Heavy Lifts',
    'Personal 1-on-1 Training',
    'Functional Mobility & Core',
    'Fat Loss Transformations',
    'Nutrition & Meal Protocols',
]

const socialLinks = [
    { label: 'Instagram', Icon: Instagram, href: '#' },
    { label: 'Facebook', Icon: Facebook, href: '#' },
    { label: 'YouTube', Icon: Youtube, href: '#' },
    { label: 'LinkedIn', Icon: Linkedin, href: '#' },
]

function SectionLabel({ children }) {
    return (
        <div className="mb-5 flex items-center gap-3">
            <h3 className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D8D2C2]">
                {children}
            </h3>
            <span className="h-px w-7 bg-[#777B60]" />
        </div>
    )
}

export default function Footer() {
    return (
        <footer
            id="contact"
            className="relative overflow-hidden bg-[#1B1C16] text-[#D8D5CB]"
        >
            {/* Subtle olive lighting */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_40%,rgba(89,98,63,0.13),transparent_45%)]"
            />

            <div className="relative mx-auto max-w-[1600px] px-6 pb-8 pt-12 sm:px-10 sm:pt-16 lg:px-[4.5%] lg:pt-[72px]">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.9fr_1.1fr_1.2fr] lg:gap-8">
                    {/* Brand */}
                    <div className="lg:pr-5">
                        <Link
                            to="/"
                            aria-label="FitZone home"
                            className="inline-flex flex-col"
                        >
                            <span className="font-logo text-[42px] italic leading-none text-[#F0E9DB] sm:text-[46px]">
                                FitZone
                            </span>
                            <span className="mt-2 pl-1 text-[8px] uppercase tracking-[0.3em] text-[#AAA995]">
                                Gym & Performance Club
                            </span>
                        </Link>

                        <p className="mt-6 max-w-[320px] text-[12px] leading-[1.85] text-[#C1BFB4]">
                            Empowering individuals through progressive strength training,
                            dedicated coaching, and a culture of relentless grit. We provide
                            world-class gym equipment and guidance to help you sculpt your peak physique.
                        </p>

                        <div className="mt-6 flex gap-2.5">
                            {socialLinks.map(({ label, Icon, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#777B60]/35 text-[#F1EBDD] transition-colors hover:bg-[#777B60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B0B69A]"
                                >
                                    <Icon size={16} strokeWidth={1.8} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="border-t border-white/10 pt-7 sm:border-t-0 sm:pt-0 lg:border-l lg:border-white/15 lg:pl-6">
                        <SectionLabel>Quick Links</SectionLabel>

                        <ul className="space-y-2">
                            {quickLinks.map(([label, href]) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="text-[12px] text-[#C8C5BA] transition-colors hover:text-[#A6AE88]"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programs */}
                    <div className="border-t border-white/10 pt-7 sm:border-t-0 sm:pt-0">
                        <SectionLabel>Training Programs</SectionLabel>

                        <ul className="space-y-2.5">
                            {programs.map((program) => (
                                <li key={program}>
                                    <a
                                        href="#programs"
                                        className="text-[12px] text-[#C8C5BA] transition-colors hover:text-[#A6AE88]"
                                    >
                                        {program}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact information */}
                    <div className="border-t border-white/10 pt-7 sm:border-t-0 sm:pt-0 lg:border-l lg:border-white/15 lg:pl-6">
                        <SectionLabel>Contact Us</SectionLabel>

                        <div className="space-y-5">
                            <div className="flex gap-3">
                                <MapPin
                                    size={19}
                                    className="mt-0.5 shrink-0 text-[#B8B99C]"
                                    strokeWidth={1.5}
                                />
                                <p className="text-[12px] leading-[1.8] text-[#C8C5BA]">
                                    123 Fitness Boulevard,
                                    <br />
                                    Gym District, Bangalore 560001,
                                    <br />
                                    India
                                </p>
                            </div>

                            <a
                                href="tel:+919876543210"
                                className="flex items-center gap-3 text-[12px] text-[#C8C5BA] transition-colors hover:text-[#A6AE88]"
                            >
                                <Phone size={18} className="shrink-0 text-[#B8B99C]" />
                                +91 98765 43210
                            </a>

                            <a
                                href="mailto:info@fitzone.com"
                                className="flex items-center gap-3 break-all text-[12px] text-[#C8C5BA] transition-colors hover:text-[#A6AE88]"
                            >
                                <Mail size={18} className="shrink-0 text-[#B8B99C]" />
                                info@fitzone.com
                            </a>

                            <div className="flex gap-3">
                                <Clock
                                    size={18}
                                    className="mt-0.5 shrink-0 text-[#B8B99C]"
                                />
                                <p className="text-[12px] leading-[1.8] text-[#C8C5BA]">
                                    Mon – Sat: 5:30 AM – 10:30 PM
                                    <br />
                                    Sunday: 7:00 AM – 6:00 PM
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="border-t border-white/10 pt-7 sm:col-span-2 sm:border-t-0 sm:pt-0 lg:border-l lg:border-white/15 lg:pl-6">
                        <SectionLabel>Stay Connected</SectionLabel>

                        <p className="mb-5 max-w-[310px] text-[12px] leading-[1.8] text-[#C8C5BA]">
                            Subscribe to receive weekly workout splits, nutrition tips,
                            and gym membership updates.
                        </p>

                        <form
                            onSubmit={(event) => {
                                event.preventDefault()
                            }}
                            className="flex max-w-[400px] border border-[#777B60]/70 focus-within:border-[#A6AE88]"
                        >
                            <input
                                type="email"
                                required
                                aria-label="Your email address"
                                placeholder="Your email address"
                                className="min-w-0 flex-1 bg-transparent px-3.5 py-3 text-[11px] text-white outline-none placeholder:text-[#969589]"
                            />

                            <button
                                type="submit"
                                aria-label="Subscribe"
                                className="flex w-12 shrink-0 items-center justify-center bg-[#626B48] text-white transition-colors hover:bg-[#7A845B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B0B69A]"
                            >
                                <ArrowRight size={18} />
                            </button>
                        </form>

                        <p className="mt-3 text-[10px] leading-relaxed text-[#918F82]">
                            Stay informed. No spam, just gym & fitness updates.
                        </p>
                    </div>
                </div>

                {/* Copyright and legal links */}
                <div className="mt-12 flex flex-col gap-5 border-t border-[#777B60]/40 pt-6 sm:mt-14 lg:mt-12 lg:flex-row lg:items-center lg:justify-between">
                    <p className="text-[11px] text-[#BDBAAF]">
                        © {new Date().getFullYear()} FitZone. All rights reserved.
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-[#BDBAAF] sm:gap-x-6">
                        <a href="/privacy-policy" className="transition-colors hover:text-white">
                            Privacy Policy
                        </a>
                        <span className="hidden text-[#777B60] sm:inline">|</span>
                        <a href="/terms" className="transition-colors hover:text-white">
                            Terms & Conditions
                        </a>
                        <span className="hidden text-[#777B60] sm:inline">|</span>
                        <a href="/cookies" className="transition-colors hover:text-white">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
