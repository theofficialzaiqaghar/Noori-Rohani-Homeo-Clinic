import { useState } from "react";
import { useI18n } from "../providers/I18nProvider";
import { Button } from "./Button";
import { CLINIC_EMAIL, CLINIC_WHATSAPP } from "../lib/contactInfo";

export function ContactForm({ idPrefix = "", className = "" }) {
  const { t } = useI18n();
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const fieldId = (name) => `${idPrefix}${name}`;

  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;

    const nextErrors = {};
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const service = String(data.get("service") || "").trim();

    if (name.length < 2) nextErrors.name = t("home.form.errors.name");
    if (phone.length < 7) nextErrors.phone = t("home.form.errors.phone");
    if (!service) nextErrors.service = t("home.form.errors.service");

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus(t("home.form.errors.summary"));
      return;
    }

    const serviceLabel = form.service.options[form.service.selectedIndex]?.text || service;
    const message = String(data.get("message") || "").trim();
    const text = [
      "Assalam-o-Alaikum,",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${serviceLabel}`,
      message ? `Message: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setStatus(t("home.form.success"));
    form.reset();
  };

  return (
    <form className={`contact-form ${className}`.trim()} onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor={fieldId("name")}>{t("home.form.name")}</label>
        <input id={fieldId("name")} name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} />
        {errors.name && <p className="field__error">{errors.name}</p>}
      </div>
      <div className="field">
        <label htmlFor={fieldId("phone")}>{t("home.form.phone")}</label>
        <input id={fieldId("phone")} name="phone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} />
        {errors.phone && <p className="field__error">{errors.phone}</p>}
      </div>
      <div className="field">
        <label htmlFor={fieldId("service")}>{t("home.form.service")}</label>
        <select id={fieldId("service")} name="service" defaultValue="" aria-invalid={Boolean(errors.service)}>
          <option value="">{t("home.form.servicePlaceholder")}</option>
          <option value="rohani">{t("home.form.serviceOptions.rohani")}</option>
          <option value="homeo">{t("home.form.serviceOptions.homeo")}</option>
          <option value="herbal">{t("home.form.serviceOptions.herbal")}</option>
          <option value="education">{t("home.form.serviceOptions.education")}</option>
          <option value="nikkah">{t("home.form.serviceOptions.nikkah")}</option>
          <option value="other">{t("home.form.serviceOptions.other")}</option>
        </select>
        {errors.service && <p className="field__error">{errors.service}</p>}
      </div>
      <div className="field">
        <label htmlFor={fieldId("message")}>{t("home.form.message")}</label>
        <textarea id={fieldId("message")} name="message" rows={4} />
      </div>
      <div className="field field--hp" aria-hidden="true">
        <label htmlFor={fieldId("website")}>Website</label>
        <input id={fieldId("website")} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit">{t("home.form.submit")}</Button>
      {status && <p className="form-status">{status}</p>}
      <p className="form-fallback">
        {t("home.form.fallback")}{" "}
        <a href={`mailto:${CLINIC_EMAIL}`}>{t("home.form.emailLink")}</a>
      </p>
    </form>
  );
}
