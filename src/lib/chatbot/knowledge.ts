import sectorData from "@/data/sector.json";
import roadmapData from "@/data/roadmap.json";
import bnData from "@/data/roadmap.bn.json";

export interface CompactSector {
  slug: string;
  name: string;
  description: string;
  link: string;
}

export interface SectorStepSummary {
  index: number;
  title: string;
}

export interface SectorTrackSummary {
  id: string;
  name: string;
  tagline?: string;
  summary?: string;
  roles?: string[];
}

export interface SectorFaqSummary {
  question: string;
  answer: string;
}

export interface SectorDetailsSummary {
  slug: string;
  name: string;
  tagline: string;
  overview: string;
  steps: SectorStepSummary[];
  career_roles: string[];
  how_to_start: string[];
  faq: SectorFaqSummary[];
  tracks?: SectorTrackSummary[];
}

export interface SectorError {
  error: string;
}

interface SectorJsonItem {
  slug: string;
  name: string;
  description: string;
  icon?: string;
}

interface RoadmapJsonStep {
  title: string;
  [key: string]: unknown;
}

interface RoadmapJsonTrack {
  id: string;
  name: string;
  tagline?: string;
  summary?: string;
  roles?: string[];
}

interface RoadmapJsonFaq {
  question: string;
  answer: string;
}

interface RoadmapJsonSector {
  slug: string;
  name: string;
  tagline?: string;
  overview?: string;
  steps?: RoadmapJsonStep[];
  career_roles?: string[];
  how_to_start?: string[];
  faq?: RoadmapJsonFaq[];
  tracks?: RoadmapJsonTrack[];
  [key: string]: unknown;
}

interface BnJsonStep {
  title?: string;
  [key: string]: unknown;
}

interface BnJsonTrack {
  name?: string;
  tagline?: string;
  summary?: string;
  roles?: string[];
}

interface BnJsonFaq {
  question: string;
  answer: string;
}

interface BnJsonSector {
  name?: string;
  tagline?: string;
  overview?: string;
  steps?: BnJsonStep[];
  career_roles?: string[];
  how_to_start?: string[];
  faq?: BnJsonFaq[];
  tracks?: Record<string, BnJsonTrack>;
  [key: string]: unknown;
}

// Module-level caches (loaded once, not per request)
const cachedSectorList: CompactSector[] = (
  sectorData.sectors as SectorJsonItem[]
).map((s) => ({
  slug: s.slug,
  name: s.name,
  description: s.description,
  link: `/sector/${s.slug}`,
}));

const cachedEnRoadmaps = new Map<string, RoadmapJsonSector>(
  (roadmapData.sectors as RoadmapJsonSector[]).map((s) => [s.slug, s])
);

const cachedBnRoadmaps = bnData as Record<string, BnJsonSector>;

/**
 * Returns a compact list of all sectors from sector.json with slug, name, description, and link.
 */
export function getSectorList(): CompactSector[] {
  return cachedSectorList;
}

/**
 * Returns a concise summary of a sector:
 * name, tagline, overview, step titles in order (with 0-based index),
 * career_roles, how_to_start, up to 4 FAQ items, and tracks if present.
 * Prefers Bangla from roadmap.bn.json, falls back to English roadmap.json.
 * Returns an error object for an unknown slug.
 */
export function getSectorDetails(
  slug: string,
  lang: string = "bn"
): SectorDetailsSummary | SectorError {
  const en = cachedEnRoadmaps.get(slug);
  if (!en) {
    return { error: `Sector "${slug}" not found` };
  }

  const bn = cachedBnRoadmaps[slug];
  const preferBn = lang !== "en" && Boolean(bn);

  const name: string = (preferBn && bn.name) || en.name || "";
  const tagline: string = (preferBn && bn.tagline) || en.tagline || "";
  const overview: string = (preferBn && bn.overview) || en.overview || "";

  // Step titles in order (0-based index)
  const steps: SectorStepSummary[] = (en.steps || []).map((step, idx) => {
    const bnStep = preferBn && bn.steps ? bn.steps[idx] : undefined;
    const title = bnStep?.title || step.title || `Step ${idx + 1}`;
    return {
      index: idx,
      title,
    };
  });

  // Career roles
  const career_roles: string[] =
    preferBn && bn.career_roles && bn.career_roles.length > 0
      ? bn.career_roles
      : en.career_roles || [];

  // How to start
  const how_to_start: string[] =
    preferBn && bn.how_to_start && bn.how_to_start.length > 0
      ? bn.how_to_start
      : en.how_to_start || [];

  // Up to 4 FAQ items
  const sourceFaq =
    preferBn && bn.faq && bn.faq.length > 0 ? bn.faq : en.faq || [];
  const faq: SectorFaqSummary[] = sourceFaq.slice(0, 4).map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  // Tracks if present
  let tracks: SectorTrackSummary[] | undefined;
  if (en.tracks && Array.isArray(en.tracks) && en.tracks.length > 0) {
    tracks = en.tracks.map((t) => {
      const bnTrack = preferBn && bn.tracks ? bn.tracks[t.id] : undefined;
      return {
        id: t.id,
        name: bnTrack?.name || t.name,
        tagline: bnTrack?.tagline || t.tagline,
        summary: bnTrack?.summary || t.summary,
        roles: bnTrack?.roles || t.roles,
      };
    });
  }

  return {
    slug,
    name,
    tagline,
    overview,
    steps,
    career_roles,
    how_to_start,
    faq,
    ...(tracks ? { tracks } : {}),
  };
}
