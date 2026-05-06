# Morgen Zhou Blog

Astro blog for `morgenzhou.com`.

## Local Development

```bash
npm install
npm run dev
```

## Cloudflare Pages

Use these settings when creating the Pages project:

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `morgenzhou-blog` if deploying from the parent repository

After Cloudflare shows the domain as Active, add these custom domains in Pages:

- `morgenzhou.com`
- `www.morgenzhou.com`

Blog posts live in `src/content/posts`.

## Built-in Admin

The site includes a private editor at `/admin`.

Cloudflare Pages needs these runtime settings:

- D1 binding: `DB`
- Secret: `ADMIN_PASSWORD`
- Secret: `ADMIN_SESSION_SECRET`

Create the D1 schema with `migrations/0001_posts.sql`.
