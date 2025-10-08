/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 *
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, example: "Alice" }
 *               email: { type: string, example: "alice@example.com" }
 *               password: { type: string, example: "Secret123!" }
 *     responses:
 *       200:
 *         description: Registered successfully
 *         content:
 *           application/json:
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user: { id: "652f9b2b4a1f3e1c1a2b3c4d", name: "Alice", email: "alice@example.com" }
 *
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "alice@example.com" }
 *               password: { type: string, example: "Secret123!" }
 *     responses:
 *       200:
 *         description: Logged in
 *         content:
 *           application/json:
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user: { id: "652f9b2b4a1f3e1c1a2b3c4d", name: "Alice", email: "alice@example.com" }
 *
 * /api/auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get current user
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Current user profile
 *         content:
 *           application/json:
 *             example:
 *               id: "652f9b2b4a1f3e1c1a2b3c4d"
 *               name: "Alice"
 *               email: "alice@example.com"
 */

import { Router } from 'express';
import { register, login, me } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, me);
export default router;
