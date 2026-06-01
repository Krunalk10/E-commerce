import {
  brands,
  caseSizes,
  priceRanges,
  products,
  watchTypes,
} from '../../../data/local-db'
import { delay, makeApiResponse } from '../../client/localApiClient'

const SORTERS = {
  featured: (a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating,
  newest: (a, b) => b.id.localeCompare(a.id),
  'price-low': (a, b) => a.price - b.price,
  'price-high': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
}

function applyFilters(items, filters = {}) {
  const {
    brands: brandFilters = [],
    caseSize = '',
    genders = [],
    inStockOnly = false,
    priceRange = '',
    query = '',
    types = [],
  } = filters

  const normalizedQuery = query.trim().toLowerCase()
  const selectedPrice = priceRanges.find((range) => range.id === priceRange)
  const selectedCaseSize = caseSizes.find((range) => range.id === caseSize)

  return items.filter((watch) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [watch.name, watch.brand, watch.collection, watch.shortDescription]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)

    const matchesBrand =
      brandFilters.length === 0 || brandFilters.includes(watch.brandSlug)
    const matchesType = types.length === 0 || types.includes(watch.type)
    const matchesGender = genders.length === 0 || genders.includes(watch.gender)
    const matchesStock = !inStockOnly || watch.inStock
    const matchesPrice =
      !selectedPrice || (watch.price >= selectedPrice.min && watch.price <= selectedPrice.max)
    const matchesCase =
      !selectedCaseSize ||
      (watch.caseSize >= selectedCaseSize.min && watch.caseSize <= selectedCaseSize.max)

    return (
      matchesQuery &&
      matchesBrand &&
      matchesType &&
      matchesGender &&
      matchesStock &&
      matchesPrice &&
      matchesCase
    )
  })
}

export async function getProducts(params = {}) {
  await delay()

  const {
    filters = {},
    page = 1,
    pageSize = 8,
    sort = 'featured',
  } = params

  const filtered = applyFilters(products, filters)
  const sorted = [...filtered].sort(SORTERS[sort] ?? SORTERS.featured)
  const total = sorted.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const start = (safePage - 1) * pageSize
  const data = sorted.slice(start, start + pageSize)

  return makeApiResponse(data, {
    page: safePage,
    pageSize,
    total,
    totalPages,
  })
}

export async function getFeaturedProducts(limit = 8) {
  await delay(140)
  return makeApiResponse(
    products
      .filter((watch) => watch.featured || watch.bestseller)
      .sort(SORTERS.featured)
      .slice(0, limit),
  )
}

export async function getProductBySlug(slug) {
  await delay(160)
  return makeApiResponse(products.find((watch) => watch.slug === slug) ?? null)
}

export async function getSimilarProducts(product, limit = 4) {
  await delay(160)

  if (!product) {
    return makeApiResponse([])
  }

  return makeApiResponse(
    products
      .filter(
        (watch) =>
          watch.id !== product.id &&
          (watch.brandSlug === product.brandSlug ||
            watch.type === product.type ||
            watch.gender === product.gender),
      )
      .slice(0, limit),
  )
}

export async function getProductFilters() {
  await delay(120)
  return makeApiResponse({
    brands,
    caseSizes,
    priceRanges,
    watchTypes,
  })
}

export async function searchProducts(query) {
  await delay(120)
  const filtered = applyFilters(products, { query })
  return makeApiResponse(filtered.slice(0, 6))
}
