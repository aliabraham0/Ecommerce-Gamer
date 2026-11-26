import { useState } from 'react'
import { Link, Outlet, useOutletContext } from 'react-router'
import { FiHeart, FiTrash2 } from 'react-icons/fi'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { GameCard } from '../components/GameCard'
import { games } from '../data/game'
import useLocalStorage from '../hooks/useLocalStorage'
import { Home } from '../page/Home'
import { GameDetail } from '../page/GameDetail'
import { Admin } from '../page/Admin'

export interface CartEntry {
  id: number
  title: string
  price: number
  quantity: number
}

export interface MainLayoutContext {
  search: string
  onSearch: (value: string) => void
  cartCount: number
  cartEntries: CartEntry[]
  favoriteIds: number[]
  onAddToCart: (gameId: number) => void
  onRemoveFromCart: (gameId: number) => void
  onClearCart: () => void
  onToggleFavorite: (gameId: number) => void
}

export function HomeRoute() {
  const { search, onAddToCart, favoriteIds, onToggleFavorite } = useOutletContext<MainLayoutContext>()
  return <Home search={search} onAddToCart={onAddToCart} favoriteIds={favoriteIds} onToggleFavorite={onToggleFavorite} />
}

export function GameDetailRoute() {
  const { onAddToCart, favoriteIds, onToggleFavorite } = useOutletContext<MainLayoutContext>()
  return <GameDetail onAddToCart={onAddToCart} favoriteIds={favoriteIds} onToggleFavorite={onToggleFavorite} />
}

export function AdminRoute() {
  const { cartEntries, onRemoveFromCart, onClearCart } = useOutletContext<MainLayoutContext>()
  return <Admin cartItems={cartEntries} onRemoveCartItem={onRemoveFromCart} onClearCart={onClearCart} />
}

export default function MainLayout() {
  const [search, setSearch] = useState('')
  const [cart, setCart] = useLocalStorage<{ gameId: number; quantity: number }[]>('gamestore_cart', [])
  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>('gamestore_favorites', [])
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartEntries = cart.flatMap(item => {
    const game = games.find(candidate => candidate.id === item.gameId)
    return game ? [{ id: game.id, title: game.title, price: game.price, quantity: item.quantity }] : []
  })

  const onAddToCart = (gameId: number) => setCart(current => {
    const existing = current.find(item => item.gameId === gameId)
    return existing
      ? current.map(item => item.gameId === gameId ? { ...item, quantity: item.quantity + 1 } : item)
      : [...current, { gameId, quantity: 1 }]
  })
  const onRemoveFromCart = (gameId: number) => setCart(current => current.filter(item => item.gameId !== gameId))
  const onToggleFavorite = (gameId: number) => setFavoriteIds(current => current.includes(gameId)
    ? current.filter(id => id !== gameId)
    : [...current, gameId])

  const context: MainLayoutContext = {
    search,
    onSearch: setSearch,
    cartCount,
    cartEntries,
    favoriteIds,
    onAddToCart,
    onRemoveFromCart,
    onClearCart: () => setCart([]),
    onToggleFavorite,
  }

  return (
    <section className="flex min-h-screen flex-col bg-[#080a14] text-[#f5f4fb]">
      <Navbar cartCount={cartCount} favoriteCount={favoriteIds.length} search={search} onSearch={setSearch} />
      <main className="grow"><Outlet context={context} /></main>
      <Footer />
    </section>
  )
}

export function CartPage() {
  const { cartEntries, cartCount, onRemoveFromCart, onClearCart } = useOutletContext<MainLayoutContext>()
  const total = cartEntries.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <main className="mx-auto min-h-[60vh] w-[min(1000px,calc(100%-32px))] py-10 sm:w-[min(1000px,calc(100%-48px))]">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-3xl font-bold">Carrito</h1>
        <span aria-live="polite">{cartCount} {cartCount === 1 ? 'juego' : 'juegos'}</span>
      </div>
      {cartEntries.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#121224] p-8 text-center">
          <p className="text-gray-300">El carrito está vacío.</p>
          <Link to="/tienda" className="mt-4 inline-block rounded-lg bg-violet-600 px-5 py-3 font-semibold">Ver tienda</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {cartEntries.map(item => (
            <article key={item.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#121224] p-4">
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="mt-1 text-sm text-gray-400">{item.quantity} × ${item.price.toFixed(2)} USD</p>
              </div>
              <button onClick={() => onRemoveFromCart(item.id)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-red-300 hover:bg-red-400/10" aria-label={`Quitar ${item.title} del carrito`}>
                <FiTrash2 /> Quitar
              </button>
            </article>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#121224] p-4">
            <strong>Total: ${total.toFixed(2)} USD</strong>
            <button onClick={onClearCart} className="rounded-lg border border-red-400/40 px-4 py-2 text-red-300 hover:bg-red-400/10">Vaciar carrito</button>
          </div>
        </div>
      )}
    </main>
  )
}

export function FavoritesPage() {
  const { favoriteIds, onToggleFavorite, onAddToCart } = useOutletContext<MainLayoutContext>()
  const favoriteGames = games.filter(game => favoriteIds.includes(game.id))

  return (
    <main className="mx-auto min-h-[60vh] w-[min(1120px,calc(100%-32px))] py-10 sm:w-[min(1120px,calc(100%-48px))]">
      <h1 className="mb-7 text-3xl font-bold">Mis favoritos</h1>
      {favoriteGames.length ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,248px),1fr))] gap-5">
          {favoriteGames.map(game => (
            <GameCard
              key={game.id}
              game={game}
              onAddToCart={() => onAddToCart(game.id)}
              isFavorite
              onToggleFavorite={() => onToggleFavorite(game.id)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-[#121224] p-8 text-center">
          <FiHeart className="mx-auto mb-3 text-2xl text-pink-400" />
          <p className="text-gray-300">Todavía no guardaste juegos favoritos.</p>
          <Link to="/tienda" className="mt-4 inline-block rounded-lg bg-violet-600 px-5 py-3 font-semibold">Explorar juegos</Link>
        </div>
      )}
    </main>
  )
}