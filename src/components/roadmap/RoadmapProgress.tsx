"use client";

import { useEffect, useState } from "react";

type RoadmapProgressProps = {
  slug: string;
  steps: {
    title: string;
    level: string;
  }[];
};

export default function RoadmapProgress({ slug, steps }: RoadmapProgressProps) {
  const [completed, setCompleted] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const storageKey = `roadmap-progress-${slug}`;

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (!saved) {
      setCompleted([]);
      return;
    }

    try {
      setCompleted(JSON.parse(saved));
    } catch {
      setCompleted([]);
    }
  }, [storageKey]);

  // Sync progress when RoadmapStep updates localStorage
  useEffect(() => {
    const syncProgress = () => {
      const saved = localStorage.getItem(storageKey);

      if (!saved) {
        setCompleted([]);
        return;
      }

      try {
        setCompleted(JSON.parse(saved));
      } catch {
        setCompleted([]);
      }
    };

    window.addEventListener("roadmap-progress-update", syncProgress);

    return () => {
      window.removeEventListener("roadmap-progress-update", syncProgress);
    };
  }, [storageKey]);

  // Detect active roadmap step while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const viewportMiddle = window.innerHeight * 0.35;

      let current = 0;

      steps.forEach((_, index) => {
        const element = document.getElementById(`roadmap-step-${index}`);

        if (!element) return;

        const rect = element.getBoundingClientRect();

        if (rect.top <= viewportMiddle) {
          current = index;
        }
      });

      setActiveStep(current);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [steps]);

  // Calculate percentage
  const progress =
    steps.length === 0
      ? 0
      : Math.round((completed.length / steps.length) * 100);

  // Scroll to selected step
  const scrollToStep = (index: number) => {
    const element = document.getElementById(`roadmap-step-${index}`);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#090910]/90 backdrop-blur-xl">
        {/* Header */}
        <div className="border-b border-white/[0.06] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Your Progress
              </p>

              <p className="mt-1 text-sm text-zinc-300">
                {completed.length} of {steps.length} completed
              </p>
            </div>

            {/* Percentage */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/[0.06]">
              <span className="text-sm font-bold text-violet-300">
                {progress}%
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
            <div
              className="h-full rounded-full bg-linear-to-r from-violet-500 to-blue-500 transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="p-3">
          {steps.map((step, index) => {
            const isCompleted = completed.includes(index);
            const isActive = activeStep === index;

            return (
              <button
                key={step.title}
                type="button"
                onClick={() => scrollToStep(index)}
                className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-300 ${
                  isActive ? "bg-violet-500/[0.07]" : "hover:bg-white/[0.025]"
                }`}
              >
                {/* Connector */}
                {index !== steps.length - 1 && (
                  <span
                    className={`absolute left-[22px] top-[42px] h-5 w-px transition-colors ${
                      isCompleted ? "bg-violet-500/40" : "bg-white/[0.06]"
                    }`}
                  />
                )}

                {/* Number */}
                <span
                  className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-[10px] font-bold transition-all ${
                    isCompleted
                      ? "border-violet-400/30 bg-violet-500/15 text-violet-300"
                      : isActive
                        ? "border-violet-400/30 bg-violet-500/[0.08] text-violet-300"
                        : "border-white/[0.07] bg-white/[0.02] text-zinc-600"
                  }`}
                >
                  {isCompleted ? "✓" : String(index + 1).padStart(2, "0")}
                </span>

                {/* Step information */}
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-xs font-medium transition-colors ${
                      isCompleted
                        ? "text-violet-300"
                        : isActive
                          ? "text-white"
                          : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  >
                    {step.title}
                  </span>

                  <span className="mt-0.5 block truncate text-[10px] text-zinc-700">
                    {step.level}
                  </span>
                </span>

                {/* Active indicator */}
                {isActive && !isCompleted && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Completion Message */}
        {progress === 100 && (
          <div className="border-t border-white/[0.06] bg-violet-500/[0.04] p-4">
            <div className="flex gap-3">
              <span className="text-violet-300">✦</span>

              <div>
                <p className="text-xs font-semibold text-violet-300">
                  Roadmap completed!
                </p>

                <p className="mt-1 text-[11px] leading-5 text-zinc-600">
                  Great work. Now put your knowledge into a real project.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
