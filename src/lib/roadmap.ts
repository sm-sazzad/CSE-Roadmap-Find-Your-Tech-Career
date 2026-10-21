import roadmapData from "@/data/roadmap.json";
import bnData from "@/data/roadmap.bn.json";

export type RoadmapResource = {
  name: string;
  type: string;
  url: string;
  description?: string;
};

export type RoadmapStep = {
  title: string;
  level: string;
  topics: string[];
  learning_outcome: string;
  projects: string[];
  simple_explanation?: string;
  estimated_time?: string;
  resources?: RoadmapResource[];
  /** Track ids this step belongs to. Missing = shown in every track. */
  tracks?: string[];
};

export type Track = {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  roles?: string[];
};

export type GlossaryItem = { term: string; meaning: string };
export type FaqItem = { question: string; answer: string };

export type Roadmap = {
  slug: string;
  name: string;
  icon: string;
  category: string;
  difficulty: string;
  estimated_time: string;
  overview: string;
  prerequisites: string[];
  skills: string[];
  tools: string[];
  career_roles: string[];
  steps: RoadmapStep[];
  resources: RoadmapResource[];
  final_project: string;
  tagline?: string;
  weekly_hours?: string;
  who_is_this_for?: string[];
  why_learn?: string[];
  what_you_will_build?: string[];
  how_to_start?: string[];
  glossary?: GlossaryItem[];
  faq?: FaqItem[];
  related?: string[];
  tracks?: Track[];
};

/** Bangla text for one roadmap. Every field is optional; missing fields fall back to English. */
export type BnRoadmap = {
  complete?: boolean;
  name?: string;
  tagline?: string;
  overview?: string;
  who_is_this_for?: string[];
  why_learn?: string[];
  what_you_will_build?: string[];
  how_to_start?: string[];
  glossary?: GlossaryItem[];
  faq?: FaqItem[];
  final_project?: string;
  career_roles?: string[];
  resources?: Partial<RoadmapResource>[];
  tracks?: Record<string, Partial<Track>>;
  steps?: Partial<RoadmapStep>[];
};

/** Light-weight item for lists, cards and home page (safe to send to the browser). */
export type CatalogItem = {
  slug: string;
  name: string;
  icon: string;
  category: string;
  tagline: string;
  difficulty: string;
  estimated_time: string;
  steps: number;
  resources: number;
  bn?: { name?: string; tagline?: string };
};

const bnMap = bnData as unknown as Record<string, BnRoadmap>;

export function getRoadmaps(): Roadmap[] {
  return roadmapData.sectors as unknown as Roadmap[];
}

export function getRoadmapBySlug(slug: string): Roadmap | undefined {
  return getRoadmaps().find((roadmap) => roadmap.slug === slug);
}

export function getBn(slug: string): BnRoadmap | undefined {
  return bnMap[slug];
}

export function getAllRoadmapSlugs() {
  return getRoadmaps().map((roadmap) => ({ slug: roadmap.slug }));
}

function stepResources(r: Roadmap) {
  return r.steps.reduce((n, s) => n + (s.resources?.length ?? 0), 0);
}

export function getCatalog(): CatalogItem[] {
  return getRoadmaps().map((r) => ({
    slug: r.slug,
    name: r.name,
    icon: r.icon,
    category: r.category,
    tagline: r.tagline ?? r.overview,
    difficulty: r.difficulty,
    estimated_time: r.estimated_time,
    steps: r.steps.length,
    resources: r.resources.length + stepResources(r),
    bn: { name: bnMap[r.slug]?.name, tagline: bnMap[r.slug]?.tagline },
  }));
}

export function getStats() {
  const roadmaps = getRoadmaps();
  return {
    paths: roadmaps.length,
    steps: roadmaps.reduce((n, r) => n + r.steps.length, 0),
    resources: roadmaps.reduce(
      (n, r) => n + r.resources.length + stepResources(r),
      0
    ),
  };
}
