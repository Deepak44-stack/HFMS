import { Search, GitCompareArrows, Send } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function HowItWorks() {
  const { t } = useApp();
  const steps = [
    { icon: Search, title: t("how.s1"), desc: t("how.s1d") },
    { icon: GitCompareArrows, title: t("how.s2"), desc: t("how.s2d") },
    { icon: Send, title: t("how.s3"), desc: t("how.s3d") },
  ];
  return (
    <section aria-labelledby="how-title" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="eyebrow text-primary">A simple process</p>
      <h2 id="how-title" className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{t("how.title")}</h2>
      <ol className="relative mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <li key={title} className="relative flex gap-4 border-t border-line pt-5 md:block md:border-t-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0 md:last:pr-0">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary md:mb-5">
              <span className="sr-only">Step {i + 1}</span><Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-sans text-lg font-bold">{title}</h3>
              <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted">{desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
