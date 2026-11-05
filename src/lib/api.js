async function request(path, options = {}) {
  const res = await fetch(path, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const isJson = (res.headers.get("content-type") || "").includes("application/json");
  const data = isJson ? await res.json().catch(() => ({})) : null;

  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  getPublicSite: () => request("/api/public/site"),
  login: (username, password) =>
    request("/api/auth/login", { method: "POST", body: JSON.stringify({ username, password }) }),
  logout: () => request("/api/auth/logout", { method: "POST" }),
  me: () => request("/api/auth/me"),
  getSettings: () => request("/api/admin/settings"),
  patchSettings: (body) => request("/api/admin/settings", { method: "PATCH", body: JSON.stringify(body) }),
  listMedia: (category) =>
    request(category ? `/api/admin/media?category=${encodeURIComponent(category)}` : "/api/admin/media"),
  uploadMedia: (formData) =>
    fetch("/api/admin/media/upload", { method: "POST", body: formData, credentials: "include" }).then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Upload failed");
      return data;
    }),
  patchMedia: (id, body) =>
    request(`/api/admin/media/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteMedia: (id) => request(`/api/admin/media/${id}`, { method: "DELETE" }),
  dashboard: () => request("/api/admin/dashboard"),
};
