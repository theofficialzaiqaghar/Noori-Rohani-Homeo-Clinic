import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .me()
      .then((data) => setUser(data.user))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section className="admin-card">
      <h2>Admin profile</h2>
      <p className="admin-muted">Session details for the signed-in administrator.</p>
      {error && <p className="admin-alert admin-alert--error">{error}</p>}
      {user && (
        <dl className="admin-dl">
          <div>
            <dt>Username</dt>
            <dd>{user.username}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>Administrator</dd>
          </div>
        </dl>
      )}
      <p className="admin-muted">Change credentials via server environment variables (ADMIN_USERNAME / ADMIN_PASSWORD) and restart the app.</p>
    </section>
  );
}
