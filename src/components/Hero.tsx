"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang, num } from "@/lib/i18n";
import type { CatalogItem } from "@/lib/roadmap";

type Props = {
  stats: { paths: number; steps: number; resources: number };
  catalog: CatalogItem[];
};

export default function Hero({ stats, catalog }: Props) {
  const { t, lang } = useLang();
  const items = [...catalog, ...catalog];

  const numbers = [
    { value: `${stats.paths}`, label: t("stat_paths") },
    { value: `${stats.steps}`, label: t("stat_steps") },
    { value: `${stats.resources}+`, label: t("stat_res") },
    { value: "2", label: t("stat_lang") },
  ];

  return (
    <section className="relative isolate">
      <div className="aurora" />
      <div className="grid-fade absolute inset-0 -z-10 opacity-60" />

      <div className="mx-auto w-[min(1180px,calc(100%-32px))] pb-16 pt-20 text-center sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/[0.08] px-4 py-1.5 text-xs font-medium text-violet-200"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          {t("hero_badge")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mx-auto mt-7 max-w-4xl text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-6xl"
        >
          {t("hero_t1")}
          <br />
          <span className="gradient-text">{t("hero_t2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg"
        >
          {t("hero_sub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/sector"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(124,58,237,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_50px_rgba(124,58,237,0.5)]"
          >
            {t("hero_cta1")}
            <span className="transition group-hover:translate-x-1">→</span>
          </Link>
          <a
            href="#how-it-works"
            className="rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-zinc-200 transition hover:bg-white/[0.07]"
          >
            {t("hero_cta2")}
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {numbers.map((n) => (
            <div key={n.label} className="glass rounded-2xl px-4 py-5">
              <dt className="text-2xl font-bold text-white sm:text-3xl">
                {num(n.value, lang)}
              </dt>
              <dd className="mt-1 text-xs text-zinc-500">{n.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Moving strip of all roadmaps */}
      <div className="relative overflow-hidden border-y border-white/[0.05] bg-white/[0.012] py-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="marquee gap-3">
          {items.map((item, i) => (
            <Link
              key={`${item.slug}-${i}`}
              href={`/sector/${item.slug}`}
              className="mr-3 flex shrink-0 items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 transition hover:border-violet-400/40 hover:text-white"
            >
              <span>{item.icon}</span>
              {(lang === "bn" && item.bn?.name) || item.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
