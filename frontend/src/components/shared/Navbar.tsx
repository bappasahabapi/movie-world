import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import { logout } from "../../features/auth/authSlice";
import { Play } from "lucide-react";

import { Film, Search, Languages, UserRound } from 'lucide-react'

export default function Navbar() {
  const { lang, setLang, t, setFilters } = useApp();
  const { user, token } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  return (
    <nav className="p-4 bg-slate-900 sticky top-0 z-10">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0c12]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0a0c12]/60"></header>
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        <Link to="/" className="font-bold text-2xl">
          MOVIE<span className="text-blue-400">world</span>
        </Link>
        <input
          placeholder={t("search_placeholder")}
          onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
          className="flex-1 bg-slate-800 rounded px-3 py-2"
        />
        <Link
          to="/"
          className="ml-2 inline-flex items-center gap-2 rounded-xl text-yellow-400 px-4 py-2 text-sm font-semibold shadow"
        >
          Get Pro
        </Link>
        <NavLink to="/watchlist" className="hover:underline">
          Watch-list
        </NavLink>
        <select
          value={lang}
         onChange={(e) => setLang(e.target.value as "EN" | "BN")}
          className="ml-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-2 text-sm font-semibold shadow"
        >
          <option value="EN">EN</option>
          <option value="BN">BN</option>
        </select>
        {token ? (
          <button
            className="btn"
            onClick={() => {
              dispatch(logout());
              nav("/login");
            }}
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/login" className="btn">
              Login
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );


}
