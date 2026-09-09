import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import PageLoader from "@/components/PageLoader";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { site } from "@/data/site";

export const metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Datz Logistics | Courier & Delivery Services",
    template: "%s | Datz Logistics"
  },
  description:
    "Professional courier and logistics solutions backed by more than 15 years of courier industry experience.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Datz Logistics | Courier & Delivery Services",
    description:
      "Professional courier and logistics solutions backed by more than 15 years of courier industry experience.",
    url: site.domain,
    siteName: "Datz Logistics",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Datz Logistics",
    url: site.domain,
    logo: `${site.domain}/datz-logo.png`,
    email: site.email,
    description:
      "Courier and logistics services backed by more than 15 years of courier industry experience."
  };

  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <PageLoader />
        <MotionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
