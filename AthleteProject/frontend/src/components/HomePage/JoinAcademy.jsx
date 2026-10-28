import { ArrowRight, UserRound, LayoutGrid, Phone } from 'lucide-react'

export default function JoinAcademy() {
    return (
        <section
            id="join"
            className="relative isolate overflow-hidden bg-[#EDE4D7] text-[#191916]"
        >
            {/* Background photograph */}
            <img
                src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=2200&q=90"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
            />

            {/* Cream overlay matching the academy hero */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(237,228,215,0.99)_0%,rgba(237,228,215,0.96)_30%,rgba(237,228,215,0.83)_48%,rgba(237,228,215,0.20)_78%,rgba(237,228,215,0.08)_100%)]"
            />

            <div className="mx-auto flex min-h-[440px] max-w-[1600px] items-center px-6 py-16 sm:px-10 sm:py-20 lg:min-h-[520px] lg:px-[4.5%] lg:py-24">
                <div className="max-w-[900px]">
                    <div className="mb-5 flex items-center gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#505A3B] sm:text-[11px]">
                            Join the Club
                        </span>
                        <span className="h-px w-14 bg-[#96937D]" />
                    </div>

                    <h2 className="mb-8 max-w-[850px] font-display text-[clamp(2.8rem,6.2vw,6rem)] font-bold uppercase leading-[0.98] tracking-[-0.025em] text-[#191916] sm:leading-[1.02]">
                        Your Ultimate
                        <span className="block text-[#505A3B]">
                            Transformation
                        </span>
                        <span className="block">Starts Today.</span>
                    </h2>

                    <p className="mb-8 max-w-[440px] text-[13px] leading-[1.8] text-[#514D43] sm:text-[15px]">
                        Step into a community that lifts with intensity, trains with
                        discipline, and sculpts stronger, leaner, and more confident
                        bodies.
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <a
                            href="/register"
                            className="group inline-flex min-h-[50px] items-center justify-between gap-5 bg-[#505A3B] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.07em] text-white transition-colors duration-300 hover:bg-[#3E472E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#505A3B]"
                        >
                            <UserRound size={17} strokeWidth={1.7} />
                            Claim Membership
                            <ArrowRight
                                size={16}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </a>

                        <a
                            href="#programs"
                            className="group inline-flex min-h-[50px] items-center justify-between gap-4 border border-[#96917F] bg-[#F2EBDD]/60 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.06em] text-[#25251E] transition-colors hover:border-[#505A3B] hover:bg-[#505A3B] hover:text-white"
                        >
                            <LayoutGrid size={17} strokeWidth={1.7} />
                            Explore Workouts
                            <ArrowRight
                                size={16}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </a>

                        <a
                            href="#contact"
                            className="group inline-flex min-h-[50px] items-center justify-between gap-4 border border-[#96917F] bg-[#F2EBDD]/60 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.06em] text-[#25251E] transition-colors hover:border-[#505A3B] hover:bg-[#505A3B] hover:text-white"
                        >
                            <Phone size={16} strokeWidth={1.7} />
                            Contact Gym
                            <ArrowRight
                                size={16}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
