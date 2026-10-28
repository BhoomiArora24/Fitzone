import { motion, useReducedMotion } from "framer-motion";

const galleryRowOne = [
    {
        src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
        alt: "Athlete performing heavy deadlifts in the gym",
    },
    {
        src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
        alt: "Member training with dumbbells in front of gym mirror",
    },
    {
        src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
        alt: "Female athlete doing bicep dumbbell workout",
    },
    {
        src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
        alt: "Heavy barbell power lifting and deadlift workout",
    },
    {
        src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
        alt: "Gym training near commercial dumbbell weight racks",
    },
];

const galleryRowTwo = [
    {
        src: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=800&q=80",
        alt: "Intense battle rope conditioning workout in gym",
    },
    {
        src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80",
        alt: "Athlete performing back squats with barbell in gym rack",
    },
    {
        src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80",
        alt: "Bodybuilder performing heavy bicep dumbbell curls",
    },
    {
        src: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80",
        alt: "Gym member performing pull-ups on functional rig",
    },
    {
        src: "https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?auto=format&fit=crop&w=800&q=80",
        alt: "Single arm dumbbell bent over row strength workout",
    },
];

function GalleryRow({ images, direction = "left", reducedMotion }) {
    const repeatedImages = [...images, ...images];

    return (
        <div className="overflow-hidden">
            <motion.div
                className="flex w-max gap-4 sm:gap-5"
                animate={
                    reducedMotion
                        ? undefined
                        : {
                            x:
                                direction === "left"
                                    ? ["0%", "-50%"]
                                    : ["-50%", "0%"],
                        }
                }
                transition={
                    reducedMotion
                        ? undefined
                        : {
                            duration: 35,
                            ease: "linear",
                            repeat: Infinity,
                        }
                }
            >
                {repeatedImages.map((image, index) => (
                    <div
                        key={`${image.alt}-${index}`}
                        className="group relative h-[190px] w-[260px] shrink-0 overflow-hidden rounded-2xl bg-stone-200 sm:h-[250px] sm:w-[360px]"
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            loading={index < 3 ? "eager" : "lazy"}
                            decoding="async"
                            draggable={false}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-70" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function GallerySection() {
    const reducedMotion = useReducedMotion();

    return (
        <section
            id="gallery"
            className="overflow-hidden bg-[#22241A] py-5 text-white sm:py-10"
        >
            <div className="mx-auto mb-12 max-w-4xl px-5 text-center sm:mb-16">

                <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl md:text-7xl">
                    Inside The
                    <span className="text-stone-400"> Iron Room.</span>
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-stone-600 sm:text-base">
                    Every rep counts. A glimpse into the sweat, dedication,
                    heavy iron, and high-intensity energy that drive real
                    body transformations every single day.
                </p>
            </div>

            <div className="flex flex-col gap-4 sm:gap-5">
                <GalleryRow
                    images={galleryRowOne}
                    direction="left"
                    reducedMotion={reducedMotion}
                />

                <GalleryRow
                    images={galleryRowTwo}
                    direction="right"
                    reducedMotion={reducedMotion}
                />
            </div>
        </section>
    );
}
