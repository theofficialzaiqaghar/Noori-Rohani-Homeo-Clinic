import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll to in-page sections when using /#section links from any route. */
export function HashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      if (pathname !== "/") window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
      return;
    }
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    if (!id) return;
    const run = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    requestAnimationFrame(() => requestAnimationFrame(run));
  }, [pathname, hash]);

  return null;
}
