import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fixStuckRevealItems } from "../lib/revealStuck";

/** Native scroll only — Lenis removed for faster, natural scrolling. */
export function useLenis() {
  return null;
}

export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    let ticking = false;
    let lastY = -1;

    const publish = () => {
      ticking = false;
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      if (y === lastY) return;
      lastY = y;
      ScrollTrigger.update();
      window.dispatchEvent(new CustomEvent("site-scroll", { detail: { y } }));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(publish);
    };

    const onResize = () => {
      lastY = -1;
      onScroll();
      ScrollTrigger.refresh();
    };

    const onLoad = () => {
      fixStuckRevealItems();
      ScrollTrigger.refresh();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", onLoad);
    requestAnimationFrame(onLoad);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return children;
}
