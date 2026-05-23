import Link from "next/link";
import { Container } from "@/components/Container";
import { SiteBuilderChat } from "@/components/builder/SiteBuilderChat";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-25"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(194, 65, 12, 0.08) 0%, transparent 45%), radial-gradient(circle at 80% 0%, rgba(120, 113, 108, 0.12) 0%, transparent 40%)",
        }}
      />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-400">
            <span className="h-2 w-2 rounded-full bg-amber-600" aria-hidden />
            {site.name} · {site.location} · {site.yearsExperience} years
          </p>
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl lg:text-6xl">
            Describe your business.{" "}
            <span className="text-amber-800 dark:text-amber-500">
              We&apos;ll draft your website.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-400 sm:text-xl">
            A simple way for existing {site.name} clients to explore a new site
            layout—powered by AI, backed by a Lancaster team that builds sites
            that convert.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#builder"
              className="inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-8 py-3.5 text-base font-semibold text-stone-50 shadow-sm transition hover:bg-stone-800 sm:w-auto dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              Start building
            </a>
            <Link
              href={site.links.consultation}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full border border-stone-300 bg-white px-8 py-3.5 text-base font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-100 sm:w-auto dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-stone-500 dark:hover:bg-stone-800"
            >
              Talk to our team
            </Link>
          </div>
        </div>

        <div id="builder" className="mt-14 scroll-mt-24 sm:mt-16 lg:mt-20">
          <SiteBuilderChat />
        </div>
      </Container>
    </section>
  );
}
