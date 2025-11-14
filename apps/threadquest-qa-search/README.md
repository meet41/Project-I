# QA Search App

A minimal React + Vite + TypeScript web app to search questions/topics from a CSV and view answers with relevance scores. Clean, modern UI with Tailwind CSS.

## Features
- Search question_text and topic with Fuse.js (fuzzy search)
- Display results as cards with topic chips and More details button
- Right-side drawer with full question and all available answers + scores
- CSV loaded from `public/data/Complete_QueryResults_with_scores.csv` (falls back to `public/data/sample.csv`)
 - Authentication (login/signup) backed by a Node.js + SQLite API

## Run (PowerShell on Windows)

```powershell
# 1) Move into the app
cd "e:\Sem 7 Project\qa-search-app"

# 2) Install dependencies (requires Node.js 18+)
npm install

# 3) Install backend deps
cd server
npm install
cd ..

# 4) Start backend API (port 3001)
# In a new PowerShell tab or split terminal
cd "e:\Sem 7 Project\qa-search-app\server"
npm run dev

# 5) Start frontend dev server
cd "e:\Sem 7 Project\qa-search-app"
npm run dev
# Then open the local URL it prints (e.g., http://localhost:5173)
```

The frontend is configured to proxy requests from `/api/*` to `http://localhost:3001` during development.

### Backend configuration

- Environment variables (optional): copy `server/.env.example` to `server/.env` and edit values
  - `PORT=3001`
  - `JWT_SECRET=your-strong-secret`
- Database file will be created automatically at `server/data/app.db` (SQLite). No migrations required.
- API endpoints:
  - `POST /api/auth/signup` { name, email, password }
  - `POST /api/auth/login` { email, password }
  - `GET /api/auth/me` (requires `Authorization: Bearer <token>`)

### Login/Signup pages

- Visit `http://localhost:5173/signup` to create an account, or `http://localhost:5173/login` to sign in.
- After sign-in, you will be redirected to the main app at `/`.

## Use your full dataset
- Copy your CSV `Complete_QueryResults_with_scores.csv` into:
  - `e:\Sem 7 Project\qa-search-app\public\data\Complete_QueryResults_with_scores.csv`
- Reload the page; the app will use it automatically.

## Build & Preview
```powershell
npm run build
npm run preview
```

## Architecture diagrams

- Browse visual workflow diagrams in docs/architecture.md (renders on GitHub and many Markdown previewers that support Mermaid).
- Mermaid sources are also available per-diagram in docs/mermaid/.

Optional: export images locally (requires Node/npm)

```powershell
# Install mermaid-cli (once)
npm install -D @mermaid-js/mermaid-cli

# Render SVGs
npx mmdc -i docs/mermaid/system-architecture.mmd -o docs/mermaid/system-architecture.svg
npx mmdc -i docs/mermaid/auth-flow.mmd -o docs/mermaid/auth-flow.svg
npx mmdc -i docs/mermaid/dataset-search-flow.mmd -o docs/mermaid/dataset-search-flow.svg
```

## Notes
- The sample CSV in `public/data/sample.csv` is provided so the UI loads without your full dataset. Replace it for real use.
 - If you change the API port, update `vite.config.ts` proxy accordingly.
