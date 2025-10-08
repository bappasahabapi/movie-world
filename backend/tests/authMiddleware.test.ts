import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../src/middleware/auth';

const app = express();
app.get('/protected', authMiddleware, (req, res) => res.json({ ok: true }));

describe('authMiddleware', () => {
  it('rejects missing Authorization header', async () => {
    const res = await request(app).get('/protected');
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/No token/);
  });

  it('rejects invalid token', async () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => { throw new Error('bad'); });
    const res = await request(app).get('/protected').set('Authorization', 'Bearer badtoken');
    expect(res.status).toBe(401);
    jest.restoreAllMocks();
  });

  it('accepts valid token', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValue({ id: 'user123' } as any);
    const res = await request(app).get('/protected').set('Authorization', 'Bearer goodtoken');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    jest.restoreAllMocks();
  });
});