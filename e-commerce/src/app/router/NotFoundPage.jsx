import { Link } from 'react-router-dom'
import { Container } from '../../components/ui/Container'

export function NotFoundPage() {
  return (
    <main className="page-section">
      <Container className="empty-state">
        <h1>Page not found</h1>
        <p>The watch you are looking for may have moved.</p>
        <Link className="button button--primary" to="/">
          Back home
        </Link>
      </Container>
    </main>
  )
}
