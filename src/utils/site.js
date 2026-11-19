// Production origin is the default so every canonical/sitemap URL is stable.
// VITE_SITE_URL lets a staging/preview build emit its own URLs instead of
// pointing search engines at production. The Node prerender script imports this
// module too, where import.meta.env is undefined and process.env is available.
const configured =
  typeof import.meta !== "undefined" && import.meta.env
    ? import.meta.env.VITE_SITE_URL
    : globalThis.process?.env?.VITE_SITE_URL;

export const SITE_ORIGIN = (configured || "https://www.motokaapp.ng").replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalised === "/" ? "/" : normalised}`;
}
