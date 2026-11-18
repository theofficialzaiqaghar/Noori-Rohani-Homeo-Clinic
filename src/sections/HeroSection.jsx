import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { useI18n } from "../providers/I18nProvider";
import { Button } from "../components/Button";
import { useSiteSettings } from "../providers/SiteSettingsProvider";
import { SITE_IMAGES } from "../lib/siteImagery";
import { HERO_SLIDES } from "../lib/heroSlides";
import { useHeroCarousel } from "../hooks/useHeroCarousel";
import { SplitWords } from "../components/hero/SplitWords";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HeroSection() {
  const { t } = useI18n();
  const { getSlot } = useSiteSettings() || {};
  const root = useRef(null);
  const copyRef = useRef(null);
  const progressRef = useRef(null);
  const autoplayTween = useRef(null);
  const contentTween = useRef(null);

  const cmsBg = getSlot?.("hero.background");
  const cmsMain = getSlot?.("hero.main");
  const useCmsOnly = Boolean(cmsBg?.url || cmsMain?.url);
  const slides = useCmsOnly
    ? [{ ...HERO_SLIDES[0], image: cmsBg?.url || cmsMain?.url || SITE_IMAGES.hero }]
    : HERO_SLIDES;

  const { index, go, autoplayActive, autoplayMs, reduceMotion, len } = useHeroCarousel(slides.length);

  const active = slides[Math.min(index, len - 1)];

  const runContentAnimation = useCallback(() => {
    if (!copyRef.current) return;
    const targets = copyRef.current.querySelectorAll(".hero-word__inner, .hero-reveal");
    if (!targets.length) return;

    contentTween.current?.kill();

    if (reduceMotion) {
      gsap.set(targets, { y: 0, opacity: 1 });
      return;
    }

    contentTween.current = gsap.fromTo(
      targets,
      { y: 14, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.03,
        ease: "power2.out",
        overwrite: "auto",
      }
    );
  }, [reduceMotion]);

  useLayoutEffect(() => {
    runContentAnimation();
  }, [index, runContentAnimation]);

  useEffect(() => {
    autoplayTween.current?.kill();
    if (!progressRef.current) return undefined;

    gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "0% 50%" });

    if (!autoplayActive) return undefined;

    autoplayTween.current = gsap.to(progressRef.current, {
      scaleX: 1,
      duration: autoplayMs / 1000,
      ease: "none",
      onComplete: () => go(1),
    });

    return () => autoplayTween.current?.kill();
  }, [index, autoplayActive, autoplayMs, go]);

  useGSAP(
    () => {
      if (reduceMotion || !root.current) return;
      const imgs = root.current.querySelectorAll(".hero-banner__slide-img");
      gsap.to(imgs, {
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    },
    { scope: root, dependencies: [useCmsOnly, reduceMotion] }
  );

  const CtaButton = ({ href, variant, className, children }) => {
    const internal = typeof href === "string" && href.startsWith("/");
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

  const bgPos =
    useCmsOnly && cmsBg ? `${(cmsBg.focalX ?? 0.5) * 100}% ${(cmsBg.focalY ?? 0.5) * 100}%` : "center 42%";

  return (
    <section
      className={`hero-banner hero-banner--premium hero-banner--layout-${active.layout || "editorial"}`}
      ref={root}
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      data-reduce-motion={reduceMotion ? "true" : "false"}
    >
      <div className="hero-banner__progress-track" aria-hidden="true">
        <span ref={progressRef} className="hero-banner__progress-fill" />
      </div>

      <div className="hero-banner__media" aria-hidden="true">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`hero-banner__slide${i === index ? " is-active" : ""}`}
            data-slide-index={i}
          >
            <img
              className="hero-banner__slide-img"
              src={slide.image}
              alt=""
              style={{ objectPosition: bgPos }}
              loading="eager"
              decoding="async"
              fetchPriority={i === 0 ? "high" : "low"}
            />
          </div>
        ))}
        <div className="hero-banner__overlay" />
        <div className="hero-banner__vignette" aria-hidden="true" />
      </div>

      <div className="shell hero-banner__stage">
        <div className="hero-banner__grid">
          <div className="hero-banner__copy hero-banner__copy--premium" ref={copyRef}>
            <p className="hero-banner__eyebrow hero-reveal">
              <span className="hero-banner__eyebrow-line" aria-hidden="true" />
              {t(`home.hero.slides.${active.id}.label`)}
            </p>

            <SplitWords
              as="h1"
              id="hero-title"
              className="hero-banner__title"
              text={t(`home.hero.slides.${active.id}.title`)}
            />

            <p className="hero-banner__lede hero-reveal">{t(`home.hero.slides.${active.id}.subtitle`)}</p>

            <div className="hero-banner__cta-row hero-reveal">
              <CtaButton href={active.primaryHref} className="btn--on-dark hero-cta-primary">
                {t(`home.hero.slides.${active.id}.primaryCta`)}
              </CtaButton>
              <CtaButton href={active.secondaryHref} variant="ghost" className="btn--ghost-on-dark hero-cta-secondary">
                {t(`home.hero.slides.${active.id}.secondaryCta`)}
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
