import { Link } from "react-router-dom";
import { GitCompareArrows, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/EmptyState";
import { hostels } from "@/data/hostels";
import { formatPrice, startingPrice, bedStats } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { HostelImage } from "@/components/HostelImage";

export default function Compare() {
  const { compare, toggleCompare } = useApp(); const selected = hostels.filter((h) => compare.includes(h.id));
  if (!selected.length) return <EmptyState className="mx-auto mt-12 max-w-2xl" icon={GitCompareArrows} title="Compare hostels side by side" description="Use the Compare button on any listing to add up to three options." action={<Button asChild><Link to="/search">Browse hostels</Link></Button>} />;
  const rows = [{ label: "Starting price", get: (h) => formatPrice(startingPrice(h)) }, { label: "Rating", get: (h) => `${h.rating} / 5 (${h.reviewCount} reviews)` }, { label: "Available beds", get: (h) => `${bedStats(h).available} free` }, { label: "Room types", get: (h) => h.rooms.map((r) => r.label).join(", ") }, { label: "Amenities", get: (h) => h.amenities.join(", ") }];
  return <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><h1 className="text-3xl font-semibold">Compare hostels</h1><p className="mt-1.5 text-muted">Compare prices, rooms and facilities before you contact an owner.</p><div className="mt-7 overflow-x-auto rounded-xl border border-line"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-primary-soft"><tr><th className="p-4 font-semibold">Details</th>{selected.map((h) => <th key={h.id} className="min-w-56 p-4"><HostelImage src={h.photos[0]} alt="" className="mb-3 w-full" /><Link className="text-base hover:text-primary hover:underline" to={`/hostel/${h.id}`}>{h.name}</Link><Button variant="ghost" size="sm" className="mt-2 px-0 text-error" onClick={() => toggleCompare(h.id)}><X className="h-4 w-4" /> Remove</Button></th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.label} className="border-t border-line"><th className="p-4 font-semibold">{row.label}</th>{selected.map((h) => <td key={h.id} className="p-4 align-top text-muted">{row.get(h)}</td>)}</tr>)}</tbody></table></div></div>;
}
