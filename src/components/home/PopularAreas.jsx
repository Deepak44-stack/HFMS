import { Link } from "react-router-dom";
import { areas } from "@/data/areas";
import { hostels } from "@/data/hostels";
import { useApp } from "@/context/AppContext";

export function PopularAreas() {
  const { t, lang, setOrigin } = useApp();
  return (
    <section aria-labelledby="areas-title" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 id="areas-title" className="font-display text-3xl font-semibold sm:text-4xl">{t("areas.title")}</h2>
      <p className="mt-1.5 text-muted">{t("areas.subtitle")}</p>

      <ul className="mt-8 grid gap-x-10 gap-y-0 border-y border-line md:grid-cols-[1.25fr_1fr_1fr]">
        {areas.map((a, i) => {
          const count = hostels.filter((h) => h.area.toLowerCase() === a.id).length;
          return (
            <li key={a.id} className={i < 2 ? "md:row-span-2" : ""}>
              <Link
                to={`/search?area=${a.id}`}
                onClick={() => setOrigin({ lat: a.lat, lng: a.lng, label: a.name })}
                className="group flex items-center justify-between border-b border-line py-5 hover:text-primary md:gap-5"
              >
                <span className={i < 2 ? "font-display text-2xl font-semibold md:text-3xl" : "font-semibold"}>
                  {lang === "ne" ? a.nameNe : a.name}
                </span>
                <span className="text-sm text-muted">{count} {count === 1 ? t("areas.one") : t("areas.count")}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
