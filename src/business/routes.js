export const BUSINESS = {
  overview: '/business',
  vehicles: '/business/vehicles',
  documents: '/business/documents',
  renewals: '/business/renewals',
  drivers: '/business/drivers',
  payments: '/business/payments',
  reports: '/business/reports',
};

export const BUSINESS_NAV = [
  { to: BUSINESS.overview, icon: 'home', label: 'Overview', end: true },
  { to: BUSINESS.vehicles, icon: 'truck', label: 'Vehicles' },
  { to: BUSINESS.documents, icon: 'doc', label: 'Documents' },
  { to: BUSINESS.renewals, icon: 'arrows', label: 'Renewals (9)', badge: true },
  { to: BUSINESS.drivers, icon: 'users', label: 'Drivers' },
  { to: BUSINESS.payments, icon: 'wallet', label: 'Payments' },
  { to: BUSINESS.reports, icon: 'chart', label: 'Reports' },
];
