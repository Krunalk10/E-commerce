import { GitCompare, Heart, ShoppingBag } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import { formatCurrency } from '../../lib/formatters/currency'
import { useAuthStore } from '../../store/slices/useAuthStore'
import { useCartStore } from '../../store/slices/useCartStore'
import { useCompareStore } from '../../store/slices/useCompareStore'
import { useWishlistStore } from '../../store/slices/useWishlistStore'

export function ProductCard({ product }) {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const addItem = useCartStore((state) => state.addItem)
  const toggleWishlist = useWishlistStore((state) => state.toggleItem)
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id))
  const toggleCompare = useCompareStore((state) => state.toggleItem)
  const isCompareSelected = useCompareStore((state) =>
    state.items.some((item) => item.id === product.id),
  )

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    addItem(product)
  }
 
  

  return (
    <article className="product-card">
      <Link className="product-card__media" to={`/watches/${product.slug}`}>
        <img alt={product.name} src={product.images[0]} />
        {product.badge ? <span className="badge">{product.badge}</span> : null}
      </Link>

      <div className="product-card__content">
        <div className="product-card__meta">
          <span>{product.brand}</span>
          <span>{product.type}</span>
        </div>

        <Link className="product-card__title" to={`/watches/${product.slug}`}>
          {product.name}
        </Link>
        <p>{product.shortDescription}</p>

        <div className="product-card__rating">
          <span>{product.rating}</span>
          <span>{product.reviews} reviews</span>
        </div>

        <div className="product-card__price">
          <strong>{formatCurrency(product.price)}</strong>
          {product.originalPrice ? <span>{formatCurrency(product.originalPrice)}</span> : null}
        </div>

        <div className="product-card__actions">
          <Button
            disabled={!product.inStock}
            icon={ShoppingBag}
            onClick={handleAddToCart}
            variant="primary"
          >
            {product.inStock ? 'Add' : 'Sold'}
          </Button>
          <Button
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={isWishlisted ? 'is-active' : ''}
            icon={Heart}
            onClick={() => toggleWishlist(product)}
            variant="icon"
          >
            Wish
          </Button>
          <Button
            aria-label={isCompareSelected ? 'Remove from compare' : 'Compare watch'}
            className={isCompareSelected ? 'is-active' : ''}
            icon={GitCompare}
            onClick={() => toggleCompare(product)}
            variant="icon"
          >
            Compare
          </Button>
        </div>
      </div>
    </article>
  )
}
