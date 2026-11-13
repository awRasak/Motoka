// Demo data for the Motoka Business portal.
// The figures mirror the approved design mockup (motoka business/dashboard)
// so the React port stays visually identical. Swap these exports for API
// responses when the fleet endpoints land.

export const FLEET = {
  company: 'Eko Drive Partners',
  manager: 'Adaeze Okafor',
  role: 'Fleet manager',
  initials: 'AO',
  dateRange: '1 Oct – 4 Nov 2026',
};

export const KPIS = [
  { label: 'Total vehicles', value: '48', note: 'Across Lagos, Ibadan and Abuja' },
  { label: 'Expiring in 30 days', value: '6', note: 'Next one on 10 Nov', tone: 'warn' },
  { label: 'Expired', value: '3', note: 'Oldest expired 12 Oct', tone: 'bad' },
  { label: 'Due this month', value: '₦1,284,500', note: '9 renewals · fees at cost' },
];

export const COMPLIANCE = {
  score: '81%',
  compliant: 81,
  expiring: 13,
  expired: 6,
  total: 48,
};

export const EXPIRY_DATASETS = {
  weekly: {
    values: [1, 2, 2, 1, 3, 5, 2, 4, 5, 4, 4, 4, 4],
    labels: ['4 Nov', null, null, null, null, '9 Dec', null, null, null, null, '13 Jan', null, null],
    yMax: 6,
    ticks: [0, 2, 4, 6],
    peak: 5,
    tip: 'Week 6: 5 expiries',
    aria:
      'Bar chart of document expiries per week for the next 13 weeks, peaking at 5 in week 6',
  },
  monthly: {
    values: [6, 14, 21],
    labels: ['Nov', 'Dec', 'Jan'],
    yMax: 24,
    ticks: [0, 6, 12, 18, 24],
    peak: 2,
    tip: 'Jan: 21 expiries',
    aria: 'Bar chart of document expiries per month: November 6, December 14, January 21',
  },
};

export const EXPIRY_SUMMARY = [
  { label: 'Next 7 days', value: '1' },
  { label: 'Next 30 days', value: '6' },
  { label: 'Next 90 days', value: '41' },
];

export const WALLET = {
  balance: '₦850,000',
  shortBy: '₦434,500',
  covers: 'Covers 6 of 9 renewals',
};

export const DOC_COUNTS = [
  { label: 'Vehicle licence', value: '44', of: 'of 48' },
  { label: 'Insurance', value: '42', of: 'of 48' },
  { label: 'Roadworthiness', value: '39', of: 'of 48' },
  { label: 'Hackney permits', value: '9', of: 'of 12' },
];

export const ACTION_ITEMS = [
  { plate: 'LND-482XY', doc: 'Roadworthiness', label: 'Expired 12 Oct', status: 'expired', driver: 'Kunle Adebayo', initials: 'KA' },
  { plate: 'KJA-317AB', doc: 'Insurance', label: 'Expired 28 Oct', status: 'expired', driver: 'Sade Bakare', initials: 'SB' },
  { plate: 'BRT-094LM', doc: 'Hackney permit', label: 'Expired 2 Nov', status: 'expired', driver: 'Ifeoma Obi', initials: 'IO' },
  { plate: 'APP-126GH', doc: 'Vehicle licence', label: 'Due in 6 days · 10 Nov', status: 'due', driver: 'Chidi Nwosu', initials: 'CN' },
  { plate: 'LSD-640KE', doc: 'Hackney permit', label: 'Due in 10 days · 14 Nov', status: 'due', driver: 'Musa Ibrahim', initials: 'MI' },
  { plate: 'DKT-771BA', doc: 'Insurance', label: 'Due in 14 days · 18 Nov', status: 'due', driver: 'Amaka Eze', initials: 'AE' },
  { plate: 'QRS-215NA', doc: 'Roadworthiness', label: 'Due in 17 days · 21 Nov', status: 'due', driver: 'Tayo Lawal', initials: 'TL' },
  { plate: 'EPA-368KJ', doc: 'Vehicle licence', label: 'Due in 21 days · 25 Nov', status: 'due', driver: 'Bisi Adeyemi', initials: 'BA' },
  { plate: 'MNO-840TU', doc: 'Insurance', label: 'Due in 24 days · 28 Nov', status: 'due', driver: 'Emeka Okoro', initials: 'EO' },
];

