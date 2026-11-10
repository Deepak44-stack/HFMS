import { ShieldCheck, BedDouble, MessageSquareQuote } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { areas } from "@/data/areas";
import { hostels } from "@/data/hostels";

export function TrustStrip() {
  const { t } = useApp();
  const verifiedCount = hostels.filter((hostel) => hostel.verified).length;
  const reviewCount = hostels.reduce((total, hostel) => total + hostel.reviewCount, 0);
  const points = [
    { icon: ShieldCheck, title: t("trust.verified"), desc: t("trust.verifiedDesc") },
    { icon: BedDouble, title: t("trust.availability"), desc: t("trust.availabilityDesc") },
    { icon: MessageSquareQuote, title: t("trust.reviews"), desc: t("trust.reviewsDesc") },
  ];
  return (
    <section aria-labelledby="trust-title" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-primary">{t("trust.eyebrow")}</p>
          <h2 id="trust-title" className="mt-3 max-w-xl font-display text-2xl font-semibold sm:text-3xl">{t("trust.title")}</h2>
        </div>
        <p className="text-sm text-muted">{t("trust.coverage").replace("{areas}", areas.length)}</p>
      </div>
      <dl className="mt-7 grid grid-cols-3 border-y border-line py-4 sm:max-w-2xl sm:gap-10 sm:border-y-0 sm:py-0">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[.12em] text-muted">{t("trust.listings")}</dt>
          <dd className="mt-1 font-display text-2xl font-semibold text-ink">{verifiedCount}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[.12em] text-muted">{t("trust.reviewsCount")}</dt>
          <dd className="mt-1 font-display text-2xl font-semibold text-ink">{reviewCount}+</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[.12em] text-muted">{t("trust.areasCount")}</dt>
          <dd className="mt-1 font-display text-2xl font-semibold text-ink">{areas.length}</dd>
        </div>
      </dl>
      <ul className="mt-7 grid gap-0 border-y border-line md:grid-cols-3 md:divide-x md:divide-line">
        {points.map(({ icon: Icon, title, desc }, index) => (
          <li key={title} className="flex gap-4 py-5 md:px-6 md:first:pl-0 md:last:pr-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/20 text-sm font-display font-semibold text-primary">
              {index + 1}
            </span>
            <div>
              <h3 className="flex items-center gap-2 font-sans text-base font-bold"><Icon className="h-4 w-4 text-primary" aria-hidden="true" />{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
