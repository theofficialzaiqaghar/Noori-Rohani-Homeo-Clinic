import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { Button } from "../components/Button";
import { RESEARCH_COUNCIL } from "../lib/founderProfile";

export function ResearchCouncilSection() {
  const ref = useReveal({ childSelector: "[data-reveal-item]" });

  return (
    <section className="section section--paper research-council-home" aria-labelledby="irc-home-title" ref={ref}>
      <div className="shell research-council-home__grid">
        <div className="research-council-home__copy">
          <p className="section-head__kicker" data-reveal-item>
            {RESEARCH_COUNCIL.title}
          </p>
          <h2 id="irc-home-title" className="section-head__title" data-reveal-item>
            {RESEARCH_COUNCIL.person}
          </h2>
          <p className="research-council__role" data-reveal-item>
            <strong>{RESEARCH_COUNCIL.role}</strong>
          </p>
          <p className="split-section__lede" data-reveal-item>
            {RESEARCH_COUNCIL.paragraphs[0]}
          </p>
          <Button as={Link} to="/services/spiritual/international-research-center" data-reveal-item>
            Learn more
          </Button>
        </div>
        <aside className="research-council-home__aside" data-reveal-item>
          <ul className="research-council-home__points">
            <li>Ph.D. Islamic Studies · Professor at Iqra University</li>
            <li>Dars-e-Nizami · Takhassus in Islamic Jurisprudence</li>
            <li>Khilāfah — Naqshbandiyah Mujadidyah</li>
            <li>Seerah research & global outreach</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
