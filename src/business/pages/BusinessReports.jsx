import toast from 'react-hot-toast';
import BizPageTitle from '../components/BizPageTitle.jsx';
import { downloadCsv } from '../utils/download.js';
import {
  COMPLIANCE_HISTORY,
  FLEET,
  SAVED_REPORTS,
  SPEND_BY_BRANCH,
} from '../data/businessData.js';

const BAR_HEIGHTS = [70, 85, 95, 100, 95, 105];

function ComplianceChart() {
  return (
    <svg
      viewBox="0 0 600 200"
      role="img"
      aria-label="Compliance rate by month, June to November: 74, 77, 79, 80, 79, 81 percent"
    >
      {COMPLIANCE_HISTORY.map((entry, index) => {
        const height = BAR_HEIGHTS[index];
        const x = 30 + index * 90;
        const y = 170 - height;
        const isLatest = index === COMPLIANCE_HISTORY.length - 1;
        return (
          <g key={entry.month}>
            <rect x={x} y={y} width="48" height={height} rx="2" fill={isLatest ? '#2389E3' : '#D5DEEA'} />
            <text x={x + 24} y="192" textAnchor="middle" fontSize="13" fill="#5F6E85">
              {entry.month}
            </text>
            <text
              x={x + 24}
              y={y - 6}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="#0B1F3A"
            >
              {entry.value}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function BusinessReports() {
  const download = (report) => {
    if (report.status !== 'Ready') {
      toast('This report is still generating.');
      return;
    }
    if (report.format === 'CSV') {
      downloadCsv(
        `${report.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`,
        ['Report', 'Period', 'Format', 'Status'],
        [[report.name, report.period, report.format, report.status]],
      );
      toast.success('Report downloaded');
      return;
    }
    toast('PDF export arrives with the reporting API.');
  };

  return (
    <>
      <BizPageTitle
        title="Reports"
        subtitle={`Compliance, spend and audit reports for ${FLEET.company}`}
      />

      <div className="page-main">
        <div className="split">
          <section className="panel">
            <div className="card-head" style={{ margin: 0 }}>
              <h2>Compliance rate, last 6 months</h2>
              <span className="cap">% of vehicles fully compliant</span>
            </div>
            <ComplianceChart />
          </section>

          <section className="panel">
            <h2>Spend by branch</h2>
            <span className="cap">Renewal fees, October 2026</span>
            {SPEND_BY_BRANCH.map((row) => (
              <div className="bar-row" key={row.branch}>
                <span>{row.branch}</span>
                <div className="track">
                  <i style={{ width: `${row.width}%` }} />
                </div>
                <span className="v">{row.amount}</span>
              </div>
            ))}
            <span className="cap">Total ₦1,284,500</span>
          </section>
        </div>

        <div className="toolbar">
          <div className="group">
            <h2 style={{ fontSize: 15, fontWeight: 800 }}>Saved reports</h2>
          </div>
          <div className="group">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => toast('Custom report builder connects to the reporting API next.')}
            >
              New report
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Report</th>
                <th>Period</th>
                <th>Format</th>
                <th>Status</th>
                <th className="num" />
              </tr>
            </thead>
            <tbody>
              {SAVED_REPORTS.map((report) => (
                <tr key={report.name}>
                  <td>{report.name}</td>
                  <td className="muted">{report.period}</td>
                  <td>{report.format}</td>
                  <td>
                    <span className={`status ${report.status === 'Ready' ? 'good' : 'warn'}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="num">
                    <button
                      className="btn btn-ghost btn-sm"
                      type="button"
                      onClick={() => download(report)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
