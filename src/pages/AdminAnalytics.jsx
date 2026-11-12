import { Download, FileSpreadsheet, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/EmptyState";
import { hostels } from "@/data/hostels";
import { useApp } from "@/context/AppContext";

export default function AdminAnalytics() {
  const { account, inquiries, complaints } = useApp();
  if (!account || account.role !== "admin") return <EmptyState className="mx-auto mt-12 max-w-2xl" title="Admin access required" />;
  const stats = [
    ["Total users", "3 demo accounts"],
    ["Verified hostels", String(hostels.length)],
    ["Inquiry volume", String(inquiries.length)],
    ["Popular search areas", "Baneshwor · Pulchowk · Koteshwor"],
    ["Occupancy rate", "58% across demo rooms"],
    ["Complaints", `${complaints.length} open demo cases`],
  ];
  const exportCsv = () => {
    const csv = ["Metric,Value", ...stats.map(([label, value]) => `"${label}","${value}"`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = "hfms-demo-analytics.csv"; link.click(); URL.revokeObjectURL(url);
  };
  return <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6"><div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-3xl font-semibold">Analytics</h1><p className="mt-1 text-muted">Demo metrics from the seeded HFMS dataset.</p></div><div className="flex gap-2"><Button variant="outline" onClick={exportCsv}><FileSpreadsheet className="h-4 w-4" /> Excel / CSV</Button><Button onClick={() => window.print()}><Printer className="h-4 w-4" /> PDF</Button></div></div><div className="mt-6 divide-y divide-line border-y border-line">{stats.map(([label, value]) => <div key={label} className="flex flex-wrap justify-between gap-3 py-5"><span className="text-muted">{label}</span><strong>{value}</strong></div>)}</div><div className="mt-8 rounded-xl border border-line bg-surface p-5"><h2 className="font-semibold">Complaint statistics</h2><div className="mt-4 flex flex-wrap gap-3">{["Open", "Under Review", "Resolved"].map((status) => <span key={status} className="rounded-full bg-primary-soft px-3 py-1.5 text-sm">{status}: {complaints.filter((c) => c.status === status).length}</span>)}</div></div></div>;
}
