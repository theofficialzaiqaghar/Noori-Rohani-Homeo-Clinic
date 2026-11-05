import { useEffect, useState } from "react";
import { api } from "../../lib/api";

const FONTS = ["Plus Jakarta Sans", "Inter", "Manrope", "Geist"];

export function TypographyPage() {
  const [typography, setTypography] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.getSettings().then((s) => setTypography(s.typography)).catch((e) => setError(e.message));
  }, []);

  const save = async (event) => {
    event.preventDefault();
    try {
      await api.patchSettings({ typography });
      setMessage("Typography updated across the public website.");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!typography) return <p>Loading…</p>;

  return (
    <section className="admin-card">
      <h2>Typography system</h2>
      {message && <p className="admin-alert admin-alert--success">{message}</p>}
      {error && <p className="admin-alert admin-alert--error">{error}</p>}
      <form className="admin-form" onSubmit={save}>
        <label>
          Primary / body font
          <select
            value={typography.primaryFont}
            onChange={(e) => setTypography({ ...typography, primaryFont: e.target.value })}
          >
            {FONTS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>
        <label>
          Heading font
          <select
            value={typography.headingFont}
            onChange={(e) => setTypography({ ...typography, headingFont: e.target.value })}
          >
            {FONTS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>
        <div className="admin-form__row">
          <label>
            Heading weight
            <input
              type="number"
              min="400"
              max="800"
              step="100"
              value={typography.headingWeight}
              onChange={(e) => setTypography({ ...typography, headingWeight: e.target.value })}
            />
          </label>
          <label>
            Body weight
            <input
              type="number"
              min="300"
              max="700"
              step="100"
              value={typography.bodyWeight}
              onChange={(e) => setTypography({ ...typography, bodyWeight: e.target.value })}
            />
          </label>
        </div>
        <div className="admin-form__row">
          <label>
            Base font size (px)
            <input
              type="number"
              min="14"
              max="20"
              value={typography.baseFontSizePx}
              onChange={(e) => setTypography({ ...typography, baseFontSizePx: Number(e.target.value) })}
            />
          </label>
          <label>
            Heading scale ratio
            <input
              type="number"
              min="1.1"
              max="1.4"
              step="0.02"
              value={typography.scaleRatio}
              onChange={(e) => setTypography({ ...typography, scaleRatio: Number(e.target.value) })}
            />
          </label>
        </div>
        <label>
          Body line height
          <input
            type="number"
            min="1.4"
            max="1.9"
            step="0.05"
            value={typography.lineHeight}
            onChange={(e) => setTypography({ ...typography, lineHeight: Number(e.target.value) })}
          />
        </label>
        <button type="submit" className="admin-btn">
          Save typography
        </button>
      </form>
    </section>
  );
}
