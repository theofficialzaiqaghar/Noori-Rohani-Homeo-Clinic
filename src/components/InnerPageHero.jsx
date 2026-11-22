export function InnerPageHero({ kicker, titleId = "inner-page-title", title, lead, chips = [], actions }) {
  return (
    <section className="contact-page-hero inner-page-hero" aria-labelledby={titleId}>
      <div className="shell contact-page-hero__inner">
        {kicker ? <p className="contact-page-hero__kicker">{kicker}</p> : null}
        <h1 id={titleId}>{title}</h1>
        {lead ? <p className="contact-page-hero__lede">{lead}</p> : null}
        {chips?.length ? (
          <ul className="inner-page-hero__chips" aria-label="Service focus areas">
            {chips.map((chip) => (
              <li key={chip} className="inner-page-hero__chip">
                {chip}
              </li>
            ))}
          </ul>
        ) : null}
        {actions ? <div className="inner-page-hero__actions">{actions}</div> : null}
      </div>
    </section>
  );
}
