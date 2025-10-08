import { useApp } from '../context/AppContext';
import { useEffect, useRef, useState, useCallback } from "react";
import api, { pickList } from "../api/axios";
import { Movie } from "../types";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  title: string;
  category: string;
};

export default function Section({ title, category }: Props) {
const { filters } = useApp();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  // fetch
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await api.get(`/movies`, { params: { categories: category, year: filters.year, ratingMin: filters.ratingMin, ratingMax: filters.ratingMax , title: filters.q } });
      setMovies(pickList(data));
      setLoading(false);
      requestAnimationFrame(updateArrows);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

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
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-extrabold">
          {title}
        </h2>
      </div>

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

      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0b1020] to-transparent rounded-l-2xl" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0b1020] to-transparent rounded-r-2xl" />

      <div
        ref={scrollerRef}
        tabIndex={0}
        className={[
          "no-scrollbar",
          "flex gap-4 overflow-x-auto scroll-smooth",
          "snap-x snap-mandatory",
          "pr-2", 
        ].join(" ")}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") scrollByCards("left");
          if (e.key === "ArrowRight") scrollByCards("right");
        }}
      >
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-[420px] w-[220px] animate-pulse rounded-2xl bg-white/5"
              />
            ))
          : movies.map((m, idx) => (
              <div key={m._id} className="snap-start">
                <MovieCard movie={m} featured={idx === 2} />
              </div>
            ))}
      </div>
    </section>
  );
}

