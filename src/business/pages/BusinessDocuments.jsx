import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import BizPageTitle from '../components/BizPageTitle.jsx';
import { matchesQuery, useBizSearch } from '../components/BizSearchContext.jsx';
import { DOCUMENT_FILTERS, DOCUMENTS, DOC_SUMMARY } from '../data/businessData.js';

export default function BusinessDocuments() {
  const { query } = useBizSearch();
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(
    () =>
      DOCUMENTS.filter(
        (doc) =>
          (filter === 'all' || doc.filter === filter) &&
          matchesQuery(query, [doc.plate, doc.document, doc.status, doc.expires]),
      ),
    [filter, query],
  );

  return (
    <>
      <BizPageTitle
        title="Documents"
        subtitle="Every licence, insurance and roadworthiness record for the fleet"
      />

      <div className="page-main">
        <div className="stat-row">
          {DOC_SUMMARY.map((summary) => (
            <Link className="card" to={summary.to} key={summary.label}>
              <div className="card-head" style={{ margin: 0 }}>
                <h2>{summary.label}</h2>
                <span className="cap">{summary.valid}</span>
              </div>
              <div className="hero-num" style={{ fontSize: 36 }}>
                {summary.percent}%
              </div>
              <div className={`meter ${summary.tone}`}>
                <i style={{ width: `${summary.percent}%` }} />
              </div>
              <p className="cap" style={{ marginTop: 12 }}>
                Expiring in 30 days: {summary.expiring}
              </p>
            </Link>
          ))}
        </div>

        <div className="toolbar">
          <div className="group">
            <div className="seg" role="group" aria-label="Filter documents">
              {DOCUMENT_FILTERS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={filter === option.key}
                  onClick={() => setFilter(option.key)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="group">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => toast('Document upload connects to the live fleet API next.')}
            >
              Upload document
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Plate</th>
                <th>Document</th>
                <th>Issued</th>
                <th>Expires</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc) => (
                <tr key={`${doc.plate}-${doc.document}`}>
                  <td>
                    <span className="plate">{doc.plate}</span>
                  </td>
                  <td>{doc.document}</td>
                  <td className="muted">{doc.issued}</td>
                  <td>{doc.expires}</td>
                  <td>
                    <span className={`status ${doc.tone}`}>{doc.status}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr className="empty-row">
                  <td colSpan={5}>No documents match your search.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
          <div className="table-foot">
            <span>Showing {filtered.length} recent documents</span>
            <span>View all documents</span>
          </div>
        </div>
      </div>
    </>
  );
}
