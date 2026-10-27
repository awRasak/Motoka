import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  CopyIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PlusIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { supabase } from '../../config/supabaseClient';
import config from '../../config/config';
import {
  PageHeader,
  Card,
  StatusBadge,
  PageLoader,
  EmptyState,
  TH,
  TD,
  INPUT,
} from '../../components/admin/ui';

const STATUS_LABELS = {
  pending: 'Pending',
  verified: 'Verified',
  rejected: 'Rejected',
};

const STATUS_TONE = {
  pending: 'yellow',
  verified: 'green',
  rejected: 'red',
};

const AdminPlateVerification = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [actionLoading, setActionLoading] = useState(new Set());
  const [verifyUrl, setVerifyUrl] = useState('https://verify.autoreg.ng/');
  // Car detail capture modal state
  const [captureModal, setCaptureModal] = useState({
    isOpen: false,
    userId: null,
    plateNumber: '',
    chassis_number: '',
    car_color: '',
    car_brand: '',
    car_model: '',
    car_year: '',
  });

  useEffect(() => {
    fetchVerifyUrl();
    fetchItems();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchVerifyUrl = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const res = await fetch(`${config.getApiBaseUrl()}/admin/plate-verifications/verify-url`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const data = await res.json();
      if (data.status && data.data?.url) setVerifyUrl(data.data.url);
    } catch {
      // keep default
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/admin/login'); return; }

      const params = new URLSearchParams({
        page: currentPage,
        limit: 15,
        search: searchTerm,
        status: statusFilter,
      });

      const res = await fetch(`${config.getApiBaseUrl()}/admin/plate-verifications?${params}`, {
        headers: { Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.status) {
        setItems(data.data.verifications || []);
        setTotal(data.data.pagination.total || 0);
        setTotalPages(data.data.pagination.totalPages || 1);
      } else {
        toast.error(data.message || 'Failed to load verifications');
      }
    } catch (error) {
      console.error('Error fetching plate verifications:', error);
      toast.error('Failed to load verifications');
    } finally {
      setLoading(false);
    }
  };

  const isActionLoading = (id) => actionLoading.has(id);

  const copyPlate = async (plate) => {
    if (!plate) return;
    try {
      await navigator.clipboard.writeText(plate);
      toast.success(`Plate ${plate} copied to clipboard`);
    } catch {
      toast.error('Could not copy plate');
    }
  };

  const openVerifyPortal = (plate) => {
    if (!plate) return;
    copyPlate(plate);
    window.open(verifyUrl, '_blank', 'noopener');
    toast.info(`Plate ${plate} copied. Verify on autoreg.ng, then approve below.`);
  };

  const openCaptureModal = (userId, plateNumber) => {
    setCaptureModal({
      isOpen: true,
      userId,
      plateNumber,
      chassis_number: '',
      car_color: '',
      car_brand: '',
      car_model: '',
      car_year: '',
    });
  };

  const closeCaptureModal = () => setCaptureModal((prev) => ({ ...prev, isOpen: false }));

  const handleCaptureChange = (key, value) => {
    setCaptureModal((prev) => ({ ...prev, [key]: value }));
  };

  const handleVerifyWithDetails = async () => {
    const { userId, plateNumber, chassis_number, car_color, car_brand, car_model, car_year } = captureModal;
    if (!userId) return;
    if (actionLoading.has(userId)) return;

    setActionLoading((prev) => new Set([...prev, userId]));
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${config.getApiBaseUrl()}/admin/plate-verifications/${userId}/verify`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          note: 'Verified via autoreg.ng portal — car details captured',
          chassis_number: chassis_number || null,
          car_color: car_color || null,
          car_brand: car_brand || null,
          car_model: car_model || null,
          car_year: car_year ? Number(car_year) : null,
        }),
      });
      const data = await res.json();
      if (data.status) {
        toast.success(`Plate ${plateNumber} verified. Car details saved.`);
        closeCaptureModal();
        fetchItems();
      } else {
        toast.error(data.message || 'Verification failed');
      }
    } catch {
      toast.error('Verification failed');
    } finally {
      setActionLoading((prev) => { const next = new Set(prev); next.delete(userId); return next; });
    }
  };

  const handleReject = async (userId) => {
    if (actionLoading.has(userId)) return;
    const reason = prompt('Reason for rejection (bonus will be clawed back):');
    if (!reason || !reason.trim()) return;
    setActionLoading((prev) => new Set([...prev, userId]));
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${config.getApiBaseUrl()}/admin/plate-verifications/${userId}/reject`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: reason.trim() }),
      });
      const data = await res.json();
      if (data.status) {
        toast.success(data.clawedBack ? 'Rejected — ₦2,000 clawed back from wallet' : 'Plate rejected');
        fetchItems();
      } else {
        toast.error(data.message || 'Rejection failed');
      }
    } catch {
      toast.error('Rejection failed');
    } finally {
      setActionLoading((prev) => { const next = new Set(prev); next.delete(userId); return next; });
    }
  };

  if (loading) return <PageLoader />;

  if (items.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader icon={ClockIcon} title="Plate Verification Queue" subtitle="Users who signed up with a plate number. ₦2,000 is already credited — verify on autoreg.ng, then approve or reject (clawback) below." />
        <EmptyState icon={ClockIcon} title="No pending verifications" body="All plates have been verified or rejected." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={ClockIcon}
        title="Plate Verification Queue"
        subtitle="₦2,000 signup bonus is already credited. Verify on autoreg.ng, then approve (keep bonus) or reject (clawback ₦2,000). Capture car details to pre-fill add-car."
      />

      <Card className="overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <input
              type="search"
              placeholder="Search plate number…"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className={INPUT}
            />
            <button
              onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
              className="text-gray-400 hover:text-gray-600"
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            {['pending', 'verified', 'rejected', 'all'].map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s === 'all' ? 'pending' : s); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  (statusFilter === 'pending' && s === 'pending') ||
                  (statusFilter === 'verified' && s === 'verified') ||
                  (statusFilter === 'rejected' && s === 'rejected') ||
                  (statusFilter === 'pending' && s === 'all')
                    ? 'bg-[#2389E3] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <TH>Plate</TH>
                <TH>User</TH>
                <TH>Phone</TH>
                <TH>Status</TH>
                <TH>Bonus</TH>
                <TH>Created</TH>
                <TH className="text-right">Actions</TH>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className={TD}>
                    <div className="text-sm font-medium text-gray-900">{item.plate_number}</div>
                    <div className="text-xs text-gray-500">{item.user_id}</div>
                  </td>
                  <td className={TD}>
                    <div className="text-sm font-medium text-gray-900">{item.first_name} {item.last_name}</div>
                    <div className="text-xs text-gray-500">{item.phone_number}</div>
                  </td>
                  <td className={TD}>
                    <StatusBadge tone={STATUS_TONE[item.plate_verification_status] || 'gray'}>{STATUS_LABELS[item.plate_verification_status]}</StatusBadge>
                  </td>
                  <td className={TD}>
                    <StatusBadge tone={item.plate_bonus_credited ? 'green' : 'gray'}>{item.plate_bonus_credited ? '₦2k credited' : '—'}</StatusBadge>
                  </td>
                  <td className={TD}>
                    <div className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</div>
                  </td>
                  <td className={`${TD} text-right`}>
                    <div className="flex items-center justify-end gap-2">
                      {item.plate_verification_status === 'pending' && (
                        <>
                          <button
                            onClick={() => openVerifyPortal(item.plate_number)}
                            className="text-[#2389E3] hover:underline text-xs flex items-center gap-1"
                            title="Open autoreg.ng & copy plate"
                          >
                            <ArrowTopRightOnSquareIcon className="h-3 w-3" /> Verify on portal
                          </button>
                          <button
                            onClick={() => openCaptureModal(item.id, item.plate_number)}
                            disabled={isActionLoading(item.id)}
                            className="text-green-600 hover:underline text-xs font-medium flex items-center gap-1 disabled:opacity-50"
                          >
                            <CheckCircleIcon className="h-3 w-3" /> Approve + capture details
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            disabled={isActionLoading(item.id)}
                            className="text-red-600 hover:underline text-xs disabled:opacity-50"
                          >
                            {isActionLoading(item.id) ? '…' : 'Reject + clawback'}
                          </button>
                        </>
                      )}
                      {item.plate_verification_status === 'verified' && (
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          <CheckCircleIcon className="h-3 w-3" /> Verified
                        </span>
                      )}
                      {item.plate_verification_status === 'rejected' && (
                        <span className="text-xs text-red-600">Rejected</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-sm">
            <div className="text-gray-500">Showing page {currentPage} of {totalPages}</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                <ArrowPathIcon className="h-4 w-4 rotate-180" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                <ArrowPathIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* ── Car detail capture modal ── */}
      {captureModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={closeCaptureModal} />
          <Card className="relative w-full max-w-md mx-4 bg-white">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Capture Car Details</h3>
              <button onClick={closeCaptureModal} className="text-gray-400 hover:text-gray-600">
                <XCircleIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-500">
                Plate: <span className="font-mono text-gray-900">{captureModal.plateNumber}</span><br />
                Enter what you observed on autoreg.ng to pre-fill the add-car form later.
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Chassis Number</label>
                  <input
                    type="text"
                    value={captureModal.chassis_number}
                    onChange={(e) => handleCaptureChange('chassis_number', e.target.value)}
                    placeholder="e.g. VIN1234567890"
                    className={INPUT}
                    autoCapitalize="characters"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
                  <input
                    type="text"
                    value={captureModal.car_color}
                    onChange={(e) => handleCaptureChange('car_color', e.target.value)}
                    placeholder="e.g. Silver, Black, Red"
                    className={INPUT}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Brand (Make)</label>
                    <input
                      type="text"
                      value={captureModal.car_brand}
                      onChange={(e) => handleCaptureChange('car_brand', e.target.value)}
                      placeholder="e.g. Toyota"
                      className={INPUT}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Model</label>
                    <input
                      type="text"
                      value={captureModal.car_model}
                      onChange={(e) => handleCaptureChange('car_model', e.target.value)}
                      placeholder="e.g. Corolla"
                      className={INPUT}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="number"
                    value={captureModal.car_year}
                    onChange={(e) => handleCaptureChange('car_year', e.target.value)}
                    placeholder="e.g. 2020"
                    className={INPUT}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={closeCaptureModal}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerifyWithDetails}
                  disabled={isActionLoading(captureModal.userId)}
                  className="px-4 py-2 rounded-lg bg-[#2389E3] text-white hover:bg-[#1d6fb4] disabled:opacity-50 text-sm font-medium"
                >
                  {isActionLoading(captureModal.userId) ? 'Saving…' : 'Verify & Save Details'}
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminPlateVerification;
