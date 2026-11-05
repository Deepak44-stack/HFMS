import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import { HostelCard, HostelCardSkeleton } from "@/components/HostelCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

const CARD_W = "w-[78vw] max-w-[300px] sm:w-[300px]";

export function TopRated({ hostels, loading }) {
  const { t } = useApp();
  const scroller = useRef(null);
  const scrollBy = (dir) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="top-title" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 id="top-title" className="font-display text-2xl font-semibold sm:text-3xl">{t("top.title")}</h2>
          <p className="mt-1.5 text-muted">{t("top.subtitle")}</p>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="outline" size="icon" onClick={() => scrollBy(-1)} aria-label="Scroll left"><ChevronLeft className="h-5 w-5" /></Button>
          <Button variant="outline" size="icon" onClick={() => scrollBy(1)} aria-label="Scroll right"><ChevronRight className="h-5 w-5" /></Button>
        </div>
        <Link to="/search" className="shrink-0 text-sm font-semibold text-primary underline-offset-4 hover:underline">
          {t("top.seeAll")}
        </Link>
      </div>

      {!loading && hostels.length === 0 ? (
        <EmptyState
          className="mt-6"
          icon={SearchX}
          title={t("states.emptyTitle")}
          description={t("states.emptyDesc")}
        />
      ) : (
        <div
          ref={scroller}
          className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-8 gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          role="list"
          aria-busy={loading}
          aria-label={t("top.title")}
        >
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} role="listitem" className={`${CARD_W} shrink-0 snap-start`}><HostelCardSkeleton /></div>
              ))
            : hostels.map((h) => (
                <div key={h.id} role="listitem" className={`${CARD_W} shrink-0 snap-start`}>
                  <HostelCard hostel={h} className="h-full" />
                </div>
              ))}
        </div>
      )}
    </section>
  );
}
