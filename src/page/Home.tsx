import { useState, useEffect } from 'react';
import imgGta6 from '../assets/gta6.jpg';
import imgMinecraft from '../assets/minecraft.png';
import imgDeeprooted from '../assets/deeprooted.jpeg';
import { GameCard } from '../components/GameCard';
import { games } from '../data/game';

interface Slide {
  titulo1: string;
titulo2:  string;
destacado: string;
subtitulo: string;
boton: string;
imagen: string;
}


const slides: Slide[] =[ {                                              
  titulo1: 'Descubrí los',
    titulo2: 'mejores',
    destacado: 'videojuegos',
    subtitulo: 'Tu tienda gamer, en un solo lugar.',
    boton: 'Explorar Catálogo',
    imagen: imgGta6,
  },

  {
    titulo1: 'Sobreviví en',
    titulo2: 'las cuevas de',
    destacado: 'DEEPROOTED',
    subtitulo: 'Una aventura subterránea llena de secretos.',
    boton: 'Ver Juego',
    imagen: imgDeeprooted,
  },                                      
  {
    titulo1: 'Construí tu',
    titulo2: 'propio mundo en',
    destacado: 'Minecraft',
    subtitulo: 'Aventuras infinitas bloque a bloque.',
    boton: 'Ver Juego',
    imagen: imgMinecraft,
  },
];                                         
export function Home({ search, onAddToCart, favoriteIds, onToggleFavorite }: {
  search: string
  onAddToCart: (gameId: number) => void
  favoriteIds: number[]
  onToggleFavorite: (gameId: number) => void
}) {
  const [actual, setActual] = useState<number>(0);

  
 const anterior = () => {
    setActual((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const siguiente = () => {
    setActual((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      siguiente();
    }, 5000);

    return () => clearInterval(intervalo);
  }, [actual]);

  const banner: Slide = slides[actual];
  const normalizedSearch = search
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const filteredGames = games.filter((game) =>
    `${game.title} ${game.category} ${game.developer}`
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .includes(normalizedSearch),
  );

  return (
    <>
      <div className="relative w-full h-75 md:h-95 bg-slate-950 overflow-hidden">
        <img
          src={banner.imagen}
          alt={banner.destacado}
          className="w-full h-full object-cover object-right transition-all duration-500"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {banner.titulo1} <br />
            {banner.titulo2}{' '}
            <span className="text-purple-500">{banner.destacado}</span>
          </h1>

          <p className="text-gray-300 text-sm md:text-lg mt-2 md:mt-3">
            {banner.subtitulo}
          </p>

          <div className="mt-5">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition">
              <span>{banner.boton}</span>
              <span>🎮</span>
            </button>
          </div>
        </div>

        <button
          onClick={anterior}
          aria-label="Anterior"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-purple-600 text-white w-8 h-8 rounded-full"
        >
          ‹
        </button>

        <button
          onClick={siguiente}
          aria-label="Siguiente"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-purple-600 text-white w-8 h-8 rounded-full"
        >
          ›
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index: number) => (
            <button
              key={index}
              onClick={() => setActual(index)}
              aria-label={`Ir al slide ${index + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                actual === index ? 'bg-purple-500' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      <section className="mx-auto min-h-[calc(100vh-72px)] w-[min(1120px,calc(100%-48px))] pt-18 pb-24 max-[520px]:w-[calc(100%-32px)] max-[520px]:pt-12">
        <div className="mb-7 flex items-end justify-between gap-6 max-[520px]:items-start max-[520px]:flex-col max-[520px]:gap-3.5">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#b778ff]">Catálogo</p>
            <h1 className="m-0 text-[clamp(26px,4vw,36px)] tracking-[-0.04em]">Juegos destacados</h1>
          </div>
          <span className="rounded-full border border-[rgba(190,175,255,0.13)] px-3 py-2 text-xs text-[#a4a4b8]">
            {search.trim() ? `${filteredGames.length} juegos encontrados` : `${games.length} juegos disponibles`}
          </span>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,248px),1fr))] gap-5.5 max-[520px]:grid-cols-[minmax(0,1fr)]">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onAddToCart={() => onAddToCart(game.id)}
                isFavorite={favoriteIds.includes(game.id)}
                onToggleFavorite={() => onToggleFavorite(game.id)}
              />
            ))
          ) : (
            <p className="col-span-full text-gray-400">
              No se encontraron juegos para “{search.trim()}”.
            </p>
          )}
        </div>
      </section>
    </>
  );
}


export default Home;