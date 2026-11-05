import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Star, BadgeCheck, ImageOff, GitCompareArrows } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AmenityIcon } from "@/components/AmenityIcon";
import { useApp } from "@/context/AppContext";
import { cn, formatPrice, formatDistance, distanceKm, bedStats, startingPrice, availabilityLevel } from "@/lib/utils";

const GENDER_VARIANT = { Boys: "default", Girls: "accent", "Co-ed": "outline" };
const GENDER_KEY = { Boys: "hero.boys", Girls: "hero.girls", "Co-ed": "hero.coed" };

const LEVEL = {
  ok: { dot: "bg-success", text: "text-success", pill: "bg-success-soft" },
  low: { dot: "bg-warning", text: "text-[#8a5a00]", pill: "bg-warning-soft" },
  full: { dot: "bg-error", text: "text-error", pill: "bg-error-soft" },
};

export function HostelCard({ hostel, className }) {
  const { t, favorites, toggleFavorite, compare, toggleCompare, origin } = useApp();
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const saved = favorites.includes(hostel.id);
  const selectedForCompare = compare.includes(hostel.id);
  const km = distanceKm(origin, hostel);
  const { available, total } = bedStats(hostel);
  const level = availabilityLevel(available, total);
  const tone = LEVEL[level];
  const availText =
    level === "full" ? t("card.full") : level === "low" ? `${available} ${t("card.fewLeft")}` : `${available} ${t("card.bedsFree")}`;
  const shownAmenities = hostel.amenities.slice(0, 3);
  const extra = hostel.amenities.length - shownAmenities.length;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-soft focus-within:ring-2 focus-within:ring-accent hover:border-primary/30",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-primary-soft">
        {!imgLoaded && !imgFailed && <Skeleton className="absolute inset-0 rounded-none" />}
        {imgFailed ? (
          <div className="pattern-dhaka flex h-full w-full items-center justify-center">
            <ImageOff className="h-8 w-8 text-white/80" aria-hidden="true" />
          </div>
        ) : (
          <img
            src={hostel.photos[0]}
            alt={`${hostel.name}, ${hostel.address}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgFailed(true)}
            className={cn("h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]", !imgLoaded && "opacity-0")}
          />
        )}

        {hostel.verified && (
          <Badge variant="verified" className="absolute left-3 top-3 gap-1 shadow-soft">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {t("card.verified")}
          </Badge>
        )}

        <button
          type="button"
          onClick={() => toggleFavorite(hostel.id)}
          aria-pressed={saved}
          aria-label={saved ? t("card.removeSaved") : t("card.saveHostel")}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-surface/95 shadow-soft hover:scale-105 active:scale-95"
        >
          <Heart className={cn("h-5 w-5", saved ? "fill-error text-error" : "text-ink")} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => toggleCompare(hostel.id)}
          aria-pressed={selectedForCompare}
          aria-label={selectedForCompare ? "Remove from comparison" : "Add to comparison"}
          className={cn("absolute bottom-3 right-3 z-10 flex h-10 items-center justify-center gap-1 rounded-full px-3 text-xs font-semibold shadow-soft", selectedForCompare ? "bg-primary text-white" : "bg-surface/95 text-ink hover:bg-primary-soft")}
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
              <Star className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
              <span className="font-semibold">{hostel.rating.toFixed(1)}</span>
              <span className="text-muted">({hostel.reviewCount})</span>
            </span>
          </div>
        </div>

        <ul className="flex items-center gap-2" aria-label={t("card.amenities")}>
          {shownAmenities.map((a) => (
            <li key={a} title={a} className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <AmenityIcon name={a} className="h-[18px] w-[18px]" />
              <span className="sr-only">{a}</span>
            </li>
          ))}
          {extra > 0 && <li className="text-xs font-semibold text-muted">+{extra}</li>}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-line pt-3">
          <p className="text-sm text-muted">
            <span className="block text-xs">{t("card.from")}</span>
            <span className="block whitespace-nowrap font-semibold text-ink">{formatPrice(startingPrice(hostel))}</span>
          </p>
          <span className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", tone.pill, tone.text)}>
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
