import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'

export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__grid">
        <div>
          <Link className="brand brand--footer" to="/">
            <span className="brand__mark">C</span>
            <span>
              Chronora
              <small>Luxury watches</small>
            </span>
          </Link>
          <p>
            Curated mechanical, quartz, dress, sport, and collector watches with
            local data and API-style fetching.
          </p>
        </div>

        <div>
          <h3>Shop</h3>
          <Link to="/catalog">All watches</Link>
          <Link to="/brands">Brands</Link>
          <Link to="/watch-finder">Watch finder</Link>
        </div>

        <div>
          <h3>Service</h3>
          <Link to="/boutiques">Boutiques</Link>
          <Link to="/guide">Buying guide</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div>
          <h3>Assistance</h3>
          <p>Call +91 98765 43210</p>
          <p>Open daily, 10 AM to 8 PM</p>
        </div>
      </Container>
    </footer>
  )
}
