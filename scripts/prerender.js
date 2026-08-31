// Runs after `vite build`. This is a plain CSR React SPA — dist/index.html
// has no real content in <body>, just a script tag. That's fine for a real
// browser, but a crawler that doesn't fully execute JS (or times out before
// React finishes) sees an empty page no matter how good the <head> tags are.
//
// This snapshots each route in headless Chrome AFTER React has rendered and
// writes the resulting HTML to its own dist/<route>/index.html — so every
// route ships as real static markup (title, meta description, and visible
// content included) for crawlers, while the same file still boots the SPA
// normally for real visitors (the bundled script tag is untouched).
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer'
import serveHandler from './serve-static.js'
import { STATES } from '../src/data/states.js'
import { BLOG_POSTS } from '../src/data/blogPosts.js'

const DIST = path.resolve(import.meta.dirname, '..', 'dist')
const PORT = 4173

const STATIC_ROUTES = [
  '/',
  '/renew/vehicle-license',
  '/renew/road-worthiness',
  '/renew/drivers-license',
  '/renew/insurance',
  '/ladipo',
  '/wallet',
  '/mo',
  '/blog',
  '/about',
  '/faq',
]

// Dynamic routes (states, blog posts) are driven by the same data modules
// the React components import, so a new state or post added there is picked
// up here automatically instead of needing a second hardcoded list.
const ROUTES = [
  ...STATIC_ROUTES,
  ...STATES.map((s) => `/states/${s.slug}`),
  ...BLOG_POSTS.map((p) => `/blog/${p.slug}`),
]

const ORIGIN = 'https://www.motokaapp.ng'

// Rough priority by route depth/importance. Only a hint to crawlers, but
// keeping it derived means a new post can never arrive with no priority.
function priorityFor(route) {
  if (route === '/') return '1.0'
  if (route.startsWith('/renew/')) return '0.9'
  if (route.startsWith('/states/')) return '0.8'
  if (route.startsWith('/blog/')) return '0.6'
  if (route === '/blog') return '0.7'
  return '0.7'
}

// The sitemap is written from the same ROUTES array that drives prerendering,
// so the two can't disagree. It used to be a hand-maintained file in public/,
// which meant every new blog post or state silently went missing from it —
// exactly the drift this avoids.
async function writeSitemap() {
  const urls = ROUTES.map(
    (r) => `  <url>\n    <loc>${ORIGIN}${r === '/' ? '/' : r}</loc>\n    <priority>${priorityFor(r)}</priority>\n  </url>`
  ).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  await writeFile(path.join(DIST, 'sitemap.xml'), xml)
  console.log(`[prerender] wrote sitemap.xml (${ROUTES.length} URLs)`)
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('[prerender] dist/ not found — run `vite build` first.')
    process.exit(1)
  }

  // Captured before any route is processed — dist/index.html gets
  // overwritten with the '/' route's own snapshot partway through the loop
  // below, so the SPA fallback needs its own untouched copy rather than
  // re-reading the file from disk on every request (see serve-static.js).
  const pristineIndexHtml = await readFile(path.join(DIST, 'index.html'), 'utf-8')

  const server = createServer((req, res) => serveHandler(req, res, DIST, pristineIndexHtml))
  await new Promise((resolve) => server.listen(PORT, resolve))
  console.log(`[prerender] serving dist/ on http://localhost:${PORT}`)

  const browser = await puppeteer.launch({ headless: true })

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage()
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' })
      // The SEO head hook runs in a useEffect on mount, and route content
      // itself renders synchronously with it — networkidle0 is already past
      // both, but this gives layout/images one more tick to settle.
      await new Promise((r) => setTimeout(r, 150))
      const html = await page.content()
      await page.close()

      const outDir = route === '/' ? DIST : path.join(DIST, route)
      await mkdir(outDir, { recursive: true })
      await writeFile(path.join(outDir, 'index.html'), html)
      console.log(`[prerender] wrote ${route === '/' ? '/' : route + '/'}index.html`)
    }
    await writeSitemap()
  } finally {
    await browser.close()
    server.close()
  }

  console.log('[prerender] done')
}

main().catch((err) => {
  console.error('[prerender] failed:', err)
  process.exit(1)
})
