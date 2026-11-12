import { Link, Navigate, useParams } from "react-router-dom";
import { PublicLayout } from "../layout/PublicLayout";
import { useI18n } from "../providers/I18nProvider";
import { usePageMeta } from "../hooks/usePageMeta";
import { SPIRITUAL_SERVICE_SLUGS, SPIRITUAL_SERVICES } from "../lib/spiritualServiceData";
import { InnerPageHero } from "../components/InnerPageHero";
import { Button } from "../components/Button";
import { ServiceDetailLayout } from "../components/services/ServiceDetailLayout";
import { getRelatedClinicalServices } from "../lib/serviceRelated";
import { SERVICES_BREADCRUMB_INDEX } from "../lib/servicesCatalog";

export default function ServiceDetailSpiritualPage() {
  const { slug } = useParams();
  const { t } = useI18n();

  const valid = slug && SPIRITUAL_SERVICE_SLUGS.includes(slug);
  const serviceMeta = SPIRITUAL_SERVICES.find((s) => s.slug === slug);

  usePageMeta({
    title: valid ? t(`pages.spiritual.items.${slug}.documentTitle`) : t("errors.notFound.title"),
    description: valid ? t(`pages.spiritual.items.${slug}.metaDescription`) : t("meta.description"),
    pathname: valid ? `/services/spiritual/${slug}` : "/services/spiritual",
    breadcrumb: valid
      ? [
          { name: t("nav.home"), item: "/" },
          { name: t(SERVICES_BREADCRUMB_INDEX.labelKey), item: SERVICES_BREADCRUMB_INDEX.href },
          { name: t("pages.spiritual.hub.breadcrumbCurrent"), item: "/services/spiritual" },
          { name: t(`pages.spiritual.items.${slug}.title`) },
        ]
      : undefined,
  });

  if (!valid || !serviceMeta) {
    return <Navigate to="/services/spiritual" replace />;
  }

  const related = getRelatedClinicalServices("spiritual", slug);

  return (
    <PublicLayout>
      <main id="main" tabIndex={-1} className="inner-page">
        <InnerPageHero
          kicker={t("pages.spiritual.detail.kicker")}
          title={t(`pages.spiritual.items.${slug}.title`)}
          lead={t(`pages.spiritual.items.${slug}.summary`)}
          actions={
            <Button as={Link} to="/contact">
              {t("pages.spiritual.detail.contactCta")}
            </Button>
          }
        />
        <ServiceDetailLayout
          category="spiritual"
          slug={slug}
          imageKey={serviceMeta.imageKey}
          relatedItems={related}
        />
      </main>
    </PublicLayout>
  );
}
