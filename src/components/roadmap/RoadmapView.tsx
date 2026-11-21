"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Check,
  ChevronDown,
  Layers,
  Lightbulb,
  Pin,
  Sparkles,
  Target,
  Trophy,
  Wrench,
  Zap,
} from "lucide-react";
import RoadmapStep from "./RoadmapStep";
import RoadmapProgress from "./RoadmapProgress";
import SectorCard from "../SectorCard";
import Reveal from "../ui/Reveal";
import SectorIcon from "../ui/SectorIcon";
import { useLang, phrase, num, type TKey } from "@/lib/i18n";
import { localizeRoadmap } from "@/lib/localize";
import type { BnRoadmap, CatalogItem, Roadmap } from "@/lib/roadmap";

type Props = {
  roadmap: Roadmap;
  bn?: BnRoadmap;
  related: CatalogItem[];
};

const PHASES = ["Beginner", "Intermediate", "Advanced"] as const;

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#00f5a0]">
      {children}
    </p>
  );
}

function ListCard({
  icon: Icon,
  title,
  items,
  accent = "#00f5a0",
}: {
  icon: React.ElementType;
  title: string;
  items?: string[];
  accent?: string;
}) {
  if (!items || items.length === 0) return null;
  return (
    <div className="glass-card rounded-2xl border border-white/[0.08] bg-[#0b0f1a] p-6 transition-all duration-300 hover:border-[#00f5a0]/30">
      <h3 className="flex items-center gap-2.5 text-base font-bold text-white font-heading">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05]"
          style={{ color: accent }}
        >
          <Icon className="h-4 w-4" />
        </span>
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: accent }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChipCard({
  icon: Icon,
  title,
  items,
  accent = "#00d2ff",
}: {
  icon: React.ElementType;
  title: string;
  items: string[];
  accent?: string;
}) {
  if (!items || items.length === 0) return null;
  return (
    <div className="glass-card rounded-2xl border border-white/[0.08] bg-[#0b0f1a] p-6 transition-all duration-300 hover:border-[#00d2ff]/30">
      <h3 className="flex items-center gap-2.5 text-base font-bold text-white font-heading">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05]"
          style={{ color: accent }}
        >
          <Icon className="h-4 w-4" />
        </span>
        {title}
      </h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-lg border border-white/[0.08] bg-[#121828] px-3 py-1.5 text-xs font-mono text-zinc-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RoadmapView({ roadmap, bn, related }: Props) {
  const { lang, t } = useLang();
  const r = useMemo(
    () => localizeRoadmap(roadmap, bn, lang),
    [roadmap, bn, lang],
  );

  const [track, setTrack] = useState("all");
  const [resType, setResType] = useState("all");

  const activeTrack = r.tracks?.find((x) => x.id === track);

  const visible = useMemo(
    () =>
      r.steps
        .map((step, index) => ({ step, index }))
        .filter(
          ({ step }) =>
            track === "all" || !step.tracks || step.tracks.includes(track),
        ),
    [r.steps, track],
  );

  const phases = PHASES.map((level) => ({
    level,
    items: visible.filter((v) => v.step.level === level),
  })).filter((p) => p.items.length > 0);

  const progressItems = visible.map(({ step, index }) => ({
    index,
    title: step.title,
    level: step.level,
  }));

  const resourceTypes = useMemo(
    () => Array.from(new Set(r.resources.map((x) => x.type))),
    [r.resources],
  );
  const shownResources = r.resources.filter(
    (x) => resType === "all" || x.type === resType,
  );

  const showPartial = lang === "bn" && !bn?.complete;

  const nav: { id: string; key: TKey; show: boolean }[] = [
    { id: "overview", key: "nav_overview", show: true },
    { id: "path", key: "nav_path", show: true },
    { id: "resources", key: "nav_resources", show: r.resources.length > 0 },
    { id: "glossary", key: "nav_glossary", show: !!r.glossary?.length },
    { id: "faq", key: "nav_faq", show: !!r.faq?.length },
  ];

  const meta = [
    { label: t("meta_level"), value: phrase(r.difficulty, lang) },
    { label: t("meta_time"), value: phrase(r.estimated_time, lang) },
    ...(r.weekly_hours
      ? [{ label: t("meta_weekly"), value: phrase(r.weekly_hours, lang) }]
      : []),
    { label: t("meta_steps"), value: num(r.steps.length, lang) },
  ];

  return (
    <main className="relative isolate overflow-x-clip bg-[#06080e]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[0.07] bg-gradient-to-b from-[#0a0f1d] to-[#06080e]">
        <div className="ambient-glow" />
        <div className="grid-mesh absolute inset-0 -z-10 opacity-50" />
        <div className="mx-auto w-[min(1180px,calc(100%-32px))] pb-16 pt-12 sm:pt-16">
          <Link
            href="/sector"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 transition hover:text-[#00f5a0]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("back_all")}
          </Link>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/[0.1] bg-[#111728] text-[#00f5a0] shadow-[0_0_40px_rgba(0,245,160,0.2)]">
              <SectorIcon slug={r.slug} className="h-10 w-10" fallbackIcon={r.icon} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#00f5a0]">
                <Sparkles className="h-3 w-3" />
                VERIFIED ARCHITECTURE
              </div>
              <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-5xl font-heading">
                <span className="gradient-text">{r.name}</span>
              </h1>
              {r.tagline && (
                <p className="mt-2 text-base text-zinc-300 sm:text-lg">{r.tagline}</p>
              )}
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
            {r.overview}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono">
            {meta.map((m) => (
              <div key={m.label} className="glass rounded-2xl border border-white/[0.07] px-5 py-4">
                <dt className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  {m.label}
                </dt>
                <dd className="mt-1 text-sm font-bold text-white sm:text-base">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#path"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-black shadow-[0_0_25px_rgba(0,245,160,0.3)] transition hover:shadow-[0_0_35px_rgba(0,245,160,0.5)] hover:scale-105"
            >
              {t("btn_start")} →
            </a>
            <a
              href="#resources"
              className="rounded-xl border border-white/10 bg-[#0c101c] px-6 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300 transition hover:border-white/20 hover:text-white"
            >
              {t("btn_resources")}
            </a>
          </div>

          {showPartial && (
            <p className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-3 text-xs font-mono text-amber-200">
              ℹ️ {t("partial_note")}
            </p>
          )}
        </div>
      </section>

      {/* STICKY SECTION NAV */}
      <div className="sticky top-[72px] z-30 border-y border-white/[0.07] bg-[#06080e]/90 backdrop-blur-xl">
        <nav className="no-scrollbar mx-auto flex w-[min(1180px,calc(100%-32px))] gap-1 overflow-x-auto py-2.5">
          {nav
            .filter((n) => n.show)
            .map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="shrink-0 rounded-lg px-4 py-2 text-xs font-mono font-medium text-zinc-400 transition hover:bg-white/[0.05] hover:text-[#00f5a0]"
              >
                {t(n.key)}
              </a>
            ))}
        </nav>
      </div>

      <div className="mx-auto w-[min(1180px,calc(100%-32px))] pb-24">
        {/* OVERVIEW */}
        <section id="overview" className="scroll-mt-32 pt-16">
          <div className="grid gap-4 lg:grid-cols-3">
            <ListCard icon={Target} title={t("who_t")} items={r.who_is_this_for} accent="#00f5a0" />
            <ListCard icon={Lightbulb} title={t("why_t2")} items={r.why_learn} accent="#00d2ff" />
            <ListCard
              icon={Wrench}
              title={t("build_t")}
              items={r.what_you_will_build}
              accent="#f59e0b"
            />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <ListCard icon={Pin} title={t("prereq_t")} items={r.prerequisites} accent="#38bdf8" />
            <ChipCard icon={Zap} title={t("skills_t")} items={r.skills} accent="#00f5a0" />
            <ChipCard icon={Layers} title={t("tools_t")} items={r.tools} accent="#a78bfa" />
          </div>

          {r.how_to_start && r.how_to_start.length > 0 && (
            <div className="relative mt-5 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0c1120] to-[#070912] p-6 sm:p-8">
              <Kicker>{t("start_k")}</Kicker>
              <h2 className="mt-2 text-2xl font-bold text-white font-heading">
                {t("start_t")}
              </h2>
              <ol className="mt-6 grid gap-3 md:grid-cols-3">
                {r.how_to_start.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-2xl border border-white/[0.06] bg-[#0c101c]/90 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#00f5a0]/15 text-xs font-mono font-bold text-[#00f5a0]">
                      {num(i + 1, lang)}
                    </span>
                    <span className="text-sm leading-6 text-zinc-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>

        {/* PATH */}
        <section id="path" className="scroll-mt-32 pt-24">
          <Kicker>{t("path_k")}</Kicker>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl font-heading">
            {t("path_t")}
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">{t("path_s")}</p>

          {r.tracks && r.tracks.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-500">
                {t("track_t")}
              </p>
              <div className="grid gap-3 md:grid-cols-4">
                {[
                  {
                    id: "all",
                    name: t("track_all"),
                    tagline: r.name,
                    summary: "",
                    roles: [] as string[],
                  },
                  ...r.tracks,
                ].map((tr) => (
                  <button
                    key={tr.id}
                    type="button"
                    onClick={() => setTrack(tr.id)}
                    className={`rounded-2xl border p-4 text-left transition duration-200 cursor-pointer ${
                      track === tr.id
                        ? "border-[#00f5a0]/50 bg-[#00f5a0]/[0.08] shadow-[0_0_20px_rgba(0,245,160,0.15)]"
                        : "border-white/[0.08] bg-[#0c101c] hover:border-white/20"
                    }`}
                  >
                    <p className="text-sm font-bold text-white font-heading">
                      {tr.name}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-zinc-400">
                      {tr.tagline}
                    </p>
                  </button>
                ))}
              </div>

              {activeTrack && (
                <div className="mt-4 rounded-2xl border border-white/[0.08] bg-[#0c101c] p-5 text-sm leading-7 text-zinc-300">
                  <p>{activeTrack.summary}</p>
                  {activeTrack.roles && activeTrack.roles.length > 0 && (
                    <p className="mt-3 text-xs text-zinc-400">
                      <span className="font-semibold text-white">
                        {t("track_roles")}:
                      </span>{" "}
                      {activeTrack.roles.join(" · ")}
                    </p>
                  )}
                  <p className="mt-2 text-xs font-mono text-[#00f5a0]">
                    {t("track_n", { n: visible.length })}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
            <div>
              {phases.map((phase) => (
                <div key={phase.level} className="mb-4">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="rounded-full border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#00f5a0]">
                      {t(`lvl_${phase.level}` as "lvl_Beginner")}
                    </span>
                    <span className="text-sm font-bold text-zinc-200 font-heading">
                      {t(`ph_${phase.level}` as "ph_Beginner")}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>

                  {phase.items.map(({ step, index }) => {
                    const number = index + 1;
                    return (
                      <RoadmapStep
                        key={`${track}-${index}`}
                        slug={r.slug}
                        step={step}
                        index={index}
                        number={number}
                        isLast={number === visible.length}
                        defaultOpen={number === 1}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            <RoadmapProgress key={track} slug={r.slug} items={progressItems} />
          </div>

          {r.career_roles.length > 0 && (
            <div className="glass mt-12 rounded-3xl border border-white/[0.08] p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#00f5a0]" />
                <h3 className="text-xl font-bold text-white font-heading">
                  {t("careers_t")}
                </h3>
              </div>
              <p className="mt-1 text-sm text-zinc-400">{t("careers_s")}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {r.career_roles.map((role) => (
                  <span
                    key={role}
                    className="rounded-xl border border-white/[0.08] bg-[#0c101c] px-4 py-2 text-xs font-mono text-zinc-200"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* RESOURCES */}
        {r.resources.length > 0 && (
          <section id="resources" className="scroll-mt-32 pt-24">
            <Kicker>{t("nav_resources")}</Kicker>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl font-heading">
              {t("res_t")}
            </h2>
            <p className="mt-3 text-zinc-400">{t("res_s")}</p>

            <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto">
              {["all", ...resourceTypes].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setResType(type)}
                  className={`shrink-0 rounded-xl border px-4 py-1.5 text-xs font-mono font-medium transition cursor-pointer ${
                    resType === type
                      ? "border-[#00f5a0]/50 bg-[#00f5a0]/15 text-white"
                      : "border-white/[0.08] bg-[#0c101c] text-zinc-400 hover:text-white"
                  }`}
                >
                  {type === "all" ? t("res_all") : t(`t_${type}` as "t_Course")}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shownResources.map((res) => (
                <a
                  key={res.url}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0c101c] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#00f5a0]/40"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-md border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#00f5a0]">
                        {t(`t_${res.type}` as "t_Course")}
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.06] text-zinc-500 group-hover:border-[#00f5a0]/30 group-hover:text-[#00f5a0]">
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                    <h3 className="mt-4 font-bold text-white group-hover:text-[#00f5a0] transition-colors font-heading">
                      {res.name}
                    </h3>
                    {res.description && (
                      <p className="mt-2 text-xs leading-6 text-zinc-400">
                        {res.description}
                      </p>
                    )}
                  </div>
                  <span className="mt-4 text-[11px] font-mono text-zinc-500 group-hover:text-zinc-300">
                    Open Resource ↗
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* GLOSSARY */}
        {r.glossary && r.glossary.length > 0 && (
          <section id="glossary" className="scroll-mt-32 pt-24">
            <Kicker>{t("nav_glossary")}</Kicker>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl font-heading">
              {t("gloss_t")}
            </h2>
            <p className="mt-3 text-zinc-400">{t("gloss_s")}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {r.glossary.map((g) => (
                <div key={g.term} className="glass rounded-2xl border border-white/[0.07] bg-[#0c101c] p-5">
                  <h3 className="text-sm font-bold font-mono text-[#00f5a0]">
                    {g.term}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-zinc-400">
                    {g.meaning}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {r.faq && r.faq.length > 0 && (
          <section id="faq" className="scroll-mt-32 pt-24">
            <Kicker>{t("nav_faq")}</Kicker>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl font-heading">
              {t("faq_t")}
            </h2>
            <div className="mt-8 grid gap-3 lg:grid-cols-2">
              {r.faq.map((f) => (
                <details
                  key={f.question}
                  className="glass group rounded-2xl border border-white/[0.07] bg-[#0c101c] p-5 transition open:border-[#00f5a0]/30"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-bold text-zinc-200">
                    {f.question}
                    <ChevronDown className="h-4 w-4 text-zinc-400 transition group-open:rotate-180 group-open:text-[#00f5a0]" />
                  </summary>
                  <p className="mt-3 text-xs leading-6 text-zinc-400">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* FINAL CAPSTONE */}
        <section className="pt-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-br from-[#0c1322] via-[#090d18] to-[#06080e] p-8 sm:p-12">
              <div className="grid-mesh absolute inset-0 opacity-30 pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-3 py-1 text-xs font-mono font-medium text-[#00f5a0]">
                  <Trophy className="h-3.5 w-3.5" />
                  {t("final_k")}
                </div>
                <h2 className="mt-3 text-3xl font-extrabold text-white font-heading">
                  {t("final_t")}
                </h2>
                <p className="mt-2 text-sm text-zinc-400">{t("final_s")}</p>
                <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-300">
                  {r.final_project}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-zinc-300">
                  {(["final_1", "final_2", "final_3"] as TKey[]).map((k) => (
                    <li
                      key={k}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-3.5 py-1.5"
                    >
                      <Check className="h-3.5 w-3.5 text-[#00f5a0]" />
                      {t(k)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="pt-24">
            <h2 className="text-2xl font-extrabold text-white font-heading">{t("related_t")}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <SectorCard key={item.slug} item={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
