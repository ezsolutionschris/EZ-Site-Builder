import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/site";

export function About() {
  return (
    <section
      id="about"
      className="border-b border-stone-200 bg-white py-20 dark:border-stone-800 dark:bg-stone-900 sm:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="About"
            title={`${site.yearsExperience} years helping small businesses grow online`}
            description="EZ Marketing is a full-service digital marketing agency based in Lancaster, PA. We build custom websites, run SEO and digital marketing, and manage Google Ads—with an in-house team and no long-term contracts."
          />
          <div className="space-y-5 text-base leading-relaxed text-stone-600 dark:text-stone-400">
            <p>
              This platform is for clients we already work with: a faster way to
              explore a new site layout before our team refines design, content,
              and SEO for launch.
            </p>
            <p>
              {site.parentOrg} has served 2,000+ small businesses across Central
              PA and beyond. Alongside {site.name}, we offer IT through EZComputer
              Solutions and business coaching through EOS.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href={site.links.team}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-amber-800 hover:underline dark:text-amber-500"
              >
                Meet our team →
              </Link>
              <Link
                href={site.links.solution}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-stone-700 hover:underline dark:text-stone-300"
              >
                About {site.parentOrg} →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
