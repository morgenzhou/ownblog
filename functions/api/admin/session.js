import { json, requireAdmin } from "../../_utils.js";

export async function onRequestGet(context) {
  const admin = await requireAdmin(context);
  if (admin.error) return admin.error;
  return json({ ok: true });
}
