import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBrands } from '../../api'
import { Container } from '../../components/ui/Container'

export function BrandsPage() {
  const [brands, setBrands] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadBrands() {
      setIsLoading(true)
      setError('')

      try {
        const response = await getBrands()

        if (isActive) {
          setBrands(response.data)
        }
      } catch (error) {
        console.error(error)

        if (isActive) {
          setError(error.message || 'Unable to load brands.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadBrands()

    return () => {
      isActive = false
    }
  }, [])

  if (isLoading) {
    return (
      <main className="page-section">
        <Container>
          <p>Loading brands…</p>
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
        <p className="eyebrow">Brands</p>
        <h1>Browse watchmakers</h1>
        <div className="brand-page-grid">
          {brands.map((brand) => (
            <Link key={brand.id} to={`/catalog?brand=${brand.slug}`}>
              <span>{brand.country}</span>
              <h2>{brand.name}</h2>
              <p>{brand.story}</p>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  )
}
