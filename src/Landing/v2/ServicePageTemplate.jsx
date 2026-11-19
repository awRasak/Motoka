import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import {
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  serviceSchema,
  ORGANIZATION,
  WEBSITE,
} from '../../utils/schema'

// Shared shell for the location/service landing pages (License Renewal, Road
// Worthiness, Ogun State, Ladipo). Same visual language as the rest of the
// site (brand blue hero, white content sections, navy FAQ-style accordion)
// but content-driven so each page is just data, not a new layout to build.
//
// Optional slots let a page grow into a real answer page without a bespoke
// layout: `sections` for long-form copy, `table` for cost/fee grids,
// `lastUpdated`/`author` for E-E-A-T freshness signals, and `service` for a
// Service+Offer node. Pages that don't pass them render exactly as before.
export default function ServicePageTemplate({
  seoTitle,
  seoDescription,
  seoPath,
  eyebrow,
  h1,
  subcopy,
  steps,
  benefits,
  faqs,
  sections,
  table,
  lastUpdated,
  author,
  breadcrumbs,
  service,
  related,
  ctaText = 'Renew Now',
  ctaTo = '/#top',
}) {
  // Marked up from the page's own content, so every page on this template gets
  // its steps and FAQs into search results without restating them as schema.
  const jsonLd = useMemo(() => {
    const graph = [ORGANIZATION, WEBSITE]
    const crumbs = breadcrumbSchema(breadcrumbs)
    if (crumbs) graph.push(crumbs)
    if (steps?.length) {
      graph.push(howToSchema({ name: h1, description: subcopy, path: seoPath, steps }))
    }
    if (service) {
      graph.push(
        serviceSchema({
          name: service.name || h1,
          description: seoDescription,
          path: seoPath,
          serviceType: service.serviceType,
          priceRange: service.priceRange,
        }),
      )
    }
    if (faqs?.length) graph.push(faqSchema(faqs))
    return graph
  }, [steps, faqs, h1, subcopy, seoPath, seoDescription, breadcrumbs, service])

  return (
    <>
      <Seo title={seoTitle} description={seoDescription} path={seoPath} jsonLd={jsonLd} />
      <section className="bg-[#2389E3]/15" style={{ paddingTop: 96, paddingBottom: 96 }}>
        <div style={{ paddingLeft: 'clamp(24px, 7.9vw, 114px)', paddingRight: 'clamp(24px, 7.9vw, 114px)', maxWidth: 820 }}>
          {breadcrumbs?.length > 1 && (
            <nav aria-label="Breadcrumb" style={{ marginBottom: 16 }}>
              <ol className="flex flex-wrap items-center gap-2" style={{ fontSize: 13, color: '#64748b' }}>
                {breadcrumbs.map((crumb, i) => (
                  <li key={crumb.path} className="flex items-center gap-2">
                    {i < breadcrumbs.length - 1 ? (
                      <Link to={crumb.path} className="hover:underline" style={{ color: '#2389e3' }}>
                        {crumb.name}
                      </Link>
                    ) : (
                      <span>{crumb.name}</span>
                    )}
                    {i < breadcrumbs.length - 1 && <span aria-hidden="true">/</span>}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <p style={{ fontWeight: 600, fontSize: 12, letterSpacing: '0.1em', color: '#2389E3', textTransform: 'uppercase', marginBottom: 12 }}>
            {eyebrow}
          </p>
          <h1 style={{ fontWeight: 500, fontSize: 'clamp(32px, 4.5vw, 50.9px)', color: '#2389E3', lineHeight: 1.15 }}>{h1}</h1>
          <p style={{ marginTop: 20, fontSize: 18, lineHeight: 1.6, color: '#05243f' }}>{subcopy}</p>
          <Link
            to={ctaTo}
            className="inline-flex items-center justify-center hover:brightness-110 transition-all"
            style={{ marginTop: 32, background: '#21b993', color: 'white', fontWeight: 600, fontSize: 16, padding: '14px 32px', borderRadius: 10 }}
          >
            {ctaText}
          </Link>
          {(lastUpdated || author) && (
            <p style={{ marginTop: 20, fontSize: 13, color: '#64748b' }}>
              {author && <>Reviewed by {author}. </>}
              {lastUpdated && <>Last updated {lastUpdated}.</>}
            </p>
          )}
        </div>
      </section>

      {steps && (
        <section style={{ paddingLeft: 'clamp(24px, 7.9vw, 114px)', paddingRight: 'clamp(24px, 7.9vw, 114px)', paddingTop: 80, paddingBottom: 80 }}>
          <h2 style={{ fontWeight: 500, fontSize: 32, color: '#05243f', marginBottom: 40 }}>How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 24 }}>
            {steps.map((step, i) => (
              <div key={step.title} style={{ background: '#f8fafc', border: '1px solid rgba(5,36,63,0.13)', borderRadius: 20, padding: 28 }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#94a3b8', marginBottom: 12 }}>{String(i + 1).padStart(2, '0')}</p>
                <h3 style={{ fontWeight: 700, fontSize: 20, color: '#05243f', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.6 }}>{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {table && (
        <section className="bg-[#f8fafc]" style={{ paddingLeft: 'clamp(24px, 7.9vw, 114px)', paddingRight: 'clamp(24px, 7.9vw, 114px)', paddingTop: 80, paddingBottom: 80 }}>
          <h2 style={{ fontWeight: 500, fontSize: 32, color: '#05243f', marginBottom: 12 }}>{table.title}</h2>
          {table.caption && (
            <p style={{ color: '#64748b', marginBottom: 28, maxWidth: 640, lineHeight: 1.6 }}>{table.caption}</p>
          )}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 16, overflow: 'hidden', minWidth: 520 }}>
              <thead>
                <tr style={{ background: '#05243f' }}>
                  {table.head.map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '14px 18px', color: 'white', fontWeight: 600, fontSize: 14 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, i) => (
                  <tr key={row[0]} style={{ background: i % 2 ? '#f8fafc' : 'white', borderTop: '1px solid #e2e8f0' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '14px 18px', color: j === 0 ? '#05243f' : '#64748b', fontWeight: j === 0 ? 600 : 400, fontSize: 15 }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {table.note && (
            <p style={{ marginTop: 16, fontSize: 13, color: '#94a3b8', maxWidth: 640, lineHeight: 1.6 }}>{table.note}</p>
          )}
        </section>
      )}

      {sections?.length > 0 && (
        <section style={{ paddingLeft: 'clamp(24px, 7.9vw, 114px)', paddingRight: 'clamp(24px, 7.9vw, 114px)', paddingTop: 80, paddingBottom: 80, maxWidth: 900 }}>
          {sections.map((section) => (
            <div key={section.heading} style={{ marginBottom: 48 }}>
              <h2 style={{ fontWeight: 500, fontSize: 28, color: '#05243f', marginBottom: 16 }}>{section.heading}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} style={{ color: '#475569', lineHeight: 1.75, marginBottom: 14, fontSize: 16 }}>{p}</p>
              ))}
              {section.list?.length > 0 && (
                <ul style={{ listStyle: 'disc', paddingLeft: 22, color: '#475569', lineHeight: 1.75 }}>
                  {section.list.map((item, i) => (
                    <li key={i} style={{ marginBottom: 8 }}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {benefits && (
        <section className="bg-[#f8fafc]" style={{ paddingLeft: 'clamp(24px, 7.9vw, 114px)', paddingRight: 'clamp(24px, 7.9vw, 114px)', paddingTop: 80, paddingBottom: 80 }}>
          <h2 style={{ fontWeight: 500, fontSize: 32, color: '#05243f', marginBottom: 40 }}>Why Motoka</h2>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 20 }}>
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start" style={{ gap: 16 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2389e3', marginTop: 8, flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 18, color: '#05243f', marginBottom: 4 }}>{b.title}</h3>
                  <p style={{ color: '#64748b', lineHeight: 1.6 }}>{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {related?.length > 0 && (
        <section style={{ paddingLeft: 'clamp(24px, 7.9vw, 114px)', paddingRight: 'clamp(24px, 7.9vw, 114px)', paddingTop: 80, paddingBottom: 80 }}>
          <h2 style={{ fontWeight: 500, fontSize: 26, color: '#05243f', marginBottom: 24 }}>
            Vehicle licence renewal in other states
          </h2>
          <div className="flex flex-wrap gap-3">
            {related.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="rounded-full border px-4 py-2 text-sm font-medium hover:brightness-110"
                style={{ borderColor: 'rgba(35,137,227,.35)', color: '#2389e3' }}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {faqs && (
        <section style={{ paddingLeft: 'clamp(24px, 7.9vw, 114px)', paddingRight: 'clamp(24px, 7.9vw, 114px)', paddingTop: 80, paddingBottom: 96 }}>
          <h2 style={{ fontWeight: 500, fontSize: 32, color: '#05243f', marginBottom: 32 }}>Frequently asked questions</h2>
          <div style={{ borderTop: '1px solid #e2e8f0' }}>
            {faqs.map((item) => (
              <details key={item.q} style={{ padding: '24px 0', borderBottom: '1px solid #e2e8f0' }}>
                <summary style={{ fontWeight: 600, fontSize: 17, color: '#05243f', cursor: 'pointer' }}>{item.q}</summary>
                <p style={{ marginTop: 12, color: '#64748b', lineHeight: 1.7 }}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
