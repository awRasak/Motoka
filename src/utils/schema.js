import { absoluteUrl } from "./site";

// Schema.org fragments for the marketing pages. Only the types Google actually
// surfaces rich results for — a generic WebPage on every route earns nothing
// and just adds weight to the head.
//
// Seo wraps an array into an @graph and strips any nested @context, so nothing
// here carries its own.

const PUBLISHER = {
  "@type": "Organization",
  name: "Motoka",
  url: absoluteUrl("/"),
};

const SOCIALS = [
  "https://www.instagram.com/trymotoka",
  "https://x.com/trymotoka",
  "https://www.tiktok.com/@trymotoka1",
];

export const ORGANIZATION = {
  ...PUBLISHER,
  logo: absoluteUrl("/icons/icon-512.png"),
  areaServed: "NG",
  email: "support@motoka.com",
  sameAs: SOCIALS,
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@motoka.com",
    contactType: "customer support",
    areaServed: "NG",
    availableLanguage: "en",
  },
  description:
    "Motoka renews vehicle licences, insurance, roadworthiness and driver's licences online in Nigeria through a licensed, MVAA-certified agent network.",
};

export const WEBSITE = {
  "@type": "WebSite",
  name: "Motoka",
  url: absoluteUrl("/"),
  inLanguage: "en-NG",
  publisher: PUBLISHER,
};

// faqs are ServicePageTemplate's { q, a } pairs.
export function faqSchema(faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// steps are ServicePageTemplate's { title, description } pairs.
export function howToSchema({ name, description, path, steps }) {
  return {
    "@type": "HowTo",
    name,
    description,
    url: absoluteUrl(path),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

// crumbs are [{ name, path }] from the site root down to the current page.
// The last crumb is the page itself, so it carries no link.
export function breadcrumbSchema(crumbs) {
  if (!crumbs?.length) return undefined;
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(index < crumbs.length - 1 ? { item: absoluteUrl(crumb.path) } : {}),
    })),
  };
}

// A Service node tells Google what is actually for sale on the page and where
// it applies. priceRange is deliberately a broad indicative band in NGN rather
// than a hard price: statutory fees vary by state and vehicle, and a wrong
// exact figure in schema is worse than a clearly-labelled range.
export function serviceSchema({ name, description, path, serviceType, priceRange }) {
  return {
    "@type": "Service",
    name,
    description,
    serviceType,
    url: absoluteUrl(path),
    areaServed: { "@type": "Country", name: "Nigeria" },
    provider: PUBLISHER,
    ...(priceRange
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "NGN",
            priceRange,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function blogPostingSchema({ title, description, path, date, image, author }) {
  // Posts carry a display date like "Mar 20, 2026". Anything Date cannot read
  // is left off rather than emitted as an invalid datePublished.
  const published = new Date(date);
  const dated = date && !Number.isNaN(published.getTime());
  const iso = dated ? published.toISOString().slice(0, 10) : undefined;

  return {
    "@type": "BlogPosting",
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    author: { "@type": "Organization", name: author || "Motoka Renewals Team" },
    ...(iso ? { datePublished: iso, dateModified: iso } : {}),
    ...(image ? { image: absoluteUrl(image) } : {}),
    publisher: PUBLISHER,
    inLanguage: "en-NG",
  };
}
