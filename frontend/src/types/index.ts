export type Category = 'upcoming' | 'rated' | 'watchlist' | 'added';

export interface CastMember {
  name: string;
  role?: string;
  avatar?: string;
  episodes?: number;
  year?: number;
}

export interface Movie {
  _id: string;
  title: string;
  poster: string;
  description: string;
  year: number;
  rating: number;
  ratingCount: number;
  categories: Category[];

  trailerUrl?: string;
  trailerThumb?: string;

  creators?: string[];
  stars?: string[];

  episodesCount?: number;
  videosCount?: number;
  photosCount?: number;

  cast: CastMember[];

  createdAt: string;
  updatedAt: string;
  __v: number;
  isFav?:boolean;
}




// export interface Movie {
//   _id: string;
//   title: string;
//   poster: string;
//   description: string;
//   year: number;
//   rating: number;
//   categories: string[];
//   trailerUrl?: string;
// }

export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
}



