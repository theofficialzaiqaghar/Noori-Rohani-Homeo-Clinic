import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export function AppearancePage() {
  const [brand, setBrand] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.getSettings().then((s) => setBrand(s.brand)).catch((e) => setError(e.message));
  }, []);

  const save = async (event) => {
    event.preventDefault();
    try {
      await api.patchSettings({ brand });
      setMessage("Appearance saved. Public site updates within 30 seconds or on refresh.");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!brand) return <p>Loading…</p>;

  return (
    <section className="admin-card">
      <h2>Colors & surfaces</h2>
      {message && <p className="admin-alert admin-alert--success">{message}</p>}
      {error && <p className="admin-alert admin-alert--error">{error}</p>}
      <form className="admin-form" onSubmit={save}>
        {[
          ["primaryColor", "Primary brand"],
          ["secondaryColor", "Secondary / accent"],
          ["backgroundColor", "Page background"],
          ["surfaceColor", "Surface / cards"],
          ["textColor", "Body text"],
          ["mutedTextColor", "Muted text"],
        ].map(([key, label]) => (
          <label key={key}>
            {label}
            <input
              type="color"
              value={brand[key]}
              onChange={(e) => setBrand({ ...brand, [key]: e.target.value })}
            />
          </label>
        ))}
        <button type="submit" className="admin-btn">
          Save appearance
        </button>
      </form>
    </section>
  );
}
