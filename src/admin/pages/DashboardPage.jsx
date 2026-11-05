import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";

export function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .dashboard()
      .then((data) => setStats(data.stats))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="admin-grid">
      <section className="admin-card">
        <h2>Overview</h2>
        {error && <p className="admin-alert admin-alert--error">{error}</p>}
        <dl className="admin-stats">
          <div>
            <dt>Media assets</dt>
            <dd>{stats?.mediaCount ?? "—"}</dd>
          </div>
        </dl>
        <div className="admin-actions">
          <Link className="admin-btn" to="/admin/media">
            Open media library
          </Link>
          <Link className="admin-btn admin-btn--ghost" to="/admin/appearance">
            Edit appearance
          </Link>
        </div>
      </section>
      <section className="admin-card">
        <h2>Quick tasks</h2>
        <ul className="admin-list">
          <li>Upload a new hero image and assign it to the Hero slot.</li>
          <li>Adjust typography scale if headings feel too large on mobile.</li>
          <li>Update footer social links before publishing campaigns.</li>
        </ul>
      </section>
    </div>
  );
}
