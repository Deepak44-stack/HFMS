import { Link, useParams } from "react-router-dom";
import { BadgeCheck, ChevronLeft, MapPin, Star, Phone, GitCompareArrows } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AmenityIcon } from "@/components/AmenityIcon";
import { EmptyState } from "@/components/EmptyState";
import { getHostel } from "@/data/hostels";
import { bedStats, formatPrice } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

export default function HostelDetails() {
  const { id } = useParams(); const hostel = getHostel(id); const { compare, toggleCompare } = useApp();
  if (!hostel) return <EmptyState className="mx-auto mt-12 max-w-2xl" title="Hostel not found" description="This listing may have been removed." action={<Button asChild><Link to="/search">Browse hostels</Link></Button>} />;
  const { available } = bedStats(hostel); const compared = compare.includes(hostel.id);
  return <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <Link to="/search" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"><ChevronLeft className="h-4 w-4" /> All hostels</Link>
    <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_.65fr]">
      <div><img src={hostel.photos[0]} alt={hostel.name} className="aspect-[16/9] w-full rounded-2xl object-cover" />
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4"><div><div className="flex flex-wrap items-center gap-2"><Badge variant="verified"><BadgeCheck className="h-3.5 w-3.5" /> Verified</Badge><Badge>{hostel.gender}</Badge></div><h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{hostel.name}</h1><p className="mt-2 flex items-center gap-1.5 text-muted"><MapPin className="h-4 w-4" />{hostel.address}</p></div><p className="flex items-center gap-1 font-semibold"><Star className="h-5 w-5 fill-accent text-accent" />{hostel.rating} <span className="font-normal text-muted">({hostel.reviewCount} reviews)</span></p></div>
        <section className="mt-8"><h2 className="text-xl font-semibold">About this hostel</h2><p className="mt-3 max-w-3xl leading-relaxed text-muted">{hostel.about}</p></section>
        <section className="mt-8"><h2 className="text-xl font-semibold">Amenities</h2><ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">{hostel.amenities.map((a) => <li key={a} className="flex items-center gap-2 rounded-lg bg-primary-soft px-3 py-2.5 text-sm font-medium"><AmenityIcon name={a} className="h-5 w-5 text-primary" />{a}</li>)}</ul></section>
        <section className="mt-8"><h2 className="text-xl font-semibold">Rooms & monthly price</h2><div className="mt-4 overflow-hidden rounded-xl border border-line">{hostel.rooms.map((r) => <div key={r.type} className="flex items-center justify-between border-b border-line p-4 last:border-0"><span className="font-semibold">{r.label}</span><span className="text-muted">{r.totalBeds - r.occupiedBeds} beds free</span><span className="font-semibold">{formatPrice(r.pricePerMonth)}</span></div>)}</div></section>
      </div>
      <aside className="h-fit rounded-2xl border border-line bg-surface p-5 shadow-lift lg:sticky lg:top-24"><p className="text-sm text-muted">Starting from</p><p className="mt-1 text-2xl font-semibold">{formatPrice(Math.min(...hostel.rooms.map((r) => r.pricePerMonth)))}</p><p className="mt-3 rounded-lg bg-success-soft px-3 py-2 text-sm font-semibold text-success">{available} beds currently free</p><Button asChild className="mt-5 w-full"><a href={`tel:${hostel.owner.phone.replace(/\s/g, "")}`}><Phone className="h-4 w-4" /> Call {hostel.owner.name}</a></Button><Button variant="outline" className="mt-3 w-full" onClick={() => toggleCompare(hostel.id)}><GitCompareArrows className="h-4 w-4" />{compared ? "Remove from compare" : "Add to compare"}</Button></aside>
    </div></div>;
}
