"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { useLang, num } from "@/lib/i18n";
import type { CatalogItem } from "@/lib/roadmap";
import SectorIcon from "@/components/ui/SectorIcon";
import CareerCompassToy from "@/components/home/CareerCompassToy";

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
    <section className="relative isolate overflow-hidden">
      {/* High-tech Ambient Lighting & Mesh */}
      <div className="ambient-glow" />
      <div className="grid-mesh absolute inset-0 -z-10 opacity-70" />
      <div className="noise-overlay absolute inset-0 -z-10 pointer-events-none opacity-40" />

      <div className="mx-auto w-[min(1180px,calc(100%-32px))] pb-16 pt-20 text-center sm:pt-28">
        {/* Top Telemetry Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#00f5a0]/30 bg-[#00f5a0]/[0.08] px-4 py-1.5 text-xs font-mono font-medium text-[#00f5a0]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00f5a0] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00f5a0]" />
          </span>
          {t("hero_badge")}
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mx-auto mt-7 max-w-4xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-7xl font-heading"
        >
          {t("hero_t1")}
          <br />
          <span className="gradient-text">{t("hero_t2")}</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg"
        >
          {t("hero_sub")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/sector"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_30px_rgba(0,245,160,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(0,245,160,0.5)] cursor-pointer"
          >
            {t("hero_cta1")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#0c101b]/80 px-7 py-3.5 text-sm font-semibold text-zinc-300 transition duration-300 hover:border-white/20 hover:bg-[#121828] hover:text-white"
          >
            <BookOpen className="h-4 w-4 text-zinc-400" />
            {t("hero_cta2")}
          </a>
        </motion.div>

        {/* Signature Hero Toy: The Career Compass & Velocity Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <CareerCompassToy />
        </motion.div>

        {/* Telemetry Stats Grid */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {numbers.map((n) => (
            <div
              key={n.label}
              className="glass rounded-2xl border border-white/[0.07] px-4 py-5 transition-all duration-300 hover:border-[#00f5a0]/30"
            >
              <dt className="text-2xl font-extrabold text-white sm:text-3xl font-heading">
                {num(n.value, lang)}
              </dt>
              <dd className="mt-1 text-xs font-mono text-zinc-400 uppercase tracking-wider">
                {n.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Moving strip of all roadmaps with Lucide Vector Icons */}
      <div className="relative overflow-hidden border-y border-white/[0.06] bg-[#070a12]/80 py-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee gap-3">
          {items.map((item, i) => {
            const name = (lang === "bn" && item.bn?.name) || item.name;
            return (
              <Link
                key={`${item.slug}-${i}`}
                href={`/sector/${item.slug}`}
                className="group flex items-center gap-2.5 rounded-full border border-white/[0.07] bg-[#0c101b]/90 px-4 py-2 text-xs font-medium text-zinc-300 transition duration-300 hover:border-[#00f5a0]/40 hover:bg-[#121828] hover:text-white"
              >
                <div className="flex h-5 w-5 items-center justify-center text-[#00f5a0]">
                  <SectorIcon slug={item.slug} className="h-4 w-4" fallbackIcon={item.icon} />
                </div>
                <span>{name}</span>
                <span className="font-mono text-[10px] text-zinc-500">
                  {num(item.steps, lang)} {lang === "bn" ? "ধাপ" : "steps"}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
