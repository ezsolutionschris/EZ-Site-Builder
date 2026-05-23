import type { Metadata } from "next";
import { site } from "@/lib/site";
import type { SiteSeo } from "./types";

export function buildPageMetadata(seo: SiteSeo): Metadata {
  const baseUrl = site.url.replace(/\/$/, "");
  const canonical = seo.canonical ?? baseUrl;

  const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: seo.title,
    description: seo.description,
    alternates: { canonical },
    robots: seo.robots
      ? {
          index: seo.robots.index,
          follow: seo.robots.follow,
        }
      : undefined,
    openGraph: seo.openGraph
      ? {
          title: seo.openGraph.title ?? seo.title,
          description: seo.openGraph.description ?? seo.description,
          url: canonical,
          siteName: seo.openGraph.siteName ?? site.name,
          type: (seo.openGraph.type as "website") ?? "website",
          images: seo.openGraph.image
            ? [{ url: seo.openGraph.image }]
            : undefined,
        }
      : {
          title: seo.title,
          description: seo.description,
          url: canonical,
          siteName: site.name,
          type: "website",
        },
    twitter: seo.twitter
      ? {
          card: seo.twitter.card ?? "summary_large_image",
          title: seo.twitter.title ?? seo.title,
          description: seo.twitter.description ?? seo.description,
          images: seo.twitter.image ? [seo.twitter.image] : undefined,
        }
      : undefined,
  };

  return metadata;
}

export function buildJsonLdScript(seo: SiteSeo): string | null {
  if (!seo.jsonLd) return null;
  return JSON.stringify(seo.jsonLd);
}
