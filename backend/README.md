# Movie Backend

A TypeScript/Express/Mongoose backend for movies with filtering, CRUD, auth, Swagger docs, and tests.

## Quick Start

```bash
#after clone the project
cd backend
cp .env.example .env  # ensure MONGO_URI is set
npm install
npm run seed
npm run dev
```

- API: `http://localhost:4000/`
- Swagger: `http://localhost:4000/api/docs`

## Project Structure

```
src/
  config/        # db, swagger
  controllers/   # route handlers (wrapped with asyncHandler)
  middleware/    # auth & global error handler
  models/        # Mongoose models
  routes/        # Express routes
  seed/          # seeding scripts
  utils/         # shared utilities (errors, asyncHandler)
  __tests__/     # Jest + Supertest tests
```

## Movies API

- `GET /api/movies` – list with filters: `title`, `year`, `categories` (csv), `ratingMin/Max`, `ratingCountMin/Max`, `dateFrom/dateTo`, `page`, `limit`, `sort` (e.g. `-createdAt`).
- `GET /api/movies/:id` – fetch a movie.
- `POST /api/movies` – create.
- `PUT /api/movies/:id` – update.
- `DELETE /api/movies/:id` – remove.
- `POST /api/movies/:id/rate` – rate a movie (0-10).
- `PATCH /api/movies/:id/categories` – set or toggle categories.
    - Body for set: `{ "action": "set", "categories": ["rated","watchlist"] }`
    - Body for toggle: `{ "action": "toggle", "category": "watchlist" }`

## Architecture Notes

- **Global Error Handling** via `middleware/error.ts` and `utils/errors.ts` with `ApiError`.
- **Higher-Order Controller Wrapper** via `utils/asyncHandler.ts` to avoid repetitive try/catch.
- **Model Changes**: `isFav: boolean` added to `Movie` model.
- **Seed Updates**: `seed.ts` populates `isFav` and valid `categories`.

## Tests

Run tests (requires a test database in `MONGO_URI`):

```bash
npm test
```

## Swagger

All routes are documented and served at `/api/docs` with example values.

----

- **Advanced search & filtering on GET /api/movies**
  - Query params supported:
  - title, year, categories (comma-separated), ratingMin/Max, ratingCountMin/Max, dateFrom/dateTo, plus page, limit, sort (e.g. -createdAt).

**- CRUD routes for movies**

  - POST /api/movies (create)
  - PUT /api/movies/:id (update)
  - DELETE /api/movies/:id (delete)
  - GET /api/movies/:id (fetch one)


**Seed file**
```bash
npm run seed
```
Updated to include isFav and to keep categories valid.
Global error handling + HOF
utils/errors.ts with ApiError helpers.
utils/asyncHandler.ts higher-order wrapper to remove repeated try/catch.
Centralized in middleware/error.ts.

**Unit tests (Jest + Supertest)**

Tests for create, list (with filters), categories toggle, update, and delete  `tests` movies.test.ts.

## API Docs

- Swagger UI: visit **/api/docs** after starting the server.
- Click the **Authorize** button and paste your JWT token as: `Bearer <your-token>`.
- Example payloads are embedded for all endpoints.

### Run tests
```bash
npm run test
```
