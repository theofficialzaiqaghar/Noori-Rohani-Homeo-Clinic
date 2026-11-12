import { SkipLink } from "./components/SkipLink";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { BackToTop } from "./components/BackToTop";
import { HeroSection } from "./sections/HeroSection";
import { ServicesSection } from "./sections/ServicesSection";
import { RohaniSection } from "./sections/RohaniSection";
import { HomeoHerbalSection } from "./sections/HomeoHerbalSection";
import { EducationSection } from "./sections/EducationSection";
import { WhySection } from "./sections/WhySection";
import { ProcessSection } from "./sections/ProcessSection";
import { FAQSection } from "./sections/FAQSection";
import { ContactSection } from "./sections/ContactSection";

export default function App() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <HeroSection />
        <ServicesSection />
        <RohaniSection />
        <HomeoHerbalSection />
        <EducationSection />
        <WhySection />
        <ProcessSection />
        <FAQSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
