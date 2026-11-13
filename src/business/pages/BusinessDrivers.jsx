import { useMemo } from 'react';
import toast from 'react-hot-toast';
import BizPageTitle from '../components/BizPageTitle.jsx';
import { matchesQuery, useBizSearch } from '../components/BizSearchContext.jsx';
import { DRIVERS, DRIVER_KPIS } from '../data/businessData.js';

export default function BusinessDrivers() {
  const { query } = useBizSearch();

  const filtered = useMemo(
    () =>
      DRIVERS.filter((driver) =>
        matchesQuery(query, [driver.name, driver.plate, driver.status]),
      ),
    [query],
  );

  return (
    <>
      <BizPageTitle
        title="Drivers"
        subtitle="Who drives each vehicle, and whether their licence is valid"
      />

      <div className="page-main">
        <div className="stat-row three">
          {DRIVER_KPIS.map((kpi) => (
            <section className="card kpi" key={kpi.label}>
              <span className="kpi-label">{kpi.label}</span>
              <div>
                <div className="kpi-value">{kpi.value}</div>
                <div className="kpi-note">
                  {kpi.tone ? <span className={`status ${kpi.tone}`}>{kpi.note}</span> : kpi.note}
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="toolbar">
          <div className="group">
            <span className="cap">Showing {filtered.length} of 46 drivers</span>
          </div>
          <div className="group">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => toast('Driver invites connect to the live fleet API next.')}
            >
              Invite driver
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Driver</th>
                <th>Assigned vehicle</th>
                <th>Licence expires</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((driver) => (
                <tr key={driver.name}>
                  <td>
                    <div className="who" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700 }}>
                      <span className="mini-av">{driver.initials}</span>
                      {driver.name}
                    </div>
                  </td>
                  <td>
                    <span className="plate">{driver.plate}</span>
                  </td>
                  <td>{driver.expiry}</td>
                  <td>
                    <span className={`status ${driver.tone}`}>{driver.status}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr className="empty-row">
                  <td colSpan={4}>No drivers match your search.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
          <div className="table-foot">
            <span>Showing {filtered.length} of 46</span>
            <span>Page 1 of 6</span>
          </div>
        </div>
      </div>
    </>
  );
}
