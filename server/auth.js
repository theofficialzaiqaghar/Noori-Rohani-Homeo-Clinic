import bcrypt from "bcrypt";
import { store, nextAdminId } from "./store.js";

export async function ensureAdminUser(username, plainPassword) {
  if (store.getState().admin_users.length > 0) return;

  if (!username || !plainPassword) {
    throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD must be set to seed the first admin user.");
  }

  const password_hash = await bcrypt.hash(plainPassword, 12);
  const state = store.getState();
  state.admin_users.push({
    id: nextAdminId(),
    username,
    password_hash,
    created_at: new Date().toISOString(),
  });
  store.save();
}

export async function verifyLogin(username, password) {
  const user = store.getState().admin_users.find((u) => u.username === username);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;
  return { id: user.id, username: user.username };
}
