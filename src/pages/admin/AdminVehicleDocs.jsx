import React, { useState, useEffect } from 'react';
import {
  DocumentTextIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import config from '../../config/config';
import {
  PageHeader,
  StatusBadge,
  PageLoader,
  EmptyState,
  TD,
  TH,
  CARD,
  BTN_PRIMARY,
  INPUT,
} from '../../components/admin/ui';

// Renewal items are stored in kobo (100 kobo = ₦1). Plate and driver
// licence prices are stored in whole Naira. The conversion helpers below
// keep that split in one place so the edit handlers stay symmetric.
// Returns a plain number so it works for both display (via toLocaleString at
// the call site) and for seeding the edit input.
const koboToNaira = (kobo) => Number(kobo) / 100;
const nairaToKobo = (naira) => Math.round(parseFloat(naira) * 100);

const authHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// ─── Shared inline price editor row ──────────────────────────────────────────

const PriceRow = ({
  label,
  sublabel,
  price,
  unit, // 'kobo' | 'naira'
  isEditing,
  editValue,
  onEditChange,
  onStartEdit,
  onCancel,
  onSave,
  onKeyDown,
  saving,
  badge,
}) => {
  const display =
    unit === 'kobo'
      ? Number(koboToNaira(price)).toLocaleString('en-NG', { minimumFractionDigits: 2 })
      : Number(price).toLocaleString('en-NG');

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className={`${TD} whitespace-nowrap`}>
        <span className="text-sm font-medium text-gray-900">{label}</span>
        {sublabel && (
          <span className="ml-2 text-xs text-gray-400">{sublabel}</span>
        )}
      </td>
      {badge && (
        <td className={`${TD} whitespace-nowrap`}>{badge}</td>
      )}
      <td className={`${TD} whitespace-nowrap`}>
        {isEditing ? (
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">₦</span>
            <input
              type="number"
              min="0"
              step={unit === 'kobo' ? '0.01' : '1'}
              value={editValue}
              onChange={(e) => onEditChange(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              className="w-32 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-[#2389E3] focus:outline-none"
            />
          </div>
        ) : (
          <span className="text-sm font-semibold text-gray-900">₦{display}</span>
        )}
      </td>
      <td className={`${TD} whitespace-nowrap`}>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <button
              onClick={onSave}
              disabled={saving}
              title="Save"
              className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2389E3] text-white shadow-sm hover:bg-[#2389E3] disabled:opacity-50 transition-colors"
            >
              {saving ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <CheckIcon className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={onCancel}
              disabled={saving}
              title="Cancel"
              className="flex items-center justify-center h-8 w-8 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onStartEdit}
            title="Edit price"
            className="flex items-center gap-1.5 rounded-lg bg-[#2389E3]/5 px-3 py-1.5 text-xs font-medium text-[#2389E3] hover:bg-[#2389E3]/10 transition-colors"
          >
            <PencilSquareIcon className="h-3.5 w-3.5" />
            Edit
          </button>
        )}
      </td>
    </tr>
  );
};

// ─── Section wrapper ─────────────────────────────────────────────────────────

const PriceSection = ({ title, description, children, columns }) => (
  <div className={`${CARD} overflow-hidden`}>
    <div className="px-5 py-4 border-b border-gray-100">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-0.5 text-sm text-gray-500">{description}</p>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th key={col} className={TH}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">{children}</tbody>
      </table>
    </div>
  </div>
);

// ─── Agent cost table ───────────────────────────────────────────────────────
//
// What Motoka pays the fulfilment agent per service (kobo, matching
// renewal_items.price). This is the number the payout pipeline sums when an
// order is assigned. A service with no cost here is exactly the case that
// holds a payout in manual_review, so keeping this table complete is what
// keeps money moving without you.

const COST_TYPE_LABEL = {
  renewal_item: 'Renewal item',
  plate_number: 'Plate number',
  driver_license: 'Driver licence',
};

const AgentCostSection = ({ costs, onChange, authHeaders }) => {
  const [draft, setDraft] = useState({ service_type: 'renewal_item', service_key: '', cost_naira: '' });
  const [saving, setSaving] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editNaira, setEditNaira] = useState('');

  const save = async (e) => {
    e.preventDefault();
    const costKobo = Math.round(parseFloat(draft.cost_naira) * 100);
    if (!draft.service_key.trim()) return toast.error('Service key is required');
    if (!Number.isFinite(costKobo) || costKobo < 0) return toast.error('Cost must be a valid amount');

    setSaving(true);
    try {
      const res = await fetch(`${config.getApiBaseUrl()}/admin/agent-costs`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({
          service_type: draft.service_type,
          service_key: draft.service_key.trim(),
          cost_kobo: costKobo,
        }),
      });
      const data = await res.json();
      if (data.status || data.success) {
        toast.success('Cost saved');
        const next = [...costs];
        const idx = next.findIndex((c) => c.service_type === data.data.service_type && c.service_key === data.data.service_key);
        if (idx >= 0) next[idx] = data.data; else next.push(data.data);
        onChange(next.sort((a, b) => a.service_type.localeCompare(b.service_type) || a.service_key.localeCompare(b.service_key)));
        setDraft({ service_type: draft.service_type, service_key: '', cost_naira: '' });
      } else {
        toast.error(data.message || 'Save failed');
      }
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const saveEdit = async (row) => {
    const costKobo = Math.round(parseFloat(editNaira) * 100);
    if (!Number.isFinite(costKobo) || costKobo < 0) return toast.error('Cost must be a valid amount');
    try {
      const res = await fetch(`${config.getApiBaseUrl()}/admin/agent-costs`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ service_type: row.service_type, service_key: row.service_key, cost_kobo: costKobo }),
      });
      const data = await res.json();
      if (data.status || data.success) {
        toast.success('Cost updated');
        onChange(costs.map((c) => (c.service_type === row.service_type && c.service_key === row.service_key ? data.data : c)));
        setEditingKey(null);
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch {
      toast.error('Update failed');
    }
  };

  return (
    <div className={`${CARD} overflow-hidden`}>
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">Agent cost table</h3>
        <p className="mt-0.5 text-sm text-gray-500">
          What we pay the fulfilment agent per service, in Naira. Missing costs hold the payout for review.
        </p>
      </div>

      <form onSubmit={save} className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center gap-2 bg-gray-50/50">
        <select
          className={`${INPUT} w-auto`}
          value={draft.service_type}
          onChange={(e) => setDraft((d) => ({ ...d, service_type: e.target.value }))}
        >
          <option value="renewal_item">Renewal item</option>
          <option value="plate_number">Plate number</option>
          <option value="driver_license">Driver licence</option>
        </select>
        <input
          className={INPUT}
          placeholder={
            draft.service_type === 'renewal_item' ? 'item_key (e.g. road_worthiness)'
            : draft.service_type === 'plate_number' ? 'plate type (e.g. Normal)'
            : 'type:duration (e.g. new:3yr)'
          }
          value={draft.service_key}
          onChange={(e) => setDraft((d) => ({ ...d, service_key: e.target.value }))}
        />
        <input
          className={INPUT}
          placeholder="Cost (₦)"
          inputMode="decimal"
          value={draft.cost_naira}
          onChange={(e) => setDraft((d) => ({ ...d, cost_naira: e.target.value }))}
        />
        <button type="submit" disabled={saving} className={BTN_PRIMARY}>
          {saving ? 'Saving…' : 'Add / update'}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className={TH}>Service</th>
              <th className={TH}>Key</th>
              <th className={TH}>Cost</th>
              <th className={TH}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {costs.map((c) => {
              const key = `${c.service_type}:${c.service_key}`;
              const editing = editingKey === key;
              return (
                <tr key={key} className="hover:bg-gray-50">
                  <td className={`${TD} text-sm`}>{COST_TYPE_LABEL[c.service_type] || c.service_type}</td>
                  <td className={`${TD} font-mono text-xs`}>{c.service_key}</td>
                  <td className={TD}>
                    {editing ? (
                      <input
                        className={`${INPUT} w-28`}
                        value={editNaira}
                        onChange={(e) => setEditNaira(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit(c)}
                        autoFocus
                      />
                    ) : (
                      <span className="font-semibold">₦{koboToNaira(c.cost_kobo).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                    )}
                  </td>
                  <td className={TD}>
                    {editing ? (
                      <div className="flex gap-2">
                        <button onClick={() => saveEdit(c)} className="text-green-600 hover:underline text-xs font-medium">Save</button>
                        <button onClick={() => setEditingKey(null)} className="text-gray-500 hover:underline text-xs">Cancel</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setEditingKey(key); setEditNaira(String(koboToNaira(c.cost_kobo))); }}
                        className="text-[#2389E3] hover:underline text-xs font-medium"
                      >
                        <PencilSquareIcon className="h-3.5 w-3.5 inline" /> Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
            {costs.length === 0 && (
              <tr>
                <td colSpan={4}>
                  <EmptyState
                    icon={DocumentTextIcon}
                    title="No agent costs set"
                    body="Add what each service costs you at the counter. Payouts are held until every service on an order is priced."
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Main page ───────────────────────────────────────────────────────────────

const AdminVehicleDocs = () => {
  const [items, setItems] = useState([]);
  const [platePrices, setPlatePrices] = useState([]);
  const [licensePrices, setLicensePrices] = useState([]);
  const [costs, setCosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Editing state: { section: 'renewal'|'plate'|'license', id: string }
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [renewalRes, plateRes, licenseRes, costRes] = await Promise.all([
        fetch(`${config.getApiBaseUrl()}/admin/vehicle-doc-prices`, { headers: authHeaders() }),
        fetch(`${config.getApiBaseUrl()}/admin/plate-prices`, { headers: authHeaders() }),
        fetch(`${config.getApiBaseUrl()}/admin/driver-license-prices`, { headers: authHeaders() }),
        fetch(`${config.getApiBaseUrl()}/admin/agent-costs`, { headers: authHeaders() }),
      ]);

      const [renewal, plate, license, cost] = await Promise.all([
        renewalRes.json(),
        plateRes.json(),
        licenseRes.json(),
        costRes.json(),
      ]);

      if (renewal.status || renewal.success) {
        setItems(renewal.data || []);
      } else {
        toast.error(renewal.message || 'Failed to load renewal prices');
      }

      if (plate.status || plate.success) {
        setPlatePrices(plate.data || []);
      } else {
        toast.error(plate.message || 'Failed to load plate prices');
      }

      if (license.status || license.success) {
        setLicensePrices(license.data || []);
      } else {
        toast.error(license.message || 'Failed to load licence prices');
      }

      if (cost.status || cost.success) {
        // Older backends wrapped the rows one level deeper
        const rows = Array.isArray(cost.data) ? cost.data : cost.data?.data;
        setCosts(rows || []);
      }
    } catch {
      toast.error('Failed to load document prices');
    } finally {
      setLoading(false);
    }
  };

  // ── Edit handlers ──────────────────────────────────────────────────────────

  const startEdit = (section, item, unit) => {
    const rawPrice = unit === 'kobo' ? String(koboToNaira(item.price)) : String(item.price);
    setEditing({ section, id: item.id || item.item_key });
    setEditValue(rawPrice);
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditValue('');
  };

  const saveEdit = async () => {
    if (!editing) return;
    const newNaira = parseFloat(editValue);
    if (isNaN(newNaira) || newNaira < 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setSaving(true);
    try {
      let url, body;

      if (editing.section === 'renewal') {
        url = `${config.getApiBaseUrl()}/admin/vehicle-doc-prices/${editing.id}`;
        body = { price: nairaToKobo(newNaira) };
      } else if (editing.section === 'plate') {
        url = `${config.getApiBaseUrl()}/admin/plate-prices/${editing.id}`;
        body = { price: Math.round(newNaira) };
      } else {
        url = `${config.getApiBaseUrl()}/admin/driver-license-prices/${editing.id}`;
        body = { price: Math.round(newNaira) };
      }

      const res = await fetch(url, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.status || data.success) {
        const updated = data.data;
        if (editing.section === 'renewal') {
          setItems((prev) => prev.map((i) => (i.item_key === editing.id ? { ...i, price: updated.price } : i)));
        } else if (editing.section === 'plate') {
          setPlatePrices((prev) => prev.map((i) => (i.id === editing.id ? { ...i, price: updated.price } : i)));
        } else {
          setLicensePrices((prev) => prev.map((i) => (i.id === editing.id ? { ...i, price: updated.price } : i)));
        }
        toast.success('Price updated');
        cancelEdit();
      } else {
        toast.error(data.message || 'Failed to update price');
      }
    } catch {
      toast.error('Failed to update price');
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  if (loading) {
    return <PageLoader />;
  }

  // ── Label helpers ──────────────────────────────────────────────────────────

  const plateLabel = (row) => {
    const type = row.plate_type || 'Unknown';
    if (row.sub_type) return `${type} — ${row.sub_type}`;
    return type;
  };

  const licenseLabel = (row) => {
    const type = row.license_type === 'new' ? 'New' : row.license_type === 'renew' ? 'Renewal' : row.license_type;
    const dur = row.duration === '3yr' ? '3 years' : row.duration === '5yr' ? '5 years' : row.duration === 'international' ? 'International' : row.duration;
    return `${type} — ${dur}`;
  };

  const isEditingRow = (section, id) => editing?.section === section && editing?.id === id;

  return (
    <div className="space-y-6">
      <PageHeader
        icon={DocumentTextIcon}
        title="Document Prices"
        subtitle="Manage prices for renewals, plate numbers, and driver's licences"
      />

      <p className="text-sm text-gray-500">
        Click the edit icon on any row to update its price. Changes take effect immediately for new orders.
      </p>

      {/* ── Renewal items ─────────────────────────────────────────────────── */}
      <PriceSection
        title="Vehicle Document Renewals"
        description="Prices charged for each document when renewing vehicle papers."
        columns={['Document', 'Key', 'Required', 'Status', 'Price (₦)', 'Actions']}
      >
        {items.map((item) => (
          <PriceRow
            key={item.item_key}
            label={item.name}
            sublabel={item.item_key}
            price={item.price}
            unit="kobo"
            isEditing={isEditingRow('renewal', item.item_key)}
            editValue={editValue}
            onEditChange={setEditValue}
            onStartEdit={() => startEdit('renewal', item, 'kobo')}
            onCancel={cancelEdit}
            onSave={saveEdit}
            onKeyDown={handleKeyDown}
            saving={saving}
            badge={
              <>
                {item.required ? (
                  <StatusBadge tone="blue">Required</StatusBadge>
                ) : (
                  <StatusBadge tone="gray">Optional</StatusBadge>
                )}
                <span className="mx-1" />
                {item.active ? (
                  <StatusBadge tone="green">Active</StatusBadge>
                ) : (
                  <StatusBadge tone="red">Inactive</StatusBadge>
                )}
              </>
            }
          />
        ))}
        {items.length === 0 && (
          <tr>
            <td colSpan={6}>
              <EmptyState icon={DocumentTextIcon} title="No renewal prices found" />
            </td>
          </tr>
        )}
      </PriceSection>

      {/* ── Plate number prices ───────────────────────────────────────────── */}
      <PriceSection
        title="Plate Number Prices"
        description="Prices for new, replacement, customised, and dealership plates."
        columns={['Plate Type', 'Status', 'Price (₦)', 'Actions']}
      >
        {platePrices.map((row) => (
          <PriceRow
            key={row.id}
            label={plateLabel(row)}
            price={row.price}
            unit="naira"
            isEditing={isEditingRow('plate', row.id)}
            editValue={editValue}
            onEditChange={setEditValue}
            onStartEdit={() => startEdit('plate', row, 'naira')}
            onCancel={cancelEdit}
            onSave={saveEdit}
            onKeyDown={handleKeyDown}
            saving={saving}
            badge={
              row.is_active ? (
                <StatusBadge tone="green">Active</StatusBadge>
              ) : (
                <StatusBadge tone="red">Inactive</StatusBadge>
              )
            }
          />
        ))}
        {platePrices.length === 0 && (
          <tr>
            <td colSpan={4}>
              <EmptyState icon={DocumentTextIcon} title="No plate prices found" />
            </td>
          </tr>
        )}
      </PriceSection>

      {/* ── Driver licence prices ─────────────────────────────────────────── */}
      <PriceSection
        title="Driver's Licence Prices"
        description="Prices for new and renewal licences, by duration."
        columns={['Licence Type', 'Status', 'Price (₦)', 'Actions']}
      >
        {licensePrices.map((row) => (
          <PriceRow
            key={row.id}
            label={licenseLabel(row)}
            price={row.price}
            unit="naira"
            isEditing={isEditingRow('license', row.id)}
            editValue={editValue}
            onEditChange={setEditValue}
            onStartEdit={() => startEdit('license', row, 'naira')}
            onCancel={cancelEdit}
            onSave={saveEdit}
            onKeyDown={handleKeyDown}
            saving={saving}
            badge={
              row.is_active ? (
                <StatusBadge tone="green">Active</StatusBadge>
              ) : (
                <StatusBadge tone="red">Inactive</StatusBadge>
              )
            }
          />
        ))}
        {licensePrices.length === 0 && (
          <tr>
            <td colSpan={4}>
              <EmptyState icon={DocumentTextIcon} title="No licence prices found" />
            </td>
          </tr>
        )}
      </PriceSection>

      {/* ── Agent cost table (what we pay the fulfilment agent) ───────────── */}
      <AgentCostSection costs={costs} onChange={setCosts} authHeaders={authHeaders} />

      <p className="text-xs text-gray-400">
        Renewal prices are stored in kobo and converted for display. Plate and licence prices are stored in whole Naira.
      </p>
    </div>
  );
};

export default AdminVehicleDocs;
