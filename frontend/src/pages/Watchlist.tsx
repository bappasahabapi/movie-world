import { useEffect, useState } from "react";
import api, { pickList } from "../api/axios";
import MovieCard from "../components/MovieCard";
import { Movie } from "../types";

export default function Watchlist() {
  const [items, setItems] = useState<Movie[]>([]);
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/users/watchlist");
        setItems(pickList(data));
      } catch (e) {
        setItems([]);
      }
    };
    load();
  }, []);
  return (
    <div className="max-w-6xl mx-auto my-6">
      <h2 className="section-title">Your Watch-list</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((m) => (
          <MovieCard key={m._id} movie={m} />
        ))}
      </div>
    </div>
  );
}
