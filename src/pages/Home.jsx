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
        <div className="mx-auto max-w-7xl px-4 pb-28 pt-12 sm:px-6 sm:pt-16 md:pb-32 lg:px-8 lg:pt-20">
          <p className="eyebrow text-accent">Hostel Finder · Kathmandu Valley</p>
          <h1 className="mt-5 max-w-3xl text-[2.15rem] font-semibold leading-[1.06] sm:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{t("hero.subtitle")}</p>
        </div>
      </section>

      {/* The search card overlaps the hero edge — the one deliberate moment on the page */}
      <div className="relative z-10 mx-auto -mt-20 max-w-5xl px-4 sm:-mt-24 sm:px-6 lg:px-8">
        <HeroSearch />
      </div>

      <div className="space-y-20 pt-16 sm:space-y-24 sm:pt-20">
        <TrustStrip />
        <PopularAreas />
        <TopRated hostels={topRated} loading={loading} />
        <HowItWorks />
      </div>
    </>
  );
}
