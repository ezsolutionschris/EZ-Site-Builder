import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { buildJsonLdScript, buildPageMetadata } from "@/lib/seo/build-metadata";
import { loadSiteSeo } from "@/lib/seo/load-seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const seo = loadSiteSeo();

export const metadata: Metadata = buildPageMetadata(seo);

const jsonLd = buildJsonLdScript(seo);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-stone-50 font-sans text-stone-900 dark:bg-stone-950 dark:text-stone-100">
        {jsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLd }}
          />
        ) : null}
        {children}
      </body>
    </html>
  );
}
