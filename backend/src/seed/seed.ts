import dotenv from "dotenv";
import { connectDB } from "../config/db";
import Movie from "../models/Movie";
import User from "../models/User";

dotenv.config();

const ava = (i: number) => `https://i.pravatar.cc/150?img=${(i % 70) + 1}`;

const getYTThumb = (
  url?: string,
  variant:
    | "hqdefault"
    | "mqdefault"
    | "sddefault"
    | "maxresdefault" = "hqdefault"
) => {
  if (!url) return undefined;
  try {
    const u = new URL(url);

    let id = u.searchParams.get("v") || "";
    if (!id && u.hostname.includes("youtu.be")) id = u.pathname.slice(1);
    if (!id && u.pathname.startsWith("/shorts/"))
      id = u.pathname.split("/")[2] || "";
    if (!id) return undefined;
    return `https://img.youtube.com/vi/${id}/${variant}.jpg`;
  } catch {
    return undefined;
  }
};

const posters = {
  vampire:
    "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1400&auto=format&fit=crop",
  columbus:
    "https://m.media-amazon.com/images/M/MV5BMmJhZjc1YWYtODJkNC00ZTYwLTk2ODItNjUyZmQ1OTM4OWM2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",

  barb: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1400&auto=format&fit=crop",
  joker:
    "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800&auto=format&fit=crop",
  genv: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=800&auto=format&fit=crop",
  shelter:
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop",
  rocket:
    "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=800&auto=format&fit=crop",
  hunger:
    "https://images.unsplash.com/photo-1505682499293-233fb1417547?q=80&w=800&auto=format&fit=crop",
};

// unique fallbacks
const fallbackThumbs: Record<string, string> = {
  "Teen Aliens":
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
  NCIS: "https://images.unsplash.com/photo-1520975693413-84c1d205b1ab?q=80&w=1400&auto=format&fit=crop",
  "Rate Me Now":
    "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=1400&auto=format&fit=crop",
  "Watch It":
    "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1400&auto=format&fit=crop",
};

const base = {
  ratingCount: 407,
  episodesCount: 121,
  videosCount: 24,
  photosCount: 85,
};

