import { useCallback, useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 48;

export function useHeroCarousel(slideCount, autoplayMs = 7000) {
  const [index, setIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStartX = useRef(null);

  const len = Math.max(slideCount, 1);

  const go = useCallback(
    (delta) => {
      setIndex((i) => (i + delta + len) % len);
    },
    [len]
  );

  const goTo = useCallback(
    (i) => {
      if (i >= 0 && i < len) setIndex(i);
    },
    [len]
  );

  const autoplayActive = len > 1 && !hoverPaused && !reduceMotion;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (len <= 1) return undefined;
    const onKey = (e) => {
      if (e.target.closest("input, textarea, select")) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, len]);

  const bindTouch = useCallback(
    (el) => {
      if (!el || len <= 1) return undefined;

      const onStart = (e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      };
      const onEnd = (e) => {
        const start = touchStartX.current;
        touchStartX.current = null;
        if (start == null) return;
        const dx = (e.changedTouches[0]?.clientX ?? start) - start;
        if (Math.abs(dx) < SWIPE_THRESHOLD) return;
        go(dx > 0 ? -1 : 1);
      };

      el.addEventListener("touchstart", onStart, { passive: true });
      el.addEventListener("touchend", onEnd, { passive: true });
      return () => {
        el.removeEventListener("touchstart", onStart);
        el.removeEventListener("touchend", onEnd);
      };
    },
    [go, len]
  );

  return {
    index,
    go,
    goTo,
    autoplayActive,
    autoplayMs,
    reduceMotion,
    hoverPaused,
    setHoverPaused,
    bindTouch,
    len,
  };
}
