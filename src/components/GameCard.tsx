import { Link } from 'react-router'
import { FiArrowUpRight, FiShoppingCart } from 'react-icons/fi'
import type { Game } from '../data/game'

type GameCardProps = {
  game: Game
  onAddToCart: () => void
}

export const GameCard = ({ game, onAddToCart }: GameCardProps) => {
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-[15px] border border-[rgba(190,175,255,0.13)] bg-[linear-gradient(160deg,#171a2c,#10121e_65%)] shadow-[0_16px_38px_rgba(0,0,0,0.25)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-[rgba(178,126,255,0.48)] hover:shadow-[0_20px_46px_rgba(0,0,0,0.36),0_0_28px_rgba(125,64,231,0.12)]">
      <Link
        className="group/cover relative block overflow-hidden focus-visible:outline-2 focus-visible:outline-[#d5adff] focus-visible:outline-offset-[3px]"
        to={`/detalle/${game.id}`}
        aria-label={`Ver detalles de ${game.title}`}
      >
        <img className="block h-62.5 w-full bg-[#171320] object-cover max-[520px]:h-75" src={game.image} alt={`Portada de ${game.title}`} />
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[45%] bottom-0 bg-linear-to-b from-transparent to-[rgba(8,10,20,0.76)]" />
        <span className="pointer-events-none absolute right-3.5 bottom-3.25 z-1 inline-flex translate-y-1 items-center gap-1.5 text-xs font-[650] text-white opacity-0 transition-[opacity,transform] duration-160 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible/cover:translate-y-0 group-focus-visible/cover:opacity-100">
          Ver detalles <FiArrowUpRight aria-hidden="true" />
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2.25 flex items-center justify-between gap-2 text-[11px] text-[#a4a4b8]">
          <span>{game.category}</span>
          <span className="whitespace-nowrap text-[#ffca58]" aria-label={`Calificación ${game.rating} de 5`}>★ {game.rating.toFixed(1)}</span>
        </div>
        <h2 className="mb-4.5 overflow-hidden text-ellipsis whitespace-nowrap text-[17px] font-[650]">
          <Link className="hover:text-[#d3b1ff] focus-visible:outline-2 focus-visible:outline-[#d5adff] focus-visible:outline-offset-[3px]" to={`/detalle/${game.id}`}>{game.title}</Link>
        </h2>
        <div className="mt-auto flex items-center justify-between gap-3">
          <p className="m-0 text-base font-[750] text-[#d78cff]">
            ${game.price.toFixed(2)} <span className="text-[11px] font-medium text-[#a4a4b8]">USD</span>
          </p>
          <button
            className="inline-flex min-h-9.5 cursor-pointer items-center justify-center gap-2 rounded-[9px] border-0 bg-linear-to-br from-[#a24cff] to-[#7438e8] px-3 text-[13px] font-[650] text-white transition-[filter,transform] duration-160 hover:-translate-y-px hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[#d5adff] focus-visible:outline-offset-[3px]"
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
