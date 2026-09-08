import Link from "next/link";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container cta-grid">
        <Reveal className="section-kicker">NEXT MOVE</Reveal>
        <Reveal as="h2" className="cta-title">
          Need a reliable courier?<br/><em>Let’s move it forward.</em>
        </Reveal>
        <Reveal>
          <Link className="pill-button dark" href="/contact">
            Contact Datz <span>↗</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
