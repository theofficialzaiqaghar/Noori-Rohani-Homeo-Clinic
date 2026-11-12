import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useI18n } from "../providers/I18nProvider";
import { Button } from "../components/Button";
import { useSiteSettings } from "../providers/SiteSettingsProvider";
import { SITE_IMAGES } from "../lib/siteImagery";
import { HERO_SLIDES } from "../lib/heroSlides";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AUTOPLAY_MS = 7000;

export function HeroSection() {
  const { t } = useI18n();
  const { getSlot } = useSiteSettings() || {};
  const root = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const cmsBg = getSlot?.("hero.background");
  const cmsMain = getSlot?.("hero.main");
  const useCmsOnly = Boolean(cmsBg?.url || cmsMain?.url);
  const slides = useCmsOnly
    ? [{ ...HERO_SLIDES[0], image: cmsBg?.url || cmsMain?.url || SITE_IMAGES.hero }]
    : HERO_SLIDES;

  const len = slides.length;
  const active = slides[Math.min(index, len - 1)];

  const go = useCallback((delta) => setIndex((i) => (i + delta + len) % len), [len]);

  useEffect(() => {
    if (len <= 1 || paused) return undefined;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [len, paused, go]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPaused(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion || !root.current) return;
      const targets = root.current.querySelectorAll(".hero-banner__slide-media img");
      if (!targets.length) return;
      gsap.to(targets, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root, dependencies: [useCmsOnly] }
  );

  const CtaButton = ({ href, variant, className, children }) => {
    const internal = href.startsWith("/");
    if (internal) {
      return (
        <Button as={Link} to={href} variant={variant} className={className}>
          {children}
        </Button>
      );
    }
    return (
      <Button as="a" href={href} variant={variant} className={className} rel="noopener noreferrer">
        {children}
      </Button>
    );
  };

  return (
    <section
      className="hero-banner hero-banner--slider"
      ref={root}
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      onMouseEnter={() => len > 1 && setPaused(true)}
      onMouseLeave={() => len > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && setPaused(false)}
    >
      <div className="hero-banner__media" aria-hidden="true">
        {slides.map((slide, i) => {
          const isActive = i === index;
          const bgPos =
            useCmsOnly && cmsBg
              ? `${(cmsBg.focalX ?? 0.5) * 100}% ${(cmsBg.focalY ?? 0.5) * 100}%`
              : "center 40%";
          return (
            <div
              key={slide.id}
              className={`hero-banner__slide-media${isActive ? " is-active" : ""}`}
              aria-hidden={!isActive}
            >
              <img src={slide.image} alt="" style={{ objectPosition: bgPos }} />
            </div>
          );
        })}
        <div className="hero-banner__overlay" />
      </div>

      <div className="shell hero-banner__inner">
        <div className="hero-banner__copy">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="hero-banner__eyebrow">{t(`home.hero.slides.${active.id}.label`)}</p>
              <h1 id="hero-title" className="hero-banner__title">
                {t(`home.hero.slides.${active.id}.title`)}
              </h1>
              <p className="hero-banner__lede">{t(`home.hero.slides.${active.id}.subtitle`)}</p>
              <div className="hero-banner__cta-row">
                <CtaButton href={active.primaryHref} className="btn--on-dark">
                  {t(`home.hero.slides.${active.id}.primaryCta`)}
                </CtaButton>
                <CtaButton href={active.secondaryHref} variant="ghost" className="btn--ghost-on-dark">
                  {t(`home.hero.slides.${active.id}.secondaryCta`)}
                </CtaButton>
              </div>
            </motion.div>
          </AnimatePresence>

          {len > 1 ? (
            <div className="hero-banner__slider-ui" aria-label={t("home.hero.slider.controlsAria")}>
              <button type="button" className="hero-banner__slider-btn" onClick={() => go(-1)} aria-label={t("home.hero.slider.prevAria")}>
                <span aria-hidden="true">‹</span>
              </button>
              <div className="hero-banner__dots" role="tablist">
                {slides.map((slide, i) => (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={t("home.hero.slider.goToSlide", { n: String(i + 1) })}
                    className={`hero-banner__dot${i === index ? " is-active" : ""}`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
              <button type="button" className="hero-banner__slider-btn" onClick={() => go(1)} aria-label={t("home.hero.slider.nextAria")}>
                <span aria-hidden="true">›</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
