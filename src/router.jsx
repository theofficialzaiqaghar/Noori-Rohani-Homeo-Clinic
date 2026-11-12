import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HashScroll } from "./components/HashScroll";
import PublicApp from "./PublicApp";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
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
      <HashScroll />
      <Routes>
        <Route path="/" element={<PublicApp />} />
        <Route path="/contact" element={<ContactPage />} />
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
    </BrowserRouter>
  );
}
