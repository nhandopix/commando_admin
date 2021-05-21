export const STATUS_CODE = [
  {
    id: 'TODO',
    name: 'Todo'
  },
  {
    id: 'IN_PROCESS',
    name: 'In process'
  },
  {
    id: 'DONE',
    name: 'Done'
  }
];

export const urlTemplate = {
  templateImportStore: 'https://docs.google.com/spreadsheets/d/163siPLhhDnAyJTumdylGPizvae5XhBM-PR8u_c3srwk/export?format=xlsx',
  templateImportPlan: 'https://docs.google.com/spreadsheets/d/163siPLhhDnAyJTumdylGPizvae5XhBM-PR8u_c3srwk/export?format=xlsx',
  templateImportUser: 'https://docs.google.com/spreadsheets/d/163siPLhhDnAyJTumdylGPizvae5XhBM-PR8u_c3srwk/export?format=xlsx',
};

export const ROLE = {
  GUEST: 'GUEST'
};

export const PAGE_SIZE_LIMIT = {
  PG: 1000, // Get pg list
  STORE: 10000, // Get store list
};

export const ROLE_PERMISSIONS = {
  ACTION_STORE_ROLES: ['ADMIN'],
  EDIT_STORE_ROLES: ['ADMIN'],
  FILTER_PLAN_DONE_IN_STORE_ROLES: ['GUEST', 'AUDITOR'],
  ACTION_PLAN_ROLES: ['ADMIN'],
  QUERY_ALL_PLAN: ['ADMIN'],
  NOT_CHECK_QC: ['GUEST'],
  SUBMIT_CHECK_QC: ['ADMIN', 'AUDITOR', 'GUEST']
}