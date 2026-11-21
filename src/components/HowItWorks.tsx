"use client";

import { Compass, Milestone, Rocket } from "lucide-react";
import Reveal from "./ui/Reveal";
import { useLang, type TKey } from "@/lib/i18n";

const steps = [
  { n: "01", icon: Compass, title: "how1_t" as TKey, desc: "how1_d" as TKey, accent: "#00f5a0" },
  { n: "02", icon: Milestone, title: "how2_t" as TKey, desc: "how2_d" as TKey, accent: "#00d2ff" },
  { n: "03", icon: Rocket, title: "how3_t" as TKey, desc: "how3_d" as TKey, accent: "#f59e0b" },
];

export default function HowItWorks() {
  const { t } = useLang();

  return (
    <section id="how-it-works" className="mx-auto w-[min(1180px,calc(100%-32px))] py-24">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#00f5a0]">
            {t("how_k")}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl font-heading">
            {t("how_t")}
          </h2>
          <p className="mt-4 text-sm text-zinc-400 sm:text-base leading-relaxed">{t("how_s")}</p>
        </div>
      </Reveal>

      <div className="relative mt-16 grid gap-6 md:grid-cols-3">
        {/* Connecting pulse line */}
        <div className="absolute left-[18%] right-[18%] top-12 hidden h-px bg-gradient-to-r from-transparent via-[#00f5a0]/40 to-transparent md:block" />

        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.n} delay={i * 0.1} y={20}>
              <div className="glass-card relative h-full rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#0d121f] to-[#070910] p-8 text-center transition-all duration-300 hover:border-[#00f5a0]/30">
                <div
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.1] bg-[#121828] text-white shadow-[0_0_30px_rgba(0,245,160,0.15)] transition-transform duration-300 hover:scale-105"
                  style={{ color: s.accent }}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <p className="mt-6 font-mono text-xs font-bold tracking-widest text-[#00f5a0]">
                  PHASE {s.n}
                </p>
                <h3 className="mt-2 text-xl font-bold text-white font-heading">
                  {t(s.title)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {t(s.desc)}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
