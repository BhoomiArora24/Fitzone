import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CoachCard from "./CoachCard";
import CoachesHeading from "./CoachesHeading";
import useCenteredCarousel from "../../../hooks/useCenteredCarousel";
import { coaches as initialCoaches, INITIAL_CENTER_INDEX } from "../../../data/coaches";
import { trainerApi } from "../../../api/trainerApi";

export default function CoachesSection() {
    const [coachList, setCoachList] = useState(initialCoaches);

    const initialCenter = Math.min(
        INITIAL_CENTER_INDEX,
        Math.max(0, coachList.length - 1)
    );

    const { viewportRef, trackRef, x, bounds, activeIndex, setCardRef } =
        useCenteredCarousel(initialCenter, coachList.length);

    useEffect(() => {
        let isMounted = true;

        const fetchTrainers = async () => {
            try {
                const res = await trainerApi.getAll();
                if (!isMounted) return;

                const trainers = res?.data || (Array.isArray(res) ? res : []);
                if (Array.isArray(trainers) && trainers.length > 0) {
                    const formatted = trainers.map((t) => ({
                        id: t._id || t.id,
                        name: t.name,
                        role: t.role || "Fitness Coach",
                        specialty: t.specialty || "General Fitness",
                        experience: t.experience || "3+ Years Experience",
                        image:
                            t.image ||
                            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
                    }));
                    setCoachList(formatted);
                }
            } catch (error) {
                console.warn(
                    "[FitZone] Unable to fetch trainers from API, displaying default roster:",
                    error.message
                );
            }
        };

        fetchTrainers();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section id="coaches" className="relative overflow-x-clip bg-cream text-stone-900">
            <div className="flex min-h-screen flex-col justify-center overflow-hidden py-16 sm:py-20">
                {/* Decorative background details */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 top-36 h-48 w-48 rounded-full bg-amber-200/20 blur-3xl"
                />
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
                        {coachList.map((coach, index) => (
                            <CoachCard
                                key={coach.id || `${coach.name}-${index}`}
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
