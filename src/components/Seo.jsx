import { useEffect } from "react";
import { absoluteUrl } from "../utils/site";
import { trackPageView } from "../utils/consent.js";

/**
 * Per-route document head.
 *
 * This used react-helmet 6.1.0, which does not work reliably on React 19.
 * Measured on the running app before this change: on client-side navigation —
 * how people actually move around a SPA — *no* route updated its title, every
 * one kept index.html's, and the canonical tag rendered on none of them. Only
 * a hard reload applied anything.
 *
 * Setting the tags in an effect is a few more lines than a Helmet tree, but it
 * has no version coupling to React and nothing to go stale. Tags this owns are
 * marked data-seo so repeat renders update in place instead of stacking.
 */

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("data-seo", "");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

function removeMeta(selector) {
  document.head.querySelector(selector)?.remove();
}

export default function Seo({
  title,
  description,
  path = "/",
  image,
  imageAlt,
  jsonLd,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex = false,
}) {
  const url = absoluteUrl(path);
  const fullTitle = title
    ? title.includes("Motoka")
      ? title
      : `${title} | Motoka`
    : null;

  useEffect(() => {
    if (fullTitle) document.title = fullTitle;

    if (description) {
      upsertMeta('meta[name="description"]', {
        name: "description",
        content: description,
      });
      upsertMeta('meta[property="og:description"]', {
        property: "og:description",
        content: description,
      });
    }

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      canonical.setAttribute("data-seo", "");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Open Graph. `type` matters: social crawlers render articles differently
    // from generic pages, and every blog post used to be tagged "website".
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    if (fullTitle) {
      upsertMeta('meta[property="og:title"]', { property: "og:title", content: fullTitle });
    }

    // A page that supplies its own image gets it; everything else falls back to
    // the app icon. absoluteUrl prefixes the site origin, so an image that is
    // already a full URL — several posts still point at external hosts — must
    // pass through untouched rather than becoming https://www.motokaapp.ng/https://...
    const ogImage = image
      ? /^https?:\/\//i.test(image)
        ? image
        : absoluteUrl(image)
      : absoluteUrl("/icons/icon-512.png");

    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: ogImage,
    });
    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: imageAlt || fullTitle || "Motoka",
    });

    // Twitter cards were previously static in index.html, so every shared
    // route showed the homepage's card. Keep them in sync with the OG tags.
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:url"]', { name: "twitter:url", content: url });
    if (fullTitle) {
      upsertMeta('meta[name="twitter:title"]', {
        name: "twitter:title",
        content: fullTitle,
      });
    }
    if (description) {
      upsertMeta('meta[name="twitter:description"]', {
        name: "twitter:description",
        content: description,
      });
    }
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: ogImage,
    });

    // Article timing — only emitted when a caller supplies them.
    if (type === "article") {
      if (publishedTime) {
        upsertMeta('meta[property="article:published_time"]', {
          property: "article:published_time",
          content: publishedTime,
        });
      } else removeMeta('meta[property="article:published_time"]');
      if (modifiedTime) {
        upsertMeta('meta[property="article:modified_time"]', {
          property: "article:modified_time",
          content: modifiedTime,
        });
      } else removeMeta('meta[property="article:modified_time"]');
    } else {
      removeMeta('meta[property="article:published_time"]');
      removeMeta('meta[property="article:modified_time"]');
    }

    // Robots. Soft-404/unknown paths boot from the homepage snapshot, so an
    // explicit directive stops them looking like indexable duplicates.
    // Public pages opt into rich previews; private previews opt out fully.
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    });

    // SPA page views, consent-gated: GA4 + Meta Pixel fire only after the
    // visitor accepts the cookie banner. No-ops otherwise.
    trackPageView({ path: url, title: fullTitle });
  }, [fullTitle, description, url, image, imageAlt, type, publishedTime, modifiedTime, noindex]);

  // Structured data is removed on unmount — unlike the tags above it is not
  // overwritten by the next route, so leaving it would attach one page's
  // schema to another.
  //
  // The sweep is for prerendering: a snapshot ships with its own block baked
  // in, and every route that is not prerendered boots from the homepage
  // snapshot, so without this the page ends up carrying two — the file's and
  // this route's.
  useEffect(() => {
    document.head
      .querySelectorAll('script[type="application/ld+json"][data-seo]')
      .forEach((el) => el.remove());

    if (!jsonLd) return undefined;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo", "");
    script.textContent = JSON.stringify(
      Array.isArray(jsonLd)
        ? {
            "@context": "https://schema.org",
            "@graph": jsonLd.map((node) => {
              const rest = { ...node };
              delete rest["@context"];
              return rest;
            }),
          }
        : jsonLd,
    );
    document.head.appendChild(script);

    return () => script.remove();
  }, [jsonLd]);

  return null;
}
