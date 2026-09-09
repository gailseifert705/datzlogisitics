import { site } from "@/data/site";

export default function sitemap() {
  return [
    { url: site.domain, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${site.domain}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.domain}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 }
  ];
}
