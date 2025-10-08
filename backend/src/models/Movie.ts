import mongoose, { Schema, Document } from 'mongoose';

export type Category = 'upcoming' | 'rated' | 'watchlist' | 'added';

export interface ICastMember {
  name: string;
  role?: string;
  avatar?: string;
  episodes?: number;   
  year?: number;       
}

export interface IMovie extends Document {
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

  cast: ICastMember[];
  isFav?:boolean
}

const CastSchema = new Schema<ICastMember>({
  name: { type: String, required: true },
  role: String,
  avatar: String,
  episodes: Number,
  year: Number,
}, { _id: false });

const MovieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  description: { type: String, default: '' },
  year: { type: Number, default: 2023 },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },

  isFav: { type: Boolean, default: false },

  categories: [{ type: String, enum: ['upcoming', 'rated', 'watchlist', 'added'] }],

  trailerUrl: String,
  trailerThumb: String,

  creators: [{ type: String }],
  stars: [{ type: String }],

  episodesCount: { type: Number, default: 0 },
  videosCount: { type: Number, default: 0 },
  photosCount: { type: Number, default: 0 },

  cast: [CastSchema],
}, { timestamps: true });

export default mongoose.model<IMovie>('Movie', MovieSchema);

