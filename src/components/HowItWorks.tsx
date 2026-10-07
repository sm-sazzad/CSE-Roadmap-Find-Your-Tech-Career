import Link from "next/link";
import Reveal from "./ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Choose Your Path",
    description:
      "Explore different CSE career paths and find the one that matches your interests, goals, and strengths.",
    icon: "⌁",
    accent: "from-violet-500 to-indigo-500",
  },
  {
    number: "02",
    title: "Follow the Roadmap",
    description:
      "Learn in the right order with carefully structured topics, essential skills, tools, and learning resources.",
    icon: "↗",
    accent: "from-indigo-500 to-blue-500",
  },
  {
    number: "03",
    title: "Build & Grow",
    description:
      "Turn your knowledge into real projects, strengthen your portfolio, and move closer to your dream career.",
    icon: "✦",
    accent: "from-blue-500 to-cyan-400",
  },
];

export default function HowItWorks() {
  return (
    <Reveal y={30}>
      <section
        id="how-it-works"
        className="relative overflow-hidden py-24 sm:py-28"
      >
        {/* Background Glow */}
        <div className="pointer-events-none absolute right-[-150px] top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-indigo-600/[0.05] blur-[140px]" />

        <div className="relative mx-auto w-[min(1180px,calc(100%-40px))]">
          {/* Section Heading */}
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="h-px w-7 bg-violet-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                Simple Process
              </span>

              <span className="h-px w-7 bg-violet-500" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your journey starts
              <span className="bg-linear-to-r from-violet-300 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
                {" "}
                with a path.
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
              No more wondering what to learn next. Choose a direction, follow
              the steps, and keep building until you reach your goal.
            </p>
          </div>

          {/* Steps */}
          <div className="relative mt-16 grid gap-5 lg:grid-cols-3">
            {/* Connecting Line - Desktop */}
            <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[55px] hidden h-px bg-linear-to-r from-violet-500/30 via-indigo-500/30 to-blue-500/30 lg:block" />

            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.1} y={20}>
                <div key={step.number} className="group relative">
                  {/* Step Number */}
                  <div className="relative z-10 mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-white/[0.08] bg-[#080810] shadow-[0_0_30px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-violet-400/30 group-hover:shadow-[0_0_35px_rgba(139,92,246,0.18)]">
                    <div
                      className={`absolute inset-[5px] rounded-xl bg-linear-to-br ${step.accent} opacity-[0.08] transition duration-500 group-hover:opacity-[0.15]`}
                    />

                    <span className="relative text-xl text-zinc-300 transition-colors duration-300 group-hover:text-white">
                      {step.icon}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="mt-[-1px] rounded-2xl border border-white/[0.06] bg-[#090910]/70 px-6 pb-7 pt-8 text-center backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:border-violet-500/15 group-hover:bg-[#0c0c15]">
                    {/* Number */}
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-violet-500/70">
                      STEP {step.number}
                    </span>

                    <h3 className="mt-3 text-lg font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-zinc-500">
                      {step.description}
                    </p>

                    {/* Bottom Accent */}
                    <div className="mx-auto mt-6 h-px w-10 bg-linear-to-r from-transparent via-violet-500/50 to-transparent transition-all duration-500 group-hover:w-20" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 flex justify-center">
            <Link
              href="/sector"
              className="group flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-sm font-medium text-zinc-400 transition-all duration-300 hover:border-violet-500/25 hover:bg-violet-500/[0.05] hover:text-white"
            >
              Start exploring career paths
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
