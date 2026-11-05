import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export function FooterSettingsPage() {
  const [footer, setFooter] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.getSettings().then((s) => setFooter(s.footer)).catch((e) => setError(e.message));
  }, []);

  const save = async (event) => {
    event.preventDefault();
    try {
      await api.patchSettings({ footer });
      setMessage("Footer links saved.");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!footer) return <p>Loading…</p>;

  return (
    <section className="admin-card">
      <h2>Footer & social</h2>
      {message && <p className="admin-alert admin-alert--success">{message}</p>}
      {error && <p className="admin-alert admin-alert--error">{error}</p>}
      <form className="admin-form" onSubmit={save}>
        {[
          ["socialFacebook", "Facebook URL"],
          ["socialYoutube", "YouTube URL"],
          ["socialInstagram", "Instagram URL"],
          ["socialWhatsapp", "WhatsApp URL"],
        ].map(([key, label]) => (
          <label key={key}>
            {label}
            <input
              type="url"
              value={footer[key]}
              onChange={(e) => setFooter({ ...footer, [key]: e.target.value })}
            />
          </label>
        ))}
        <button type="submit" className="admin-btn">
          Save footer settings
        </button>
      </form>
    </section>
  );
}
