import { useState } from "react";
import { Button } from "./Button";
import { CLINIC_PHONE_DISPLAY, UMRAH_PACKAGE, umrahWhatsAppHref } from "../lib/umrahPackage";

export function UmrahInquiryForm({ idPrefix = "umrah-", className = "" }) {
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
    const adults = String(data.get("adults") || "").trim();
    const children = String(data.get("children") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (name.length < 2) nextErrors.name = "Please enter your full name.";
    if (phone.length < 7) nextErrors.phone = "Please enter a valid phone number.";
    if (!adults || Number(adults) < 1) nextErrors.adults = "At least 1 adult is required.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("Please fix the highlighted fields.");
      return;
    }

    const href = umrahWhatsAppHref([
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Adults: ${adults}`,
      `Children: ${children || "0"}`,
      message ? `Message: ${message}` : "",
    ]);

    window.open(href, "_blank", "noopener,noreferrer");
    setStatus("Opening WhatsApp with your inquiry…");
    form.reset();
  };

  return (
    <form className={`contact-form umrah-form ${className}`.trim()} onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor={fieldId("name")}>Full name</label>
        <input id={fieldId("name")} name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} />
        {errors.name ? <p className="field__error">{errors.name}</p> : null}
      </div>
      <div className="field">
        <label htmlFor={fieldId("phone")}>Phone / WhatsApp</label>
        <input
          id={fieldId("phone")}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder={CLINIC_PHONE_DISPLAY}
          aria-invalid={Boolean(errors.phone)}
        />
        {errors.phone ? <p className="field__error">{errors.phone}</p> : null}
      </div>
      <div className="umrah-form__row">
        <div className="field">
          <label htmlFor={fieldId("adults")}>Adults</label>
          <input
            id={fieldId("adults")}
            name="adults"
            type="number"
            min="1"
            defaultValue="1"
            aria-invalid={Boolean(errors.adults)}
          />
          {errors.adults ? <p className="field__error">{errors.adults}</p> : null}
        </div>
        <div className="field">
          <label htmlFor={fieldId("children")}>Children</label>
          <input id={fieldId("children")} name="children" type="number" min="0" defaultValue="0" />
        </div>
      </div>
      <div className="field">
        <label htmlFor={fieldId("message")}>Message</label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={4}
          placeholder={`I am interested in the ${UMRAH_PACKAGE.title} (${UMRAH_PACKAGE.travelDate} – ${UMRAH_PACKAGE.returnDate}).`}
        />
      </div>
      <p className="visually-hidden" aria-hidden="true">
        <label htmlFor={fieldId("website")}>Website</label>
        <input id={fieldId("website")} name="website" tabIndex={-1} autoComplete="off" />
      </p>
      <Button type="submit">Send inquiry on WhatsApp</Button>
      {status ? (
        <p className="form-status" role="status">
          {status}
        </p>
      ) : null}
    </form>
  );
}
