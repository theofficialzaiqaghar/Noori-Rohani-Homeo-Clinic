import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/api";

const CATEGORIES = ["hero", "feature", "background", "gallery", "brand", "general"];
const SLOTS = [
  "",
  "hero.main",
  "hero.background",
  "brand.logo",
  "brand.favicon",
];

export function MediaPage() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "general",
    slot: "",
    focalX: 0.5,
    focalY: 0.5,
    file: null,
  });

  const load = useCallback(async () => {
    try {
      setItems(await api.listMedia());
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onUpload = async (event) => {
    event.preventDefault();
    if (!form.file) {
      setError("Choose an image file to upload.");
      return;
    }
    setUploading(true);
    setError("");
    setMessage("");
    try {
      const fd = new FormData();
      fd.append("file", form.file);
      fd.append("name", form.name || form.file.name);
      fd.append("description", form.description);
      fd.append("category", form.category);
      if (form.slot) fd.append("slot", form.slot);
      fd.append("focalX", String(form.focalX));
      fd.append("focalY", String(form.focalY));
      await api.uploadMedia(fd);
      setMessage("Image uploaded successfully.");
      setForm({ name: "", description: "", category: "general", slot: "", focalX: 0.5, focalY: 0.5, file: null });
      event.target.reset();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this image permanently?")) return;
    try {
      await api.deleteMedia(id);
      setMessage("Deleted.");
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const onPatch = async (id, patch) => {
    try {
      await api.patchMedia(id, patch);
      setMessage("Updated.");
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-stack">
      {message && <p className="admin-alert admin-alert--success">{message}</p>}
      {error && <p className="admin-alert admin-alert--error">{error}</p>}

      <section className="admin-card">
        <h2>Upload image</h2>
        <form className="admin-form" onSubmit={onUpload}>
          <label>
            File (JPEG, PNG, WebP, AVIF, SVG — max 8MB)
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
              onChange={(e) => setForm((f) => ({ ...f, file: e.target.files?.[0] || null }))}
              required
            />
          </label>
          <label>
            Name
            <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </label>
          <label>
            Description / alt text
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} />
          </label>
          <div className="admin-form__row">
            <label>
              Category
              <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Site slot (optional)
              <select value={form.slot} onChange={(e) => setForm((f) => ({ ...f, slot: e.target.value }))}>
                {SLOTS.map((s) => (
                  <option key={s || "none"} value={s}>
                    {s || "None"}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="admin-form__row">
            <label>
              Focal X ({form.focalX})
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={form.focalX}
                onChange={(e) => setForm((f) => ({ ...f, focalX: Number(e.target.value) }))}
              />
            </label>
            <label>
              Focal Y ({form.focalY})
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={form.focalY}
                onChange={(e) => setForm((f) => ({ ...f, focalY: Number(e.target.value) }))}
              />
            </label>
          </div>
          <button type="submit" className="admin-btn" disabled={uploading}>
            {uploading ? "Uploading…" : "Upload"}
          </button>
        </form>
      </section>

      <section className="admin-card">
        <h2>Library</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Name</th>
                <th>Category</th>
                <th>Slot</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.url} alt="" className="admin-thumb" loading="lazy" />
                  </td>
                  <td>
                    <strong>{item.name}</strong>
                    <div className="admin-muted">{item.description}</div>
                  </td>
                  <td>{item.category}</td>
                  <td>
                    <select
                      value={item.slot || ""}
                      onChange={(e) => onPatch(item.id, { slot: e.target.value || null })}
                    >
                      {SLOTS.map((s) => (
                        <option key={s || "none"} value={s}>
                          {s || "None"}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button type="button" className="admin-btn admin-btn--danger" onClick={() => onDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
