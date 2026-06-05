import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../../components/feedback/EmptyState'
import { ProductGrid } from '../../components/product/ProductGrid'
import { Container } from '../../components/ui/Container'
import { useWishlistStore } from '../../store/slices/useWishlistStore'

export function WishlistPage() {
  const items = useWishlistStore((state) => state.items)

  return (
    <main className="page-section">
      <Container>
        <p className="eyebrow">Wishlist</p>
        <h1>Saved watches</h1>
        {items.length ? (
          <ProductGrid products={items} />
        ) : (
          <EmptyState
            action={
              <Link className="button button--primary" to="/catalog">
                <Heart aria-hidden="true" size={18} />
                <span>Find watches</span>
              </Link>
            }
            title="No watches saved yet"
          />
        )}
      </Container>
    </main>
  )
}
