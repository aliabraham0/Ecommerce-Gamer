
import { Link } from 'react-router'
import { FiArrowUpRight, FiHeart, FiShoppingCart } from 'react-icons/fi'
import type { Game } from '../data/game'

type GameCardProps = {
  game: Game
  onAddToCart: () => void
  isFavorite: boolean
  onToggleFavorite: () => void
}

export const GameCard = ({ game, onAddToCart, isFavorite, onToggleFavorite }: GameCardProps) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-purple-300/15 bg-[#171a2c] shadow-lg transition hover:-translate-y-1 hover:border-purple-400/50">

      <div className="relative overflow-hidden">
        <Link to={`/detalle/${game.id}`} className="block">
          <img src={game.image} alt={game.title}
            className="h-62.5 w-full object-cover transition group-hover:scale-105" />

          <span className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
            Ver detalles <FiArrowUpRight />
          </span>
        </Link>
        <button
          type="button"
          onClick={onToggleFavorite}
          aria-label={isFavorite ? `Quitar ${game.title} de favoritos` : `Agregar ${game.title} a favoritos`}
          aria-pressed={isFavorite}
          className={`absolute right-3 top-3 rounded-full bg-black/70 p-2.5 text-white hover:bg-black ${isFavorite ? 'text-pink-400' : ''}`}
        >
          <FiHeart fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">

        <div className="flex justify-between text-xs text-gray-400">
          <span>{game.category}</span>
          <span className="text-yellow-400">★ {game.rating.toFixed(1)}</span>
        </div>

        <h2 className="my-4 truncate text-lg font-semibold">
          <Link to={`/detalle/${game.id}`} className="hover:text-purple-300">
            {game.title}
          </Link>
        </h2>

        <div className="mt-auto flex items-center justify-between gap-2">
          <p className="font-bold text-purple-400">
            ${game.price.toFixed(2)} <span className="text-xs text-gray-400">USD</span>
          </p>

          <button onClick={onAddToCart}
            className="flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-500"
            aria-label={`Agregar ${game.title} al carrito`}>
            <FiShoppingCart /> Agregar
          </button>
        </div>

      </div>
    </article>
  )
}
