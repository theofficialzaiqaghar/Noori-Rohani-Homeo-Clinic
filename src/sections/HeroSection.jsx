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
  const slideImgRefs = useRef([]);
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
    if (reduceMotion) {
      gsap.set(copyRef.current.querySelectorAll(".hero-word__inner, .hero-reveal"), {
        yPercent: 0,
        opacity: 1,
        filter: "none",
      });
      return;
    }
    contentTween.current?.kill();
    const targets = copyRef.current.querySelectorAll(".hero-word__inner, .hero-reveal");
    if (!targets.length) return;

    contentTween.current = gsap.fromTo(
      targets,
      { yPercent: 108, opacity: 0, filter: "blur(6px)" },
      {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.85,
        stagger: { each: 0.045, from: "start" },
        ease: "power3.out",
      }
    );
  }, [reduceMotion]);

  const runSlideImageAnimation = useCallback(() => {
    if (reduceMotion) return;
    const img = slideImgRefs.current[index];
    if (!img) return;
    gsap.killTweensOf(img);
    gsap.fromTo(
      img,
      { scale: 1.14, clipPath: "inset(12% 8% 0% 8% round 0.5rem)" },
      { scale: 1.06, clipPath: "inset(0% 0% 0% 0% round 0)", duration: 1.35, ease: "power2.inOut" }
    );
  }, [index, reduceMotion]);

  useLayoutEffect(() => {
    slideImgRefs.current.forEach((img, i) => {
      if (!img) return;
      if (i === index) {
        img.parentElement?.classList.add("is-active");
        gsap.set(img, { opacity: 1 });
      } else {
        img.parentElement?.classList.remove("is-active");
        gsap.set(img, { opacity: reduceMotion ? (i === index ? 1 : 0) : 0 });
      }
    });
    runSlideImageAnimation();
    runContentAnimation();
  }, [index, reduceMotion, runContentAnimation, runSlideImageAnimation]);

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
      gsap.to(root.current.querySelectorAll(".hero-banner__slide.is-active .hero-banner__slide-img"), {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    { scope: root, dependencies: [index, useCmsOnly, reduceMotion] }
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
              ref={(el) => {
                slideImgRefs.current[i] = el;
              }}
              className="hero-banner__slide-img"
              src={slide.image}
              alt=""
              style={{ objectPosition: bgPos }}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
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
