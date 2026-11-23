import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "../layout/PublicLayout";
import { useI18n } from "../providers/I18nProvider";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";
import {
  HOMEOPATHY_CATEGORIES,
  filterHomeopathyServices,
  groupHomeopathyByCategory,
} from "../lib/homeopathyServiceData";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InnerPageHero } from "../components/InnerPageHero";
import { Icon } from "../components/Icon";
import { SectionVisual } from "../components/SectionVisual";
import { Button } from "../components/Button";

export default function ServicesHubHomeopathyPage() {
  const { t, lang } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.04 });
  const [selected, setSelected] = useState([]);

  usePageMeta({
    title: t("pages.homeopathy.hub.documentTitle"),
    description: t("pages.homeopathy.hub.metaDescription"),
    pathname: "/services/homeopathy",
    breadcrumb: [
      { name: t("nav.home"), item: "/" },
      { name: t("pages.services.index.breadcrumbCurrent"), item: "/services" },
      { name: t("pages.homeopathy.hub.breadcrumbCurrent") },
    ],
  });

  const filtered = useMemo(() => filterHomeopathyServices(selected), [selected]);
  const groups = useMemo(() => groupHomeopathyByCategory(filtered, selected.length ? selected : null), [filtered, selected]);

  const toggleCategory = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const clearFilters = () => setSelected([]);

  return (
    <PublicLayout>
      <main id="main" tabIndex={-1} className="inner-page">
        <InnerPageHero
          kicker={t("pages.homeopathy.hub.kicker")}
          title={t("pages.homeopathy.hub.title")}
          lead="Browse by category — choose one or more filters such as Men's problems, Pain, Skin & hair, or Mind & sleep."
        />
        <section className="section section--paper" aria-labelledby="homeopathy-hub-grid-title">
          <div className="shell" ref={ref}>
            <Breadcrumbs
              items={[
                { label: t("nav.home"), href: "/" },
                { label: t("pages.services.index.breadcrumbCurrent"), href: "/services" },
                { label: t("pages.homeopathy.hub.breadcrumbCurrent") },
              ]}
            />

            <div className="homeo-filters" data-reveal-item>
              <div className="homeo-filters__head">
                <h2 id="homeopathy-hub-grid-title" className="homeo-filters__title">
                  Filter by category
                </h2>
                <p className="homeo-filters__hint">
                  Select multiple categories to narrow the list. Leave empty to browse every group.
                </p>
              </div>
              <div className="homeo-filters__chips" role="group" aria-label="Homeopathy categories">
                <button
                  type="button"
                  className={`homeo-filters__chip${selected.length === 0 ? " is-active" : ""}`}
                  aria-pressed={selected.length === 0}
                  onClick={clearFilters}
                >
                  All categories
                </button>
                {HOMEOPATHY_CATEGORIES.map((cat) => {
                  const active = selected.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`homeo-filters__chip${active ? " is-active" : ""}`}
                      aria-pressed={active}
                      onClick={() => toggleCategory(cat.id)}
                    >
                      {lang === "ur" ? cat.labelUr : cat.label}
                    </button>
                  );
                })}
              </div>
              {selected.length > 0 ? (
                <p className="homeo-filters__meta">
                  Showing <strong>{filtered.length}</strong> service{filtered.length === 1 ? "" : "s"} in{" "}
                  <strong>{selected.length}</strong> selected categor{selected.length === 1 ? "y" : "ies"}.{" "}
                  <button type="button" className="homeo-filters__clear" onClick={clearFilters}>
                    Clear filters
                  </button>
                </p>
              ) : (
                <p className="homeo-filters__meta">
                  Showing all categories — pick filters above to focus the list.
                </p>
              )}
            </div>

            <div className="homeo-category-groups">
              {groups.map((group) => (
                <section
                  key={group.id}
                  className="homeo-category-group"
                  aria-labelledby={`homeo-cat-${group.id}`}
                  data-reveal-item
                >
                  <header className="homeo-category-group__head">
                    <h3 id={`homeo-cat-${group.id}`} className="homeo-category-group__title">
                      {lang === "ur" ? group.labelUr : group.label}
                    </h3>
                    <span className="homeo-category-group__count">{group.items.length}</span>
                  </header>
                  <div className="services-grid services-grid--hub">
                    {group.items.map((item) => (
                      <Link
                        key={`${group.id}-${item.slug}`}
                        to={`/services/homeopathy/${item.slug}`}
                        className="service-card service-card--hub service-card--photo"
                      >
                        <span className="service-card__photo">
                          <SectionVisual
                            imageKey={item.imageKey}
                            alt={t(`pages.homeopathy.items.${item.slug}.imageAlt`)}
                            className="service-card__photo-visual"
                          />
                        </span>
                        <h3 className="service-card__title">{t(`pages.homeopathy.items.${item.slug}.title`)}</h3>
                        <p className="service-card__desc">{t(`pages.homeopathy.items.${item.slug}.summary`)}</p>
                        <span className="service-card__link">
                          {t("home.services.learnMore")}
                          <Icon name="icon-arrow-right" className="service-card__arrow" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {!groups.length ? (
              <p className="homeo-filters__empty" data-reveal-item>
                No services match these filters. Try another category combination.
              </p>
            ) : null}

            <div className="inner-page__cta-panel" data-reveal-item>
              <SectionVisual imageKey="homeopathy" alt={t("pages.homeopathy.hub.visualAlt")} className="inner-page__visual" />
              <div>
                <h2 className="section-head__title">{t("pages.homeopathy.hub.approachTitle")}</h2>
                <p className="split-section__lede">{t("pages.homeopathy.hub.approachText")}</p>
                <Button as={Link} to="/contact">
                  {t("btn.bookAppointment")}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
