import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "../providers/I18nProvider";
import { Button } from "../components/Button";
import { useSiteSettings } from "../providers/SiteSettingsProvider";
import { SITE_IMAGES } from "../lib/siteImagery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HeroSection() {
  const { t } = useI18n();
  const { getSlot } = useSiteSettings() || {};
  const root = useRef(null);
  const cmsBg = getSlot?.("hero.background");
  const cmsMain = getSlot?.("hero.main");
  const bgUrl = cmsBg?.url || cmsMain?.url || SITE_IMAGES.hero;
  const bgPos = cmsBg
    ? `${(cmsBg.focalX ?? 0.5) * 100}% ${(cmsBg.focalY ?? 0.5) * 100}%`
    : "center 40%";

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion || !root.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-banner__eyebrow", { y: 14, opacity: 0, duration: 0.55 })
        .from(".hero-banner__title", { y: 22, opacity: 0, duration: 0.7 }, "-=0.35")
        .from(".hero-banner__lede", { y: 16, opacity: 0, duration: 0.6 }, "-=0.45")
        .from(".hero-banner__cta-row > *", { y: 12, opacity: 0, duration: 0.45, stagger: 0.08 }, "-=0.35");

      gsap.to(".hero-banner__media img", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <section className="hero-banner" ref={root} aria-labelledby="hero-title">
      <div className="hero-banner__media" aria-hidden="true">
        <img src={bgUrl} alt="" style={{ objectPosition: bgPos }} />
        <div className="hero-banner__overlay" />
      </div>

      <div className="shell hero-banner__inner">
        <div className="hero-banner__copy">
          <p className="hero-banner__eyebrow">{t("home.hero.label")}</p>
          <h1 id="hero-title" className="hero-banner__title">
            {t("home.hero.title")}
          </h1>
          <p className="hero-banner__lede">{t("home.hero.subtitle")}</p>
          <div className="hero-banner__cta-row">
            <Button as="a" href="#contact" className="btn--on-dark">
              {t("btn.bookAppointment")}
            </Button>
            <Button as="a" variant="ghost" href="https://wa.me/923000000000" rel="noopener noreferrer" className="btn--ghost-on-dark">
              {t("home.hero.whatsapp")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
