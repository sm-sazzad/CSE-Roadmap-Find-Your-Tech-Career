import Reveal from "./ui/Reveal";

const stats = [
  {
    value: "20+",
    label: "Career Paths",
    description: "Explore different tech careers",
  },
  {
    value: "120+",
    label: "Roadmap Steps",
    description: "Structured learning journey",
  },
  {
    value: "100+",
    label: "Core Topics",
    description: "Skills worth learning",
  },
  {
    value: "∞",
    label: "Possibilities",
    description: "Your career, your direction",
  },
];

const features = [
  {
    number: "01",
    title: "Learn in the right order",
    description:
      "Stop jumping between random tutorials. Follow a structured path that takes you from fundamentals to real-world skills.",
    icon: "↗",
  },
  {
    number: "02",
    title: "Build while you learn",
    description:
      "Every roadmap focuses on practical projects so you can turn concepts into something meaningful.",
    icon: "◇",
  },
  {
    number: "03",
    title: "Know what comes next",
    description:
      "Clear milestones help you understand where you are, what you have learned, and what you should learn next.",
    icon: "→",
  },
];

export default function WhyCodePath() {
  return (
    <Reveal y={30}>
      <section className="relative overflow-hidden py-24 sm:py-28">
        {/* Background Glow */}
        <div className="pointer-events-none absolute left-[-180px] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-600/[0.045] blur-[150px]" />

        <div className="relative mx-auto w-[min(1180px,calc(100%-40px))]">
          {/* Stats */}
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#090910]/80 backdrop-blur-xl">
            {/* Top glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-violet-500/60 to-transparent" />

            <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.06] lg:grid-cols-4 lg:divide-y-0">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group relative px-6 py-8 text-center transition duration-500 hover:bg-white/[0.015] sm:px-8 sm:py-10"
                >
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-violet-500/[0.04] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                  <p className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {stat.value}
                  </p>

                  <p className="relative mt-2 text-sm font-medium text-violet-300">
                    {stat.label}
                  </p>

                  <p className="relative mt-1 text-xs text-zinc-600">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-24 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            {/* Left */}
            <div>
              <div className="mb-5 flex items-center gap-2">
                <span className="h-px w-7 bg-violet-500" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                  Why CodePath
                </span>
              </div>

              <h2 className="max-w-lg text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Your career should have a
                <span className="bg-linear-to-r from-violet-300 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
                  {" "}
                  clear direction.
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-500 sm:text-base">
                The tech world is huge. There are hundreds of technologies,
                frameworks, tools, and career options. CodePath helps you filter
                out the noise and focus on what actually matters.
              </p>

              {/* Small Badge */}
              <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
                  ✦
                </div>

                <div>
                  <p className="text-xs font-medium text-zinc-300">
                    Built for CSE students
                  </p>

                  <p className="mt-0.5 text-[11px] text-zinc-600">
                    Learn with clarity, not confusion.
                  </p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-3">
              {features.map((feature) => (
                <div
                  key={feature.number}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#090910]/70 p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-violet-500/20 hover:bg-[#0c0c15]"
                >
                  {/* Hover Glow */}
                  <div className="pointer-events-none absolute right-[-60px] top-[-60px] h-32 w-32 rounded-full bg-violet-500/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                  <div className="relative flex gap-4">
                    {/* Number */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-xs font-semibold text-zinc-500 transition duration-300 group-hover:border-violet-500/20 group-hover:text-violet-300">
                      {feature.number}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-sm font-semibold text-white sm:text-base">
                          {feature.title}
                        </h3>

                        <span className="text-zinc-600 transition duration-300 group-hover:translate-x-1 group-hover:text-violet-300">
                          {feature.icon}
                        </span>
                      </div>

                      <p className="mt-2 text-xs leading-6 text-zinc-500 sm:text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
