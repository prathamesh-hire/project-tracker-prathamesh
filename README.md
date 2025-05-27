# Project-Tracker

A lightweight web app for planning, tracking and documenting software projects.  
Built with **Next.js (App Router)** and **Supabase** so each user sees only their own projects.

Live demo → **https://project-tracker-prathamesh.vercel.app/sign-in**

---

## Table of Contents

1. [Screens & Core Flow](#screens--core-flow)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Local Setup](#local-setup)  
5. [Environment Variables](#environment-variables)  
6. [Deployment (Vercel)](#deployment-vercel)  
7. [Roadmap](#roadmap)  

---

## Screens & Core Flow

| Screen                      | Purpose                                                                                                   |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Sign In / Sign Up**       | Email-link authentication via Supabase.                                                                    |
| **Projects List**           | Read-only overview of all projects you own (title, status chip, due date).                                |
| **Project Card**            | Inline quick actions: mark complete, edit, delete.                                                        |
| **New / Edit Project Form** | Full CRUD – name, description, notes, status (“Not Started · In Progress · Completed”), due-date picker. |

---

## Features

- **Per-user data isolation** – PostgreSQL Row-Level Security rules (`auth.uid()`).
- **Typed Supabase client** – generated types keep server & client in sync.
- **Instant revalidation** – after create/update/delete we refresh only the projects query.
- **Client & Server components** – form is a client component; list rendering is server-side for faster first paint.
- **Optimistic UI** – local state updates immediately while mutation is in flight.
- **Responsive design** – mobile-first layout using Tailwind utility classes.
- **Zero-config deploy** – push to `main`, Vercel builds, sets up edge functions and Postgres connection pooling automatically.

---

## Tech Stack

| Layer            | Tech                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------ |
| **Frontend**     | Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · shadcn/ui           |
| **Auth + DB**    | Supabase (PostgreSQL + Storage + Row Level Security)                                 |
| **State / Data** | Supabase JS SDK (`@supabase/supabase-js`) · React Hooks                              |
| **Testing**      | Vitest · React Testing Library (placeholder, not yet exhaustive)                     |
| **CI / CD**      | GitHub Actions → Vercel CLI                                                          |
| **Hosting**      | Vercel edge network                                                                  |

---

## Local Setup

```bash
# 1  Clone
git clone https://github.com/prathamesh-hire/project-tracker-prathamesh.git
cd project-tracker-prathamesh

# 2  Install deps
pnpm install       # or npm install / yarn

# 3  Configure env vars
cp .env.example .env.local
#  → fill in Supabase credentials (see below)

# 4  Run
pnpm dev           # http://localhost:3000

``` 

---

## Environment Variables

To run the app locally or deploy it on Vercel, set the following environment variables:

| Key                             | Description                                                    |
| ------------------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Found in Supabase → Project Settings → API.                    |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous public API key.                             |
| `SUPABASE_SERVICE_ROLE_KEY`     | **Server-only** (optional): used for admin scripts/migrations. |
| `NODE_ENV`                      | `development` / `production`                                   |

Create a `.env.local` file at the root of your project and paste the values:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## Deployment (Vercel)

1. **Import the GitHub Repository**

   Go to [https://vercel.com/import](https://vercel.com/import) and import your GitHub repository for the app.

2. **Set Environment Variables**

   In your Vercel project settings, navigate to **Settings → Environment Variables**, and add the following keys:

   | Key                             | Description                                                    |
   | ------------------------------- | -------------------------------------------------------------- |
   | `NEXT_PUBLIC_SUPABASE_URL`      | Found in Supabase → Project Settings → API.                    |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous public API key.                             |
   | `SUPABASE_SERVICE_ROLE_KEY`     | *(Optional)* Used for server-side scripts or migrations.       |
   | `NODE_ENV`                      | Set to `production`.                                           |

3. **Build and Deploy**

   Vercel automatically detects the Next.js framework and runs the necessary commands:

   ```bash
   pnpm install
   pnpm run build
   pnpm start
   ```


4. **Production URL**

   Once deployed, your app will be live at:

   ```
   https://<username>.vercel.app
   ```

---


## Roadmap

- **Kanban board view**  
  Visualize projects by drag-and-droppable status columns.

- **Slack / Email reminders**  
  Send notifications for upcoming due dates or overdue projects.

- **Tagging & search**  
  Add custom tags and enable fuzzy text search across project titles and descriptions.

- **Dark-mode toggle**  
  Provide a user-friendly dark theme with a switch option.

- **Test coverage**  
  Add comprehensive unit and integration tests, with CI badge for status visibility.

- **Bulk CSV import/export**  
  Allow importing project data from CSV and exporting project records.

- **Public project sharing**  
  Enable optional read-only sharing of a specific project via a public URL.

---



Feature suggestions and contributions are welcome. Feel free to open an issue or submit a pull request!

