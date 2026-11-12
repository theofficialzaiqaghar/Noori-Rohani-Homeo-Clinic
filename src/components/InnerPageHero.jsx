export function InnerPageHero({ kicker, titleId = "inner-page-title", title, lead }) {
  return (
    <section className="contact-page-hero inner-page-hero" aria-labelledby={titleId}>
      <div className="shell contact-page-hero__inner">
        {kicker ? <p className="contact-page-hero__kicker">{kicker}</p> : null}
        <h1 id={titleId}>{title}</h1>
        {lead ? <p className="contact-page-hero__lede">{lead}</p> : null}
      </div>
    </section>
  );
}
