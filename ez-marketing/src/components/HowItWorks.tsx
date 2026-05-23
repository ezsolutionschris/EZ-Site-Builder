import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { howItWorks } from "@/lib/site";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-b border-stone-200 bg-white py-20 dark:border-stone-800 dark:bg-stone-900 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From idea to draft in three steps"
          description="No complicated dashboards—just describe what you need and preview a layout."
        />

        <ol className="mt-14 grid gap-8 sm:grid-cols-3">
          {howItWorks.map((item) => (
            <li
              key={item.step}
              className="relative rounded-2xl border border-stone-200 bg-stone-50 p-8 dark:border-stone-700 dark:bg-stone-950"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-lg font-semibold text-amber-900 dark:bg-amber-950/60 dark:text-amber-400">
                {item.step}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-stone-900 dark:text-stone-50">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-400">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
