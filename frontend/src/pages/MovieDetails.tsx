import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { Movie } from "../types";
import { Play, Star, ChevronRight } from "lucide-react";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/movies/${id}`);
      setMovie(data);
    })();
  }, [id]);

  if (!movie) return <div className="max-w-6xl mx-auto py-8">Loading...</div>;

  const trailerThumb =
    movie.trailerThumb || movie.poster; // fallback if no thumb
  const stars =
    (movie.stars && movie.stars.length ? movie.stars : movie.cast?.map(c => c.name)).slice(0, 3);

  return (
    <main>
      {/* HERO */}
      <section className="relative bg-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* Top row: Poster + Trailer */}
          <div className="flex items-start gap-6">
            {/* Left: Poster */}
            <div className="w-[30%] flex flex-col">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={movie.poster}
                  alt={`${movie.title} poster`}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Right: Trailer */}
            <div className="flex-1 relative overflow-hidden rounded-lg">
              <img
                src={trailerThumb}
                alt={`${movie.title} trailer thumbnail`}
                className="w-full h-[400px] object-cover rounded-lg"
              />
              {movie.trailerUrl && (
                <a
                  href={movie.trailerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 m-auto flex items-center justify-center gap-2 text-white font-semibold hover:scale-105 transition"
                >
                  <div className="flex items-center justify-center rounded-full border-2 border-white size-10">
                    <Play className="size-4 ml-0.5" />
                  </div>
                  <span className="text-base tracking-wide">TRAILER</span>
                </a>
              )}
            </div>
          </div>

          {/* Bottom section: Stats | divider | text */}
          <div className="mt-6 flex items-start gap-6">
            <div className="w-[25%] space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span>EPISODES</span>
                <span className="text-yellow-400 font-semibold">
                  {movie.episodesCount ?? 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>VIDEOS</span>
                <span className="text-yellow-400 font-semibold">
                  {movie.videosCount ?? 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>PHOTOS</span>
                <span className="text-yellow-400 font-semibold">
                  {movie.photosCount ?? 0}
                </span>
              </div>
            </div>
            <div className="self-stretch w-[1px] bg-sky-500 rounded-full"></div>
            <div className="flex-1 text-sm">
              <p className="text-white/90 leading-relaxed mb-3">
                {movie.description}
              </p>

              {movie.creators?.length ? (
                <p>
                  <span className="text-sky-400 font-semibold">Creators</span>:
                  <span className="ml-1 text-white/90">
                    {movie.creators.join(", ")}
                  </span>
                </p>
              ) : null}

              {stars?.length ? (
                <p className="mt-1">
                  <span className="text-sky-400 font-semibold">Stars</span>:
                  <span className="ml-1 text-white/90">
                    {stars.join(", ")}
                  </span>
                </p>
              ) : null}

              <div className="mt-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded bg-white/10 px-2.5 py-1 text-xs">
                  <Star className="size-3 fill-yellow-400 text-yellow-400" />
                  {movie.rating.toFixed(1)}{" "}
                  <span className="text-white/60">
                    ({movie.ratingCount ?? 0})
                  </span>
                </span>
                <button className="rounded bg-yellow-400 text-black text-xs font-semibold px-3 py-1 hover:bg-yellow-300 transition">
                  Rate Now
                </button>
              </div>
            </div>
          </div>
        </div>
      
       
      </section>

      {/* //todo: implement the cast */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-16 py-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-extrabold">
              TOP <span className="text-sky-400">CAST</span>
            </h2>
            <button className="group inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
              View all{" "}
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {(movie.cast ?? []).map((c, idx) => (
              <div
                key={`${c.name}-${idx}`}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-3 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={c.avatar || `https://i.pravatar.cc/150?img=${(idx % 70) + 1}`}
                    alt={c.name}
                    className="size-12 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{c.name}</div>
                    {c.role ? (
                      <div className="truncate text-xs text-white/60">{c.role}</div>
                    ) : null}
                    {(c.episodes || c.year) ? (
                      <div className="mt-1 text-[11px] text-white/50">
                        {c.episodes ? `${c.episodes} Episodes` : null}
                        {c.episodes && c.year ? " · " : ""}
                        {c.year ?? ""}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      
      
      </section>

      
    </main>
  );
}
