import { Link } from 'react-router'
import { FiArrowUpRight, FiShoppingCart } from 'react-icons/fi'
import type { Game } from '../data/game'

type GameCardProps = {
  game: Game
  onAddToCart: () => void
}

export const GameCard = ({ game, onAddToCart }: GameCardProps) => {
  return (
    <article className="game-card">
      <Link className="game-card__cover-link" to={`/detalle/${game.id}`} aria-label={`Ver detalles de ${game.title}`}>
        <img className="game-card__image" src={game.image} alt={`Portada de ${game.title}`} />
        <span className="game-card__view">
          Ver detalles <FiArrowUpRight aria-hidden="true" />
        </span>
      </Link>
      <div className="game-card__content">
        <div className="game-card__meta">
          <span>{game.category}</span>
          <span className="game-card__rating" aria-label={`Calificación ${game.rating} de 5`}>★ {game.rating.toFixed(1)}</span>
        </div>
        <h2 className="game-card__title">
          <Link to={`/detalle/${game.id}`}>{game.title}</Link>
        </h2>
        <div className="game-card__footer">
          <p className="game-card__price">
            ${game.price.toFixed(2)} <span>USD</span>
          </p>
          <button
            className="game-card__add-button"
            type="button"
            onClick={onAddToCart}
            aria-label={`Agregar ${game.title} al carrito`}
          >
            <FiShoppingCart aria-hidden="true" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </article>
  )
}
