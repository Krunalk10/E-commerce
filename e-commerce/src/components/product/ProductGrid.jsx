import { EmptyState } from '../feedback/EmptyState'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products }) {
  if (products.length === 0) {
    return <EmptyState title="No watches match your filters" />
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
