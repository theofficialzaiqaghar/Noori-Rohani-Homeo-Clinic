import { Link } from "react-router-dom";
import { PublicLayout } from "../layout/PublicLayout";
import { useI18n } from "../providers/I18nProvider";
import { Button } from "../components/Button";
import { usePageMeta } from "../hooks/usePageMeta";

export default function NotFoundPage() {
  const { t } = useI18n();

  usePageMeta({
    title: t("errors.notFound.title"),
    description: t("errors.notFound.lede"),
    noindex: true,
  });

  return (
    <PublicLayout>
      <main id="main" tabIndex={-1} className="inner-page section section--paper">
        <div className="shell" style={{ paddingBlock: "clamp(4rem, 12vh, 8rem)", textAlign: "center" }}>
          <p className="section-head__kicker">{t("errors.notFound.kicker")}</p>
          <h1 className="section-head__title">{t("errors.notFound.title")}</h1>
          <p className="section-head__lede section-head__lede--center">{t("errors.notFound.lede")}</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <Button as={Link} to="/">
              {t("errors.notFound.home")}
            </Button>
            <Button as={Link} to="/contact" variant="ghost">
              {t("nav.contact")}
            </Button>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
