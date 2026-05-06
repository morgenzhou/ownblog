import { clearSessionCookie, json, sessionCookie } from "../../_utils.js";

export async function onRequestPost(context) {
  const env = context.env || {};
  if (!env.ADMIN_PASSWORD || !env.ADMIN_SESSION_SECRET) {
    return json({ error: "Admin is not configured." }, { status: 503 });
  }

  const body = await context.request.json().catch(() => ({}));
  if (body.password !== env.ADMIN_PASSWORD) {
    return json({ error: "Wrong password." }, { status: 401 });
  }

  return json(
    { ok: true },
    {
      headers: {
        "set-cookie": await sessionCookie(env.ADMIN_SESSION_SECRET),
      },
    },
  );
}

export async function onRequestDelete() {
  return json(
    { ok: true },
    {
      headers: {
        "set-cookie": clearSessionCookie(),
      },
    },
  );
}
