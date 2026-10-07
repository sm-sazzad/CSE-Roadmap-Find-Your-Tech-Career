import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />

        <div className="absolute left-[5%] top-[35%] h-[300px] w-[300px] rounded-full bg-indigo-600/8 blur-[120px]" />

        <div className="absolute right-[5%] top-[45%] h-[300px] w-[300px] rounded-full bg-blue-600/8 blur-[120px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-76px)] w-[min(1180px,calc(100%-40px))] items-center justify-center py-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-4 py-2 shadow-[0_0_30px_rgba(139,92,246,0.08)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
            </span>

            <span className="text-xs font-medium tracking-wide text-violet-300">
              Your journey starts here
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[80px]">
            CSE Roadmap
            <br />
            <span className="bg-linear-to-r from-violet-300 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
              Find Your Tech Career
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Explore structured roadmaps for the most in-demand careers in
            Computer Science. Learn the right skills, build real projects, and
            know exactly what to learn next.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/sector"
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(139,92,246,0.2)] transition duration-300 hover:border-violet-300/50 hover:shadow-[0_0_45px_rgba(139,92,246,0.35)] sm:w-auto"
            >
              Explore Roadmaps
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="#how-it-works"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-6 py-3.5 text-sm font-medium text-zinc-300 backdrop-blur-sm transition duration-300 hover:border-white/[0.16] hover:bg-white/[0.05] hover:text-white sm:w-auto"
            >
              How It Works
            </Link>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-xl grid-cols-3 divide-x divide-white/[0.07] border-y border-white/[0.07] py-6">
            <div className="px-4">
              <p className="text-2xl font-bold text-white">20+</p>
              <p className="mt-1 text-xs text-zinc-500">Career Paths</p>
            </div>

            <div className="px-4">
              <p className="text-2xl font-bold text-white">100+</p>
              <p className="mt-1 text-xs text-zinc-500">Topics</p>
            </div>

            <div className="px-4">
              <p className="text-2xl font-bold text-white">∞</p>
              <p className="mt-1 text-xs text-zinc-500">Possibilities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-linear-to-t from-[#05050a] to-transparent" />
    </section>
  );
}
