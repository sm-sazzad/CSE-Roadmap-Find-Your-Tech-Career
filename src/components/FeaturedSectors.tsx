import Link from "next/link";
import sectors from "@/data/sector.json";

export default function FeaturedSectors() {
  const featuredSectors = sectors.sectors.slice(0, 6);

  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/[0.05] blur-[140px]" />

      <div className="relative mx-auto w-[min(1180px,calc(100%-40px))]">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-7 bg-violet-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                Explore Paths
              </span>
            </div>

            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Find the career path that{" "}
              <span className="bg-linear-to-r from-violet-300 to-blue-400 bg-clip-text text-transparent">
                fits you.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
              Not sure where to start? Explore different CSE career paths and
              discover what skills, tools, and projects you need.
            </p>
          </div>

          <Link
            href="/sector"
            className="group flex w-fit items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white"
          >
            View all paths
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Sector Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredSectors.map((sector) => (
            <Link
              key={sector.slug}
              href={`/sector/${sector.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0a12]/80 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-violet-500/25 hover:bg-[#0d0d18] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              {/* Hover Glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-violet-500/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

              {/* Card Top */}
              <div className="relative flex items-start justify-between">
                {/* Icon */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/15 bg-linear-to-br from-violet-500/10 to-blue-500/5 text-xl transition duration-500 group-hover:border-violet-400/30 group-hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]">
                  {sector.icon}
                </div>

                {/* Arrow */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.06] text-zinc-600 transition duration-300 group-hover:border-violet-500/20 group-hover:text-violet-300">
                  ↗
                </div>
              </div>

              {/* Content */}
              <div className="relative mt-6">
                <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-violet-200">
                  {sector.name}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
                  {sector.description}
                </p>
              </div>

              {/* Bottom */}
              <div className="relative mt-6 flex items-center justify-between border-t border-white/[0.05] pt-4">
                <span className="text-xs text-zinc-600">Career Roadmap</span>

                <span className="text-xs font-medium text-zinc-500 transition group-hover:text-violet-300">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
