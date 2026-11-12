import { Link, Navigate, useParams } from "react-router-dom";
import { PublicLayout } from "../layout/PublicLayout";
import { useI18n } from "../providers/I18nProvider";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { SPIRITUAL_SERVICE_SLUGS } from "../lib/spiritualServiceData";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InnerPageHero } from "../components/InnerPageHero";
import { SectionVisual } from "../components/SectionVisual";
import { Button } from "../components/Button";

export default function ServiceDetailSpiritualPage() {
  const { slug } = useParams();
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.05 });

  const valid = slug && SPIRITUAL_SERVICE_SLUGS.includes(slug);
  usePageMeta({
    title: valid ? t(`pages.spiritual.items.${slug}.documentTitle`) : t("errors.notFound.title"),
    description: valid ? t(`pages.spiritual.items.${slug}.metaDescription`) : t("meta.description"),
    pathname: valid ? `/services/spiritual/${slug}` : "/services/spiritual",
    breadcrumb: valid
      ? [
          { name: t("nav.home"), item: "/" },
          { name: t("pages.spiritual.hub.breadcrumbCurrent"), item: "/services/spiritual" },
          { name: t(`pages.spiritual.items.${slug}.title`) },
        ]
      : undefined,
  });

  if (!valid) {
    return <Navigate to="/services/spiritual" replace />;
  }

  const related = SPIRITUAL_SERVICE_SLUGS.filter((s) => s !== slug).slice(0, 3);

  return (
    <PublicLayout>
      <main id="main" tabIndex={-1} className="inner-page">
        <InnerPageHero
          kicker={t("pages.spiritual.detail.kicker")}
          title={t(`pages.spiritual.items.${slug}.title`)}
          lead={t(`pages.spiritual.items.${slug}.summary`)}
        />
        <article className="section section--paper detail-article" ref={ref}>
          <div className="shell detail-article__inner">
            <Breadcrumbs
              items={[
                { label: t("nav.home"), href: "/" },
                { label: t("pages.spiritual.hub.breadcrumbCurrent"), href: "/services/spiritual" },
                { label: t(`pages.spiritual.items.${slug}.title`) },
              ]}
            />
            <div className="detail-article__layout">
              <div className="detail-article__media" data-reveal-item>
                <SectionVisual imageKey="rohani" alt={t(`pages.spiritual.items.${slug}.imageAlt`)} className="inner-page__visual" />
              </div>
              <div className="detail-article__body">
                <section data-reveal-item>
                  <h2>{t("pages.spiritual.detail.overviewHeading")}</h2>
                  <p>{t(`pages.spiritual.items.${slug}.overview`)}</p>
                </section>
                <section data-reveal-item>
                  <h3>{t("pages.spiritual.detail.whatHeading")}</h3>
                  <p>{t(`pages.spiritual.items.${slug}.whatToExpect`)}</p>
                </section>
                <section data-reveal-item>
                  <h3>{t("pages.spiritual.detail.contactHeading")}</h3>
                  <p>{t(`pages.spiritual.items.${slug}.contactNote`)}</p>
                  <Button as={Link} to="/contact" className="detail-article__cta">
                    {t("pages.spiritual.detail.contactCta")}
                  </Button>
                </section>
                <section className="related-cards" data-reveal-item aria-labelledby="related-spiritual-heading">
                  <h3 id="related-spiritual-heading">{t("pages.spiritual.detail.relatedHeading")}</h3>
                  <ul className="related-cards__list">
                    {related.map((s) => (
                      <li key={s}>
                        <Link to={`/services/spiritual/${s}`}>{t(`pages.spiritual.items.${s}.title`)}</Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </article>
      </main>
    </PublicLayout>
  );
}
