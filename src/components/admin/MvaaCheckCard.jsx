import React, { useState } from 'react';
import toast from 'react-hot-toast';
import config from '../../config/config';
import { CARD, BTN_PRIMARY, INPUT } from './ui';

const fmt = (d) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');

// What the admin read off verify.autoreg.ng, typed back in. Saves through the
// normal car update so the audit trail is the same as any other edit.
const MvaaCheckCard = ({ car, onSaved }) => {
  const [licence, setLicence] = useState(car.mvaa_vehicle_licence_expiry || '');
  const [roadWorthiness, setRoadWorthiness] = useState(car.mvaa_road_worthiness_expiry || '');
  const [setAsExpiry, setSetAsExpiry] = useState(false);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!licence && !roadWorthiness) {
      toast.error('Enter at least one expiry date from the portal');
      return;
    }
    setSaving(true);
    try {
      const admin = JSON.parse(localStorage.getItem('adminUser') || '{}');
      const payload = {
        mvaa_checked_at: new Date().toISOString(),
        mvaa_checked_by: admin.email || admin.name || 'admin',
        mvaa_vehicle_licence_expiry: licence || null,
        mvaa_road_worthiness_expiry: roadWorthiness || null,
      };
      if (setAsExpiry && licence) payload.expiry_date = licence;
      const res = await fetch(`${config.getApiBaseUrl()}/admin/cars/${car.slug}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.status || data.success) {
        toast.success('MVAA check recorded');
        onSaved?.(data.data || payload);
      } else {
        toast.error(data.message || 'Could not record the check');
      }
    } catch {
      toast.error('Could not record the check');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`${CARD} p-5`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-gray-900">MVAA portal check</h2>
          <p className="mt-0.5 text-sm text-gray-500">
            {car.mvaa_checked_at
              ? `Last checked ${fmt(car.mvaa_checked_at)} by ${car.mvaa_checked_by || 'admin'}`
              : 'Not yet checked against the portal'}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Vehicle licence expiry (portal)</span>
          <input type="date" value={licence} onChange={(e) => setLicence(e.target.value)} className={`${INPUT} mt-1`} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Road worthiness expiry (portal)</span>
          <input type="date" value={roadWorthiness} onChange={(e) => setRoadWorthiness(e.target.value)} className={`${INPUT} mt-1`} />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={setAsExpiry}
            onChange={(e) => setSetAsExpiry(e.target.checked)}
            disabled={!licence}
            className="h-4 w-4 rounded border-gray-300"
          />
          Use the licence expiry as this car's expiry date ({fmt(car.expiry_date)} now)
        </label>
        <button type="button" onClick={save} disabled={saving} className={BTN_PRIMARY}>
          {saving ? 'Saving…' : 'Record check'}
        </button>
      </div>
    </div>
  );
};

export default MvaaCheckCard;
