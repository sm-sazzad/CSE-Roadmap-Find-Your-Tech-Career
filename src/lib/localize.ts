import type { Roadmap, BnRoadmap, Track } from "@/lib/roadmap";
import type { Lang } from "@/lib/i18n";

/** Merge Bangla text (if it exists) over the English roadmap. Missing fields fall back to English. */
export function localizeRoadmap(
  roadmap: Roadmap,
  bn: BnRoadmap | undefined,
  lang: Lang
): Roadmap {
  if (lang === "en" || !bn) return roadmap;

  const tracks: Track[] | undefined = roadmap.tracks?.map((track) => ({
    ...track,
    ...(bn.tracks?.[track.id] ?? {}),
  }));

  return {
    ...roadmap,
    name: bn.name ?? roadmap.name,
    tagline: bn.tagline ?? roadmap.tagline,
    overview: bn.overview ?? roadmap.overview,
    who_is_this_for: bn.who_is_this_for ?? roadmap.who_is_this_for,
    why_learn: bn.why_learn ?? roadmap.why_learn,
    what_you_will_build: bn.what_you_will_build ?? roadmap.what_you_will_build,
    how_to_start: bn.how_to_start ?? roadmap.how_to_start,
    glossary: bn.glossary ?? roadmap.glossary,
    faq: bn.faq ?? roadmap.faq,
    final_project: bn.final_project ?? roadmap.final_project,
    career_roles: bn.career_roles ?? roadmap.career_roles,
    tracks,
    resources: roadmap.resources.map((res, i) => ({
      ...res,
      ...(bn.resources?.[i] ?? {}),
    })),
    steps: roadmap.steps.map((step, i) => ({
      ...step,
      ...(bn.steps?.[i] ?? {}),
    })),
  };
}
