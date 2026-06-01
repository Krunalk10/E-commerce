import { BadgeCheck, GitCompare, Heart, ShoppingBag, Truck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { LoadingGrid } from '../../../components/feedback/LoadingGrid'
import { ProductGrid } from '../../../components/product/ProductGrid'
import { Button } from '../../../components/ui/Button'
import { Container } from '../../../components/ui/Container'
import { SectionHeader } from '../../../components/ui/SectionHeader'
import { formatCurrency } from '../../../lib/formatters/currency'
import { useCartStore } from '../../../store/slices/useCartStore'
import { useCompareStore } from '../../../store/slices/useCompareStore'
import { useWishlistStore } from '../../../store/slices/useWishlistStore'
import { ProductGallery } from '../gallery/ProductGallery'
import { useProductDetail } from '../hooks/useProductDetail'

export function ProductDetailPage() {
  const { slug } = useParams()
  const { isLoading, product, similarProducts } = useProductDetail(slug)
  const addItem = useCartStore((state) => state.addItem)
  const toggleWishlist = useWishlistStore((state) => state.toggleItem)
  const toggleCompare = useCompareStore((state) => state.toggleItem)

  if (isLoading) {
    return (
      <main className="page-section">
        <Container>
          <LoadingGrid count={2} />
        </Container>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="page-section">
        <Container className="empty-state">
          <h1>Watch not found</h1>
          <Link className="button button--primary" to="/catalog">
            Browse watches
          </Link>
        </Container>
      </main>
    )
  }

  const specs = [
    ['Brand', product.brand],
    ['Collection', product.collection],
    ['Movement', product.movement],
    ['Type', product.type],
    ['Case size', `${product.caseSize} mm`],
    ['Material', product.material],
    ['Water resistance', product.waterResistance],
    ['Power reserve', product.powerReserve],
  ]

  return (
    <main>
      <Container className="product-detail">
        <ProductGallery images={product.images} name={product.name} />

        <section className="product-summary">
          <p className="eyebrow">{product.brand}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>

          <div className="product-summary__price">
            <strong>{formatCurrency(product.price)}</strong>
            {product.originalPrice ? <span>{formatCurrency(product.originalPrice)}</span> : null}
          </div>

          <div className="product-summary__badges">
            <span>
              <BadgeCheck aria-hidden="true" />
              Authenticated
            </span>
            <span>
              <Truck aria-hidden="true" />
              Insured delivery
            </span>
          </div>

          <div className="product-summary__actions">
            <Button
              disabled={!product.inStock}
              icon={ShoppingBag}
              isFullWidth
              onClick={() => addItem(product)}
            >
              {product.inStock ? 'Add to cart' : 'Notify when available'}
            </Button>
            <Button icon={Heart} onClick={() => toggleWishlist(product)} variant="secondary">
              Wishlist
            </Button>
            <Button icon={GitCompare} onClick={() => toggleCompare(product)} variant="secondary">
              Compare
            </Button>
          </div>

          <div className="emi-card">
            <strong>EMI from {formatCurrency(Math.round(product.price / 12))}/month</strong>
            <span>Includes concierge assistance and secure checkout simulation.</span>
          </div>
        </section>
      </Container>

      <Container className="product-info-grid">
        <section>
          <h2>Highlights</h2>
          <ul>
            {product.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Specifications</h2>
          <dl>
            {specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Container>

      <section className="page-section">
        <Container>
          <SectionHeader
            eyebrow="Similar watches"
            subtitle="Based on brand, movement, and style."
            title="You may also like"
          />
          <ProductGrid products={similarProducts} />
        </Container>
      </section>
    </main>
  )
}
