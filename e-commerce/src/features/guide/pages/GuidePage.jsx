import { useEffect, useState } from 'react'
import { getArticles } from '../../../api'
import { Container } from '../../../components/ui/Container'

export function GuidePage() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    let isActive = true

    async function loadArticles() {
      const response = await getArticles()

      if (isActive) {
        setArticles(response.data)
      }
    }

    loadArticles()

    return () => {
      isActive = false
    }
  }, [])

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
