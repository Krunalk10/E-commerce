import {
  GitCompare,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
} from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { useCatalogStore } from '../../features/catalog/store/useCatalogStore'
import { useAuthStore } from '../../store/slices/useAuthStore'
import { useCartStore } from '../../store/slices/useCartStore'
import { useCompareStore } from '../../store/slices/useCompareStore'
import { useWishlistStore } from '../../store/slices/useWishlistStore'

const navItems = [
  { label: 'Watches', to: '/catalog' },
  { label: 'Brands', to: '/brands' },
  { label: 'Finder', to: '/watch-finder' },
  { label: 'Guide', to: '/guide' },
  { label: 'Boutiques', to: '/boutiques' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const setCatalogQuery = useCatalogStore((state) => state.setQuery)
  const cartCount = useCartStore((state) => state.getItemCount())
  const wishlistCount = useWishlistStore((state) => state.items.length)
  const compareCount = useCompareStore((state) => state.items.length)
  const user = useAuthStore((state) => state.user)

  function handleSearch(event) {
    event.preventDefault()
    setCatalogQuery(query)
    navigate('/catalog')
    setIsMenuOpen(false)
  }

  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <Link className="brand" to="/">
          <span className="brand__mark">C</span>
          <span>
            Chronora
            <small>Luxury watches</small>
          </span>
        </Link>

        <button
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          className="menu-button"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          <Menu aria-hidden="true" />
        </button>

        <nav className={isMenuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.to} onClick={() => setIsMenuOpen(false)} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form className="header-search" onSubmit={handleSearch}>
          <Search aria-hidden="true" size={17} />
          <input
            aria-label="Search watches"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search brand or model"
            value={query}
          />
        </form>

        <div className="header-actions">
          <Link aria-label="Compare watches" className="header-icon" to="/compare">
            <GitCompare aria-hidden="true" />
            {compareCount ? <span>{compareCount}</span> : null}
          </Link>
          <Link aria-label="Wishlist" className="header-icon" to="/wishlist">
            <Heart aria-hidden="true" />
            {wishlistCount ? <span>{wishlistCount}</span> : null}
          </Link>
          <Link aria-label="Cart" className="header-icon" to="/cart">
            <ShoppingBag aria-hidden="true" />
            {cartCount ? <span>{cartCount}</span> : null}
          </Link>
          <Button
            icon={UserRound}
            onClick={() => navigate(user ? '/profile' : '/login')}
            variant="secondary"
          >
            {user ? 'Account' : 'Login'}
          </Button>
        </div>
      </Container>
    </header>
  )
}
