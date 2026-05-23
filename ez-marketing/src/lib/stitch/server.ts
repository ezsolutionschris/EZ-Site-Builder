import "server-only";

import { stitch, StitchError } from "@google/stitch-sdk";

export type SiteDraftResult = {
  html: string | null;
  imageUrl: string | null;
  projectId: string;
  screenId: string;
};

function getApiKey(): string | undefined {
  return process.env.STITCH_API_KEY?.trim();
}

async function fetchHtmlFromUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30_000) });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function resolveProject(
  existingProjectId?: string,
): Promise<{ projectId: string; project: ReturnType<typeof stitch.project> }> {
  const envProjectId = process.env.STITCH_PROJECT_ID?.trim();
  const projectId = existingProjectId ?? envProjectId;

  if (projectId) {
    return { projectId, project: stitch.project(projectId) };
  }

  const created = await stitch.createProject("EZ Site Builder");
  return {
    projectId: created.projectId,
    project: created,
  };
}

export function isStitchConfigured(): boolean {
  return Boolean(getApiKey());
}

export async function generateSiteDraft(
  prompt: string,
  options?: { projectId?: string },
): Promise<SiteDraftResult> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("STITCH_API_KEY is not configured");
  }

  process.env.STITCH_API_KEY = apiKey;

  const { projectId, project } = await resolveProject(options?.projectId);

  const screen = await project.generate(
    `Create a professional small-business website homepage. ${prompt}. Use a clean, modern layout with clear headings, a hero section, and a contact call to action. Device: desktop.`,
    "DESKTOP",
  );

  const htmlUrl = await screen.getHtml();
  const imageUrl = await screen.getImage();

  const html =
    typeof htmlUrl === "string" ? await fetchHtmlFromUrl(htmlUrl) : null;

  return {
    html,
    imageUrl: typeof imageUrl === "string" ? imageUrl : null,
    projectId,
    screenId: screen.screenId,
  };
}

export function stitchErrorMessage(error: unknown): string {
  if (error instanceof StitchError) {
    if (error.code === "AUTH_FAILED") {
      return "Stitch authentication failed. Check STITCH_API_KEY in .env.local.";
    }
    if (error.code === "RATE_LIMITED") {
      return "Too many requests. Please wait a moment and try again.";
    }
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Something went wrong while generating your site draft.";
}
