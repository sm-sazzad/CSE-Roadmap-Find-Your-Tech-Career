import { NextResponse } from "next/server";
import {
  convertToModelMessages,
  isStepCount,
  streamText,
  tool,
  type UIMessage,
} from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { getSectorDetails, getSectorList } from "@/lib/chatbot/knowledge";

export const maxDuration = 30;

// Schema for incoming messages
const messagePartSchema = z
  .object({
    type: z.string(),
    text: z.string().optional(),
  })
  .passthrough();

const rawMessageSchema = z
  .object({
    id: z.string().optional(),
    role: z.enum(["user", "assistant", "system"]),
    content: z.string().optional(),
    parts: z.array(messagePartSchema).optional(),
  })
  .refine(
    (msg) =>
      (typeof msg.content === "string" && msg.content.trim().length > 0) ||
      (Array.isArray(msg.parts) && msg.parts.length > 0),
    {
      message: "Each message must contain non-empty content or parts.",
    }
  );

const chatRequestBodySchema = z.object({
  messages: z
    .array(rawMessageSchema)
    .min(1, "The 'messages' array must contain at least one message."),
});

type RawMessage = z.infer<typeof rawMessageSchema>;

function getUserMessageLength(msg: RawMessage): number {
  if (typeof msg.content === "string") {
    return msg.content.length;
  }
  if (Array.isArray(msg.parts)) {
    return msg.parts.reduce((acc, part) => {
      if (part && part.type === "text" && typeof part.text === "string") {
        return acc + part.text.length;
      }
      return acc;
    }, 0);
  }
  return 0;
}

function normalizeToUIMessage(msg: RawMessage): UIMessage {
  if (Array.isArray(msg.parts) && msg.parts.length > 0) {
    return {
      id: msg.id || crypto.randomUUID(),
      role: msg.role,
      parts: msg.parts as UIMessage["parts"],
    };
  }

  return {
    id: msg.id || crypto.randomUUID(),
    role: msg.role,
    parts: [
      {
        type: "text",
        text: msg.content || "",
      },
    ],
  };
}

function buildSystemPrompt(): string {
  const sectors = getSectorList();
  const sectorListText = sectors
    .map(
      (s) =>
        `- ${s.name} (slug: "${s.slug}"): ${s.description} -> [${s.name}](${s.link})`
    )
    .join("\n");

  return `You are the friendly, helpful AI assistant of the "CSE Roadmap" website (https://cse-roadmap-by-sazzad.vercel.app).
Help users pick a computer science / tech sector, understand it, and find the right page on the site.

AVAILABLE SECTORS ON CSE ROADMAP:
${sectorListText}

RULES:
1. Language:
   - Reply in the user's language.
   - If the user writes in Bangla, or in Banglish (Bangla words written with English/Latin letters), reply in natural, friendly Bangla.
   - If the user writes in English, reply in English.
2. Format & Length:
   - Keep answers short and mobile-friendly: 2 to 4 short paragraphs or a concise bulleted list.
   - Lead directly with the answer. Do not use filler or repetitive introductions.
3. Scope:
   - Scope is strictly limited to Computer Science (CSE), tech learning, programming, software engineering careers, freelancing, and this website.
   - For anything outside this scope (e.g., sports, entertainment, politics, general trivia, weather, etc.), politely decline: say that you can only help with tech learning and careers on CSE Roadmap, and offer to assist them with that.
4. Links & Accuracy:
   - ONLY use links of the exact format /sector/<slug> for slugs that exist in the AVAILABLE SECTORS list above, formatted as markdown links like [Web Development](/sector/web-development).
   - Whenever you discuss a sector, end your answer or section with its markdown link.
   - For general exploration or browsing all sectors, link to [/sector](/sector).
   - NEVER invent sectors, slugs, URLs, external links, salaries, or facts not present in the provided data. If you are unsure or the data does not have it, say so clearly.
5. Undecided Users:
   - If the user is unsure what to learn or where to start, ask 1-2 short clarifying questions (e.g., their background, interests, or current skill level) and suggest 1-3 relevant sectors with links.
6. In-depth Details:
   - Use the getSectorDetails tool only when the user asks deeply about a specific sector (such as its ordered learning steps, how to start, career roles, FAQ, or tracks).`;
}

const sectorDetailsTool = tool({
  description:
    "Fetches detailed roadmap information about a specific sector by its slug (e.g. 'web-development', 'data-science', 'ai-ml'). Call this tool when the user asks deeply about a specific sector, its steps, how to start, career roles, FAQ, or tracks.",
  inputSchema: z.object({
    slug: z
      .string()
      .describe(
        "The slug of the sector from the available sector list, e.g. 'web-development'"
      ),
  }),
  execute: async ({ slug }: { slug: string }) => {
    return getSectorDetails(slug);
  },
});

const tools = {
  getSectorDetails: sectorDetailsTool,
};

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    const parseResult = chatRequestBodySchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request payload.",
          details: parseResult.error.issues.map((i) => i.message).join(", "),
        },
        { status: 400 }
      );
    }

    // Keep only the last 10 messages
    const recentMessages = parseResult.data.messages.slice(-10);

    // Max 500 characters per user message
    for (const msg of recentMessages) {
      if (msg.role === "user" && getUserMessageLength(msg) > 500) {
        return NextResponse.json(
          { error: "User message exceeds 500 characters limit." },
          { status: 400 }
        );
      }
    }

    const normalizedMessages = recentMessages.map(normalizeToUIMessage);
    const modelMessages = await convertToModelMessages(normalizedMessages, {
      tools,
    });

    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const model = google(modelName);

    const result = streamText({
      model,
      instructions: buildSystemPrompt(),
      messages: modelMessages,
      tools,
      stopWhen: isStepCount(5),
    });

    return result.toUIMessageStreamResponse({
      onError: () => "An error occurred while generating the response.",
    });
  } catch (err: unknown) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      {
        error:
          "An error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}
