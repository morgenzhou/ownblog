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

## Online Editor

This repository is configured for Pages CMS.

1. Open https://app.pagescms.org
2. Sign in with GitHub.
3. Install or authorize Pages CMS for `morgenzhou/ownblog`.
4. Open the repository and edit `Blog posts`.

Saving a post commits to GitHub, then Cloudflare Pages deploys the site automatically.
