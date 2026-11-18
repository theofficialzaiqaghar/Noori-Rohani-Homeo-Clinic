import { PublicLayout } from "../layout/PublicLayout";
import { useI18n } from "../providers/I18nProvider";
import { usePageMeta } from "../hooks/usePageMeta";
import { useReveal } from "../hooks/useReveal";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { UmrahInquiryForm } from "../components/UmrahInquiryForm";
import { SITE_IMAGES } from "../lib/siteImagery";
import {
  CLINIC_PHONE_DISPLAY,
  UMRAH_OPERATOR,
  UMRAH_PACKAGE,
  umrahTelHref,
  umrahWhatsAppHref,
} from "../lib/umrahPackage";
import { CLINIC_EMAIL, CLINIC_ADDRESS_EN, CLINIC_NAME } from "../lib/clinicInfo";

const waBook = umrahWhatsAppHref(["Please share booking availability and payment details."]);
const waInquire = umrahWhatsAppHref();

export default function UmrahPackagePage() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.04 });
  const pkg = UMRAH_PACKAGE;

  usePageMeta({
    title: `${pkg.title} | ${UMRAH_OPERATOR} | ${CLINIC_NAME}`,
    description: `${pkg.title} — ${pkg.travelDate} to ${pkg.returnDate}. ${pkg.duration}. Adult ${pkg.pricing.adult}, Child ${pkg.pricing.child}. Direct Karachi–Jeddah flight. Book via WhatsApp ${CLINIC_PHONE_DISPLAY}.`,
    pathname: "/umrah",
    breadcrumb: [
      { name: t("nav.home"), item: "/" },
      { name: pkg.title },
    ],
  });

  return (
    <PublicLayout>
      <main id="main" tabIndex={-1} className="umrah-page">
        <section className="umrah-hero" aria-labelledby="umrah-title">
          <div className="umrah-hero__media" aria-hidden="true">
            <img src={SITE_IMAGES.umrahHero} alt="" loading="eager" decoding="async" fetchPriority="high" />
            <div className="umrah-hero__overlay" />
          </div>
          <div className="shell umrah-hero__content">
            <p className="umrah-hero__kicker">{UMRAH_OPERATOR}</p>
            <h1 id="umrah-title">{pkg.title}</h1>
            <p className="umrah-hero__lede">
              {pkg.duration} · {pkg.departure}
            </p>
            <div className="umrah-hero__actions">
              <Button as="a" href={waBook} rel="noopener noreferrer" className="btn--on-dark">
                Book Now on WhatsApp
              </Button>
              <Button as="a" href={umrahTelHref()} variant="ghost" className="btn--ghost-on-dark">
                Call Now — {CLINIC_PHONE_DISPLAY}
              </Button>
            </div>
          </div>
        </section>

        <section className="section section--paper" ref={ref}>
          <div className="shell">
            <Breadcrumbs
              items={[
                { label: t("nav.home"), href: "/" },
                { label: pkg.title },
              ]}
            />

            <header className="umrah-section-head" data-reveal-item>
              <p className="section-head__kicker">Travel dates</p>
              <h2 className="section-head__title">Journey overview</h2>
              <p className="section-head__lede">
                Organised Umrah travel with clear dates, hotel nights, and inclusions — confirm seat availability on
                WhatsApp before payment.
              </p>
            </header>

            <ul className="umrah-facts" data-reveal-item>
              <li className="umrah-fact">
                <span className="umrah-fact__label">Travel date</span>
                <strong className="umrah-fact__value">{pkg.travelDate}</strong>
              </li>
              <li className="umrah-fact">
                <span className="umrah-fact__label">Return date</span>
                <strong className="umrah-fact__value">{pkg.returnDate}</strong>
              </li>
              <li className="umrah-fact">
                <span className="umrah-fact__label">Duration</span>
                <strong className="umrah-fact__value">{pkg.duration}</strong>
              </li>
              <li className="umrah-fact">
                <span className="umrah-fact__label">Departure</span>
                <strong className="umrah-fact__value">{pkg.departure}</strong>
              </li>
            </ul>

            <p className="umrah-note" data-reveal-item role="note">
              <Icon name="icon-check" />
              <span>
                <strong>Important:</strong> {pkg.breakfastNote}
              </span>
            </p>

            <header className="umrah-section-head" data-reveal-item>
              <p className="section-head__kicker">Stay</p>
              <h2 className="section-head__title">Hotel details</h2>
            </header>

            <div className="umrah-hotels">
              <article className="umrah-hotel" data-reveal-item>
                <p className="umrah-hotel__city">{pkg.makkah.city}</p>
                <h3 className="umrah-hotel__nights">{pkg.makkah.nights}</h3>
                <ul className="umrah-hotel__list">
                  <li>{pkg.makkah.shuttle}</li>
                  <li>{pkg.makkah.distance}</li>
                  <li>{pkg.breakfastNote}</li>
                </ul>
              </article>
              <article className="umrah-hotel" data-reveal-item>
                <p className="umrah-hotel__city">{pkg.madinah.city}</p>
                <h3 className="umrah-hotel__nights">{pkg.madinah.nights}</h3>
                <ul className="umrah-hotel__list">
                  <li>{pkg.madinah.shuttle}</li>
                  <li>{pkg.madinah.distance}</li>
                  <li>{pkg.breakfastNote}</li>
                </ul>
              </article>
            </div>

            <header className="umrah-section-head" data-reveal-item>
              <p className="section-head__kicker">Inclusions</p>
              <h2 className="section-head__title">Package includes</h2>
            </header>

            <ul className="umrah-includes" data-reveal-item>
              {pkg.includes.map((item) => (
                <li key={item}>
                  <span className="umrah-includes__icon" aria-hidden="true">
                    <Icon name="icon-check" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <header className="umrah-section-head" data-reveal-item>
              <p className="section-head__kicker">Pricing</p>
              <h2 className="section-head__title">Package pricing</h2>
            </header>

            <div className="umrah-pricing" data-reveal-item>
              <article className="umrah-price umrah-price--featured">
                <p className="umrah-price__label">{pkg.pricing.adultLabel}</p>
                <p className="umrah-price__amount">{pkg.pricing.adult}</p>
              </article>
              <article className="umrah-price">
                <p className="umrah-price__label">{pkg.pricing.childLabel}</p>
                <p className="umrah-price__amount">{pkg.pricing.child}</p>
              </article>
            </div>

            <div className="umrah-cta-bar" data-reveal-item>
              <div>
                <h2 className="umrah-cta-bar__title">Ready to book?</h2>
                <p className="umrah-cta-bar__text">
                  Message on WhatsApp for seats, or call {CLINIC_PHONE_DISPLAY}. Operated by {UMRAH_OPERATOR}; inquiries
                  handled via {CLINIC_NAME} contact channels.
                </p>
              </div>
              <div className="umrah-cta-bar__actions">
                <Button as="a" href={waBook} rel="noopener noreferrer">
                  Book Now on WhatsApp
                </Button>
                <Button as="a" href={umrahTelHref()} variant="ghost">
                  Call Now
                </Button>
              </div>
            </div>

            <div className="umrah-inquiry" data-reveal-item>
              <div className="umrah-inquiry__copy">
                <p className="section-head__kicker">Inquiry</p>
                <h2 className="section-head__title">Package inquiry form</h2>
                <p className="section-head__lede">
                  Share your details and we will open WhatsApp with a pre-filled message for this package.
                </p>
                <ul className="umrah-inquiry__contacts">
                  <li>
                    Phone: <a href={umrahTelHref()}>{CLINIC_PHONE_DISPLAY}</a>
                  </li>
                  <li>
                    WhatsApp:{" "}
                    <a href={waInquire} rel="noopener noreferrer">
                      {CLINIC_PHONE_DISPLAY}
                    </a>
                  </li>
                  <li>
                    Email: <a href={`mailto:${CLINIC_EMAIL}`}>{CLINIC_EMAIL}</a>
                  </li>
                  <li>Address: {CLINIC_ADDRESS_EN}</li>
                </ul>
              </div>
              <UmrahInquiryForm />
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
