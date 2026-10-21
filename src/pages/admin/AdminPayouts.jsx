import React, { useState, useEffect, useCallback } from 'react';
import { BanknotesIcon, ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import config from '../../config/config';
import {
  PageHeader,
  StatusBadge,
  PageLoader,
  EmptyState,
  Card,
  TD,
  TH,
  BTN_PRIMARY,
  BTN_SECONDARY,
} from '../../components/admin/ui';

const authHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
};

const koboToNaira = (kobo) =>
  (Number(kobo) / 100).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const TONE = {
  success: 'green',
  processing: 'blue',
  pending: 'yellow',
  failed: 'red',
  manual_review: 'orange',
};

const STATUS_FILTERS = ['', 'pending', 'processing', 'success', 'failed', 'manual_review'];

const fmtDate = (iso) => (iso ? new Date(iso).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' }) : '—');

export default function AdminPayouts() {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = status ? `?status=${status}` : '';
      const res = await fetch(`${config.getApiBaseUrl()}/admin/payouts${qs}`, { headers: authHeaders() });
      const data = await res.json();
      if (data.status || data.success) {
        setRows(Array.isArray(data.data) ? data.data : data.data?.data || []);
        setMeta(data.data?.meta || null);
      } else {
        toast.error(data.message || 'Failed to load payouts');
      }
    } catch {
      toast.error('Failed to load payouts');
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => { load(); }, [load]);

  const act = async (id, action, body) => {
    setBusyId(id);
    try {
      const res = await fetch(`${config.getApiBaseUrl()}/admin/payouts/${id}/${action}`, {
        method: 'POST',
        headers: authHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();
      if (data.status || data.success) {
        toast.success(action === 'retry' ? 'Payout retried' : action === 'mark-paid' ? 'Marked as paid' : 'Reconciled');
        load();
      } else {
        toast.error(data.message || 'Action failed');
      }
    } catch {
      toast.error('Action failed');
    } finally {
      setBusyId(null);
    }
  };

  const markPaid = (row) => {
    const note = window.prompt('Note (optional) — how was this paid?', '');
    if (note === null) return;
    act(row.id, 'mark-paid', { note });
  };

  if (loading && rows.length === 0) return <PageLoader />;

  const totalHeld = rows
    .filter((r) => r.status === 'manual_review' || r.status === 'failed')
    .reduce((s, r) => s + Number(r.amount_kobo || 0), 0);

  return (
    <div className="space-y-6">
      <PageHeader
        icon={BanknotesIcon}
        title="Agent Payouts"
        subtitle="Every agent payment, one row per order. This is the record of what you have and haven't paid."
      />

      {meta && (
        <Card className="p-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span>
            Auto-payouts:{' '}
            {meta.auto_payouts_enabled
              ? <StatusBadge tone="green">ON</StatusBadge>
              : <StatusBadge tone="orange">OFF — ledger only</StatusBadge>}
          </span>
          <span className="text-gray-600">
            Per-transfer limit: <strong>₦{koboToNaira(meta.auto_payout_limit_kobo)}</strong>
          </span>
          <span className="text-gray-600">
            Needs attention: <strong className="text-orange-600">₦{koboToNaira(totalHeld)}</strong>
          </span>
        </Card>
      )}

      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s || 'all'}
            onClick={() => setStatus(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
              status === s ? 'bg-[#2389E3] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s || 'All'}
          </button>
        ))}
        <button onClick={load} className="ml-auto text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1">
          <ArrowPathIcon className="h-4 w-4" /> Refresh
        </button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className={TH}>Order</th>
                <th className={TH}>Agent</th>
                <th className={TH}>Amount</th>
                <th className={TH}>Status</th>
                <th className={TH}>Reference</th>
                <th className={TH}>Assigned</th>
                <th className={TH}>Paid</th>
                <th className={TH}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((r) => {
                const actionable = r.status === 'failed' || r.status === 'manual_review';
                return (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className={TD}>
                      <div className="text-sm font-medium text-gray-900">{r.order_reference || '—'}</div>
                      <div className="text-xs text-gray-500 capitalize">{r.order_type} · {r.order_status || '—'}</div>
                    </td>
                    <td className={TD}>
                      <div className="text-sm">{r.agent_name || '—'}</div>
                      {r.agent_account_number && (
                        <div className="text-xs text-gray-500">{r.agent_bank_name} · {r.agent_account_number}</div>
                      )}
                    </td>
                    <td className={`${TD} font-semibold tabular-nums`}>₦{koboToNaira(r.amount_kobo)}</td>
                    <td className={TD}>
                      <StatusBadge tone={TONE[r.status] || 'gray'}>{String(r.status).replace('_', ' ')}</StatusBadge>
                      {r.failure_reason && (
                        <div className="mt-1 text-xs text-red-600 max-w-[180px] truncate" title={r.failure_reason}>
                          {r.failure_reason}
                        </div>
                      )}
                    </td>
                    <td className={`${TD} text-xs text-gray-500 font-mono`}>{r.provider_reference || r.provider || '—'}</td>
                    <td className={`${TD} text-xs text-gray-500`}>{fmtDate(r.assigned_at)}</td>
                    <td className={`${TD} text-xs text-gray-500`}>{fmtDate(r.paid_at)}</td>
                    <td className={TD}>
                      <div className="flex flex-col gap-1">
                        {actionable && (
                          <button
                            disabled={busyId === r.id}
                            onClick={() => act(r.id, 'retry')}
                            className="text-[#2389E3] hover:underline text-xs font-medium disabled:opacity-50"
                          >
                            <ArrowPathIcon className="h-3.5 w-3.5 inline" /> Retry
                          </button>
                        )}
                        {actionable && (
                          <button
                            disabled={busyId === r.id}
                            onClick={() => markPaid(r)}
                            className="text-green-600 hover:underline text-xs font-medium disabled:opacity-50"
                          >
                            <CheckCircleIcon className="h-3.5 w-3.5 inline" /> Mark paid
                          </button>
                        )}
                        {r.status === 'processing' && (
                          <button
                            disabled={busyId === r.id}
                            onClick={() => act(r.id, 'reconcile')}
                            className="text-gray-500 hover:underline text-xs font-medium disabled:opacity-50"
                          >
                            Check status
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <EmptyState
                      icon={BanknotesIcon}
                      title="No payouts yet"
                      body="Payout rows appear the moment a paid order is assigned to an agent."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-gray-400">
        <strong>Retry</strong> attempts the transfer again as a new row. <strong>Mark paid</strong> records a payment you made outside the system (bank app, cash) so the ledger stays complete.
      </p>
    </div>
  );
}
