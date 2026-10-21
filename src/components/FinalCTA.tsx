"use client";

import Link from "next/link";
import Reveal from "./ui/Reveal";
import { useLang } from "@/lib/i18n";

export default function FinalCTA() {
  const { t } = useLang();

  return (
    <section className="mx-auto w-[min(1180px,calc(100%-32px))] pb-24 pt-10">
      <Reveal y={30}>
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/15 via-[#0b0a16] to-sky-500/10 px-6 py-16 text-center sm:px-12">
          <div className="grid-fade absolute inset-0 opacity-40" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
              {t("cta_k")}
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-5xl">
              {t("cta_t")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">{t("cta_s")}</p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/sector"
                className="rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(124,58,237,0.35)] transition hover:-translate-y-0.5"
              >
                {t("cta_b1")} →
              </Link>
              <Link
                href="/about"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-zinc-200 transition hover:bg-white/[0.07]"
              >
                {t("cta_b2")}
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      <p className="mt-10 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} CodePath
      </p>
    </section>
  );
}
