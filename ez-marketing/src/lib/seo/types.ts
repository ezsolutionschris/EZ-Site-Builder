export type SiteSeo = {
  title: string;
  description: string;
  canonical?: string;
  robots?: { index: boolean; follow: boolean };
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
    siteName?: string;
  };
  twitter?: {
    card?: "summary" | "summary_large_image";
    title?: string;
    description?: string;
    image?: string;
  };
  jsonLd?: Record<string, unknown>;
};
