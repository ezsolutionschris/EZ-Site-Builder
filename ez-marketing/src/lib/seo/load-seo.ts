import { readFileSync } from "fs";
import { join } from "path";
import type { SiteSeo } from "./types";

const DEFAULT_SLUG = "ez-marketing";

export function loadSiteSeo(slug: string = DEFAULT_SLUG): SiteSeo {
  const filePath = join(
    process.cwd(),
    "content",
    "sites",
    slug,
    "seo.json",
  );
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SiteSeo;
}
