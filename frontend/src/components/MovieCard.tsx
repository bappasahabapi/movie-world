import React, { useMemo, useState } from "react";
import { Bookmark, Heart, Star, Play, Plus, Check } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { Movie } from "../types";

type Props = {
  movie: Movie;
  featured?: boolean;
  inWatchlist?: boolean;
  onWatchlistClick?: (m: Movie) => void;
};

export default function MovieCard({
  movie,
  featured = false,
  inWatchlist = false,
  onWatchlistClick,
}: Props) {

  const [isFav, setIsFav] = useState<boolean>(!!movie.isFav);
  const [categories, setCategories] = useState<string[]>(
    Array.isArray((movie as any).categories) ? ((movie as any).categories as string[]) : []
  );

  const ratingCount = useMemo(() => movie.ratingCount ?? 407, [movie.ratingCount]);
  const isInWatchlist = useMemo(
    () => categories.includes("watchlist") || inWatchlist,
    [categories, inWatchlist]
  );

  const toggleWatchlist = async () => {
    const category = "watchlist";
    try {
      await api.patch(`/movies/${movie._id}/categories`, {
        action: "toggle",
        category,
      });
      setCategories((prev) => {
        const has = prev.includes(category);
        return has ? prev.filter((c) => c !== category) : [...prev, category];
      });
    } catch (e) { alert('Please log in to favorite.');
    }
  };

  const toggleFav = async () => {
    try {
      await api.put(`/movies/${movie._id}`, { isFav: !isFav });
      setIsFav((v) => !v);
    } catch (e) { alert('Please log in to favorite.');
    }
  };

  return (
    <div
      className={[
        "group relative flex w-[220px] flex-col overflow-hidden rounded-2xl",
        "bg-[#0c1120]/90 border border-white/10 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]",
        featured
          ? "ring-2 ring-blue-500/70"
          : "hover:ring-1 hover:ring-blue-500/40 transition-[transform,box-shadow] hover:-translate-y-0.5",
      ].join(" ")}
    >
      {/* Poster */}
      <Link to={`/movie/${movie._id}`} className="block">
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-[300px] w-full object-cover"
        />
      </Link>

      {/* Quick actions */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          aria-label="favorite"
          onClick={toggleFav}
          className="rounded-full bg-black/60 p-2 hover:bg-black/80"
        >
          <Heart
            className={
              isFav ? "fill-red-500 text-red-500 h-5 w-5" : "h-5 w-5 text-white"
            }
          />
        </button>
        <button
          aria-label="watchlist"
          onClick={toggleWatchlist}
          className="rounded-full bg-black/60 p-2 hover:bg-black/80"
        >
          <Bookmark
            className={
              isInWatchlist
                ? "fill-yellow-400 text-yellow-400 h-5 w-5"
                : "h-5 w-5 text-white"
            }
          />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/movie/${movie._id}`} className="mb-2 block">
          <h3 className="line-clamp-1 text-lg font-extrabold uppercase tracking-wide text-white">
            {movie.title}
          </h3>
        </Link>
        <div className="mb-3 inline-flex items-center gap-1 text-[15px]">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-white">
            {typeof movie.rating === "number" ? movie.rating.toFixed(1) : "–"}
          </span>
          <span className="text-white/60">({ratingCount})</span>
        </div>

        <button
          onClick={() => onWatchlistClick?.(movie)}
          className={[
            "mt-auto inline-flex items-center justify-center gap-2 rounded-full px-4 py-2",
            "text-sm font-semibold text-white",
            "bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-95 active:opacity-90",
            "shadow-[0_10px_25px_-10px_rgba(59,130,246,0.7)]",
            "transition focus:outline-none focus:ring-2 focus:ring-blue-500/50",
          ].join(" ")}
          aria-label={isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
        >
          {isInWatchlist ? (
            <>
              <Check className="h-4 w-4" />
              In Watch List
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Watch List
            </>
          )}
        </button>

        {/* Trailer row */}
        <div className="mt-3 flex items-center gap-2 text-sm text-white/85">
          <Play className="h-4 w-4" />
          {movie.trailerUrl ? (
            <a
              href={movie.trailerUrl}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-2 hover:underline"
            >
              Trailer
            </a>
          ) : (
            <span className="text-white/50">Trailer</span>
          )}
        </div>
      </div>
    </div>
  );
}
