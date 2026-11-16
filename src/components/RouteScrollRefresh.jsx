import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fixStuckRevealItems } from "../lib/revealStuck";
import { useI18n } from "../providers/I18nProvider";

/** Re-measure scroll + unhide content after navigation or i18n load. */
export function RouteScrollRefresh() {
  const { pathname } = useLocation();
  const { ready } = useI18n();

  useEffect(() => {
    const run = () => fixStuckRevealItems();
    run();
    requestAnimationFrame(run);
    const timers = [80, 200, 500].map((ms) => window.setTimeout(run, ms));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [pathname, ready]);

  return null;
}
