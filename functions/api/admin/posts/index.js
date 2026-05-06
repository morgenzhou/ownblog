import { json, normalizePost, postInput, requireAdmin, validatePost } from "../../../_utils.js";

export async function onRequestGet(context) {
  const admin = await requireAdmin(context);
  if (admin.error) return admin.error;
  if (!context.env.DB) return json({ error: "D1 database binding DB is missing." }, { status: 503 });

  const { results } = await context.env.DB.prepare(
    "SELECT * FROM posts ORDER BY published_at DESC, id DESC",
  ).all();
  return json({ posts: results.map(normalizePost) });
}

export async function onRequestPost(context) {
  const admin = await requireAdmin(context);
  if (admin.error) return admin.error;
  if (!context.env.DB) return json({ error: "D1 database binding DB is missing." }, { status: 503 });

  const input = postInput(await context.request.json().catch(() => ({})));
  const error = validatePost(input);
  if (error) return json({ error }, { status: 400 });

  try {
    const result = await context.env.DB.prepare(
      `INSERT INTO posts (title, slug, description, body, hero_image, tags, draft, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        input.title,
        input.slug,
        input.description,
        input.body,
        input.heroImage,
        JSON.stringify(input.tags),
        input.draft ? 1 : 0,
        input.publishedAt,
      )
      .run();

    const post = await context.env.DB.prepare("SELECT * FROM posts WHERE id = ?")
      .bind(result.meta.last_row_id)
      .first();
    return json({ post: normalizePost(post) }, { status: 201 });
  } catch (err) {
    return json({ error: "Slug already exists. Choose another slug." }, { status: 409 });
  }
}
