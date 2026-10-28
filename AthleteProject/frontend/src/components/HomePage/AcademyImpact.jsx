import {
  ArrowRight,
  Users,
  Medal,
  Shirt,
  Trophy,
  Award,
} from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
  { value: '2,500+', label: 'Active Gym Members', icon: Users },
  { value: '25+', label: 'Certified Trainers', icon: Medal },
  { value: '50+', label: 'Weekly Group Classes', icon: Shirt },
  { value: '1,200+', label: 'Transformations Completed', icon: Trophy },
  { value: '99%', label: 'Goal Success Rate', icon: Award },
]

// Reusable animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const statAnimation = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export default function AcademyImpact() {
  return (
    <>
      {/* Gym at a glance */}
      <section
        id="impact"
        className="relative isolate overflow-hidden bg-[#EDE4D7] text-[#191916]"
      >
        {/* Warm, translucent overlay matching your hero */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(239,231,219,0.96)_0%,rgba(239,231,219,0.91)_35%,rgba(239,231,219,0.76)_68%,rgba(239,231,219,0.20)_100%)]"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto grid min-h-[590px] max-w-[1600px] items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[0.95fr_2.05fr] lg:gap-8 lg:px-[4.2%] lg:py-24"
        >
          {/* Left introduction */}
          <motion.div variants={fadeUp} className="max-w-[440px]">
            <div className="mb-6 flex items-center gap-5">
              <span className="text-[11px] font-medium uppercase tracking-[0.17em] text-[#626A48]">
                Club Track Record
              </span>
              <span className="h-px w-16 bg-[#8A8B70]" />
            </div>

            <h2 className="mb-6 font-display text-[clamp(3.2rem,5vw,5.3rem)] uppercase leading-[0.88] tracking-[-0.035em]">
              <span className="block">Gym</span>
              <span className="block text-[#505A3B]">
                At a Glance.
              </span>
            </h2>

            <p className="mb-7 max-w-[390px] text-[15px] leading-[1.8] text-[#46443D] sm:text-base">
              A premier fitness facility dedicated to progressive
              strength training, functional conditioning, and building
              stronger, healthier, and more confident bodies.
            </p>

            <motion.a
              href="#programs"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex min-h-[54px] items-center gap-5 bg-[#505A3B] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.09em] text-white transition-colors duration-300 hover:bg-[#3E472E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#505A3B]"
            >
              Explore Training Programs
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.a>
          </motion.div>

          {/* Five statistics */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-y-0"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon

              return (
                <motion.div
                  key={stat.label}
                  variants={statAnimation}
                  whileHover={{ y: -7 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`flex flex-col items-center px-3 text-center lg:px-4 ${
                    index !== 0
                      ? 'lg:border-l lg:border-[#BDB49F]/70'
                      : ''
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -4 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="mb-5 flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#77785D]/10"
                  >
                    <Icon
                      size={29}
                      strokeWidth={1.4}
                      className="text-[#35382B]"
                    />
                  </motion.div>

                  <p className="mb-3 font-display text-[clamp(2.5rem,3.5vw,3.6rem)] leading-none tracking-[-0.035em] text-[#505A3B]">
                    {stat.value}
                  </p>

                  <p className="max-w-[145px] text-[10px] font-semibold uppercase leading-[1.8] tracking-[0.15em] text-[#24231F] sm:text-[11px]">
                    {stat.label}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Gym & Workouts banner */}
      <section
        id="programs"
        className="overflow-hidden bg-[#22241A] text-[#F3F0E8]"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto grid max-w-[1600px] items-center gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[1.8fr_0.9fr_0.75fr] lg:gap-12 lg:px-[4.2%] lg:py-[76px]"
        >
          <motion.div variants={fadeUp}>
            <div className="mb-5 flex items-center gap-5">
              <span className="text-[11px] font-medium uppercase tracking-[0.17em] text-[#929777]">
                Training Programs
              </span>
              <span className="h-px w-16 bg-[#777B60]" />
            </div>

            <h2 className="font-display text-[clamp(3rem,5.6vw,5.8rem)] uppercase leading-[0.92] tracking-[-0.035em]">
              Gym{' '}
              <span className="text-[#A0A48A]">&amp;</span>
              <br className="hidden sm:block" /> Workouts
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="max-w-[360px] text-[15px] leading-[1.8] text-[#D2D0C6] sm:text-base"
          >
            Structured gym training programs designed to build
            strength, burn fat, and develop lifelong physical fitness.
          </motion.p>

          <motion.a
            variants={fadeUp}
            whileHover={{ x: 5, borderColor: '#B0B69A' }}
            whileTap={{ scale: 0.98 }}
            href="/programs"
            className="group inline-flex min-h-[54px] items-center justify-between gap-5 border border-[#777B60] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors duration-300 hover:border-[#B0B69A] hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A0A48A]"
          >
            Explore All Workouts
            <ArrowRight
              size={17}
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.a>
        </motion.div>
      </section>
    </>
  )
}
