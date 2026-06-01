import { create } from 'zustand'

const initialFilters = {
  brands: [],
  caseSize: '',
  genders: [],
  inStockOnly: false,
  priceRange: '',
  query: '',
  types: [],
}

export const useCatalogStore = create((set) => ({
  filters: initialFilters,
  page: 1,
  pageSize: 8,
  sort: 'featured',
  resetFilters: () => set({ filters: initialFilters, page: 1 }),
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
      page: 1,
    })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  setQuery: (query) =>
    set((state) => ({
      filters: {
        ...state.filters,
        query,
      },
      page: 1,
    })),
  setSort: (sort) => set({ sort, page: 1 }),
  toggleArrayFilter: (key, value) =>
    set((state) => {
      const currentValues = state.filters[key]
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value]

      return {
        filters: {
          ...state.filters,
          [key]: nextValues,
        },
        page: 1,
      }
    }),
}))
