import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import { FiArrowLeft, FiHeart, FiMaximize2, FiShoppingCart, FiX } from 'react-icons/fi'
import { games } from '../data/game'

type DetailTab = 'description' | 'requirements' | 'reviews'

export const GameDetail = ({ onAddToCart }: { onAddToCart: () => void }) => {
  const { id } = useParams()
  const game = games.find((item) => item.id === Number(id))
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<DetailTab>('description')
  const [isFavorite, setIsFavorite] = useState(false)
  const [isImageOpen, setIsImageOpen] = useState(false)
  const imageDialogRef = useRef<HTMLDialogElement>(null)
  const imageDialogCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = imageDialogRef.current
    if (!dialog) return

    if (!isImageOpen) {
      if (dialog.open) dialog.close()
      return
    }

    if (!dialog.open) dialog.showModal()
    imageDialogCloseRef.current?.focus()

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsImageOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isImageOpen])

  if (!game) {
    return (
      <main className="mx-auto min-h-[calc(100vh_-_72px)] w-[min(1120px,calc(100%_-_48px))] pb-20 pt-[38px] max-[520px]:w-[calc(100%_-_32px)] max-[520px]:pt-6">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#b778ff]">Juego no encontrado</p>
        <h1 className="mb-5">No encontramos ese videojuego</h1>
        <Link className="inline-flex items-center gap-2 mb-6 text-[13px] text-[#c8c3d8] hover:text-[#d5adff] focus-visible:outline-2 focus-visible:outline-[#d5adff] focus-visible:outline-offset-[3px]" to="/">Volver a la tienda</Link>
      </main>
    )
  }

  const gallery = [game.image, ...game.gallery]

  return (
    <main className="mx-auto min-h-[calc(100vh_-_72px)] w-[min(1120px,calc(100%_-_48px))] pb-20 pt-[38px] max-[520px]:w-[calc(100%_-_32px)] max-[520px]:pt-6">
      <Link className="mb-6 inline-flex items-center gap-2 text-[13px] text-[#c8c3d8] hover:text-[#d5adff] focus-visible:outline-2 focus-visible:outline-[#d5adff] focus-visible:outline-offset-[3px]" to="/">
        <FiArrowLeft aria-hidden="true" /> Volver a la tienda
      </Link>
      <div className="grid grid-cols-[minmax(300px,0.92fr)_minmax(0,1.08fr)] items-start gap-[42px] min-[521px]:max-[800px]:grid-cols-[minmax(240px,0.8fr)_minmax(0,1fr)] min-[521px]:max-[800px]:gap-6 max-[520px]:grid-cols-[minmax(0,1fr)] max-[520px]:gap-7">
        <section className="sticky top-6 max-[520px]:static" aria-label={`Galería de ${game.title}`}>
          <button
            className="group relative block aspect-[4/4.25] w-full cursor-zoom-in overflow-hidden rounded-[14px] border border-[rgba(190,175,255,0.2)] bg-[#111321] p-0 text-left focus-visible:outline-2 focus-visible:outline-[#d5adff] focus-visible:outline-offset-[3px] max-[520px]:aspect-square"
            type="button"
            onClick={() => setIsImageOpen(true)}
            aria-haspopup="dialog"
            aria-label={`Ver imagen completa: ${activeImage === 0 ? 'portada' : `captura ${activeImage}`} de ${game.title}`}
          >
            <img
              className="block h-full w-full object-cover"
              src={gallery[activeImage]}
              alt={activeImage === 0 ? `Portada de ${game.title}` : `Captura ${activeImage} de ${game.title}`}
            />
            <span className="pointer-events-none absolute right-3 bottom-3 rounded-[7px] border border-white/15 bg-[rgba(8,10,20,0.72)] px-[9px] py-1.5 text-[11px] tabular-nums text-white">{String(activeImage + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
            <span className="pointer-events-none absolute bottom-3 left-3 inline-flex translate-y-[3px] items-center gap-[7px] rounded-[7px] border border-white/15 bg-[rgba(8,10,20,0.72)] px-2.5 py-[7px] text-[11px] text-white opacity-0 transition-[opacity,transform] duration-[160ms] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <FiMaximize2 aria-hidden="true" /> Ver imagen completa
            </span>
          </button>
          <div className="mt-3 grid grid-cols-4 gap-2.5">
            {gallery.map((image, index) => (
              <button
                className={`aspect-[1.15] cursor-pointer overflow-hidden rounded-[9px] border border-[rgba(190,175,255,0.13)] bg-[#111321] p-0 focus-visible:outline-2 focus-visible:outline-[#d5adff] focus-visible:outline-offset-[3px] ${activeImage === index ? 'border-2 border-[#a354ff] shadow-[0_0_16px_rgba(146,76,255,0.28)]' : ''}`}
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={index === 0 ? `Ver portada de ${game.title}` : `Ver captura ${index} de ${game.title}`}
                aria-pressed={activeImage === index}
              >
                <img className="block h-full w-full object-cover" src={image} alt="" />
              </button>
            ))}
          </div>
        </section>

        <section>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#b778ff]">{game.category}</p>
          <h1 className="m-0 text-[clamp(30px,4vw,42px)] leading-[1.1] tracking-[-0.045em]">{game.title}</h1>
          <div className="mt-3 flex items-center gap-[9px] text-[13px] text-[#d2cfdf]">
            <span className="tracking-[1px] text-[#ffbd36]" aria-label={`${game.rating} de 5 estrellas`}>★★★★★</span>
            <strong>{game.rating.toFixed(1)}</strong>
            <span>({game.reviewCount.toLocaleString('es')} reseñas)</span>
          </div>
          <p className="mt-5 mb-3 text-[clamp(28px,4vw,36px)] font-extrabold tracking-[-0.04em] text-[#c267ff]">${game.price.toFixed(2)} <span className="text-[15px] tracking-normal">USD</span></p>
          <p className="m-0 text-sm leading-[1.7] text-[#d4d1df]">{game.description}</p>
          <dl className="my-[23px] grid gap-3">
            <div className="grid grid-cols-[122px_minmax(0,1fr)] gap-3 text-[13px] min-[521px]:max-[800px]:grid-cols-[100px_minmax(0,1fr)]"><dt className="text-[#aaa6bb]">Categoría</dt><dd className="m-0 text-[#f1eff8]">{game.category}</dd></div>
            <div className="grid grid-cols-[122px_minmax(0,1fr)] gap-3 text-[13px] min-[521px]:max-[800px]:grid-cols-[100px_minmax(0,1fr)]"><dt className="text-[#aaa6bb]">Desarrollador</dt><dd className="m-0 text-[#f1eff8]">{game.developer}</dd></div>
            <div className="grid grid-cols-[122px_minmax(0,1fr)] gap-3 text-[13px] min-[521px]:max-[800px]:grid-cols-[100px_minmax(0,1fr)]"><dt className="text-[#aaa6bb]">Requisitos</dt><dd className="m-0 text-[#f1eff8]">{game.requirements.minimum[0]} · {game.requirements.minimum[1]}</dd></div>
          </dl>
          <div className="flex gap-3">
            <button className="inline-flex min-h-[46px] flex-1 cursor-pointer items-center justify-center gap-[9px] rounded-[9px] bg-linear-to-r from-[#a23cff] to-[#6831ec] text-sm font-bold text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[#d5adff] focus-visible:outline-offset-[3px]" type="button" onClick={onAddToCart}>
              <FiShoppingCart aria-hidden="true" /> Agregar al carrito
            </button>
            <button
              className={`inline-flex h-12 min-h-[46px] w-12 cursor-pointer items-center justify-center rounded-[9px] border bg-[#141626] text-[19px] text-white focus-visible:outline-2 focus-visible:outline-[#d5adff] focus-visible:outline-offset-[3px] ${isFavorite ? 'border-[rgba(255,91,137,0.5)] text-[#ff5b89] [&_svg]:fill-current' : 'border-[rgba(190,175,255,0.13)]'}`}
              type="button"
              onClick={() => setIsFavorite((favorite) => !favorite)}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              aria-pressed={isFavorite}
            >
              <FiHeart aria-hidden="true" />
            </button>
          </div>

          <section className="mt-[27px] border-t border-[rgba(190,175,255,0.13)]" aria-label="Información del videojuego">
            <div className="flex gap-[clamp(12px,2vw,24px)] overflow-x-auto border-b border-[rgba(190,175,255,0.13)] motion-reduce:scroll-auto" role="tablist" aria-label="Secciones de información">
              {([
                ['description', 'Descripción'],
                ['requirements', 'Requisitos del sistema'],
                ['reviews', `Reseñas (${game.reviewCount.toLocaleString('es')})`],
              ] as const).map(([tab, label]) => (
                <button
                  key={tab}
                  id={`tab-${tab}`}
                  className={`relative shrink-0 cursor-pointer border-0 bg-transparent px-0 py-[15px] pb-[13px] text-xs focus-visible:outline-2 focus-visible:outline-[#d5adff] focus-visible:outline-offset-[3px] ${activeTab === tab ? 'text-[#d6a5ff]' : 'text-[#b7b3c5]'}`}
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`panel-${tab}`}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                >
                  {label}
                  {activeTab === tab && <span aria-hidden="true" className="absolute right-0 -bottom-px left-0 h-0.5 bg-[#a64cff]" />}
                </button>
              ))}
            </div>
            <div className="min-h-[130px] py-[17px] text-xs leading-[1.7] text-[#d1cedc]" id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
              {activeTab === 'description' && (
                <div>
                  <h2 className="mb-2 mt-0 text-[13px] text-[#f0edf7]">Acerca de este juego</h2>
                  <p className="mb-2.5 mt-0">{game.description}</p>
                  <p className="mb-2.5 mt-0">Descubre todos sus detalles, prepara tu equipo y vive la aventura a tu manera.</p>
                </div>
              )}
              {activeTab === 'requirements' && (
                <div className="grid grid-cols-2 gap-5 max-[520px]:grid-cols-1 max-[520px]:gap-3.5">
                  <div>
                    <h2 className="mb-2 mt-0 text-[13px] text-[#f0edf7]">Mínimos</h2>
                    <ul className="m-0 pl-[18px]">{game.requirements.minimum.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul>
                  </div>
                  <div>
                    <h2 className="mb-2 mt-0 text-[13px] text-[#f0edf7]">Recomendados</h2>
                    <ul className="m-0 pl-[18px]">{game.requirements.recommended.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul>
                  </div>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div>
                  {game.reviews.map((review) => (
                    <article className="border-b border-[rgba(190,175,255,0.13)] py-3" key={review.author}>
                      <div className="flex justify-between gap-3"><strong>{review.author}</strong><span className="text-[#a4a4b8]">{review.date}</span></div>
                      <p className="my-[5px] tracking-[1px] text-[#ffbd36]" aria-label={`${review.rating} de 5 estrellas`}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                      <p className="mb-2.5 mt-0">{review.comment}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </section>
      </div>
      <dialog
        className="relative h-[min(94vh,1000px)] w-[min(96vw,1440px)] max-h-none max-w-none rounded-[14px] border border-[rgba(190,175,255,0.25)] bg-[#080a14] px-5 pt-12 pb-5 text-[#f5f4fb] backdrop:bg-[rgba(3,4,10,0.88)] backdrop:backdrop-blur-[7px]"
        ref={imageDialogRef}
        aria-label={`Imagen completa de ${game.title}`}
        onClose={() => setIsImageOpen(false)}
        onCancel={() => setIsImageOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsImageOpen(false)
        }}
      >
        <button
          className="absolute top-2.5 right-2.5 grid h-9 w-9 cursor-pointer place-items-center rounded-[9px] border border-[rgba(190,175,255,0.13)] bg-[#171a2c] text-white focus-visible:outline-2 focus-visible:outline-[#d5adff] focus-visible:outline-offset-[3px]"
          ref={imageDialogCloseRef}
          type="button"
          onClick={() => setIsImageOpen(false)}
          aria-label="Cerrar imagen ampliada"
        >
          <FiX aria-hidden="true" />
        </button>
        <img
          className="block h-full w-full object-contain"
          src={gallery[activeImage]}
          alt={activeImage === 0 ? `Portada completa de ${game.title}` : `Captura ${activeImage} completa de ${game.title}`}
        />
      </dialog>
    </main>
  )
}