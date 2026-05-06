import { json, normalizePost } from "../../_utils.js";

export async function onRequestGet(context) {
  if (!context.env.DB) return json({ error: "D1 database binding DB is missing." }, { status: 503 });

  const post = await context.env.DB.prepare("SELECT * FROM posts WHERE slug = ? AND draft = 0")
    .bind(context.params.slug)
    .first();
  if (!post) return json({ error: "Post not found." }, { status: 404 });
  return json({ post: normalizePost(post) });
}
