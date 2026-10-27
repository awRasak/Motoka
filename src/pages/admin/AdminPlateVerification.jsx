import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  RefreshIcon,
  CopyIcon,
  ExternalLinkIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
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
  BTN_PRIMARY,
  BTN_SECONDARY,
  BTN_DANGER,
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
  const [selectedForAction, setSelectedForAction] = useState({ userId: null, action: null });

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
    toast.info(`Plate ${plate} copied. Verify on autoreg.ng, then mark below.`);
  };

  const handleVerify = async (userId) => {
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
        body: JSON.stringify({ note: 'Verified via autoreg.ng portal' }),
      });
      const data = await res.json();
      if (data.status) {
        toast.success(data.message || 'Plate verified — ₦2,000 credited');
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
    const reason = prompt('Reason for rejection:');
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
        toast.success(data.message || 'Plate rejected');
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
        <PageHeader icon={ClockIcon} title="Plate Verification Queue" subtitle="Users awaiting plate verification before their ₦2,000 signup bonus is credited." />
        <EmptyState icon={ClockIcon} title="No pending verifications" body="All plates have been verified or rejected." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={ClockIcon}
        title="Plate Verification Queue"
        subtitle="Verify plates on autoreg.ng, then approve or reject below. Verified users get ₦2,000 credited to their wallet."
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
                <TH>Bonus Credited</TH>
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
                    <StatusBadge tone={item.plate_bonus_credited ? 'green' : 'gray'}>{item.plate_bonus_credited ? 'Yes' : 'No'}</StatusBadge>
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
                            <ExternalLinkIcon className="h-3 w-3" /> Verify
                          </button>
                          <button
                            onClick={() => handleVerify(item.id)}
                            disabled={isActionLoading(item.id)}
                            className="text-green-600 hover:underline text-xs font-medium disabled:opacity-50"
                          >
                            {isActionLoading(item.id) ? '…' : 'Approve + ₦2k'}
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            disabled={isActionLoading(item.id)}
                            className="text-red-600 hover:underline text-xs disabled:opacity-50"
                          >
                            {isActionLoading(item.id) ? '…' : 'Reject'}
                          </button>
                        </>
                      )}
                      {item.plate_verification_status === 'verified' && (
                        <span className="text-xs text-green-600">Verified</span>
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
                <RefreshIcon className="h-4 w-4 rotate-180" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                <RefreshIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminPlateVerification;
