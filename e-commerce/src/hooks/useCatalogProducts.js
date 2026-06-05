import { useEffect, useState } from 'react'
import { getProductFilters, getProducts } from '../api'
import { useCatalogStore } from '../features/catalog/store/useCatalogStore'

export function useCatalogProducts() {
  const { filters, page, pageSize, sort } = useCatalogStore()
  const [filterOptions, setFilterOptions] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [meta, setMeta] = useState({ page: 1, pageSize, total: 0, totalPages: 1 })
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadFilters() {
      setError('')

      try {
        const response = await getProductFilters()

        if (isActive) {
          setFilterOptions(response.data)
        }
      } catch (error) {
        console.error(error)

        if (isActive) {
          setError(error.message || 'Unable to load filter options.')
          setFilterOptions(null)
        }
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
      setError('')

      try {
        const response = await getProducts({ filters, page, pageSize, sort })

        if (isActive) {
          setProducts(response.data)
          setMeta(response.meta)
        }
      } catch (error) {
        console.error(error)

        if (isActive) {
          setError(error.message || 'Unable to load products.')
          setProducts([])
          setMeta({ page: 1, pageSize, total: 0, totalPages: 1 })
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
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
    error,
  }
}
