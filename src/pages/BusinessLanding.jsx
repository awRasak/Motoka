import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import useV2Chrome from '../Landing/v2/useV2Chrome';
import '../business/landing.css';
import heroImage from '../assets/business/hero-image.jpg';

// The approved mockup (motoka business/preview/fleet-landing.html) is the source
// of truth for this page. Its body markup is injected verbatim so the design
// stays pixel-identical; only the CTAs and the two small interactions (scroll
// header, audience menu) are wired up in React.
const RAW_BODY = `<header class="site-header">
  <div class="w header-inner">
    <div class="brand">
      <a class="brand" href="#top">
        <span class="brand-mark" aria-hidden="true">M</span>
        <span class="brand-name">Motoka</span>
      </a>
      <div class="brand-menu">
        <button class="brand-badge brand-pill" id="audienceMenuBtn" type="button" aria-haspopup="menu" aria-expanded="false">
          <span>Business</span>
          <svg class="brand-chev" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
        </button>
        <div class="brand-menu-list" id="audienceMenuList" role="menu">
          <a href="#business" role="menuitem">Business</a>
          <a href="#personal" role="menuitem">Personal</a>
        </div>
      </div>
    </div>
    <nav class="site-nav" aria-label="Sections">
      <a href="#features">Features</a>
      <a href="#steps">How it works</a>
      <a href="#compare">Compare</a>
      <a href="#faq">FAQ</a>
    </nav>
    <div class="header-actions">
      <!-- Wire to /auth/login when this moves into the app -->
      <a class="login-link" href="#login">Log in</a>
      <!-- Wire to /auth/signup when this moves into the app -->
      <a class="btn" href="#register">Create account</a>
    </div>
  </div>
</header>

<main id="top">

  <section class="hero">
    <div class="w hero-inner">
      <div class="hero-copy">

      <h1>Modern compliance for fleets that never stop moving</h1>
      <p class="hero-lead">Track every licence, insurance and roadworthiness date across your fleet. Renew in bulk and keep verified documents in one place.</p>

      <div class="hero-actions">
        <a class="btn3" href="#register">Create account</a>
        <a class="btn2" href="#demo">Talk to sales</a>
      </div>
      <p class="hero-note">Motoka is a service provider, not a government agency.</p>
      </div>

      <div class="overview-card" aria-label="Sample fleet overview">
        <div class="overview-head">
          <b>Fleet overview</b>
          <span class="pill pill-neutral">Sample view</span>
        </div>
        <div class="overview-stats">
          <div class="stat stat-ok"><strong>42</strong><span>Compliant</span></div>
          <div class="stat stat-warn"><strong>6</strong><span>Expiring soon</span></div>
          <div class="stat stat-bad"><strong>3</strong><span>Expired</span></div>
          <div class="stat stat-info"><strong>₦1.24M</strong><span>Due this month</span></div>
        </div>
        <div class="overview-rows">
          <div class="row"><b>LSD-482-XY</b><span>Roadworthiness</span><span class="pill er">Expired</span></div>
          <div class="row"><b>KJA-119-AA</b><span>Vehicle licence</span><span class="pill wn">Due in 12 days</span></div>
          <div class="row"><b>EKY-733-KJ</b><span>Insurance</span><span class="pill ok">Valid</span></div>
        </div>
      </div>
    </div>
  </section>

  <section id="features" class="section section-white">
    <div class="w">
      <h2 class="h2">Fleet paperwork shouldn't be that complicated</h2>
      <p class="lead">Everything you need to keep every vehicle legal, from one account.</p>

      <div class="g2">
        <article class="card">
          <div class="mock">
            <div class="row" style="background:#FDF3C7">
              <span><b>LSD-482-XY</b></span>
              <span class="pill wn">Due soon</span>
            </div>
            <div class="row" style="background:#F9E8E7">
              <span><b>KJA-119-AA</b></span>
              <span class="pill er">Expired</span>
            </div>
            <div class="row" style="background:#DBFBE5">
              <span><b>EKY-733-KJ</b></span>
              <span class="pill ok">Valid</span>
            </div>
          </div>
          <div class="body">
            <h3>Bulk renewals</h3>
            <p>Upload a CSV or pick vehicles, review one itemised bill and pay once.</p>
            <a href="#register">Create account</a>
          </div>
        </article>

        <article class="card">
          <div class="mock">
            <div class="row" style="background:#FDF3C7"><span>Roadworthiness</span><span class="pill wn">Renewing</span></div>
            <div class="row" style="background:#DBFBE5"><span>Vehicle licence</span><span class="pill ok">Verified</span></div>
            <div class="row" style="background:#DBFBE5"><span>Insurance</span><span class="pill ok">Verified</span></div>
          </div>
          <div class="body">
            <h3>Fleet document wallet</h3>
            <p>Every document for every vehicle, checked against agency records and stored encrypted.</p>
            <a href="#register">Create account</a>
          </div>
        </article>

        <article class="card">
          <div class="mock">
            <div class="row" style="background:var(--soft)"><span>90 days before</span><b>Email</b></div>
            <div class="row" style="background:var(--soft)"><span>30 days before</span><b>SMS, WhatsApp</b></div>
            <div class="row" style="background:var(--soft)"><span>7 days before</span><b>Escalate to admin</b></div>
          </div>
          <div class="body">
            <h3>Expiry alerts that escalate</h3>
            <p>Set the intervals once. If nothing is renewed in time, your admin hears about it.</p>
            <a href="#register">Create account</a>
          </div>
        </article>

        <article class="card">
          <div class="mock">
            <div class="row" style="background:var(--soft)"><span>Ada asked to renew 4 vehicles</span></div>
            <div class="row" style="background:#DBFBE5"><span>Approver: Tunde</span><span class="pill ok">Approve</span></div>
          </div>
          <div class="body">
            <h3>Roles and approvals</h3>
            <p>Managers request, finance approves, drivers view. Every action is logged.</p>
            <a href="#register">Create account</a>
          </div>
        </article>

        <article class="card">
          <div class="mock">
            <div class="row" style="flex-direction:column;align-items:flex-start;background:#DBFBE5">
              <b style="font-size:18px">EKY-733-KJ</b>
              <span class="pill ok pill-icon"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/></svg>Licence valid</span>
              <span class="pill ok pill-icon"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/></svg>Insurance valid</span>
              <span class="pill ok pill-icon"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/></svg>Roadworthy</span>
            </div>
          </div>
          <div class="body">
            <h3>Driver checkpoint mode</h3>
            <p>Valid documents one tap away on the driver's phone, even offline.</p>
            <a href="#register">Create account</a>
          </div>
        </article>

        <article class="card">
          <div class="mock">
            <div style="display:flex;align-items:flex-end;gap:10px;height:120px;width:100%">
              <div style="flex:1;height:40%;border-radius:6px;background:var(--sky-soft)"></div>
              <div style="flex:1;height:70%;border-radius:6px;background:var(--sky-soft)"></div>
              <div style="flex:1;height:55%;border-radius:6px;background:var(--sky-soft)"></div>
              <div style="flex:1;height:90%;border-radius:6px;background:var(--sky)"></div>
              <div style="flex:1;height:65%;border-radius:6px;background:var(--sky-soft)"></div>
            </div>
            <span style="font-size:13px;color:var(--muted)">Sample spend by branch</span>
          </div>
          <div class="body">
            <h3>Reports and audit log</h3>
            <p>Spend by vehicle or branch, invoices for finance and a record of who did what.</p>
            <a href="#register">Create account</a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section section-white">
    <div class="w">
      <div class="panel">
        <h2 class="h2">Built for how you work</h2>
        <p class="lead">The same dashboard, shaped for the fleet you run.</p>

        <div class="g3">
          <article class="card">
            <div class="media">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="6" y="20" width="30" height="22" rx="2"/>
                <path d="M36 28h10l8 8v6h-8"/>
                <circle cx="16" cy="46" r="5"/>
                <circle cx="46" cy="46" r="5"/>
                <path d="M21 46h20"/>
              </svg>
              <span class="media-label">Logistics</span>
            </div>
            <div class="body">
              <h3>Logistics and haulage</h3>
              <p>Keep trucks and vans moving and stop impoundments before they happen.</p>
            </div>
          </article>

          <article class="card">
            <div class="media">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M8 38l4-10a6 6 0 0 1 5.6-4h22.8A6 6 0 0 1 46 28l4 10"/>
                <rect x="6" y="36" width="46" height="10" rx="4"/>
                <circle cx="18" cy="46" r="4"/>
                <circle cx="40" cy="46" r="4"/>
              </svg>
              <span class="media-label">Ride-hail</span>
            </div>
            <div class="body">
              <h3>Ride-hail and hackney owners</h3>
              <p>Manage permits, licences and insurance for every car and driver you run.</p>
            </div>
          </article>

          <article class="card">
            <div class="media">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="12" y="10" width="40" height="42" rx="2"/>
                <path d="M24 22h4M36 22h4M24 32h4M36 32h4M24 42h4M36 42h4"/>
                <path d="M28 52V42h8v10"/>
              </svg>
              <span class="media-label">Corporate</span>
            </div>
            <div class="body">
              <h3>Corporate vehicle pools</h3>
              <p>Give admin and finance a clean trail for every renewal and payment.</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section id="steps" class="section">
    <div class="w">
      <h2 class="h2">Get your fleet up and running in minutes</h2>
      <p class="lead">No long forms. We verify your business when you first pay, not before.</p>

      <div class="g3">
        <article class="card">
          <div class="mock">
            <div class="row" style="color:var(--muted)">Full name</div>
            <div class="row" style="color:var(--muted)">Phone or email</div>
            <span class="btn">Continue</span>
          </div>
          <div class="body">
            <span class="kicker">Step one</span>
            <h3>Create your account</h3>
            <p>Your name and a phone number or email. That is all.</p>
          </div>
        </article>

        <article class="card">
          <div class="mock">
            <div class="row" style="color:var(--muted);min-height:64px;align-items:flex-start">Paste plate numbers or upload a CSV</div>
            <span class="btn">See my fleet</span>
          </div>
          <div class="body">
            <span class="kicker">Step two</span>
            <h3>Add your vehicles</h3>
            <p>Get an instant view of what is valid, due and expired.</p>
          </div>
        </article>

        <article class="card">
          <div class="mock">
            <div class="row"><span>Business check</span><span class="pill wn">At first payment</span></div>
            <div class="row"><span>Renewals paid</span><span class="pill ok">Verified</span></div>
          </div>
          <div class="body">
            <span class="kicker">Step three</span>
            <h3>Renew and verify</h3>
            <p>Confirm your business when you pay, then renew in bulk.</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section id="compare" class="section">
    <div class="w">
      <h2 class="h2">How Motoka compares</h2>
      <p class="lead">A clearer way to run fleet compliance than cash agents or spreadsheets.</p>

      <div class="compare-wrap">
        <div class="card compare">
          <div class="cmp"><span></span><span class="me">Motoka</span><span>Cash agents</span><span>Spreadsheets</span></div>
          <div class="cmp"><span>Fleet-wide expiry alerts</span><span class="me"><b class="pill ok">Yes</b></span><span><b class="pill er">No</b></span><span><b class="pill wn">Manual</b></span></div>
          <div class="cmp"><span>Bulk renewals</span><span class="me"><b class="pill ok">Yes</b></span><span><b class="pill wn">Slow</b></span><span><b class="pill er">No</b></span></div>
          <div class="cmp"><span>Checked against agency records</span><span class="me"><b class="pill ok">Yes</b></span><span><b class="pill er">No</b></span><span><b class="pill er">No</b></span></div>
          <div class="cmp"><span>Itemised invoices and audit trail</span><span class="me"><b class="pill ok">Yes</b></span><span><b class="pill er">No</b></span><span><b class="pill wn">Manual</b></span></div>
          <div class="cmp"><span>Driver access at checkpoints</span><span class="me"><b class="pill ok">Yes</b></span><span><b class="pill er">No</b></span><span><b class="pill er">No</b></span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="w">
      <h2 class="h2">Built for trust, backed by security</h2>
      <p class="lead">Fleet records are company records. We treat them that way.</p>

      <div class="g2">
        <article class="card">
          <div class="mock">
            <div class="row"><span>Verified against agency records</span><span class="pill ok">Match</span></div>
            <div class="row"><span>MVAA certified</span><span class="pill ok">Yes</span></div>
          </div>
          <div class="body">
            <h3>Verified, not just printed</h3>
            <p>Every renewal is checked against the issuing agency's own records before it is marked complete.</p>
          </div>
        </article>

        <article class="card">
          <div class="mock">
            <div class="row"><span>Two-factor sign-in</span><span class="pill ok">On</span></div>
            <div class="row"><span>Signed-in devices</span><b>2</b></div>
          </div>
          <div class="body">
            <h3>Access you control</h3>
            <p>Two-factor sign-in, role-based access and a full log of every action.</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="w">
      <h2 class="h2">Trusted by fleets across Nigeria</h2>
      <p class="lead">[REAL CUSTOMER QUOTES GO HERE]</p>

      <div class="g2">
        <article class="card quote-card">
          <div class="quote-mark" aria-hidden="true">&ldquo;</div>
          <p>[QUOTE]</p>
          <b>[NAME]</b>
          <span>[ROLE], [COMPANY]</span>
        </article>
        <article class="card quote-card">
          <div class="quote-mark" aria-hidden="true">&ldquo;</div>
          <p>[QUOTE]</p>
          <b>[NAME]</b>
          <span>[ROLE], [COMPANY]</span>
        </article>
      </div>
    </div>
  </section>

  <section id="faq" class="section">
    <div class="w faq">
      <h2 class="h2" style="margin-bottom:28px">Frequently asked questions</h2>

      <details>
        <summary>Can I start without business documents?</summary>
        <p>Yes. Add vehicles and see your fleet snapshot straight away. We verify your business when you make your first payment.</p>
      </details>
      <details>
        <summary>How are documents verified?</summary>
        <p>Each renewal is checked against the issuing agency's own records before it appears in your wallet.</p>
      </details>
      <details>
        <summary>Is there a monthly fee?</summary>
        <p>[PRICING MODEL]. Government fees are passed through at cost and itemised before you pay.</p>
      </details>
      <details>
        <summary>How long does a renewal take?</summary>
        <p>[TURNAROUND BY DOCUMENT AND STATE]. You can follow live status in the app.</p>
      </details>
      <details>
        <summary>Can drivers see documents without seeing payments?</summary>
        <p>Yes. Drivers only see the documents for their assigned vehicle.</p>
      </details>
    </div>
  </section>

  <section class="section section-last">
    <div class="w">
      <div class="cta">
        <h2>Join fleets keeping every vehicle road-legal</h2>
        <div class="cta-actions">
          <a class="btn" href="#register">Create account</a>
          <a class="btn2" href="#demo">Talk to sales</a>
        </div>
      </div>
    </div>
  </section>

</main>

<footer class="site-footer">
  <div class="w footer-inner">
    <div class="footer-brand">
      <b>Motoka</b>
      <p>Fleet compliance, renewals and document storage in one place.</p>
      <a href="mailto:support@motoka.com">support@motoka.com</a>
    </div>
    <div class="footer-col">
      <b>Legal</b>
      <a href="#terms">Terms of service</a>
      <a href="#privacy">Privacy policy</a>
    </div>
    <div class="footer-col">
      <b>Support</b>
      <a href="#help">Help centre</a>
      <a href="#faq">FAQ</a>
    </div>
    <div class="footer-legal">
      Motoka is a service provider, not a government agency. Company registration details and regulatory notices will appear here.
    </div>
  </div>
</footer>`;

