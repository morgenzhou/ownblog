import { json, normalizePost, postInput, requireAdmin, validatePost } from "../../../_utils.js";

export async function onRequestGet(context) {
  const admin = await requireAdmin(context);
  if (admin.error) return admin.error;
  if (!context.env.DB) return json({ error: "D1 database binding DB is missing." }, { status: 503 });

  const post = await context.env.DB.prepare("SELECT * FROM posts WHERE id = ?")
    .bind(context.params.id)
    .first();
  if (!post) return json({ error: "Post not found." }, { status: 404 });
  return json({ post: normalizePost(post) });
}

export async function onRequestPut(context) {
  const admin = await requireAdmin(context);
  if (admin.error) return admin.error;
  if (!context.env.DB) return json({ error: "D1 database binding DB is missing." }, { status: 503 });

  const input = postInput(await context.request.json().catch(() => ({})));
  const error = validatePost(input);
  if (error) return json({ error }, { status: 400 });

  try {
    await context.env.DB.prepare(
      `UPDATE posts
       SET title = ?, slug = ?, description = ?, body = ?, hero_image = ?, tags = ?,
           draft = ?, published_at = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
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
        context.params.id,
      )
      .run();

    const post = await context.env.DB.prepare("SELECT * FROM posts WHERE id = ?")
      .bind(context.params.id)
      .first();
    return json({ post: normalizePost(post) });
  } catch {
    return json({ error: "Slug already exists. Choose another slug." }, { status: 409 });
  }
}

export async function onRequestDelete(context) {
  const admin = await requireAdmin(context);
  if (admin.error) return admin.error;
  if (!context.env.DB) return json({ error: "D1 database binding DB is missing." }, { status: 503 });

  await context.env.DB.prepare("DELETE FROM posts WHERE id = ?").bind(context.params.id).run();
  return json({ ok: true });
}
