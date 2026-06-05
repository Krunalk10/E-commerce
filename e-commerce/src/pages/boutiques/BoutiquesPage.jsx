import { MapPin, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getBoutiques } from '../../api'
import { Container } from '../../components/ui/Container'

export function BoutiquesPage() {
  const [boutiques, setBoutiques] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadBoutiques() {
      setIsLoading(true)
      setError('')

      try {
        const response = await getBoutiques()

        if (isActive) {
          setBoutiques(response.data)
        }
      } catch (error) {
        console.error(error)

        if (isActive) {
          setError(error.message || 'Unable to load boutiques.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadBoutiques()

    return () => {
      isActive = false
    }
  }, [])

  if (isLoading) {
    return (
      <main className="page-section">
        <Container>
          <p>Loading boutiques…</p>
        </Container>
      </main>
    )
  }

  if (error) {
    return (
      <main className="page-section">
        <Container>
          <p className="form-error">{error}</p>
        </Container>
      </main>
    )
  }

  return (
    <main className="page-section">
      <Container>
        <p className="eyebrow">Boutiques</p>
        <h1>Visit a Chronora watch lounge</h1>
        <div className="boutique-grid">
          {boutiques.map((boutique) => (
            <article key={boutique.id}>
              <h2>{boutique.name}</h2>
              <p>
                <MapPin aria-hidden="true" size={18} />
                {boutique.address}
              </p>
              <p>
                <Phone aria-hidden="true" size={18} />
                {boutique.phone}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </main>
  )
}
