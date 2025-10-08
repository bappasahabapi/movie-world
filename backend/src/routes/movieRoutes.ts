/**
 * @openapi
 * tags:
 *   - name: Movies
 *     description: Movie catalog
 *
 * /api/movies:
 *   get:
 *     tags: [Movies]
 *     summary: List movies
 *     responses:
 *       200:
 *         description: Array of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *   post:
 *     tags: [Movies]
 *     summary: Create a movie
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *           example:
 *             title: "Columbus"
 *             poster: "https://example.com/poster.jpg"
 *             backdrop: "https://example.com/backdrop.jpg"
 *             genres: ["Drama"]
 *             year: 2023
 *             rating: 4.5
 *             categories: ["rated"]
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *
 * /api/movies/{id}:
 *   get:
 *     tags: [Movies]
 *     summary: Get movie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *   put:
 *     tags: [Movies]
 *     summary: Update movie
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200: { description: Updated }
 *   delete:
 *     tags: [Movies]
 *     summary: Delete movie
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Deleted }
 *
 * /api/movies/{id}/rate:
 *   post:
 *     tags: [Movies]
 *     summary: Rate a movie
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [rating]
 *             properties:
 *               rating: { type: number, minimum: 0, maximum: 5, example: 4.5 }
 *     responses:
 *       200: { description: Rated }
 *
 * /api/movies/{id}/categories:
 *   patch:
 *     tags: [Movies]
 *     summary: Update categories
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [categories]
 *             properties:
 *               categories:
 *                 type: array
 *                 items: { type: string, enum: ["upcoming","rated","watchlist","added"] }
 *                 example: ["rated","watchlist"]
 *     responses:
 *       200: { description: Updated }
 */
// @ts-nocheck
import { Router } from 'express';
import { listMovies, getMovie, rateMovie, createMovie, updateMovie, deleteMovie, updateCategories } from '../controllers/movieController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.get('/', listMovies);
router.get('/:id', getMovie);
router.post('/', authMiddleware, createMovie);
router.put('/:id', authMiddleware, updateMovie);
router.delete('/:id', authMiddleware, deleteMovie);
router.post('/:id/rate', authMiddleware, rateMovie);
router.patch('/:id/categories', authMiddleware, updateCategories);
export default router;



