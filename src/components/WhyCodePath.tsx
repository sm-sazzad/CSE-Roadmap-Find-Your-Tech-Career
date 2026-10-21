"use client";

import Reveal from "./ui/Reveal";
import { useLang, type TKey } from "@/lib/i18n";

const features: { icon: string; title: TKey; desc: TKey }[] = [
  { icon: "🧩", title: "why1_t", desc: "why1_d" },
  { icon: "📚", title: "why2_t", desc: "why2_d" },
  { icon: "🌱", title: "why3_t", desc: "why3_d" },
  { icon: "✅", title: "why4_t", desc: "why4_d" },
];

export default function WhyCodePath() {
  const { t } = useLang();

  return (
    <section className="mx-auto w-[min(1180px,calc(100%-32px))] py-20">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-[90px]" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              {t("why_k")}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{t("why_t")}</h2>
            <p className="mt-3 leading-7 text-zinc-500">{t("why_s")}</p>
          </div>

          <div className="relative mt-10 grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex gap-4 rounded-2xl border border-white/[0.06] bg-[#08080f]/70 p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-xl">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{t(f.title)}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-500">{t(f.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
