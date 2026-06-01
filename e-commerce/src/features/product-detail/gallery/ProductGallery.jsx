import { useState } from 'react'

export function ProductGallery({ images, name }) {
  const [activeImage, setActiveImage] = useState(images[0])

  return (
    <div className="product-gallery">
      <div className="product-gallery__main">
        <img alt={name} src={activeImage} />
      </div>
      <div className="product-gallery__thumbs" aria-label="Product images">
        {images.map((image, index) => (
          <button
            aria-label={`Show ${name} image ${index + 1}`}
            className={activeImage === image ? 'is-active' : undefined}
            key={image}
            onClick={() => setActiveImage(image)}
            type="button"
          >
            <img alt="" src={image} />
          </button>
        ))}
      </div>
    </div>
  )
}
