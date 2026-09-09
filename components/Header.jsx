"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  ["/", "Home"],
  ["/about", "About Us"],
  ["/contact", "Contact Us"]
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const next = window.scrollY;
      setHidden(next > last && next > 120 && !open);
      last = next;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className={`site-header ${hidden ? "is-hidden" : ""} ${open ? "menu-open" : ""}`}>
        <Link className="brand-crop" href="/" aria-label="Datz Logistics home">
          <img src="/datz-logo.png" alt="Datz Logistics" />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([href, label]) => (
            <Link key={href} className={pathname === href ? "active" : ""} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <Link className="header-cta" href="/contact">Request delivery <span>↗</span></Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(v => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <div
        id="mobile-navigation"
        className={`mobile-menu ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-eyebrow">Navigation</div>

          <nav className="mobile-menu-links" aria-label="Mobile navigation">
            {links.map(([href, label], index) => (
              <Link
                key={href}
                href={href}
                className={pathname === href ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                <span className="mobile-menu-index">0{index + 1}</span>
                <span className="mobile-menu-name">{label}</span>
                <span className="mobile-menu-arrow">↗</span>
              </Link>
            ))}
          </nav>

          <div className="mobile-menu-footer">
            <div>
              <span>Datz Logistics</span>
              <p>Professional courier & logistics services backed by 15+ years of industry experience.</p>
            </div>
            <Link className="mobile-menu-cta" href="/contact" onClick={() => setOpen(false)}>
              Request delivery <span>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
