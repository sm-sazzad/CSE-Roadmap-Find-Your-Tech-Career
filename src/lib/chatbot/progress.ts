import { getDb } from "@/lib/mongodb";
import { getSectorDetails } from "@/lib/chatbot/knowledge";

interface RoadmapProgressDoc {
  userId: string;
  slug: string;
  completedSteps?: number[];
  stepCount?: number;
  checks?: string[];
  updatedAt?: string | Date;
}

/**
 * Retrieves a compact, one-line summary per sector for the given user's progress.
 * If user has no progress, or if MongoDB is unreachable/times out, returns null.
 */
export async function getUserProgressSummary(
  userId: string
): Promise<string | null> {
  if (!userId) return null;

  try {
    // 3.5s timeout guard so slow database operations never hang chat streaming
    const fetchProgressWithTimeout = async (): Promise<string | null> => {
      const db = await getDb();
      const collection = db.collection<RoadmapProgressDoc>("roadmap_progress");

      const records = await collection.find({ userId }).toArray();

      if (!records || records.length === 0) {
        return null;
      }

      const summaryLines: string[] = [];

      for (const record of records) {
        const slug = record.slug;
        if (!slug) continue;

        // Look up sector details from knowledge (use English consistently for prompt summary)
        const details = getSectorDetails(slug, "en");
        if ("error" in details) {
          continue;
        }

        const sectorName = details.name || slug;
        const totalSteps = record.stepCount ?? details.steps.length;
        const completedSet = new Set(record.completedSteps ?? []);
        const completedCount = completedSet.size;

        // Find the smallest 0-based index not present in completedSteps (up to totalSteps - 1)
        let nextStepIndex: number | null = null;
        for (let i = 0; i < totalSteps; i++) {
          if (!completedSet.has(i)) {
            nextStepIndex = i;
            break;
          }
        }

        let nextStepText: string;
        if (nextStepIndex === null || completedCount >= totalSteps) {
          nextStepText = "Status: Completed.";
        } else {
          const stepInfo = details.steps.find((s) => s.index === nextStepIndex);
          const stepTitle = stepInfo?.title || `Step ${nextStepIndex + 1}`;
          nextStepText = `Next step: "${stepTitle}".`;
        }

        summaryLines.push(
          `- ${sectorName} (/sector/${slug}): ${completedCount}/${totalSteps} steps done. ${nextStepText}`
        );
      }

      if (summaryLines.length === 0) {
        return null;
      }

      return summaryLines.join("\n");
    };

    const timeoutPromise = new Promise<null>((_, reject) =>
      setTimeout(
        () => reject(new Error("Progress lookup timeout after 3500ms")),
        3500
      )
    );

    return await Promise.race([fetchProgressWithTimeout(), timeoutPromise]);
  } catch (error) {
    console.error(
      "Failed to load user progress for chatbot personalization:",
      error
    );
    return null;
  }
}
