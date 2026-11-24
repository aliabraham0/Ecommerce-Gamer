import { FiShoppingCart } from 'react-icons/fi'

type GameCardProps = {
  title: string
  price: number
  image: string
  onAddToCart: () => void
}

export const GameCard = ({ title, price, image, onAddToCart }: GameCardProps) => {
  return (
    <article className="game-card">
      <img className="game-card__image" src={image} alt={`Portada de ${title}`} />
      <div className="game-card__content">
        <h2 className="game-card__title">{title}</h2>
        <div className="game-card__footer">
          <p className="game-card__price">
            ${price.toFixed(2)} <span>USD</span>
          </p>
          <button
            className="game-card__add-button"
            type="button"
            onClick={onAddToCart}
            aria-label={`Agregar ${title} al carrito`}
          >
            <FiShoppingCart aria-hidden="true" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </article>
  )
}
