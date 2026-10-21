import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  getAllRoadmapSlugs,
  getBn,
  getCatalog,
  getRoadmapBySlug,
} from "@/lib/roadmap";
import RoadmapView from "@/components/roadmap/RoadmapView";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllRoadmapSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const roadmap = getRoadmapBySlug(slug);
  if (!roadmap) return {};
  return {
    title: `${roadmap.name} Roadmap — CodePath`,
    description: roadmap.tagline ?? roadmap.overview,
  };
}

export default async function RoadmapPage({ params }: PageProps) {
  const { slug } = await params;
  const roadmap = getRoadmapBySlug(slug);

  if (!roadmap) {
    notFound();
  }

  const catalog = getCatalog();
  const related = (roadmap.related ?? [])
    .map((s) => catalog.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return <RoadmapView roadmap={roadmap} bn={getBn(slug)} related={related} />;
}
