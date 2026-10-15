import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  CheckBadgeIcon,
  DocumentArrowUpIcon,
  DocumentIcon,
  MapPinIcon,
  PhoneIcon,
  ReceiptPercentIcon,
  TruckIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import {
  adminCreateShipment,
  adminGetGuestOrder,
  adminReopenGuestOrder,
  adminRolloverGuestOrder,
  adminUpdateGuestOrderStatus,
} from '../../services/apiDelivery';
import ShipmentTracker from '../../components/delivery/ShipmentTracker';
import config from '../../config/config';

function ScheduleHoldCard({ order, onChanged }) {
  const [date, setDate] = useState(order.scheduled_for || '');
  const [busy, setBusy] = useState(false);

  const apply = async (next) => {
    try {
      setBusy(true);
      await adminRolloverGuestOrder(order.id, next);
      toast.success(next ? `Held to ${next}` : 'Released — actionable now');
      await onChanged();
    } catch (err) {
      toast.error(err.message || 'Failed to update hold');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-2">Schedule hold</h3>
      <p className="text-sm text-gray-500">
        {order.scheduled_for
          ? `Held until ${order.scheduled_for} — ops is alerted when the window opens.`
          : 'Actionable now.'}
        {!order.linked_user_id && ' Guest has no account yet — processing waits for registration.'}
      </p>
      <div className="mt-3 flex flex-col sm:flex-row gap-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <button
          type="button"
          disabled={busy || !date}
          onClick={() => apply(date)}
          className="rounded-lg bg-[#2389E3] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2389E3]/90 disabled:opacity-50"
        >
          {busy ? 'Saving…' : 'Apply hold'}
        </button>
        {order.scheduled_for && (
          <button
            type="button"
            disabled={busy}
            onClick={() => apply(null)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Release now
          </button>
        )}
      </div>
    </div>
  );
}

const STATUS_BADGE = {
  payment_success: 'bg-green-100 text-green-800',
  pending_payment: 'bg-orange-100 text-orange-800',
  payment_failed: 'bg-red-100 text-red-800',
  expired: 'bg-gray-100 text-gray-600',
};

const STATUS_LABEL = {
  payment_success: 'Paid',
  pending_payment: 'Pending payment',
  payment_failed: 'Failed',
  expired: 'Expired',
};

const FULFILLMENT_BADGE = {
  pending: 'bg-blue-100 text-blue-800',
  processing: 'bg-amber-100 text-amber-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-600',
};

const FULFILLMENT_LABEL = {
  pending: 'New',
  processing: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const DOC_CATEGORIES = [
  { value: 'registration_certificate', label: 'Registration Certificate' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'roadworthiness', label: 'Roadworthiness' },
  { value: 'inspection_report', label: 'Inspection Report' },
  { value: 'proof_of_ownership', label: 'Proof of Ownership' },
  { value: 'other', label: 'Other' },
];

function formatNairaFromKobo(kobo) {
  const n = Number(kobo);
  if (!Number.isFinite(n)) return '—';
  return `₦${(n / 100).toLocaleString('en-NG')}`;
}

function notifyFeeMismatch(shipment) {
  const mismatch = shipment?.raw_response?.fee_mismatch;
  if (!mismatch || Math.abs(Number(mismatch.difference_kobo) || 0) <= 100) {
    toast.success('Waybill generated');
    return;
  }
  const paid = formatNairaFromKobo(mismatch.customer_kobo);
  const booked = formatNairaFromKobo(mismatch.booked_kobo);
  toast.success(`Waybill generated. Customer paid ${paid}; Terminal charged ${booked}.`);
}

export default function AdminGuestOrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shipmentBusy, setShipmentBusy] = useState(false);
  const [actualWeightKg, setActualWeightKg] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(false);

  // Document upload state — mirrors the signed-in Order Details flow.
  const [documents, setDocuments] = useState([]);
  const [docsLoading, setDocsLoading] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadCategory, setUploadCategory] = useState('registration_certificate');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const load = async () => {
    const data = await adminGetGuestOrder(orderId);
    setOrder(data);
    if (data?.car?.id) fetchCarDocuments(data.car.id);
  };

  const fetchCarDocuments = async (carId) => {
    if (!carId) return;
    try {
      setDocsLoading(true);
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${config.getApiBaseUrl()}/admin/documents?car_id=${carId}&limit=50`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.status) setDocuments(data.data || []);
    } catch {
      // non-blocking
    } finally {
      setDocsLoading(false);
    }
  };

  const handleDocumentUpload = async () => {
    if (!uploadFile) return toast.error('Please select a file');
    if (!order?.car?.slug) return toast.error('No car linked yet — documents unlock after registration');
    try {
      setUploading(true);
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('car_slug', order.car.slug);
      formData.append('document_type', 'car');
      formData.append('document_category', uploadCategory);
      const res = await fetch(`${config.getApiBaseUrl()}/admin/documents/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.status) {
        toast.success('Document uploaded successfully');
        setUploadFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchCarDocuments(order.car.id);
      } else {
        toast.error(data.message || 'Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleStatusUpdate = async (nextStatus) => {
    try {
      setStatusUpdating(true);
      await adminUpdateGuestOrderStatus(order.id, nextStatus);
      await load();
      toast.success(
        nextStatus === 'processing'
          ? 'Order marked In Progress'
          : nextStatus === 'completed'
            ? 'Order marked Completed'
            : 'Order declined'
      );
    } catch (err) {
      toast.error(err.message || 'Failed to update status');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleReopen = async () => {
    try {
      setStatusUpdating(true);
      await adminReopenGuestOrder(order.id, 'Cancelled in error');
      await load();
      toast.success('Order reopened — back in the queue');
    } catch (err) {
      toast.error(err.message || 'Failed to reopen order');
    } finally {
      setStatusUpdating(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    load()
      .catch((err) => {
        if (!cancelled) toast.error(err.message || 'Failed to load guest order');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [orderId]);

  const details = order?.delivery_details || {};
  const hasDelivery = Boolean(details.address || Number(order?.delivery_fee) > 0);
  const waybill = order?.shipment?.waybill_number;
  const fulfillment = order?.fulfillment_status || 'pending';
  const isPaid = order?.payment_status === 'payment_success';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2389E3]" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-16 text-gray-500">Guest order not found.</div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate('/admin/orders?tab=guest')}
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back to guest orders
      </button>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Guest renewal</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {order.plate_number} · {order.created_at ? new Date(order.created_at).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : '—'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${STATUS_BADGE[order.payment_status] || 'bg-gray-100 text-gray-700'}`}>
            {STATUS_LABEL[order.payment_status] || order.payment_status}
          </span>
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${FULFILLMENT_BADGE[fulfillment] || 'bg-gray-100 text-gray-700'}`}>
            {FULFILLMENT_LABEL[fulfillment] || fulfillment}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-gray-400" />
            Customer
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-gray-500">Name</dt>
              <dd className="font-medium text-gray-900">{order.guest_name}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Email</dt>
              <dd className="font-medium text-gray-900 break-all">{order.guest_email}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Phone</dt>
              <dd className="font-medium text-gray-900">{order.guest_phone || '—'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Plate number</dt>
              <dd className="font-medium text-gray-900">{order.plate_number}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-gray-500">Motoka account</dt>
              <dd className="font-medium text-gray-900">
                {order.linked_user_id ? (
                  <span className="inline-flex items-center gap-1 text-green-700">
                    <CheckBadgeIcon className="h-4 w-4" /> Linked to a registered account
                  </span>
                ) : (
                  'Guest — no account yet'
                )}
              </dd>
            </div>
            {order.car && (
              <div className="sm:col-span-2">
                <dt className="text-gray-500">Linked vehicle</dt>
                <dd className="font-medium text-gray-900">
                  {order.car.vehicle_make} {order.car.vehicle_model} · {order.car.registration_no}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ReceiptPercentIcon className="h-5 w-5 text-gray-400" />
            Order summary
          </h3>
          <ul className="divide-y divide-gray-100 text-sm">
            {(order.items || []).map((item) => (
              <li key={item.id} className="flex items-center justify-between py-2">
                <span className="text-gray-700">{item.name}</span>
                <span className="font-medium text-gray-900">
                  {item.price != null ? formatNairaFromKobo(item.price) : '—'}
                </span>
              </li>
            ))}
            {(!order.items || order.items.length === 0) && (
              <li className="py-2 text-gray-500">No line items recorded.</li>
            )}
            {Number(order.delivery_fee) > 0 && (
              <li className="flex items-center justify-between py-2">
                <span className="text-gray-700">Delivery fee</span>
                <span className="font-medium text-gray-900">{formatNairaFromKobo(order.delivery_fee)}</span>
              </li>
            )}
            <li className="flex items-center justify-between py-3 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Total paid</span>
              <span className="font-bold text-gray-900">{formatNairaFromKobo(order.total_amount)}</span>
            </li>
          </ul>
          <dl className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-gray-500">Gateway</dt>
              <dd className="font-medium text-gray-900 capitalize">{order.payment_gateway || '—'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Reference</dt>
              <dd className="font-medium text-gray-900 break-all">{order.payment_reference || '—'}</dd>
            </div>
          </dl>
        </div>
          </div>

          {isPaid && (
            <ScheduleHoldCard order={order} onChanged={load} />
          )}

          {hasDelivery && (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{details.address || '—'}</p>
                    <p className="text-sm text-gray-500">{details.state} {details.lga ? `, ${details.lga}` : ''}</p>
                  </div>
                </div>
                {details.contact && (
                  <div className="flex items-center">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <p className="text-sm text-gray-900">{details.contact}</p>
                  </div>
                )}
                <p className="text-sm text-gray-500">
                  Delivery fee paid by customer: {formatNairaFromKobo(order.delivery_fee)}
                </p>
                <div className="border-t border-gray-100 pt-4 mt-2">
                  <div className="flex items-center gap-2 mb-3">
                    <TruckIcon className="h-5 w-5 text-gray-400" />
                    <p className="text-sm font-medium text-gray-900">Courier shipment</p>
                  </div>
                  <ShipmentTracker
                    progress={order.progress}
                    compact
                    admin
                    labelUrl={order.shipment?.label_url}
                  />
                  {!waybill && isPaid && (
                    <div className="space-y-3 mt-4">
                      <label className="block text-xs text-gray-500">
                        Actual weight (kg) — optional scale override (min 0.1)
                        <input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={actualWeightKg}
                          onChange={(e) => setActualWeightKg(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                          placeholder="Leave blank to use estimate"
                        />
                      </label>
                      <button
                        type="button"
                        disabled={shipmentBusy}
                        onClick={async () => {
                          try {
                            setShipmentBusy(true);
                            const shipment = await adminCreateShipment({
                              guest_order_id: order.id,
                              order_type: 'guest_renewal',
                              weight_kg: actualWeightKg ? Number(actualWeightKg) : undefined,
                            });
                            notifyFeeMismatch(shipment);
                            await load();
                          } catch (err) {
                            toast.error(err.message || 'Failed to generate waybill');
                          } finally {
                            setShipmentBusy(false);
                          }
                        }}
                        className="w-full bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-900 disabled:opacity-50 text-sm font-medium"
                      >
                        {shipmentBusy ? 'Generating…' : 'Generate waybill'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Actions — mirrors the signed-in Order Details flow */}
        <div className="space-y-6">
          <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Order Actions</h3>
            <div className="space-y-3">
              {!isPaid && (
                <p className="text-sm text-gray-500">
                  Fulfilment unlocks once payment succeeds. This order is currently {STATUS_LABEL[order.payment_status] || order.payment_status}.
                </p>
              )}

              {isPaid && fulfillment === 'pending' && (
                <>
                  <p className="text-sm text-gray-500">
                    Mark this order as In Progress when you start processing it.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleStatusUpdate('processing')}
                    disabled={statusUpdating}
                    className="w-full rounded-lg bg-[#2389E3] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2389E3]/90 disabled:opacity-50"
                  >
                    {statusUpdating ? 'Updating…' : 'Mark In Progress'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusUpdate('cancelled')}
                    disabled={statusUpdating}
                    className="w-full rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    Decline Order
                  </button>
                </>
              )}

              {isPaid && fulfillment === 'processing' && (
                <>
                  <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 border-b border-gray-200">
                      <DocumentArrowUpIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">Upload Document</span>
                      {documents.length > 0 && (
                        <span className="ml-auto text-xs text-gray-400">{documents.length} uploaded</span>
                      )}
                    </div>
                    <div className="p-3 space-y-2">
                      {!order?.car?.slug && (
                        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-2">
                          No car linked yet — documents unlock after the guest registers and adds this vehicle.
                        </p>
                      )}
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                      >
                        {DOC_CATEGORIES.map((c) => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                        onChange={(e) => setUploadFile(e.target.files[0] || null)}
                        className="w-full text-sm text-gray-600 file:mr-2 file:rounded-lg file:border-0 file:bg-[#2389E3]/5 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-[#2389E3] hover:file:bg-[#2389E3]/10"
                      />
                      <button
                        type="button"
                        onClick={handleDocumentUpload}
                        disabled={uploading || !uploadFile || !order?.car?.slug}
                        className="w-full rounded-lg bg-[#2389E3] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2389E3]/90 disabled:opacity-50"
                      >
                        {uploading ? 'Uploading…' : 'Upload'}
                      </button>
                    </div>
                    {docsLoading ? (
                      <div className="flex justify-center py-3 border-t border-gray-100">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#2389E3]" />
                      </div>
                    ) : documents.length > 0 && (
                      <div className="border-t border-gray-100 divide-y divide-gray-50">
                        {documents.map((doc) => (
                          <div key={doc.id} className="flex items-center gap-2 px-3 py-2">
                            <DocumentIcon className="h-4 w-4 text-[#2389E3] shrink-0" />
                            <span className="flex-1 truncate text-xs text-gray-700">
                              {DOC_CATEGORIES.find((c) => c.value === doc.document_category)?.label || 'Document'}
                            </span>
                            <a
                              href={doc.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStatusUpdate('completed')}
                    disabled={statusUpdating}
                    className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    {statusUpdating ? 'Updating…' : 'Mark as Completed'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusUpdate('cancelled')}
                    disabled={statusUpdating}
                    className="w-full rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    Decline Order
                  </button>
                </>
              )}

              {(fulfillment === 'completed' || fulfillment === 'cancelled') && (
                <div className={`py-3 rounded-lg text-center text-sm font-medium ${
                  fulfillment === 'completed' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  Order {fulfillment === 'completed' ? 'Completed' : 'Cancelled'}
                </div>
              )}

              {fulfillment === 'cancelled' && (
                <>
                  <p className="text-sm text-gray-500">
                    Cancelled by mistake? Reopen it to put the order back in the queue.
                  </p>
                  <button
                    type="button"
                    onClick={handleReopen}
                    disabled={statusUpdating}
                    className="w-full rounded-lg bg-[#2389E3] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2389E3]/90 disabled:opacity-50"
                  >
                    {statusUpdating ? 'Reopening…' : 'Reopen Order'}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Payment Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Gateway</span>
                <span className="font-medium text-gray-900 capitalize">{order.payment_gateway || '—'}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-gray-500">Reference</span>
                <span className="font-medium text-gray-900 break-all text-right">{order.payment_reference || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fulfilment</span>
                <span className="font-medium text-gray-900">{FULFILLMENT_LABEL[fulfillment]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
