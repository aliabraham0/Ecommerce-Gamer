
import { GameCard } from '../components/GameCard'

type HomeProps = {
  onAddToCart: () => void
}

export const Home = ({ onAddToCart }: HomeProps) => {
  return (
    <main className="store-home">
      <section className="featured-games" aria-labelledby="featured-games-title">
        <div className="featured-games__heading">
          <div>
            <p className="eyebrow">Colección gamer</p>
            <h1 id="featured-games-title">Juegos destacados</h1>
          </div>
          <span className="featured-games__tag">Plantilla de producto</span>
        </div>
        <div className="featured-games__grid">
          <GameCard
            title="Elden Ring"
            price={59.99}
            image="/game-cover.svg"
            onAddToCart={onAddToCart}
          />
        </div>
      </section>
    </main>
  )
}
