import Reveal from "./Reveal";

export default function PageHero({ eyebrow, title, body }) {
  return (
    <section className="page-hero">
      <div className="route-grid" aria-hidden="true" />
      <div className="container page-hero-inner">
        <Reveal className="section-kicker inverse">{eyebrow}</Reveal>
        <Reveal as="h1" className="page-title">{title}</Reveal>
        <Reveal className="page-hero-body">{body}</Reveal>
      </div>
    </section>
  );
}
