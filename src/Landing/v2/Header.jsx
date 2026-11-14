import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logoMark from '../../assets/v2/logo-mark.svg'
import businessLogo from '../../assets/business/business-logo.png'
import { useIsAuthenticated } from '../../utils/authStorage'

// The prototype shipped these as inert labels. Pointed at the routes the
// previous landing header used, so the redesign is not a dead end.
// `match` lists the path prefixes that should light an item. Items without one
// are same-page anchors: they scroll the homepage rather than navigate, so they
// have no route of their own to be "on" and never take the active stroke.
const NAV_LINKS = [
  { label: 'Home', to: '/#top', match: ['/'], exact: true },
  { label: 'About', to: '/about', match: ['/about'] },
  // Money-page hub: descriptive internal link (and stays lit on renew/state pages).
  { label: 'Renew', to: '/renew/vehicle-license', match: ['/renew', '/states'] },
  // The index lives at /blogs but posts at /blog/:slug, so Blog needs both
  // prefixes to stay lit while reading a post.
  { label: 'Blog', to: '/blogs', match: ['/blogs', '/blog'] },
  { label: 'Ladipo', to: '/ladipo', match: ['/ladipo'] },
]

function isActive(link, pathname) {
  if (!link.match) return false
  return link.match.some((base) =>
    link.exact ? pathname === base : pathname === base || pathname.startsWith(`${base}/`)
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isAuth = useIsAuthenticated()
  // The fleet landing carries the business mark; every other marketing page
  // keeps the consumer Motoka mark.
  const isBusinessLanding = pathname === '/for-fleets' || pathname.startsWith('/for-fleets/')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isBusinessLanding) {
      setScrolled(false)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isBusinessLanding])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  return (
    <>
      <style>{`
        @keyframes bizHeaderIn { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: none; } }
        .biz-header-anim { animation: bizHeaderIn .6s cubic-bezier(.2,.7,.2,1) both; }
        .biz-nav-link { transition: color .2s ease, transform .2s ease, opacity .2s ease; }
        .biz-nav-link:hover { transform: translateY(-1px); opacity: 1; }
        .biz-btn { transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease, opacity .2s ease; }
        .biz-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -8px rgba(0,0,0,.4); }
        .biz-btn:active { transform: translateY(0); }
      `}</style>
      <div className={isBusinessLanding ? `sticky top-0 z-[70] transition-colors duration-300 biz-header-anim ${scrolled ? 'bg-[#0A1F3A]/90 backdrop-blur-md' : 'bg-transparent'}` : 'bg-white sticky top-0 z-[70]'}>
        <div
          className="flex h-[63px] items-center justify-between w-full"
          style={{ paddingLeft: 'var(--landing-gutter, 40px)', paddingRight: 'var(--landing-gutter, 40px)' }}
        >
        <div className="flex gap-[47px] items-center">
          <Link
            to={isBusinessLanding ? '/for-fleets' : '/#top'}
            aria-label={isBusinessLanding ? 'Motoka Business home' : 'Motoka home'}
            className="inline-grid place-items-start"
            style={{ gridTemplateColumns: 'max-content', gridTemplateRows: 'max-content', lineHeight: 0 }}
          >
            <img
              src={isBusinessLanding ? businessLogo : logoMark}
              alt=""
              style={{
                width: isBusinessLanding ? 40 : 27.6,
                height: isBusinessLanding ? 40 : 30.9,
                gridColumn: 1,
                gridRow: 1,
                borderRadius: isBusinessLanding ? 8 : 0,
              }}
            />
            <span
              style={{
                gridColumn: 1,
                gridRow: 1,
                marginLeft: isBusinessLanding ? 52.07 : 44.07,
                marginTop: isBusinessLanding ? 3.92 : 1.508,
                fontWeight: 500,
                fontSize: 20.894,
                lineHeight: '32.163px',
                color: isBusinessLanding ? '#fff' : '#05243f',
                whiteSpace: 'nowrap',
              }}
            >
              Motoka
            </span>
          </Link>

          <div className="hidden lg:flex gap-[16px] items-stretch justify-center h-[63px]">
            {NAV_LINKS.map((l) => {
              const active = isActive(l, pathname)
              return (
                // The stroke sits on the link, which spans the full height of
                // the bar, so it lands flush on the container's bottom edge
                // rather than floating under the label. Border-box keeps the
                // 2px inside the 63px, so the bar height is unchanged.
                <Link
                  key={l.label}
                  to={l.to}
                  aria-current={active ? 'page' : undefined}
                  className={`group flex items-center justify-center px-[16px] h-full border-b-2 cursor-pointer transition-colors duration-200 ${
                    active
                      ? 'border-[#2389e3]'
                      : 'border-transparent hover:border-[#697c8c]'
                  }`}
                >
                  <span
                    className={`biz-nav-link text-[14px] leading-normal whitespace-nowrap transition-colors duration-200 ${
                      active
                        ? isBusinessLanding ? 'font-medium text-white' : 'font-medium text-[#05243f]'
                        : isBusinessLanding ? 'font-normal text-white/75 hover:text-white' : 'font-normal text-[#697c8c]'
                    }`}
                  >
                    {l.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="hidden lg:flex gap-[20px] items-center justify-end">
          {isAuth ? (
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="bg-[#2389e3] hover:bg-[#1a74c3] text-white flex h-[38px] items-center justify-center px-[22px] rounded-[90px] font-semibold text-[14px] cursor-pointer transition-colors shadow-xs"
            >
              Dashboard
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate('/auth/login')}
                className={`font-medium ${isBusinessLanding ? 'text-white/90 hover:text-white biz-btn' : 'text-[#2389e3]'} text-[14px] leading-normal whitespace-nowrap cursor-pointer transition-opacity hover:opacity-75`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => navigate('/auth/signup')}
                className="bg-[#f4faff] border border-[#2389e3] flex h-[38px] items-center justify-center overflow-clip px-[24px] py-[14px] rounded-[90px] w-[92px] cursor-pointer transition-colors hover:bg-[#e4f1ff]"
              >
                <span className={`font-medium ${isBusinessLanding ? 'text-[#0A1F3A]' : 'text-[#2389e3]'} text-[14px] leading-normal whitespace-nowrap`}>
                  Register
                </span>
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="lg:hidden flex items-center justify-center rounded-full transition-colors hover:bg-[#f4faff]"
          style={{ width: 40, height: 40, color: '#05243f' }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className="lg:hidden fixed inset-0 z-[60]"
        style={{
          background: 'rgba(5,36,63,0.45)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 250ms ease',
        }}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="lg:hidden fixed top-0 right-0 h-full bg-white flex flex-col z-[61]"
        style={{
          width: 'min(80vw, 320px)',
          boxShadow: '-8px 0 32px -8px rgba(5,36,63,0.25)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 280ms ease',
        }}
      >
        <div className="flex items-center justify-between" style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <span style={{ fontWeight: 600, fontSize: 16, color: '#05243f' }}>Menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center rounded-full transition-colors hover:bg-[#f4faff]"
            style={{ width: 36, height: 36, color: '#05243f' }}
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col" style={{ padding: '12px 20px', gap: 4 }}>
          {NAV_LINKS.map((l) => {
            const active = isActive(l, pathname)
            return (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`text-[15px] rounded-lg transition-colors hover:bg-[#f4faff] ${
                  active ? 'font-semibold text-[#05243f]' : 'font-normal text-[#697c8c]'
                }`}
                style={{ padding: '10px 12px', margin: '0 -12px' }}
              >
                {l.label}
              </Link>
            )
          })}
          <div className="flex flex-col" style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #e2e8f0', gap: 12 }}>
            {isAuth ? (
              <button
                type="button"
                onClick={() => { setOpen(false); navigate('/dashboard') }}
                className="bg-[#2389e3] text-white flex items-center justify-center w-full transition-colors hover:bg-[#1a74c3] font-semibold text-[14px]"
                style={{ height: 44, borderRadius: 90 }}
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => { setOpen(false); navigate('/auth/signup') }}
                  className="bg-[#f4faff] border border-[#2389e3] flex items-center justify-center w-full transition-colors hover:bg-[#e4f1ff]"
                  style={{ height: 44, borderRadius: 90 }}
                >
                  <span className="font-semibold text-[#2389e3] text-[14px] whitespace-nowrap">Register</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setOpen(false); navigate('/auth/login') }}
                  className="flex items-center justify-center w-full rounded-full transition-colors hover:bg-[#f4faff]"
                  style={{ height: 44 }}
                >
                  <span className="font-semibold text-[#2389e3] text-[14px] whitespace-nowrap">Login</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
