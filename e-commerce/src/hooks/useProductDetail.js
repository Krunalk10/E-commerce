import { useEffect, useState } from 'react'
import { getProductBySlug, getSimilarProducts } from '../api'

export function useProductDetail(slug) {
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const [similarProducts, setSimilarProducts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadProduct() {
      setIsLoading(true)
      setError('')

      try {
        const response = await getProductBySlug(slug)
        const similar = await getSimilarProducts(response.data)

        if (isActive) {
          setProduct(response.data)
          setSimilarProducts(similar.data)
        }
      } catch (error) {
        console.error(error)

        if (isActive) {
          setError(error.message || 'Unable to load product details.')
          setProduct(null)
          setSimilarProducts([])
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadProduct()

    return () => {
      isActive = false
    }
  }, [slug])

  return { isLoading, product, similarProducts, error }
}
