import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import BizPageTitle from '../components/BizPageTitle.jsx';
import { matchesQuery, useBizSearch } from '../components/BizSearchContext.jsx';
import { downloadCsv } from '../utils/download.js';
import { VEHICLE_FILTERS, VEHICLES } from '../data/businessData.js';

const FILTER_TONE = {
  compliant: 'good',
  expiring: 'warn',
  expired: 'bad',
};

export default function BusinessVehicles() {
  const { query } = useBizSearch();
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(
    () =>
      VEHICLES.filter((vehicle) => {
        const toneMatch = filter === 'all' || vehicle.tone === FILTER_TONE[filter];
        return (
          toneMatch &&
          matchesQuery(query, [
            vehicle.plate,
            vehicle.vehicle,
            vehicle.branch,
            vehicle.driver,
            vehicle.status,
          ])
        );
      }),
    [filter, query],
  );

  const exportCsv = () => {
    downloadCsv(
      'motoka-fleet-vehicles.csv',
      ['Plate', 'Vehicle', 'Branch', 'Driver', 'Status', 'Next expiry', 'Valid docs'],
      VEHICLES.map((vehicle) => [
        vehicle.plate,
        vehicle.vehicle,
        vehicle.branch,
        vehicle.driver,
        vehicle.status,
        vehicle.expiry,
        vehicle.validDocs,
      ]),
    );
    toast.success('Vehicles exported');
  };

  return (
    <>
      <BizPageTitle title="Vehicles" subtitle="48 vehicles across Lagos, Ibadan and Abuja" />

      <div className="page-main">
        <div className="toolbar">
          <div className="group">
            <div className="seg" role="group" aria-label="Filter vehicles">
              {VEHICLE_FILTERS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={filter === option.key}
                  onClick={() => setFilter(option.key)}
                >
                  {option.label}
                  <span className="n">{option.count}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="group">
            <button className="btn btn-ghost" type="button" onClick={exportCsv}>
              Export CSV
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => toast('Vehicle onboarding connects to the live fleet API next.')}
            >
              Add vehicle
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Plate</th>
                <th>Vehicle</th>
                <th>Branch</th>
                <th>Driver</th>
                <th>Status</th>
                <th>Next expiry</th>
                <th className="num">Valid docs</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((vehicle) => (
                <tr key={vehicle.plate}>
                  <td>
                    <span className="plate">{vehicle.plate}</span>
                  </td>
                  <td>{vehicle.vehicle}</td>
                  <td className="muted">{vehicle.branch}</td>
                  <td>{vehicle.driver}</td>
                  <td>
                    <span className={`status ${vehicle.tone}`}>{vehicle.status}</span>
                  </td>
                  <td className="muted">{vehicle.expiry}</td>
                  <td className="num">{vehicle.validDocs}</td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr className="empty-row">
                  <td colSpan={7}>No vehicles match your search.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
          <div className="table-foot">
            <span>Showing {filtered.length} of 48 vehicles</span>
            <span>Page 1 of 5</span>
          </div>
        </div>
      </div>
    </>
  );
}
