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

  return (
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
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen(v => !v)}
      >
        <span />
        <span />
      </button>

      <div className="mobile-menu">
        <div className="mobile-menu-inner">
          {links.map(([href, label], index) => (
            <Link key={href} href={href}>
              <span>0{index + 1}</span>{label}
            </Link>
          ))}
          <p>Professional courier & logistics services.</p>
        </div>
      </div>
    </header>
  );
}
