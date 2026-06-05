import { useEffect, useState } from 'react'
import { getProductFilters, getProducts } from '../api'
import { useCatalogStore } from '../features/catalog/store/useCatalogStore'

export function useCatalogProducts() {
  const { filters, page, pageSize, sort } = useCatalogStore()
  const [filterOptions, setFilterOptions] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [meta, setMeta] = useState({ page: 1, pageSize, total: 0, totalPages: 1 })
  const [products, setProducts] = useState([])

  useEffect(() => {
    let isActive = true

    async function loadFilters() {
      const response = await getProductFilters()

      if (isActive) {
        setFilterOptions(response.data)
      }
    }

    loadFilters()

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    let isActive = true

    async function loadProducts() {
      setIsLoading(true)
      const response = await getProducts({ filters, page, pageSize, sort })

      if (isActive) {
        setProducts(response.data)
        setMeta(response.meta)
        setIsLoading(false)
      }
    }

    loadProducts()

    return () => {
      isActive = false
    }
  }, [filters, page, pageSize, sort])

  return {
    filterOptions,
    isLoading,
    meta,
    products,
  }
}
