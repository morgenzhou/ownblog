# Morgen Zhou Blog

Next.js + Tailwind CSS blog for `morgenzhou.com`, based on the Tailwind Nextjs Starter Blog structure.

## Local Development

```bash
npm install
npm run dev
```

## Writing

Blog posts live in `data/blog` as MDX files.

## Cloudflare Pages

Use these settings:

- Framework preset: `Next.js` or `None`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: leave blank

The build script exports the Next.js site statically and copies `out` to `dist` for the existing Cloudflare Pages setup.
