import { motion } from "framer-motion";
import CoachCard from "./CoachCard";
import CoachesHeading from "./CoachesHeading";
import useCenteredCarousel from "../../../hooks/useCenteredCarousel";
import { coaches, INITIAL_CENTER_INDEX } from "../../../data/coaches";

export default function CoachesSection() {
    const { viewportRef, trackRef, x, bounds, activeIndex, setCardRef } =
        useCenteredCarousel(INITIAL_CENTER_INDEX);

    return (
        <section id="coaches" className="relative overflow-x-clip bg-cream text-stone-900">
            <div className="flex min-h-screen flex-col justify-center overflow-hidden py-16 sm:py-20">
                {/* Decorative background details */}
                <div aria-hidden="true"
                    className="pointer-events-none absolute -right-16 top-36 h-48 w-48 rounded-full bg-amber-200/20 blur-3xl" />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 top-36 h-48 w-48 rounded-full bg-amber-200/20 blur-3xl"
                />

                <CoachesHeading />

                {/* Horizontal coach cards */}
                <div
                    ref={viewportRef}
                    className="relative z-10 w-full overflow-hidden"
                >
                    <motion.div
                        ref={trackRef}
                        drag="x"
                        style={{ x }}
                        dragConstraints={bounds}
                        dragDirectionLock
                        dragElastic={0.05}
                        dragMomentum={false}
                        whileTap={{ cursor: "grabbing" }}
                        className="relative flex w-max cursor-grab touch-pan-y items-end gap-4 sm:gap-5"
                    >
                        {coaches.map((coach, index) => (
                            <CoachCard
                                key={`${coach.name}-${index}`}
                                coach={coach}
                                index={index}
                                isActive={index === activeIndex}
                                cardRef={setCardRef(index)}
                            />
                        ))}
                    </motion.div>
                </div>


            </div>
        </section>
    );
}