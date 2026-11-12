import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BadgeCheck, ChevronLeft, Flag, GitCompareArrows, MapPin, Phone, Send, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Label, Select } from "@/components/ui/input";
import { AmenityIcon } from "@/components/AmenityIcon";
import { EmptyState } from "@/components/EmptyState";
import { reviewsByHostel } from "@/data/reviews";
import { formatPrice } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { HostelImage } from "@/components/HostelImage";

const galleryLabels = ["Exterior", "Rooms", "Bathroom", "Kitchen", "Dining hall", "Surroundings"];

export default function HostelDetails() {
  const { id } = useParams();
  const hostel = catalog.find((item) => item.id === id);
  const { account, compare, toggleCompare, createInquiry, notifications, catalog, bedAdjustments } = useApp();
  const [roomType, setRoomType] = useState(hostel?.rooms[0]?.type || "");
  const [moveIn, setMoveIn] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [report, setReport] = useState({ category: "Incorrect information", description: "" });
  const [reported, setReported] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  if (!hostel) return <EmptyState className="mx-auto mt-12 max-w-2xl" title="Hostel not found" description="This listing may have been removed." action={<Button asChild><Link to="/search">Browse hostels</Link></Button>} />;
  const compared = compare.includes(hostel.id);
  const reviews = reviewsByHostel[hostel.id] || [];
  const cleanliness = hostel ? Math.min(5, Math.max(0, hostel.rating - 0.1)) : 0;
  const submitInquiry = (event) => {
    event.preventDefault();
    if (!account) return;
    createInquiry({ hostelId: hostel.id, hostelName: hostel.name, roomType: Number(roomType), moveIn, message });
    setSent(true);
  };
  return <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <Link to="/search" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"><ChevronLeft className="h-4 w-4" /> All hostels</Link>
    <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_.65fr]">
      <div>
        <button type="button" className="block w-full text-left" onClick={() => setGalleryOpen((open) => !open)}><HostelImage src={hostel.photos[0]} alt={hostel.name} className="w-full" showSampleLabel /></button>
        {galleryOpen && <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">{hostel.photos.concat(hostel.photos).slice(0, 6).map((photo, index) => <div key={`${photo}-${index}`}><HostelImage src={photo} alt={`${hostel.name} ${galleryLabels[index]}`} showSampleLabel /><p className="mt-1 text-xs text-muted">{galleryLabels[index]}</p></div>)}</div>}
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4"><div><div className="flex flex-wrap items-center gap-2"><Badge variant="verified"><BadgeCheck className="h-3.5 w-3.5" /> Verified</Badge><Badge>{hostel.gender}</Badge></div><h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{hostel.name}</h1><p className="mt-2 flex items-center gap-1.5 text-muted"><MapPin className="h-4 w-4" />{hostel.address}</p></div><p className="flex items-center gap-1 font-semibold"><Star className="h-5 w-5 fill-accent text-accent" />{hostel.rating.toFixed(1)} <span className="font-normal text-muted">({hostel.reviewCount})</span></p></div>
        <section className="mt-8"><h2 className="text-xl font-semibold">About this hostel</h2><p className="mt-3 max-w-3xl leading-relaxed text-muted">{hostel.about}</p></section>
        <section className="mt-8"><h2 className="text-xl font-semibold">Facilities</h2><ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">{hostel.amenities.map((a) => <li key={a} className="flex items-center gap-2 rounded-lg bg-primary-soft px-3 py-2.5 text-sm font-medium"><AmenityIcon name={a} className="h-5 w-5 text-primary" />{a}</li>)}</ul></section>
        <section className="mt-8"><h2 className="text-xl font-semibold">Rooms, NPR price and live availability</h2><div className="mt-4 overflow-hidden rounded-xl border border-line">{hostel.rooms.map((r) => { const accepted = bedAdjustments[`${hostel.id}:${r.type}`] || 0; const available = Math.max(0, r.totalBeds - r.occupiedBeds - accepted); return <div key={r.type} className="grid gap-2 border-b border-line p-4 last:border-0 sm:grid-cols-[1fr_auto_auto] sm:items-center"><span className="font-semibold">{r.label}</span><span className="text-sm text-muted">Total {r.totalBeds} · Occupied {r.occupiedBeds + accepted} · <strong className={available ? "text-success" : "text-error"}>{available} available</strong></span><span className="font-semibold">{formatPrice(r.pricePerMonth)}</span></div>; })}</div></section>
        <section className="mt-8 grid gap-6 md:grid-cols-2"><div><h2 className="text-xl font-semibold">Food menu & timetable</h2><div className="mt-4 space-y-2 text-sm">{Object.entries(hostel.foodMenu).map(([meal, item]) => <p key={meal} className="rounded-lg border border-line p-3"><strong className="capitalize">{meal}:</strong> {item}</p>)}</div></div><div><h2 className="text-xl font-semibold">Address & map</h2><p className="mt-3 text-sm text-muted"><MapPin className="mr-1 inline h-4 w-4 text-primary" />{hostel.address}</p><iframe title={`Map of ${hostel.name}`} className="mt-3 h-44 w-full border-0" loading="lazy" src={`https://www.openstreetmap.org/export/embed.html?bbox=${hostel.lng - .01}%2C${hostel.lat - .01}%2C${hostel.lng + .01}%2C${hostel.lat + .01}&layer=mapnik&marker=${hostel.lat}%2C${hostel.lng}`} /></div></section>
        <section className="mt-8"><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-xl font-semibold">Cleanliness & reviews</h2><p className="mt-2 text-sm text-muted"><Star className="mr-1 inline h-4 w-4 fill-primary text-primary" />{cleanliness.toFixed(1)} / 5 cleanliness rating · {reviews.length} demo reviews</p></div><Button variant="outline" onClick={() => setReported((value) => !value)}><Flag className="h-4 w-4" /> Report this listing</Button></div>{reported && <div className="mt-4 rounded-xl border border-line bg-surface p-4"><Label htmlFor="report-category">Category</Label><Select id="report-category" value={report.category} onChange={(e) => setReport({ ...report, category: e.target.value })}><option>Incorrect information</option><option>Safety concern</option><option>Fraudulent listing</option><option>Other</option></Select><Label htmlFor="report-description" className="mt-3">Description</Label><Input id="report-description" value={report.description} onChange={(e) => setReport({ ...report, description: e.target.value })} placeholder="Tell admin what needs checking" /><Button className="mt-3" onClick={() => setReported(false)}>Submit report</Button></div>}<div className="mt-4 space-y-3">{reviews.map((review) => <article key={review.id} className="rounded-xl border border-line bg-surface p-4"><div className="flex justify-between gap-3"><strong>{review.author}</strong><span className="text-sm"><Star className="mr-1 inline h-4 w-4 fill-accent text-accent" />{review.rating}</span></div><p className="mt-2 text-sm leading-relaxed text-muted">{review.text}</p>{review.ownerReply && <p className="mt-3 border-l-2 border-accent pl-3 text-sm"><strong>Owner reply:</strong> {review.ownerReply}</p>}</article>)}</div></section>
      </div>
      <aside className="h-fit rounded-2xl border border-line bg-surface p-5 shadow-lift lg:sticky lg:top-24"><p className="text-sm text-muted">Contact owner</p><p className="mt-1 text-xl font-semibold">{hostel.owner.name}</p><a className="mt-2 inline-flex items-center gap-2 text-sm text-primary" href={`tel:${hostel.owner.phone.replace(/\s/g, "")}`}><Phone className="h-4 w-4" />{hostel.owner.phone}</a><Button variant="outline" className="mt-4 w-full" onClick={() => toggleCompare(hostel.id)}><GitCompareArrows className="h-4 w-4" />{compared ? "Remove from compare" : "Add to compare"}</Button><form onSubmit={submitInquiry} className="mt-6 border-t border-line pt-5"><h2 className="font-semibold">Send an inquiry</h2>{!account && <p className="mt-2 text-sm text-muted">Please <Link className="text-primary underline" to="/login">log in</Link> to inquire.</p>}{sent ? <p className="mt-4 rounded-lg bg-success-soft p-3 text-sm font-semibold text-success">Inquiry sent. You will be notified of the owner's response.</p> : <fieldset disabled={!account} className="mt-4 space-y-3"><div><Label htmlFor="inquiry-room">Room type</Label><Select id="inquiry-room" value={roomType} onChange={(e) => setRoomType(e.target.value)}>{hostel.rooms.map((r) => <option key={r.type} value={r.type}>{r.label} · {formatPrice(r.pricePerMonth)}</option>)}</Select></div><div><Label htmlFor="inquiry-date">Preferred move-in date</Label><Input id="inquiry-date" type="date" required value={moveIn} onChange={(e) => setMoveIn(e.target.value)} /></div><div><Label htmlFor="inquiry-message">Message (optional)</Label><Input id="inquiry-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask about meals or visits" /></div><Button type="submit" className="w-full"><Send className="h-4 w-4" /> Send inquiry</Button></fieldset>}</form>{notifications.some((n) => !n.read) && <p className="mt-4 text-xs text-muted">You have unread notifications in the bell menu.</p>}</aside>
    </div>
  </div>;
}
