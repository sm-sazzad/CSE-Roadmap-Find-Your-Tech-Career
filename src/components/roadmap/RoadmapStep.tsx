"use client";

import { useState } from "react";
import { BookOpen, CheckCircle2, ChevronDown, Clock, ExternalLink, Lightbulb } from "lucide-react";
import { useLang, phrase, num } from "@/lib/i18n";
import { useProgress } from "@/lib/progress";
import type { RoadmapStep as StepType } from "@/lib/roadmap";

type Props = {
  slug: string;
  step: StepType;
  index: number;
  number: number;
  isLast: boolean;
  defaultOpen?: boolean;
};

const levelColor: Record<string, string> = {
  Beginner: "text-[#00f5a0] border-[#00f5a0]/30 bg-[#00f5a0]/[0.08]",
  Intermediate: "text-amber-400 border-amber-400/30 bg-amber-400/[0.08]",
  Advanced: "text-rose-400 border-rose-400/30 bg-rose-400/[0.08]",
};

export default function RoadmapStep({
  slug,
  step,
  index,
  number,
  isLast,
  defaultOpen = false,
}: Props) {
  const { t, lang } = useLang();
  const {
    setStepCompleted,
    setCheck,
    isStepCompleted,
    isCheckChecked,
  } = useProgress(slug);

  const [open, setOpen] = useState(defaultOpen);
  const completed = isStepCompleted(index);

  const toggleComplete = () => {
    setStepCompleted(index, !completed);
  };

  const toggleCheck = (id: string) => {
    setCheck(id, !isCheckChecked(id));
  };

  const readiness = [step.learning_outcome, ...step.projects];
  const lvl = step.level as "Beginner" | "Intermediate" | "Advanced";

  return (
    <div id={`roadmap-step-${index}`} className="relative flex gap-4 scroll-mt-28 sm:gap-6">
      {/* Step Node Marker */}
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={toggleComplete}
          aria-label={t("mark")}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
            completed
              ? "border-[#00f5a0]/70 bg-[#00f5a0]/20 text-[#00f5a0] shadow-[0_0_24px_rgba(0,245,160,0.35)]"
              : "border-white/10 bg-[#0d1220] text-zinc-400 hover:border-[#00f5a0]/60 hover:text-white"
          }`}
        >
          {completed ? "✓" : num(number, lang)}
        </button>
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-gradient-to-b from-[#00f5a0]/30 via-white/[0.08] to-white/[0.02]" />
        )}
      </div>

      {/* Step Card */}
      <article
        className={`glass-card mb-6 min-w-0 flex-1 rounded-2xl border transition duration-300 ${
          completed ? "border-[#00f5a0]/30 bg-[#0d1322]" : "border-white/[0.07] bg-[#0a0d18]"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6 cursor-pointer"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-md border px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider ${
                  levelColor[step.level] ?? levelColor.Beginner
                }`}
              >
                {t(`lvl_${lvl}` as "lvl_Beginner")}
              </span>
              {step.estimated_time && (
                <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                  <Clock className="h-3 w-3" />
                  {phrase(step.estimated_time, lang)}
                </span>
              )}
              <span className="text-[11px] font-mono text-zinc-500">
                · {t("topics_n", { n: step.topics.length })}
              </span>
            </div>
            <h3 className="mt-2 text-lg font-bold text-white sm:text-xl font-heading">
              {step.title}
            </h3>
            {!open && step.simple_explanation && (
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">
                {step.simple_explanation}
              </p>
            )}
          </div>
          <span
            className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-zinc-400 transition-transform duration-300 ${
              open ? "rotate-180 text-white" : ""
            }`}
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </button>

        {open && (
          <div className="space-y-6 border-t border-white/[0.06] p-5 sm:p-6">
            {/* Simple Explanation Box */}
            {step.simple_explanation && (
              <div className="rounded-xl border border-[#00f5a0]/25 bg-[#00f5a0]/[0.04] p-4">
                <p className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#00f5a0]">
                  <Lightbulb className="h-4 w-4" />
                  {t("simple_t")}
                </p>
                <p className="mt-2 text-sm leading-7 text-zinc-300">
                  {step.simple_explanation}
                </p>
              </div>
            )}

            {/* Topics */}
            <div>
              <p className="mb-3 text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-zinc-400">
                {t("learn_t")}
              </p>
              <div className="flex flex-wrap gap-2">
                {step.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-lg border border-white/[0.07] bg-[#121828] px-3 py-1.5 text-xs font-mono text-zinc-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Resources */}
            {step.resources && step.resources.length > 0 && (
              <div>
                <p className="mb-3 flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  <BookOpen className="h-3.5 w-3.5 text-[#00f5a0]" />
                  {t("step_res_t")}
                </p>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {step.resources.map((r) => (
                    <a
                      key={r.url}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#0c101c] p-3.5 transition hover:border-[#00f5a0]/40 hover:bg-[#00f5a0]/[0.04]"
                    >
                      <span className="text-sm font-medium leading-5 text-zinc-300 group-hover:text-white">
                        {r.name}
                      </span>
                      <span className="flex shrink-0 items-center gap-1 rounded-md border border-white/[0.06] bg-black/40 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400 group-hover:text-[#00f5a0]">
                        {t(`t_${r.type}` as "t_Course")}
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Readiness Checklist */}
            <div>
              <p className="flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-zinc-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#00f5a0]" />
                {t("ready_t")}
              </p>
              <p className="mb-3 mt-1 text-xs text-zinc-500">{t("ready_s")}</p>
              <ul className="space-y-2">
                {readiness.map((text, j) => {
                  const id = `${index}-${j}`;
                  const checked = isCheckChecked(id);
                  return (
                    <li key={id}>
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.05] bg-black/30 p-3 text-sm leading-6 text-zinc-300 transition hover:border-white/10 hover:bg-white/[0.02]">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCheck(id)}
                          className="mt-1 h-4 w-4 shrink-0 rounded accent-[#00f5a0]"
                        />
                        <span className={checked ? "text-zinc-500 line-through" : ""}>
                          {text}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Mark Complete CTA */}
            <button
              type="button"
              onClick={toggleComplete}
              className={`w-full rounded-xl px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                completed
                  ? "border border-[#00f5a0]/40 bg-[#00f5a0]/15 text-[#00f5a0]"
                  : "bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] text-black shadow-[0_0_20px_rgba(0,245,160,0.25)] hover:shadow-[0_0_30px_rgba(0,245,160,0.4)] hover:scale-[1.01]"
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
