import { useApp } from "@/context/AppContext";

export function HowItWorks() {
  const { t } = useApp();
  const steps = [t("how.s1"), t("how.s2"), t("how.s3")];
  return (
    <section aria-labelledby="how-title" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 id="how-title" className="font-display text-2xl font-semibold sm:text-3xl">{t("how.title")}</h2>
      <ol className="mt-6 flex flex-col divide-y divide-line border-y border-line md:flex-row md:divide-x md:divide-y-0">
        {steps.map((step, i) => (
          <li key={step} className="flex flex-1 items-center gap-4 py-4 md:px-5 md:first:pl-0">
            <span className="font-display text-xl font-semibold text-accent">0{i + 1}</span>
            <span className="text-sm font-semibold">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
