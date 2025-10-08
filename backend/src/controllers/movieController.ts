import { Request, Response } from "express";
import Movie from "../models/Movie";
import { asyncHandler } from "../utils/asyncHandler";
import { BadRequest, NotFound } from "../utils/errors";

const buildFilter = (q: any) => {
  const filter: any = {};
  if (q.title) filter.title = { $regex: String(q.title), $options: "i" };
  if (q.year) {
    const y = Number(q.year);
    if (!Number.isNaN(y)) filter.year = y;
  }
  if (q.categories) {
    const arr = String(q.categories)
      .split(",")
      .map((s) => s.trim());
    filter.categories = { $in: arr };
  }
  const numRange = (min?: any, max?: any) => {
    const $: any = {};
    if (min !== undefined) {
      const v = Number(min);
      if (!Number.isNaN(v)) $.$gte = v;
    }
    if (max !== undefined) {
      const v = Number(max);
      if (!Number.isNaN(v)) $.$lte = v;
    }
    return Object.keys($).length ? $ : undefined;
  };
  const r = numRange(q.ratingMin ?? q.rating_gte, q.ratingMax ?? q.rating_lte);
  if (r) filter.rating = r;
  const rc = numRange(
    q.ratingCountMin ?? q.rc_gte,
    q.ratingCountMax ?? q.rc_lte
  );
  if (rc) filter.ratingCount = rc;
  const d: any = {};
  if (q.dateFrom) {
    const v = new Date(String(q.dateFrom));
    if (!isNaN(v as any)) d.$gte = v;
  }
  if (q.dateTo) {
    const v = new Date(String(q.dateTo));
    if (!isNaN(v as any)) d.$lte = v;
  }
  if (Object.keys(d).length) filter.createdAt = d;
  return filter;
};

export const listMovies = asyncHandler(async (req: Request, res: Response) => {
  const filter = buildFilter(req.query);
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
  const sort = String(req.query.sort || "-createdAt");
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Movie.find(filter).sort(sort).skip(skip).limit(limit),
    Movie.countDocuments(filter),
  ]);
  res.json({ page, limit, total, items });
});

export const getMovie = asyncHandler(async (req: Request, res: Response) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) throw NotFound("Movie not found");
  res.json(movie);
});

export const createMovie = asyncHandler(async (req: Request, res: Response) => {
  const movie = await Movie.create(req.body);
  res.status(201).json(movie);
});

export const updateMovie = asyncHandler(async (req: Request, res: Response) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!movie) throw NotFound("Movie not found");
  res.json(movie);
});

export const deleteMovie = asyncHandler(async (req: Request, res: Response) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) throw NotFound("Movie not found");
  res.status(204).send();
});

export const rateMovie = asyncHandler(async (req: Request, res: Response) => {
  const { rating } = req.body as { rating: number };
  if (typeof rating !== "number" || rating < 0 || rating > 10)
    throw BadRequest("Rating must be 0-10");
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    { $set: { rating } },
    { new: true, runValidators: true }
  );
  if (!movie) throw NotFound("Movie not found");
  res.json(movie);
});

export const updateCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const { action, category, categories } = req.body as any;
    if (action === "set") {
      if (!Array.isArray(categories))
        throw BadRequest("categories must be array for set action");
      const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        { categories },
        { new: true, runValidators: true }
      );
      if (!movie) throw NotFound("Movie not found");
      return res.json(movie);
    } else if (action === "toggle") {
      if (!category) throw BadRequest("category is required for toggle action");
      const movie = await Movie.findById(req.params.id);
      if (!movie) throw NotFound("Movie not found");
      const idx = (movie.categories as any).findIndex(
        (c: string) => c === category
      );
      if (idx >= 0) (movie.categories as any).splice(idx, 1);
      else (movie.categories as any).push(category);
      await movie.save();
      return res.json(movie);
    } else {
      throw BadRequest('action must be "set" or "toggle"');
    }
  }
);
