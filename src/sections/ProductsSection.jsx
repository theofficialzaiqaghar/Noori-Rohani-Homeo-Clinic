import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { useI18n } from "../providers/I18nProvider";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { HERBAL_PRODUCTS } from "../lib/productCatalog";
import { SITE_IMAGES } from "../lib/siteImagery";

import { CLINIC_WHATSAPP } from "../lib/contactInfo";

const WHATSAPP = `https://wa.me/${CLINIC_WHATSAPP}`;

export function ProductsSection() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.05 });

  return (
    <section id="products" className="section section--paper products-section" aria-labelledby="products-title">
      <div className="shell" ref={ref}>
        <header className="section-head section-head--center section-head--wide">
          <p className="section-head__kicker" data-reveal-item>
            {t("home.productsSection.label")}
          </p>
          <h2 id="products-title" className="section-head__title" data-reveal-item>
            {t("home.productsSection.title")}
          </h2>
          <p className="section-head__lede section-head__lede--center" data-reveal-item>
            {t("home.productsSection.lead")}
          </p>
          <div className="products-section__hub-cta" data-reveal-item>
            <Button as={Link} to="/products">
              {t("home.productsSection.viewCatalog")}
            </Button>
          </div>
        </header>

        <ul className="products-grid">
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
                    {t("home.productsSection.viewProduct")}
                    <Icon name="icon-arrow-right" className="product-tile__arrow" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="products-section__disclaimer" data-reveal-item>
          {t("home.productsSection.disclaimer")}
        </p>

        <div className="products-section__whatsapp" data-reveal-item>
          <Button as="a" variant="ghost" href={WHATSAPP} rel="noopener noreferrer" className="product-tile__btn">
            {t("home.products.askWhatsApp")}
          </Button>
        </div>
      </div>
    </section>
  );
}
