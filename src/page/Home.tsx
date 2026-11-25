
import { useRef } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { GameCard } from '../components/GameCard'
import { games } from '../data/game'

type HomeProps = {
  onAddToCart: () => void
}

export const Home = ({ onAddToCart }: HomeProps) => {
  const sliderRef = useRef<HTMLDivElement>(null)

  return (
    <main className="store-home">
      <section className="featured-games" aria-labelledby="featured-games-title">
        <div className="featured-games__heading">
          <div>
            <p className="eyebrow">Colección gamer</p>
            <h1 id="featured-games-title">Juegos destacados</h1>
          </div>
          <span className="featured-games__tag">Descubre tu próxima aventura</span>
        </div>
        <div className="featured-games__controls" aria-label="Controles del carrusel">
          <p>Explora nuestra selección <span>· {games.length} juegos</span></p>
          <div>
            <button type="button" onClick={() => sliderRef.current?.scrollBy({ left: -320, behavior: 'smooth' })} aria-label="Ver juegos anteriores">
              <FiArrowLeft aria-hidden="true" />
            </button>
            <button type="button" onClick={() => sliderRef.current?.scrollBy({ left: 320, behavior: 'smooth' })} aria-label="Ver más juegos">
              <FiArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="featured-games__slider" ref={sliderRef} aria-label="Juegos disponibles">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>
    </main>
  )
}
