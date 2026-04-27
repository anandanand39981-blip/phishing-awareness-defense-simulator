# Phish Defense Educat

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/anandanand39981-blip/phishing-awareness-defense-simulator)

## Overview

Phish Defense Educat is a full-stack web application designed for phishing defense education. It provides user authentication, secure file storage and management, and a modern, responsive interface. Built with Cloudflare Workers for edge APIs, Convex for reactive backend services, and React for the frontend, it offers seamless real-time updates, robust auth flows, and production-ready deployment.

## Key Features

- **User Authentication**: Email/password signup, login, password reset, email verification via OTP, and anonymous sessions using Convex Auth.
- **File Management**: Secure file uploads, listing, downloads, and deletions tied to user accounts with Convex Storage and Database.
- **Modern UI**: Responsive design with Tailwind CSS, shadcn/ui components, dark/light theme support, sidebar navigation, and smooth animations.
- **Real-time Data**: Convex queries and mutations for instant file sync across devices.
- **Edge-Optimized API**: Hono-based routes on Cloudflare Workers for fast, global performance.
- **Error Handling**: Client-side error reporting to API, comprehensive form validation, and toast notifications.
- **Multi-page Routing**: React Router with layout support and error boundaries.
- **Production Ready**: Type-safe TypeScript, optimized builds, and CI-friendly scripts.

## Tech Stack

- **Frontend**: React 18, Vite, React Router, TanStack Query, shadcn/ui, Tailwind CSS, Lucide Icons, Sonner (toasts), Framer Motion
- **Backend**: Convex (realtime database/storage/auth), Hono (API framework)
- **Deployment**: Cloudflare Workers/Pages, Wrangler
- **Auth & Email**: Convex Auth with custom OTP email provider (Andromo SMTP)
- **Tools**: Bun (package manager), TypeScript, ESLint, Tailwind, Immer
- **Other**: Convex File Storage, Zod validation, Immer for state

## Prerequisites

- [Bun](https://bun.sh/) (fast all-in-one toolkit)
- [Cloudflare Account](https://dash.cloudflare.com/) with Workers/Pages enabled
- [Convex Account](https://dashboard.convex.dev/) (free tier available)
- SMTP credentials for email auth (Andromo SMTP or compatible)

## Quick Start

1. **Clone & Install**:
   ```bash
   git clone <your-repo-url>
   cd phish-defense-educat-1kj-c5itp2shp0ik03-tz
   bun install
   ```

2. **Environment Setup**:
   Create `.env` or set in Cloudflare/Convex dashboard:
   ```
   VITE_CONVEX_URL=https://your-project.convex.site
   ANDROMO_SMTP_URL=https://your-smtp.andromo.com
   ANDROMO_SMTP_API_KEY=your-smtp-api-key
   ```

3. **Deploy Backend** (Convex):
   ```bash
   bun run backend:deploy
   ```
   Copy the generated `VITE_CONVEX_URL` from Convex dashboard.

4. **Run Development Server**:
   ```bash
   bun run dev
   ```
   Open `http://localhost:3000` (or `${PORT:-3000}`).

## Local Development

- **Development Mode**: `bun run dev` – Starts Vite dev server + Workers proxy + Convex sync.
- **Type Generation**: `bun run cf-typegen` – Updates Worker types.
- **Linting**: `bun run lint`.
- **Preview Build**: `bun run preview`.
- **Add Routes**: Edit `worker/userRoutes.ts` for custom API endpoints.
- **Convex Functions**: Modify `convex/` files; `bun run backend:deploy` to push changes.
- **UI Components**: Use shadcn/ui via `components.json`; add new ones with CLI if needed.

### Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Local dev server (Vite + Convex + Workers) |
| `bun run build` | Full build (Convex + Vite dist) |
| `bun run preview` | Preview production build |
| `bun run deploy` | Deploy to Cloudflare |
| `bun run backend:deploy` | Deploy Convex backend |
| `bun run lint` | Run ESLint |

## Usage Examples

- **Sign Up/Login**: Uses `SignInForm` with OTP email verification.
- **File Upload**: Use Convex `generateUploadUrl` + `saveFileMetadata`.
- **List Files**: `api.files.listFiles` query for user files.
- **API Routes**: Extend `worker/userRoutes.ts` for `/api/*` endpoints.
- **Custom Pages**: Add routes in `src/main.tsx` and pages in `src/pages/`.

Example file upload flow (client-side):
```tsx
const { url } = await convex.mutation(api.files.generateUploadUrl());
await fetch(url, { method: 'POST', body: file });
await convex.mutation(api.files.saveFileMetadata, { storageId, filename, mimeType, size });
```

## Deployment

1. **Deploy Backend**:
   ```bash
   bun run backend:deploy
   ```
   Update `VITE_CONVEX_URL` in Cloudflare environment variables.

2. **Deploy Frontend + Workers**:
   ```bash
   bun run deploy
   ```
   Or use Wrangler dashboard: `wrangler deploy`.

3. **Cloudflare Pages** (alternative for static assets):
   - Bind Workers to Pages project via `wrangler.jsonc`.
   - Set env vars in Cloudflare dashboard.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/anandanand39981-blip/phishing-awareness-defense-simulator)

### Production Env Vars

| Var | Description | Required |
|-----|-------------|----------|
| `VITE_CONVEX_URL` | Convex deployment URL | Yes |
| `ANDROMO_SMTP_URL` | SMTP service base URL | Email auth |
| `ANDROMO_SMTP_API_KEY` | SMTP API key | Email auth |

## Contributing

1. Fork the repo.
2. `bun install`.
3. Create feature branch: `git checkout -b feature/AmazingFeature`.
4. Commit: `git commit -m 'Add AmazingFeature'`.
5. Push: `git push origin feature/AmazingFeature`.
6. Open PR.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Support

- [Convex Docs](https://docs.convex.dev)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers)
- Issues: GitHub Issues

Built with ❤️ using Cloudflare + Convex starter template.