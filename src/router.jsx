import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HashScroll } from "./components/HashScroll";
import { RouteScrollRefresh } from "./components/RouteScrollRefresh";
import { AppProviders } from "./layout/AppProviders";
import PublicApp from "./PublicApp";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import ServicesLandingPage from "./pages/ServicesLandingPage";
import ServicesHubHomeopathyPage from "./pages/ServicesHubHomeopathyPage";
import ServiceDetailHomeopathyPage from "./pages/ServiceDetailHomeopathyPage";
import ServicesHubSpiritualPage from "./pages/ServicesHubSpiritualPage";
import ServiceDetailSpiritualPage from "./pages/ServiceDetailSpiritualPage";
import ProductsHubPage from "./pages/ProductsHubPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import MehfilPage from "./pages/MehfilPage";
import { AdminLoginPage } from "./admin/pages/AdminLoginPage";
import { AdminLayout } from "./admin/AdminLayout";
import { DashboardPage } from "./admin/pages/DashboardPage";
import { MediaPage } from "./admin/pages/MediaPage";
import { AppearancePage } from "./admin/pages/AppearancePage";
import { TypographyPage } from "./admin/pages/TypographyPage";
import { BrandPage } from "./admin/pages/BrandPage";
import { FooterSettingsPage } from "./admin/pages/FooterSettingsPage";
import { ProfilePage } from "./admin/pages/ProfilePage";
import { ProtectedRoute } from "./admin/ProtectedRoute";

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppProviders>
        <HashScroll />
        <RouteScrollRefresh />
        <Routes>
        <Route path="/" element={<PublicApp />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesLandingPage />} />
        <Route path="/services/homeopathy" element={<ServicesHubHomeopathyPage />} />
        <Route path="/services/homeopathy/:slug" element={<ServiceDetailHomeopathyPage />} />
        <Route path="/services/spiritual" element={<ServicesHubSpiritualPage />} />
        <Route path="/services/spiritual/:slug" element={<ServiceDetailSpiritualPage />} />
        <Route path="/products" element={<ProductsHubPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/events/mehfil" element={<MehfilPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="appearance" element={<AppearancePage />} />
          <Route path="typography" element={<TypographyPage />} />
          <Route path="brand" element={<BrandPage />} />
          <Route path="footer" element={<FooterSettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppProviders>
    </BrowserRouter>
  );
}
