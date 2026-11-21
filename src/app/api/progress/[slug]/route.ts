import { auth } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { getAllRoadmapSlugs } from "@/lib/roadmap";

const MAX_STEPS_PER_ROADMAP = 1000;
const MAX_CHECKS_PER_ROADMAP = 1000;

function jsonResponse(data: unknown, status: number): Response {
  return Response.json(data, { status, headers: { "Content-Type": "application/json" } });
}

async function requireValidSession(request: Request): Promise<{ user: { id: string; email: string; emailVerified: boolean } } | Response> {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  if (!session.user.emailVerified) {
    return jsonResponse({ error: "Email not verified" }, 403);
  }

  return { user: { id: session.user.id, email: session.user.email, emailVerified: session.user.emailVerified } };
}

export async function GET(request: Request): Promise<Response> {
  const authResult = await requireValidSession(request);
  if (authResult instanceof Response) return authResult;

  const { user } = authResult;

  try {
    const db = await getDb();
    const collection = db.collection("roadmap_progress");

    const records = await collection.find({ userId: user.id }).toArray();

    const progress: Record<string, { completedSteps: number[]; checks: string[]; stepCount: number; updatedAt: string }> = {};
    for (const rec of records) {
      progress[rec.slug] = {
        completedSteps: rec.completedSteps ?? [],
        checks: rec.checks ?? [],
        stepCount: rec.stepCount ?? 0,
        updatedAt: rec.updatedAt ?? new Date().toISOString(),
      };
    }

    return jsonResponse({ progress }, 200);
  } catch {
    return jsonResponse({ error: "Failed to load progress" }, 500);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
): Promise<Response> {
  const authResult = await requireValidSession(request);
  if (authResult instanceof Response) return authResult;

  const { user } = authResult;
  const { slug } = await params;

  try {
    const validSlugs = getAllRoadmapSlugs().map((s) => s.slug);
    if (!validSlugs.includes(slug)) {
      return jsonResponse({ error: "Unknown roadmap slug" }, 404);
    }

    const roadmap = await import("@/lib/roadmap").then((m) => m.getRoadmapBySlug(slug));
    if (!roadmap) {
      return jsonResponse({ error: "Roadmap not found" }, 404);
    }

    const stepCount = roadmap.steps.length;

    let body: { completedSteps?: unknown; checks?: unknown; stepCount?: unknown };
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400);
    }

    const { completedSteps, checks } = body;

    if (!Array.isArray(completedSteps)) {
      return jsonResponse({ error: "completedSteps must be an array" }, 400);
    }

    if (completedSteps.length > MAX_STEPS_PER_ROADMAP) {
      return jsonResponse({ error: "Too many completed steps" }, 413);
    }

    const validatedSteps: number[] = [];
    const seenSteps = new Set<number>();
    for (const step of completedSteps) {
      if (typeof step !== "number" || !Number.isInteger(step) || step < 0) {
        return jsonResponse({ error: "Step indexes must be non-negative integers" }, 400);
      }
      if (step >= stepCount) {
        return jsonResponse({ error: `Step index ${step} exceeds roadmap step count` }, 400);
      }
      if (seenSteps.has(step)) {
        return jsonResponse({ error: "Duplicate step index" }, 400);
      }
      seenSteps.add(step);
      validatedSteps.push(step);
    }

    let validatedChecks: string[] = [];
    if (checks !== undefined) {
      if (!Array.isArray(checks)) {
        return jsonResponse({ error: "checks must be an array" }, 400);
      }
      if (checks.length > MAX_CHECKS_PER_ROADMAP) {
        return jsonResponse({ error: "Too many checklist entries" }, 413);
      }
      const checkRegex = /^\d+-\d+$/;
      const seenChecks = new Set<string>();
      for (const check of checks) {
        if (typeof check !== "string" || !checkRegex.test(check)) {
          return jsonResponse({ error: "Checklist entries must match format stepIndex-itemIndex" }, 400);
        }
        if (seenChecks.has(check)) {
          return jsonResponse({ error: "Duplicate checklist entry" }, 400);
        }
        seenChecks.add(check);

        const [stepIdx] = check.split("-").map(Number);
        if (stepIdx >= stepCount) {
          return jsonResponse({ error: `Checklist step index ${stepIdx} exceeds roadmap step count` }, 400);
        }
      }
      validatedChecks = checks as string[];
    }

    const db = await getDb();
    const collection = db.collection("roadmap_progress");

    const now = new Date().toISOString();
    const updateDoc: Record<string, unknown> = {
      userId: user.id,
      slug,
      completedSteps: validatedSteps,
      checks: validatedChecks,
      stepCount,
      updatedAt: now,
    };

    await collection.updateOne(
      { userId: user.id, slug },
      { $set: updateDoc },
      { upsert: true }
    );

    return jsonResponse({
      completedSteps: validatedSteps,
      checks: validatedChecks,
      stepCount,
      updatedAt: now,
    }, 200);
  } catch {
    return jsonResponse({ error: "Failed to save progress" }, 500);
  }
}
