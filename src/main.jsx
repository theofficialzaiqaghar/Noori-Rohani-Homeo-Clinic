import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./router";
import "./styles/app.css";
import "./styles/redesign.css";
import "./styles/responsive.css";
import "./styles/inner-pages.css";
import "./styles/services-landing.css";
import "./styles/hero-premium.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
