"use client";

import { Layers, Library, Globe2, ShieldCheck } from "lucide-react";
import Reveal from "./ui/Reveal";
import { useLang, type TKey } from "@/lib/i18n";

const features = [
  { icon: Layers, title: "why1_t" as TKey, desc: "why1_d" as TKey, accent: "#00f5a0" },
  { icon: Library, title: "why2_t" as TKey, desc: "why2_d" as TKey, accent: "#00d2ff" },
  { icon: Globe2, title: "why3_t" as TKey, desc: "why3_d" as TKey, accent: "#f59e0b" },
  { icon: ShieldCheck, title: "why4_t" as TKey, desc: "why4_d" as TKey, accent: "#38bdf8" },
];

export default function WhyCodePath() {
  const { t } = useLang();

  return (
    <section className="mx-auto w-[min(1180px,calc(100%-32px))] py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-br from-[#0c1120] via-[#090d18] to-[#06080e] p-8 sm:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#00f5a0]/10 blur-[110px]" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-[#00d2ff]/08 blur-[110px]" />

          <div className="relative max-w-2xl">
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#00f5a0]">
              {t("why_k")}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl font-heading">
              {t("why_t")}
            </h2>
            <p className="mt-4 leading-7 text-zinc-400">{t("why_s")}</p>
          </div>

          <div className="relative mt-12 grid gap-5 sm:grid-cols-2">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="flex gap-4 rounded-2xl border border-white/[0.07] bg-[#0c1120]/80 p-6 transition-all duration-300 hover:border-[#00f5a0]/30 hover:bg-[#10172a]"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#141b2e] shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                    style={{ color: f.accent }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">
                      {t(f.title)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-zinc-400">
                      {t(f.desc)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
