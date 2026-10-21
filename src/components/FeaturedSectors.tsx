"use client";

import Link from "next/link";
import Reveal from "./ui/Reveal";
import SectorCard from "./SectorCard";
import { useLang } from "@/lib/i18n";
import type { CatalogItem } from "@/lib/roadmap";

const FEATURED = [
  "programming-fundamentals",
  "web-development",
  "ai-ml",
  "cyber-security",
  "app-development",
  "cloud-computing",
];

export default function FeaturedSectors({ catalog }: { catalog: CatalogItem[] }) {
  const { t } = useLang();
  const items = FEATURED.map((s) => catalog.find((c) => c.slug === s)).filter(
    (x): x is CatalogItem => Boolean(x)
  );

  return (
    <section className="mx-auto w-[min(1180px,calc(100%-32px))] py-20">
      <Reveal>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              {t("featured_k")}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              {t("featured_t")}
            </h2>
            <p className="mt-3 text-zinc-500">{t("featured_s")}</p>
          </div>
          <Link
            href="/sector"
            className="shrink-0 text-sm font-medium text-violet-300 transition hover:text-white"
          >
            {t("view_all")} →
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.slug} delay={i * 0.06} y={20}>
            <SectorCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
