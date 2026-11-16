import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Unhide any reveal items left at opacity 0 after route change or slow ST. */
export function fixStuckRevealItems() {
  document.querySelectorAll("[data-reveal-item]").forEach((el) => {
    const opacity = gsap.getProperty(el, "opacity");
    if (opacity === 0 || opacity === "0") {
      gsap.set(el, { opacity: 1, y: 0 });
    }
  });
  ScrollTrigger.refresh();
}
