"use client";

import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import Reveal from "./ui/Reveal";
import { useLang } from "@/lib/i18n";

export default function FinalCTA() {
  const { t } = useLang();

  return (
    <section className="mx-auto w-[min(1180px,calc(100%-32px))] pb-28 pt-10">
      <Reveal y={30}>
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-br from-[#0e1424] via-[#090d18] to-[#06080e] px-6 py-20 text-center sm:px-14">
          {/* Ambient Lighting */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#00f5a0]/15 blur-[120px]" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-[#00d2ff]/15 blur-[120px]" />
          <div className="grid-mesh absolute inset-0 opacity-40 pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-3.5 py-1 text-xs font-mono font-medium text-[#00f5a0]">
              <Compass className="h-3.5 w-3.5" />
              {t("cta_k")}
            </div>

            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl font-heading">
              {t("cta_t")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-zinc-400 sm:text-lg">
              {t("cta_s")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/sector"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_35px_rgba(0,245,160,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,245,160,0.5)] cursor-pointer"
              >
                <span>{t("cta_b1")}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#0c101b]/80 px-8 py-4 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:border-white/20 hover:bg-[#121828] hover:text-white"
              >
                {t("cta_b2")}
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
