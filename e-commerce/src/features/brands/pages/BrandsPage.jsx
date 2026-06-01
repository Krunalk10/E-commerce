import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBrands } from '../../../api'
import { Container } from '../../../components/ui/Container'

export function BrandsPage() {
  const [brands, setBrands] = useState([])

  useEffect(() => {
    let isActive = true

    async function loadBrands() {
      const response = await getBrands()

      if (isActive) {
        setBrands(response.data)
      }
    }

    loadBrands()

    return () => {
      isActive = false
    }
  }, [])

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
