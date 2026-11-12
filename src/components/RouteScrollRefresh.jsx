import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Re-measure scroll positions after client navigations (Lenis + inner pages). */
export function RouteScrollRefresh() {
  const { pathname } = useLocation();

  useEffect(() => {
    const run = () => ScrollTrigger.refresh();
    requestAnimationFrame(run);
    const t = window.setTimeout(run, 120);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
