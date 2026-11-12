import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { applyPageSeo } from "../lib/seo";

export function usePageMeta(options) {
  const location = useLocation();

  useEffect(() => {
    if (!options?.title) return;
    applyPageSeo({
      ...options,
      pathname: options.pathname ?? location.pathname,
    });
  }, [
    options?.title,
    options?.description,
    options?.pathname,
    options?.type,
    options?.noindex,
    location.pathname,
    JSON.stringify(options?.breadcrumb),
  ]);
}
