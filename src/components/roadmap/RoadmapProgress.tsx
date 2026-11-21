"use client";

import { useEffect, useState } from "react";
import { useLang, num } from "@/lib/i18n";
import { useProgress } from "@/lib/progress";

type Item = { index: number; title: string; level: string };

type Props = { slug: string; items: Item[] };

export default function RoadmapProgress({ slug, items }: Props) {
  const { t, lang } = useLang();
  const { percentage, isStepCompleted } = useProgress(slug, items.length);

  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = items[0]?.index ?? 0;
      for (const item of items) {
        const el = document.getElementById(`roadmap-step-${item.index}`);
        if (el && el.getBoundingClientRect().top <= line) current = item.index;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  const pct = percentage;
  const done = items.filter((i) => isStepCompleted(i.index)).length;
  const R = 22;
  const C = 2 * Math.PI * R;

  return (
    <aside className="lg:sticky lg:top-28 lg:mt-10 lg:self-start">
      <div className="glass overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c101c]/90 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
        {/* Top Header */}
        <div className="flex items-center gap-4 border-b border-white/[0.07] p-5">
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            className="shrink-0 -rotate-90"
          >
            <circle
              cx="28"
              cy="28"
              r={R}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="5"
            />
            <circle
              cx="28"
              cy="28"
              r={R}
              fill="none"
              stroke="url(#pg)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C - (C * pct) / 100}
              style={{ transition: "stroke-dashoffset .6s ease" }}
            />
            <text
              x="28"
              y="28"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#ffffff"
              fontSize="11"
              fontWeight="700"
              fontFamily="var(--font-mono), monospace"
              fillOpacity={pct > 0 ? 1 : 0.6}
              transform="rotate(90 28 28)"
            >
              {num(pct, lang)}%
            </text>
            <defs>
              <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00f5a0" />
                <stop offset="100%" stopColor="#00d2ff" />
              </linearGradient>
            </defs>
          </svg>
          <div>
            <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-[#00f5a0]">
              {t("prog_t")}
            </p>
            <p className="mt-1 text-sm font-bold text-white font-heading">
              {pct === 100 && items.length > 0
                ? t("prog_done")
                : t("prog_of", { a: done, b: items.length })}
            </p>
          </div>
        </div>

        {/* Steps List */}
        <ol className="max-h-[52vh] overflow-y-auto p-2 no-scrollbar">
          {items.map((item, i) => {
            const isDone = isStepCompleted(item.index);
            const isActive = active === item.index;
            return (
              <li key={item.index}>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(`roadmap-step-${item.index}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs transition duration-150 cursor-pointer ${
                    isActive
                      ? "bg-[#00f5a0]/15 text-white font-semibold"
                      : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-mono font-bold ${
                      isDone
                        ? "border-[#00f5a0]/60 bg-[#00f5a0]/20 text-[#00f5a0]"
                        : isActive
                          ? "border-[#00f5a0]/60 text-[#00f5a0]"
                          : "border-white/10 text-zinc-500"
                    }`}
                  >
                    {isDone ? "✓" : num(i + 1, lang)}
                  </span>
                  <span className="line-clamp-1">{item.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
}
