import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div>
          <span className="footer-label">DATZ LOGISTICS</span>
          <h2>Move with confidence.</h2>
        </div>
        <a className="footer-email" href={`mailto:${site.email}`}>{site.email} ↗</a>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Datz Logistics</span>
        <div>
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
