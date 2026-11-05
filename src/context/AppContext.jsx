import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "@/i18n/translations";
import { DEFAULT_ORIGIN } from "@/data/areas";

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
  const [origin, setOrigin] = useState(DEFAULT_ORIGIN);

  useEffect(() => {
    document.documentElement.lang = lang === "ne" ? "ne" : "en";
    write("hfms.lang", lang);
  }, [lang]);
  useEffect(() => write("hfms.favorites", favorites), [favorites]);
  useEffect(() => write("hfms.compare", compare), [compare]);
  useEffect(() => write("hfms.account", account), [account]);

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
  const signIn = useCallback((profile) => setAccount(profile), []);
  const signOut = useCallback(() => setAccount(null), []);

  const value = useMemo(
    () => ({ lang, setLang, favorites, toggleFavorite, compare, toggleCompare, account, signIn, signOut, origin, setOrigin, t }),
    [lang, favorites, compare, account, signIn, signOut, origin, t, toggleFavorite, toggleCompare]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
};
