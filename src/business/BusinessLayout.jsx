import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import BizIcon from './components/BizIcon.jsx';
import BizIconSprite from './components/BizIconSprite.jsx';
import BizSearchContext from './components/BizSearchContext.jsx';
import { BUSINESS, BUSINESS_NAV } from './routes.js';
import { FLEET } from './data/businessData.js';
import businessLogo from '../assets/business/business-logo.png';
import './business.css';

const ALERTS = [
  { tone: 'bad', title: 'LND-482XY roadworthiness expired', meta: 'Expired 12 Oct · renew to avoid a fine' },
  { tone: 'bad', title: 'BRT-094LM hackney permit expired', meta: 'Expired 2 Nov · 1 vehicle affected' },
  { tone: 'warn', title: '2 licences expiring this week', meta: 'APP-126GH and LSD-640KE' },
  { tone: 'warn', title: 'Fleet wallet is short by ₦434,500', meta: 'Covers 6 of 9 renewals due this month' },
];

export default function BusinessLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [alertsOpen, setAlertsOpen] = useState(false);
  const alertsRef = useRef(null);

  const searchValue = useMemo(() => ({ query, setQuery }), [query]);

  // The header search belongs to the page it sits above, so reset it when
  // the rail changes page (same behaviour as a fresh page load).
  useEffect(() => {
    setQuery('');
    setAlertsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!alertsOpen) return undefined;
    const onPointerDown = (event) => {
      if (alertsRef.current && !alertsRef.current.contains(event.target)) {
        setAlertsOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setAlertsOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [alertsOpen]);

  return (
    <div className="biz-app">
      <BizIconSprite />
      <div className="app">
        <nav className="rail" aria-label="Main">
          <Link className="rail-logo" to={BUSINESS.overview} aria-label="Motoka Business overview">
            <img src={businessLogo} alt="" aria-hidden="true" />
          </Link>
          {BUSINESS_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              data-label={item.label}
              aria-label={item.label}
              className={({ isActive }) => `rail-btn${isActive ? ' on' : ''}`}
            >
              <BizIcon name={item.icon} />
              {item.badge ? <span className="badge" /> : null}
            </NavLink>
          ))}
          <div className="rail-spacer" />
          <button
            type="button"
            className="rail-btn rail-extra"
            data-label="Settings"
            aria-label="Settings"
            onClick={() => toast('Business settings open once the fleet account API is connected.')}
          >
            <BizIcon name="cog" />
          </button>
          <button
            type="button"
            className="rail-btn rail-extra"
            data-label="Log out"
            aria-label="Log out"
            onClick={() => {
              toast('You have left the business preview.');
              navigate('/');
            }}
          >
            <BizIcon name="out" />
          </button>
        </nav>

        <div className="content">
          <BizSearchContext.Provider value={searchValue}>
            <main className="main">
              <header className="header">
                <div className="header-right" style={{ marginLeft: 'auto', width: '100%', justifyContent: 'flex-end' }}>
                  <label className="search">
                    <BizIcon name="search" />
                    <input
                      type="search"
                      aria-label="Search plate, driver or document"
                      placeholder="Search plate, driver or document"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </label>
                  <button
                    className="pill-btn"
                    type="button"
                    onClick={() => toast(`Showing ${FLEET.dateRange} (preview data).`)}
                  >
                    <BizIcon name="cal" />
                    {FLEET.dateRange}
                  </button>
                  <div className="alerts-wrap" ref={alertsRef}>
                    <button
                      className="icon-btn"
                      type="button"
                      aria-label="Alerts, 4 new"
                      aria-haspopup="dialog"
                      aria-expanded={alertsOpen}
                      onClick={() => setAlertsOpen((open) => !open)}
                    >
                      <BizIcon name="bell" />
                      <span className="dot" />
                    </button>
                    {alertsOpen ? (
                      <div className="alerts-pop" role="dialog" aria-label="Alerts">
                        <h3>Alerts</h3>
                        {ALERTS.map((alert) => (
                          <button
                            key={alert.title}
                            type="button"
                            className="alert-item"
                            onClick={() => {
                              setAlertsOpen(false);
                              navigate(BUSINESS.documents);
                            }}
                          >
                            <span className={`dot status-${alert.tone}`} style={{ background: `var(--biz-${alert.tone})` }} />
                            <span>
                              {alert.title}
                              <small>{alert.meta}</small>
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="me">
                    <div className="me-text">
                      <b>{FLEET.manager}</b>
                      <br />
                      <span>{FLEET.role}</span>
                    </div>
                    <span className="avatar" aria-hidden="true">
                      {FLEET.initials}
                    </span>
                  </div>
                </div>
              </header>
              <Outlet />
            </main>
          </BizSearchContext.Provider>
        </div>
      </div>
    </div>
  );
}