const movies = [
  {
    title: "The Vampire Diaries",
    poster: posters.vampire,
    description: "A girl falls for a 162-year-old vampire.",
    year: 2009,
    rating: 8.0,
    ratingCount: 613,
    categories: ["rated", "added"],
    creators: ["Julie Plec", "Kevin Williamson"],
    stars: ["Nina Dobrev", "Paul Wesley", "Ian Somerhalder"],
    episodesCount: 171,
    videosCount: 36,
    photosCount: 120,
    trailerUrl: "https://www.youtube.com/watch?v=BmVmhjjkN4E",
    trailerThumb: getYTThumb(
      "https://www.youtube.com/watch?v=BmVmhjjkN4E",
      "maxresdefault"
    ),
    cast: [
      {
        name: "Nina Dobrev",
        role: "Elena Gilbert",
        avatar: ava(1),
        episodes: 134,
        year: 2009,
      },
      {
        name: "Paul Wesley",
        role: "Stefan Salvatore",
        avatar: ava(2),
        episodes: 171,
        year: 2009,
      },
      {
        name: "Ian Somerhalder",
        role: "Damon Salvatore",
        avatar: ava(3),
        episodes: 171,
        year: 2009,
      },
      {
        name: "Kat Graham",
        role: "Bonnie Bennett",
        avatar: ava(4),
        episodes: 171,
        year: 2009,
      },
      {
        name: "Candice King",
        role: "Caroline Forbes",
        avatar: ava(5),
        episodes: 171,
        year: 2009,
      },
    ],
  },
  {
    title: "Joker",
    poster: posters.joker,
    description: "Arthur Fleck becomes Joker.",
    year: 2019,
    rating: 8.5,
    ratingCount: 1200,
    categories: ["rated"],
    creators: ["Todd Phillips", "Scott Silver"],
    stars: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
    episodesCount: 1,
    videosCount: 8,
    photosCount: 40,
    trailerUrl: "https://www.youtube.com/watch?v=zAGVQLHvwOY",
    trailerThumb: getYTThumb(
      "https://www.youtube.com/watch?v=zAGVQLHvwOY",
      "maxresdefault"
    ),
    cast: [
      { name: "Joaquin Phoenix", role: "Arthur Fleck", avatar: ava(6) },
      { name: "Zazie Beetz", role: "Sophie", avatar: ava(7) },
    ],
  },
  {
    title: "Barbie",
    poster: posters.barb,
    description: "Barbie discovers life outside Barbieland.",
    year: 2023,
    rating: 7.2,
    ratingCount: 980,
    categories: ["upcoming"],
    creators: ["Greta Gerwig", "Noah Baumbach"],
    stars: ["Margot Robbie", "Ryan Gosling", "America Ferrera"],
    episodesCount: 1,
    videosCount: 10,
    photosCount: 50,
    trailerUrl: "https://www.youtube.com/watch?v=pBk4NYhWNMM",
    trailerThumb: getYTThumb(
      "https://www.youtube.com/watch?v=pBk4NYhWNMM",
      "maxresdefault"
    ),
    cast: [
      { name: "Margot Robbie", role: "Barbie", avatar: ava(8) },
      { name: "Ryan Gosling", role: "Ken", avatar: ava(9) },
    ],
  },
  {
    title: "Gen V",
    poster: posters.genv,
    description: "Superhero school spin-off from The Boys.",
    year: 2023,
    rating: 7.9,
    ratingCount: 430,
    categories: ["upcoming", "added"],
    creators: ["Michele Fazekas", "Tara Butters", "Eric Kripke"],
    stars: ["Jaz Sinclair", "Chance Perdomo", "Lizze Broadway"],
    episodesCount: 8,
    videosCount: 14,
    photosCount: 60,
    trailerUrl: "https://www.youtube.com/watch?v=tOUoT5cZB0A",
    trailerThumb: getYTThumb(
      "https://www.youtube.com/watch?v=tOUoT5cZB0A",
      "maxresdefault"
    ),
    cast: [
      {
        name: "Jaz Sinclair",
        role: "Marie Moreau",
        avatar: ava(10),
        episodes: 8,
        year: 2023,
      },
    ],
  },
  {
    title: "Shelter",
    poster: posters.shelter,
    description: "Teen thriller mystery.",
    year: 2023,
    rating: 7.1,
    ratingCount: 210,
    categories: ["added"],
    creators: ["Harlan Coben"],
    stars: ["Jaden Michael"],
    episodesCount: 8,
    videosCount: 6,
    photosCount: 30,
    trailerUrl: "https://www.youtube.com/watch?v=O5V7WZ8n8WE",
    trailerThumb: getYTThumb(
      "https://www.youtube.com/watch?v=O5V7WZ8n8WE",
      "maxresdefault"
    ),
    cast: [{ name: "Jaden Michael", role: "Mickey Bolitar", avatar: ava(11) }],
  },
  {
    title: "Rocket League",
    poster: posters.rocket,
    description: "Car soccer game cinematic.",
    year: 2015,
    rating: 8.7,
    ratingCount: 150,
    categories: ["upcoming"],
    creators: ["Psyonix"],
    stars: ["Octane"],
    episodesCount: 0,
    videosCount: 12,
    photosCount: 25,
    trailerUrl: "https://www.youtube.com/watch?v=OmMF9EDbmQQ",
    trailerThumb: getYTThumb(
      "https://www.youtube.com/watch?v=OmMF9EDbmQQ",
      "maxresdefault"
    ),
    cast: [],
  },
  {
    title: "The Hunger Games",
    poster: posters.hunger,
    description: "Katniss fights to survive.",
    year: 2012,
    rating: 7.2,
    ratingCount: 1500,
    categories: ["rated"],
    creators: ["Gary Ross", "Suzanne Collins"],
    stars: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"],
    episodesCount: 4,
    videosCount: 20,
    photosCount: 90,
    trailerUrl: "https://www.youtube.com/watch?v=mfmrPu43DF8",
    trailerThumb: getYTThumb(
      "https://www.youtube.com/watch?v=mfmrPu43DF8",
      "maxresdefault"
    ),
    cast: [
      { name: "Jennifer Lawrence", role: "Katniss Everdeen", avatar: ava(12) },
    ],
  },
  {
    title: "Columbus",
    poster: posters.columbus,
    description: "Indie drama.",
    year: 2017,
    rating: 7.3,
    ratingCount: 320,
    categories: ["rated"],
    creators: ["Kogonada"],
    stars: ["Haley Lu Richardson", "John Cho"],
    episodesCount: 1,
    videosCount: 5,
    photosCount: 20,
    trailerUrl: "https://www.youtube.com/watch?v=Z9AYPxH5NTM",
    trailerThumb: getYTThumb(
      "https://www.youtube.com/watch?v=Z9AYPxH5NTM",
      "maxresdefault"
    ),
    cast: [{ name: "Haley Lu Richardson", role: "Casey", avatar: ava(13) }],
  },
  {
    title: "Teen Aliens",
    poster: posters.vampire,
    description: "Sci-fi teen show.",
    year: 2020,
    rating: 7.0,
    ratingCount: 77,
    categories: ["upcoming"],
    creators: ["TBD"],
    stars: [],
    episodesCount: 10,
    videosCount: 4,
    photosCount: 15,
    trailerThumb: fallbackThumbs["Teen Aliens"],
    cast: [],
  },
  {
    title: "NCIS",
    poster: posters.columbus,
    description: "Naval Criminal Investigative Service.",
    year: 2003,
    rating: 7.8,
    ratingCount: 2100,
    categories: ["upcoming"],
    creators: ["Donald P. Bellisario", "Don McGill"],
    stars: ["Mark Harmon", "Michael Weatherly", "Pauley Perrette"],
    episodesCount: 400,
    videosCount: 80,
    photosCount: 300,
    trailerThumb: fallbackThumbs["NCIS"],
    cast: [],
  },
  {
    title: "Rate Me Now",
    poster: posters.joker,
    description: "A movie to rate.",
    year: 2024,
    rating: 7.9,
    ratingCount: 12,
    categories: ["rated"],
    creators: ["Someone"],
    stars: [],
    episodesCount: 1,
    videosCount: 2,
    photosCount: 8,
    trailerThumb: fallbackThumbs["Rate Me Now"],
    cast: [],
  },
  {
    title: "Watch It",
    poster: posters.shelter,
    description: "Add to your watchlist.",
    year: 2024,
    rating: 7.1,
    ratingCount: 4,
    categories: ["watchlist"],
    creators: ["Someone Else"],
    stars: [],
    episodesCount: 1,
    videosCount: 1,
    photosCount: 5,
    trailerThumb: fallbackThumbs["Watch It"],
    cast: [],
  },
];

(async () => {
  await connectDB(process.env.MONGO_URI as string);
  await Movie.deleteMany({});
  await User.deleteMany({});

  const created = await Movie.insertMany(movies);
  const watchlist = created.slice(0, 8).map((m: any) => m._id);
  
  await User.create({
    name: "Demo User",
    email: "demo@movie.com",
    password: "password",
    watchlist,
  });

  console.log("Seeded:", created.length, "movies and 1 user");
  process.exit(0);
})();
