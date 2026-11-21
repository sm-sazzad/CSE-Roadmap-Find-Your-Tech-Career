"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Layers3, BookOpen } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectorIcon from "./ui/SectorIcon";
import { useLang, phrase, num } from "@/lib/i18n";
import type { CatalogItem } from "@/lib/roadmap";

export default function FeaturedSectors({ catalog }: { catalog: CatalogItem[] }) {
  const { t, lang } = useLang();
  const itemsMap = new Map(catalog.map((c) => [c.slug, c]));

  const web = itemsMap.get("web-development");
  const aiml = itemsMap.get("ai-ml");
  const cyber = itemsMap.get("cyber-security");
  const cloud = itemsMap.get("cloud-computing");
  const prog = itemsMap.get("programming-fundamentals");
  const app = itemsMap.get("app-development");

  return (
    <section className="mx-auto w-[min(1180px,calc(100%-32px))] py-20">
      <Reveal>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#00f5a0]">
              {t("featured_k")}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl font-heading">
              {t("featured_t")}
            </h2>
            <p className="mt-3 text-sm text-zinc-400 sm:text-base">{t("featured_s")}</p>
          </div>
          <Link
            href="/sector"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0d121f] px-5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-200 transition-all duration-300 hover:border-[#00f5a0]/40 hover:bg-[#121828] hover:text-white"
          >
            {t("view_all")}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>

      {/* Asymmetrical Bento Grid */}
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* Bento 1: Flagship Web Development / Full-Stack (Col Span 2) */}
        {web && (
          <Reveal delay={0.05} className="md:col-span-2">
            <Link
              href={`/sector/${web.slug}`}
              className="glass-card group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-br from-[#0c1120] via-[#090d18] to-[#06080e] p-7 transition-all duration-300 hover:border-[#00f5a0]/40 sm:p-9"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00f5a0]/10 blur-[100px]" />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00f5a0]/30 bg-[#121828] text-[#00f5a0] shadow-[0_0_24px_rgba(0,245,160,0.2)]">
                      <SectorIcon slug={web.slug} className="h-6 w-6" fallbackIcon={web.icon} />
                    </div>
                    <div>
                      <span className="rounded-md border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider text-[#00f5a0] uppercase">
                        MOST POPULAR
                      </span>
                      <h3 className="text-2xl font-bold text-white font-heading mt-1">
                        {(lang === "bn" && web.bn?.name) || web.name}
                      </h3>
                    </div>
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-400 transition-all duration-300 group-hover:border-[#00f5a0]/40 group-hover:bg-[#00f5a0]/15 group-hover:text-[#00f5a0]">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400">
                  {(lang === "bn" && web.bn?.tagline) || web.tagline}
                </p>

                {/* Architecture Pipeline Preview */}
                <div className="mt-6 hidden rounded-2xl border border-white/[0.06] bg-black/40 p-4 sm:block">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    Full-Stack Trajectory Pipeline
                  </p>
                  <div className="mt-2.5 flex items-center justify-between gap-2 text-xs font-mono text-zinc-300">
                    <div className="rounded-lg border border-white/[0.06] bg-[#121828] px-3 py-1.5 text-center">
                      Frontend & React 19
                    </div>
                    <span className="text-[#00f5a0]">→</span>
                    <div className="rounded-lg border border-white/[0.06] bg-[#121828] px-3 py-1.5 text-center">
                      Node / Go APIs
                    </div>
                    <span className="text-[#00f5a0]">→</span>
                    <div className="rounded-lg border border-white/[0.06] bg-[#121828] px-3 py-1.5 text-center">
                      Postgres & Redis
                    </div>
                    <span className="text-[#00f5a0]">→</span>
                    <div className="rounded-lg border border-[#00f5a0]/25 bg-[#00f5a0]/10 px-3 py-1.5 text-center text-[#00f5a0]">
                      Docker & Deploy
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
                <div className="flex flex-wrap gap-2 text-[11px] font-mono text-zinc-400">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1">
                    <Layers3 className="h-3.5 w-3.5 text-[#00f5a0]" />
                    {t("steps_n", { n: web.steps })}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1">
                    <Clock className="h-3.5 w-3.5 text-zinc-400" />
                    {phrase(web.estimated_time, lang)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1">
                    <BookOpen className="h-3.5 w-3.5 text-zinc-400" />
                    {num(web.resources, lang)} Resources
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold text-[#00f5a0] group-hover:underline">
                  Launch Roadmap →
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Bento 2: AI & Machine Learning (Col Span 1) */}
        {aiml && (
          <Reveal delay={0.1}>
            <Link
              href={`/sector/${aiml.slug}`}
              className="glass-card group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-b from-[#0e1424] via-[#090d18] to-[#06080e] p-7 transition-all duration-300 hover:border-[#00d2ff]/40"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#00d2ff]/10 blur-[80px]" />

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00d2ff]/30 bg-[#121828] text-[#00d2ff] shadow-[0_0_24px_rgba(0,210,255,0.2)]">
                    <SectorIcon slug={aiml.slug} className="h-6 w-6" fallbackIcon={aiml.icon} />
                  </div>
                  <span className="rounded-md border border-[#00d2ff]/30 bg-[#00d2ff]/10 px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider text-[#00d2ff] uppercase">
                    HIGH DEMAND
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-white group-hover:text-[#00d2ff] transition-colors font-heading">
                  {(lang === "bn" && aiml.bn?.name) || aiml.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400 line-clamp-3">
                  {(lang === "bn" && aiml.bn?.tagline) || aiml.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["PyTorch", "Transformers", "LLMs", "RAG"].map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-white/[0.06] bg-black/30 px-2 py-0.5 text-[10px] font-mono text-zinc-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-[11px] font-mono text-zinc-400">
                <span>{t("steps_n", { n: aiml.steps })}</span>
                <span className="text-[#00d2ff] group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Bento 3: Cyber Security (Col Span 1) */}
        {cyber && (
          <Reveal delay={0.15}>
            <Link
              href={`/sector/${cyber.slug}`}
              className="glass-card group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-b from-[#14121e] via-[#090d18] to-[#06080e] p-7 transition-all duration-300 hover:border-[#f59e0b]/40"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#f59e0b]/10 blur-[80px]" />

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f59e0b]/30 bg-[#191624] text-[#f59e0b] shadow-[0_0_24px_rgba(245,158,11,0.2)]">
                    <SectorIcon slug={cyber.slug} className="h-6 w-6" fallbackIcon={cyber.icon} />
                  </div>
                  <span className="rounded-md border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider text-[#f59e0b] uppercase">
                    CRITICAL DEFENSE
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-white group-hover:text-[#f59e0b] transition-colors font-heading">
                  {(lang === "bn" && cyber.bn?.name) || cyber.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400 line-clamp-3">
                  {(lang === "bn" && cyber.bn?.tagline) || cyber.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Ethical Hacking", "OWASP", "SIEM", "Pen Testing"].map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-white/[0.06] bg-black/30 px-2 py-0.5 text-[10px] font-mono text-zinc-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-[11px] font-mono text-zinc-400">
                <span>{t("steps_n", { n: cyber.steps })}</span>
                <span className="text-[#f59e0b] group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Bento 4: Cloud Computing & Systems (Col Span 2) */}
        {cloud && (
          <Reveal delay={0.2} className="md:col-span-2">
            <Link
              href={`/sector/${cloud.slug}`}
              className="glass-card group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-br from-[#0c1322] via-[#090d18] to-[#06080e] p-7 transition-all duration-300 hover:border-[#38bdf8]/40 sm:p-8"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#38bdf8]/10 blur-[90px]" />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#38bdf8]/30 bg-[#101726] text-[#38bdf8] shadow-[0_0_24px_rgba(56,189,248,0.2)]">
                      <SectorIcon slug={cloud.slug} className="h-6 w-6" fallbackIcon={cloud.icon} />
                    </div>
                    <div>
                      <span className="rounded-md border border-[#38bdf8]/30 bg-[#38bdf8]/10 px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider text-[#38bdf8] uppercase">
                        INFRASTRUCTURE & DEVOPS
                      </span>
                      <h3 className="text-xl font-bold text-white font-heading mt-1 sm:text-2xl">
                        {(lang === "bn" && cloud.bn?.name) || cloud.name}
                      </h3>
                    </div>
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-400 transition-all duration-300 group-hover:border-[#38bdf8]/40 group-hover:bg-[#38bdf8]/15 group-hover:text-[#38bdf8]">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  {(lang === "bn" && cloud.bn?.tagline) || cloud.tagline}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["AWS / GCP", "Kubernetes", "Docker Containers", "Terraform IaC", "CI/CD Actions"].map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-white/[0.06] bg-black/40 px-3 py-1 text-xs font-mono text-zinc-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-[11px] font-mono text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                  <Layers3 className="h-3.5 w-3.5 text-[#38bdf8]" />
                  {t("steps_n", { n: cloud.steps })}
                </span>
                <span className="text-xs font-mono font-semibold text-[#38bdf8] group-hover:underline">
                  Launch Roadmap →
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Bento 5: Programming Fundamentals (Col Span 2 - Featured) */}
        {prog && (
          <Reveal delay={0.25} className="md:col-span-2">
            <Link
              href={`/sector/${prog.slug}`}
              className="glass-card group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-br from-[#0c1422] via-[#090d18] to-[#06080e] p-7 transition-all duration-300 hover:border-[#00f5a0]/40 sm:p-9"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00f5a0]/10 blur-[100px]" />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00f5a0]/30 bg-[#121828] text-[#00f5a0] shadow-[0_0_24px_rgba(0,245,160,0.2)]">
                      <SectorIcon slug={prog.slug} className="h-6 w-6" fallbackIcon={prog.icon} />
                    </div>
                    <div>
                      <span className="rounded-md border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider text-[#00f5a0] uppercase">
                        {lang === "bn" ? "শুরু করুন এখান থেকে" : "FOUNDATION STEP 01"}
                      </span>
                      <h3 className="text-2xl font-bold text-white font-heading mt-1">
                        {(lang === "bn" && prog.bn?.name) || prog.name}
                      </h3>
                    </div>
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-400 transition-all duration-300 group-hover:border-[#00f5a0]/40 group-hover:bg-[#00f5a0]/15 group-hover:text-[#00f5a0]">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400">
                  {(lang === "bn" && prog.bn?.tagline) || prog.tagline}
                </p>

                {/* CS Foundation Pipeline Preview */}
                <div className="mt-6 hidden rounded-2xl border border-white/[0.06] bg-black/40 p-4 sm:block">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    CS & Problem Solving Pipeline
                  </p>
                  <div className="mt-2.5 flex items-center justify-between gap-2 text-xs font-mono text-zinc-300">
                    <div className="rounded-lg border border-white/[0.06] bg-[#121828] px-3 py-1.5 text-center">
                      C / C++ Syntax
                    </div>
                    <span className="text-[#00f5a0]">→</span>
                    <div className="rounded-lg border border-white/[0.06] bg-[#121828] px-3 py-1.5 text-center">
                      Arrays & Pointers
                    </div>
                    <span className="text-[#00f5a0]">→</span>
                    <div className="rounded-lg border border-white/[0.06] bg-[#121828] px-3 py-1.5 text-center">
                      Data Structures
                    </div>
                    <span className="text-[#00f5a0]">→</span>
                    <div className="rounded-lg border border-[#00f5a0]/25 bg-[#00f5a0]/10 px-3 py-1.5 text-center text-[#00f5a0]">
                      Algorithms & CP
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
                <div className="flex flex-wrap gap-2 text-[11px] font-mono text-zinc-400">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1">
                    <Layers3 className="h-3.5 w-3.5 text-[#00f5a0]" />
                    {t("steps_n", { n: prog.steps })}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1">
                    <Clock className="h-3.5 w-3.5 text-zinc-400" />
                    {phrase(prog.estimated_time, lang)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1">
                    <BookOpen className="h-3.5 w-3.5 text-zinc-400" />
                    {num(prog.resources, lang)} Resources
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold text-[#00f5a0] group-hover:underline">
                  Start Here →
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Bento 6: Mobile Engineering (Col Span 1) */}
        {app && (
          <Reveal delay={0.3}>
            <Link
              href={`/sector/${app.slug}`}
              className="glass-card group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-b from-[#0e1424] via-[#090d18] to-[#06080e] p-7 transition-all duration-300 hover:border-[#10b981]/40"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#10b981]/10 blur-[80px]" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#10b981]/30 bg-[#101824] text-[#10b981] shadow-[0_0_24px_rgba(16,185,129,0.2)]">
                    <SectorIcon slug={app.slug} className="h-6 w-6" fallbackIcon={app.icon} />
                  </div>
                  <span className="rounded-md border border-[#10b981]/30 bg-[#10b981]/10 px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider text-[#10b981] uppercase">
                    NATIVE & CROSS
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-white group-hover:text-[#10b981] transition-colors font-heading">
                  {(lang === "bn" && app.bn?.name) || app.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400 line-clamp-3">
                  {(lang === "bn" && app.bn?.tagline) || app.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Flutter", "React Native", "Swift", "Kotlin"].map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-white/[0.06] bg-black/30 px-2 py-0.5 text-[10px] font-mono text-zinc-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-[11px] font-mono text-zinc-400">
                <span>{t("steps_n", { n: app.steps })}</span>
                <span className="text-[#10b981] group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
