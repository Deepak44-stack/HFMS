import { Link } from "react-router-dom";
import { HeartOff } from "lucide-react";
import { HostelCard } from "@/components/HostelCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { hostels } from "@/data/hostels";
import { useApp } from "@/context/AppContext";

export default function Favorites() {
  const { t, favorites } = useApp();
  const saved = hostels.filter((h) => favorites.includes(h.id));
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">{t("nav.favorites")}</h1>
      {saved.length === 0 ? (
        <EmptyState
          className="mt-6"
          icon={HeartOff}
          title={t("states.favEmptyTitle")}
          description={t("states.favEmptyDesc")}
          action={<Button asChild><Link to="/">{t("nav.search")}</Link></Button>}
        />
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {saved.map((h) => (
            <li key={h.id}><HostelCard hostel={h} className="h-full" /></li>
          ))}
        </ul>
      )}
    </div>
  );
}
