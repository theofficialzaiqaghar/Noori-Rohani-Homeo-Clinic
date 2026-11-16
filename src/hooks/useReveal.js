import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Light enter motion — content always visible.
 * Skips on reduced-motion and coarse pointers (phones) for smoother scroll.
 */
export function useReveal(options = {}) {
  const ref = useRef(null);
  const { y = 16, duration = 0.45, stagger = 0.04, childSelector = "[data-reveal-item]" } = options;

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const root = ref.current;
      if (!root) return undefined;

      const items = root.querySelectorAll(childSelector);
      const list = items.length ? [...items] : [root];

      gsap.set(list, { clearProps: "transform,opacity" });
      list.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });

      if (reduceMotion || coarse) return undefined;

      ScrollTrigger.batch(list, {
        start: "top 94%",
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y, opacity: 1 },
            {
              y: 0,
              opacity: 1,
              duration,
              stagger,
              ease: "power2.out",
              overwrite: "auto",
              clearProps: "transform",
            }
          );
        },
      });

      const settle = () => {
        list.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      };

      settle();
      const t1 = window.setTimeout(settle, 120);

      return () => {
        window.clearTimeout(t1);
      };
    },
    { scope: ref }
  );

  return ref;
}
