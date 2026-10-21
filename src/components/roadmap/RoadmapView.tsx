"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import RoadmapStep from "./RoadmapStep";
import RoadmapProgress from "./RoadmapProgress";
import SectorCard from "../SectorCard";
import Reveal from "../ui/Reveal";
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
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
      {children}
    </p>
  );
}

function ListCard({
  icon,
  title,
  items,
}: {
  icon: string;
  title: string;
  items?: string[];
}) {
  if (!items || items.length === 0) return null;
  return (
    <div className="glass glow-border rounded-2xl p-6">
      <h3 className="flex items-center gap-2 text-base font-semibold text-white">
        <span>{icon}</span>
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChipCard({ icon, title, items }: { icon: string; title: string; items: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="flex items-center gap-2 text-base font-semibold text-white">
        <span>{icon}</span>
        {title}
      </h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300"
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
  const r = useMemo(() => localizeRoadmap(roadmap, bn, lang), [roadmap, bn, lang]);

  const [track, setTrack] = useState("all");
  const [resType, setResType] = useState("all");

  const activeTrack = r.tracks?.find((x) => x.id === track);

  const visible = useMemo(
    () =>
      r.steps
        .map((step, index) => ({ step, index }))
        .filter(({ step }) => track === "all" || !step.tracks || step.tracks.includes(track)),
    [r.steps, track]
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
    [r.resources]
  );
  const shownResources = r.resources.filter((x) => resType === "all" || x.type === resType);

  const showPartial = lang === "bn" && !bn?.complete;
  let counter = 0;

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
    ...(r.weekly_hours ? [{ label: t("meta_weekly"), value: phrase(r.weekly_hours, lang) }] : []),
    { label: t("meta_steps"), value: num(r.steps.length, lang) },
  ];

  return (
    <main className="relative isolate overflow-x-clip">
      {/* HERO */}
      <section className="relative">
        <div className="aurora" />
        <div className="grid-fade absolute inset-0 -z-10 opacity-50" />
        <div className="mx-auto w-[min(1180px,calc(100%-32px))] pb-14 pt-12 sm:pt-16">
          <Link href="/sector" className="text-sm text-zinc-500 transition hover:text-violet-300">
            {t("back_all")}
          </Link>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-violet-400/25 bg-gradient-to-br from-violet-500/20 to-sky-500/10 text-4xl shadow-[0_0_60px_rgba(139,92,246,0.25)]">
              {r.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl">
                <span className="gradient-text">{r.name}</span>
              </h1>
              {r.tagline && (
                <p className="mt-3 text-lg text-zinc-300">{r.tagline}</p>
              )}
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400">{r.overview}</p>

          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="glass rounded-2xl px-5 py-4">
                <dt className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">{m.label}</dt>
                <dd className="mt-1.5 text-sm font-semibold text-white sm:text-base">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#path"
              className="rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(124,58,237,0.35)] transition hover:-translate-y-0.5"
            >
              {t("btn_start")} →
            </a>
            <a
              href="#resources"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/[0.07]"
            >
              {t("btn_resources")}
            </a>
          </div>

          {showPartial && (
            <p className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-3 text-sm text-amber-200/90">
              ℹ️ {t("partial_note")}
            </p>
          )}
        </div>
      </section>

      {/* STICKY SECTION NAV */}
      <div className="sticky top-[72px] z-30 border-y border-white/[0.06] bg-[#05050a]/80 backdrop-blur-xl">
        <nav className="no-scrollbar mx-auto flex w-[min(1180px,calc(100%-32px))] gap-1 overflow-x-auto py-2">
          {nav
            .filter((n) => n.show)
            .map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="shrink-0 rounded-lg px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
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
            <ListCard icon="🎯" title={t("who_t")} items={r.who_is_this_for} />
            <ListCard icon="💡" title={t("why_t2")} items={r.why_learn} />
            <ListCard icon="🛠️" title={t("build_t")} items={r.what_you_will_build} />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <ListCard icon="📌" title={t("prereq_t")} items={r.prerequisites} />
            <ChipCard icon="⚡" title={t("skills_t")} items={r.skills} />
            <ChipCard icon="🧰" title={t("tools_t")} items={r.tools} />
          </div>

          {r.how_to_start && r.how_to_start.length > 0 && (
            <div className="relative mt-4 overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 via-transparent to-sky-500/[0.06] p-6 sm:p-8">
              <Kicker>{t("start_k")}</Kicker>
              <h2 className="mt-2 text-2xl font-semibold text-white">{t("start_t")}</h2>
              <ol className="mt-6 grid gap-3 md:grid-cols-3">
                {r.how_to_start.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-white/[0.07] bg-[#08080f]/70 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-bold text-violet-200">
                      {num(i + 1, lang)}
                    </span>
                    <span className="text-sm leading-6 text-zinc-300">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>

        {/* PATH */}
        <section id="path" className="scroll-mt-32 pt-24">
          <Kicker>{t("path_k")}</Kicker>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{t("path_t")}</h2>
          <p className="mt-3 max-w-2xl text-zinc-500">{t("path_s")}</p>

          {r.tracks && r.tracks.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                {t("track_t")}
              </p>
              <div className="grid gap-3 md:grid-cols-4">
                {[{ id: "all", name: t("track_all"), tagline: r.name, summary: "", roles: [] as string[] }, ...r.tracks].map(
                  (tr) => (
                    <button
                      key={tr.id}
                      type="button"
                      onClick={() => setTrack(tr.id)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        track === tr.id
                          ? "border-violet-400/60 bg-violet-500/[0.12] shadow-[0_0_30px_rgba(139,92,246,0.2)]"
                          : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05]"
                      }`}
                    >
                      <p className="text-sm font-semibold text-white">{tr.name}</p>
                      <p className="mt-1 text-xs leading-5 text-zinc-500">{tr.tagline}</p>
                    </button>
                  )
                )}
              </div>

              {activeTrack && (
                <div className="mt-4 rounded-2xl border border-violet-500/15 bg-violet-500/[0.04] p-5 text-sm leading-7 text-zinc-300">
                  <p>{activeTrack.summary}</p>
                  {activeTrack.roles && activeTrack.roles.length > 0 && (
                    <p className="mt-3 text-xs text-zinc-500">
                      <span className="font-semibold text-zinc-400">{t("track_roles")}:</span>{" "}
                      {activeTrack.roles.join(" · ")}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-violet-300">
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
                    <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-200">
                      {t(`lvl_${phase.level}` as "lvl_Beginner")}
                    </span>
                    <span className="text-sm font-semibold text-zinc-300">
                      {t(`ph_${phase.level}` as "ph_Beginner")}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>

                  {phase.items.map(({ step, index }) => {
                    counter += 1;
                    return (
                      <RoadmapStep
                        key={`${track}-${index}`}
                        slug={r.slug}
                        step={step}
                        index={index}
                        number={counter}
                        isLast={counter === visible.length}
                        defaultOpen={counter === 1}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            <RoadmapProgress key={track} slug={r.slug} items={progressItems} />
          </div>

          {r.career_roles.length > 0 && (
            <div className="glass mt-10 rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-white">🚀 {t("careers_t")}</h3>
              <p className="mt-1 text-sm text-zinc-500">{t("careers_s")}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {r.career_roles.map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-violet-400/20 bg-violet-500/[0.07] px-4 py-2 text-sm text-violet-100"
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
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{t("res_t")}</h2>
            <p className="mt-3 text-zinc-500">{t("res_s")}</p>

            <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto">
              {["all", ...resourceTypes].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setResType(type)}
                  className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                    resType === type
                      ? "border-violet-400/50 bg-violet-500/20 text-white"
                      : "border-white/[0.08] text-zinc-400 hover:text-white"
                  }`}
                >
                  {type === "all" ? t("res_all") : t(`t_${type}` as "t_Course")}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {shownResources.map((res) => (
                <a
                  key={res.url}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glow-border group flex flex-col rounded-2xl p-5 transition duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-0.5 text-[11px] font-medium text-violet-200">
                      {t(`t_${res.type}` as "t_Course")}
                    </span>
                    <span className="text-zinc-600 transition group-hover:text-violet-300">↗</span>
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{res.name}</h3>
                  {res.description && (
                    <p className="mt-2 flex-1 text-sm leading-6 text-zinc-500">{res.description}</p>
                  )}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* GLOSSARY */}
        {r.glossary && r.glossary.length > 0 && (
          <section id="glossary" className="scroll-mt-32 pt-24">
            <Kicker>{t("nav_glossary")}</Kicker>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{t("gloss_t")}</h2>
            <p className="mt-3 text-zinc-500">{t("gloss_s")}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {r.glossary.map((g) => (
                <div key={g.term} className="glass rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-violet-200">{g.term}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{g.meaning}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {r.faq && r.faq.length > 0 && (
          <section id="faq" className="scroll-mt-32 pt-24">
            <Kicker>{t("nav_faq")}</Kicker>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{t("faq_t")}</h2>
            <div className="mt-8 grid gap-3 lg:grid-cols-2">
              {r.faq.map((f) => (
                <details
                  key={f.question}
                  className="glass group rounded-2xl p-5 open:border-violet-400/25"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-zinc-100">
                    {f.question}
                    <span className="text-violet-300 transition group-open:rotate-45">＋</span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* FINAL PROJECT */}
        <section className="pt-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-600/15 via-[#0b0a16] to-sky-500/10 p-8 sm:p-12">
              <div className="grid-fade absolute inset-0 opacity-30" />
              <div className="relative">
                <Kicker>🏆 {t("final_k")}</Kicker>
                <h2 className="mt-2 text-3xl font-bold text-white">{t("final_t")}</h2>
                <p className="mt-2 text-sm text-zinc-500">{t("final_s")}</p>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200">{r.final_project}</p>
                <ul className="mt-6 flex flex-wrap gap-2 text-xs text-zinc-300">
                  {(["final_1", "final_2", "final_3"] as TKey[]).map((k) => (
                    <li key={k} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5">
                      ✓ {t(k)}
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
            <h2 className="text-2xl font-bold text-white">{t("related_t")}</h2>
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
