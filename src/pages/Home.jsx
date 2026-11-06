import { useEffect, useMemo, useState } from "react";
import { HeroSearch } from "@/components/home/HeroSearch";
import { TrustStrip } from "@/components/home/TrustStrip";
import { PopularAreas } from "@/components/home/PopularAreas";
import { TopRated } from "@/components/home/TopRated";
import { HowItWorks } from "@/components/home/HowItWorks";
import { hostels } from "@/data/hostels";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const { t } = useApp();
  const [loading, setLoading] = useState(true);

  // Mock network delay so the skeleton state is visible and testable.
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(id);
  }, []);

  const topRated = useMemo(
    () => hostels.filter((h) => h.verified).sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount).slice(0, 8),
    []
  );

  return (
    <>
      <section className="hero-surface relative overflow-hidden text-white">
        <div className="page-container grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1.04fr)_minmax(380px,.96fr)] lg:items-center lg:gap-12 lg:py-16">
          <div className="relative z-10">
            <p className="eyebrow text-primary-soft">Hostel Finder · Kathmandu Valley</p>
            <h1 className="mt-5 max-w-2xl text-[40px] font-semibold leading-[1.04] tracking-[-.025em] sm:text-[56px]">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-xl sm:leading-8">{t("hero.subtitle")}</p>
            <div className="mt-8 max-w-2xl">
              <HeroSearch />
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[520px] lg:block">
            <div className="absolute -inset-4 rounded-[32px] border border-white/15" aria-hidden="true" />
            <img src={hostels[1]?.photos?.[0]} alt="" className="relative aspect-[4/5] w-full rounded-[24px] object-cover shadow-2xl" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-primary-dark/90 p-4 shadow-card">
              <p className="text-sm font-semibold text-accent">{t("card.verified")}</p>
              <p className="mt-1 text-base font-semibold text-white">{t("hero.location")}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-20 py-16 sm:space-y-24 sm:py-20">
        <TrustStrip />
        <PopularAreas />
        <TopRated hostels={topRated} loading={loading} />
        <HowItWorks />
      </div>
    </>
  );
}
