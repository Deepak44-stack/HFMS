import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, LocateFixed, Loader2, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select, Label } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const RADII = [
  { value: "500", label: "500 m" },
  { value: "1000", label: "1 km" },
  { value: "3000", label: "3 km" },
  { value: "5000", label: "5 km" },
];
const BUDGETS = [
  { value: "", key: "hero.anyBudget" },
  { value: "0-5000", label: "Under NPR 5,000" },
  { value: "5000-7500", label: "NPR 5,000 – 7,500" },
  { value: "7500-10000", label: "NPR 7,500 – 10,000" },
  { value: "10000-", label: "NPR 10,000+" },
];
const GENDERS = [
  { value: "Boys", key: "hero.boys" },
  { value: "Girls", key: "hero.girls" },
  { value: "Co-ed", key: "hero.coed" },
];

export function HeroSearch({ initialLocation = "" }) {
  const { t, setOrigin } = useApp();
  const navigate = useNavigate();
  const [location, setLocation] = useState(initialLocation);
  const [radius, setRadius] = useState("1000");
  const [budget, setBudget] = useState("");
  const [roomType, setRoomType] = useState("");
  const [gender, setGender] = useState("");
  const [geo, setGeo] = useState("idle"); // idle | locating | set | denied
  const [showFilters, setShowFilters] = useState(false);

  const useMyLocation = () => {
    if (!("geolocation" in navigator)) return setGeo("denied");
    setGeo("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: "Your location" });
        setLocation(t("hero.locationSet"));
        setGeo("set");
      },
      () => setGeo("denied"),
      { timeout: 8000 }
    );
  };

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location && geo !== "set") params.set("q", location);
    if (geo === "set") params.set("near", "me");
    params.set("radius", radius);
    if (budget) params.set("budget", budget);
    if (roomType) params.set("room", roomType);
    if (gender) params.set("gender", gender);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      aria-label={t("hero.searchBtn")}
      className="border border-line bg-surface p-4 shadow-lift sm:p-5"
    >
      {/* Row 1 — where */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex-1">
          <Label htmlFor="hs-location">{t("hero.location")}</Label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary" aria-hidden="true" />
            <Input
              id="hs-location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                if (geo === "set") setGeo("idle");
              }}
              placeholder={t("hero.locationPlaceholder")}
              className="h-12 border-transparent bg-background pl-10 text-base focus:border-primary/40"
              autoComplete="off"
            />
          </div>
        </div>
        <Button type="button" variant="outline" size="lg" onClick={useMyLocation} disabled={geo === "locating"} className="md:shrink-0">
          {geo === "locating" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <LocateFixed className="h-4 w-4 text-primary" aria-hidden="true" />}
          {geo === "locating" ? t("hero.locating") : t("hero.useLocation")}
        </Button>
      </div>
      <p role="status" aria-live="polite" className={cn("mt-2 text-sm", geo === "denied" ? "text-error" : "text-success", geo === "idle" || geo === "locating" ? "sr-only" : "")}>
        {geo === "denied" ? t("hero.locationDenied") : geo === "set" ? t("hero.locationSet") : ""}
      </p>

      <button type="button" onClick={() => setShowFilters((open) => !open)} aria-expanded={showFilters} className="mt-3 inline-flex h-10 items-center gap-2 text-sm font-semibold text-primary sm:hidden">
        <SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> {showFilters ? "Hide filters" : "Add filters"}
      </button>

      {/* Row 2 — how far, how much, what kind of room */}
      <div className={cn("mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3", showFilters ? "grid" : "hidden sm:grid")}>
        <div>
          <Label htmlFor="hs-radius">{t("hero.radius")}</Label>
          <Select id="hs-radius" value={radius} onChange={(e) => setRadius(e.target.value)}>
            {RADII.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="hs-budget">{t("hero.budget")}</Label>
          <Select id="hs-budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
            {BUDGETS.map((b) => (
              <option key={b.value} value={b.value}>{b.key ? t(b.key) : b.label}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="hs-room">{t("hero.roomType")}</Label>
          <Select id="hs-room" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
            <option value="">{t("hero.anyRoom")}</option>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>{n} {t("hero.seater")}</option>
            ))}
          </Select>
        </div>
      </div>

      {/* Row 3 — who it's for + submit */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <fieldset className={cn(showFilters ? "block" : "hidden sm:block")}>
          <legend className="mb-1.5 text-sm font-medium">{t("hero.gender")}</legend>
          <div className="flex flex-wrap gap-2">
            {GENDERS.map((g) => {
              const on = gender === g.value;
              return (
                <button
                  key={g.value}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setGender(on ? "" : g.value)}
                  className={cn(
                    "h-11 border px-5 text-base font-semibold",
                    on ? "border-primary bg-primary text-primary-foreground" : "border-line bg-surface text-ink hover:border-primary/40 hover:bg-primary-soft"
                  )}
                >
                  {t(g.key)}
                </button>
              );
            })}
          </div>
        </fieldset>
        <Button type="submit" variant="accent" size="lg" className="w-full sm:w-auto sm:min-w-52">
          <Search className="h-5 w-5" aria-hidden="true" />
          {t("hero.searchBtn")}
        </Button>
      </div>
    </form>
  );
}
