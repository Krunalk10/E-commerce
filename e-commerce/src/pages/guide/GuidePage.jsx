import { useEffect, useState } from 'react'
import { getArticles } from '../../api'
import { Container } from '../../components/ui/Container'

export function GuidePage() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadArticles() {
      setIsLoading(true)
      setError('')

      try {
        const response = await getArticles()

        if (isActive) {
          setArticles(response.data)
        }
      } catch (error) {
        console.error(error)

        if (isActive) {
          setError(error.message || 'Unable to load guide articles.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadArticles()

    return () => {
      isActive = false
    }
  }, [])

  if (isLoading) {
    return (
      <main className="page-section">
        <Container>
          <p>Loading guides…</p>
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
        <p className="eyebrow">Guide</p>
        <h1>Watch buying guides</h1>
        <div className="article-grid article-grid--wide">
          {articles.map((article) => (
            <article className="article-card" key={article.id}>
              <span>{article.category}</span>
              <h2>{article.title}</h2>
              <p>{article.excerpt}</p>
              <small>{article.readTime}</small>
            </article>
          ))}
        </div>
      </Container>
    </main>
  )
}
