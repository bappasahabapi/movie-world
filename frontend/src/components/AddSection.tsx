import { useCallback, useEffect, useRef, useState } from "react";
import api, { pickList } from "../api/axios";
import { Movie } from "../types";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";


type Props = {
  editHref?: (m: Movie) => string;
  addHref?: string;
};

export default function AddedSection({
  editHref = (m) => `/movie/${m._id}/edit`,
  addHref = "/movie/new",
}: Props) {

  const {  filters  } = useApp();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await api.get(`/movies`, { params: { categories: "added" } });
      setMovies(pickList<Movie>(data));
      setLoading(false);
      requestAnimationFrame(updateArrows);
    })();
  }, []);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 4);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  const scrollByCards = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = Math.round(el.clientWidth * 0.9) * (dir === "left" ? -1 : 1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateArrows]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    const down = (e: MouseEvent | TouchEvent) => {
      isDown = true;
      startX = "touches" in e ? e.touches[0].pageX : (e as MouseEvent).pageX;
      startScroll = el.scrollLeft;
    };
    const move = (e: MouseEvent | TouchEvent) => {
      if (!isDown) return;
      const x = "touches" in e ? e.touches[0].pageX : (e as MouseEvent).pageX;
      const dx = x - startX;
      el.scrollLeft = startScroll - dx;
    };
    const up = () => (isDown = false);

    el.addEventListener("mousedown", down);
    el.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    el.addEventListener("touchstart", down, { passive: true });
    el.addEventListener("touchmove", move, { passive: true });
    el.addEventListener("touchend", up);

    return () => {
      el.removeEventListener("mousedown", down);
      el.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      el.removeEventListener("touchstart", down);
      el.removeEventListener("touchmove", move);
      el.removeEventListener("touchend", up);
    };
  }, []);

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-8">
      {/* Title: MY ADDED (blue) MOVIES (yellow) */}
      <h2 className="mb-4 text-2xl font-extrabold uppercase tracking-wide text-center">
        <span className="text-sky-400">My Added</span>{" "}
        <span className="text-yellow-400">Movies</span>
      </h2>

      {/* Arrows */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollByCards("left")}
        disabled={!canLeft}
        className={[
          "absolute left-2 top-1/2 -translate-y-1/2 z-10",
          "rounded-xl bg-white text-slate-900 shadow-lg",
          "p-2 transition disabled:opacity-40 disabled:cursor-not-allowed",
          "backdrop-blur supports-[backdrop-filter]:bg-white/90",
          "hidden md:inline-flex",
        ].join(" ")}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollByCards("right")}
        disabled={!canRight}
        className={[
          "absolute right-2 top-1/2 -translate-y-1/2 z-10",
          "rounded-xl bg-white text-slate-900 shadow-lg",
          "p-2 transition disabled:opacity-40 disabled:cursor-not-allowed",
          "backdrop-blur supports-[backdrop-filter]:bg-white/90",
          "hidden md:inline-flex",
        ].join(" ")}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0b1020] to-transparent rounded-l-2xl" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0b1020] to-transparent rounded-r-2xl" />

      {/* Scroller */}
      <div
        ref={scrollerRef}
        tabIndex={0}
        className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pr-2"
      >
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-[320px] w-[220px] animate-pulse rounded-2xl bg-white/5"
              />
            ))
          : (
            <>
              {movies.map((m) => (
                <div key={m._id} className="snap-start">
                  <PosterEditableCard movie={m} href={editHref(m)} />
                </div>
              ))}

              {/* Add tile at the end */}
              <div className="snap-start">
                <AddMovieTile href={addHref} />
              </div>
            </>
          )}
      </div>
    </section>
  );
}

function PosterEditableCard({ movie, href }: { movie: Movie; href: string }) {
  return (
    <div className="relative w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-[#0c1120]/90 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]">
      <img
        src={movie.poster}
        alt={movie.title}
        className="h-[320px] w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <Link
        to={href}
        className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md hover:opacity-95 active:opacity-90"
      >
        Edit Movie
      </Link>
    </div>
  );
}

function AddMovieTile({ href }: { href: string }) {
  return (
    <div className="flex h-[320px] w-[220px] items-center justify-center rounded-2xl border border-dashed border-blue/25 bg-[#111827]">
      <Link
        to={href}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_-10px_rgba(59,130,246,0.7)] hover:opacity-95 active:opacity-90"
      >
        <Plus className="h-4 w-4" /> Add Movie
      </Link>
    </div>
  );
}
