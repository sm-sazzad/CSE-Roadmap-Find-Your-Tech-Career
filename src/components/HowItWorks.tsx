"use client";

import Reveal from "./ui/Reveal";
import { useLang, type TKey } from "@/lib/i18n";

const steps: { n: string; icon: string; title: TKey; desc: TKey }[] = [
  { n: "01", icon: "🧭", title: "how1_t", desc: "how1_d" },
  { n: "02", icon: "🪜", title: "how2_t", desc: "how2_d" },
  { n: "03", icon: "🚀", title: "how3_t", desc: "how3_d" },
];

export default function HowItWorks() {
  const { t } = useLang();

  return (
    <section id="how-it-works" className="mx-auto w-[min(1180px,calc(100%-32px))] py-20">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            {t("how_k")}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{t("how_t")}</h2>
          <p className="mt-3 text-zinc-500">{t("how_s")}</p>
        </div>
      </Reveal>

      <div className="relative mt-12 grid gap-4 md:grid-cols-3">
        <div className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent md:block" />
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1} y={20}>
            <div className="glass relative h-full rounded-2xl p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/25 bg-[#0c0a18] text-2xl shadow-[0_0_30px_rgba(139,92,246,0.18)]">
                {s.icon}
              </div>
              <p className="mt-5 text-xs font-bold tracking-widest text-violet-400">
                {s.n}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{t(s.title)}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">{t(s.desc)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
