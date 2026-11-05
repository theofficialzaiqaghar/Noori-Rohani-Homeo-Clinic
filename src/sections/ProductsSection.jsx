import { useReveal } from "../hooks/useReveal";
import { useI18n } from "../providers/I18nProvider";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { HERBAL_PRODUCTS } from "../lib/productCatalog";

const WHATSAPP = "https://wa.me/923000000000";

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
        </header>

        <ul className="products-grid">
          {HERBAL_PRODUCTS.map((item, index) => (
            <li key={item.id} className="product-tile" data-reveal-item>
              <div className="product-tile__media" aria-hidden="true">
                <Icon name="icon-leaf" />
                <span className="product-tile__badge">{index + 1}</span>
              </div>
              <div className="product-tile__body">
                <h3 className="product-tile__name">{t("home.productsSection.placeholderName")}</h3>
                <p className="product-tile__note">{t("home.productsSection.placeholderNote")}</p>
                <Button
                  as="a"
                  variant="ghost"
                  href={WHATSAPP}
                  rel="noopener noreferrer"
                  className="product-tile__btn"
                >
                  {t("home.products.askWhatsApp")}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
