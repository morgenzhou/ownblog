# Morgen Zhou Blog

Next.js + Tailwind CSS blog for `morgenzhou.com`, based on the Tailwind Nextjs Starter Blog structure.

## Local Development

```bash
npm install
npm run dev
```

## Writing

Blog posts live in `data/blog` as MDX files. TinaCMS is available at `/admin/index.html`.

For local editing:

```bash
npm run dev
```

Then open `http://localhost:3000/admin/index.html`.

For production editing, create a TinaCloud project for `morgenzhou/ownblog`, then add these Cloudflare Pages environment variables:

- `NEXT_PUBLIC_TINA_CLIENT_ID`
- `TINA_TOKEN`
- `NEXT_PUBLIC_TINA_BRANCH=main`

## Cloudflare Pages

Use these settings:

- Framework preset: `Next.js` or `None`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: leave blank

The build script exports the Next.js site statically and copies `out` to `dist` for the existing Cloudflare Pages setup.
