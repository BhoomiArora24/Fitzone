import { motion, useReducedMotion } from "framer-motion";

export default function CoachesHeading() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10 mx-auto mb-10 w-full max-w-4xl px-5 text-center sm:mb-14"
        >

            <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-6xl md:text-7xl">
                Meet Our
                <span className="text-stone-400"> Trainers.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-stone-600 sm:text-base">
                Real transformations happen with elite guidance. Meet our certified
                trainers who specialize in strength, hypertrophy, fat loss, and
                personalized performance coaching.
            </p>
        </motion.div>
    );
}
