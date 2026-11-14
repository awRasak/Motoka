import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import heroImage from "../assets/business/hero-image.jpg";

// Merchant / fleet landing page — ported from the design mockup at
// `motoka business/preview/fleet-landing.html` plus its design tokens
// (`motoka business/preview/ui-tokens.md`). Content sections reuse the v2
// marketing chrome: brand-blue hero, white content sections, navy CTA panel.

const NAVY = "#0B1F3A";
const BLUE = "#1A6FC4";
const SKY = "#2389E3";
const MUTED = "#4A5B73";
const LINE = "#D9E8F7";
const SOFT = "#E8F2FD";
const SKY_SOFT = "#A2C1EC";
const INK = "#05243F";

const OK_BG = "#DCFCE7";
const OK_INK = "#166534";
const WARN_BG = "#FEF3C7";
const WARN_INK = "#92400E";
const BAD_BG = "#FDECEC";
const BAD_INK = "#9B1C1C";

function Pill({ tone = "neutral", children }) {
  const bg = tone === "ok" ? OK_BG : tone === "warn" ? WARN_BG : tone === "bad" ? BAD_BG : SOFT;
  const ink = tone === "ok" ? OK_INK : tone === "warn" ? WARN_INK : tone === "bad" ? BAD_INK : INK;
  return (
    <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 999, whiteSpace: "nowrap", backgroundColor: bg, color: ink }}>
      {children}
    </span>
  );
}

function MockRow({ tone = "neutral", left, right }) {
  const bg = tone === "ok" ? OK_BG : tone === "warn" ? WARN_BG : tone === "bad" ? BAD_BG : SOFT;
  const ink = tone === "ok" ? OK_INK : tone === "warn" ? WARN_INK : tone === "bad" ? BAD_INK : INK;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 16px", borderRadius: 12, backgroundColor: bg, color: ink, fontSize: 14 }}>
      <span>{left}</span>
      {right ? (typeof right === "string" ? <b style={{ fontWeight: 800 }}>{right}</b> : right) : null}
    </div>
  );
}

function Section({ id, bg = "#fff", children }) {
  return (
    <section id={id} style={{ backgroundColor: bg, paddingTop: 96, paddingBottom: 96 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>{children}</div>
    </section>
  );
}

const H2 = { fontSize: "clamp(30px, 3.6vw, 40px)", lineHeight: 1.12, letterSpacing: "-0.02em", fontWeight: 800, color: INK, maxWidth: 680, margin: "0 0 14px" };
const H3 = { margin: "0 0 8px", fontSize: 22, letterSpacing: "-0.01em", fontWeight: 700, color: INK };
const LEAD = { margin: "0 0 40px", fontSize: 18, lineHeight: 1.6, color: MUTED, maxWidth: 640 };

function Hero() {
  return (
    <section style={{ position: "relative", backgroundColor: "#0A1F3A", backgroundImage: "radial-gradient(900px 460px at 50% -8%, rgba(35,137,227,.42), transparent 70%), linear-gradient(180deg, #0A1F3A 0%, #0A1F3A 30%, #1A6FC4 100%)", paddingTop: 96, paddingBottom: 0, overflow: "hidden" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", paddingLeft: 24, paddingRight: 24, textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(38px, 5.2vw, 60px)", lineHeight: 1.07, letterSpacing: "-0.03em", fontWeight: 800, color: "#fff", maxWidth: 820, margin: "0 auto 20px" }}>
          Modern compliance for fleets that never stop moving
        </h1>
        <p style={{ margin: "0 auto 30px", fontSize: "clamp(16px, 1.6vw, 19px)", lineHeight: 1.55, fontWeight: 500, color: SKY_SOFT, maxWidth: 620 }}>
          Track every licence, insurance and roadworthiness date across your fleet. Renew in bulk and keep verified documents in one place.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
          <Link to="/auth/signup" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", backgroundColor: NAVY, color: "#fff", fontWeight: 700, fontSize: 16, lineHeight: 1, padding: "15px 26px", borderRadius: 999, border: "1px solid transparent" }}>Create account</Link>
          <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff", color: NAVY, fontWeight: 700, fontSize: 16, lineHeight: 1, padding: "15px 26px", borderRadius: 999, border: "1px solid transparent" }}>Talk to sales</Link>
        </div>
        <p style={{ margin: "16px 0 0", fontSize: 13, fontWeight: 500, color: "#D9E8F7" }}>Motoka is a service provider, not a government agency.</p>
      </div>

      <div style={{ maxWidth: 1100, margin: "40px auto 0", paddingLeft: 24, paddingRight: 24, position: "relative", zIndex: 2 }}>
        <img
          src={heroImage}
          alt="Motoka Business dashboard preview"
          style={{ width: "100%", height: "auto", display: "block", borderRadius: "24px 24px 0 0", boxShadow: "0 -24px 60px -12px rgba(0,0,0,.45)" }}
        />
      </div>

      <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 200, background: "linear-gradient(to bottom, transparent, #fff)", pointerEvents: "none", zIndex: 1 }} />
    </section>
  );
}

