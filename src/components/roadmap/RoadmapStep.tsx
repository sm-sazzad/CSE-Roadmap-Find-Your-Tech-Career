"use client";

import { useEffect, useState } from "react";
import { useLang, phrase, num } from "@/lib/i18n";
import type { RoadmapStep as StepType } from "@/lib/roadmap";

type Props = {
  slug: string;
  step: StepType;
  /** Original position in the roadmap (used for saving progress). */
  index: number;
  /** Number shown to the learner (position inside the chosen track). */
  number: number;
  isLast: boolean;
  defaultOpen?: boolean;
};

const levelColor: Record<string, string> = {
  Beginner: "text-emerald-300 border-emerald-400/25 bg-emerald-400/[0.07]",
  Intermediate: "text-amber-300 border-amber-400/25 bg-amber-400/[0.07]",
  Advanced: "text-rose-300 border-rose-400/25 bg-rose-400/[0.07]",
};

function readList(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function RoadmapStep({
  slug,
  step,
  index,
  number,
  isLast,
  defaultOpen = false,
}: Props) {
  const { t, lang } = useLang();
  const progressKey = `roadmap-progress-${slug}`;
  const checksKey = `roadmap-checks-${slug}`;

  const [open, setOpen] = useState(defaultOpen);
  const [completed, setCompleted] = useState(false);
  const [checks, setChecks] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => {
      setCompleted(readList(progressKey).map(Number).includes(index));
      setChecks(readList(checksKey));
    };
    sync();
    window.addEventListener("roadmap-progress-update", sync);
    return () => window.removeEventListener("roadmap-progress-update", sync);
  }, [progressKey, checksKey, index]);

  const toggleComplete = () => {
    const list = readList(progressKey).map(Number);
    const next = list.includes(index)
      ? list.filter((i) => i !== index)
      : [...list, index];
    localStorage.setItem(progressKey, JSON.stringify(next));
    window.dispatchEvent(new Event("roadmap-progress-update"));
  };

  const toggleCheck = (id: string) => {
    const list = readList(checksKey);
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
    localStorage.setItem(checksKey, JSON.stringify(next));
    window.dispatchEvent(new Event("roadmap-progress-update"));
  };

  const readiness = [step.learning_outcome, ...step.projects];
  const lvl = step.level as "Beginner" | "Intermediate" | "Advanced";

  return (
    <div id={`roadmap-step-${index}`} className="relative flex gap-4 scroll-mt-28 sm:gap-6">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={toggleComplete}
          aria-label={t("mark")}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition duration-300 ${
            completed
              ? "border-emerald-400/60 bg-emerald-400/20 text-emerald-200 shadow-[0_0_24px_rgba(52,211,153,0.35)]"
              : "border-violet-500/30 bg-[#0c0a18] text-violet-200 hover:border-violet-400/70"
          }`}
        >
          {completed ? "✓" : num(number, lang)}
        </button>
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-gradient-to-b from-violet-500/40 to-white/[0.04]" />
        )}
      </div>

      {/* Card */}
      <article
        className={`glass mb-6 min-w-0 flex-1 rounded-2xl transition duration-300 ${
          completed ? "border-emerald-400/20" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                  levelColor[step.level] ?? levelColor.Beginner
                }`}
              >
                {t(`lvl_${lvl}` as "lvl_Beginner")}
              </span>
              {step.estimated_time && (
                <span className="text-[11px] text-zinc-500">
                  ⏱ {phrase(step.estimated_time, lang)}
                </span>
              )}
              <span className="text-[11px] text-zinc-600">
                · {t("topics_n", { n: step.topics.length })}
              </span>
            </div>
            <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
              {step.title}
            </h3>
            {!open && step.simple_explanation && (
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
                {step.simple_explanation}
              </p>
            )}
          </div>
          <span
            className={`mt-1 shrink-0 text-zinc-500 transition duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            ⌄
          </span>
        </button>

        {open && (
          <div className="space-y-7 border-t border-white/[0.06] p-5 sm:p-6">
            {step.simple_explanation && (
              <div className="rounded-xl border border-violet-500/15 bg-violet-500/[0.05] p-4">
                <p className="text-xs font-semibold text-violet-300">
                  💡 {t("simple_t")}
                </p>
                <p className="mt-2 text-sm leading-7 text-zinc-300">
                  {step.simple_explanation}
                </p>
              </div>
            )}

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                {t("learn_t")}
              </p>
              <div className="flex flex-wrap gap-2">
                {step.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {step.resources && step.resources.length > 0 && (
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  📖 {t("step_res_t")}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {step.resources.map((r) => (
                    <a
                      key={r.url}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition hover:border-violet-400/30 hover:bg-violet-500/[0.06]"
                    >
                      <span className="text-sm leading-5 text-zinc-300">{r.name}</span>
                      <span className="shrink-0 text-[10px] uppercase tracking-wider text-zinc-500 group-hover:text-violet-300">
                        {t(`t_${r.type}` as "t_Course")} ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                ✅ {t("ready_t")}
              </p>
              <p className="mb-3 mt-1 text-xs text-zinc-600">{t("ready_s")}</p>
              <ul className="space-y-2">
                {readiness.map((text, j) => {
                  const id = `${index}-${j}`;
                  const checked = checks.includes(id);
                  return (
                    <li key={id}>
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] p-3 text-sm leading-6 text-zinc-300 transition hover:bg-white/[0.04]">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCheck(id)}
                          className="mt-1 h-4 w-4 shrink-0 accent-violet-500"
                        />
                        <span className={checked ? "text-zinc-500 line-through" : ""}>
                          {j === 0 ? "🎯 " : "🛠 "}
                          {text}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              type="button"
              onClick={toggleComplete}
              className={`w-full rounded-xl px-5 py-3 text-sm font-semibold transition ${
                completed
                  ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                  : "bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-[0_8px_30px_rgba(124,58,237,0.3)] hover:-translate-y-0.5"
              }`}
            >
              {completed ? `✓ ${t("done")}` : t("mark")}
            </button>
          </div>
        )}
      </article>
    </div>
  );
}
