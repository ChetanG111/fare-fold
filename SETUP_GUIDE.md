# 🚀 KyronHQ SaaS Starter Setup (No-Docker)

## 0. Initial Setup
1. Clone this repository to your new SaaS project directory.
2. Run `bun install` to download dependencies.
3. Remove the `.git` folder and initialize a fresh git repo: `rm -rf .git && git init`.

## 1. Environment Configuration

Create a `.env` file for your local environment variables.
```bash
cp .env.example .env
```

### Essential Variables
Use `.env.example` as a reference. Fill in these critical values:

*   **`DATABASE_URL`**: Your PostgreSQL connection string.
*   **`BETTER_AUTH_SECRET`**: Run `openssl rand -base64 32` to generate one.
*   **`NEXT_PUBLIC_APP_URL`**: `http://localhost:3000` for development.

### OAuth Setup (Optional for Dev, Required for Prod)
To enable Google, GitHub, etc., create apps in their developer consoles and add:
*   `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
*   `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`

### Developer Conveniences
*   **`NEXT_PUBLIC_BYPASS_AUTH`**: Set to `true` to skip login screens and mock an admin session (Dev only).

## 2. Database Connection
Since this setup **does not use Docker**, you need to provide your own PostgreSQL database.

1.  **Get a Database URL**:
    *   **Local**: Install PostgreSQL on your machine.
    *   **Cloud (Free)**: Use [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Render](https://render.com).
2.  **Update `.env`**:
    Open your `.env` file and replace the `DATABASE_URL` with your connection string.
    ```env
    DATABASE_URL="postgres://user:password@host:5432/dbname?sslmode=require"
    ```

## 3. Database Migration
Once your database is connected, apply the schema changes (including the removal of "Premium Purchase" features):
```bash
bun run migrate:local
```

## 4. Run Development Server
Start the development server:
```bash
bun run dev
```
Open [http://localhost:3000](http://localhost:3000) to see your app!

## 5. Development Workflow
*   **Database Schema Changes**:
    Modify `database/schema.ts` and run:
    ```bash
    bun run generate-migration
    bun run migrate:local
    ```
*   **Add New Dependencies**: `bun add <package-name>`
*   **Linting**: `bun run lint`

## 6. Super Admin Setup
To access the admin dashboard (`/admin`), you must manually promote your user account:

1.  **Sign Up**: Create an account via `http://localhost:3000/register`.
2.  **Promote User**: Run the seeding script in your terminal:
    ```bash
    bun run seed:admin your-email@example.com
    ```
3.  **Verify**: Log out and log back in, then visit `/admin`.

## 7. Deployment
This template is optimized for [Vercel](https://vercel.com) or [Cloudflare Pages](https://pages.cloudflare.com). simply push your code to GitHub and connect your repository. Ensure your environment variables are set in the deployment dashboard.
