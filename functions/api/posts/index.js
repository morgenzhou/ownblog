import { json, normalizePost } from "../../_utils.js";

export async function onRequestGet(context) {
  if (!context.env.DB) return json({ posts: [], setupRequired: true });

  const { results } = await context.env.DB.prepare(
    `SELECT id, title, slug, description, hero_image, tags, draft, published_at, created_at, updated_at
     FROM posts
     WHERE draft = 0
     ORDER BY published_at DESC, id DESC`,
  ).all();

  return json({ posts: results.map(normalizePost) });
}
