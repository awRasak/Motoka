import toast from 'react-hot-toast';
import BizPageTitle from '../components/BizPageTitle.jsx';
import { downloadCsv } from '../utils/download.js';
import { PAYMENT_DUE, TRANSACTIONS, WALLET } from '../data/businessData.js';

export default function BusinessPayments() {
  const exportTransactions = () => {
    downloadCsv(
      'motoka-fleet-transactions.csv',
      ['Date', 'Description', 'Type', 'Amount', 'Status'],
      TRANSACTIONS.map((txn) => [txn.date, txn.description, txn.type, txn.amount, txn.status]),
    );
    toast.success('Transactions exported');
  };

  return (
    <>
      <BizPageTitle
        title="Payments"
        subtitle="Wallet balance, renewal fees and transaction history"
      />

      <div className="page-main">
        <div className="split">
          <section className="panel">
            <div className="card-head" style={{ margin: 0 }}>
              <h2>Fleet wallet</h2>
              <span className="cap">Updated today</span>
            </div>
            <div className="hero-num">{WALLET.balance}</div>
            <div className="bar-row" style={{ gridTemplateColumns: '1fr', gap: 6 }}>
              <span className="cap">Balance covers ₦850,000 of ₦1,284,500 due this month</span>
              <div
                className="track"
                style={{ height: 8, background: 'var(--biz-track)', borderRadius: 4, overflow: 'hidden' }}
              >
                <i
                  style={{
                    display: 'block',
                    height: '100%',
                    width: '66%',
                    background: 'var(--biz-accent)',
                  }}
                />
              </div>
            </div>
            <span className="status warn">Short by {WALLET.shortBy} for this month</span>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => toast('Wallet top-up runs through the live payments flow.')}
              >
                Top up wallet
              </button>
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => toast('Auto top-up is enabled once a funding source is linked.')}
              >
                Set auto top-up
              </button>
            </div>
          </section>

          <section className="panel">
            <h2>Due this month</h2>
            {PAYMENT_DUE.map((row) => (
              <div className="bar-row" key={row.label}>
                <span>{row.label}</span>
                <div className="track">
                  <i style={{ width: `${row.width}%` }} />
                </div>
                <span className="v">{row.amount}</span>
              </div>
            ))}
            <span className="cap">9 renewals · fees passed through at cost</span>
          </section>
        </div>

        <div className="toolbar">
          <div className="group">
            <h2 style={{ fontSize: 15, fontWeight: 800 }}>Transactions</h2>
          </div>
          <div className="group">
            <button className="btn btn-ghost" type="button" onClick={exportTransactions}>
              Export
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th className="num">Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((txn) => (
                <tr key={`${txn.date}-${txn.description}`}>
                  <td className="muted">{txn.date}</td>
                  <td>{txn.description}</td>
                  <td>{txn.type}</td>
                  <td className="num">{txn.amount}</td>
                  <td>
                    <span className={`status ${txn.tone}`}>{txn.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-foot">
            <span>Showing 5 recent transactions</span>
            <span>View all</span>
          </div>
        </div>
      </div>
    </>
  );
}
