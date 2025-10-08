import { useApp } from '../context/AppContext';
import { useCallback, useEffect, useRef, useState } from "react";
import api, { pickList } from "../api/axios";
import { Movie } from "../types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  title?: string;                 
  subtitle?: string;              
  category?: string;              
  leftBadge?: string;             
  rightBadge?: string;            
};

export default function SpotlightSection({
  title = "Upcoming Movies",
  subtitle = "We constantly offer new movies",
  category = "upcoming",
  leftBadge = "New",
  rightBadge = "Featured",
}: Props) {
const { filters } = useApp();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  // fetch
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await api.get(`/movies`, { params: { categories: category, title: filters.q, year: filters.year, ratingMin: filters.ratingMin, ratingMax: filters.ratingMax } });
      setMovies(pickList(data));
      setLoading(false);
      requestAnimationFrame(() => {
        updateArrows();
        snapTo(2); 
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);


  const updateActiveOnScroll = useCallback(() => {
    const row = scrollerRef.current;
    if (!row) return;
    const centerX = row.scrollLeft + row.clientWidth / 2;
    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    cardRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rectLeft = el.offsetLeft;
      const rectCenter = rectLeft + el.clientWidth / 2;
      const d = Math.abs(rectCenter - centerX);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = idx;
      }
    });
    setActive(bestIdx);
  }, []);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 4);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  const snapTo = (idx: number) => {
    const row = scrollerRef.current;
    const el = cardRefs.current[idx];
    if (!row || !el) return;
    const left = el.offsetLeft - (row.clientWidth - el.clientWidth) / 2;
    row.scrollTo({ left, behavior: "smooth" });
  };

  const scrollPage = (dir: "left" | "right") => {
    const next = Math.max(
      0,
      Math.min(movies.length - 1, active + (dir === "left" ? -1 : 1))
    );
    snapTo(next);
  };

  useEffect(() => {
    const row = scrollerRef.current;
    if (!row) return;
    const onScroll = () => {
      updateActiveOnScroll();
      updateArrows();
    };
    row.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      row.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateActiveOnScroll, updateArrows]);

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-10">
      <div className="mb-3">
        <h2 className="text-2xl font-extrabold uppercase tracking-wide text-center">
          <span className="text-sky-400">{title.split(" ")[0]} </span>
          <span className="text-yellow-400">{title.split(" ").slice(1).join(" ")}</span>
        </h2>
        <p className="mt-1 text-sm text-white/70 text-center">{subtitle}</p>
      </div>

      <button
        onClick={() => scrollPage("left")}
        disabled={!canLeft}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 hidden rounded-xl bg-white p-2 text-slate-900 shadow-lg transition disabled:opacity-40 md:inline-flex"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scrollPage("right")}
        disabled={!canRight}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 hidden rounded-xl bg-white p-2 text-slate-900 shadow-lg transition disabled:opacity-40 md:inline-flex"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 rounded-l-2xl bg-gradient-to-r from-[#0b1020] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 rounded-r-2xl bg-gradient-to-l from-[#0b1020] to-transparent" />

      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-2"
      >
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} />
            ))
          : movies.map((m, idx) => (
              <div
                key={m._id}
                ref={(el) => {
                  if (el) cardRefs.current[idx] = el;
                }}
                className="snap-center"
              >
                <SpotlightCard
                  movie={m}
                  featured={idx === active}
                  leftBadge={leftBadge}
                  rightBadge={rightBadge}
                  onClick={() => snapTo(idx)}
                />
              </div>
            ))}
      </div>
    </section>
  );
}

function Skeleton() {
  return (
    <div className="h-[280px] w-[180px] animate-pulse rounded-2xl bg-white/5" />
  );
}

function SpotlightCard({
  movie,
  featured,
  leftBadge,
  rightBadge,
  onClick,
}: {
  movie: Movie;
  featured: boolean;
  leftBadge: string;
  rightBadge: string;
  onClick: () => void;
}) {
  return (
    
    <button
      onClick={onClick}
      className={[
        "relative w-[180px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition",
        featured
          ? "ring-2 ring-blue-500/70 scale-[1.02] shadow-[0_15px_45px_-10px_rgba(59,130,246,0.35)]"
          : "opacity-80 hover:opacity-100",
      ].join(" ")}
    >
      {featured && (
        <>
          <span className="absolute left-2 top-2 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-900">
            {leftBadge}
          </span>
          <span className="absolute right-2 top-2 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-900">
            {rightBadge}
          </span>
        </>
      )}

      {/* poster */}
      <Link to={`/movie/${movie._id}`} className="block">
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-[240px] w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </Link>

      <div className="px-3 pb-3 pt-2">
        <div
          className={[
            "rounded-md px-3 py-1 text-center text-[12px] font-extrabold uppercase tracking-wide",
            featured ? "bg-white text-slate-900" : "bg-white/10 text-white/90",
          ].join(" ")}
        >
          {movie.title}
        </div>
      </div>
    </button>
  );
}
