import { auth } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";

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

  const slug = request.url.split("?")[1]?.split("&").find((p) => p.startsWith("slug="))?.split("=")[1];

  try {
    const db = await getDb();
    const collection = db.collection("roadmap_progress");

    if (slug) {
      const record = await collection.findOne({ userId: user.id, slug });
      if (!record) {
        return jsonResponse({ progress: {} }, 200);
      }
      return jsonResponse({
        progress: {
          [slug]: {
            completedSteps: record.completedSteps ?? [],
            checks: record.checks ?? [],
            stepCount: record.stepCount ?? 0,
            updatedAt: record.updatedAt ?? new Date().toISOString(),
          },
        },
      }, 200);
    }

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
