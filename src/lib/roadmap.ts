import roadmapData from "@/data/roadmap.json";

export type RoadmapStep = {
  title: string;
  level: string;
  topics: string[];
  learning_outcome: string;
  projects: string[];
};

export type RoadmapResource = {
  name: string;
  type: string;
  url: string;
};

export type Roadmap = {
  slug: string;
  name: string;
  icon: string;
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
};

export function getRoadmaps(): Roadmap[] {
  return roadmapData.sectors;
}

export function getRoadmapBySlug(slug: string): Roadmap | undefined {
  return getRoadmaps().find((roadmap) => roadmap.slug === slug);
}

export function getAllRoadmapSlugs() {
  return getRoadmaps().map((roadmap) => ({
    slug: roadmap.slug,
  }));
}
