"use client";

import { useEffect, useState } from "react";
import { useLang, num } from "@/lib/i18n";

type Item = { index: number; title: string; level: string };

type Props = { slug: string; items: Item[] };

export default function RoadmapProgress({ slug, items }: Props) {
  const { t, lang } = useLang();
  const [completed, setCompleted] = useState<number[]>([]);
  const [active, setActive] = useState(0);
  const key = `roadmap-progress-${slug}`;

  useEffect(() => {
    const sync = () => {
      try {
        const raw = localStorage.getItem(key);
        const parsed = raw ? JSON.parse(raw) : [];
        setCompleted(Array.isArray(parsed) ? parsed.map(Number) : []);
      } catch {
        setCompleted([]);
      }
    };
    sync();
    window.addEventListener("roadmap-progress-update", sync);
    return () => window.removeEventListener("roadmap-progress-update", sync);
  }, [key]);

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

  const done = items.filter((i) => completed.includes(i.index)).length;
  const pct = items.length ? Math.round((done / items.length) * 100) : 0;
  const R = 22;
  const C = 2 * Math.PI * R;

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="glass overflow-hidden rounded-2xl">
        <div className="flex items-center gap-4 border-b border-white/[0.06] p-5">
          <svg width="56" height="56" viewBox="0 0 56 56" className="shrink-0 -rotate-90">
            <circle cx="28" cy="28" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
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
            <defs>
              <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
          </svg>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              {t("prog_t")}
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-200">
              {pct === 100 && items.length > 0
                ? t("prog_done")
                : t("prog_of", { a: done, b: items.length })}
            </p>
            <p className="text-lg font-bold text-violet-300">{num(pct, lang)}%</p>
          </div>
        </div>

        <ol className="max-h-[52vh] overflow-y-auto p-2">
          {items.map((item, i) => {
            const isDone = completed.includes(item.index);
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
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    isActive ? "bg-violet-500/10 text-white" : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
                      isDone
                        ? "border-emerald-400/50 bg-emerald-400/15 text-emerald-300"
                        : isActive
                        ? "border-violet-400/60 text-violet-200"
                        : "border-white/10"
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
