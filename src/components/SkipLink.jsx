import { useI18n } from "../providers/I18nProvider";

export function SkipLink() {
  const { t } = useI18n();
  return (
    <a className="skip-link" href="#main">
      {t("a11y.skipToContent")}
    </a>
  );
}
