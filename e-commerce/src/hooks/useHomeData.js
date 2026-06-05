import { useEffect, useState } from 'react'
import { getArticles, getBrands, getFeaturedProducts } from '../api'

export function useHomeData() {
  const [data, setData] = useState({
    articles: [],
    brands: [],
    featured: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    async function loadHomeData() {
      setIsLoading(true)
      const [featured, brands, articles] = await Promise.all([
        getFeaturedProducts(8),
        getBrands(),
        getArticles(),
      ])

      if (isActive) {
        setData({
          articles: articles.data,
          brands: brands.data,
          featured: featured.data,
        })
        setIsLoading(false)
      }
    }

    loadHomeData()

    return () => {
      isActive = false
    }
  }, [])

  return { ...data, isLoading }
}
