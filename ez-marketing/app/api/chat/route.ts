import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { generateSiteDraft, stitchErrorMessage } from "@/lib/stitch/server";
import { site } from "@/lib/site";

const bodySchema = z.object({
  message: z.string().min(3).max(4000),
  sessionId: z.string().min(1).optional(),
  projectId: z.string().optional(),
});

export async function POST(request: Request) {
  if (!process.env.STITCH_API_KEY?.trim()) {
    return NextResponse.json(
      {
        error:
          "Site generation is not configured. Add STITCH_API_KEY to .env.local and restart the dev server.",
        status: "error",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body", status: "error" },
      { status: 400 },
    );
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Message must be between 3 and 4000 characters.", status: "error" },
      { status: 400 },
    );
  }

  const { message, projectId } = parsed.data;
  const sessionId = parsed.data.sessionId ?? randomUUID();

  try {
    const draft = await generateSiteDraft(message, { projectId });

    return NextResponse.json({
      reply: `Here's a draft homepage based on your description. Review the preview below—you can refine it with another prompt or ${site.name} can help you go live.`,
      sessionId,
      projectId: draft.projectId,
      preview: {
        html: draft.html ?? undefined,
        imageUrl: draft.imageUrl ?? undefined,
      },
      status: "generated" as const,
    });
  } catch (error) {
    const message_text = stitchErrorMessage(error);
    return NextResponse.json(
      {
        error: message_text,
        sessionId,
        status: "error" as const,
      },
      { status: 502 },
    );
  }
}
