import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { Movie } from "../types";

export default function EditMovie() {
  const { id } = useParams();
  const nav = useNavigate();
  const [movie, setMovie] = useState<Partial<Movie>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/movies/${id}`);
        setMovie(data);
      } catch (e: any) {
        setError("Failed to load movie");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await api.put(`/movies/${id}`, movie);
      nav(`/movie/${id}`);
    } catch (e: any) {
      setError("Update failed. Are you logged in?");
    }
  };

  if (loading) return <div className="p-6">Loading…</div>;
  if (error) return <div className="p-6 text-red-400">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Movie</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full p-2 bg-slate-800 rounded"
          placeholder="Title"
          value={movie.title ?? ""}
          onChange={(e) => setMovie({ ...movie, title: e.target.value })}
        />
        <input
          className="w-full p-2 bg-slate-800 rounded"
          placeholder="Poster URL"
          value={movie.poster ?? ""}
          onChange={(e) => setMovie({ ...movie, poster: e.target.value })}
        />
        <textarea
          className="w-full p-2 bg-slate-800 rounded"
          placeholder="Description"
          value={movie.description ?? ""}
          onChange={(e) => setMovie({ ...movie, description: e.target.value })}
        />
        <input
          className="w-full p-2 bg-slate-800 rounded"
          placeholder="Year"
          type="number"
          value={movie.year ?? 2023}
          onChange={(e) => setMovie({ ...movie, year: Number(e.target.value) })}
        />
        <input
          className="w-full p-2 bg-slate-800 rounded"
          placeholder="Rating"
          type="number"
          step="0.1"
          value={movie.rating ?? 0}
          onChange={(e) =>
            setMovie({ ...movie, rating: Number(e.target.value) })
          }
        />
        <input
          className="w-full p-2 bg-slate-800 rounded"
          placeholder="Trailer URL"
          value={movie.trailerUrl ?? ""}
          onChange={(e) => setMovie({ ...movie, trailerUrl: e.target.value })}
        />
        <button className="btn bg-blue-600 px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}
