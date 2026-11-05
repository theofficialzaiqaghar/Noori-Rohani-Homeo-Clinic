import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export function BrandPage() {
  const [media, setMedia] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const findBySlot = (slot) => media.find((m) => m.slot === slot);

  const load = async () => {
    try {
      setMedia(await api.listMedia());
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const assignSlot = async (id, slot) => {
    if (!id && slot) return;
    try {
      if (id) await api.patchMedia(id, { slot });
      setMessage(slot ? `Assigned to ${slot}.` : "Slot cleared.");
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const clearSlot = async (slotKey) => {
    const item = findBySlot(slotKey);
    if (!item) {
      setMessage("No image assigned to that slot.");
      return;
    }
    await assignSlot(item.id, null);
  };

  const brandItems = media.filter((m) => m.category === "brand" || m.slot?.startsWith("brand."));

  return (
    <section className="admin-card">
      <h2>Logo & brand assets</h2>
      <p className="admin-muted">Assign uploaded images to site slots. Upload new files from the Media library.</p>
      {message && <p className="admin-alert admin-alert--success">{message}</p>}
      {error && <p className="admin-alert admin-alert--error">{error}</p>}

      <div className="admin-brand-actions">
        <button type="button" className="admin-btn admin-btn--ghost" onClick={() => clearSlot("brand.logo")}>
          Clear logo slot
        </button>
        <button type="button" className="admin-btn admin-btn--ghost" onClick={() => clearSlot("brand.favicon")}>
          Clear favicon slot
        </button>
      </div>

      <div className="admin-media-grid">
        {brandItems.map((item) => (
          <article key={item.id} className="admin-media-card">
            <img src={item.url} alt={item.description || item.name} />
            <h3>{item.name}</h3>
            <p className="admin-muted">Slot: {item.slot || "none"}</p>
            <div className="admin-actions">
              <button type="button" className="admin-btn" onClick={() => assignSlot(item.id, "brand.logo")}>
                Use as logo
              </button>
              <button type="button" className="admin-btn admin-btn--ghost" onClick={() => assignSlot(item.id, "brand.favicon")}>
                Use as favicon
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
