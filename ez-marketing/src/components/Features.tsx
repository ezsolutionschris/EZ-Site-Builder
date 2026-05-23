import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceIcon } from "@/components/ServiceIcon";
import { features } from "@/lib/site";

export function Features() {
  return (
    <section
      id="features"
      className="border-b border-stone-200 bg-stone-100 py-20 dark:border-stone-800 dark:bg-stone-950 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Platform"
          title="Built for clients who need sites that work"
          description="SEO-friendly structure, modern design, and the same team behind EZMarketing.com."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="group rounded-2xl border border-stone-200 bg-white p-8 transition hover:border-stone-300 hover:shadow-md dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-600"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 transition group-hover:bg-amber-200/80 dark:bg-amber-950/60 dark:group-hover:bg-amber-900/50">
                <ServiceIcon name={feature.icon} />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
                {feature.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-400">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
