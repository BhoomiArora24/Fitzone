import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export default function CoachCard({ coach, index, isActive, cardRef }) {
    return (
        <motion.article
            ref={cardRef}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -8 }}
            /* Width is constant so neighbours never shift while a card grows.
               Only the height animates, via a CSS transition on height alone
               (so it doesn't fight Framer's transform animations). */
            className={`group relative w-[236px] shrink-0 overflow-hidden rounded-2xl
  bg-stone-200 shadow-sm transition-[height] duration-500 ease-out
  sm:w-[clamp(180px,17vw,270px)]
  ${isActive
                    ? "h-[390px] sm:h-[450px]"
                    : "h-[340px] sm:h-[390px]"
                }`}
        >
            <img
                src={coach.image}
                alt={coach.name}
                loading="lazy"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover
          grayscale-[35%] transition-all duration-700
          group-hover:scale-105 group-hover:grayscale-0"
            />

            <div
                className="absolute inset-0 bg-gradient-to-t
          from-black/90 via-black/10 to-transparent"
            />

            {isActive && (
                <span
                    className="absolute left-4 top-4 rounded-full
            border border-white/30 bg-white/15 px-3 py-1.5
            text-[10px] font-medium uppercase tracking-[0.18em]
            text-white backdrop-blur-md"
                >
                    {coach.role}
                </span>
            )}

            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/70">
                    {coach.specialty}
                </p>

                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {coach.name}
                </h3>

                <p className="mt-1 text-sm text-white/75">{coach.role}</p>

                <div className="mt-4 flex items-center justify-between border-t border-white/25 pt-3">
                    <span className="text-[10px] text-white/70">
                        {coach.experience}
                    </span>
                    <ArrowDownRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                    />
                </div>
            </div>
        </motion.article>
    );
}