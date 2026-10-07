"use client";

import { useState } from "react";
import type { RoadmapStep as RoadmapStepType } from "@/lib/roadmap";

type RoadmapStepProps = {
  step: RoadmapStepType;
  index: number;
  total: number;
  slug: string;
};

export default function RoadmapStep({
  step,
  index,
  total,
  slug,
}: RoadmapStepProps) {
  const storageKey = `roadmap-progress-${slug}`;

  const [completed, setCompleted] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const saved = localStorage.getItem(storageKey);

    if (!saved) {
      return false;
    }

    try {
      const progress: number[] = JSON.parse(saved);

      return progress.includes(index);
    } catch {
      return false;
    }
  });

  const toggleComplete = () => {
    const saved = localStorage.getItem(storageKey);

    let progress: number[] = [];

    if (saved) {
      try {
        progress = JSON.parse(saved);
      } catch {
        progress = [];
      }
    }

    if (progress.includes(index)) {
      // Remove from completed
      progress = progress.filter((item) => item !== index);

      setCompleted(false);
    } else {
      // Add to completed
      progress = [...progress, index].sort((a, b) => a - b);

      setCompleted(true);
    }

    localStorage.setItem(storageKey, JSON.stringify(progress));

    // Notify RoadmapProgress component
    window.dispatchEvent(new Event("roadmap-progress-update"));
  };

  return (
    <div id={`roadmap-step-${index}`} className="scroll-mt-24">
      <div className="group relative grid gap-6 md:grid-cols-[80px_1fr]">
        {/* Timeline */}
        <div className="relative hidden md:block">
          {/* Connecting Line */}
          {index !== total - 1 && (
            <div className="absolute left-1/2 top-14 h-[calc(100%+24px)] w-px -translate-x-1/2 bg-linear-to-b from-violet-500/30 to-white/[0.04]" />
          )}

          {/* Step Number */}
          <div
            className={`relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-xl border text-sm font-bold transition-all duration-500 ${
              completed
                ? "border-violet-400/30 bg-violet-500/15 text-violet-300 shadow-[0_0_30px_rgba(139,92,246,0.15)]"
                : "border-violet-500/20 bg-[#080810] text-violet-300 group-hover:border-violet-400/40 group-hover:bg-violet-500/[0.08]"
            }`}
          >
            {completed ? "✓" : String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Main Card */}
        <div
          className={`rounded-2xl border bg-[#090910]/75 p-6 backdrop-blur-sm transition-all duration-500 sm:p-7 ${
            completed
              ? "border-violet-500/20 shadow-[0_0_40px_rgba(139,92,246,0.04)]"
              : "border-white/[0.07] group-hover:border-violet-500/15 group-hover:bg-[#0c0c15]"
          }`}
        >
          {/* Mobile Step Number */}
          <div className="mb-5 flex items-center gap-3 md:hidden">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-xs font-bold ${
                completed
                  ? "border-violet-400/30 bg-violet-500/15 text-violet-300"
                  : "border-violet-500/20 bg-violet-500/[0.06] text-violet-300"
              }`}
            >
              {completed ? "✓" : String(index + 1).padStart(2, "0")}
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-400">
              Stage {index + 1}
            </span>
          </div>

          {/* Header */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              {/* Level */}
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-500/70">
                {step.level}
              </span>

              {/* Title */}
              <h3
                className={`mt-2 text-xl font-semibold sm:text-2xl ${
                  completed ? "text-violet-100" : "text-white"
                }`}
              >
                {step.title}
              </h3>
            </div>

            {/* Topic Count */}
            <span className="w-fit rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium text-zinc-500">
              {step.topics.length} Topics
            </span>
          </div>

          {/* Topics */}
          <div className="mt-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">
              What to learn
            </p>

            <div className="flex flex-wrap gap-2">
              {step.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 py-2 text-xs text-zinc-400 transition duration-300 hover:border-violet-500/20 hover:bg-violet-500/[0.04] hover:text-violet-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Learning Outcome */}
          <div className="mt-7 rounded-xl border border-blue-500/10 bg-blue-500/[0.025] p-4">
            <div className="flex gap-3">
              <div className="mt-0.5 text-blue-400">✦</div>

              <div>
                <p className="text-xs font-semibold text-blue-300">
                  Learning Outcome
                </p>

                <p className="mt-1.5 text-sm leading-6 text-zinc-500">
                  {step.learning_outcome}
                </p>
              </div>
            </div>
          </div>

          {/* Projects */}
          {step.projects.length > 0 && (
            <div className="mt-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">
                Projects to build
              </p>

              <div className="grid gap-2 sm:grid-cols-2">
                {step.projects.map((project, projectIndex) => (
                  <div
                    key={project}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] p-3.5"
                  >
                    <span className="mt-0.5 text-xs text-violet-400">
                      {String(projectIndex + 1).padStart(2, "0")}
                    </span>

                    <span className="text-sm leading-5 text-zinc-400">
                      {project}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Complete Button */}
          <div className="mt-8 flex justify-end border-t border-white/[0.05] pt-5">
            <button
              type="button"
              onClick={toggleComplete}
              className={`group/complete flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all duration-300 ${
                completed
                  ? "border-violet-400/20 bg-violet-500/[0.08] text-violet-300 hover:bg-violet-500/[0.12]"
                  : "border-white/[0.08] bg-white/[0.02] text-zinc-500 hover:border-violet-500/20 hover:bg-violet-500/[0.05] hover:text-violet-300"
              }`}
            >
              {/* Checkbox */}
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-md border text-[10px] ${
                  completed
                    ? "border-violet-400/30 bg-violet-500/15"
                    : "border-white/[0.1]"
                }`}
              >
                {completed ? "✓" : ""}
              </span>

              {/* Button Text */}
              {completed ? "Completed" : "Mark as complete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
