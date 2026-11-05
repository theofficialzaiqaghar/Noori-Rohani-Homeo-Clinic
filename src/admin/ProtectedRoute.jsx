import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { api } from "../lib/api";

export function ProtectedRoute({ children }) {
  const location = useLocation();
  const [state, setState] = useState("loading");

  useEffect(() => {
    api
      .me()
      .then(() => setState("authed"))
      .catch(() => setState("guest"));
  }, []);

  if (state === "loading") {
    return <div className="admin-boot">Checking session…</div>;
  }

  if (state === "guest") {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
