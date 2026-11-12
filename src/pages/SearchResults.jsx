import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Clock3, LocateFixed, Map, MapPin, Search, SlidersHorizontal, Star } from "lucide-react";
import { HostelCard } from "@/components/HostelCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { AMENITIES } from "@/data/hostels";
import { distanceKm } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

const radiusOptions = [{ value: "500", label: "500 m" }, { value: "1000", label: "1 km" }, { value: "3000", label: "3 km" }, { value: "5000", label: "5 km" }];

export default function SearchResults() {
  const [params, setParams] = useSearchParams();
  const { account, origin, searchHistory, saveSearch, catalog } = useApp();
  const [location, setLocation] = useState(params.get("q") || params.get("area") || "");
  const [amenities, setAmenities] = useState(params.getAll("amenity"));
  const [minRating, setMinRating] = useState(params.get("rating") || "");
  const [sort, setSort] = useState(params.get("sort") || "distance");
  const [view, setView] = useState("list");
  const radius = Number(params.get("radius") || 1000);
  const room = Number(params.get("room"));
  const gender = params.get("gender");

  const matches = useMemo(() => {
    const query = location.toLowerCase();
    const filtered = catalog.filter((h) => {
      const textMatch = !query || `${h.name} ${h.address} ${h.area}`.toLowerCase().includes(query);
      const roomMatch = !room || h.rooms.some((r) => r.type === room && r.totalBeds > r.occupiedBeds);
      const amenityMatch = amenities.every((a) => h.amenities.includes(a));
      const distance = distanceKm(origin, h) * 1000;
      return textMatch && (!gender || h.gender === gender) && roomMatch && amenityMatch && (!minRating || h.rating >= Number(minRating)) && (!params.get("near") || distance <= radius);
    });
    return filtered.sort((a, b) => sort === "rating" ? b.rating - a.rating : sort === "price" ? Math.min(...a.rooms.map((r) => r.pricePerMonth)) - Math.min(...b.rooms.map((r) => r.pricePerMonth)) : distanceKm(origin, a) - distanceKm(origin, b));
  }, [amenities, catalog, gender, location, minRating, origin, params, radius, room, sort]);

  const runSearch = (event) => {
    event.preventDefault();
    const next = new URLSearchParams();
    if (location) next.set("q", location);
    next.set("radius", String(radius || 1000));
    if (room) next.set("room", String(room));
    if (gender) next.set("gender", gender);
    if (minRating) next.set("rating", minRating);
    if (sort) next.set("sort", sort);
    amenities.forEach((a) => next.append("amenity", a));
    setParams(next);
    saveSearch({ location, radius, room, gender, amenities, minRating, sort });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <form onSubmit={runSearch} className="border border-line bg-surface p-4">
        <div className="grid gap-3 md:grid-cols-[1.4fr_.6fr_.6fr_auto]">
          <div><Label htmlFor="search-location">Location or landmark</Label><div className="relative"><MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" /><Input id="search-location" value={location} onChange={(e) => setLocation(e.target.value)} className="pl-9" placeholder="Baneshwor or Pulchowk Campus" /></div></div>
          <div><Label htmlFor="search-radius">Radius</Label><Select id="search-radius" value={String(radius)} onChange={(e) => setParams((p) => { p.set("radius", e.target.value); return p; })}>{radiusOptions.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}</Select></div>
          <div><Label htmlFor="search-sort">Sort by</Label><Select id="search-sort" value={sort} onChange={(e) => setSort(e.target.value)}><option value="distance">Distance</option><option value="price">Price</option><option value="rating">Rating</option></Select></div>
          <Button type="submit" className="self-end"><Search className="h-4 w-4" /> Search</Button>
        </div>
        <div className="mt-4 grid gap-4 border-t border-line pt-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr]">
          <div><Label htmlFor="search-rating">Minimum cleanliness rating</Label><Select id="search-rating" value={minRating} onChange={(e) => setMinRating(e.target.value)}><option value="">Any rating</option><option value="3">3+ stars</option><option value="4">4+ stars</option><option value="4.5">4.5+ stars</option></Select></div>
          <div><Label htmlFor="search-room">Room type</Label><Select id="search-room" value={room || ""} onChange={(e) => setParams((p) => { if (e.target.value) p.set("room", e.target.value); else p.delete("room"); return p; })}><option value="">All seaters</option>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} seater</option>)}</Select></div>
          <fieldset><legend className="mb-1.5 text-sm font-medium">Amenities (multi-select)</legend><div className="flex flex-wrap gap-2">{AMENITIES.map((a) => <label key={a} className="inline-flex items-center gap-1.5 text-xs"><input type="checkbox" checked={amenities.includes(a)} onChange={() => setAmenities((current) => current.includes(a) ? current.filter((x) => x !== a) : [...current, a])} />{a}</label>)}</div></fieldset>
        </div>
      </form>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-semibold">Find your hostel</h1><p className="mt-1.5 text-muted">{matches.length} verified options match your search.</p></div><div className="flex gap-2"><Button variant={view === "list" ? "default" : "outline"} onClick={() => setView("list")}><SlidersHorizontal className="h-4 w-4" /> List</Button><Button variant={view === "map" ? "default" : "outline"} onClick={() => setView("map")}><Map className="h-4 w-4" /> Map</Button></div></div>

      {account && searchHistory.length > 0 && <section className="mt-5 rounded-xl border border-line bg-surface p-4"><h2 className="flex items-center gap-2 text-sm font-semibold"><Clock3 className="h-4 w-4 text-primary" /> Recent searches</h2><div className="mt-2 flex flex-wrap gap-2">{searchHistory.slice(0, 4).map((search) => <button key={search.id} type="button" className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-medium hover:bg-accent-soft" onClick={() => { setLocation(search.location); setAmenities(search.amenities || []); }}>{search.location || "All areas"} · {search.radius / 1000} km</button>)}</div></section>}

      {view === "map" ? <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_.6fr]"><div className="relative min-h-[520px] overflow-hidden border border-line bg-primary-soft"><iframe title="OpenStreetMap Kathmandu Valley" className="h-full min-h-[520px] w-full border-0" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=85.25%2C27.64%2C85.45%2C27.75&layer=mapnik" /><div className="absolute left-4 top-4 rounded-lg bg-surface/95 p-3 text-xs shadow-soft"><LocateFixed className="mr-1 inline h-4 w-4 text-primary" /> Map pins represent demo hostel coordinates.</div></div><div className="space-y-2">{matches.map((h) => <Link key={h.id} to={`/hostel/${h.id}`} className="block rounded-xl border border-line bg-surface p-3 hover:border-primary"><p className="font-semibold">{h.name}</p><p className="mt-1 text-xs text-muted"><MapPin className="mr-1 inline h-3 w-3" />{h.address}</p><p className="mt-1 text-sm"><Star className="mr-1 inline h-3 w-3 fill-primary text-primary" />{h.rating}</p></Link>)}</div></div> : matches.length ? <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{matches.map((hostel) => <li key={hostel.id}><HostelCard hostel={hostel} className="h-full" /></li>)}</ul> : <EmptyState className="mt-8" title="No hostels found" description="Try clearing a filter or searching a different area." action={<Button asChild><Link to="/search">Clear search</Link></Button>} />}
    </div>
  );
}
