import { Link, Navigate, useParams } from "react-router-dom";
import { PublicLayout } from "../layout/PublicLayout";
import { useI18n } from "../providers/I18nProvider";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { getProductBySlug, getRelatedProducts } from "../lib/productCatalog";
import { SITE_IMAGES } from "../lib/siteImagery";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InnerPageHero } from "../components/InnerPageHero";
import { Button } from "../components/Button";

import { CLINIC_WHATSAPP } from "../lib/contactInfo";

const WHATSAPP = `https://wa.me/${CLINIC_WHATSAPP}`;

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.05 });

  const product = slug ? getProductBySlug(slug) : null;
  usePageMeta({
    title: product ? t(`pages.products.items.${slug}.documentTitle`) : t("errors.notFound.title"),
    description: product ? t(`pages.products.items.${slug}.metaDescription`) : t("meta.description"),
    pathname: product ? `/products/${slug}` : "/products",
    type: "website",
    breadcrumb: product
      ? [
          { name: t("nav.home"), item: "/" },
          { name: t("pages.products.hub.breadcrumbCurrent"), item: "/products" },
          { name: t(`pages.products.items.${slug}.title`) },
        ]
      : undefined,
  });

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const related = getRelatedProducts(slug, 3);

  return (
    <PublicLayout>
      <main id="main" tabIndex={-1} className="inner-page">
        <InnerPageHero
          kicker={t("pages.products.detail.kicker")}
          title={t(`pages.products.items.${slug}.title`)}
          lead={t(`pages.products.items.${slug}.short`)}
        />
        <article className="section section--paper detail-article" ref={ref}>
          <div className="shell detail-article__inner">
            <Breadcrumbs
              items={[
                { label: t("nav.home"), href: "/" },
                { label: t("pages.products.hub.breadcrumbCurrent"), href: "/products" },
                { label: t(`pages.products.items.${slug}.title`) },
              ]}
            />
            <div className="detail-article__layout detail-article__layout--product">
              <div className="detail-article__media" data-reveal-item>
                <div className="product-detail__figure">
                  <img
                    src={SITE_IMAGES[product.imageKey]}
                    alt={t(`pages.products.items.${slug}.imageAlt`)}
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <p className="product-detail__price">{t(`pages.products.items.${slug}.price`)}</p>
              </div>
              <div className="detail-article__body">
                <section data-reveal-item>
                  <h2>{t("pages.products.detail.detailsHeading")}</h2>
                  <p>{t(`pages.products.items.${slug}.details`)}</p>
                </section>
                <section data-reveal-item>
                  <h3>{t("pages.products.detail.usageHeading")}</h3>
                  <p>{t(`pages.products.items.${slug}.usage`)}</p>
                </section>
                <div className="product-detail__actions" data-reveal-item>
                  <Button as="a" href={WHATSAPP} rel="noopener noreferrer">
                    {t("pages.products.detail.orderCta")}
                  </Button>
                  <Button as={Link} to="/contact" variant="ghost">
                    {t("pages.products.detail.inquiryCta")}
                  </Button>
                </div>
                <section className="related-cards" data-reveal-item aria-labelledby="related-products-heading">
                  <h3 id="related-products-heading">{t("pages.products.detail.relatedHeading")}</h3>
                  <ul className="related-cards__list related-cards__list--tiles">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link to={`/products/${p.slug}`} className="related-cards__tile">
                          {t(`pages.products.items.${p.slug}.title`)}
                        </Link>
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
