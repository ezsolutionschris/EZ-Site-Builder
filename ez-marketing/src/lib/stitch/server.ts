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
    const text = await res.text();
    return text.length > 0 ? text : null;
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

  const fullPrompt = `Design a complete professional business website UI for desktop.
Do NOT generate any photographs or real images.
Use placeholder colored blocks or icons for images.
Business description: ${prompt}
Requirements:
- Full webpage layout with HTML and CSS
- Navigation bar with logo and menu links
- Hero section with headline and call-to-action button
- Services or features section
- About section
- Contact section with phone and address
- Footer
Use a clean modern design with professional typography and a cohesive color scheme.`;

  const screen = await project.generate(fullPrompt, "DESKTOP");

  const htmlUrl = await screen.getHtml();
  const imageUrl = await screen.getImage();

  console.log("htmlUrl type:", typeof htmlUrl, "value:", htmlUrl);

  let html: string | null = null;
  if (typeof htmlUrl === "string" && htmlUrl.startsWith("http")) {
    html = await fetchHtmlFromUrl(htmlUrl);
    console.log("fetched html length:", html?.length ?? "null");
  }

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