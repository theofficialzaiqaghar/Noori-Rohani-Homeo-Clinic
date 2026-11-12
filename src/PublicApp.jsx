import { PublicLayout } from "./layout/PublicLayout";
import { HeroSection } from "./sections/HeroSection";
import { ServicesSection } from "./sections/ServicesSection";
import { HomeopathyServicesSection } from "./sections/HomeopathyServicesSection";
import { RohaniSection } from "./sections/RohaniSection";
import { SpiritualServicesHubSection } from "./sections/SpiritualServicesHubSection";
import { AboutSection } from "./sections/AboutSection";
import { ProductsSection } from "./sections/ProductsSection";
import { MehfilPreviewSection } from "./sections/MehfilPreviewSection";
import { EducationSection } from "./sections/EducationSection";
import { WhySection } from "./sections/WhySection";
import { ProcessSection } from "./sections/ProcessSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { FAQSection } from "./sections/FAQSection";
import { ContactSection } from "./sections/ContactSection";
import { useI18n } from "./providers/I18nProvider";
import { usePageMeta } from "./hooks/usePageMeta";

function HomePageSeo() {
  const { t } = useI18n();
  usePageMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    pathname: "/",
    breadcrumb: [{ name: t("nav.home"), item: "/" }],
  });
  return null;
}

export default function PublicApp() {
  return (
    <PublicLayout headerOverlay>
      <HomePageSeo />
      <div className="hero-region" id="hero-region">
        <HeroSection />
      </div>
      <main id="main" tabIndex={-1}>
        <ServicesSection />
        <HomeopathyServicesSection />
        <RohaniSection />
        <SpiritualServicesHubSection />
        <AboutSection />
        <ProductsSection />
        <MehfilPreviewSection />
        <EducationSection />
        <WhySection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
    </PublicLayout>
  );
}
