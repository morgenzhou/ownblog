const encoder = new TextEncoder();

export function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init.headers || {}),
    },
  });
}

export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function slugify(value = "") {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `post-${Date.now()}`;
}

export function normalizePost(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description || "",
    body: row.body || "",
    heroImage: row.hero_image || "",
    tags: safeJson(row.tags, []),
    draft: Boolean(row.draft),
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function postInput(input) {
  const title = String(input.title || "").trim();
  const description = String(input.description || "").trim();
  const body = String(input.body || "").trim();
  const heroImage = String(input.heroImage || "").trim();
  const tags = Array.isArray(input.tags)
    ? input.tags.map((tag) => String(tag).trim()).filter(Boolean)
    : String(input.tags || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
  const publishedAt = String(input.publishedAt || new Date().toISOString()).trim();
  const draft = Boolean(input.draft);
  const slug = slugify(input.slug || title);

  return { title, slug, description, body, heroImage, tags, publishedAt, draft };
}

export function validatePost(input) {
  if (!input.title) return "Title is required.";
  if (!input.slug) return "Slug is required.";
  if (!input.body) return "Body is required.";
  return null;
}

export async function requireAdmin(context) {
  const env = context.env || {};
  if (!env.ADMIN_PASSWORD || !env.ADMIN_SESSION_SECRET) {
    return { error: json({ error: "Admin is not configured." }, { status: 503 }) };
  }

  const cookie = context.request.headers.get("cookie") || "";
  const match = cookie.match(/(?:^|;\s*)admin_session=([^;]+)/);
  if (!match) return { error: json({ error: "Unauthorized." }, { status: 401 }) };

  const [timestamp, signature] = decodeURIComponent(match[1]).split(".");
  const age = Date.now() - Number(timestamp);
  if (!timestamp || !signature || Number.isNaN(age) || age < 0 || age > 1000 * 60 * 60 * 24 * 14) {
    return { error: json({ error: "Session expired." }, { status: 401 }) };
  }

  const expected = await signSession(timestamp, env.ADMIN_SESSION_SECRET);
  if (signature !== expected) return { error: json({ error: "Unauthorized." }, { status: 401 }) };

  return { ok: true };
}

export async function sessionCookie(secret) {
  const timestamp = String(Date.now());
  const signature = await signSession(timestamp, secret);
  return `admin_session=${encodeURIComponent(`${timestamp}.${signature}`)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=1209600`;
}

export function clearSessionCookie() {
  return "admin_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0";
}

export function markdownToHtml(markdown = "") {
  const lines = String(markdown).replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let listOpen = false;
  let paragraph = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${inline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };
  const closeList = () => {
    if (listOpen) {
      html.push("</ul>");
      listOpen = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      closeList();
      continue;
    }
    if (trimmed.startsWith("### ")) {
      flushParagraph();
      closeList();
      html.push(`<h3>${inline(trimmed.slice(4))}</h3>`);
    } else if (trimmed.startsWith("## ")) {
      flushParagraph();
      closeList();
      html.push(`<h2>${inline(trimmed.slice(3))}</h2>`);
    } else if (trimmed.startsWith("# ")) {
      flushParagraph();
      closeList();
      html.push(`<h1>${inline(trimmed.slice(2))}</h1>`);
    } else if (/^- /.test(trimmed)) {
      flushParagraph();
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${inline(trimmed.slice(2))}</li>`);
    } else {
      paragraph.push(trimmed);
    }
  }

  flushParagraph();
  closeList();
  return html.join("\n");
}

async function signSession(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function safeJson(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function inline(value) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" rel="noreferrer">$1</a>');
}
