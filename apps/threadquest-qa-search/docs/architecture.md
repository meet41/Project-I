# Project workflow and architecture diagrams

This document illustrates the end-to-end workflow for the app, including the frontend, backend, authentication, dataset search, and theming.

## System architecture

```mermaid
flowchart LR
  subgraph Client [Browser]
    UI[React + TypeScript + Tailwind]
  end

  subgraph DevServer [Vite Dev Server / Static Build]
    VITE["Vite (dev)<br/>Static assets (prod)"]
  end

  subgraph Backend [Node/Express API]
    API[Express @ /api]
    DB(("SQLite DB<br/>server/data/app.db"))
  end

  subgraph Data [Static Dataset]
    CSV[(public/data/*.csv)]
  end

  Client <--> VITE
  VITE --> UI

  UI -- "/api/* (proxy in dev)" --> API
  API --> DB

  UI -- "Load CSV (PapaParse)" --> CSV

  classDef group fill:#0b1224,stroke:#3dd1ff,stroke-width:1px,stroke-dasharray: 3 3,color:#c8f1ff;
  class Client,DevServer,Backend,Data group;
```

Notes
- In development, Vite proxies requests from `/api/*` to the Express server (e.g., http://localhost:3001).
- In production, the React app is built as static files; the API runs separately.

## Authentication flow

```mermaid
sequenceDiagram
  actor U as User
  participant UI as React App (AuthContext)
  participant API as Express API (/api/auth)
  participant DB as SQLite (server/data/app.db)

  U->>UI: Submit credentials (login / signup)
  UI->>API: POST /api/auth/login | /signup
  API->>DB: Verify/insert user (bcrypt)
  DB-->>API: Result
  API-->>UI: 200 { token, user }
  UI->>UI: Store token (AuthContext/localStorage)
  UI-->>U: Navigate to protected routes
  UI->>API: GET /api/auth/me (Bearer token)
  API-->>UI: User profile
```

## Dataset search flow

```mermaid
flowchart TD
  CSV[(CSV in public/data)] --> PARSE["PapaParse loader<br/>(useDataset hook)"]
  PARSE --> INDEX[Fuse.js index]
  INPUT[Search input] --> INDEX
  INDEX --> RESULTS[ResultsList]
  RESULTS --> DETAIL[DetailDrawer (centered modal)]

  classDef node fill:#0b1224,stroke:#8b5cf6,stroke-width:1px,color:#e9d5ff;
  class CSV,PARSE,INDEX,INPUT,RESULTS,DETAIL node;
```

## Theming flow (light/dark)

```mermaid
flowchart LR
  TOGGLE[ThemeToggle (icon)] --> CTX[ThemeContext]
  CTX --> HTML[html.classList: dark]
  HTML --> TAILWIND[Tailwind dark: class mode]
  TAILWIND --> UI[Components (App, Footer, Results, DetailDrawer)]

  classDef node fill:#07151b,stroke:#22d3ee,stroke-width:1px,color:#cffafe;
  class TOGGLE,CTX,HTML,TAILWIND,UI node;
```

---

Want exportable images? See the README section for optional mermaid-cli commands to render SVG/PNG.

## High-level project workflow (vertical)

This is a simple top-down view similar to common “project workflow” visuals.

```mermaid
flowchart TD
  A([Start]) --> B[Open app]
  B --> C[Login / Signup]
  C --> D[Token stored]
  D --> E[Load CSV from public/data]
  E --> F[Build Fuse.js index]
  F --> G[Type query]
  G --> H[Show results list]
  H --> I[Open detail modal]

  classDef step fill:#14532d,stroke:#10b981,stroke-width:1px,color:#ecfdf5;
  class B,C,D,E,F,G,H,I step;
```

