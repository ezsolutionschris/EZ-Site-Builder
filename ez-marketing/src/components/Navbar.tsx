"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/Container";
import { navLinks, site } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-md dark:border-stone-800/80 dark:bg-stone-950/90">
      <Container as="nav" className="flex h-16 items-center justify-between sm:h-[4.25rem]">
        <Link
          href="/"
          className="group flex items-center gap-2 font-semibold tracking-tight text-stone-900 dark:text-stone-50"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-900 text-sm font-bold text-stone-50 transition group-hover:bg-amber-800 dark:bg-stone-100 dark:text-stone-900 dark:group-hover:bg-amber-600 dark:group-hover:text-stone-950">
            EZ
          </span>
          <span className="hidden text-lg sm:inline">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-stone-600 transition hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#builder"
            className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-stone-50 transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
          >
            Start building
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-stone-700 hover:bg-stone-200/80 md:hidden dark:text-stone-300 dark:hover:bg-stone-800"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={`border-t border-stone-200 bg-stone-50 md:hidden dark:border-stone-800 dark:bg-stone-950 ${open ? "block" : "hidden"}`}
      >
        <Container className="flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-900"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#builder"
            className="mt-2 rounded-full bg-stone-900 px-5 py-3 text-center text-sm font-semibold text-stone-50 dark:bg-stone-100 dark:text-stone-900"
            onClick={() => setOpen(false)}
          >
            Start building
          </a>
        </Container>
      </div>
    </header>
  );
}
