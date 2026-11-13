import { createContext, useContext } from 'react';

const BizSearchContext = createContext({ query: '', setQuery: () => {} });

export default BizSearchContext;

export function useBizSearch() {
  return useContext(BizSearchContext);
}

export function matchesQuery(query, values) {
  const needle = String(query || '').trim().toLowerCase();
  if (!needle) return true;
  return values.some((value) => String(value ?? '').toLowerCase().includes(needle));
}
