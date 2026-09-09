"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GA_ID = "G-W0MJDL7E26";

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready || typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title
    });
  }, [pathname, ready]);

  return (
    <Script
      id="datz-ga4"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
      onLoad={() => {
        window.dataLayer = window.dataLayer || [];

        function gtag() {
          window.dataLayer.push(arguments);
        }

        window.gtag = window.gtag || gtag;
        window.gtag("js", new Date());
        window.gtag("config", GA_ID, { send_page_view: false });
        setReady(true);
      }}
    />
  );
}
