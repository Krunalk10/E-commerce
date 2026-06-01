import { Search } from 'lucide-react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LoadingGrid } from '../../../components/feedback/LoadingGrid'
import { ProductGrid } from '../../../components/product/ProductGrid'
import { Container } from '../../../components/ui/Container'
import { formatNumber } from '../../../lib/formatters/currency'
import { Pagination } from '../components/Pagination'
import { FilterPanel } from '../filters/FilterPanel'
import { useCatalogProducts } from '../hooks/useCatalogProducts'
import { useCatalogStore } from '../store/useCatalogStore'

export function CatalogPage() {
  const [searchParams] = useSearchParams()
  const { filterOptions, isLoading, meta, products } = useCatalogProducts()
  const filters = useCatalogStore((state) => state.filters)
  const pageSize = useCatalogStore((state) => state.pageSize)
  const setPageSize = useCatalogStore((state) => state.setPageSize)
  const setQuery = useCatalogStore((state) => state.setQuery)
  const setFilter = useCatalogStore((state) => state.setFilter)
  const setSort = useCatalogStore((state) => state.setSort)
  const sort = useCatalogStore((state) => state.sort)

  useEffect(() => {
    const brand = searchParams.get('brand')

    if (brand) {
      setFilter('brands', [brand])
    }
  }, [searchParams, setFilter])

  return (
    <main className="catalog-page">
      <Container className="catalog-hero">
        <p className="eyebrow">Watch catalog</p>
        <h1>Explore timepieces by brand, movement, price, and case size.</h1>
        <p>
          Showing {formatNumber(meta.total)} watches. Results are paginated, so
          large catalogs stay fast and easy to scan.
        </p>
      </Container>

      <Container className="catalog-layout">
        <FilterPanel options={filterOptions} />

        <section className="catalog-results">
          <div className="catalog-toolbar">
            <label className="catalog-search">
              <Search aria-hidden="true" size={18} />
              <input
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search model, brand, collection"
                value={filters.query}
              />
            </label>

            <div className="select-row">
              <label>
                Sort
                <select onChange={(event) => setSort(event.target.value)} value={sort}>
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price low to high</option>
                  <option value="price-high">Price high to low</option>
                  <option value="rating">Top rated</option>
                </select>
              </label>
              <label>
                View
                <select
                  onChange={(event) => setPageSize(Number(event.target.value))}
                  value={pageSize}
                >
                  <option value="8">8</option>
                  <option value="12">12</option>
                  <option value="16">16</option>
                </select>
              </label>
            </div>
          </div>

          {isLoading ? <LoadingGrid count={pageSize} /> : <ProductGrid products={products} />}
          <Pagination meta={meta} />
        </section>
      </Container>
    </main>
  )
}
