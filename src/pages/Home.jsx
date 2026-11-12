import { useMemo } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroSearch } from "@/components/home/HeroSearch";
import { TrustStrip } from "@/components/home/TrustStrip";
import { PopularAreas } from "@/components/home/PopularAreas";
import { TopRated } from "@/components/home/TopRated";
import { HowItWorks } from "@/components/home/HowItWorks";
import { HostelImage } from "@/components/HostelImage";
import { hostels } from "@/data/hostels";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const { t } = useApp();

  const topRated = useMemo(
    () => hostels.filter((h) => h.verified).sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount).slice(0, 8),
    []
  );

  return (
    <>
      <section className="hero-surface relative overflow-hidden text-ink">
        <div className="page-container grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(380px,.82fr)] lg:items-center lg:gap-20 lg:py-20">
          <div className="relative z-10">
            <h1 className="max-w-2xl text-[44px] font-semibold leading-[1.02] tracking-[-.035em] sm:text-[64px]">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">{t("hero.subtitle")}</p>
            <div className="mt-9 max-w-2xl">
              <HeroSearch />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Verified listings</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Honest monthly pricing</span>
              <Link to="/search" className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-dark">Browse all <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[500px] lg:block">
            <HostelImage src={hostels[1]?.photos?.[0]} alt="" className="relative w-[86%]" />
            <HostelImage src={hostels[4]?.photos?.[0]} alt="" className="absolute -bottom-8 right-0 w-[48%] border-8 border-primary-soft" />
            <p className="absolute bottom-2 left-4 text-xs font-semibold uppercase tracking-[.14em] text-white">Kathmandu Valley</p>
          </div>
        </div>
      </section>

      <div className="space-y-20 py-16 sm:space-y-24 sm:py-20">
        <TrustStrip />
        <PopularAreas />
        <TopRated hostels={topRated} loading={false} />
        <HowItWorks />
      </div>
    </>
  );
}