export const ACTIVITY = [
  { initials: 'TB', text: 'approved 6 renewals', person: 'Tunde Bello', meta: '₦412,000 · 2h ago' },
  { initials: 'EK', text: 'roadworthiness verified', person: 'EKY-905CD', meta: 'Agency record matched · Yesterday' },
  { initials: 'FK', text: 'renewal submitted', person: 'FKJ-209RT', meta: 'Vehicle licence · 2d ago' },
  { initials: 'KA', text: 'uploaded a certificate', person: 'Kunle Adebayo', meta: 'LND-482XY · 3d ago' },
  { initials: 'SB', text: 'added a driver', person: 'Sade Bakare', meta: 'Vehicle KJA-317AB · 4d ago' },
  { initials: 'TB', text: 'of ₦500,000 to fleet wallet', person: 'Top-up', meta: 'Paid by Adaeze Okafor · 5d ago' },
];

export const VEHICLES = [
  { plate: 'LND-482XY', vehicle: 'Toyota Hiace · 2019', branch: 'Lagos', driver: 'Kunle Adebayo', status: 'Roadworthiness expired', tone: 'bad', expiry: '12 Oct 2026', validDocs: '2 of 3' },
  { plate: 'KJA-317AB', vehicle: 'Toyota Corolla · 2017', branch: 'Abuja', driver: 'Sade Bakare', status: 'Insurance expired', tone: 'bad', expiry: '28 Oct 2026', validDocs: '2 of 3' },
  { plate: 'BRT-094LM', vehicle: 'Mercedes Sprinter · 2016', branch: 'Ibadan', driver: 'Ifeoma Obi', status: 'Permit expired', tone: 'bad', expiry: '2 Nov 2026', validDocs: '1 of 2' },
  { plate: 'APP-126GH', vehicle: 'Honda Accord · 2015', branch: 'Lagos', driver: 'Chidi Nwosu', status: 'Licence due in 6 days', tone: 'warn', expiry: '10 Nov 2026', validDocs: '2 of 3' },
  { plate: 'LSD-640KE', vehicle: 'Toyota Hiace · 2018', branch: 'Lagos', driver: 'Musa Ibrahim', status: 'Permit due in 10 days', tone: 'warn', expiry: '14 Nov 2026', validDocs: '1 of 2' },
  { plate: 'DKT-771BA', vehicle: 'Hyundai Elantra · 2020', branch: 'Abuja', driver: 'Amaka Eze', status: 'Insurance due in 14 days', tone: 'warn', expiry: '18 Nov 2026', validDocs: '2 of 3' },
  { plate: 'QRS-215NA', vehicle: 'Nissan Urvan · 2018', branch: 'Lagos', driver: 'Tayo Lawal', status: 'Roadworthiness due in 17 days', tone: 'warn', expiry: '21 Nov 2026', validDocs: '2 of 3' },
  { plate: 'EKY-905CD', vehicle: 'Toyota Camry · 2021', branch: 'Ibadan', driver: 'Bisi Adeyemi', status: 'All documents valid', tone: 'good', expiry: '—', validDocs: '3 of 3' },
  { plate: 'FKJ-209RT', vehicle: 'Kia Sportage · 2019', branch: 'Lagos', driver: 'Emeka Okoro', status: 'Licence renewal processing', tone: 'good', expiry: '—', validDocs: '2 of 3' },
  { plate: 'MUS-731PQ', vehicle: 'Toyota Hiace · 2020', branch: 'Abuja', driver: 'Ngozi Eze', status: 'Insurance with agency', tone: 'good', expiry: '—', validDocs: '2 of 3' },
];