const FEATURES = [
  {
    h3: "Bulk renewals",
    body: "Upload a CSV or pick vehicles, review one itemised bill and pay once.",
    rows: [
      { tone: "warn", left: <b style={{ fontWeight: 800, color: INK }}>LSD-482-XY</b>, right: "Due soon" },
      { tone: "bad", left: <b style={{ fontWeight: 800, color: INK }}>KJA-119-AA</b>, right: "Expired" },
      { tone: "ok", left: <b style={{ fontWeight: 800, color: INK }}>EKY-733-KJ</b>, right: "Valid" },
    ],
  },
  {
    h3: "Fleet document wallet",
    body: "Every document for every vehicle, checked against agency records and stored encrypted.",
    rows: [
      { tone: "warn", left: "Roadworthiness", right: "Renewing" },
      { tone: "ok", left: "Vehicle licence", right: "Verified" },
      { tone: "ok", left: "Insurance", right: "Verified" },
    ],
  },
  {
    h3: "Expiry alerts that escalate",
    body: "Set the intervals once. If nothing is renewed in time, your admin hears about it.",
    rows: [
      { tone: "neutral", left: "90 days before", right: "Email" },
      { tone: "neutral", left: "30 days before", right: "SMS, WhatsApp" },
      { tone: "neutral", left: "7 days before", right: "Escalate to admin" },
    ],
  },
  {
    h3: "Roles and approvals",
    body: "Managers request, finance approves, drivers view. Every action is logged.",
    rows: [
      { tone: "neutral", left: "Ada asked to renew 4 vehicles", right: "Approver: Tunde" },
      { tone: "ok", left: "Approvals", right: <Pill tone="ok">Approve</Pill> },
    ],
  },
  {
    h3: "Driver checkpoint mode",
    body: "Valid documents one tap away on the driver's phone, even offline.",
    rows: [
      { tone: "ok", left: "EKY-733-KJ", right: "Licence valid" },
      { tone: "ok", left: "EKY-733-KJ", right: "Insurance valid" },
      { tone: "ok", left: "EKY-733-KJ", right: "Roadworthy" },
    ],
  },
  {
    h3: "Reports and audit log",
    body: "Spend by vehicle or branch, invoices for finance and a record of who did what.",
    chart: true,
  },
];

function FeatureCard({ f }) {
  return (
    <article style={{ backgroundColor: "#fff", border: "1px solid " + LINE, borderRadius: 28, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 28, minHeight: 210, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center", overflow: "hidden" }}>
        {f.chart ? (
          <div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120, width: "100%", marginBottom: 10 }}>
              {[40, 70, 55, 90, 65].map(function (h, i) {
                return <div key={i} style={{ flex: 1, height: h + "%", backgroundColor: SOFT, borderRadius: 6 }} />;
              })}
            </div>
            <span style={{ fontSize: 13, color: MUTED }}>Sample spend by branch</span>
          </div>
        ) : (
          f.rows.map(function (r, i) {
            return <MockRow key={i} tone={r.tone} left={r.left} right={r.right} />;
          })
        )}
      </div>
      <div style={{ padding: "28px 32px 32px" }}>
        <h3 style={H3}>{f.h3}</h3>
        <p style={{ margin: "0 0 16px", fontSize: 16, lineHeight: 1.6, color: MUTED }}>{f.body}</p>
        <Link to="/auth/signup" style={{ fontWeight: 700, color: BLUE }}>Create account</Link>
      </div>
    </article>
  );
}

