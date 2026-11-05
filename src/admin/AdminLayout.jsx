import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import "../styles/admin.css";

const links = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/media", label: "Media library" },
  { to: "/admin/appearance", label: "Appearance" },
  { to: "/admin/typography", label: "Typography" },
  { to: "/admin/brand", label: "Brand assets" },
  { to: "/admin/footer", label: "Footer & social" },
  { to: "/admin/profile", label: "Profile" },
];

export function AdminLayout() {
  const navigate = useNavigate();

  const logout = async () => {
    await api.logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <p className="admin-brand__title">Noori Clinic</p>
          <p className="admin-brand__sub">Administration</p>
        </div>
        <nav className="admin-nav">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className="admin-nav__link">
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar__foot">
          <a href="/" target="_blank" rel="noreferrer" className="admin-nav__link">
            View website
          </a>
          <button type="button" className="admin-nav__link admin-nav__link--button" onClick={logout}>
            Logout
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <h1>Content & appearance</h1>
          <p>Manage media, typography, and brand settings for the public site.</p>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
