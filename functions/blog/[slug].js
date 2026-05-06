import { escapeHtml, markdownToHtml, normalizePost } from "../_utils.js";

export async function onRequestGet(context) {
  if (!context.env.DB) return new Response("Blog database is not configured.", { status: 503 });

  const row = await context.env.DB.prepare("SELECT * FROM posts WHERE slug = ? AND draft = 0")
    .bind(context.params.slug)
    .first();
  const post = normalizePost(row);
  if (!post) return new Response("Post not found.", { status: 404 });

  const tags = post.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
  const hero = post.heroImage
    ? `<div class="container article-hero"><img src="${escapeHtml(post.heroImage)}" alt="" loading="eager" /></div>`
    : "";

  return new Response(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(post.description)}" />
    <title>${escapeHtml(post.title)} | Morgen Zhou</title>
    <link rel="stylesheet" href="/_astro/global.css" />
    <style>${fallbackStyles}</style>
  </head>
  <body>
    <div class="site-shell">
      <header class="site-header">
        <nav class="nav" aria-label="Main navigation">
          <a class="brand" href="/">Morgen Zhou</a>
          <div class="nav-links">
            <a href="/blog/">Blog</a>
            <a href="/about/">About</a>
            <a href="/rss.xml">RSS</a>
          </div>
        </nav>
      </header>
      <main>
        <article>
          <header class="container article-header">
            <p class="eyebrow">Essay</p>
            <h1>${escapeHtml(post.title)}</h1>
            <p class="lede">${escapeHtml(post.description)}</p>
            <p class="post-meta">Published ${new Date(post.publishedAt).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}</p>
            ${tags ? `<div class="tag-row">${tags}</div>` : ""}
          </header>
          ${hero}
          <div class="prose">${markdownToHtml(post.body)}</div>
        </article>
      </main>
      <footer class="footer">
        <div class="container"><span>© ${new Date().getFullYear()} Morgen Zhou. Published from morgenzhou.com.</span></div>
      </footer>
    </div>
  </body>
</html>`,
    { headers: { "content-type": "text/html; charset=utf-8" } },
  );
}

const fallbackStyles = `
body{margin:0;background:#f7f4ee;color:#1f2428;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
a{color:inherit;text-underline-offset:.22em}.site-header{border-bottom:1px solid #d9d2c4;background:#fffdf8}
.nav,.container{width:min(1120px,calc(100% - 40px));margin:0 auto}.nav{min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.brand{font-weight:800;text-decoration:none}.nav-links{display:flex;gap:18px;color:#687077}.nav-links a{text-decoration:none}
.article-header{padding:54px 0 30px;max-width:820px}.eyebrow{color:#b34a2e;font-size:.9rem;font-weight:750;text-transform:uppercase;letter-spacing:.08em;margin:0 0 16px}
h1{font-size:clamp(2.2rem,5vw,4.4rem);line-height:1.08;margin:0}.lede{color:#687077;font-size:1.18rem;line-height:1.72;max-width:680px}
.post-meta{color:#687077;font-size:.9rem}.tag-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.tag{border:1px solid rgba(15,106,111,.24);color:#0f6a6f;border-radius:999px;padding:4px 9px;font-size:.82rem;background:rgba(232,239,233,.7)}
.article-hero{border-radius:8px;overflow:hidden;max-height:560px;margin-bottom:36px}.article-hero img{width:100%;height:100%;object-fit:cover;display:block}
.prose{max-width:760px;margin:0 auto 72px;font-size:1.08rem;line-height:1.78}.prose h2{font-size:1.65rem;margin-top:2.2em}.prose p,.prose li{color:#343a40}.footer{border-top:1px solid #d9d2c4;color:#687077;padding:28px 0 42px;font-size:.94rem}
`;
