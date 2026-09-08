import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact Datz Logistics for courier and delivery inquiries.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title={<>Have a delivery in mind?<br/><em>Let’s get it moving.</em></>}
        body="Tell us what you need and we’ll help you take the next step."
      />

      <section className="section light-section contact-section">
        <div className="container contact-layout">
          <div className="contact-aside">
            <Reveal className="section-kicker">START HERE</Reveal>
            <Reveal as="h2" className="display-small">A simple conversation is enough to begin.</Reveal>
            <Reveal className="contact-meta">
              <span>EMAIL</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </Reveal>
            {site.phone ? (
              <Reveal className="contact-meta">
                <span>PHONE</span>
                <a href={`tel:${site.phone}`}>{site.phone}</a>
              </Reveal>
            ) : null}
          </div>
          <Reveal className="form-wrap">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
