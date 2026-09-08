"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import TruckScene from "./TruckScene";
import CTA from "./CTA";
import { site } from "@/data/site";

const services = [
  ["01", "Courier Delivery", "Professional point-to-point delivery handled with clarity, care, and accountability."],
  ["02", "Scheduled Routes", "A dependable option for recurring pickups, regular routes, and planned business deliveries."],
  ["03", "Priority Moves", "Responsive delivery support when timing matters and the handoff needs close attention."]
];

export default function HomePage() {
  const hero = useRef(null);
  const experience = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-line",
        { yPercent: 110, filter: "blur(10px)" },
        { yPercent: 0, filter: "blur(0px)", duration: 0.95, stagger: 0.08, ease: "power4.out", delay: 0.12 }
      );
      gsap.fromTo(".hero-meta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, delay: 0.55 }
      );

      if (experience.current) {
        const number = experience.current.querySelector(".experience-number");
        if (number) {
          gsap.fromTo(number,
            { scale: 0.76, opacity: 0.1 },
            {
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: experience.current,
                start: "top 80%",
                end: "center 35%",
                scrub: 1
              }
            }
          );
        }
      }
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={hero} className="home-hero">
        <div className="route-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />

        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-meta">
              <span className="status-dot" /> COURIER + LOGISTICS
            </div>

            <h1 className="hero-title" aria-label="Driven to deliver. Built on experience.">
              <span className="clip"><span className="hero-line">Driven to</span></span>
              <span className="clip"><span className="hero-line italic">deliver.</span></span>
              <span className="clip"><span className="hero-line">Built on</span></span>
              <span className="clip"><span className="hero-line">experience.</span></span>
            </h1>

            <div className="hero-bottom">
              <p className="hero-meta">
                Professional courier and logistics solutions backed by more than
                15 years of experience in the courier industry.
              </p>
              <div className="hero-meta hero-actions">
                <Link className="pill-button" href="/contact">Start a delivery <span>↗</span></Link>
                <Link className="text-link" href="/about">Our story <span>→</span></Link>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-label top">CYBER / UTILITY / MOTION</div>
            <TruckScene />
            <div className="visual-label bottom">FUTURE-READY DELIVERY</div>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label={site.tagline}>
        <div className="ticker-track">
          {Array.from({ length: 3 }).map((_, loop) => (
            <div className="ticker-set" key={loop}>
              <span>DELIVERY</span><i>◆</i>
              <span>CREDIBILITY</span><i>◆</i>
              <span>RELIABILITY</span><i>◆</i>
              <span>FAST</span><i>◆</i>
            </div>
          ))}
        </div>
      </section>

      <section ref={experience} className="section ink-section experience-section">
        <div className="container experience-grid">
          <Reveal className="section-kicker inverse">EXPERIENCE THAT MOVES</Reveal>
          <div className="experience-number">15<span>+</span></div>
          <div className="experience-copy">
            <Reveal as="h2" className="display-medium inverse">
              Years in the courier business. <em>One standard: follow through.</em>
            </Reveal>
            <Reveal className="body-copy inverse muted">
              Experience changes how you see a route, a deadline, a handoff, and a customer’s trust.
              Datz Logistics brings that perspective into every move.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container">
          <div className="section-head">
            <Reveal className="section-kicker">WHAT WE MOVE</Reveal>
            <Reveal as="h2" className="display-medium">
              Simple courier solutions.<br/><em>Handled professionally.</em>
            </Reveal>
          </div>

          <div className="services-list">
            {services.map(([num, title, text]) => (
              <Reveal className="service-row" key={title}>
                <span className="service-num">{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="service-arrow">↗</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="motion-panel">
        <div className="motion-panel-grid" aria-hidden="true" />
        <div className="container motion-panel-content">
          <Reveal className="section-kicker inverse">BUILT FOR THE NEXT MILE</Reveal>
          <Reveal as="h2" className="motion-title">
            A modern delivery company<br/>
            <em>without losing the human part.</em>
          </Reveal>

          <div className="motion-cards">
            <Reveal className="motion-card">
              <span>01</span>
              <h3>Clear communication</h3>
              <p>Know what is happening and what comes next.</p>
            </Reveal>
            <Reveal className="motion-card raised">
              <span>02</span>
              <h3>Professional handling</h3>
              <p>Every delivery reflects the standard behind the business.</p>
            </Reveal>
            <Reveal className="motion-card">
              <span>03</span>
              <h3>Responsive movement</h3>
              <p>Focused coordination for deliveries that cannot sit still.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section light-section credibility-section">
        <div className="container credibility-grid">
          <Reveal className="section-kicker">DATZ STANDARD</Reveal>
          <Reveal as="blockquote">
            “Fast” matters. But <em>reliable, credible, and accountable</em> is what makes speed useful.
          </Reveal>
          <Reveal className="credibility-note">
            DELIVERY / CREDIBILITY / RELIABILITY / FAST
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
