import Link from "next/link";
import { Container } from "@/components/Container";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="border-b border-stone-200 bg-stone-100 py-20 dark:border-stone-800 dark:bg-stone-950 sm:py-28"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-stone-900 px-8 py-14 text-center sm:px-12 sm:py-16 lg:px-16 dark:bg-stone-800">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle at 0% 100%, rgba(217, 119, 6, 0.35) 0%, transparent 50%)",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-stone-50 sm:text-4xl">
              Ready to go live with your site?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-300">
              Use the builder above to explore a draft, or talk with our Lancaster
              team for a full website, SEO, and marketing strategy.
            </p>
            <address className="mt-8 not-italic text-stone-300">
              <p className="font-semibold text-stone-100">{site.address.full}</p>
              <p className="mt-2">
                <a
                  href={`tel:${site.phoneTel}`}
                  className="transition hover:text-white"
                >
                  {site.phone}
                </a>
              </p>
            </address>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={site.links.consultation}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-amber-600 px-8 py-3.5 text-base font-semibold text-stone-950 transition hover:bg-amber-500 sm:w-auto"
              >
                Schedule a consultation
              </Link>
              <a
                href={`tel:${site.phoneTel}`}
                className="inline-flex w-full items-center justify-center rounded-full border border-stone-600 px-8 py-3.5 text-base font-semibold text-stone-100 transition hover:border-stone-500 hover:bg-stone-800/50 sm:w-auto"
              >
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
