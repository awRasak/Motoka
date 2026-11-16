import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import BizPageTitle from '../components/BizPageTitle.jsx';
import AddVehicleModal from '../components/AddVehicleModal.jsx';
import BulkAddVehicleModal from '../components/BulkAddVehicleModal.jsx';
import BizExpiriesChart from '../components/BizExpiriesChart.jsx';
import { matchesQuery, useBizSearch } from '../components/BizSearchContext.jsx';
import { BUSINESS } from '../routes.js';
import {
  ACTION_ITEMS,
  ACTIVITY,
  COMPLIANCE,
  DOC_COUNTS,
  EXPIRY_SUMMARY,
  FLEET,
  KPIS,
  WALLET,
} from '../data/businessData.js';

const FILTERS = [
  { key: 'all', label: 'All', count: 9 },
  { key: 'expired', label: 'Expired', count: 3 },
  { key: 'due', label: 'Due soon', count: 6 },
];

const queueId = (item) => `${item.plate}-${item.doc}`;

export default function BusinessOverview() {
  const { query } = useBizSearch();
  const [chartMode, setChartMode] = useState('weekly');
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState(() =>
    ACTION_ITEMS.map((item) => ({ ...item, id: queueId(item), queued: false })),
  );
  const [selected, setSelected] = useState(() => new Set());
  const [addOpen, setAddOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);

  const visibleItems = useMemo(
    () =>
      items.filter(
        (item) =>
          (filter === 'all' || item.status === filter) &&
          matchesQuery(query, [item.plate, item.doc, item.driver, item.label]),
      ),
    [items, filter, query],
  );

  const toggleSelected = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const queueOne = (id) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, queued: true } : item)));
    setSelected((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const queueSelected = () => {
    if (selected.size === 0) return;
    const ids = new Set(selected);
    setItems((prev) => prev.map((item) => (ids.has(item.id) ? { ...item, queued: true } : item)));
    setSelected(new Set());
    toast.success(`${ids.size} renewal${ids.size === 1 ? '' : 's'} queued`);
  };

  return (
    <>
      <BizPageTitle
        title="Fleet overview"
        subtitle={`Good afternoon, ${FLEET.manager.split(' ')[0]}. 9 items need action today across ${FLEET.company}.`}
      >
        <button type="button" className="btn btn-ghost" onClick={() => setAddOpen(true)}>
          Add vehicles
        </button>
        <button type="button" className="btn btn-primary" onClick={() => setBulkOpen(true)}>
          Start bulk renewal
        </button>
      </BizPageTitle>

      <section className="kpis" aria-label="Key figures">
        {KPIS.map((kpi) => (
          <Link className="card kpi" to={kpi.to} key={kpi.label}>
            <span className="kpi-label">{kpi.label}</span>
            <div>
              <div className="kpi-value">{kpi.value}</div>
              <div className="kpi-note">
                {kpi.tone ? <span className={`status ${kpi.tone}`}>{kpi.note}</span> : kpi.note}
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="bento" aria-label="Compliance and expiries">
        <article className="card span-hero" aria-labelledby="comp-title">
          <div className="card-head">
            <h2 id="comp-title">Compliance score</h2>
            <span className="cap">All vehicles</span>
          </div>
          <div className="hero-num">{COMPLIANCE.score}</div>
          <div className="hero-sub">of vehicles fully compliant</div>
          <div className="hero-mid">
            <svg
              className="ring"
              viewBox="0 0 140 140"
              role="img"
              aria-label="Compliant 81 percent, expiring 13 percent, expired 6 percent"
            >
              <g transform="rotate(-90 70 70)" fill="none" strokeWidth="16">
                <circle cx="70" cy="70" r="54" style={{ stroke: 'var(--biz-track)' }} />
                <circle cx="70" cy="70" r="54" stroke="var(--biz-good)" strokeDasharray="275 339.3" />
                <circle cx="70" cy="70" r="54" stroke="var(--biz-warn)" strokeDasharray="44 339.3" strokeDashoffset="-275" />
                <circle cx="70" cy="70" r="54" stroke="var(--biz-bad)" strokeDasharray="21 339.3" strokeDashoffset="-319" />
              </g>
            </svg>
            <div className="legend">
              <div className="leg">
                <span>
                  <i className="dot" style={{ background: 'var(--biz-warn)' }} />
                  Expiring
                </span>
                <b>{COMPLIANCE.expiring}%</b>
              </div>
              <div className="leg">
                <span>
                  <i className="dot" style={{ background: 'var(--biz-bad)' }} />
                  Expired
                </span>
                <b>{COMPLIANCE.expired}%</b>
              </div>
            </div>
          </div>
          <p className="cap">Share of the {COMPLIANCE.total} vehicles with every document valid.</p>
        </article>

        <article className="card span-chart" aria-labelledby="exp-title">
          <div className="card-head">
            <h2 id="exp-title">Expiries, next 90 days</h2>
            <div className="seg" role="group" aria-label="Chart period">
              <button
                type="button"
                data-mode="weekly"
                aria-pressed={chartMode === 'weekly'}
                onClick={() => setChartMode('weekly')}
              >
                Weekly
              </button>
              <button
                type="button"
                data-mode="monthly"
                aria-pressed={chartMode === 'monthly'}
                onClick={() => setChartMode('monthly')}
              >
                Monthly
              </button>
            </div>
          </div>
          <div className="chart-body">
            <BizExpiriesChart mode={chartMode} />
          </div>
          <div className="chart-foot">
            {EXPIRY_SUMMARY.map((item) => (
              <div key={item.label}>
                <span className="cap">{item.label}</span>
                <b>{item.value}</b>
              </div>
            ))}
          </div>
        </article>

        <div className="span-side">
          <section className="card" aria-label="Fleet wallet">
            <span className="wallet-label">Fleet wallet balance</span>
            <div className="wallet-amount">{WALLET.balance}</div>
            <span className="wallet-short">Short by {WALLET.shortBy} for this month</span>
            <div className="wallet-foot">
              <span>{WALLET.covers}</span>
              <button
                className="btn btn-light btn-sm"
                type="button"
                onClick={() => toast('Top-up runs through the live payments flow — this preview uses demo balances.')}
              >
                Top up
              </button>
            </div>
          </section>

          <section className="card" aria-labelledby="doc-title">
            <div className="card-head" style={{ marginBottom: 12 }}>
              <h2 id="doc-title">Valid documents</h2>
            </div>
            <div className="doc-grid">
              {DOC_COUNTS.map((doc) => (
                <div className="doc" key={doc.label}>
                  <span className="t">{doc.label}</span>
                  <div>
                    <span className="v">{doc.value}</span> <span className="of">{doc.of}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="lower" aria-label="Needs attention and activity">
        <article className="card" aria-labelledby="attn-title">
          <div className="card-head">
            <h2 id="attn-title">Action needed</h2>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="seg" role="group" aria-label="Filter by status">
                {FILTERS.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    data-filter={option.key}
                    aria-pressed={filter === option.key}
                    onClick={() => setFilter(option.key)}
                  >
                    {option.label}
                    <span className="n">{option.count}</span>
                  </button>
                ))}
              </div>
              <button
                className="btn btn-ghost btn-sm"
                type="button"
                disabled={selected.size === 0}
                onClick={queueSelected}
              >
                Renew selected{selected.size ? ` (${selected.size})` : ''}
              </button>
            </div>
          </div>

          <div className="actions-scroll">
            <div className="actions-grid">
              {visibleItems.map((item) => {
                const expired = item.status === 'expired';
                return (
                  <div className="action" data-status={item.status} key={item.id}>
                    <div className="action-top">
                      <input
                        className="sel"
                        type="checkbox"
                        id={`sel-${item.id}`}
                        aria-label={`Select ${item.plate}`}
                        checked={selected.has(item.id)}
                        onChange={() => toggleSelected(item.id)}
                      />
                      <div className="action-main">
                        <label htmlFor={`sel-${item.id}`}>
                          <span className="plate">{item.plate}</span>
                        </label>
                        <p>
                          {item.doc} · {item.label}
                        </p>
                      </div>
                      <span className={`status ${expired ? 'bad' : 'warn'}`}>
                        {expired ? 'Expired' : 'Due soon'}
                      </span>
                    </div>
                    <div className="driver">
                      <div className="driver-who">
                        <span className="mini-av" aria-hidden="true">
                          {item.initials}
                        </span>
                        <span>
                          {item.driver}
                          <small>Driver</small>
                        </span>
                      </div>
                      <button
                        className={`btn btn-sm renew ${item.queued ? 'btn-done' : 'btn-primary'}`}
                        type="button"
                        disabled={item.queued}
                        onClick={() => queueOne(item.id)}
                      >
                        {item.queued ? 'Queued' : 'Renew'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {visibleItems.length === 0 ? (
              <p className="empty">No renewals match this filter.</p>
            ) : null}
          </div>
        </article>

        <article className="card" id="recent-activity" aria-labelledby="act-title">
          <div className="card-head">
            <h2 id="act-title">Recent activity</h2>
          </div>
          <div className="activity">
            {ACTIVITY.map((entry) => (
              <div className="act" key={`${entry.initials}-${entry.person}-${entry.meta}`}>
                <span className="act-av">{entry.initials}</span>
                <div className="act-text">
                  <b>{entry.person}</b> {entry.text}
                  <span>{entry.meta}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="card-foot">
            <a className="link" href="#recent-activity">
              View all activity
            </a>
          </div>
        </article>
      </section>

      <AddVehicleModal open={addOpen} onClose={() => setAddOpen(false)} />
      <BulkAddVehicleModal open={bulkOpen} onClose={() => setBulkOpen(false)} />
    </>
  );
}
