import Link from "next/link";
import Reveal from "./ui/Reveal";

export default function FinalCTA() {
  return (
    <Reveal y={35}>
      <section className="relative overflow-hidden py-24 sm:py-32">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.08] blur-[140px]" />

        <div className="pointer-events-none absolute left-[10%] top-1/2 h-[220px] w-[220px] -translate-y-1/2 rounded-full bg-blue-600/[0.06] blur-[100px]" />

        <div className="pointer-events-none absolute right-[10%] top-1/2 h-[220px] w-[220px] -translate-y-1/2 rounded-full bg-indigo-600/[0.06] blur-[100px]" />

        <div className="relative mx-auto w-[min(1100px,calc(100%-40px))]">
          <div className="relative overflow-hidden rounded-[28px] border border-violet-500/15 bg-[#090910]/90 px-6 py-16 text-center shadow-[0_0_100px_rgba(139,92,246,0.07)] backdrop-blur-xl sm:px-12 sm:py-20">
            {/* Top Border Glow */}
            <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-violet-500/60 to-transparent" />

            {/* Grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `
                linear-gradient(rgba(139,92,246,0.6) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139,92,246,0.6) 1px, transparent 1px)
              `,
                backgroundSize: "45px 45px",
              }}
            />

            {/* Content */}
            <div className="relative">
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/[0.08] text-xl text-violet-300 shadow-[0_0_30px_rgba(139,92,246,0.12)]">
                ✦
              </div>

              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-violet-400">
                Start Your Journey
              </p>

              <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                Your next career move
                <br />
                <span className="bg-linear-to-r from-violet-300 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
                  starts here.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
                Pick a path, follow the roadmap, build real projects, and turn
                your CSE knowledge into a career you can be proud of.
              </p>

              {/* CTA */}
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/sector"
                  className="group flex items-center gap-2 rounded-xl border border-violet-400/30 bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(139,92,246,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/50 hover:shadow-[0_0_45px_rgba(139,92,246,0.35)]"
                >
                  Explore All Roadmaps
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  href="/about"
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-6 py-3.5 text-sm font-medium text-zinc-400 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.05] hover:text-white"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Bottom Decoration */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />
          </div>
        </div>
      </section>
    </Reveal>
  );
}
