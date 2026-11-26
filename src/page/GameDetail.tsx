import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import { FiArrowLeft, FiHeart, FiMaximize2, FiShoppingCart, FiX } from 'react-icons/fi'
import { games } from '../data/game'

type DetailTab = 'description' | 'requirements' | 'reviews'

export const GameDetail = ({ onAddToCart }: { onAddToCart: () => void }) => {
  const { id } = useParams()
  const game = games.find(item => item.id === Number(id))

  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<DetailTab>('description')
  const [isFavorite, setIsFavorite] = useState(false)
  const [isImageOpen, setIsImageOpen] = useState(false)

  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isImageOpen) {
      dialog.showModal()
      closeRef.current?.focus()
    } else if (dialog.open) {
      dialog.close()
    }
  }, [isImageOpen])

  if (!game) return (
    <main className="mx-auto w-[min(1120px,calc(100%-48px))] py-10">
      <p className="text-[#b778ff]">Juego no encontrado</p>
      <h1>No encontramos ese videojuego</h1>
      <Link to="/">Volver a la tienda</Link>
    </main>
  )

  const gallery = [game.image, ...game.gallery]

  const tabs = [
    ['description', 'Descripción'],
    ['requirements', 'Requisitos del sistema'],
    ['reviews', `Reseñas (${game.reviewCount.toLocaleString('es')})`]
  ] as const

  const info = [
    ['Categoría', game.category],
    ['Desarrollador', game.developer],
    ['Requisitos', game.requirements.minimum.join(' · ')]
  ]

  return (
    <main className="mx-auto min-h-screen w-[min(1120px,calc(100%-48px))] py-9 max-[520px]:w-[calc(100%-32px)]">

      <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-[#c8c3d8] hover:text-[#d5adff]">
        <FiArrowLeft /> Volver a la tienda
      </Link>

      <div className="grid grid-cols-2 items-start gap-10 max-[520px]:grid-cols-1">

       
        <section className="max-[520px]:w-full">
          <button onClick={() => setIsImageOpen(true)} className="relative w-full overflow-hidden rounded-xl bg-[#111321]">
            <img src={gallery[activeImage]} alt={game.title} className="aspect-square w-full object-cover" />
            <span className="absolute bottom-3 right-3 rounded bg-black/70 p-2 text-xs">
              {activeImage + 1} / {gallery.length}
            </span>
            <FiMaximize2 className="absolute bottom-3 left-3 text-white" />
          </button>

          <div className="mt-3 grid grid-cols-4 gap-2">
            {gallery.map((image, index) => (
              <button key={index} onClick={() => setActiveImage(index)}
                className={`overflow-hidden rounded-lg border-2 ${activeImage === index ? 'border-purple-500' : 'border-transparent'}`}>
                <img src={image} alt={`Imagen ${index + 1}`} className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </section>

       
        <section>
          <p className="text-xs uppercase tracking-widest text-[#b778ff]">{game.category}</p>
          <h1 className="my-2 text-4xl font-bold">{game.title}</h1>

          <div className="text-sm text-[#d2cfdf]">
            <span className="text-yellow-400">★★★★★</span>
            {game.rating.toFixed(1)} ({game.reviewCount.toLocaleString('es')} reseñas)
          </div>

          <p className="my-5 text-3xl font-bold text-purple-400">
            ${game.price.toFixed(2)} USD
          </p>

          <p className="text-sm leading-7 text-[#d4d1df]">{game.description}</p>

          <dl className="my-6 space-y-3 text-sm">
            {info.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[120px_1fr]">
                <dt className="text-gray-400">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex gap-3">
            <button onClick={onAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-purple-600 py-3 font-bold hover:bg-purple-500">
              <FiShoppingCart /> Agregar al carrito
            </button>

            <button onClick={() => setIsFavorite(!isFavorite)}
              className={`rounded-lg border px-4 ${isFavorite ? 'border-pink-500 text-pink-500' : 'border-gray-700'}`}
              aria-label="Cambiar favorito">
              <FiHeart />
            </button>
          </div>

        
          <section className="mt-8 border-t border-gray-700">
            <div className="flex gap-5 overflow-x-auto border-b border-gray-700">
              {tabs.map(([tab, label]) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`shrink-0 py-4 text-xs ${activeTab === tab ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400'}`}>
                  {label}
                </button>
              ))}
            </div>

            <div className="py-5 text-sm leading-7 text-gray-300">

              {activeTab === 'description' && (
                <>
                  <h2 className="font-bold text-white">Acerca de este juego</h2>
                  <p>{game.description}</p>
                  <p>Descubre todos sus detalles, prepara tu equipo y vive la aventura a tu manera.</p>
                </>
              )}

              {activeTab === 'requirements' && (
                <div className="grid grid-cols-2 gap-5 max-[520px]:grid-cols-1">
                  {[['Mínimos', game.requirements.minimum], ['Recomendados', game.requirements.recommended]].map(([title, requirements]) => (
                    <div key={title as string}>
                      <h2 className="font-bold text-white">{title}</h2>
                      <ul className="list-disc pl-5">
                        {(requirements as string[]).map(item => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && game.reviews.map(review => (
                <article key={review.author} className="border-b border-gray-700 py-3">
                  <div className="flex justify-between gap-3">
                    <strong>{review.author}</strong>
                    <span className="text-gray-400">{review.date}</span>
                  </div>
                  <p className="text-yellow-400">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                  <p>{review.comment}</p>
                </article>
              ))}

            </div>
          </section>
        </section>
      </div>

    
      <dialog ref={dialogRef} onClose={() => setIsImageOpen(false)}
        onClick={event => {
          if (event.target === event.currentTarget) setIsImageOpen(false)
        }}
        className="relative h-[90vh] w-[95vw] rounded-xl bg-[#080a14] p-5 text-white backdrop:bg-black/80">

        <button ref={closeRef} onClick={() => setIsImageOpen(false)}
          className="absolute right-3 top-3 rounded-lg bg-gray-800 p-2" aria-label="Cerrar imagen">
          <FiX />
        </button>

        <img src={gallery[activeImage]} alt={game.title}
          className="h-full w-full object-contain" />
      </dialog>

    </main>
  )
}
