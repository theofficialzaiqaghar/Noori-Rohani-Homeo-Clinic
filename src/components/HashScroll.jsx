import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "../providers/SmoothScrollProvider";

/** Scroll to in-page sections when using /#section links from any route. */
export function HashScroll() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!hash) {
      if (pathname !== "/") {
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
      }
      return;
    }
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    if (!id) return;
    const run = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    requestAnimationFrame(() => requestAnimationFrame(run));
  }, [pathname, hash, lenis]);

  return null;
}
