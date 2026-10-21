import React, { useState, useEffect, useCallback } from 'react';
import {
  UserGroupIcon,
  PlusIcon,
  CheckIcon,
  XMarkIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
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
  INPUT,
} from '../../components/admin/ui';

const authHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
};

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  bank_name: '',
  account_number: '',
  account_name: '',
};

// Bank account numbers are 10 digits in Nigeria. Validating here rather than
// at the provider keeps a fat-fingered transfer from ever being attempted.
const accountNumberValid = (v) => !v || /^\d{10}$/.test(v);

export default function AdminAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${config.getApiBaseUrl()}/admin/agents`, { headers: authHeaders() });
      const data = await res.json();
      if (data.status || data.success) {
        setAgents(Array.isArray(data.data) ? data.data : data.data?.data || []);
      } else {
        toast.error(data.message || 'Failed to load agents');
      }
    } catch {
      toast.error('Failed to load agents');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const startEdit = (agent) => {
    setEditingId(agent.id);
    setForm({
      name: agent.name || '',
      phone: agent.phone || '',
      email: agent.email || '',
      bank_name: agent.bank_name || '',
      account_number: agent.account_number || '',
      account_name: agent.account_name || '',
    });
  };

  const reset = () => { setEditingId(null); setForm(EMPTY_FORM); };

  const save = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error('Name is required');
    if (!accountNumberValid(form.account_number)) return toast.error('Account number must be 10 digits');

    setSaving(true);
    try {
      const url = editingId
        ? `${config.getApiBaseUrl()}/admin/agents/${editingId}`
        : `${config.getApiBaseUrl()}/admin/agents`;
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: authHeaders(),
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.status || data.success) {
        toast.success(editingId ? 'Agent updated' : 'Agent added');
        reset();
        load();
      } else {
        toast.error(data.message || 'Save failed');
      }
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (agent) => {
    const next = agent.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await fetch(`${config.getApiBaseUrl()}/admin/agents/${agent.id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ status: next }),
      });
      const data = await res.json();
      if (data.status || data.success) {
        toast.success(next === 'active' ? 'Agent activated' : 'Agent deactivated');
        load();
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch {
      toast.error('Update failed');
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <PageHeader
        icon={UserGroupIcon}
        title="Fulfilment Agents"
        subtitle="People Motoka pays to process documents. Money is sent here when an order is assigned."
      />

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          {editingId ? 'Edit agent' : 'Add an agent'}
        </h3>
        <form onSubmit={save} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <input className={INPUT} placeholder="Full name *" value={form.name} onChange={set('name')} />
          <input className={INPUT} placeholder="Phone" value={form.phone} onChange={set('phone')} />
          <input className={INPUT} placeholder="Email (for alerts)" value={form.email} onChange={set('email')} />
          <input className={INPUT} placeholder="Bank name" value={form.bank_name} onChange={set('bank_name')} />
          <input
            className={INPUT}
            placeholder="Account number (10 digits)"
            value={form.account_number}
            onChange={set('account_number')}
            inputMode="numeric"
            maxLength={10}
          />
          <input className={INPUT} placeholder="Account name" value={form.account_name} onChange={set('account_name')} />
          <div className="flex gap-2 sm:col-span-2 lg:col-span-3">
            <button type="submit" disabled={saving} className={BTN_PRIMARY}>
              {saving ? 'Saving…' : editingId ? 'Update agent' : 'Add agent'}
            </button>
            {editingId && (
              <button type="button" onClick={reset} className={BTN_SECONDARY}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className={TH}>Name</th>
                <th className={TH}>Contact</th>
                <th className={TH}>Bank</th>
                <th className={TH}>Account</th>
                <th className={TH}>Status</th>
                <th className={TH}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {agents.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className={`${TD} font-medium text-gray-900`}>{a.name}</td>
                  <td className={TD}>
                    <div className="text-sm text-gray-900">{a.phone || '—'}</div>
                    {a.email && <div className="text-xs text-gray-500">{a.email}</div>}
                  </td>
                  <td className={TD}>{a.bank_name || '—'}</td>
                  <td className={TD}>
                    <div className="text-sm">{a.account_number || '—'}</div>
                    {a.account_name && <div className="text-xs text-gray-500">{a.account_name}</div>}
                  </td>
                  <td className={TD}>
                    {a.status === 'active'
                      ? <StatusBadge tone="green">Active</StatusBadge>
                      : <StatusBadge tone="gray">Inactive</StatusBadge>}
                  </td>
                  <td className={TD}>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(a)} className="text-[#2389E3] hover:underline text-xs font-medium">
                        <PencilSquareIcon className="h-4 w-4 inline" /> Edit
                      </button>
                      <button
                        onClick={() => toggleStatus(a)}
                        className={a.status === 'active' ? 'text-gray-500 hover:underline text-xs font-medium' : 'text-green-600 hover:underline text-xs font-medium'}
                      >
                        {a.status === 'active'
                          ? <><XMarkIcon className="h-4 w-4 inline" /> Deactivate</>
                          : <><CheckIcon className="h-4 w-4 inline" /> Activate</>}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {agents.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <EmptyState
                      icon={UserGroupIcon}
                      title="No agents yet"
                      body="Add the people who process documents for you. Paid orders will be assigned to them automatically."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-gray-400">
        Orders are assigned round-robin to active agents the moment payment clears. Payouts are held if an agent has no bank details or if a service has no cost set.
      </p>
    </div>
  );
}
