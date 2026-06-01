import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../../../components/feedback/EmptyState'
import { Container } from '../../../components/ui/Container'
import { formatCurrency } from '../../../lib/formatters/currency'
import { useCartStore } from '../../../store/slices/useCartStore'

export function CartPage() {
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const decrementItem = useCartStore((state) => state.decrementItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const subtotal = useCartStore((state) => state.getSubtotal())

  if (items.length === 0) {
    return (
      <main className="page-section">
        <Container>
          <EmptyState
            action={
              <Link className="button button--primary" to="/catalog">
                <ShoppingBag aria-hidden="true" size={18} />
                <span>Shop watches</span>
              </Link>
            }
            message="Add a watch to begin checkout."
            title="Your cart is empty"
          />
        </Container>
      </main>
    )
  }

  return (
    <main className="page-section">
      <Container className="cart-layout">
        <section className="cart-list">
          <p className="eyebrow">Cart</p>
          <h1>Your selected watches</h1>
          {items.map(({ product, quantity }) => (
            <article className="cart-item" key={product.id}>
              <img alt={product.name} src={product.images[0]} />
              <div>
                <strong>{product.name}</strong>
                <span>{product.brand}</span>
                <small>{formatCurrency(product.price)}</small>
              </div>
              <div className="quantity-control">
                <button onClick={() => decrementItem(product.id)} type="button">
                  <Minus aria-hidden="true" size={16} />
                </button>
                <span>{quantity}</span>
                <button onClick={() => addItem(product)} type="button">
                  <Plus aria-hidden="true" size={16} />
                </button>
              </div>
              <button
                aria-label={`Remove ${product.name}`}
                className="remove-button"
                onClick={() => removeItem(product.id)}
                type="button"
              >
                <Trash2 aria-hidden="true" size={18} />
              </button>
            </article>
          ))}
        </section>

        <aside className="summary-card">
          <h2>Order summary</h2>
          <div>
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div>
            <span>Insured shipping</span>
            <strong>Free</strong>
          </div>
          <div>
            <span>Estimated total</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <Link className="button button--primary button--full" to="/checkout">
            <span>Proceed to checkout</span>
          </Link>
        </aside>
      </Container>
    </main>
  )
}
