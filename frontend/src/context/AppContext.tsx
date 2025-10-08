import React, { createContext, useContext, useMemo, useState } from 'react';

type Filters = {
  q?: string;
  year?: string;
  category?: string;
  ratingMin?: string;
  ratingMax?: string;
};

type Lang = 'EN' | 'BN';

interface AppState {
  lang: Lang;
  setLang: (v: Lang)=>void;
  t: (k: string)=>string;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const dict: Record<Lang, Record<string,string>> = {
  EN: {
    search_placeholder: "Search movies",
    logout: "Logout",
    login: "Login",
    get_pro: "Get Pro",
    watch_now: "Watch Now",
    upcoming: "Upcoming Movies",
    rated: "Movies You Rated",
    watchlist: "Your Watch-list",
    added: "My Added Movies",
    add: "Add",
    edit: "Edit",
    favorite: "Favorite",
    unfavorite: "Unfavorite",
    add_watchlist: "Add to Watchlist",
    remove_watchlist: "Remove from Watchlist",
  },
  BN: {
    search_placeholder: "মুভি খুঁজুন",
    logout: "লগআউট",
    login: "লগইন",
    get_pro: "প্রো নিন",
    watch_now: "এখনই দেখুন",
    upcoming: "আসন্ন সিনেমা",
    rated: "আপনি রেট করেছেন",
    watchlist: "আপনার ওয়াচলিস্ট",
    added: "আমি যে সিনেমা যোগ করেছি",
    add: "যোগ করুন",
    edit: "এডিট",
    favorite: "ফেভারিট",
    unfavorite: "আনফেভারিট",
    add_watchlist: "ওয়াচলিস্টে যোগ করুন",
    remove_watchlist: "ওয়াচলিস্ট থেকে সরান",
  }
};

const Ctx = createContext<AppState | null>(null);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({children})=>{
  const [lang, setLang] = useState<Lang>('EN');
  const [filters, setFilters] = useState<Filters>({});
  const t = useMemo(()=> (k: string)=> dict[lang][k] ?? k, [lang]);
  return <Ctx.Provider value={{lang, setLang, t, filters, setFilters}}>{children}</Ctx.Provider>
}

export const useApp = ()=>{
  const v = useContext(Ctx);
  if(!v) throw new Error('useApp must be inside AppProvider');
  return v;
}