function FeaturesSection() {
  return (
    <Section id="features" bg="#fff">
      <h2 style={H2}>Fleet paperwork should not be that complicated</h2>
      <p style={LEAD}>Everything you need to keep every vehicle legal, from one account.</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {FEATURES.map(function (f) {
          return <FeatureCard key={f.h3} f={f} />;
        })}
      </div>
    </Section>
  );
}

const HOW_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 40, height: 40, color: BLUE }}>
        <rect x="6" y="20" width="30" height="22" rx="2" />
        <path d="M36 28h10l8 8v6h-8" />
        <circle cx="16" cy="46" r="5" />
        <circle cx="46" cy="46" r="5" />
        <path d="M21 46h20" />
      </svg>
    ),
    label: "Logistics",
    h3: "Logistics and haulage",
    body: "Keep trucks and vans moving and stop impoundments before they happen.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 40, height: 40, color: BLUE }}>
        <path d="M8 38l4-10a6 6 0 0 1 5.6-4h22.8A6 6 0 0 1 46 28l4 10" />
        <rect x="6" y="36" width="46" height="10" rx="4" />
        <circle cx="18" cy="46" r="4" />
        <circle cx="40" cy="46" r="4" />
      </svg>
    ),
    label: "Ride-hail",
    h3: "Ride-hail and hackney owners",
    body: "Manage permits, licences and insurance for every car and driver you run.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 40, height: 40, color: BLUE }}>
        <rect x="12" y="10" width="40" height="42" rx="2" />
        <path d="M24 22h4M36 22h4M24 32h4M36 32h4M24 42h4M36 42h4" />
        <path d="M28 52V42h8v10" />
      </svg>
    ),
    label: "Corporate",
    h3: "Corporate vehicle pools",
    body: "Give admin and finance a clean trail for every renewal and payment.",
  },
];

