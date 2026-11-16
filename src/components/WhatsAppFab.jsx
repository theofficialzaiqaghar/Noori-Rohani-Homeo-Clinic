import { useI18n } from "../providers/I18nProvider";
import { CLINIC_WHATSAPP } from "../lib/clinicInfo";
import { Icon } from "./Icon";

export function WhatsAppFab() {
  const { t } = useI18n();
  const href = `https://wa.me/${CLINIC_WHATSAPP}`;

  return (
    <a
      className="whatsapp-fab"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("footer.cta.whatsappAria")}
    >
      <Icon name="icon-whatsapp" />
    </a>
  );
}
