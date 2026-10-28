export default function AboutPage() {
  return (
    <div className="bg-[#EDE4D7] text-[#191916]">
      {/* ── Section 1: Top Hero in FitZone Dark Olive (#22241A) ──── */}
      <section className="relative bg-[#22241A] pb-6 pt-24 sm:pb-8 sm:pt-28 lg:pb-10 lg:pt-32 text-[#F3F0E8]">
        {/* Subtle olive ambient radial lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(117,117,73,0.18),transparent_65%)]"
        />

        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
          <div className="mb-3 inline-flex items-center justify-center gap-2.5">
            <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#929777] sm:text-[10px]">
              Our Story &amp; Philosophy
            </span>
            <span className="h-px w-10 bg-[#777B60]" />
          </div>

          {/* "ABOUT US" with open, generous letter-spacing for maximum clarity */}
          <h1 className="font-logo text-[clamp(3.2rem,8.2vw,6.8rem)] font-normal uppercase leading-[1.05] tracking-[0.08em] sm:tracking-[0.12em] text-[#F3F0E8]">
            About Us
          </h1>

          <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-[#A0A48A] sm:text-xs">
            Meet the Team Behind FitZone
          </p>
        </div>
      </section>

      {/* ── Section 2: Split Boundary with Image Covered Exactly Half by Dark & Half by Light ── */}
      <div className="relative">
        {/* Top 50% is #22241A (Dark Olive), Bottom 50% is #EDE4D7 (Warm Cream) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col"
        >
          <div className="h-1/2 w-full bg-[#22241A]" />
          <div className="h-1/2 w-full bg-[#EDE4D7]" />
        </div>

        {/* Centered Image (Exact 50/50 Coverage) */}
        <div className="relative z-10 mx-auto max-w-[300px] px-4 sm:max-w-[360px] md:max-w-[420px]">
          <div className="aspect-[3.2/4] w-full overflow-hidden border border-[#777B60]/50 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=85"
              alt="FitZone head trainer in modern studio"
              className="h-full w-full object-cover object-top"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* ── Section 3: Warm Cream Narrative Section (bg-[#EDE4D7]) ──── */}
      <section className="bg-[#EDE4D7] px-6 pb-20 pt-12 sm:px-10 sm:pb-28 sm:pt-16 lg:px-[4.5%] lg:pb-36 lg:pt-20">
        <div className="mx-auto max-w-[1060px]">
          {/* Eyebrow */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#626A48] sm:text-[11px]">
              Fitness Shouldn't Feel Like a Guessing Game
            </span>
            <span className="h-px w-10 bg-[#8A8B70]" />
          </div>

          {/* Large Editorial Headline with Italic Accents and comfortable letter-spacing */}
          <h2 className="mx-auto mt-4 max-w-[920px] text-center font-logo text-[clamp(2rem,4.4vw,3.8rem)] font-normal leading-[1.2] tracking-normal text-[#191916]">
            We want dedicated individuals to spend less hours trying to{' '}
            <span className="font-normal italic text-[#505A3B]">“stand out”</span> and more hours
            doing what they <span className="font-normal italic text-[#505A3B]">truly</span> love.
          </h2>

          {/* Two-Column Story Narrative */}
          <div className="mt-12 grid grid-cols-1 gap-8 text-[13.5px] leading-[1.85] text-[#514D43] md:grid-cols-2 md:gap-14 lg:mt-16 sm:text-[14.5px]">
            <div className="space-y-4">
              <p>
                FitZone began the way most good things do: late-night training sessions,
                a worn notebook, and a clear vision that felt bigger than just another
                commercial fitness franchise. We were tired of crowded gyms with broken
                machines, zero guidance, and empty promises.
              </p>
              <p>
                The more we spoke to people striving to get in shape — everyday
                professionals, busy parents, and seasoned lifters alike — the more we
                realized how many were stuck doing everything themselves. No real
                strategy. No support that actually fit. Just noise, quick fixes, and
                burnout. We wanted to build a gym that delivers lasting physical transformation.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                We set out to create an environment that helps people feel clear, confident,
                and calm in their training. A place where progressive overload meets
                thoughtful coaching, design has purpose, and members never feel lost or
                intimidated on the gym floor.
              </p>
              <p>
                What started as a focused training studio quickly grew into a close-knit
                community of athletes, coaches, and passionate lifters. People who care
                deeply, train with intention, and know how to achieve sustainable results.
                When you have structured programming, genuine encouragement, and the
                right coaches, everything else flows.
              </p>
            </div>
          </div>

          {/* ── Section 4: Testimonial Story Callout ─────────────── */}
          <div className="mt-16 border-t border-[#D5C9B7] pt-14 sm:mt-24 sm:pt-18">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[280px_1fr] md:gap-12 lg:grid-cols-[320px_1fr]">
              {/* Left Testimonial Still-life Photograph */}
              <div className="mx-auto w-full max-w-[280px] overflow-hidden border border-[#D5C9B7] bg-[#F5EEE3] sm:max-w-[320px]">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80"
                  alt="Lifting equipment and weights at FitZone"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Right Big Italic Quote & Attribution */}
              <div className="flex flex-col justify-center">
                <blockquote className="font-logo text-[clamp(1.4rem,2.6vw,2.2rem)] font-normal italic leading-[1.3] text-[#191916]">
                  “The coaches took everything swirling in my head and turned it
                  into a training routine that finally feels like home.”
                </blockquote>

                <p className="mt-5 text-[13px] leading-[1.8] text-[#5F5A50] sm:text-[14px]">
                  I've never felt more confident or clear in how I show up to workout.
                  What impressed me most was how deeply the trainers listened and how
                  precisely they structured my workouts to fit my busy life. I’ve had
                  memberships at plenty of gyms, but this was the first time it truly
                  felt like a real partnership.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#8A8B70]" />
                  <div>
                    <p className="font-logo text-base font-medium italic text-[#191916]">
                      Sarah Jenkins
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#716B5F]">
                      FitZone Club Member • 2 Years
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
