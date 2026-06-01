import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroImage from '../../../assets/images/hero/watch-atelier.svg'
import conciergeImage from '../../../assets/images/banners/concierge-desk.svg'
import { LoadingGrid } from '../../../components/feedback/LoadingGrid'
import { ProductGrid } from '../../../components/product/ProductGrid'
import { Container } from '../../../components/ui/Container'
import { SectionHeader } from '../../../components/ui/SectionHeader'
import { formatNumber } from '../../../lib/formatters/currency'
import { useHomeData } from '../hooks/useHomeData'

const benefits = [
  { icon: BadgeCheck, label: 'Authenticated watches' },
  { icon: Truck, label: 'Insured delivery' },
  { icon: ShieldCheck, label: 'Warranty support' },
  { icon: Sparkles, label: 'Collector guidance' },
]

export function HomePage() {
  const { articles, brands, featured, isLoading } = useHomeData()

  return (
    <main>
      <section className="hero-section">
        <Container className="hero-section__grid">
          <div className="hero-section__copy">
            <p className="eyebrow">Curated timepieces</p>
            <h1>Discover watches that make every second feel intentional.</h1>
            <p>
              Explore automatic, manual, and quartz watches from trusted names,
              with rich details, guided filters, and a collector-first shopping flow.
            </p>
            <div className="hero-section__actions">
              <Link className="button button--primary" to="/catalog">
                <ArrowRight aria-hidden="true" size={18} />
                <span>Shop watches</span>
              </Link>
              <Link className="text-link" to="/watch-finder">
                Find my watch
              </Link>
            </div>
          </div>
          <div className="hero-watch-card">
            <img alt="Luxury watch atelier hero" src={heroImage} />
            <div>
              <strong>{formatNumber(24)}</strong>
              <span>curated watches live</span>
            </div>
          </div>
        </Container>
      </section>

      <Container className="benefit-bar">
        {benefits.map(({ icon: Icon, label }) => (
          <div key={label}>
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </Container>

      <section className="page-section">
        <Container>
          <SectionHeader
            action={
              <Link className="text-link" to="/catalog">
                View all
              </Link>
            }
            eyebrow="Featured"
            subtitle="A tight edit of diver, dress, field, ceramic, and moonphase watches."
            title="Collector picks"
          />
          {isLoading ? <LoadingGrid count={4} /> : <ProductGrid products={featured.slice(0, 4)} />}
        </Container>
      </section>

      <section className="page-section page-section--tinted">
        <Container className="brand-strip">
          <SectionHeader
            eyebrow="Brands"
            subtitle="Filter by makers, collections, movements, and prices."
            title="Shop by maison"
          />
          <div className="brand-grid">
            {brands.map((brand) => (
              <Link key={brand.id} to={`/catalog?brand=${brand.slug}`}>
                <strong>{brand.name}</strong>
                <span>{brand.country}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="page-section">
        <Container className="concierge-panel">
          <img alt="Watch concierge desk" src={conciergeImage} />
          <div>
            <p className="eyebrow">Concierge</p>
            <h2>Need help choosing between movements, case sizes, and budgets?</h2>
            <p>
              Use the finder flow, compare up to three watches, or request
              personal guidance before checkout.
            </p>
            <Link className="button button--secondary" to="/watch-finder">
              <Sparkles aria-hidden="true" size={18} />
              <span>Start finder</span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="page-section">
        <Container>
          <SectionHeader
            eyebrow="Watch guide"
            subtitle="Short explainers for first-time buyers and collectors."
            title="Learn before you buy"
          />
          <div className="article-grid">
            {articles.map((article) => (
              <Link className="article-card" key={article.id} to="/guide">
                <span>{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <small>{article.readTime}</small>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