export const VEHICLE_FILTERS = [
  { key: 'all', label: 'All', count: 48 },
  { key: 'compliant', label: 'Compliant', count: 39 },
  { key: 'expiring', label: 'Expiring', count: 6 },
  { key: 'expired', label: 'Expired', count: 3 },
];

export const DOC_SUMMARY = [
  { label: 'Vehicle licence', valid: '44 of 48 valid', percent: 92, tone: 'good', expiring: 2 },
  { label: 'Insurance', valid: '42 of 48 valid', percent: 88, tone: 'warn', expiring: 3 },
  { label: 'Roadworthiness', valid: '39 of 48 valid', percent: 81, tone: 'warn', expiring: 4 },
  { label: 'Hackney permits', valid: '9 of 12 valid', percent: 75, tone: 'bad', expiring: 2 },
];

export const DOCUMENTS = [
  { plate: 'LND-482XY', document: 'Roadworthiness', issued: '12 Mar 2026', expires: '12 Oct 2026', status: 'Expired', tone: 'bad', filter: 'expired' },
  { plate: 'KJA-317AB', document: 'Insurance', issued: '28 Oct 2025', expires: '28 Oct 2026', status: 'Expired', tone: 'bad', filter: 'expired' },
  { plate: 'BRT-094LM', document: 'Hackney permit', issued: '2 Nov 2025', expires: '2 Nov 2026', status: 'Expired', tone: 'bad', filter: 'expired' },
  { plate: 'APP-126GH', document: 'Vehicle licence', issued: '10 Nov 2025', expires: '10 Nov 2026', status: 'Due in 6 days', tone: 'warn', filter: 'due' },
  { plate: 'LSD-640KE', document: 'Hackney permit', issued: '14 Nov 2025', expires: '14 Nov 2026', status: 'Due in 10 days', tone: 'warn', filter: 'due' },
  { plate: 'EKY-905CD', document: 'Roadworthiness', issued: '3 Jun 2026', expires: '3 Dec 2026', status: 'Verified', tone: 'good', filter: 'verified' },
];

export const DOCUMENT_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'expired', label: 'Expired' },
  { key: 'due', label: 'Due soon' },
  { key: 'verified', label: 'Verified' },
];

export const RENEWAL_COLUMNS = [
  {
    key: 'queued',
    label: 'Queued',
    tasks: [
      { plate: 'LND-482XY', amount: '₦128,000', detail: 'Roadworthiness · Expired 12 Oct', driver: 'Kunle Adebayo', initials: 'KA' },
      { plate: 'KJA-317AB', amount: '₦96,500', detail: 'Insurance · Expired 28 Oct', driver: 'Sade Bakare', initials: 'SB' },
      { plate: 'APP-126GH', amount: '₦74,000', detail: 'Vehicle licence · Due 10 Nov', driver: 'Chidi Nwosu', initials: 'CN' },
      { plate: 'LSD-640KE', amount: '₦185,000', detail: 'Hackney permit · Due 14 Nov', driver: 'Musa Ibrahim', initials: 'MI' },
    ],
  },
  {
    key: 'submitted',
    label: 'Submitted',
    tasks: [
      { plate: 'BRT-094LM', amount: '₦210,000', detail: 'Hackney permit · Submitted 1 Nov', driver: 'Ifeoma Obi', initials: 'IO' },
      { plate: 'DKT-771BA', amount: '₦142,000', detail: 'Insurance · Submitted 2 Nov', driver: 'Amaka Eze', initials: 'AE' },
    ],
  },
  {
    key: 'agency',
    label: 'With agency',
    tasks: [
      { plate: 'QRS-215NA', amount: '₦118,000', detail: 'Roadworthiness · Agency check, 3 days', driver: 'Tayo Lawal', initials: 'TL' },
      { plate: 'EPA-368KJ', amount: '₦64,000', detail: 'Vehicle licence · Agency check, 1 day', driver: 'Bisi Adeyemi', initials: 'BA' },
    ],
  },
  {
    key: 'verified',
    label: 'Verified',
    tasks: [
      { plate: 'MNO-840TU', amount: '₦267,000', detail: 'Insurance · Matched with agency', driver: 'Emeka Okoro', initials: 'EO' },
    ],
  },
];

