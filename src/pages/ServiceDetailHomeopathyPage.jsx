import { Navigate, useParams } from "react-router-dom";
import { PublicLayout } from "../layout/PublicLayout";
import { useI18n } from "../providers/I18nProvider";
import { usePageMeta } from "../hooks/usePageMeta";
import { HOMEOPATHY_SERVICE_SLUGS, HOMEOPATHY_SERVICES } from "../lib/homeopathyServiceData";
import { InnerPageHero } from "../components/InnerPageHero";
import { ServiceDetailLayout } from "../components/services/ServiceDetailLayout";
import { getRelatedClinicalServices } from "../lib/serviceRelated";
import { SERVICES_BREADCRUMB_INDEX } from "../lib/servicesCatalog";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";

export default function ServiceDetailHomeopathyPage() {
  const { slug } = useParams();
  const { t } = useI18n();

  const valid = slug && HOMEOPATHY_SERVICE_SLUGS.includes(slug);
  const serviceMeta = HOMEOPATHY_SERVICES.find((s) => s.slug === slug);

  usePageMeta({
    title: valid ? t(`pages.homeopathy.items.${slug}.documentTitle`) : t("errors.notFound.title"),
    description: valid ? t(`pages.homeopathy.items.${slug}.metaDescription`) : t("meta.description"),
    pathname: valid ? `/services/homeopathy/${slug}` : "/services/homeopathy",
    breadcrumb: valid
      ? [
          { name: t("nav.home"), item: "/" },
          { name: t(SERVICES_BREADCRUMB_INDEX.labelKey), item: SERVICES_BREADCRUMB_INDEX.href },
          { name: t("pages.homeopathy.hub.breadcrumbCurrent"), item: "/services/homeopathy" },
          { name: t(`pages.homeopathy.items.${slug}.title`) },
        ]
      : undefined,
  });

  if (!valid || !serviceMeta) {
    return <Navigate to="/services/homeopathy" replace />;
  }

  const related = getRelatedClinicalServices("homeopathy", slug);

  return (
    <PublicLayout>
      <main id="main" tabIndex={-1} className="inner-page">
        <InnerPageHero
          kicker={t("pages.homeopathy.detail.kicker")}
          title={t(`pages.homeopathy.items.${slug}.title`)}
          lead={t(`pages.homeopathy.items.${slug}.summary`)}
          actions={
            <Button as={Link} to="/contact">
              {t("btn.bookAppointment")}
            </Button>
          }
        />
        <ServiceDetailLayout
          category="homeopathy"
          slug={slug}
          imageKey={serviceMeta.imageKey}
          relatedItems={related}
        />
      </main>
    </PublicLayout>
  );
}
