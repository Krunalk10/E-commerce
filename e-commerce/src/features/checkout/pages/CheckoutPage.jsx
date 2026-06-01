import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../../../components/ui/Container'
import { formatCurrency } from '../../../lib/formatters/currency'
import { useCartStore } from '../../../store/slices/useCartStore'

export function CheckoutPage() {
  const subtotal = useCartStore((state) => state.getSubtotal())

  return (
    <main className="page-section">
      <Container className="checkout-card">
        <CheckCircle2 aria-hidden="true" />
        <p className="eyebrow">Checkout simulation</p>
        <h1>Secure checkout is ready for integration.</h1>
        <p>
          Your current cart total is <strong>{formatCurrency(subtotal)}</strong>.
          The next backend step would connect addresses, payment, and order APIs.
        </p>
        <Link className="button button--primary" to="/catalog">
          Continue shopping
        </Link>
      </Container>
    </main>
  )
}
