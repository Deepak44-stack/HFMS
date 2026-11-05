import { Link, useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { HostelCard } from "@/components/HostelCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { hostels } from "@/data/hostels";

export default function SearchResults() {
  const [params, setParams] = useSearchParams();
  const query = (params.get("q") || params.get("area") || "").toLowerCase();
  const budget = params.get("budget");
  const gender = params.get("gender");
  const room = Number(params.get("room"));
  const matches = hostels.filter((h) => {
    const textMatch = !query || `${h.name} ${h.address} ${h.area}`.toLowerCase().includes(query);
    const genderMatch = !gender || h.gender === gender;
    const roomMatch = !room || h.rooms.some((r) => r.type === room);
    const [min, max] = (budget || "-").split("-").map(Number);
    const price = Math.min(...h.rooms.map((r) => r.pricePerMonth));
    const budgetMatch = !budget || (Number.isNaN(min) || price >= min) && (Number.isNaN(max) || max === 0 || price <= max);
    return textMatch && genderMatch && roomMatch && budgetMatch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="text-3xl font-semibold">Find your hostel</h1><p className="mt-1.5 text-muted">{matches.length} verified options match your search.</p></div>
        <Button variant="outline" onClick={() => setParams({})}><SlidersHorizontal className="h-4 w-4" /> Clear filters</Button>
      </div>
      {matches.length ? (
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {matches.map((hostel) => <li key={hostel.id}><HostelCard hostel={hostel} className="h-full" /></li>)}
        </ul>
      ) : <EmptyState className="mt-8" title="No hostels found" description="Try clearing a filter or searching a different area." action={<Button asChild><Link to="/search">Clear search</Link></Button>} />}
    </div>
  );
}
