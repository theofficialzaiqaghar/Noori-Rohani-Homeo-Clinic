import { Link, Navigate, useParams } from "react-router-dom";
import { PublicLayout } from "../layout/PublicLayout";
import { useI18n } from "../providers/I18nProvider";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { HOMEOPATHY_SERVICE_SLUGS } from "../lib/homeopathyServiceData";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InnerPageHero } from "../components/InnerPageHero";
import { SectionVisual } from "../components/SectionVisual";
import { Button } from "../components/Button";
export default function ServiceDetailHomeopathyPage() {
  const { slug } = useParams();
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.05 });

  const valid = slug && HOMEOPATHY_SERVICE_SLUGS.includes(slug);
  usePageMeta({
    title: valid ? t(`pages.homeopathy.items.${slug}.documentTitle`) : t("errors.notFound.title"),
    description: valid ? t(`pages.homeopathy.items.${slug}.metaDescription`) : t("meta.description"),
    pathname: valid ? `/services/homeopathy/${slug}` : "/services/homeopathy",
    breadcrumb: valid
      ? [
          { name: t("nav.home"), item: "/" },
          { name: t("pages.homeopathy.hub.breadcrumbCurrent"), item: "/services/homeopathy" },
          { name: t(`pages.homeopathy.items.${slug}.title`) },
        ]
      : undefined,
  });

  if (!valid) {
    return <Navigate to="/services/homeopathy" replace />;
  }

  const related = HOMEOPATHY_SERVICE_SLUGS.filter((s) => s !== slug).slice(0, 3);

  return (
    <PublicLayout>
      <main id="main" tabIndex={-1} className="inner-page">
        <InnerPageHero
          kicker={t("pages.homeopathy.detail.kicker")}
          title={t(`pages.homeopathy.items.${slug}.title`)}
          lead={t(`pages.homeopathy.items.${slug}.summary`)}
        />
        <article className="section section--paper detail-article" ref={ref}>
          <div className="shell detail-article__inner">
            <Breadcrumbs
              items={[
                { label: t("nav.home"), href: "/" },
                { label: t("pages.homeopathy.hub.breadcrumbCurrent"), href: "/services/homeopathy" },
                { label: t(`pages.homeopathy.items.${slug}.title`) },
              ]}
            />
            <div className="detail-article__layout">
              <div className="detail-article__media" data-reveal-item>
                <SectionVisual imageKey="homeopathy" alt={t(`pages.homeopathy.items.${slug}.imageAlt`)} className="inner-page__visual" />
              </div>
              <div className="detail-article__body">
                <section data-reveal-item>
                  <h2>{t("pages.homeopathy.detail.overviewHeading")}</h2>
                  <p>{t(`pages.homeopathy.items.${slug}.overview`)}</p>
                </section>
                <section data-reveal-item>
                  <h3>{t("pages.homeopathy.detail.approachHeading")}</h3>
                  <p>{t(`pages.homeopathy.items.${slug}.approach`)}</p>
                </section>
                <section data-reveal-item>
                  <h3>{t("pages.homeopathy.detail.consultHeading")}</h3>
                  <p>{t(`pages.homeopathy.items.${slug}.consult`)}</p>
                  <Button as={Link} to="/contact" className="detail-article__cta">
                    {t("btn.bookAppointment")}
                  </Button>
                </section>
                <section className="related-cards" data-reveal-item aria-labelledby="related-homeopathy-heading">
                  <h3 id="related-homeopathy-heading">{t("pages.homeopathy.detail.relatedHeading")}</h3>
                  <ul className="related-cards__list">
                    {related.map((s) => (
                      <li key={s}>
                        <Link to={`/services/homeopathy/${s}`}>{t(`pages.homeopathy.items.${s}.title`)}</Link>
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
