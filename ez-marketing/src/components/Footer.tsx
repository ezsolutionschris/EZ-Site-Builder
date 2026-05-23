import Link from "next/link";
import { Container } from "@/components/Container";
import { footerLinks, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-50 py-14 dark:bg-stone-950 sm:py-16">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-stone-900 dark:text-stone-50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-900 text-sm font-bold text-stone-50 dark:bg-stone-100 dark:text-stone-900">
                EZ
              </span>
              {site.name}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              {site.tagline}. {site.location} — serving clients nationwide.
            </p>
            <p className="mt-3 text-xs text-stone-500 dark:text-stone-500">
              Powered by {site.name} · Part of{" "}
              <a
                href={site.links.solution}
                className="font-medium text-amber-800 hover:underline dark:text-amber-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.parentOrg}
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-200">
              Platform
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-600 transition hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-200">
              {site.name}
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.marketing.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-stone-600 transition hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-200">
              {site.parentOrg}
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.ezSolution.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-stone-600 transition hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-stone-600 dark:text-stone-400">
              <a
                href={`tel:${site.phoneTel}`}
                className="transition hover:text-stone-900 dark:hover:text-stone-100"
              >
                {site.phone}
              </a>
              <br />
              <span className="mt-2 inline-block">{site.address.full}</span>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-200 pt-8 sm:flex-row dark:border-stone-800">
          <p className="text-sm text-stone-500">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-sm text-stone-500">
            <a
              href={site.links.marketing}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-stone-800 dark:hover:text-stone-300"
            >
              ezmarketing.com
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
