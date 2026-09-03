import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { toast } from 'react-hot-toast';
import { supabase } from '../../config/supabaseClient';
import config from '../../config/config';
import AddCarModal from '../../components/admin/AddCarModal';

const AdminUserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [ledger, setLedger] = useState([]);
  const [walletLoading, setWalletLoading] = useState(true);
  const [walletAvailable, setWalletAvailable] = useState(true);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustDirection, setAdjustDirection] = useState('credit');
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustReason, setAdjustReason] = useState('');
  const [adjustLoading, setAdjustLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  const getToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
      return null;
    }
    return session.access_token;
  };

  const fetchUserDetails = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) return;

      const response = await fetch(
        `${config.getApiBaseUrl()}/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (data.status) {
        setUser(data.data.user);
        setStats(data.data.stats || {
          pending_orders: 0,
          total_spent: 0,
          last_activity: data.data.user?.updated_at,
        });
      } else {
        toast.error(data.message || 'Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error('Failed to load user details');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  // Wallet's own envelope is { success, message, data } (the shared
  // response.js helper), not the { status, message, data } shape the rest of
  // this page uses (admin.controller.js predates that helper) — checking
  // data.status here would silently treat every successful wallet fetch as a
  // failure, so this stays on data.success deliberately.
  const fetchWallet = useCallback(async () => {
    try {
      setWalletLoading(true);
      const token = await getToken();
      if (!token) return;

      const response = await fetch(
        `${config.getApiBaseUrl()}/admin/wallets/${userId}/ledger`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 404) {
        // Wallet feature is flagged off in this environment — not an error.
        setWalletAvailable(false);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setWallet(data.data.wallet);
        setLedger(data.data.entries || []);
      } else {
        toast.error(data.message || 'Failed to fetch wallet');
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
      toast.error('Failed to load wallet');
    } finally {
      setWalletLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  const handleAdjustWallet = async (e) => {
    e.preventDefault();
    const amountNum = Number(adjustAmount);
    if (!Number.isFinite(amountNum) || amountNum <= 0) {
      toast.error('Enter a valid amount');
      return;
    }
    if (!adjustReason.trim()) {
      toast.error('A reason is required');
      return;
    }

    try {
      setAdjustLoading(true);
      const token = await getToken();
      if (!token) return;

      const response = await fetch(
        `${config.getApiBaseUrl()}/admin/wallets/${userId}/adjust`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            direction: adjustDirection,
            amount: amountNum,
            reason: adjustReason.trim(),
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success(data.message || 'Wallet updated');
        setShowAdjustModal(false);
        setAdjustAmount('');
        setAdjustReason('');
        fetchWallet();
      } else {
        toast.error(data.message || 'Failed to adjust wallet');
      }
    } catch (error) {
      toast.error('Failed to adjust wallet');
    } finally {
      setAdjustLoading(false);
    }
  };

  const handleToggleFreeze = async () => {
    if (!wallet) return;
    const nextStatus = wallet.status === 'frozen' ? 'active' : 'frozen';

    try {
      setStatusLoading(true);
      const token = await getToken();
      if (!token) return;

      const response = await fetch(
        `${config.getApiBaseUrl()}/admin/wallets/${userId}/status`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: nextStatus }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success(data.message || `Wallet ${nextStatus === 'frozen' ? 'frozen' : 'unfrozen'}`);
        fetchWallet();
      } else {
        toast.error(data.message || 'Failed to update wallet status');
      }
    } catch (error) {
      toast.error('Failed to update wallet status');
    } finally {
      setStatusLoading(false);
    }
  };

  const handleBack = () => navigate('/admin/users');

  const handleSuspend = async () => {
    try {
      setActionLoading(true);
      const token = await getToken();
      if (!token) return;

      const response = await fetch(
        `${config.getApiBaseUrl()}/admin/users/${userId}/suspend`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (data.status) {
        toast.success('User suspended successfully');
        fetchUserDetails();
      } else {
        toast.error(data.message || 'Failed to suspend user');
      }
    } catch (error) {
      toast.error('Failed to suspend user');
    } finally {
      setActionLoading(false);
    }
  };

  const handleActivate = async () => {
    try {
      setActionLoading(true);
      const token = await getToken();
      if (!token) return;

      const response = await fetch(
        `${config.getApiBaseUrl()}/admin/users/${userId}/activate`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (data.status) {
        toast.success('User activated successfully');
        fetchUserDetails();
      } else {
        toast.error(data.message || 'Failed to activate user');
      }
    } catch (error) {
      toast.error('Failed to activate user');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      const token = await getToken();
      if (!token) return;

      const response = await fetch(
        `${config.getApiBaseUrl()}/admin/users/${userId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (data.status) {
        toast.success('User deleted successfully');
        setDeleteModal(false);
        setTimeout(() => navigate('/admin/users'), 1000);
      } else {
        toast.error(data.message || 'Failed to delete user');
      }
    } catch (error) {
      toast.error('Failed to delete user');
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount || 0);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-sm text-gray-500">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Icon icon="mdi:account-off" className="h-16 w-16 text-gray-400" />
        <p className="mt-4 text-base text-gray-500">User not found</p>
        <button
          onClick={handleBack}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 px-4 py-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Icon icon="mdi:arrow-left" className="h-4 w-4" />
          <span>Back to Users</span>
        </button>
        {!user.deleted_at && (
          <div className="flex gap-2">
            {user.is_suspended ? (
              <button
                onClick={handleActivate}
                disabled={actionLoading}
                className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              >
                <Icon icon="mdi:lock-open" className="h-4 w-4" />
                <span>Activate</span>
              </button>
            ) : (
              <button
                onClick={handleSuspend}
                disabled={actionLoading}
                className="flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              >
                <Icon icon="mdi:lock" className="h-4 w-4" />
                <span>Suspend</span>
              </button>
            )}
            <button
              onClick={() => setDeleteModal(true)}
              disabled={actionLoading}
              className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            >
              <Icon icon="mdi:delete" className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      {/* User Info Card */}
      <div className="rounded-lg bg-white p-5 shadow-sm border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-xl font-semibold text-blue-600">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-xl font-semibold text-gray-900 truncate">{user.name}</h1>
                <p className="text-xs text-gray-500 mt-0.5">User ID: {user.userId}</p>
              </div>
              <div className="flex-shrink-0">
                {user.deleted_at ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                    <Icon icon="mdi:delete" className="mr-1 h-3.5 w-3.5" />
                    Deleted
                  </span>
                ) : user.is_suspended ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700">
                    <Icon icon="mdi:lock" className="mr-1 h-3.5 w-3.5" />
                    Suspended
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700">
                    <Icon icon="mdi:check-circle" className="mr-1 h-3.5 w-3.5" />
                    Active
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="text-sm font-medium text-gray-900">{user.phone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Joined</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(user.created_at)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">User Type</p>
                <p className="text-sm font-medium text-gray-900 capitalize">{user.user_type || 'user'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Last Activity</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(stats?.last_activity)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Email Verified</p>
                <p className="text-sm font-medium text-gray-900">{user.email_verified_at ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Cars</p>
              <p className="text-2xl font-semibold text-gray-900">{user.cars_count || 0}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-2.5">
              <Icon icon="mdi:car" className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{user.orders_count || 0}</p>
            </div>
            <div className="rounded-full bg-green-100 p-2.5">
              <Icon icon="mdi:clipboard-list" className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Pending Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{stats?.pending_orders || 0}</p>
            </div>
            <div className="rounded-full bg-orange-100 p-2.5">
              <Icon icon="mdi:clock" className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Spent</p>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(stats?.total_spent)}</p>
            </div>
            <div className="rounded-full bg-purple-100 p-2.5">
              <Icon icon="mdi:cash" className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Wallet */}
      <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-900">Wallet</h2>
          {wallet && (
            <div className="flex gap-2">
              <button
                onClick={() => setShowAdjustModal(true)}
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
              >
                <Icon icon="mdi:cash-plus" className="h-3.5 w-3.5" />
                Adjust Balance
              </button>
              <button
                onClick={handleToggleFreeze}
                disabled={statusLoading}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  wallet.status === 'frozen'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon icon={wallet.status === 'frozen' ? 'mdi:lock-open' : 'mdi:snowflake'} className="h-3.5 w-3.5" />
                {wallet.status === 'frozen' ? 'Unfreeze' : 'Freeze'}
              </button>
            </div>
          )}
        </div>

        {walletLoading ? (
          <div className="py-8 text-center text-sm text-gray-500">Loading wallet…</div>
        ) : !walletAvailable ? (
          <div className="py-8 text-center">
            <Icon icon="mdi:wallet-outline" className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Wallet feature is not enabled in this environment</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Balance</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency((wallet?.balance_kobo || 0) / 100)}</p>
              </div>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                  wallet?.status === 'frozen' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}
              >
                <Icon icon={wallet?.status === 'frozen' ? 'mdi:snowflake' : 'mdi:check-circle'} className="mr-1 h-3.5 w-3.5" />
                {wallet?.status === 'frozen' ? 'Frozen' : 'Active'}
              </span>
            </div>

            <p className="text-xs font-medium text-gray-500 mb-2">Recent Transactions</p>
            {ledger.length > 0 ? (
              <div className="space-y-2">
                {ledger.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {entry.reason ? entry.reason.replace(/_/g, ' ') : entry.direction}
                      </p>
                      {entry.note && <p className="text-xs text-gray-500 mt-0.5 truncate">{entry.note}</p>}
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(entry.created_at)}</p>
                    </div>
                    <p className={`ml-3 text-sm font-semibold whitespace-nowrap ${entry.direction === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {entry.direction === 'credit' ? '+' : '-'}{formatCurrency(entry.amount_kobo / 100)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center">
                <p className="text-sm text-gray-500">No transactions yet</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Cars */}
        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900">Recent Cars</h2>
            <button
              onClick={() => setShowAddCarModal(true)}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <Icon icon="mdi:plus" className="h-3.5 w-3.5" />
              Add Car
            </button>
          </div>
          {user.cars && user.cars.length > 0 ? (
            <div className="space-y-2">
              {user.cars.map((car) => (
                <div
                  key={car.id}
                  onClick={() => window.location.href = `/admin/cars/${car.slug}`}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {car.vehicle_make} {car.vehicle_model}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {car.registration_no || 'No reg number'}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/admin/cars/${car.slug}`)}
                    className="ml-3 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Icon icon="mdi:arrow-right" className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Icon icon="mdi:car-off" className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No cars registered</p>
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Recent Orders</h2>
          {user.orders && user.orders.length > 0 ? (
            <div className="space-y-2">
              {user.orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate capitalize">
                      {order.order_type?.replace('_', ' ')}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 capitalize">
                      Status: {order.status}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/admin/orders/${order.slug}`)}
                    className="ml-3 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Icon icon="mdi:arrow-right" className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Icon icon="mdi:clipboard-off" className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Car Modal */}
      {showAddCarModal && (
        <AddCarModal
          preselectedUser={{
            id: userId,
            name: user.name,
            email: user.email,
            phone_number: user.phone,
          }}
          onClose={() => setShowAddCarModal(false)}
          onSuccess={() => {
            setShowAddCarModal(false);
            fetchUserDetails();
          }}
        />
      )}

      {/* Adjust Wallet Modal */}
      {showAdjustModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl">
            <h3 className="mb-4 text-base font-semibold text-gray-900">Adjust Wallet Balance</h3>
            <form onSubmit={handleAdjustWallet} className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAdjustDirection('credit')}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    adjustDirection === 'credit'
                      ? 'border-green-600 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Credit (Add)
                </button>
                <button
                  type="button"
                  onClick={() => setAdjustDirection('debit')}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    adjustDirection === 'debit'
                      ? 'border-red-600 bg-red-50 text-red-700'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Debit (Remove)
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Amount (NGN)</label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={adjustAmount}
                  onChange={(e) => setAdjustAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Reason (required)</label>
                <textarea
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  placeholder="e.g. Manual bank transfer confirmed 02-Sep, ref MTK-2201"
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAdjustModal(false)}
                  disabled={adjustLoading}
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adjustLoading}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                  {adjustLoading ? 'Saving…' : 'Confirm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-center">
              <div className="rounded-full bg-red-100 p-2.5">
                <Icon icon="mdi:alert" className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <h3 className="mb-2 text-center text-base font-semibold text-gray-900">Delete User</h3>
            <p className="mb-5 text-center text-sm text-gray-600">
              Are you sure you want to delete{' '}
              <span className="font-medium text-gray-900">{user.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(false)}
                disabled={actionLoading}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={actionLoading}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              >
                {actionLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserDetails;
