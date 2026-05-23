# Cooklingo Backend

Express + TypeScript API for the Cooklingo MVP.

## Implemented

| Method | Path | Status |
|--------|------|--------|
| GET | `/api/recipes` | Done |

### `GET /api/recipes`

Returns all recipes from `src/data/recipes.json` (20 mock recipes).

Optional query params:

| Param | Example | Behavior |
|-------|---------|----------|
| `difficulty` | `?difficulty=Beginner` | Filter by difficulty |
| `skill` | `?skill=knife-work` | Filter by skill |
| `search` | `?search=pasta` | Search title, description, ingredients |

Example response:

```json
[
  {
    "id": "pasta_001",
    "title": "Creamy Garlic Pasta",
    "description": "A simple creamy pasta dish with garlic, parmesan, and butter.",
    "difficulty": "Beginner",
    "estimatedTime": 30,
    "xpReward": 50,
    "imageUrl": "/images/creamy-garlic-pasta.jpg",
    "skills": ["boiling", "sauce making", "seasoning"],
    "ingredients": ["pasta", "garlic", "heavy cream"],
    "steps": ["Boil pasta.", "Make sauce.", "Combine."]
  }
]
```

## Not implemented yet

| Method | Path |
|--------|------|
| GET | `/api/recipes/:id` |
| GET | `/api/users/:id` |
| PATCH | `/api/users/:id` |
| POST | `/api/completions` |
| GET | `/api/users/:id/completions` |
| POST | `/api/surveys` |
| POST | `/api/favorites` |
| DELETE | `/api/favorites` |
| GET | `/api/users/:id/favorites` |
| POST | `/api/gallery` |
| GET | `/api/gallery` |
| POST | `/api/uploads/meal-image` |

## Setup

Install dependencies:

```bash
cd backend
npm install
```

## Run

From `backend/`:

```bash
npm run dev
```

From the project root:

```bash
npm run backend
```

Server runs at `http://localhost:3001` (override with `PORT`).

## Test

```bash
curl http://localhost:3001/api/recipes
curl "http://localhost:3001/api/recipes?search=pasta"
curl "http://localhost:3001/api/recipes?difficulty=Beginner"
```

Or open `http://localhost:3001/api/recipes` in a browser.

If port 3001 is in use:

```bash
lsof -ti:3001 | xargs kill
```

## Structure

```
backend/
  src/
    app.ts                    Express app, mounts routes
    index.ts                  Server entry (port 3001)
    routes/
      recipeRoutes.ts         GET /api/recipes
    controllers/
      recipeController.ts     getRecipes handler
    models/
      Recipe.ts               Recipe type
    data/
      recipes.json            20 mock recipes
```

## Build order (remaining)

1. `GET /api/recipes/:id`
2. `GET /api/users/:id`
3. `POST /api/completions` + `GET /api/users/:id/completions`
4. `POST /api/surveys`
5. Favorites routes
6. Gallery routes
7. `POST /api/uploads/meal-image`