function HowYouWorkSection() {
  return (
    <Section bg="#fff">
      <div style={{ backgroundColor: SOFT, borderRadius: 36, padding: "72px 40px" }}>
        <h2 style={H2}>Built for how you work</h2>
        <p style={{ ...LEAD, marginBottom: 48 }}>The same dashboard, shaped for the fleet you run.</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {HOW_CARDS.map(function (c) {
            return (
              <article key={c.h3} style={{ backgroundColor: "#fff", border: "1px solid " + LINE, borderRadius: 28, padding: 28 }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, border: "1px solid " + LINE, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  {c.icon}
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.08em" }}>{c.label}</span>
                <h3 style={{ ...H3, marginTop: 6 }}>{c.h3}</h3>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: MUTED }}>{c.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

const STEPS = [
  {
    kicker: "Step one",
    h3: "Create your account",
    body: "Your name and a phone number or email. That is all.",
    mock: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <MockRow tone="neutral" left="Full name" />
        <MockRow tone="neutral" left="Phone or email" />
      </div>
    ),
  },
  {
    kicker: "Step two",
    h3: "Add your vehicles",
    body: "Get an instant view of what is valid, due and expired.",
    mock: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <MockRow tone="neutral" left="Paste plate numbers or upload a CSV" />
      </div>
    ),
  },
  {
    kicker: "Step three",
    h3: "Renew and verify",
    body: "Confirm your business when you pay, then renew in bulk.",
    mock: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <MockRow tone="neutral" left="Business check" right={<Pill tone="warn">At first payment</Pill>} />
        <MockRow tone="ok" left="Renewals paid" right={<Pill tone="ok">Verified</Pill>} />
      </div>
    ),
  },
];

function StepsSection() {
  return (
    <Section id="steps">
      <h2 style={H2}>Get your fleet up and running in minutes</h2>
      <p style={LEAD}>No long forms. We verify your business when you first pay, not before.</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {STEPS.map(function (s) {
          return (
            <article key={s.h3} style={{ backgroundColor: "#fff", border: "1px solid " + LINE, borderRadius: 28, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ backgroundColor: SOFT, padding: 28, display: "flex", flexDirection: "column", gap: 10 }}>{s.mock}</div>
              <div style={{ padding: "28px 32px 32px" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: BLUE, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.kicker}</span>
                <h3 style={{ ...H3, marginTop: 6 }}>{s.h3}</h3>
                <p style={{ margin: "0 0 16px", fontSize: 16, lineHeight: 1.6, color: MUTED }}>{s.body}</p>
                <Link to="/auth/signup" style={{ fontWeight: 700, color: BLUE }}>Create account</Link>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

const COMPARE_ROWS = [
  { label: "Fleet-wide expiry alerts", motoka: "Yes", cash: "No", sheets: "Manual" },
  { label: "Bulk renewals", motoka: "Yes", cash: "Slow", sheets: "No" },
  { label: "Checked against agency records", motoka: "Yes", cash: "No", sheets: "No" },
  { label: "Itemised invoices and audit trail", motoka: "Yes", cash: "No", sheets: "Manual" },
  { label: "Driver access at checkpoints", motoka: "Yes", cash: "No", sheets: "No" },
];

function CompareSection() {
  return (
    <Section id="compare">
      <h2 style={H2}>How Motoka compares</h2>
      <p style={LEAD}>A clearer way to run fleet compliance than cash agents or spreadsheets.</p>
      <div style={{ backgroundColor: "#fff", border: "1px solid " + LINE, borderRadius: 28, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", borderBottom: "1px solid " + LINE, fontWeight: 700, color: INK }}>
          <div style={{ padding: 18 }}></div>
          <div style={{ padding: 18, textAlign: "center", backgroundColor: SOFT }}>Motoka</div>
          <div style={{ padding: 18, textAlign: "center" }}>Cash agents</div>
          <div style={{ padding: 18, textAlign: "center" }}>Spreadsheets</div>
        </div>
        {COMPARE_ROWS.map(function (r) {
          return (
            <div key={r.label} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", borderBottom: "1px solid " + LINE }}>
              <div style={{ padding: 18, fontWeight: 700, color: INK }}>{r.label}</div>
              <div style={{ padding: 18, textAlign: "center", backgroundColor: SOFT, fontWeight: 800, color: INK }}>{r.motoka}</div>
              <div style={{ padding: 18, textAlign: "center", color: MUTED }}>{r.cash}</div>
              <div style={{ padding: 18, textAlign: "center", color: MUTED }}>{r.sheets}</div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function SecuritySection() {
  return (
    <Section bg="#fff">
      <h2 style={H2}>Built for trust, backed by security</h2>
      <p style={LEAD}>Fleet records are company records. We treat them that way.</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <article style={{ backgroundColor: "#fff", border: "1px solid " + LINE, borderRadius: 28, overflow: "hidden" }}>
          <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 10, backgroundColor: SOFT }}>
            <MockRow tone="ok" left="Verified against agency records" right={<Pill tone="ok">Match</Pill>} />
            <MockRow tone="ok" left="MVAA certified" right="Yes" />
          </div>
          <div style={{ padding: "28px 32px 32px" }}>
            <h3 style={H3}>Verified, not just printed</h3>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: MUTED }}>Every renewal is checked against the issuing agency&apos;s own records before it is marked complete.</p>
          </div>
        </article>
        <article style={{ backgroundColor: "#fff", border: "1px solid " + LINE, borderRadius: 28, overflow: "hidden" }}>
          <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 10, backgroundColor: SOFT }}>
            <MockRow tone="ok" left="Two-factor sign-in" right={<Pill tone="ok">On</Pill>} />
            <MockRow tone="neutral" left="Signed-in devices" right="2" />
          </div>
          <div style={{ padding: "28px 32px 32px" }}>
            <h3 style={H3}>Access you control</h3>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: MUTED }}>Two-factor sign-in, role-based access and a full log of every action.</p>
          </div>
        </article>
      </div>
    </Section>
  );
}

function QuotesSection() {
  const quotes = [
    { quote: "We stopped finding out about expired documents from impoundment letters. Our drivers now check in two taps and we renew before it ever gets there.", name: "Fleet Manager", role: "Haulage fleet, Lagos" },
    { quote: "Bulk renewals used to live in one WhatsApp thread and a prayer. Now it is one itemised bill and it is done.", name: "Owner", role: "Ride-hail fleet, Abuja" },
  ];
  return (
    <Section bg="#fff">
      <h2 style={H2}>Trusted by fleets across Nigeria</h2>
      <p style={LEAD}>Fleet operators who run vehicles every day trust Motoka with the paperwork that keeps them moving.</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {quotes.map(function (q) {
          return (
            <article key={q.name + q.role} style={{ backgroundColor: "#fff", border: "1px solid " + LINE, borderRadius: 28, padding: 32 }}>
              <div style={{ fontSize: 40, lineHeight: 1, color: BLUE, marginBottom: 12 }}>&ldquo;</div>
              <p style={{ margin: "0 0 20px", fontSize: 18, lineHeight: 1.55, color: INK }}>{q.quote}</p>
              <b style={{ color: INK }}>{q.name}</b>
              <span style={{ display: "block", marginTop: 4, fontSize: 14, color: MUTED }}>{q.role}</span>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

function FaqSection() {
  const faqs = [
    { q: "Can I start without business documents?", a: "Yes. Add vehicles and see your fleet snapshot straight away. We verify your business when you make your first payment." },
    { q: "How are documents verified?", a: "Each renewal is checked against the issuing agency's own records before it is marked complete." },
    { q: "Is there a monthly fee?", a: "There is no Motoka monthly fee. Government fees are passed through at cost and itemised before you pay." },
    { q: "How long does a renewal take?", a: "Turnaround depends on the document and the issuing state, usually 5-10 working days. You can follow live status in the app." },
    { q: "Can drivers see documents without seeing payments?", a: "Yes. Drivers only see the documents for their assigned vehicle." },
  ];
  return (
    <Section id="faq">
      <h2 style={{ ...H2, marginBottom: 28 }}>Frequently asked questions</h2>
      <div style={{ maxWidth: 820 }}>
        {faqs.map(function (item) {
          return (
            <details key={item.q} style={{ border: "1px solid " + LINE, borderRadius: 16, padding: "18px 20px", marginBottom: 12, backgroundColor: "#fff" }}>
              <summary style={{ fontWeight: 700, color: INK, cursor: "pointer" }}>{item.q}</summary>
              <p style={{ margin: "12px 0 0", color: MUTED }}>{item.a}</p>
            </details>
          );
        })}
      </div>
    </Section>
  );
}

function CtaSection() {
  return (
    <Section bg="#fff">
      <div style={{ backgroundColor: "#0B1F3A", backgroundImage: "radial-gradient(500px 260px at 50% 0%, rgba(35,137,227,.32), transparent 70%)", borderRadius: 36, padding: "72px 40px", textAlign: "center" }}>
        <h2 style={{ margin: "0 auto 24px", maxWidth: 720, color: "#fff", fontSize: "clamp(30px, 3.6vw, 40px)", lineHeight: 1.12, letterSpacing: "-0.02em", fontWeight: 800 }}>Join fleets keeping every vehicle road-legal</h2>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/auth/signup" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", backgroundColor: SKY, color: NAVY, fontWeight: 700, fontSize: 16, lineHeight: 1, padding: "15px 26px", borderRadius: 999, border: "1px solid transparent" }}>Create account</Link>
          <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff", color: NAVY, fontWeight: 700, fontSize: 16, lineHeight: 1, padding: "15px 26px", borderRadius: 999, border: "1px solid transparent" }}>Talk to sales</Link>
        </div>
      </div>
    </Section>
  );
}

export default function BusinessLanding() {
  return (
    <>
      <Seo
        title="Motoka for Fleets — Fleet compliance, renewals and documents"
        description="Track every licence, insurance and roadworthiness date across your fleet. Renew in bulk, keep verified documents in one place, and get expiry alerts that escalate."
        path="/for-fleets"
      />
      <Hero />
      <FeaturesSection />
      <HowYouWorkSection />
      <StepsSection />
      <CompareSection />
      <SecuritySection />
      <QuotesSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
