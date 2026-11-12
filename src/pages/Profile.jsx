import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { EmptyState } from "@/components/EmptyState";
import { useApp } from "@/context/AppContext";

export default function Profile() {
  const { account, profile, updateProfile, notifications, markNotificationsRead } = useApp();
  const [form, setForm] = useState({ name: profile?.name || account?.name || "", phone: profile?.phone || "", photo: profile?.photo || "" });
  if (!account) return <EmptyState className="mx-auto mt-12 max-w-2xl" title="Sign in to view your profile" action={<Button asChild><Link to="/login">Log in</Link></Button>} />;
  return <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6"><div className="flex items-center justify-between"><div><h1 className="text-3xl font-semibold">Profile</h1><p className="mt-1 text-muted">{account.identifier} · {account.role}</p></div><Link to="/inquiries" className="relative rounded-lg border border-line p-3" aria-label="Notifications"><Bell className="h-5 w-5" />{notifications.some((n) => !n.read) && <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-accent" />}</Link></div><form onSubmit={(e) => { e.preventDefault(); updateProfile(form); }} className="mt-8 space-y-4 rounded-xl border border-line bg-surface p-5"><div><Label htmlFor="profile-name">Full name</Label><Input id="profile-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div><div><Label htmlFor="profile-phone">Contact number</Label><Input id="profile-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+977 98XXXXXXXX" /></div><div><Label htmlFor="profile-photo">Profile photo URL (demo)</Label><Input id="profile-photo" value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} placeholder="https://..." /></div><Button type="submit"><Save className="h-4 w-4" /> Save profile</Button></form><section className="mt-8 rounded-xl border border-line bg-surface p-5"><div className="flex items-center justify-between"><h2 className="font-semibold">Notification centre</h2><Button size="sm" variant="outline" onClick={markNotificationsRead}>Mark all read</Button></div><div className="mt-4 space-y-2">{notifications.map((n) => <p key={n.id} className={`rounded-lg p-3 text-sm ${n.read ? "bg-background text-muted" : "bg-accent-soft font-semibold"}`}>{n.text}<span className="ml-2 text-xs text-muted">{n.createdAt}</span></p>)}</div></section></div>;
}
