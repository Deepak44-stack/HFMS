import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { areas } from "@/data/areas";
import { hostels } from "@/data/hostels";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const TONES = ["bg-primary-soft", "bg-accent-soft", "bg-surface"];

export function PopularAreas() {
  const { t, lang, setOrigin } = useApp();
  return (
    <section aria-labelledby="areas-title" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="eyebrow text-primary">Explore by area</p>
      <h2 id="areas-title" className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{t("areas.title")}</h2>
      <p className="mt-1.5 text-muted">{t("areas.subtitle")}</p>

      <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {areas.map((a, i) => {
          const count = hostels.filter((h) => h.area.toLowerCase() === a.id).length;
          return (
            <li key={a.id}>
              <Link
                to={`/search?area=${a.id}`}
                onClick={() => setOrigin({ lat: a.lat, lng: a.lng, label: a.name })}
                className={cn(
                  "group relative flex h-full min-h-32 flex-col justify-between overflow-hidden rounded-xl border border-line p-4 shadow-soft hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lift md:min-h-36 md:p-5",
                  TONES[i % 3]
                )}
              >
                <ArrowUpRight className="absolute right-3 top-3 h-5 w-5 text-primary/50 group-hover:text-primary" aria-hidden="true" />
                <span className="pr-6 font-display text-lg font-semibold leading-tight text-ink md:text-xl">
                  {lang === "ne" ? a.nameNe : a.name}
                </span>
                <span>
                  <span className="block text-sm text-ink/75">{a.hint}</span>
                  <span className="mt-1 block text-sm font-semibold text-primary">
                    {count} {count === 1 ? t("areas.one") : t("areas.count")}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
