/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: User operations
 *
 * /api/users/watchlist:
 *   get:
 *     tags: [Users]
 *     summary: Get watchlist
 *     security: [ { bearerAuth: [] } ]
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
 *     tags: [Users]
 *     summary: Add to watchlist
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [movieId]
 *             properties:
 *               movieId: { type: string, example: "652f9b2b4a1f3e1c1a2b3c4d" }
 *     responses:
 *       200: { description: Added }
 */

import { Router } from 'express';
import { addToWatchlist, getWatchlist } from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.get('/watchlist', authMiddleware, getWatchlist);
router.post('/watchlist', authMiddleware, addToWatchlist);
export default router;
