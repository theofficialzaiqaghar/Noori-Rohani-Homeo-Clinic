import { useCallback, useEffect, useState } from "react";

export function useHeroCarousel(slideCount, autoplayMs = 7000) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const len = Math.max(slideCount, 1);

  const go = useCallback(
    (delta) => {
      setIndex((i) => (i + delta + len) % len);
    },
    [len]
  );

  const autoplayActive = len > 1 && !reduceMotion;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return {
    index,
    go,
    autoplayActive,
    autoplayMs,
    reduceMotion,
    len,
  };
}