function wire(html) {
  const heroImg = `<div class="hero-image-wrap"><img src="${heroImage}" alt="Motoka Business dashboard preview" class="hero-image"></div>`;
  html = html.replace(/<div class="overview-card"[\s\S]*?<\/div>\n(?=\s*<\/div>\n\s*<\/section>)/, heroImg);
  return html
    .replace(/href="#register"/g, 'href="/business/signup"')
    .replace(/href="#login"/g, 'href="/business/login"')
    .replace(/href="#demo"/g, 'href="/contact"')
    .replace(/href="#top"/g, 'href="#top"')
    .replace(/href="#business"/g, 'href="/for-fleets"')
    .replace(/href="#personal"/g, 'href="/"')
    .replace(/href="#terms"/g, 'href="/terms"')
    .replace(/href="#privacy"/g, 'href="/privacy"')
    .replace(/href="#help"/g, 'href="/help"')
    .replace(/href="#faq"/g, 'href="#faq"');
}

export default function BusinessLanding() {
  useV2Chrome();
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const header = root.querySelector('.site-header');
    const hero = root.querySelector('.hero');
    const update = () => {
      if (!header || !hero) return;
      const threshold = hero.offsetHeight - header.offsetHeight;
      header.classList.toggle('is-scrolled', window.scrollY >= threshold);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    // Brand menu (Business / Personal)
    const menu = root.querySelector('.brand-menu');
    const btn = root.querySelector('#audienceMenuBtn');
    const list = root.querySelector('#audienceMenuList');
    const toggle = (e) => {
      if (e) e.stopPropagation();
      if (!menu || !btn) return;
      const open = menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    const close = (e) => {
      if (menu && !menu.contains(e.target)) menu.classList.remove('is-open');
    };
    if (btn) btn.addEventListener('click', toggle);
    if (list) list.addEventListener('click', () => menu && menu.classList.remove('is-open'));
    document.addEventListener('click', close);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      if (btn) btn.removeEventListener('click', toggle);
      document.removeEventListener('click', close);
    };
  }, []);

  return (
    <>
      <Seo
        title="Motoka for Fleets — Fleet compliance, renewals and documents"
        description="Track every licence, insurance and roadworthiness date across your fleet. Renew in bulk, keep verified documents in one place, and get expiry alerts that escalate."
        path="/for-fleets"
      />
      <div className="biz-landing" ref={ref} dangerouslySetInnerHTML={{ __html: wire(RAW_BODY) }} />
    </>
  );
}
