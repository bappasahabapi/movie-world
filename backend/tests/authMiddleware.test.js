"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../src/middleware/auth");
const app = (0, express_1.default)();
app.get('/protected', auth_1.authMiddleware, (req, res) => res.json({ ok: true }));
describe('authMiddleware', () => {
    it('rejects missing Authorization header', async () => {
        const res = await (0, supertest_1.default)(app).get('/protected');
        expect(res.status).toBe(401);
        expect(res.body.message).toMatch(/No token/);
    });
    it('rejects invalid token', async () => {
        jest.spyOn(jsonwebtoken_1.default, 'verify').mockImplementation(() => { throw new Error('bad'); });
        const res = await (0, supertest_1.default)(app).get('/protected').set('Authorization', 'Bearer badtoken');
        expect(res.status).toBe(401);
        jest.restoreAllMocks();
    });
    it('accepts valid token', async () => {
        jest.spyOn(jsonwebtoken_1.default, 'verify').mockReturnValue({ id: 'user123' });
        const res = await (0, supertest_1.default)(app).get('/protected').set('Authorization', 'Bearer goodtoken');
        expect(res.status).toBe(200);
        expect(res.body.ok).toBe(true);
        jest.restoreAllMocks();
    });
});
