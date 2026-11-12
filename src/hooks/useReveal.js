import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useReveal(options = {}) {
  const ref = useRef(null);
  const { y = 28, duration = 0.85, stagger = 0.08, childSelector = "[data-reveal-item]" } = options;

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const root = ref.current;
      if (!root || reduceMotion) return;

      const items = root.querySelectorAll(childSelector);
      const list = items.length ? [...items] : [root];
      gsap.set(list, { opacity: 0, y });

      const reveal = (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power2.out",
          overwrite: true,
        });
      };

      ScrollTrigger.batch(list, {
        start: "top 88%",
        onEnter: reveal,
        once: true,
      });

      const inView = list.filter((el) => el.getBoundingClientRect().top < window.innerHeight * 0.9);
      if (inView.length) reveal(inView);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: ref }
  );

  return ref;
}
