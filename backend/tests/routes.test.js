"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("../src/routes/authRoutes"));
const movieRoutes_1 = __importDefault(require("../src/routes/movieRoutes"));
const userRoutes_1 = __importDefault(require("../src/routes/userRoutes"));
const swagger_1 = require("../src/config/swagger");
jest.mock('../src/controllers/movieController', () => ({
    listMovies: (req, res) => res.json([]),
}));
jest.mock('../src/controllers/authController', () => ({
    register: (req, res) => res.json({ token: 'x', user: { id: '1', name: 't', email: 'e' } }),
    login: (req, res) => res.json({ token: 'x', user: { id: '1', name: 't', email: 'e' } }),
    me: (req, res) => res.json({ id: '1', name: 't', email: 'e' }),
}));
describe('routes & docs', () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use('/api/auth', authRoutes_1.default);
    app.use('/api/movies', movieRoutes_1.default);
    app.use('/api/users', userRoutes_1.default);
    (0, swagger_1.setupSwagger)(app);
    it('serves swagger UI', async () => {
        const res = await (0, supertest_1.default)(app).get('/api/docs');
        expect(res.status).toBe(301 /* redirect to /api/docs/ */ || 200);
    });
    it('lists movies', async () => {
        const res = await (0, supertest_1.default)(app).get('/api/movies');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('register works', async () => {
        const res = await (0, supertest_1.default)(app).post('/api/auth/register').send({ name: 'A', email: 'a@a.com', password: 'Secret123!' });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });
});
