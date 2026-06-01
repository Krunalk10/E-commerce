export function LoadingGrid({ count = 8 }) {
  return (
    <div className="product-grid" aria-label="Loading products">
      {Array.from({ length: count }, (_, index) => (
        <article className="product-card product-card--loading" key={index}>
          <div className="skeleton product-card__image" />
          <div className="product-card__content">
            <div className="skeleton skeleton-line skeleton-line--short" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line skeleton-line--medium" />
          </div>
        </article>
      ))}
    </div>
  )
}
