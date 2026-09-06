import { useEffect, useState, useRef, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, User, BookOpen, LogOut } from 'lucide-react'
import logoMark from '../assets/v2/logo-mark.svg'

function isActive(link, pathname) {
  const base = link.match ?? link.to
  if (link.exact) return pathname === base
  return pathname === base || pathname.startsWith(`${base}/`)
}

export default function Header({ isLoggedIn = false }) {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { pathname } = useLocation()
  const profileRef = useRef(null)

  const NAV_LINKS = useMemo(() => [
    { label: 'Home', to: '/', exact: true },
    { label: 'About', to: '/about' },
    { label: 'Service', to: '/renew/vehicle-license', match: '/renew' },
    { label: 'Blog', to: '/blog' },
    { label: 'FAQ', to: isLoggedIn ? '/app/faq' : '/faq' },
  ], [isLoggedIn])

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

  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <div className="bg-white sticky top-0 z-[70]">
      <div
        className="flex h-[63px] items-center justify-between w-full"
        style={{ paddingLeft: 'clamp(20px, 7.9vw, 114px)', paddingRight: 'clamp(20px, 7.9vw, 114px)' }}
      >
        <div className="flex gap-[47px] items-center">
          <Link
            to="/"
            className="inline-grid place-items-start"
            style={{ gridTemplateColumns: 'max-content', gridTemplateRows: 'max-content', lineHeight: 0 }}
          >
            <img src={logoMark} alt="" style={{ width: 27.6, height: 30.9, gridColumn: 1, gridRow: 1 }} />
            <span
              style={{
                gridColumn: 1,
                gridRow: 1,
                marginLeft: 44.07,
                marginTop: 1.508,
                fontWeight: 600,
                fontSize: 20.894,
                lineHeight: '32.163px',
                color: '#05243f',
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
                    className={`text-[14px] leading-normal whitespace-nowrap transition-colors duration-200 ${
                      active ? 'font-medium text-[#05243f]' : 'font-normal text-[#697c8c]'
                    }`}
                  >
                    {l.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Desktop right side */}
        <div className="hidden lg:flex gap-[24px] items-center justify-end" ref={profileRef}>
          {isLoggedIn ? (
            /* Profile dropdown — logged in */
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-75"
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#f4faff',
                    border: '1px solid #2389e3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2389e3',
                  }}
                >
                  <User size={18} />
                </div>
                <ChevronDown
                  size={14}
                  style={{
                    color: '#64748b',
                    transition: 'transform 0.2s',
                    transform: profileOpen ? 'rotate(180deg)' : 'rotate(0)',
                  }}
                />
              </button>

              {profileOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: 200,
                    background: '#fff',
                    borderRadius: 16,
                    boxShadow: '0 4px 24px rgba(5,36,63,0.12)',
                    padding: 8,
                    zIndex: 50,
                  }}
                >
                  <Link
                    to="/traffic-rules"
                    onClick={() => setProfileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 12px',
                      borderRadius: 10,
                      textDecoration: 'none',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#05243f',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f4faff'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <BookOpen size={16} style={{ color: '#2389e3' }} />
                    Traffic Rules
                  </Link>
                  <Link
                    to="/wallet"
                    onClick={() => setProfileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 12px',
                      borderRadius: 10,
                      textDecoration: 'none',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#05243f',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f4faff'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <User size={16} style={{ color: '#64748b' }} />
                    Wallet
                  </Link>
                  <div style={{ height: 1, background: '#e2e8f0', margin: '4px 0' }} />
                  <button
                    type="button"
                    onClick={() => setProfileOpen(false)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 12px',
                      borderRadius: 10,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#ef4444',
                      fontFamily: 'inherit',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Login / Register — logged out */
            <>
              <span className="font-semibold text-[#2389e3] text-[14px] leading-normal whitespace-nowrap cursor-pointer transition-opacity hover:opacity-75">
                Login
              </span>
              <div className="bg-[#f4faff] border border-[#2389e3] flex h-[38px] items-center justify-center overflow-clip px-[24px] py-[14px] rounded-[90px] w-[92px] cursor-pointer transition-colors hover:bg-[#e4f1ff]">
                <span className="font-semibold text-[#2389e3] text-[14px] leading-normal whitespace-nowrap">
                  Register
                </span>
              </div>
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

          {isLoggedIn && (
            <Link
              to="/traffic-rules"
              onClick={() => setOpen(false)}
              className="text-[15px] rounded-lg transition-colors hover:bg-[#f4faff] font-normal text-[#697c8c]"
              style={{ padding: '10px 12px', margin: '0 -12px', textDecoration: 'none' }}
            >
              Traffic Rules
            </Link>
          )}

          <div className="flex flex-col" style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #e2e8f0', gap: 12 }}>
            {isLoggedIn ? (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full rounded-full transition-colors hover:bg-[#f4faff]"
                style={{ height: 44, border: 'none', background: 'none', cursor: 'pointer' }}
              >
                <span className="font-semibold text-[#ef4444] text-[14px] whitespace-nowrap">Logout</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-[#f4faff] border border-[#2389e3] flex items-center justify-center w-full transition-colors hover:bg-[#e4f1ff]"
                  style={{ height: 44, borderRadius: 90 }}
                >
                  <span className="font-semibold text-[#2389e3] text-[14px] whitespace-nowrap">Register</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
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
  )
}
