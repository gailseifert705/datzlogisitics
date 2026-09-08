import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Datz Logistics and the experience behind our professional courier and delivery service.",
  alternates: { canonical: "/about" }
};

const values = [
  ["01", "Dependability", "We treat every delivery as a commitment — with clear communication and careful execution."],
  ["02", "Credibility", "More than 15 years of courier-industry experience informs how we plan, communicate, and deliver."],
  ["03", "Efficiency", "Modern tools and a focused operating approach help keep each move simple and responsive."],
  ["04", "Professionalism", "From first contact to final handoff, we aim for a polished experience people can rely on."]
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT DATZ"
        title={<>Experience on the road.<br/><em>Standards that stay high.</em></>}
        body="Datz Logistics brings more than 15 years of courier-industry experience into a modern, focused delivery company."
      />

      <section className="section light-section">
        <div className="container about-grid">
          <Reveal className="section-kicker">OUR STORY</Reveal>
          <Reveal as="h2" className="display-medium">
            Built around the part of logistics that matters most: <em>keeping the promise.</em>
          </Reveal>
          <Reveal className="body-copy">
            Courier work is more than moving an item from one address to another. It is timing,
            communication, care, accountability, and the confidence that somebody is following
            through. Datz Logistics was shaped around those fundamentals.
          </Reveal>
          <Reveal className="body-copy">
            Our team draws on more than 15 years of experience in the courier business and pairs
            that knowledge with a clean, modern approach to customer service and delivery.
          </Reveal>
        </div>
      </section>

      <section className="section ink-section">
        <div className="container">
          <Reveal className="section-kicker inverse">WHAT DRIVES US</Reveal>
          <div className="values-list">
            {values.map(([num, title, text]) => (
              <Reveal className="value-row" key={title}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container statement-grid">
          <Reveal className="mega-number">15+</Reveal>
          <Reveal>
            <p className="section-kicker">YEARS OF COURIER EXPERIENCE</p>
            <h2 className="display-small">Experience that helps us move with purpose.</h2>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
