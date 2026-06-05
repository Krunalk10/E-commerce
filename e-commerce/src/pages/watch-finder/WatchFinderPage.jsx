import { ArrowRight, Gem, Gauge, Waves } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { useCatalogStore } from '../../features/catalog/store/useCatalogStore'

const finderCards = [
  {
    icon: Waves,
    label: 'Diver / sport',
    text: 'Automatic watches with strong water resistance.',
    type: 'automatic',
  },
  {
    icon: Gem,
    label: 'Dress / occasion',
    text: 'Elegant quartz and slim watches for formal wear.',
    type: 'quartz',
  },
  {
    icon: Gauge,
    label: 'Mechanical purist',
    text: 'Manual winding watches for collectors who enjoy ritual.',
    type: 'manual',
  },
]

export function WatchFinderPage() {
  const navigate = useNavigate()
  const resetFilters = useCatalogStore((state) => state.resetFilters)
  const setFilter = useCatalogStore((state) => state.setFilter)

  function handleChoice(type) {
    resetFilters()
    setFilter('types', [type])
    navigate('/catalog')
  }

  return (
    <main className="page-section">
      <Container>
        <p className="eyebrow">Watch finder</p>
        <h1>Start with your preferred ownership style.</h1>
        <div className="finder-grid">
          {finderCards.map(({ icon: Icon, label, text, type }) => (
            <article key={type}>
              <Icon aria-hidden="true" />
              <h2>{label}</h2>
              <p>{text}</p>
              <Button icon={ArrowRight} onClick={() => handleChoice(type)} variant="secondary">
                Explore
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </main>
  )
}
