import request from 'supertest';
import express from 'express';
import authRoutes from '../src/routes/authRoutes';
import movieRoutes from '../src/routes/movieRoutes';
import userRoutes from '../src/routes/userRoutes';
import { setupSwagger } from '../src/config/swagger';

jest.mock('../src/controllers/movieController', () => ({
  listMovies: (req: any, res: any) => res.json([]),
}));

jest.mock('../src/controllers/authController', () => ({
  register: (req: any, res: any) => res.json({ token: 'x', user: { id: '1', name: 't', email: 'e' } }),
  login: (req: any, res: any) => res.json({ token: 'x', user: { id: '1', name: 't', email: 'e' } }),
  me: (req: any, res: any) => res.json({ id: '1', name: 't', email: 'e' }),
}));

describe('routes & docs', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/auth', authRoutes);
  app.use('/api/movies', movieRoutes);
  app.use('/api/users', userRoutes);
  setupSwagger(app);

  it('serves swagger UI', async () => {
    const res = await request(app).get('/api/docs');
    expect(res.status).toBe(301 /* redirect to /api/docs/ */ || 200);
  });

  it('lists movies', async () => {
    const res = await request(app).get('/api/movies');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('register works', async () => {
    const res = await request(app).post('/api/auth/register').send({ name: 'A', email: 'a@a.com', password: 'Secret123!' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});