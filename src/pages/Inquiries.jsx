import { Link } from "react-router-dom";
import { Check, HelpCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/EmptyState";
import { useApp } from "@/context/AppContext";

export default function Inquiries() {
  const { account, inquiries, respondToInquiry } = useApp();
  if (!account) return <EmptyState className="mx-auto mt-12 max-w-2xl" title="Sign in to see booking history" action={<Button asChild><Link to="/login">Log in</Link></Button>} />;
  const owner = account.role === "owner" || account.role === "admin";
  return <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6"><h1 className="text-3xl font-semibold">{owner ? "Inquiry inbox" : "Booking & inquiry history"}</h1><p className="mt-1 text-muted">{owner ? "Accept, reject or request more information from applicants." : "Your request status and owner responses appear here."}</p><div className="mt-6 space-y-3">{(inquiries.length ? inquiries : [{ id: "demo", hostelName: "Demo inquiry", roomType: 2, moveIn: "2026-12-01", message: "Demo data will appear here.", status: "Accepted" }]).map((item) => <article key={item.id} className="rounded-xl border border-line bg-surface p-5"><div className="flex flex-wrap justify-between gap-3"><div><h2 className="font-semibold">{item.hostelName}</h2><p className="mt-1 text-sm text-muted">{item.roomType} seater · move-in {item.moveIn}</p></div><span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold">{item.status}</span></div><p className="mt-3 text-sm text-muted">{item.message || "No message."}</p>{owner && item.id !== "demo" && item.status === "Pending" && <div className="mt-4 flex flex-wrap gap-2"><Button size="sm" onClick={() => respondToInquiry(item.id, "Accepted")}><Check className="h-4 w-4" /> Accept</Button><Button size="sm" variant="outline" onClick={() => respondToInquiry(item.id, "Rejected")}><X className="h-4 w-4" /> Reject</Button><Button size="sm" variant="outline" onClick={() => respondToInquiry(item.id, "More information requested")}><HelpCircle className="h-4 w-4" /> Ask for information</Button></div>}{item.response && <p className="mt-3 border-l-2 border-accent pl-3 text-sm">{item.response}</p>}</article>)}</div></div>;
}
