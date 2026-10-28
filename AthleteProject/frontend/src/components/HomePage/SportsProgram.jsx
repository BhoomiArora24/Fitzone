import { useRef } from "react";

const programs = [
    {
        id: "01",
        name: "STRENGTH & POWER",
        image:
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=85",
        description:
            "Build raw strength, dense muscle, and peak lifting performance with compound barbell movements.",
        levels: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
        ages: ["BARBELL", "HYPERTROPHY", "DEADLIFTS"],
    },
    {
        id: "02",
        name: "HIIT & METCON",
        image:
            "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=85",
        description:
            "Torch maximum calories, build cardiovascular endurance and increase athletic conditioning.",
        levels: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
        ages: ["FAT LOSS", "INTERVALS", "SPRINTS"],
    },
    {
        id: "03",
        name: "FUNCTIONAL & MOBILITY",
        image:
            "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=85",
        description:
            "Improve joint health, core stabilization and full-body movement mechanics to bulletproof against injury.",
        levels: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
        ages: ["KETTLEBELLS", "MOBILITY", "CORE"],
    },
    {
        id: "04",
        name: "POWERLIFTING & HYPERTROPHY",
        image:
            "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=85",
        description:
            "Master the big compound lifts with structured progressive overload and expert biomechanical coaching.",
        levels: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
        ages: ["SQUAT", "BENCH", "DEADLIFT"],
    },
];

function ArrowRight({ className = "" }) {
    return (
        <svg
            className={className}
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

function ProgramCard({ program }) {
    return (
        <article className="group flex h-full min-w-0 flex-col overflow-hidden border border-[#d8d1bf]/70 bg-[#eee8db] text-[#29291f]">
            {/* Image */}
            <div className="relative aspect-[1.48/1] overflow-hidden bg-[#34352a]">
                <img
                    src={program.image}
                    alt={`${program.name} training`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Cinematic image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15" />

                <span className="absolute left-2 top-2 font-mono text-[9px] tracking-wider text-[#eee8db]/80">
                    {program.id}
                </span>
            </div>

            {/* Card content */}
            <div className="flex flex-1 flex-col px-2.5 pb-2 pt-2 sm:px-3">
                <h3 className="font-['Barlow_Condensed',sans-serif] text-[17px] font-extrabold leading-none tracking-tight sm:text-[19px]">
                    {program.name}
                </h3>

                <p className="mt-1.5 min-h-[43px] text-[10px] leading-[1.45] text-[#626052] sm:text-[11px]">
                    {program.description}
                </p>

                {/* Skill levels */}
                <div className="mt-2 flex flex-wrap gap-1">
                    {program.levels.map((level) => (
                        <span
                            key={level}
                            className="border border-[#d4cdbd] bg-[#e6dfd0] px-1.5 py-1 text-[7px] font-medium leading-none tracking-wide text-[#65634f] sm:text-[8px]"
                        >
                            {level}
                        </span>
                    ))}
                </div>

                {/* Focus areas */}
                <div className="mt-2.5 flex items-start gap-1 border-b border-[#d8d0bf] pb-2.5">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="mt-px shrink-0"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="8" r="3.5" />
                        <path d="M5 20v-2a7 7 0 0 1 14 0v2Z" />
                    </svg>

                    <div className="min-w-0">
                        <span className="text-[9px] font-medium">Workout Focus:</span>
                        <span className="ml-1 text-[9px] text-[#626052]">
                            {program.ages.join("  ")}
                        </span>
                    </div>
                </div>

                {/* Details link */}
                <a
                    href={`/programs/${program.name.toLowerCase().replaceAll(' ', '-')}`}
                    className="mt-auto flex min-h-[29px] items-center justify-between gap-1 pt-2 text-[8px] font-semibold tracking-[0.04em] transition-colors hover:text-[#737957] sm:text-[9px]"
                >
                    <span>VIEW WORKOUT DETAILS</span>
                    <ArrowRight className="h-3 w-3 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
            </div>
        </article>
    );
}

export default function SportsPrograms() {
    const sliderRef = useRef(null);

    const scrollPrograms = (direction) => {
        if (!sliderRef.current) return;

        const card = sliderRef.current.querySelector("article");
        const distance = card ? card.getBoundingClientRect().width + 8 : 300;

        sliderRef.current.scrollBy({
            left: direction * distance,
            behavior: "smooth",
        });
    };

    return (

        <section
            id="programs"
            className="relative isolate w-full min-w-0 max-w-full overflow-x-clip bg-[#222419] px-4 py-8 text-[#eee8db] sm:px-7 sm:py-9 lg:px-7 lg:py-9"
        >

            {/* Subtle olive background texture */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(117,117,73,0.12),transparent_55%)]" />

            <div className="relative mx-auto w-full min-w-0 max-w-[1440px]">
                {/* Section heading */}
                <div className="mb-6 grid grid-cols-1 items-end gap-4 sm:grid-cols-[1fr_auto] lg:mb-7 lg:grid-cols-[1.1fr_0.55fr_auto] lg:items-center lg:gap-8">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-[#85866a]">
                                Gym Programs
                            </span>
                            <span className="h-px w-10 bg-[#62674b]" />
                        </div>

                        <h2 className="font-['Barlow_Condensed',sans-serif] text-[clamp(32px,4.3vw,54px)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em]">
                            Gym{" "}
                            <span className="text-[#777961]">&amp; Programs</span>
                        </h2>
                    </div>

                    <p className="max-w-[280px] text-[10px] leading-[1.6] text-[#c0bcaa] sm:justify-self-end lg:justify-self-start">
                        Structured training programs designed to build strength, burn fat
                        and elevate your physical performance.
                    </p>

                    <a
                        href="/programs"
                        className="hidden min-h-8 items-center justify-center gap-3 border border-[#575747] px-3 text-[8px] font-medium uppercase tracking-wider transition-colors hover:border-[#aaa98a] hover:bg-white/5 sm:inline-flex lg:justify-self-end"
                    >
                        Explore All Workouts
                        <ArrowRight className="h-3 w-3" />
                    </a>
                </div>

                {/* Programs carousel */}
                <div className="relative min-w-0 max-w-full">
                    <div
                        ref={sliderRef}
                        className="grid w-full min-w-0 max-w-full grid-flow-col auto-cols-[85%] gap-2 overflow-x-auto overscroll-x-contain scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:auto-cols-[48%] lg:auto-cols-[calc((100%-24px)/4)]"
                    >
                        {programs.map((program) => (
                            <ProgramCard key={program.id} program={program} />
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => scrollPrograms(1)}
                        aria-label="Next gym programs"
                        className="absolute right-1 top-[42%] z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#777864] bg-[#292b20] text-[#e7e2d4] transition-colors hover:bg-[#62674b]"
                    >
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>

                {/* Mobile explore link */}
                <a
                    href="/programs"
                    className="mt-4 inline-flex items-center gap-2 border border-[#575747] px-3 py-2 text-[9px] uppercase tracking-wider sm:hidden"
                >
                    Explore All Workouts
                    <ArrowRight className="h-3 w-3" />
                </a>
            </div>
        </section>
    );
}
