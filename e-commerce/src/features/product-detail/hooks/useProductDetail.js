import { useEffect, useState } from 'react'
import { getProductBySlug, getSimilarProducts } from '../../../api'

export function useProductDetail(slug) {
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const [similarProducts, setSimilarProducts] = useState([])

  useEffect(() => {
    let isActive = true

    async function loadProduct() {
      setIsLoading(true)
      const response = await getProductBySlug(slug)
      const similar = await getSimilarProducts(response.data)

      if (isActive) {
        setProduct(response.data)
        setSimilarProducts(similar.data)
        setIsLoading(false)
      }
    }

    loadProduct()

    return () => {
      isActive = false
    }
  }, [slug])

  return { isLoading, product, similarProducts }
}
