import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { FiArrowLeft, FiHeart, FiShoppingCart } from 'react-icons/fi'
import { games } from '../data/game'

type DetailTab = 'description' | 'requirements' | 'reviews'

export const GameDetail = ({ onAddToCart }: { onAddToCart: () => void }) => {
  const { id } = useParams()
  const game = games.find((item) => item.id === Number(id))
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<DetailTab>('description')
  const [isFavorite, setIsFavorite] = useState(false)

  if (!game) {
    return (
      <main className="detail-not-found">
        <p className="eyebrow">Juego no encontrado</p>
        <h1>No encontramos ese videojuego</h1>
        <Link className="detail-back-link" to="/">Volver a la tienda</Link>
      </main>
    )
  }

  const gallery = [game.image, ...game.gallery]

  return (
    <main className="game-detail">
      <Link className="detail-back-link" to="/">
        <FiArrowLeft aria-hidden="true" /> Volver a la tienda
      </Link>
      <div className="game-detail__layout">
        <section className="game-detail__gallery" aria-label={`Galería de ${game.title}`}>
          <div className={`game-detail__main-image game-detail__main-image--${activeImage}`}>
            <img
              src={gallery[activeImage]}
              alt={activeImage === 0 ? `Portada de ${game.title}` : `Captura ${activeImage} de ${game.title}`}
            />
            <span className="game-detail__image-count">{String(activeImage + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
          </div>
          <div className="game-detail__thumbnails">
            {gallery.map((image, index) => (
              <button
                className={`game-detail__thumbnail game-detail__thumbnail--${index}${activeImage === index ? ' is-active' : ''}`}
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={index === 0 ? `Ver portada de ${game.title}` : `Ver captura ${index} de ${game.title}`}
                aria-pressed={activeImage === index}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </section>

        <section className="game-detail__summary">
          <p className="eyebrow">{game.category}</p>
          <h1>{game.title}</h1>
          <div className="game-detail__rating">
            <span className="game-detail__stars" aria-label={`${game.rating} de 5 estrellas`}>★★★★★</span>
            <strong>{game.rating.toFixed(1)}</strong>
            <span>({game.reviewCount.toLocaleString('es')} reseñas)</span>
          </div>
          <p className="game-detail__price">${game.price.toFixed(2)} <span>USD</span></p>
          <p className="game-detail__description-short">{game.description}</p>
          <dl className="game-detail__facts">
            <div><dt>Categoría</dt><dd>{game.category}</dd></div>
            <div><dt>Desarrollador</dt><dd>{game.developer}</dd></div>
            <div><dt>Requisitos</dt><dd>{game.requirements.minimum[0]} · {game.requirements.minimum[1]}</dd></div>
          </dl>
          <div className="game-detail__actions">
            <button className="game-detail__cart-button" type="button" onClick={onAddToCart}>
              <FiShoppingCart aria-hidden="true" /> Agregar al carrito
            </button>
            <button
              className={`game-detail__favorite-button${isFavorite ? ' is-favorite' : ''}`}
              type="button"
              onClick={() => setIsFavorite((favorite) => !favorite)}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              aria-pressed={isFavorite}
            >
              <FiHeart aria-hidden="true" />
            </button>
          </div>

          <section className="game-detail__information" aria-label="Información del videojuego">
            <div className="game-detail__tabs" role="tablist" aria-label="Secciones de información">
              <button id="tab-description" role="tab" aria-selected={activeTab === 'description'} aria-controls="panel-description" type="button" onClick={() => setActiveTab('description')}>Descripción</button>
              <button id="tab-requirements" role="tab" aria-selected={activeTab === 'requirements'} aria-controls="panel-requirements" type="button" onClick={() => setActiveTab('requirements')}>Requisitos del sistema</button>
              <button id="tab-reviews" role="tab" aria-selected={activeTab === 'reviews'} aria-controls="panel-reviews" type="button" onClick={() => setActiveTab('reviews')}>Reseñas ({game.reviewCount.toLocaleString('es')})</button>
            </div>
            <div className="game-detail__tab-panel" id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
              {activeTab === 'description' && (
                <div>
                  <h2>Acerca de este juego</h2>
                  <p>{game.description}</p>
                  <p>Descubre todos sus detalles, prepara tu equipo y vive la aventura a tu manera.</p>
                </div>
              )}
              {activeTab === 'requirements' && (
                <div className="game-detail__requirements">
                  <div>
                    <h2>Mínimos</h2>
                    <ul>{game.requirements.minimum.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul>
                  </div>
                  <div>
                    <h2>Recomendados</h2>
                    <ul>{game.requirements.recommended.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul>
                  </div>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="game-detail__reviews">
                  {game.reviews.map((review) => (
                    <article className="game-detail__review" key={review.author}>
                      <div><strong>{review.author}</strong><span>{review.date}</span></div>
                      <p className="game-detail__review-stars" aria-label={`${review.rating} de 5 estrellas`}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                      <p>{review.comment}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}