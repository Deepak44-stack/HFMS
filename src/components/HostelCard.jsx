import { Link } from "react-router-dom";
import { Heart, MapPin, Star, BadgeCheck, GitCompareArrows } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useApp } from "@/context/AppContext";
import { cn, formatPrice, formatDistance, distanceKm, bedStats, startingPrice, availabilityLevel } from "@/lib/utils";
import { HostelImage } from "@/components/HostelImage";

const GENDER_VARIANT = { Boys: "default", Girls: "accent", "Co-ed": "outline" };
const GENDER_KEY = { Boys: "hero.boys", Girls: "hero.girls", "Co-ed": "hero.coed" };

const LEVEL = {
  ok: { dot: "bg-primary", text: "text-primary", pill: "bg-primary-soft" },
  low: { dot: "bg-accent", text: "text-accent", pill: "bg-accent-soft" },
  full: { dot: "bg-muted", text: "text-muted", pill: "bg-background" },
};

export function HostelCard({ hostel, className }) {
  const { t, favorites, toggleFavorite, compare, toggleCompare, origin } = useApp();

  const saved = favorites.includes(hostel.id);
  const selectedForCompare = compare.includes(hostel.id);
  const km = distanceKm(origin, hostel);
  const { available, total } = bedStats(hostel);
  const level = availabilityLevel(available, total);
  const tone = LEVEL[level];
  const availText =
    level === "full" ? t("card.full") : level === "low" ? `${available} ${t("card.fewLeft")}` : `${available} ${t("card.bedsFree")}`;
  const extra = hostel.amenities.length - 2;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden border border-line bg-surface focus-within:ring-2 focus-within:ring-accent hover:border-primary/30",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-primary-soft">
        <HostelImage src={hostel.photos[0]} alt={`${hostel.name}, ${hostel.address}`} className="h-full" showSampleLabel />

        {hostel.verified && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 bg-surface/95 px-2 py-1 text-[11px] font-semibold text-primary">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {t("card.verified")}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleFavorite(hostel.id)}
          aria-pressed={saved}
          aria-label={saved ? t("card.removeSaved") : t("card.saveHostel")}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center bg-surface/95 shadow-soft hover:scale-105 active:scale-95"
        >
          <Heart className={cn("h-5 w-5", saved ? "fill-error text-error" : "text-ink")} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => toggleCompare(hostel.id)}
          aria-pressed={selectedForCompare}
          aria-label={selectedForCompare ? "Remove from comparison" : "Add to comparison"}
          className={cn("absolute bottom-3 right-3 z-10 flex h-10 items-center justify-center gap-1 px-3 text-xs font-semibold shadow-soft", selectedForCompare ? "bg-primary text-white" : "bg-surface/95 text-ink hover:bg-primary-soft")}
        >
          <GitCompareArrows className="h-4 w-4" aria-hidden="true" /> Compare
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 min-h-[2.6rem] font-display text-[1.05rem] font-semibold leading-snug text-ink">
              {/* The title link's ::after covers the whole card so it is one big tap target */}
              <Link to={`/hostel/${hostel.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
                {hostel.name}
              </Link>
            </h3>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-muted">
            <Badge variant={GENDER_VARIANT[hostel.gender]}>{t(GENDER_KEY[hostel.gender])}</Badge>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {formatDistance(km)} {t("card.away")}
            </span>
            <span className="inline-flex items-center gap-1 text-ink">
              <Star className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
              <span className="font-semibold">{hostel.rating.toFixed(1)}</span>
              <span className="text-muted">({hostel.reviewCount})</span>
            </span>
          </div>
        </div>

        <p className="text-xs text-muted">
          {hostel.amenities.slice(0, 2).join(" · ")}{extra > 0 ? ` · +${extra}` : ""}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-line pt-3">
          <p className="text-sm text-muted">
            <span className="block text-xs">{t("card.from")}</span>
            <span className="block whitespace-nowrap font-semibold text-ink">{formatPrice(startingPrice(hostel))}</span>
          </p>
          <span className={cn("inline-flex shrink-0 items-center gap-1.5 px-2 py-1 text-xs font-semibold", tone.pill, tone.text)}>
            <span className={cn("h-2 w-2 rounded-full", tone.dot)} aria-hidden="true" />
            {availText}
          </span>
        </div>
      </div>
    </article>
  );
}

export function HostelCardSkeleton({ className }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-line bg-surface shadow-soft", className)} role="status" aria-label="Loading hostel">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-4/5" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </div>
        <div className="flex items-center justify-between border-t border-line pt-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
