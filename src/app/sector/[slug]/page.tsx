import { notFound } from "next/navigation";
import Link from "next/link";

import { getAllRoadmapSlugs, getRoadmapBySlug } from "@/lib/roadmap";

import RoadmapHero from "@/components/roadmap/RoadmapHero";
import RoadmapStep from "@/components/roadmap/RoadmapStep";
import RoadmapProgress from "@/components/roadmap/RoadmapProgress";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllRoadmapSlugs();
}

export default async function RoadmapPage({ params }: PageProps) {
  const { slug } = await params;

  const roadmap = getRoadmapBySlug(slug);

  if (!roadmap) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <RoadmapHero roadmap={roadmap} />

      <div className="mx-auto w-[min(1180px,calc(100%-40px))] py-16 sm:py-20">
        {/* Prerequisites / Skills */}
        <section className="grid gap-4 lg:grid-cols-3">
          {/* Prerequisites */}
          <InfoCard
            title="Prerequisites"
            description="What you should know before starting."
            items={roadmap.prerequisites}
          />

          {/* Skills */}
          <InfoCard
            title="Core Skills"
            description="Skills you will develop throughout the roadmap."
            items={roadmap.skills}
          />

          {/* Tools */}
          <InfoCard
            title="Tools & Technologies"
            description="Tools commonly used in this career path."
            items={roadmap.tools}
          />
        </section>
        {/* Roadmap */}
        <section className="mt-24">
          {/* Section Header */}
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-px w-7 bg-violet-500" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                  Learning Path
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Your roadmap,
                <span className="bg-linear-to-r from-violet-300 to-blue-400 bg-clip-text text-transparent">
                  {" "}
                  step by step.
                </span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-zinc-500 sm:text-base">
                Follow these stages in order. Each stage builds the foundation
                you need for the next one.
              </p>
            </div>

            {/* Roadmap Summary */}
            <div className="flex w-fit items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] p-1.5">
              <div className="rounded-lg bg-violet-500/[0.08] px-3 py-2">
                <span className="text-xs font-semibold text-violet-300">
                  {roadmap.steps.length}
                </span>

                <span className="ml-1.5 text-[10px] text-zinc-600">Stages</span>
              </div>

              <div className="px-3 py-2">
                <span className="text-xs font-semibold text-zinc-300">
                  {roadmap.skills.length}
                </span>

                <span className="ml-1.5 text-[10px] text-zinc-600">Skills</span>
              </div>
            </div>
          </div>

          {/* Roadmap Content */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
            {/* Progress Sidebar */}
            <div className="lg:sticky lg:top-24">
              <RoadmapProgress slug={roadmap.slug} steps={roadmap.steps} />
            </div>

            {/* Roadmap Steps */}
            <div className="relative">
              {/* Timeline Background */}
              <div className="pointer-events-none absolute bottom-0 left-6 top-0 hidden w-px bg-linear-to-b from-violet-500/20 via-white/[0.05] to-transparent md:block" />

              <div className="space-y-6">
                {roadmap.steps.map((step, index) => (
                  <RoadmapStep
                    key={step.title}
                    step={step}
                    index={index}
                    total={roadmap.steps.length}
                    slug={roadmap.slug}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Roadmap Completion Hint */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-violet-500/10 bg-violet-500/[0.025]">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/[0.07] text-violet-400">
                  ✓
                </div>

                <div>
                  <p className="text-sm font-semibold text-zinc-300">
                    Learn at your own pace
                  </p>

                  <p className="mt-1 text-xs leading-5 text-zinc-600">
                    Complete each stage, build the suggested projects, and move
                    forward when you feel confident.
                  </p>
                </div>
              </div>

              <span className="w-fit rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[10px] text-zinc-600">
                Progress saved automatically
              </span>
            </div>
          </div>
        </section>

        {/* Career Roles */}
        <section className="mt-24">
          <div className="rounded-3xl border border-white/[0.07] bg-[#090910]/80 p-7 sm:p-10">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                Career Opportunities
              </span>

              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                Where can this roadmap take you?
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                These are some of the roles you can target after developing the
                skills covered in this roadmap.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {roadmap.career_roles.map((role) => (
                <div
                  key={role}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-4 transition duration-300 hover:border-violet-500/20 hover:bg-violet-500/[0.03]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/[0.08] text-sm text-violet-300">
                    →
                  </span>

                  <span className="text-sm text-zinc-400 transition group-hover:text-zinc-200">
                    {role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="mt-24">
          {/* Section Header */}
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="h-px w-7 bg-violet-500" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                  Learning Resources
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Resources to
                <span className="bg-linear-to-r from-violet-300 to-blue-400 bg-clip-text text-transparent">
                  {" "}
                  go deeper.
                </span>
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
                Hand-picked resources to help you understand the concepts,
                practice your skills, and continue learning.
              </p>
            </div>

            {/* Resource Count */}
            <div className="w-fit rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-2.5">
              <span className="text-xs text-zinc-600">Resources</span>

              <span className="ml-2 text-sm font-semibold text-zinc-300">
                {roadmap.resources.length}
              </span>
            </div>
          </div>

          {/* Resource Cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {roadmap.resources.map((resource, index) => (
              <a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-[#090910]/70 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-violet-500/20 hover:bg-[#0c0c15] hover:shadow-[0_15px_50px_rgba(0,0,0,0.25)]"
              >
                {/* Hover Glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-violet-500/[0.07] blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Top */}
                <div className="relative flex items-center justify-between">
                  {/* Resource Number */}
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025] text-xs font-semibold text-zinc-600 transition-all duration-300 group-hover:border-violet-500/20 group-hover:bg-violet-500/[0.08] group-hover:text-violet-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Resource Type */}
                  <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-zinc-600 transition-colors group-hover:border-violet-500/10 group-hover:text-violet-400">
                    {resource.type}
                  </span>
                </div>

                {/* Content */}
                <div className="relative mt-6">
                  <h3 className="text-sm font-semibold leading-6 text-zinc-300 transition-colors duration-300 group-hover:text-white">
                    {resource.name}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-zinc-600">
                    Recommended resource for improving your knowledge and
                    practical skills in this roadmap.
                  </p>
                </div>

                {/* Bottom */}
                <div className="relative mt-6 flex items-center justify-between border-t border-white/[0.05] pt-4">
                  <span className="text-[10px] text-zinc-700">Recommended</span>

                  <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 transition-all duration-300 group-hover:text-violet-300">
                    Open resource
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
        {/* Final Project */}
        <section className="mt-24">
          <div className="relative overflow-hidden rounded-3xl border border-violet-500/15 bg-[#090910]/90 p-7 shadow-[0_0_80px_rgba(139,92,246,0.05)] sm:p-10">
            <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[280px] w-[280px] rounded-full bg-violet-500/[0.07] blur-[100px]" />

            <div className="relative">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                Final Challenge
              </span>

              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                Put everything together.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500">
                Once you complete the roadmap, challenge yourself with a project
                that combines the skills you have learned.
              </p>

              <div className="mt-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
                  Recommended Final Project
                </p>

                <p className="mt-3 text-base font-medium leading-7 text-zinc-300">
                  {roadmap.final_project}
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/sector"
            className="group flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-3 text-sm font-medium text-zinc-400 transition duration-300 hover:border-violet-500/20 hover:bg-violet-500/[0.05] hover:text-white"
          >
            ← Explore other roadmaps
            <span className="sr-only">Go back to all career roadmaps</span>
          </Link>
        </div>
      </div>
      {/* Final Project */}
      <section className="mt-24">
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/15 bg-[#090910]">
          {/* Background Effects */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-600/[0.08] blur-[110px]" />

            <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-blue-600/[0.07] blur-[120px]" />

            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />
          </div>

          <div className="relative p-6 sm:p-8 lg:p-10">
            {/* Top Label */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/[0.08] text-violet-400">
                  ✦
                </span>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">
                    Capstone Project
                  </p>

                  <p className="mt-0.5 text-xs text-zinc-600">
                    Put everything you learned into practice
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                Final Challenge
              </span>
            </div>

            {/* Main Content */}
            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center">
              {/* Project Info */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                  Your Final Project
                </p>

                <h2 className="mt-3 max-w-3xl text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Build something that proves
                  <span className="bg-linear-to-r from-violet-300 to-blue-400 bg-clip-text text-transparent">
                    {" "}
                    you&apos;re ready.
                  </span>
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">
                  {roadmap.final_project}
                </p>

                {/* Project Checklist */}
                <div className="mt-7 grid gap-2 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                    <span className="text-violet-400">✓</span>

                    <span className="text-xs text-zinc-500">
                      Apply roadmap skills
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                    <span className="text-violet-400">✓</span>

                    <span className="text-xs text-zinc-500">
                      Build from scratch
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                    <span className="text-violet-400">✓</span>

                    <span className="text-xs text-zinc-500">
                      Document your work
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                    <span className="text-violet-400">✓</span>

                    <span className="text-xs text-zinc-500">
                      Add it to your portfolio
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Goal Card */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-violet-500/[0.04] blur-2xl" />

                <div className="relative rounded-2xl border border-white/[0.07] bg-black/20 p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                      Project Goal
                    </span>

                    <span className="text-violet-400">↗</span>
                  </div>

                  <div className="mt-7">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/15 bg-violet-500/[0.08] text-2xl">
                      🚀
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-white">
                      Portfolio Ready
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-zinc-600">
                      Your final project should demonstrate the skills,
                      technologies, and problem-solving ability you gained
                      throughout this roadmap.
                    </p>
                  </div>

                  {/* Progress-like Indicator */}
                  <div className="mt-7">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] text-zinc-700">
                        Roadmap completion
                      </span>

                      <span className="text-[10px] text-violet-400">
                        Final Stage
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                      <div className="h-full w-full rounded-full bg-linear-to-r from-violet-500 to-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Message */}
            <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/[0.07] text-xs text-violet-400">
                  ✦
                </span>

                <p className="text-xs text-zinc-600">
                  Finish the roadmap. Build the project. Show what you can do.
                </p>
              </div>

              <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-700">
                You&apos;ve got this
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-[#090910]/70 p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-violet-500/15 hover:bg-[#0c0c15]">
      <h3 className="text-base font-semibold text-white">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-zinc-600">{description}</p>

      <div className="mt-5 space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2.5 text-sm text-zinc-400"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/60" />

            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
