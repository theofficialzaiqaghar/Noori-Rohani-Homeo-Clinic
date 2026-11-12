import { Link } from "react-router-dom";
import { PublicLayout } from "../layout/PublicLayout";
import { useI18n } from "../providers/I18nProvider";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { HERBAL_PRODUCTS } from "../lib/productCatalog";
import { SITE_IMAGES } from "../lib/siteImagery";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InnerPageHero } from "../components/InnerPageHero";
import { Icon } from "../components/Icon";
import { Button } from "../components/Button";

export default function ProductsHubPage() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.05 });

  usePageMeta({
    title: t("pages.products.hub.documentTitle"),
    description: t("pages.products.hub.metaDescription"),
    pathname: "/products",
    breadcrumb: [
      { name: t("nav.home"), item: "/" },
      { name: t("pages.products.hub.breadcrumbCurrent") },
    ],
  });

  return (
    <PublicLayout>
      <main id="main" tabIndex={-1} className="inner-page">
        <InnerPageHero
          kicker={t("pages.products.hub.kicker")}
          title={t("pages.products.hub.title")}
          lead={t("pages.products.hub.lead")}
        />
        <section className="section section--paper" aria-labelledby="products-hub-grid-title">
          <div className="shell" ref={ref}>
            <Breadcrumbs
              items={[
                { label: t("nav.home"), href: "/" },
                { label: t("pages.products.hub.breadcrumbCurrent") },
              ]}
            />
            <h2 id="products-hub-grid-title" className="visually-hidden">
              {t("pages.products.hub.gridHeading")}
            </h2>
            <ul className="products-grid products-grid--page">
              {HERBAL_PRODUCTS.map((item, index) => (
                <li key={item.id} className="product-tile product-tile--link" data-reveal-item>
                  <Link to={`/products/${item.slug}`} className="product-tile__link">
                    <div className="product-tile__media" aria-hidden="true">
                      <img src={SITE_IMAGES[item.imageKey]} alt="" loading="lazy" decoding="async" />
                      <span className="product-tile__badge">{index + 1}</span>
                    </div>
                    <div className="product-tile__body">
                      <h3 className="product-tile__name">{t(`pages.products.items.${item.slug}.title`)}</h3>
                      <p className="product-tile__note">{t(`pages.products.items.${item.slug}.short`)}</p>
                      <span className="product-tile__more">
                        {t("pages.products.hub.viewDetails")}
                        <Icon name="icon-arrow-right" className="product-tile__arrow" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="product-disclaimer" data-reveal-item>
              {t("pages.products.hub.disclaimer")}
            </p>
            <div className="inner-page__inline-cta" data-reveal-item>
              <Button as={Link} to="/contact">
                {t("pages.products.hub.inquiryCta")}
              </Button>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