export const DRIVER_KPIS = [
  { label: 'Active drivers', value: '46', note: '2 vehicles without a driver' },
  { label: 'Licences expiring in 60 days', value: '2', note: 'Next on 20 Nov', tone: 'warn' },
  { label: 'Licences expired', value: '1', note: 'Kunle Adebayo', tone: 'bad' },
];

export const DRIVERS = [
  { initials: 'KA', name: 'Kunle Adebayo', plate: 'LND-482XY', expiry: '12 Oct 2026', status: 'Licence expired', tone: 'bad' },
  { initials: 'SB', name: 'Sade Bakare', plate: 'KJA-317AB', expiry: '3 Mar 2027', status: 'Valid', tone: 'good' },
  { initials: 'IO', name: 'Ifeoma Obi', plate: 'BRT-094LM', expiry: '9 Jan 2027', status: 'Valid', tone: 'good' },
  { initials: 'CN', name: 'Chidi Nwosu', plate: 'APP-126GH', expiry: '20 Nov 2026', status: 'Expiring in 16 days', tone: 'warn' },
  { initials: 'MI', name: 'Musa Ibrahim', plate: 'LSD-640KE', expiry: '8 Feb 2027', status: 'Valid', tone: 'good' },
  { initials: 'AE', name: 'Amaka Eze', plate: 'DKT-771BA', expiry: '30 Apr 2027', status: 'Valid', tone: 'good' },
  { initials: 'TL', name: 'Tayo Lawal', plate: 'QRS-215NA', expiry: '15 Dec 2026', status: 'Expiring in 41 days', tone: 'warn' },
  { initials: 'BA', name: 'Bisi Adeyemi', plate: 'EPA-368KJ', expiry: '22 Jun 2027', status: 'Valid', tone: 'good' },
];

export const PAYMENT_DUE = [
  { label: 'Expired', width: 34, amount: '₦434,500' },
  { label: 'Due soon', width: 45, amount: '₦583,000' },
  { label: 'Verified', width: 21, amount: '₦267,000' },
];

export const TRANSACTIONS = [
  { date: '30 Oct 2026', description: 'Wallet top-up', type: 'Credit', amount: '+₦500,000', tone: 'good', status: 'Completed' },
  { date: '1 Nov 2026', description: 'Renewal EKY-905CD · roadworthiness', type: 'Debit', amount: '−₦42,000', tone: 'good', status: 'Completed' },
  { date: '2 Nov 2026', description: 'Renewal FKJ-209RT · vehicle licence', type: 'Debit', amount: '−₦58,000', tone: 'warn', status: 'Pending' },
  { date: '3 Nov 2026', description: 'Agency fee MUS-731PQ · insurance', type: 'Debit', amount: '−₦31,000', tone: 'warn', status: 'Pending' },
  { date: '3 Nov 2026', description: 'Bulk approval · Tunde Bello (6 renewals)', type: 'Debit', amount: '−₦412,000', tone: 'warn', status: 'Awaiting approval' },
];

export const COMPLIANCE_HISTORY = [
  { month: 'Jun', value: 74 },
  { month: 'Jul', value: 77 },
  { month: 'Aug', value: 79 },
  { month: 'Sep', value: 80 },
  { month: 'Oct', value: 79 },
  { month: 'Nov', value: 81 },
];

export const SPEND_BY_BRANCH = [
  { branch: 'Lagos', width: 93, amount: '₦712,000' },
  { branch: 'Abuja', width: 43, amount: '₦331,500' },
  { branch: 'Ibadan', width: 24, amount: '₦241,000' },
];

export const SAVED_REPORTS = [
  { name: 'Monthly compliance summary', period: 'October 2026', format: 'PDF', status: 'Ready' },
  { name: 'Spend by branch', period: 'Q3 2026', format: 'CSV', status: 'Ready' },
  { name: 'Renewal audit log', period: 'October 2026', format: 'CSV', status: 'Ready' },
  { name: 'Driver licence report', period: 'November 2026', format: 'PDF', status: 'Generating' },
];
