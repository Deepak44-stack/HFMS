import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "@/i18n/translations";
import { DEFAULT_ORIGIN } from "@/data/areas";
import { DEMO_ACCOUNTS, demoComplaints, pendingDemoHostel } from "@/data/demo";
import { hostels } from "@/data/hostels";

const AppContext = createContext(null);

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — keep working in memory */
  }
};

/** Resolve "a.b.c" against the active dictionary, falling back to English. */
const lookup = (dict, path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), dict);

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => read("hfms.lang", "en"));
  const [favorites, setFavorites] = useState(() => read("hfms.favorites", []));
  const [compare, setCompare] = useState(() => read("hfms.compare", []));
  const [account, setAccount] = useState(() => read("hfms.account", null));
  const [searchHistory, setSearchHistory] = useState(() => read("hfms.searchHistory", []));
  const [inquiries, setInquiries] = useState(() => read("hfms.inquiries", [
    { id: "demo-inquiry", hostelId: "h1", hostelName: hostels[0].name, roomType: 2, moveIn: "2026-12-01", message: "I would like to confirm a 2-seater room.", status: "Pending", createdAt: "2026-11-10" },
    { id: "past-inquiry", hostelId: "h2", hostelName: hostels[1].name, roomType: 3, moveIn: "2026-10-01", message: "Is food included?", status: "Accepted", createdAt: "2026-10-01" },
  ]));
  const [notifications, setNotifications] = useState(() => read("hfms.notifications", [
    { id: "welcome", text: "Welcome to HFMS demo notifications.", read: false, createdAt: "2026-11-12" },
  ]));
  const [profile, setProfile] = useState(() => read("hfms.profile", null));
  const [approvedListings, setApprovedListings] = useState(() => read("hfms.approvedListings", []));
  const [bedAdjustments, setBedAdjustments] = useState(() => read("hfms.bedAdjustments", {}));
  const [complaints, setComplaints] = useState(() => read("hfms.complaints", demoComplaints));
  const [verification, setVerification] = useState(() => read("hfms.verification", { [pendingDemoHostel.id]: "Pending Verification" }));
  const [origin, setOrigin] = useState(DEFAULT_ORIGIN);

  useEffect(() => {
    document.documentElement.lang = lang === "ne" ? "ne" : "en";
    write("hfms.lang", lang);
  }, [lang]);
  useEffect(() => write("hfms.favorites", favorites), [favorites]);
  useEffect(() => write("hfms.compare", compare), [compare]);
  useEffect(() => write("hfms.account", account), [account]);
  useEffect(() => write("hfms.searchHistory", searchHistory), [searchHistory]);
  useEffect(() => write("hfms.inquiries", inquiries), [inquiries]);
  useEffect(() => write("hfms.notifications", notifications), [notifications]);
  useEffect(() => write("hfms.profile", profile), [profile]);
  useEffect(() => write("hfms.approvedListings", approvedListings), [approvedListings]);
  useEffect(() => write("hfms.bedAdjustments", bedAdjustments), [bedAdjustments]);
  useEffect(() => write("hfms.complaints", complaints), [complaints]);
  useEffect(() => write("hfms.verification", verification), [verification]);

  const t = useCallback(
    (path) => lookup(translations[lang], path) ?? lookup(translations.en, path) ?? path,
    [lang]
  );

  const toggleFavorite = useCallback(
    (id) => setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
    []
  );
  const toggleCompare = useCallback(
    (id) => setCompare((items) => items.includes(id) ? items.filter((x) => x !== id) : items.length < 3 ? [...items, id] : items),
    []
  );
  const signIn = useCallback((nextProfile) => setAccount(nextProfile), []);
  const signOut = useCallback(() => setAccount(null), []);
  const saveSearch = useCallback((search) => {
    if (!account) return;
    setSearchHistory((items) => [{ ...search, id: `search-${Date.now()}` }, ...items].slice(0, 8));
  }, [account]);
  const createInquiry = useCallback((inquiry) => {
    const saved = { ...inquiry, id: `inq-${Date.now()}`, status: "Pending", createdAt: new Date().toISOString().slice(0, 10) };
    setInquiries((items) => [saved, ...items]);
    setNotifications((items) => [{ id: `note-${Date.now()}`, text: "Your inquiry was sent to the hostel owner.", read: false, createdAt: saved.createdAt }, ...items]);
    return saved;
  }, []);
  const respondToInquiry = useCallback((id, status, message = "") => {
    setInquiries((items) => items.map((item) => item.id === id ? { ...item, status, response: message } : item));
    const inquiry = inquiries.find((item) => item.id === id);
    if (status === "Accepted" && inquiry) {
      setBedAdjustments((current) => ({ ...current, [`${inquiry.hostelId}:${inquiry.roomType}`]: (current[`${inquiry.hostelId}:${inquiry.roomType}`] || 0) + 1 }));
    }
    setNotifications((items) => [{ id: `note-${Date.now()}`, text: `Inquiry ${status.toLowerCase()}.`, read: false, createdAt: new Date().toISOString().slice(0, 10) }, ...items]);
  }, [inquiries]);
  const catalog = useMemo(() => [...hostels, ...approvedListings], [approvedListings]);
  const approveListing = useCallback((id, status, reason = "") => {
    setVerification((current) => ({ ...current, [id]: status }));
    if (status === "Approved" && !approvedListings.some((item) => item.id === id)) setApprovedListings((items) => [...items, pendingDemoHostel]);
    setNotifications((items) => [{ id: `note-${Date.now()}`, text: `Listing ${status.toLowerCase()}${reason ? `: ${reason}` : ""}.`, read: false, createdAt: new Date().toISOString().slice(0, 10) }, ...items]);
  }, [approvedListings]);
  const updateComplaint = useCallback((id, status) => setComplaints((items) => items.map((item) => item.id === id ? { ...item, status } : item)), []);
  const markNotificationsRead = useCallback(() => setNotifications((items) => items.map((n) => ({ ...n, read: true }))), []);
  const updateProfile = useCallback((next) => {
    setProfile(next);
    setAccount((current) => current ? { ...current, ...next } : current);
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, favorites, toggleFavorite, compare, toggleCompare, account, signIn, signOut, origin, setOrigin, t, searchHistory, saveSearch, inquiries, createInquiry, respondToInquiry, notifications, markNotificationsRead, profile, updateProfile, catalog, bedAdjustments, complaints, updateComplaint, verification, approveListing }),
    [lang, favorites, compare, account, signIn, signOut, origin, t, toggleFavorite, toggleCompare, searchHistory, saveSearch, inquiries, createInquiry, respondToInquiry, notifications, markNotificationsRead, profile, updateProfile, catalog, bedAdjustments, complaints, updateComplaint, verification, approveListing]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
};
