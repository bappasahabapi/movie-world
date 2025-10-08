import { Response } from "express";
import User from "../models/User";
import Movie from "../models/Movie";
import { AuthRequest } from "../middleware/auth";

export const getWatchlist = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.userId).populate("watchlist");
  res.json(user?.watchlist || []);
};

export const addToWatchlist = async (req: AuthRequest, res: Response) => {
  const { movieId } = req.body;
  const user = await User.findById(req.userId);
  const movie = await Movie.findById(movieId);
  if (!user || !movie) return res.status(404).json({ message: "Not found" });
  if (!user.watchlist.includes(movie._id)) user.watchlist.push(movie._id);
  await user.save();
  res.json({ message: "Added" });
};
